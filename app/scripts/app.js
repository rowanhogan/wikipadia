
var $ = require('jquery');
var bigSlide = require('../../node_modules/bigslide/dist/bigSlide.js');
var handleNewPage = require('./components/handleNewPage');
var handleTheme = require('./components/handleTheme');
var eventHandlers = require('./components/eventHandlers')

if (window.location.hostname.split('.').length > 2) {
  var lang = window.location.hostname.split('.')[0];
} else {
  var lang = 'en';
}

$(function() {
  var htmlEl = document.body.parentElement;

  if (window.location.search.length) {
    htmlEl.classList.remove('initial');
    var pageTitle = window.location.search.substring(1, window.location.search.length)
    handleNewPage(pageTitle, lang);
  } else {
    htmlEl.classList.remove('loading');
  }

  if (localStorage.getItem('theme')) {
    document.getElementById('theme-changer').value = localStorage.getItem('theme');
    handleTheme(localStorage.getItem('theme'));
  }

  if (localStorage.getItem('customStyles')) {
    var styles = localStorage.getItem('customStyles');
    document.getElementById('custom-styles').innerHTML(styles);
    document.getElementById('custom-styles-input').value = styles;
  }

  $('.menu-link').bigSlide({
    side: 'right',
    menuWidth: '22em'
  });
});
