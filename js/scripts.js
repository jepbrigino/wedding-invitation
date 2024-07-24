var Jamira;
! function(u) {
    "use strict";

    (Jamira = {
        initialized: !1,
        slideshowImages: slideshow_images,

        init: function() {
            var e = this;
            e.initialized || (e.initialized = !0, e.build(), e.events());
        },
        build: function() {
            var e = this;
            e.jamiraStyle(), e.preloader(), e.navigation(), e.createMobileMenu(), e.heroHeight(), e.createLightboxGallery(), e.createBackgroundSlideshow(), e.createOwlSliders(), e.appendNumOfSeats()
        },
        events: function() {
            var e, t, a = this;
            a.windowResize(), e = setInterval(function() {
                /loaded|complete/.test(document.readyState) && (clearInterval(e), a.resizeVideos())
            }, 10), a.objEvents(), a.parallaxTimeline(), t = setInterval(function() {
                /loaded|complete/.test(document.readyState) && (clearInterval(t), a.animateElems())
            }, 10)
        },
        jamiraStyle: function() {
            u(".jamira-style, .btn.btn-primary, .btn.btn-light, .btn.btn-dark").prepend('<span class="h-lines"></span><span class="v-lines"></span>')
        },
        preloader: function() {
            var e = setInterval(function() {
                /loaded|complete/.test(document.readyState) && (clearInterval(e), u("#preloader").fadeOut(1e3))
            }, 10)
        },
        windowResize: function() {
            var t = this;
            u(window).resize(function() {
                var e = u(window).innerWidth();
                t.createMobileMenu(e), u(window).innerWidth() < 751 && (u(".navbar > a.btn").addClass("btn-sm"), u(".navbar > a.btn").width("auto"))
            })
        },
        createMobileMenu: function(e) {
            var n, t = this,
                o = u("#wrapper"),
                i = u.browser.mobile ? "touchstart" : "click";
            null !== e && (e = u(window).innerWidth()), e <= 975 && !t.mobMenuFlag && (u("body").prepend('<nav class="nav-mobile"><i class="fa fa-times"></i><h2> Jeff & Jam </h2><ul></ul></nav>'), u(".nav-mobile > ul").html(u(".nav").html()), u(".nav-mobile b, .nav-mobile .nav-logo").remove(), u(".nav-mobile ul.dropdown-menu").removeClass().addClass("dropdown-mobile"), u(".navbar > a.btn").length && (u(".navbar > a.btn").each(function() {
                u(".nav-mobile").append(u(this).clone())
            }), u(".nav-mobile > a.btn").removeClass("btn-light").addClass("btn-primary btn-sm")), n = u(".nav-mobile"), u("#nav-mobile-btn").on(i, function(e) {
                e.stopPropagation(), e.preventDefault(), setTimeout(function() {
                    o.addClass("open"), n.addClass("open")
                }, 25), u(document).on(i, function(e) {
                    u(e.target).hasClass("nav-mobile") || u(e.target).parents(".nav-mobile").length || (o.removeClass("open"), n.removeClass("open"), u(document).off(i))
                }), u(">i", n).on(i, function() {
                    o.removeClass("open"), n.removeClass("open"), u(document).off(i)
                })
            }), t.mobMenuFlag = !0, u(".nav-mobile li a").on("click", function(e) {
                var t = u(this),
                    a = 0;
                "#hero" !== t.attr("href") && (a = u(t.attr("href")).offset().top - 65), u("html, body").stop().animate({
                    scrollTop: a
                }, 1500, "easeInOutExpo", function() {
                    t.blur()
                }), o.removeClass("open"), n.removeClass("open"), u(document).off(i), e.preventDefault()
            }))
        },
        objEvents: function() {
            u(".btn").each(function() {
                var e = u(this),
                    t = e.width(),
                    a = 2,
                    n = e.text().split(" ").length;
                2 < n || 0 !== e.find("i").length ? a = 15 : 1 < n && (a = 8), e.width(Math.round(t) + a)
            }), u("#about-us .element .image").on("mouseenter", function() {
                var e = u(this);
                if (e.parent().is(":first-child") && !u(">.divider-about-us", e.closest(".row")).hasClass("flip")) return !1;
                e.hasClass("flip") || ((u("#about-us .element .image.flip").length ? u("#about-us .element .image") : e).toggleClass("flip"), u(">.divider-about-us", e.closest(".row")).toggleClass("flip"))
            }), u("#map_canvas").on("mouseenter", function() {
                u(".location-info").addClass("open")
            }).on("mouseleave", function() {
                u(".location-info").removeClass("open")
            }), u(".nav-logo, .scrollto").on("click", function(e) {
                var t = u(this),
                    a = 0,
                    n = t.attr("href");
                /#/.test(n) && u(n).length && (e.preventDefault(), "#hero" !== n && (a = u(n).offset().top - 65), u("html, body").stop().animate({
                    scrollTop: a
                }, 1500, "easeInOutExpo", function() {
                    t.blur()
                }))
            }), u(".element-v2").length && u(".element-v2").each(function() {
                var e = u(">.image", u(this));
                e.css({
                    "background-image": "url(" + u(">img", e).attr("src") + ")"
                }), u(">img", e).hide()
            }), u(".overflow-image").length && u(".overflow-image").each(function() {
                var e = u(this);
                e.css({
                    "background-image": "url(" + u(">img", e).attr("src") + ")"
                })
            }), u(".progress").length && u(".progress").waypoint(function() {
                u(".progress").each(function() {
                    u("> .progress-bar", u(this)).delay(300).queue(function(e) {
                        var t = u(this);
                        t.css("width", t.attr("aria-valuenow") + "%"), e()
                    })
                })
            }, {
                triggerOnce: !0,
                offset: "bottom-in-view"
            })
        },        
        navigation: function() {
            u(".nav li a").on("click", function(e) {
                var t = u(this),
                    a = 0;
                if (u.browser.mobile && (!t.closest(".dropdown").hasClass("open") || "block" === t.closest(".dropdown-menu").css("display") || !t.parent().parent().hasClass("nav"))) return e.preventDefault(), !1;
                "#" === t.attr("href").charAt(0) && u(t.attr("href")).length ? (e.preventDefault(), "#hero" !== t.attr("href") && null !== u(t.attr("href")).offset() && (a = u(t.attr("href")).offset().top - 55), u("html, body").stop().animate({
                    scrollTop: a
                }, 1500, "easeOutExpo", function() {
                    t.blur()
                })) : window.open(t.attr("href"), "_self")
            }), void 0 !== window.Waypoint && new Waypoint.Sticky({
                element: u(".nav-section"),
                offset: -1
            }), u(".nav-section.light").length && u(window).on("scroll load", function() {
                180 < u(window).scrollTop() ? u(".nav-section.light").addClass("sticky") : u(".nav-section.light").removeClass("sticky")
            }), 0 !== u("#wrapper > section, #wrapper > div#hero").length && this.onepageNav && jQuery().waypoint && u("#wrapper > section, #wrapper > div#hero").waypoint({
                element: u("#wrapper > section"),
                handler: function(e) {
                    var t = u(this),
                        a = t[0].element.id;
                    "up" === e && (a = t[0].element.previousElementSibling.id), u(".nav a").removeClass("active"), (u(window).scrollTop() < 100 ? u('.nav a[href="#hero"]') : u('.nav a[href="#' + a + '"]')).addClass("active")
                },
                offset: "50%"
            }), u(window).on("load", function() {
                var e = location.hash.replace("#", "");
                "" !== e && (location.hash = "", u("html, body").stop().animate({
                    scrollTop: u("#" + e).offset().top - 65
                }, 1500, "easeInOutExpo")), void 0 !== window.Waypoint && new Waypoint.Sticky({
                    element: u(".nav-section")
                })
            })
        },
        parallaxTimeline: function() {
            var i;
            (i = function(n) {
                u("> div", this).each(function() {
                    var e = u(this),
                        t = e.attr("data-parallax"),
                        a = n.clientX * t / 300,
                        t = n.clientY * t / 300;
                    e.css({
                        "-webkit-transform": "translateX(" + a + "px) translateY(" + t + "px)",
                        "-moz-transform": "translateX(" + a + "px) translateY(" + t + "px)",
                        "-ms-transform": "translateX(" + a + "px) translateY(" + t + "px)",
                        "-o-transform": "translateX(" + a + "px) translateY(" + t + "px)",
                        transform: "translateX(" + a + "px) translateY(" + t + "px)"
                    })
                })
            }, 992 < u(window).innerWidth() && u(window).scroll(function() {
                var n = u(window).scrollTop(),
                    o = u(window).height();
                u('.timeline [class^="template-"]').each(function() {
                    var e = u(this),
                        t = e.offset().top,
                        a = e.height();
                    t <= n + o && n <= t + a ? e.on("mousemove", i) : e.off("mousemove", i)
                })
            }))
        },
        resizeVideos: function() {
            var e = u('iframe[src^="http://player.vimeo.com"], iframe[src^="https://player.vimeo.com"], iframe[src^="http://www.youtube.com"], iframe[src^="https://www.youtube.com"], object, embed');
            e.each(function() {
                var e = u(this),
                    t = e.attr("height") / e.attr("width");
                (t < .3 || .8 < t || Number.isNaN(t)) && (t = .559), e.attr("data-aspectRatio", t).removeAttr("height").removeAttr("width")
            }), u(window).resize(function() {
                e.each(function() {
                    var e = u(this),
                        t = e.parent().width();
                    e.width(t).height(t * e.attr("data-aspectRatio"))
                })
            }).resize()
        },
        animateElems: function() {
            function e() {
                u("[data-animation-delay]").each(function() {
                    var e = u(this),
                        t = u(window).scrollTop(),
                        a = u(window).height(),
                        n = parseInt(e.attr("data-animation-delay"), 10),
                        o = e.data("animation-direction");
                    if (void 0 === o) return !1;
                    e.addClass("animate-" + o), u(document).ready(function() {
                        t + a >= e.offset().top && (Number.isNaN(n) || 0 === n ? e.removeClass("animate-" + o).addClass("animation-" + o) : setTimeout(function() {
                            e.removeClass("animate-me").addClass("animation-" + o)
                        }, n))
                    })
                })
            }
            751 <= u(window).innerWidth() ? (u(window).scroll(function() {
                e()
            }), e()) : u("[data-animation-delay]").addClass("visible")
        },
        createLightboxGallery: function() {
            void 0 !== window.lightbox && lightbox.option({
                resizeDuration: 200,
                wrapAround: !0,
                disableScrolling: !0,
                showImageNumberLabel: !1,
                positionFromBottom: 150
            })
        },
        createBackgroundSlideshow: function() {
            u(".bg-slideshow").length && this.slideshowImages.length && u(".bg-slideshow").zoomSlider({
                src: this.slideshowImages,
                bullets: !1,
                speed: 1e4,
                switchSpeed: 1e3,
                interval: 6e3
            })
        },
        createOwlSliders: function() {
            u(".timeline-gallery").length && u(".timeline-gallery").owlCarousel({
                nav: !0,
                dots: !1,
                responsive: {
                    0: {
                        items: 1
                    }
                },
                rtl: this.rtlFlag
            }), u(".testimonials").length && u(".testimonials").owlCarousel({
                nav: !1,
                dots: !0,
                responsive: {
                    0: {
                        items: 1
                    }
                },
                rtl: this.rtlFlag
            })
        },  
        heroHeight: function() {
            this.heroFullScreen && (u("#hero").css({
                minHeight: u(window).innerHeight() + "px"
            }), u(window).resize(function() {
                var e = parseInt(u("#hero").css("padding-bottom")) + 70,
                    t = parseInt(u("#hero").next("section").css("margin-top")),
                    a = u(window).innerHeight() - e,
                    n = u("#hero >.container").height(),
                    o = -10;
                t < 0 && !Number.isNaN(t) && (a += t + e), n = a - n, u(".nav-section.light").length && (o = 10), 0 < n && u(".v-center").length && u("#hero >.container").css({
                    "margin-top": n / 2 + o + "px"
                }), u("#hero").css({
                    minHeight: u(window).innerHeight() + "px"
                })
            }))
        },
        bgImageGrid: function() {
            u("#freewall").length && (u("#freewall .item").each(function() {
                var e = u(this);
                e.width(Math.floor(260 + 200 * Math.random())), e.css({
                    "background-image": "url(" + u(">img", e).attr("src") + ")"
                }), u(">img", e).remove()
            }), u("#freewall").appendTo("#wrapper"), u(document).ready(function() {
                var e = new Freewall("#freewall");
                e.reset({
                    selector: ".item",
                    animate: !1,
                    cellW: 20,
                    cellH: 320,
                    gutterX: 1,
                    gutterY: 1,
                    onResize: function() {
                        e.fitWidth()
                    }
                }), e.fitWidth()
            }))
        },
        appendNumOfSeats: function() {
            const params = new Proxy(new URLSearchParams(window.location.search), {
              get: (searchParams, prop) => searchParams.get(prop),
            });
            let seats = params.seats;
            var a = document.getElementById('rsvp-container').getElementsByTagName('a'),
            length = a.length;

            for(var i=0; i< length; i++){
                a[i].href += seats;
            }
        },
    }).init()
}(jQuery);