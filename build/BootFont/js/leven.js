(function($) {
  "use strict";
  var body = $("body");
  function imageCarousel() {
    $(".portfolio-page-carousel").each(function() {
      $(this).imagesLoaded(function() {
        $(".portfolio-page-carousel").owlCarousel({
          smartSpeed: 1200,
          items: 1,
          loop: true,
          dots: true,
          nav: true,
          navText: false,
          autoHeight: true,
          margin: 10
        });
      });
    });
  }
  function ajaxLoader() {
    var ajaxLoadedContent = $("#page-ajax-loaded");
    function showContent() {
      ajaxLoadedContent.removeClass("fadeOutLeft closed");
      ajaxLoadedContent.show();
      $("body").addClass("ajax-page-visible");
    }
    function hideContent() {
      $("#page-ajax-loaded").addClass("fadeOutLeft closed");
      $("body").removeClass("ajax-page-visible");
      setTimeout(function() {
        $("#page-ajax-loaded.closed").html("");
        ajaxLoadedContent.hide();
        $("#page-ajax-loaded").append(
          '<div class="preloader-portfolio"><div class="preloader-animation"><div class="preloader-spinner"></div></div></div></div>'
        );
      }, 500);
    }
    $(document)
      .on("click", ".site-auto-menu, #portfolio-page-close-button", function(
        e
      ) {
        e.preventDefault();
        hideContent();
      })
      .on("click", ".ajax-page-load", function() {
        var toLoad = $(this).attr("href") + "?ajax=true";
        showContent();
        ajaxLoadedContent.load(toLoad, function() {
          imageCarousel();
          var $gallery_container = $("#portfolio-gallery-grid");
          $gallery_container.imagesLoaded(function() {
            $gallery_container.masonry();
          });
          $(".portfolio-page-wrapper .portfolio-grid").each(function() {
            $(this).magnificPopup({
              delegate: "a.gallery-lightbox",
              type: "image",
              gallery: { enabled: true }
            });
          });
          lazyVideo();
        });
        return false;
      });
  }
  function lazyVideo() {
    var youtube = $(".embed-youtube-video"),
      vimeo = $(".embed-vimeo-video");
    youtube.each(function() {
      var video_wrap = $(this),
        id = $(this).attr("data-embed"),
        id = id.split("youtube.com/embed/")[1];
      var thumb_url = "//img.youtube.com/vi/" + id + "/0.jpg";
      $('<img width="100%" src="' + thumb_url + '" />').appendTo($(this));
      $(this).on("click", "div.play-button", function(e) {
        var $video_iframe = $(
          '<iframe class="embed-responsive-item" src="//www.youtube.com/embed/' +
            id +
            '?rel=0&showinfo=0&autoplay=1&output=embed" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
        );
        $video_iframe.appendTo(video_wrap);
        $(this).hide();
      });
    });
    vimeo.each(function() {
      var video_wrap = $(this),
        id = $(this).attr("data-embed"),
        id = id.split("vimeo.com/video/")[1];
      $('<img class="vimeo-thumb" width="100%" src="" />').appendTo($(this));
      $.getJSON(
        "https://www.vimeo.com/api/v2/video/" + id + ".json?callback=?",
        { format: "json" },
        function(data) {
          video_wrap
            .children(".vimeo-thumb")
            .attr("src", data[0].thumbnail_large);
        }
      );
      $(this).on("click", "div.play-button", function(e) {
        var $video_iframe = $(
          '<iframe class="embed-responsive-item" src="//player.vimeo.com/video/' +
            id +
            '?autoplay=1&loop=1&autopause=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
        );
        $video_iframe.appendTo(video_wrap);
        $(this).hide();
      });
    });
  }
  $(function() {
    $(".contact-form").each(function() {
      var contact_form_id = $(this).attr("id"),
        contact_form = $("#" + contact_form_id + ".contact-form");
      contact_form.validator();
      contact_form.on("submit", function(e) {
        if (!e.isDefaultPrevented()) {
          $.ajax({
            type: "POST",
            url: ajaxurl,
            data: $(this).serialize() + "&action=leven_contact_action",
            success: function(data) {
              var result = JSON.parse(data);
              var messageAlert = "alert-" + result.type;
              var messageText = result.message;
              var alertBox =
                '<div class="alert ' +
                messageAlert +
                ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                messageText +
                "</div>";
              if (messageAlert && messageText) {
                contact_form.find(".messages").html(alertBox);
                if (messageAlert == "alert-success") {
                  $(".contact-form")[0].reset();
                }
              }
            }
          });
          return false;
        }
      });
    });
  });
  function portfolio_init() {
    $(".portfolio-content").each(function() {
      var portfolio_grid_container = $(this),
        portfolio_grid_container_id = $(this).attr("id"),
        portfolio_grid = $(
          "#" + portfolio_grid_container_id + " .portfolio-grid"
        ),
        portfolio_filter = $(
          "#" + portfolio_grid_container_id + " .portfolio-filters"
        ),
        portfolio_filter_item = $(
          "#" + portfolio_grid_container_id + " .portfolio-filters .filter"
        );
      if (portfolio_grid) {
        portfolio_grid.shuffle({ speed: 450, itemSelector: "figure" });
        $(".site-auto-menu").on("click", "a", function(e) {
          portfolio_grid.shuffle("update");
        });
        portfolio_filter.on("click", ".filter", function(e) {
          portfolio_grid.shuffle("update");
          e.preventDefault();
          portfolio_filter_item.parent().removeClass("active");
          $(this)
            .parent()
            .addClass("active");
          portfolio_grid.shuffle("shuffle", $(this).attr("data-group"));
        });
      }
    });
  }
  function animateLayout() {
    var windowWidth = $(window).width(),
      animatedContainer = "",
      blogSidebar = $(".blog-sidebar"),
      animateType = $("#page_container").attr("data-animation");
    if (windowWidth > 991) {
      animatedContainer = $(".page-container");
    } else {
      animatedContainer = $(".site-main");
    }
    animatedContainer.addClass("animated " + animateType);
    $(".page-scroll").addClass("add-prespective");
    animatedContainer.addClass("transform3d");
    setTimeout(function() {
      blogSidebar.removeClass("hidden-sidebar");
      $(".page-scroll").removeClass("add-prespective");
      animatedContainer.removeClass("transform3d");
    }, 1000);
  }
  function scrollTop() {
    if ($(body).scrollTop() > 150) {
      $(".lmpixels-scroll-to-top").removeClass("hidden-btn");
    } else {
      $(".lmpixels-scroll-to-top").addClass("hidden-btn");
    }
  }
  $(window).on("load", function() {
    $(".preloader").fadeOut(800, "linear");
    animateLayout();
  });
  $(document).on("ready", function() {
    var movementStrength = 15;
    var height = movementStrength / $(document).height();
    var width = movementStrength / $(document).width();
    $("body")
      .on("mousemove", function(e) {
        var pageX = e.pageX - $(document).width() / 2,
          pageY = e.pageY - $(document).height() / 2,
          newvalueX = width * pageX * -1,
          newvalueY = height * pageY * -1;
        if ($(".page-container").hasClass("bg-move-effect")) {
          var elements = $(
            ".home-photo .hp-inner:not(.without-move), .lm-animated-bg"
          );
        } else {
          var elements = $(".home-photo .hp-inner:not(.without-move)");
        }
        elements.addClass("transition");
        elements.css({
          "background-position":
            "calc( 50% + " +
            newvalueX +
            "px ) calc( 50% + " +
            newvalueY +
            "px )"
        });
        setTimeout(function() {
          elements.removeClass("transition");
        }, 300);
      })
      .scroll(function() {
        scrollTop();
      });
    var $portfolio_container = $(".portfolio-grid"),
      $gallery_container = $("#portfolio-gallery-grid");
    $gallery_container.imagesLoaded(function() {
      $gallery_container.masonry();
    });
    $portfolio_container.imagesLoaded(function() {
      portfolio_init(this);
    });
    imageCarousel();
    var $container = $(".blog-masonry");
    $container.imagesLoaded(function() {
      $container.masonry({ itemSelector: ".item", resize: false });
    });
    $(".menu-toggle").on("click", function() {
      $(".site-nav").addClass("animate");
      $(".site-nav").toggleClass("mobile-menu-hide");
    });
    $(".text-rotation").owlCarousel({
      loop: true,
      dots: false,
      nav: false,
      margin: 10,
      items: 1,
      autoplay: true,
      autoplayHoverPause: false,
      autoplayTimeout: 3800,
      animateOut: "fadeOut",
      animateIn: "fadeIn"
    });
    body.magnificPopup({
      fixedContentPos: false,
      delegate: "a.lightbox",
      type: "image",
      removalDelay: 300,
      mainClass: "mfp-fade",
      image: { titleSrc: "title", gallery: { enabled: true } },
      iframe: {
        markup:
          '<div class="mfp-iframe-scaler">' +
          '<div class="mfp-close"></div>' +
          '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
          '<div class="mfp-title mfp-bottom-iframe-title"></div>' +
          "</div>",
        patterns: {
          youtube: { index: "youtube.com/", id: null, src: "%id%?autoplay=1" },
          vimeo: {
            index: "vimeo.com/",
            id: "/",
            src: "//player.vimeo.com/video/%id%?autoplay=1"
          },
          gmaps: { index: "//maps.google.", src: "%id%&output=embed" }
        },
        srcAction: "iframe_src"
      },
      callbacks: {
        markupParse: function(template, values, item) {
          values.title = item.el.attr("title");
        }
      }
    });
    $(".ajax-page-load-link").magnificPopup({
      type: "ajax",
      removalDelay: 300,
      mainClass: "mfp-fade",
      gallery: { enabled: true }
    });
    $(".portfolio-page-wrapper .portfolio-grid").each(function() {
      $(this).magnificPopup({
        delegate: "a.gallery-lightbox",
        type: "image",
        gallery: { enabled: true }
      });
    });
    $(".form-control").val("");
    $(".form-control").on("focusin", function() {
      $(this)
        .parent(".form-group")
        .addClass("form-group-focus");
    });
    $(".form-control").on("focusout", function() {
      if ($(this).val().length === 0) {
        $(this)
          .parent(".form-group")
          .removeClass("form-group-focus");
      }
    });
    $("body").append(
      '<div id="page-ajax-loaded" class="page-portfolio-loaded animated fadeInLeft" style="display: none"><div class="preloader-portfolio"><div class="preloader-animation"><div class="preloader-spinner"></div></div></div></div>'
    );
    ajaxLoader();
    $(".sidebar-toggle").on("click", function() {
      $("#blog-sidebar").toggleClass("open");
      $(this).toggleClass("open");
    });
    lazyVideo();
    $(".lmpixels-scroll-to-top").click(function() {
      $("body,html").animate({ scrollTop: 0 }, 400);
      return false;
    });
    scrollTop();
  });
})(jQuery);
