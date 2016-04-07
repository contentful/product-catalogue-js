(function () {

PC.pages = {
  products: function () {
    PC.contentfulClient.getEntries({content_type: '2PqfXUJwE8qSYKuM0U6w8M'})
    .then(function (entries) {
      var products = entries.items.map(function (entry) {
        return '<p>'+entry.fields.productName+'</p>'
      })
      PC.container.innerHTML = products.join('\n')
    })
  },

  categories: function () {
    PC.contentfulClient.getEntries({content_type: '6XwpTaSiiI2Ak2Ww0oi6qa'})
    .then(function (entries) {
      var categories = entries.items.map(function (entry) {
        return '<p>'+entry.fields.title+'</p>'
      })
      PC.container.innerHTML = categories.join('\n')
    })
  },

  about: function () {
    PC.container.innerHTML = 'about'
  }
}

}());
