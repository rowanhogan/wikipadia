
var $ = require('jquery');

function handleTheme (theme) {
  $('html').removeClass('dark');
  $('html').removeClass('inverted');
  $('html').addClass(theme);
  localStorage.setItem('theme', theme);
}

module.exports = handleTheme;
