
const $ = require('jquery');
require('slick-carousel');

function handleMainPage () {
  var imgSrc = $('#mp-tfa-img img').attr('src').replace('thumb/', ''),
      arr = imgSrc.split('/')

  arr.splice(arr.length - 1);
  $('#mp-tfa-img').css({ 'background-image' : 'url("' + arr.join('/') + '")' });

  $('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.9/slick.min.css">');

  $('#mp-dyk ul').slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    fade: true
  });

}

module.exports = handleMainPage;
