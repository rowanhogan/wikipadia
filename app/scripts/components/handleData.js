
var $ = require('jquery');

function handleData (data, lang) {
  var contentEl = document.getElementById('content');

  if (data.error) {
    // debugger
    contentEl.innerHTML = data.error.info;
    return false
  }

  var html = data.parse.text['*'];
  var title = data.parse.title;
  var regex = new RegExp('href="/wiki/', 'g');

  html = html.replace(regex, 'href="?');

  // Fix for special links

  ['File', 'Help', 'Book'].forEach(function(typeString, i) {
    html = html.split('?' + typeString).join(`https://${lang}.m.wikipedia.org/wiki/${typeString}`);
  });

  contentEl.innerHTML = html;

  var remoteLinks = document.querySelectorAll('a[href*="wikipedia.org"]');
  Array.prototype.forEach.call(remoteLinks, function(el, i){
    el.target = '_blank';
  });

  var titleEl = document.createElement('h1');
  titleEl.innerHTML = title;

  contentEl.parentElement.insertBefore(titleEl, contentEl.parentElement.firstChild);

  document.title = title + " – WikiPadia";
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
