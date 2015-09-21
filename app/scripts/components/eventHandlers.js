
var $ = require('jquery');
var handleTheme = require('./handleTheme');

$(document).on('keyup', '#custom-styles-input', function(e) {
  var styles = $(this).val();

  $('#custom-styles').html(styles);
  localStorage.setItem('customStyles', styles);
});

$(document).on('submit', '.search-form', function(e) {
  e.preventDefault();

  window.location.search = $(this).find('input').val().replace(' ', '_');
});

$(document).on('change', '#theme-changer', function(e) {
  e.preventDefault();

  var theme = $(this).val();
  handleTheme(theme);
});
