(function () {

PC.pages.categories = function () {
  PC.contentfulClient.getEntries({
    content_type: PC.config.categoryContentTypeId
  })
  .then(function (entries) {
    var categories = entries.items.map(function (entry) {
      return '<p>'+entry.fields.title+'</p>'
    })
    PC.container.innerHTML = categories.join('\n')
  })
}

}());
