
var $ = require('jquery');

function handleData (data, lang) {
  var html = data.parse.text['*'];

  var regex = new RegExp('href="/wiki/', 'g');
  html = html.replace(regex, 'href="?');

  // Fix for special links

  $.each(['File', 'Help', 'Book'], function(i, typeString) {
    html = html.split('?' + typeString).join(`https://${lang}.m.wikipedia.org/wiki/${typeString}`);
  });

  $('#content').html(html);

  $('#content').find('a[href*="wikipedia.org"]').each(function() {
    $(this).attr('target', '_blank');
  });

  $('title').html(data.parse.title + " – WikiPadia");
  $('#content').prepend("<h1>" + data.parse.title + "</h1>");
  $(window).scrollTop(0);

  if ($('ul.redirectText').length) {
    $('ul.redirectText').find('li a').each(function (i, el) {
      var $link = $(el);
      var newHref = $link.attr('href').replace('/w/index.php?title=', '?').replace('&redirect=no', '');

      $link.attr('href', newHref);
    });
  }
}

module.exports = handleData;
