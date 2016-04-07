(function () {

PC.pages.products = function () {
  PC.contentfulClient.getEntries({content_type: '2PqfXUJwE8qSYKuM0U6w8M'})
  .then(function (entries) {
    PC.container.innerHTML = renderProducts(entries.items)
  })
}

function renderProducts(products) {
  return '' +
    '<h1>Products</h1>' +
    products.map(renderSingleProduct).join('\n')
}

function renderSingleProduct(product) {
  var fields = product.fields
  console.log(fields.description)
  return '<div>' +
    '<div>' +
      renderImage(fields.image[0], fields.slug) +
    '</div>' +
    '<div>' +
      '<h2>' +
        '<a href="/products/' + fields.slug + '">' +
          fields.productName +
        '</a>'+
      '</h2>' +
      ' by ' +
      '<a href="/brands/' + fields.brand.sys.id + '">' + fields.brand.fields.companyName + '</a>'
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

function renderImage(image, slug) {
  if(image && image.fields.file) {
    return '<a href="/products/' + slug + '">' +
      '<img src="' + image.fields.file.url + '" width="150" height="150" />' +
    '</a>'
  } else {
    return ''
  }
}

}());
