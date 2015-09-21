
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
  if (window.location.search.length) {
    $('html').removeClass('initial');
    var pageTitle = window.location.search.substring(1, window.location.search.length)
    handleNewPage(pageTitle, lang);
  } else {
    $('html').removeClass('loading');
  }

  if (localStorage.getItem('theme')) {
    $('#theme-changer').val(localStorage.getItem('theme'));
    handleTheme(localStorage.getItem('theme'));
  }

  if (localStorage.getItem('customStyles')) {
    var styles = localStorage.getItem('customStyles');
    $('#custom-styles').html(styles);
    $('#custom-styles-input').val(styles);
  }

  $('.menu-link').bigSlide({
    side: 'right',
    menuWidth: '22em'
  });
});
