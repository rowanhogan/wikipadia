
    var lang = 'en';

    function handleData (data) {
      var html = data.parse.text['*'];

      var regex = new RegExp('href="/wiki/', 'g');
      html = html.replace(regex, 'href="?');

      // Fix for special links

      $.each(['File', 'Help', 'Book'], function(i, typeString) {
        html = html.split('?' + typeString).join('https://' + lang + '.m.wikipedia.org/wiki/wiki/' + typeString);
      });

      $('#content').html(html);
      $('title').html(data.parse.title + " – Wikireadia");
      $('#content').prepend("<h1>" + data.parse.title + "</h1>");
      $(window).scrollTop(0);


      if ($('ul.redirectText').length) {
        $('ul.redirectText').find('li a').each(function (i, el) {
          var $link = $(el);

          var newHref = $link.attr('href').replace('/w/index.php?title=', '?').replace('&redirect=no', '');

          $link.attr('href', newHref);
        });
      }

    }

    function handleNewPage (pageTitle) {
      $('html').addClass('loading');

      var request = $.ajax({
          url: 'https://' + lang + '.wikipedia.org/w/api.php?callback=?',
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
        handleData(data);
        $('html').removeClass('loading');
      }, function( jqXHR, textStatus, errorThrown ) {
        $('html').removeClass('loading');
        console.log(jqXHR, textStatus, errorThrown);
      });
    }

    function handleTheme (theme) {
      $('html').removeClass('dark');
      $('html').removeClass('inverted');
      $('html').addClass(theme);
      localStorage.setItem('theme', theme);
    }

    $(document).on('keyup', '#custom-styles', function(e) {
      localStorage.setItem('customStyles', this.innerHTML);
    });

    $(document).on('click', '#toggle-styles', function(e) {
      e.preventDefault();

      $(this).toggleClass('active');
      $('#custom-styles').toggleClass('visible');
    });

    $(document).on('submit', '#search-form', function(e) {
      e.preventDefault();

      window.location.search = $(this).find('input').val().replace(' ', '_');
    });

    $(document).on('change', '#theme-changer', function(e) {
      e.preventDefault();

      var theme = $(this).val();

      handleTheme(theme);
    })

    $(function() {
      FastClick.attach(document.body);

      if (window.location.search.length) {
        var pageTitle = window.location.search.substring(1, window.location.search.length)
        handleNewPage(pageTitle);
      } else {
        console.log('No query')
      }

      if (localStorage.getItem('theme')) {
        $('#theme-changer').val(localStorage.getItem('theme'));
        handleTheme(localStorage.getItem('theme'));
      }

      if (localStorage.getItem('customStyles')) {
        $('#custom-styles').html(localStorage.getItem('customStyles'));
      }
    });
