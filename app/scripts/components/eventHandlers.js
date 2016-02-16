
var $ = require('jquery');
var handleTheme = require('./handleTheme');
var handleFont = require('./handleFont');
var lastScrollTop = 55;

$(document).on('scroll', function(e) {
  var st = $(window).scrollTop();

  var header = $("#page-header");

  if (st >= lastScrollTop) {
    header.addClass('scrolled');
  } else {
    header.removeClass('scrolled');
  }

  if (st > 55) {
    lastScrollTop = st;
  } else {
    lastScrollTop = 55;
  }
});


$(document).on('click', '.page-title', function(e) {
  e.preventDefault();

  $('.infobox').toggleClass('active');
});

$(document).on('click', '#toc ul a', function(e) {
  $('#toc').removeClass('active');
  $('body').removeClass('toc-active');

  setTimeout(function () {
    $("#page-header").addClass('scrolled')
  }, 100);
});

$(document).on('click', '#toc-toggle', function(e) {
  e.preventDefault();

  $('body').addClass('toc-active');
  $('#toc').toggleClass('active');
});

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

$(document).on('click', '.sidebar-toggle', function(e) {
  e.preventDefault();

  $('#toc').removeClass('active');
  $('.menu-toggle').removeClass('active');
  $('body').removeClass('menu-active');
  $('body').removeClass('toc-active');
});

$(document).on('click', '.menu-toggle', function(e) {
  e.preventDefault();

  $('.menu-toggle').toggleClass('active');
  $('body').toggleClass('menu-active');
});

$(document).on('keyup', function(e) {
  if (e.which == 27) {
    $('body').removeClass('menu-active');
    $('body').removeClass('toc-active');
    $('.menu-toggle').removeClass('active');
  }
});
