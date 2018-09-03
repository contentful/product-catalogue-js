(function () {

/**
 * Initializes the application and required dependencies, such as:
 * - Contentful client
 * - Configuration for the application
 * - History API event listeners
 * - Event delegation for handling anchor links throughout the app and allowing
 * navigation through the use of pushState and the History API
 */
PC.init = function () {
  // Initializes the Contentful client with the required credentials for a
  // product catalog space. Feel free to replace them with our own.
  PC.contentfulClient = contentful.createClient({
    accessToken: 'f35d62ae3f7c737f1a0b28eac0a035aa41f45b8239f37f41051110e052753d18',
    space: 'bkp1t915hkvx'
  })

  // IDs of some of the Content Types used in the app
  PC.config = {
    productContentTypeId: 'product',
    categoryContentTypeId: 'category'
  }

  setupHistory()
  setupNavAnchorListeners()

  // main container for rendering the app
  PC.container = document.getElementById('content')

  // load the requested route
  loadPage(window.location.href)
}

// Navigates to a given page via the history API
PC.navigate = function (href) {
  window.history.pushState({href: href}, '', href)
  loadPage(href)
}

/**
 * Sets up the popstate listener
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
 */
function setupHistory() {
  window.onpopstate = function (ev) {
    loadPage(ev.state && ev.state.href || '')
  }
}

/**
 * Event delegation mechanism for links throughout the app
 *
 * Listens to all click events in the app, and if the source element is an anchor
 * tag and has a data-nav property, it cancels the event and loads the page
 * referred in the href with the loadPage function, while also pushing it
 * to the history API
 */
function setupNavAnchorListeners() {
  document.querySelector('body').addEventListener('click', function (ev) {
    ev.preventDefault()
    if(ev.target.tagName.toLowerCase() === 'a' && 'nav' in ev.target.dataset) {
      PC.navigate(ev.target.href)
    }
  }, false)
}

/**
 * Basic routing mechanism
 *
 * Removes the URL from the href (which can come from either an anchor tag or
 * the popstate event), and splits it by '/'.
 */
function loadPage(href) {
  href = href.replace(document.baseURI, '')
  var urlParts = href.split('/')
  var pageName = urlParts[0]
  // Attempts to get the object which contains the methods to render and setup
  // pages, otherwise defaults to the main page
  var page = PC.pages[pageName] || PC.pages.products
  var loader
  switch(pageName) {
    // /categories and /categories/:id
    case 'categories':
      loader = page.renderHTML({
        selectedCategoryId: urlParts[1],
      })
      break
    // /about
    case 'about':
      loader = page.renderHTML()
      break
    // /product/:id
    case 'product':
      loader = page.renderHTML({
        productSlug: urlParts[1]
      })
      break
    // /brand/:id
    case 'brand':
      loader = page.renderHTML({
        brandId: urlParts[1]
      })
      break
    // / (index page)
    default:
      loader = page.renderHTML()
  }

  loader.then(injectInPage).then(function () {
    // after rendering is done, run the postRender method if there is one
    if('postRender' in page) {
      setTimeout(function () {
        page.postRender()
      }, 0)
    }
  })
}

function injectInPage (HTMLContent) {
  PC.container.innerHTML = HTMLContent
}

}());
