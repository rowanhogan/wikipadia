
var $ = require('jquery');
var handleTheme = require('./handleTheme');
var handleSearch = require('./handleSearch');
var handleFont = require('./handleFont');
var debounce = require('./debounce');
var lastScrollTop = 55;

var searchForm = debounce(function(e) {
  e.preventDefault();
  var query = $('.search-form').find('input').val();
  handleSearch(query, 'en');
}, 300);

$(document).on('keyup', '.search-form', function(e) {
  var keyPressed = e.which,
      $form = $('.search-form');

  if (keyPressed === 27) {
    e.preventDefault();
    $form.find('.search-results').remove();
  }

  if (keyPressed === 38 || keyPressed === 40) {
    e.preventDefault();

    var $activeLi = $form.find('.search-results li.active');

    if ($activeLi.length) {
      $activeLi.removeClass('active');

      if (keyPressed === 38) {
        $activeLi.prev().addClass('active');
      } else {
        $activeLi.next().addClass('active');
      }
    } else {
      $form.find('.search-results li:first-child').addClass('active');
    }
  } else {
    searchForm(e);
  }
});

$(document).on('submit', '.search-form', function(e) {
  e.preventDefault();

  var $activeLi = $('.search-form .search-results li.active');

  if ($activeLi.length) {
    window.location.assign($activeLi.find('a').attr('href'));
  } else {
    window.location.search = $(this).find('input').val().replace(/ /g, "_")
  }
});

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
