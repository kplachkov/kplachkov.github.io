(function ($) {
    'use strict';
    /**
     * Responsive scrolling for URL hashes.
     */
    // Dynamically get responsive navigation bar offset.
    var $navbar = $('.navbar-header');
    var navbar_offset = $navbar.innerHeight();

    /**
     * Responsive hash scrolling.
     * Check for a URL hash as an anchor.
     * If it exists on current page, scroll to it responsively.
     * If `target` argument omitted (e.g. after event), assume it's the window's hash.
     */
    function scrollToAnchor(target) {
        // If `target` is undefined or HashChangeEvent object, set it to window's hash.
        target = (typeof target === 'undefined' || typeof target === 'object') ? window.location.hash : target;
        // Escape colons from IDs, such as those found in Markdown footnote links.
        target = target.replace(/:/g, '\\:');

        // If target element exists, scroll to it taking into account fixed navigation bar offset.
        if ($(target).length) {
            $('body').addClass('scrolling');
            $('html, body').animate({
                scrollTop: $(target).offset().top - navbar_offset
            }, 600, function () {
                $('body').removeClass('scrolling');
            });
        }
    }

    // Make Scrollspy responsive.
    function fixScrollspy() {
        var $body = $('body');
        var data = $body.data('bs.scrollspy');
        if (data) {
            data.options.offset = navbar_offset;
            $body.data('bs.scrollspy', data);
            $body.scrollspy('refresh');
        }
    }

    // Check for hash change event and fix responsive offset for hash links (e.g. Markdown footnotes).
    window.addEventListener("hashchange", scrollToAnchor);

    /**
     * Add smooth scrolling to all links inside the main navbar.
     */
    $('#navbar-main li.nav-item a').on('click', function (event) {
        // Store requested URL hash.
        var hash = this.hash;

        // If we are on the homepage and the navigation bar link is to a homepage section.
        if (hash && $(hash).length && ($("#homepage").length > 0)) {
            // Prevent default click behavior.
            event.preventDefault();

            // Use jQuery's animate() method for smooth page scrolling.
            // The numerical parameter specifies the time (ms) taken to scroll to the specified hash.
            $('html, body').animate({
                scrollTop: $(hash).offset().top - navbar_offset
            }, 800);
        }
    });

    /**
     * Smooth scrolling for Back To Top link.
     */
    $('#back_to_top').on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({
            'scrollTop': 0
        }, 800, function () {
            window.location.hash = "";
        });
    });

    /**
     * Hide mobile collapsable menu on clicking a link.
     */
    $(document).on('click', '.navbar-collapse.in', function (e) {
        //get the <a> element that was clicked, even if the <span> element that is inside the <a> element is e.target
        var targetElement = $(e.target).is('a') ? $(e.target) : $(e.target).parent();

        if (targetElement.is('a') && targetElement.attr('class') != 'dropdown-toggle') {
            $(this).collapse('hide');
        }
    });

    /**
     * Filter projects.
     */
    var $grid_projects = $('#container-projects');
    $grid_projects.imagesLoaded(function () {
        // Initialize Isotope after all images have loaded.
        $grid_projects.isotope({
            itemSelector: '.isotope-item',
            layoutMode: 'masonry'
        });

        // Filter items when filter link is clicked.
        $('#filters a').click(function () {
            var selector = $(this).attr('data-filter');
            $grid_projects.isotope({filter: selector});
            $(this).removeClass('active').addClass('active').siblings().removeClass('active all');
            return false;
        });
    });

    /**
     * On window load.
     */
    $(window).on('load', function () {
        if (window.location.hash) {
            // When accessing homepage from another page and `#top` hash is set, show top of page (no hash).
            if (window.location.hash == "#top") {
                window.location.hash = ""
            } else {
                // If URL contains a hash, scroll to target ID taking into account responsive offset.
                scrollToAnchor();
            }
        }

        // Initialize Scrollspy.
        var $body = $('body');
        $body.scrollspy({offset: navbar_offset});

        // Call `fixScrollspy` when window is resized.
        var resizeTimer;
        $(window).resize(function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(fixScrollspy, 200);
        });
    });

    $('#theme-change').click(function(e) {
        e.preventDefault();
        if ($(this).children(0).hasClass('fa-sun-o')) {
            $(this).children(0).removeClass('fa-moon-o').removeClass('fa-sun-o').addClass('fa-moon-o');
            $('#theme').attr('href', "/css/light-theme.min.css");
            $.cookie('theme', 0, { expires: 60, path: '/' });
        } else {
            $(this).children(0).removeClass('fa-moon-o').removeClass('fa-sun-o').addClass('fa-sun-o');
            $('#theme').attr('href', "/css/dark-theme.min.css");
            $.cookie('theme', 1, { expires: 60, path: '/' });
        }
    });
    if ($.cookie('theme')==null || $.cookie('theme')==0)
    {
        $('#theme').attr('href', "/css/light-theme.min.css");
        $('#theme-change').children(0).removeClass('fa-moon-o').removeClass('fa-sun-o').addClass('fa-moon-o');
    }
    else {
        $('#theme').attr('href', "/css/dark-theme.min.css");
        $('#theme-change').children(0).removeClass('fa-moon-o').removeClass('fa-sun-o').addClass('fa-sun-o');
    }
})(jQuery);