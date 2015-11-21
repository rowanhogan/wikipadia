
var $ = require('jquery');
var handleTheme = require('./handleTheme');
var handleFont = require('./handleFont');

$(document).on('keyup', '#custom-styles-input', function(e) {
  var styles = $(this).val();

  $('#custom-styles').html(styles);
  localStorage.setItem('customStyles', styles);
});

$(document).on('submit', '.search-form', function(e) {
  e.preventDefault();

  window.location.search = $(this).find('input').val().replace(/ /g, "_")
});

$(document).on('change', '#theme-changer input', function(e) {
  e.preventDefault();

  var theme = $(this).val();
  handleTheme(theme);
});

$(document).on('change', '#font-changer input', function(e) {
  e.preventDefault();

  var font = $(this).val();
  handleFont(font);
});

$(document).on('click', '.menu-toggle', function(e) {
  e.preventDefault();

  $('.menu-toggle').toggleClass('active');
  $('body').toggleClass('sidebar-active');
});

$(document).on('keyup', function(e) {
  if (e.which == 27) {
    $('body').removeClass('sidebar-active');
    $('.menu-toggle').removeClass('active');
  }
});
