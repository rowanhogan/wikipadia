
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
        prop: "text",
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
  }, function( jqXHR, textStatus, errorThrown ) {
    htmlEl.classList.remove('loading');
    console.log(jqXHR, textStatus, errorThrown);
  });
}

module.exports = handleNewPage;
