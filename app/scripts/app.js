
var attachFastClick = require('fastclick');
var handleNewPage = require('./components/handleNewPage');
var handleTheme = require('./components/handleTheme');
var handleFont = require('./components/handleFont');
var eventHandlers = require('./components/eventHandlers')

if (window.location.hostname.split('.').length > 2) {
  var lang = window.location.hostname.split('.')[0];
} else {
  var lang = 'en';
}

(function() {
  attachFastClick(document.body);

  var htmlEl = document.body.parentElement;

  if (window.location.search.length) {
    htmlEl.classList.remove('initial');
    var pageTitle = window.location.search.substring(1, window.location.search.length)
    handleNewPage(pageTitle, lang);
  } else {
    htmlEl.classList.remove('loading');
  }

  if (localStorage.getItem('theme')) {
    var theme = localStorage.getItem('theme'),
        input = document.getElementById('theme-changer').querySelectorAll('input[value=' + theme + ']');

    input[0].checked = true;
    handleTheme(theme);
  } else {
    document.getElementById('theme-changer').querySelectorAll('input')[0].checked = true;
  }

  if (localStorage.getItem('font')) {
    var font = localStorage.getItem('font'),
        input = document.getElementById('font-changer').querySelectorAll('input[value=' + font + ']');

    input[0].checked = true;
    handleFont(font);
  } else {
    document.getElementById('font-changer').querySelectorAll('input')[0].checked = true;
  }

  if (localStorage.getItem('customStyles')) {
    var styles = localStorage.getItem('customStyles');
    document.getElementById('custom-styles').innerHTML = styles;
    document.getElementById('custom-styles-input').value = styles;
  }

})();
