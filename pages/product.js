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
  return '<div class="product">' +
    '<div class="product-image">' +
      renderImage(fields.image[0]) +
    '</div>' +
    '<div class="product-header">' +
      '<h2>' + fields.productName + '</h2>' +
      ' by ' +
      '<a href="brand/' + fields.brand.sys.id + '" data-nav>' + fields.brand.fields.companyName + '</a>' +
    '</div>' +
    '<p class="product-categories">' +
      fields.categories.map(function (category) {
        return category.fields.title
      }).join(', ') +
    '</p>' +
    '<p>' + marked(fields.productDescription) + '</p>' +
    '<p>Size/Type/Color: ' + fields.sizetypecolor+ '</p>' +
    '<p>' + fields.quantity + ' in stock</p>' +
    '<p>' + fields.price + ' &euro;</p>' +
    '<p>SKU: ' + fields.sku + '</p>' +
    '<p>More details: <a href="'+fields.website+'">' + fields.website + '</a></p>' +
    '<p class="product-tags"><span>Tags:</span> ' + fields.tags.join(', ')+ '</p>' +
  '</div>'
}

function renderImage(image) {
  if(image && image.fields.file) {
    return '<img src="' + image.fields.file.url + '" width="300" height="300" />'
  } else {
    return ''
  }
}

}());
