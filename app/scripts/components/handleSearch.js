
var $ = require('jquery');
var handleData = require('./handleData');

function handleSearch (query, lang) {
  var htmlEl = document.body.parentElement,
      decodedQuery = decodeURIComponent(query),
      $form = $('.search-form');

  $form.addClass('loading');

  var request = $.ajax({
      url: `https://${lang}.wikipedia.org/w/api.php?callback=?`,
      data: {
        action: "query",
        prop: "pageprops|pageimages|pageterms",
        format: 'json',
        generator: "prefixsearch",
        ppprop: "displaytitle",
        piprop: "thumbnail",
        pithumbsize: 160,
        pilimit: 6,
        wbptterms: "description",
        gpssearch: decodedQuery,
        gpsnamespace: 0,
        gpslimit: 6
      },
      xhrFields: {
        withCredentials: true
      },
      dataType: 'json'
  });

  request.then(function( data, textStatus, jqXHR ) {
    $form.removeClass('loading');
    $form.find('.search-results').remove();

    if (data.query.pages) {
      var results = "<div class='search-results'>" +
        "<ol>" +
          $.map(data.query.pages, function(val, i) {
            return "<li><a href='/?" + val.title + "'>" + val.title + "</a></li>"
          }).join(' ') +
        "</ol>" +
      "</div>";

      $form.append(results);
    }
  }, function( jqXHR, textStatus, errorThrown ) {
    htmlEl.classList.remove('loading');
    console.log(jqXHR, textStatus, errorThrown);
  });
}

module.exports = handleSearch;
