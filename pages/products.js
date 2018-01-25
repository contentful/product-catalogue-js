(function () {

PC.pages.products = {}

/**
 * Renders the products list page
 *
 * The products list page can optionally be filtered by a category, and will
 * then only show products from that category. This is only used from the
 * categories page, in order to render lists of products with only products
 * from a selected category.
 */

PC.pages.products.renderHTML = function (params) {
  var query = {
    content_type: PC.config.productContentTypeId
  }

  if (params && params.categoryId) {
    query['fields.categories.sys.id[in]'] = params.categoryId
  }

  return PC.contentfulClient.getEntries(query)
  .then(function (entries) {
    return renderProducts(entries.items)
  })
}

function renderProducts(products) {
  return '<h1>Products</h1>' +
    '<div class="products">' +
    products.map(renderSingleProduct).join('\n') +
    '</div>'
}

function renderSingleProduct(product) {
  var fields = product.fields
  return '<div class="product-in-list">' +
    '<div class="product-image">' +
      renderImage(fields.image[0], fields.slug) +
    '</div>' +
    '<div class="product-details">' +
      renderProductDetails(fields) +
    '</div>' +
  '</div>'
}

function renderProductDetails(fields) {
  return renderProductHeader(fields) +
    '<p class="product-categories">' +
    fields.categories.map(function (category) {
      return category.fields.title
    }).join(', ') +
    '</p>' +
    PC.utils.truncate(marked(fields.productDescription), 100) +
    '<p>' + fields.price + ' &euro;</p>' +
    '<p class="product-tags"><span>Tags:</span> ' + fields.tags.join(', ')+ '</p>'
}

function renderProductHeader(fields) {
  return '<div class="product-header">' +
    '<h2>' +
      '<a href="product/' + fields.slug + '" data-nav>' +
        fields.productName +
      '</a>'+
    '</h2>' +
    ' by ' +
    '<a href="brand/' + fields.brand.sys.id + '" data-nav>' + fields.brand.fields.companyName + '</a>' +
  '</div>'
}

function renderImage(image, slug) {
  if(image && image.fields.file) {
    return '<a href="product/' + slug + '" data-nav>' +
      '<img src="' + image.fields.file.url + '" width="150" height="150" />' +
    '</a>'
  } else {
    return ''
  }
}

}());
