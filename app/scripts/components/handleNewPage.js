
var $ = require('jquery');
var handleData = require('./handleData');

function handleNewPage (pageTitle, lang) {
  $('html').addClass('loading');

  var request = $.ajax({
      url: `https://${lang}.wikipedia.org/w/api.php?callback=?`,
      data: {
        action: "parse",
        prop: "text",
        page: pageTitle,
        format: 'json'
      },
      xhrFields: {
        withCredentials: true
      },
      dataType: 'json'
  });

  request.then(function( data, textStatus, jqXHR ) {
    handleData(data, lang);
    $('html').removeClass('loading');
  }, function( jqXHR, textStatus, errorThrown ) {
    $('html').removeClass('loading');
    console.log(jqXHR, textStatus, errorThrown);
  });
}

module.exports = handleNewPage;
