(function () {

PC.pages.product = {}

/**
 * Renders the individual product page
 */

PC.pages.product.renderHTML = function (params) {
  return PC.contentfulClient.getEntries({
    content_type: PC.config.productContentTypeId,
    'fields.slug': params.productSlug
  })
  .then(function (entries) {
    return renderSingleProduct(entries.items[0])
  })
}

function renderSingleProduct(product) {
  var fields = product.fields
  return '<div>' +
    '<div>' +
      '<h2>' + fields.productName + '</h2>' +
      ' by ' +
      '<a href="/brands/' + fields.brand.sys.id + '" data-nav>' + fields.brand.fields.companyName + '</a>' +
    '</div>' +
    '<div>' +
      renderImage(fields.image[0]) +
    '</div>' +
    '<p>' +
    fields.categories.map(function (category) {
      return category.fields.title
    }).join(', ') +
    '</p>' +
    '<p>' + marked(fields.productDescription) + '</p>' +
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
