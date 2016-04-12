(function () {

PC.pages.brand = {}

/**
 * Renders the individual brand page
 */

PC.pages.brand.renderHTML = function (params) {
  return PC.contentfulClient.getEntries({
    'sys.id': params.brandId
  })
  .then(function (entries) {
    return renderSingleBrand(entries.items[0])
  })
}

function renderSingleBrand(brand) {
  var fields = brand.fields
  return '<div class="brand">' +
    '<h2>' + fields.companyName+ '</h2>' +
    '<div>' +
      renderImage(fields.logo) +
    '</div>' +
    '<p>' + marked(fields.companyDescription) + '</p>' +
    (fields.website ? '<p><a href="' + fields.website + '">' + fields.website + '</a></p>' : '') +
    (fields.twitter ? '<p><a href="' + fields.twitter + '">' + fields.twitter + '</a></p>' : '') +
    (fields.email ? '<p><a href="mailto:' + fields.email + '">' + fields.email + '</a></p>' : '') +
    (fields.phone ? '<p><a href="tel:' + fields.phone + '">' + fields.phone + '</a></p>' : '') +
  '</div>'
}

function renderImage(image) {
  if(image && image.fields.file) {
    return '<img src="' + image.fields.file.url + '" />'
  } else {
    return ''
  }
}

}());
