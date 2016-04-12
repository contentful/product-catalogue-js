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
    var query = {}
    if(params.selectedCategoryId) {
      query.categoryId = params.selectedCategoryId
    }
    return PC.pages.products.renderHTML(query)
    .then(function (productsHTML) {
      return renderCategoryListPage(entries.items, productsHTML)
    })
  })
}

function renderCategoryListPage(categories, productsHTML) {
  return '<div class="categories">' +
      '<ul class="categories-list">' + renderCategoryList(categories) + '</ul>' +
      '<div>' + productsHTML + '</div>' +
    '</div>'
}

function renderCategoryList(categories) {
  return '<li><a href="categories" data-nav>All</a></li>'+
    categories.map(function (category) {
      var fields = category.fields
      return '<li>' +
        '<img src="' + fields.icon.fields.file.url + '" width="20" height="20" alt="' + fields.categoryDescription + '" title="' + fields.categoryDescription + '" />' +
        '<a href="categories/' + category.sys.id + '" data-nav>' + fields.title + '</a>' +
        '</li>'
    }).join('\n')
}

}());
