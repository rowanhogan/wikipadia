
var $ = require('jquery');

function handleMainPage () {
  var $img = $('#mp-tfa-img img');

  if ($img.length) {
    var imgSrc = $('#mp-tfa-img img').attr('src').replace('thumb/', ''),
    arr = imgSrc.split('/')

    arr.splice(arr.length - 1);
    $('#mp-tfa-img').css({ 'background-image' : 'url("' + arr.join('/') + '")' });
    $('#mp-tfa').addClass('has-bg-image');
  }
}

module.exports = handleMainPage;
