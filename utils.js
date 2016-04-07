(function () {

PC.utils.truncate = function (str, len) {
  if(str && str.length > len) {
    return str.substr(0, len) + '&hellip;'
  } else {
    return str
  }
}

}());
