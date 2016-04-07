(function () {

PC.pages.product = function (slug) {
  PC.contentfulClient.getEntries({
    content_type: PC.config.productContentTypeId,
    'fields.slug': slug
  })
  .then(function (entries) {
    PC.container.innerHTML = renderSingleProduct(entries.items[0])
  })
}

function renderSingleProduct(product) {
  var fields = product.fields
  return '<div>' +
    '<div>' +
      renderImage(fields.image[0]) +
    '</div>' +
    '<div>' +
      '<h2>' + fields.productName + '</h2>' +
      ' by ' +
      '<a href="/brands/' + fields.brand.sys.id + '" data-nav>' + fields.brand.fields.companyName + '</a>'
    '</div>' +
    '<p>' +
    fields.categories.map(function (category) {
      return category.fields.title
    }).join(', ') +
    '</p>' +
    '<p>' + PC.utils.truncate(fields.productDescription, 100) + '</p>' +
    '<p>' + fields.price + ' &euro;</p>' +
    '<p>Tags: ' + fields.tags.join(', ')+ '</p>' +
  '</div>'
}

function renderImage(image) {
  if(image && image.fields.file) {
    return '<img src="' + image.fields.file.url + '" width="150" height="150" />'
  } else {
    return ''
  }
}

}());
