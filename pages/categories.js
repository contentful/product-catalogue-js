(function () {

PC.pages.categories = {}

/**
 * Renders the categories list page
 *
 * The categories list first gets a list of all existing categories,
 * then uses the products page method to render that same code but only
 * with products from the selected category.
 * If no selected category exists, the first from the list is used.
 */
PC.pages.categories.renderHTML = function (params) {
  return PC.contentfulClient.getEntries({
    content_type: PC.config.categoryContentTypeId
  })
  .then(function (entries) {
    var selectedCategoryId
    if(params.selectedCategoryId) {
      selectedCategoryId = params.selectedCategoryId
    } else {
      selectedCategoryId = entries.items[0].sys.id
    }
    return PC.pages.products.renderHTML({categoryId: selectedCategoryId})
    .then(function (productsHTML) {
      return renderCategoryListPage(entries.items, productsHTML)
    })
  })
}

function renderCategoryListPage(categories, productsHTML) {
  return '<div>' +
      '<div>' + renderCategoryList(categories) + '</div>' +
      '<div>' + productsHTML + '</div>' +
    '</div>'
}

function renderCategoryList(categories) {
  return categories.map(function (category) {
    var fields = category.fields
    return '<div>' +
      '<img src="' + fields.icon.fields.file.url + '" width="15" height="15" alt="' + fields.categoryDescription + '" title="' + fields.categoryDescription + '" />' +
      '<h1><a href="/categories/' + category.sys.id + '" data-nav>' + fields.title + '</a></h1>' +
      '</div>'
  }).join('\n')
}

}());
