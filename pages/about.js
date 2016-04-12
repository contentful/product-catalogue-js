(function () {

PC.pages.about = {}

PC.pages.about.renderHTML = function (params) {
  return Promise.resolve(
    '<form id="aboutForm" class="settings-form">' +
      '<p><a href="https://contentful.com">Contentful</a> is a content management platform for web applications, mobile apps and connected devices.</p>'+
      '<p>It allows you to create, edit & manage content in the cloud and publish it anywhere via a powerful API.</p>'+
      '<p>This Product Catalogue demo app uses the Content Model of our Product Space Template.</p>'+
      '<p>If you want to try it with your own space, please access the <a href="https://app.contentful.com">Contentful Web App</a>, create a new space, load it with the Product Template and keep the same “Content Model”.'+
      '<div class="form-container">'+
        '<p>Space ID: <input id="spaceId" type="text" /></p>'+
        '<p>Access Token: <input id="accessToken" type="text" /></p>'+
        '<p><button>Load Space</button></p>'+
      '</div>'+
    '</form>'
  )
}

PC.pages.about.postRender = function () {
  document.getElementById('aboutForm').addEventListener('submit', submitForm, false)
  document.querySelector('#aboutForm button').addEventListener('click', submitForm, false)
}

function submitForm(ev) {
  ev.preventDefault()
  var accessToken = document.getElementById('accessToken').value
  var spaceId = document.getElementById('spaceId').value
  if(accessToken && spaceId) {
    reloadClient(accessToken, spaceId)
    PC.navigate('')
  }
}

function reloadClient (accessToken, spaceId) {
  PC.contentfulClient = contentful.createClient({
    accessToken: accessToken,
    space: spaceId
  })
}

}());
