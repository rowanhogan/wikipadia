
var $ = require('jquery');
var handleData = require('./handleData');

function handleNewPage (pageTitle, lang) {
  var htmlEl = document.body.parentElement,
      decodedPageTitle = decodeURIComponent(pageTitle);

  htmlEl.classList.add('loading');

  var request = $.ajax({
      url: `https://${lang}.wikipedia.org/w/api.php?callback=?`,
      data: {
        action: "parse",
        redirects: true,
        prop: "text|sections|images",
        page: decodedPageTitle,
        format: 'json'
      },
      xhrFields: {
        withCredentials: true
      },
      dataType: 'json'
  });

  request.then(function( data, textStatus, jqXHR ) {
    handleData(data, lang);
    htmlEl.classList.remove('loading');

    setTimeout(function () {
      if (window.location.hash) {
        const el = document.querySelector(window.location.hash);
        if (el) el.scrollIntoView();
      } else {
        $(window).scrollTop(0);
      }
    }, 1000);

  }, function( jqXHR, textStatus, errorThrown ) {
    htmlEl.classList.remove('loading');
    console.log(jqXHR, textStatus, errorThrown);
  });
}

module.exports = handleNewPage;
