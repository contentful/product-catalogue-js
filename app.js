(function () {

PC.init = function () {
  PC.contentfulClient = contentful.createClient({
    accessToken: '0e3ec801b5af550c8a1257e8623b1c77ac9b3d8fcfc1b2b7494e3cb77878f92a',
    space: 'wl1z0pal05vy'
  })

  setupHistory()
  setupNavAnchorListeners()

  PC.container = document.getElementById('content')

  loadPage('')
}

function setupHistory() {
  window.onpopstate = function (ev) {
    loadPage(ev.state && ev.state.href || '')
  }
}

function setupNavAnchorListeners() {
  document.querySelector('main > nav').addEventListener('click', function (ev) {
    ev.preventDefault()
    if(ev.target.tagName.toLowerCase() === 'a') {
      history.pushState({href: ev.target.href}, '', ev.target.href)
      loadPage(ev.target.href)
    }
  }, false)
}

function loadPage(href) {
  href = href.replace(/(^http(s)?:\/\/\w+(:\d+)?\/|^\/)/, '')
  switch(href) {
    case 'categories':
      PC.pages.categories()
      break
    case 'about':
      PC.pages.about()
      break
    case 'product':
      PC.pages.product(id)
      break
    case 'brand':
      PC.pages.brand(brand)
      break
    default:
      PC.pages.products()
  }
}

}());
