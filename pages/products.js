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
  return '' +
    '<h1>Products</h1>' +
    products.map(renderSingleProduct).join('\n')
}

function renderSingleProduct(product) {
  var fields = product.fields
  return '<div>' +
    '<div>' +
      renderImage(fields.image[0], fields.slug) +
    '</div>' +
    '<div>' +
      '<h2>' +
        '<a href="/product/' + fields.slug + '" data-nav>' +
          fields.productName +
        '</a>'+
      '</h2>' +
      ' by ' +
      '<a href="/brands/' + fields.brand.sys.id + '" data-nav>' + fields.brand.fields.companyName + '</a>'
    '</div>' +
    '<p>' +
    fields.categories.map(function (category) {
      return category.fields.title
    }).join(', ') +
    '</p>' +
    '<p>' + PC.utils.truncate(marked(fields.productDescription), 100) + '</p>' +
    '<p>' + fields.price + ' &euro;</p>' +
    '<p>Tags: ' + fields.tags.join(', ')+ '</p>' +
  '</div>'
}

function renderImage(image, slug) {
  if(image && image.fields.file) {
    return '<a href="/product/' + slug + '" data-nav>' +
      '<img src="' + image.fields.file.url + '" width="150" height="150" />' +
    '</a>'
  } else {
    return ''
  }
}

}());
