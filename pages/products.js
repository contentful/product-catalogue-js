(function () {

PC.pages.products = function () {
  PC.contentfulClient.getEntries({content_type: '2PqfXUJwE8qSYKuM0U6w8M'})
  .then(function (entries) {
    var products = entries.items.map(function (entry) {
      return '<p>'+entry.fields.productName+'</p>'
    })
    PC.container.innerHTML = products.join('\n')
  })
}

}());
