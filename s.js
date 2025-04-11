! function(e) {
    "use strict";
    e(".checkout-page__payment__title").length && (e(".checkout-page__payment__item").find(".checkout-page__payment__content").hide(), e(".checkout-page__payment__item--active").find(".checkout-page__payment__content").show(), e(".checkout-page__payment__title").on("click", function(t) {
        t.preventDefault(), e(this).parents(".checkout-page__payment").find(".checkout-page__payment__item").removeClass("checkout-page__payment__item--active"), e(this).parents(".checkout-page__payment").find(".checkout-page__payment__content").slideUp(), e(this).parent().addClass("checkout-page__payment__item--active"), e(this).parent().find(".checkout-page__payment__content").slideDown()
    }));
    let t = e(".dynamic-year");
    if (t.length) {
        let n = new Date().getFullYear();
        t.html(n)
    }
    if (e(".count-bar").length && e(".count-bar").appear(function() {
            var t = e(this),
                n = t.data("percent");
            e(t).css("width", n).addClass("counted")
        }, {
            accY: -50
        }), e(".count-box").length && e(".count-box").appear(function() {
            var t = e(this),
                n = t.find(".count-text").attr("data-stop"),
                a = parseInt(t.find(".count-text").attr("data-speed"), 10);
            t.hasClass("counted") || (t.addClass("counted"), e({
                countNum: t.find(".count-text").text()
            }).animate({
                countNum: n
            }, {
                duration: a,
                easing: "linear",
                step: function() {
                    t.find(".count-text").text(Math.floor(this.countNum))
                },
                complete: function() {
                    t.find(".count-text").text(this.countNum)
                }
            }))
        }, {
            accY: 0
        }), e(".custom-cursor").length) {
        var a = document.querySelector(".custom-cursor__cursor"),
            i = document.querySelector(".custom-cursor__cursor-two"),
            o = document.querySelectorAll("a");
        document.addEventListener("mousemove", function(e) {
            e.clientX, e.clientY, a.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
        }), document.addEventListener("mousemove", function(e) {
            var t = e.clientX,
                n = e.clientY;
            i.style.left = t + "px", i.style.top = n + "px"
        }), document.addEventListener("mousedown", function() {
            a.classList.add("click"), i.classList.add("custom-cursor__innerhover")
        }), document.addEventListener("mouseup", function() {
            a.classList.remove("click"), i.classList.remove("custom-cursor__innerhover")
        }), o.forEach(e => {
            e.addEventListener("mouseover", () => {
                a.classList.add("custom-cursor__hover")
            }), e.addEventListener("mouseleave", () => {
                a.classList.remove("custom-cursor__hover")
            })
        })
    }
    if (e(".contact-form-validated").length && e(".contact-form-validated").validate({
            rules: {
                name: {
                    required: !0
                },
                email: {
                    required: !0,
                    email: !0
                },
                message: {
                    required: !0
                },
                subject: {
                    required: !0
                }
            },
            submitHandler: function(t) {
                return e.post(e(t).attr("action"), e(t).serialize(), function(n) {
                    e(t).parent().find(".result").append(n), e(t).find('input[type="text"]').val(""), e(t).find('input[type="email"]').val(""), e(t).find("textarea").val("")
                }), !1
            }
        }), e(".mc-form").length && e(".mc-form").each(function() {
            var t = e(this),
                n = t.data("url"),
                a = t.parent().find(".mc-form__response");
            t.ajaxChimp({
                url: n,
                callback: function(e) {
                    a.append(function() {
                        return '<p class="mc-message">' + e.msg + "</p>"
                    }), "success" === e.result && (t.removeClass("errored").addClass("successed"), a.removeClass("errored").addClass("successed"), t.find("input").val(""), a.find("p").fadeOut(1e4)), "error" === e.result && (t.removeClass("successed").addClass("errored"), a.removeClass("successed").addClass("errored"), t.find("input").val(""), a.find("p").fadeOut(1e4))
                }
            })
        }), e(".video-popup").length && e(".video-popup").magnificPopup({
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: !0,
            fixedContentPos: !1
        }), e(".img-popup").length) {
        var r = {};
        e(".img-popup").each(function() {
            var t = parseInt(e(this).attr("data-group"), 10);
            r[t] || (r[t] = []), r[t].push(this)
        }), e.each(r, function() {
            e(this).magnificPopup({
                type: "image",
                closeOnContentClick: !0,
                closeBtnInside: !1,
                gallery: {
                    enabled: !0
                }
            })
        })
    }

    function l(t) {
        let n = window.location.href.split("/").reverse()[0];
        t.find("li").each(function() {
            let t = e(this).find("a");
            e(t).attr("href") == n && e(this).addClass("current")
        }), t.find("li").each(function() {
            e(this).find(".current").length && e(this).addClass("current")
        }), "" == n && t.find("li").eq(0).addClass("current")
    }
    if (e(".main-menu__list").length && l(e(".main-menu__list")), e(".service-sidebar__nav").length && l(e(".service-sidebar__nav")), e(".main-menu").length && e(".mobile-nav__container").length) {
        let s = document.querySelector(".main-menu").innerHTML;
        document.querySelector(".mobile-nav__container").innerHTML = s
    }
    e(".sticky-header").length && e(".sticky-header").clone().insertAfter(".sticky-header").addClass("sticky-header--cloned"), e(".mobile-nav__container .main-menu__list").length && e(".mobile-nav__container .main-menu__list .dropdown > a").each(function() {
        let t = e(this),
            n = document.createElement("BUTTON");
        n.setAttribute("aria-label", "dropdown toggler"), n.innerHTML = "<i class='fa fa-angle-down'></i>", t.append(function() {
            return n
        }), t.find("button").on("click", function(t) {
            t.preventDefault();
            let n = e(this);
            n.toggleClass("expanded"), n.parent().toggleClass("expanded"), n.parent().parent().children("ul").slideToggle()
        })
    }), e(document).on("click", ".megamenu-clickable--toggler > a", function(t) {
        e("body").toggleClass("megamenu-popup-active"), e(this).parent().find("ul").toggleClass("megamenu-clickable--active"), t.preventDefault()
    }), e(document).on("click", ".megamenu-clickable--close", function(t) {
        e("body").removeClass("megamenu-popup-active"), e(".megamenu-clickable--active").removeClass("megamenu-clickable--active"), t.preventDefault()
    }), e(".mobile-nav__toggler").length && e(".mobile-nav__toggler").on("click", function(t) {
        t.preventDefault(), e(".mobile-nav__wrapper").toggleClass("expanded"), e("body").toggleClass("locked")
    }), e(".search-toggler").length && e(".search-toggler").on("click", function(t) {
        t.preventDefault(), e(".search-popup").toggleClass("active"), e(".closex").removeClass("expanded"), e("body").toggleClass("locked")
    }), e(".mini-cart__toggler").length && e(".mini-cart__toggler").on("click", function(t) {
        t.preventDefault(), e(".mini-cart").toggleClass("expanded"), e(".mobile-nav__wrapper").removeClass("expanded"), e("body").toggleClass("locked")
    }), e(".odometer").length && e(".odometer").appear(function(t) {
        e(".odometer").each(function() {
            var t = e(this).attr("data-count");
            e(this).html(t)
        })
    }), e(".wow").length && new WOW({
        boxClass: "wow",
        animateClass: "animated",
        mobile: !0,
        live: !0
    }).init();
    let c = e(".kidearn-tilt");
    if (c.length && c.each(function() {
            let t = e(this),
                n = t.data("tilt-options");
            t.tilt("object" == typeof n ? n : JSON.parse(n))
        }), e("#donate-amount__predefined").length) {
        let d = e("#donate-amount");
        e("#donate-amount__predefined").find("li").on("click", function(t) {
            t.preventDefault();
            let n = e(this).find("a").text();
            d.val(n), e("#donate-amount__predefined").find("li").removeClass("active"), e(this).addClass("active")
        })
    }
    if (e(".kidearn-accrodion").length && e(".kidearn-accrodion").each(function() {
            var t = e(this).data("grp-name"),
                n = e(this),
                a = n.find(".accrodion");
            n.addClass(t), n.find(".accrodion .accrodion-content").hide(), n.find(".accrodion.active").find(".accrodion-content").show(), a.each(function() {
                e(this).find(".accrodion-title").on("click", function() {
                    !1 === e(this).parent().hasClass("active") && (e(".kidearn-accrodion." + t).find(".accrodion").removeClass("active"), e(".kidearn-accrodion." + t).find(".accrodion").find(".accrodion-content").slideUp(), e(this).parent().addClass("active"), e(this).parent().find(".accrodion-content").slideDown())
                })
            })
        }), e(".add").on("click", function() {
            999 > e(this).prev().val() && e(this).prev().val(+e(this).prev().val() + 1)
        }), e(".sub").on("click", function() {
            e(this).next().val() > 0 && e(this).next().val() > 0 && e(this).next().val(+e(this).next().val() - 1)
        }), e(".tabs-box").length && e(".tabs-box .tab-buttons .tab-btn").on("click", function(t) {
            t.preventDefault();
            var n = e(e(this).attr("data-tab"));
            if (e(n).is(":visible")) return !1;
            n.parents(".tabs-box").find(".tab-buttons").find(".tab-btn").removeClass("active-btn"), e(this).addClass("active-btn"), n.parents(".tabs-box").find(".tabs-content").find(".tab").fadeOut(0), n.parents(".tabs-box").find(".tabs-content").find(".tab").removeClass("active-tab"), e(n).fadeIn(300), e(n).addClass("active-tab")
        }), e(".range-slider-price").length) {
        var u = document.getElementById("range-slider-price");
        noUiSlider.create(u, {
            start: [30, 150],
            limit: 200,
            behaviour: "drag",
            connect: !0,
            range: {
                min: 10,
                max: 200
            }
        });
        var p = document.getElementById("min-value-rangeslider"),
            m = document.getElementById("max-value-rangeslider");
        u.noUiSlider.on("update", function(t, n) {
            (n ? e(m) : e(p)).text(t[n])
        })
    }(f = e(".scrollToLink")).length && f.children("a").bind("click", function(t) {
        if (e(window).scrollTop() > 10) var n = "0";
        else var n = "0";
        var a = e(this);
        e("html, body").stop().animate({
            scrollTop: e(a.attr("href")).offset().top - n + "px"
        }, 900, "easeInOutExpo"), f.removeClass("current"), f.removeClass("current-menu-ancestor"), f.removeClass("current_page_item"), f.removeClass("current-menu-parent"), a.parent().addClass("current"), t.preventDefault()
    });
    var f, h, g, v = "active";

    function y() {
        var t = e(window).width();
        e(".row .kidearn-stretch-element-inside-column").each(function() {
            var n = e(this),
                a = n.closest(".row"),
                i = n.closest('[class^="col-"]'),
                o = (n.closest('[class^="col-"]').height(), this.getBoundingClientRect()),
                r = a[0].getBoundingClientRect(),
                l = i[0].getBoundingClientRect(),
                s = o.left,
                c = t - o.right,
                d = r.left + (parseFloat(a.css("padding-left")) || 0),
                u = t - r.right + (parseFloat(a.css("padding-right")) || 0),
                p = l.left,
                m = t - l.right,
                f = {
                    "margin-left": 0,
                    "margin-right": 0
                };
            if (Math.round(d) === Math.round(p)) {
                var h = parseFloat(n.css("margin-left") || 0);
                f["margin-left"] = h - s
            }
            if (Math.round(u) === Math.round(m)) {
                var g = parseFloat(n.css("margin-right") || 0);
                f["margin-right"] = g - c
            }
            n.css(f)
        })
    }
    h = e(".sticky-header--normal"), g = 0, window.addEventListener("scroll", function() {
        var e = window.pageYOffset || document.documentElement.scrollTop;
        e > 500 ? e > g ? h.removeClass(v) : h.addClass(v) : h.removeClass(v), g = e
    }, !1), y(), e(window).on("load", function() {
        e(".preloader").length && e(".preloader").fadeOut();
        let t;
        (t = e(".kidearn-owl__carousel")).length && t.each(function() {
                let t = e(this),
                    n = t.data("owl-options");
                t.owlCarousel("object" == typeof n ? n : JSON.parse(n)), t.find("button").each(function() {
                    e(this).attr("aria-label", "carousel button")
                })
            }),
            function e() {
                let t = document.querySelectorAll(".thm-tiny__slider");
                t.forEach(function(e) {
                    let t = JSON.parse(e.dataset.tinyOptions);
                    tns(t)
                })
            }(), e(".price-ranger").length && (e(".price-ranger #slider-range").slider({
                range: !0,
                min: 50,
                max: 1e3,
                values: [11, 500],
                slide: function(t, n) {
                    e(".price-ranger .ranger-min-max-block .min").val("$" + n.values[0]), e(".price-ranger .ranger-min-max-block .max").val("$" + n.values[1])
                }
            }), e(".price-ranger .ranger-min-max-block .min").val("$" + e(".price-ranger #slider-range").slider("values", 0)), e(".price-ranger .ranger-min-max-block .max").val("$" + e(".price-ranger #slider-range").slider("values", 1)));
        let n;
        if (((n = e(".kidearn-splax")).length && n.each(function() {
                let t = e(this),
                    n = t.attr("class");
                var a = document.getElementsByClassName(n);
                let i = t.data("para-options");
                new simpleParallax(a, "object" == typeof i ? i : JSON.parse(i))
            })), e(".circle-progress").length && e(".circle-progress").appear(function() {
                e(".circle-progress").each(function() {
                    let t = e(this),
                        n = t.data("options");
                    t.circleProgress(n)
                })
            }), e(".masonry-layout").length && e(".masonry-layout").imagesLoaded(function() {
                e(".masonry-layout").isotope({
                    layoutMode: "masonry"
                })
            }), e(".fitRow-layout").length && e(".fitRow-layout").imagesLoaded(function() {
                e(".fitRow-layout").isotope({
                    layoutMode: "fitRows"
                })
            }), e(".post-filter").length) {
            var a = e(".post-filter li");
            e(".filter-layout").isotope({
                filter: ".filter-item",
                animationOptions: {
                    duration: 500,
                    easing: "linear",
                    queue: !1
                }
            }), a.on("click", function() {
                var t = e(this),
                    n = t.attr("data-filter");
                return a.removeClass("active"), t.addClass("active"), e(".filter-layout").isotope({
                    filter: n,
                    animationOptions: {
                        duration: 500,
                        easing: "linear",
                        queue: !1
                    }
                }), !1
            })
        }
        e(".post-filter.has-dynamic-filter-counter").length && e(".post-filter.has-dynamic-filter-counter").find("li").each(function() {
            var t = e(this).data("filter"),
                n = e(".filter-layout").find(t).length;
            e(this).append("<sup>[" + n + "]</sup>")
        });
        let i;
        (i = e(".curved-circle--item")).length && i.each(function() {
            let t = e(this),
                n = t.data("circle-text-options");
            t.circleType("object" == typeof n ? n : JSON.parse(n))
        })
    });
    if (e(".scroll-top path").length) {
        var b = document.querySelector(".scroll-top path"),
            C = b.getTotalLength();
        b.style.transition = b.style.WebkitTransition = "none", b.style.strokeDasharray = C + " " + C, b.style.strokeDashoffset = C, b.getBoundingClientRect(), b.style.transition = b.style.WebkitTransition = "stroke-dashoffset 10ms linear";
        var $ = function() {
            var t = e(window).scrollTop(),
                n = e(document).height() - e(window).height();
            b.style.strokeDashoffset = C - t * C / n
        };
        $(), e(window).scroll($);
        var k = e(".scroll-top");
        e("body, html"), e(window).on("scroll", function() {
            e(window).scrollTop() > e(window).height() ? k.addClass("scroll-top--active") : k.removeClass("scroll-top--active")
        })
    }
    e(window).on("scroll", function() {
        var t;
        if (((t = e(window).scrollTop()) >= 117 ? e(".one-page-scroll-menu .scrollToLink").children("a").each(function() {
                var n = e(this).attr("href");
                e(n).each(function() {
                    if (e(this).offset().top <= t + 100) {
                        var a = e(n).attr("id");
                        e(".one-page-scroll-menu").find("li").removeClass("current"), e(".one-page-scroll-menu").find("li").removeClass("current-menu-ancestor"), e(".one-page-scroll-menu").find("li").removeClass("current_page_item"), e(".one-page-scroll-menu").find("li").removeClass("current-menu-parent"), e(".one-page-scroll-menu").find("a[href*=\\#" + a + "]").parent().addClass("current")
                    }
                })
            }) : (e(".one-page-scroll-menu li.current").removeClass("current"), e(".one-page-scroll-menu li:first").addClass("current"))), e(".sticky-header--one-page").length) {
            var n = e(".sticky-header--one-page");
            e(window).scrollTop() > 130 ? n.addClass("active") : 130 >= e(this).scrollTop() && n.removeClass("active")
        }
    }), e(window).on("resize", function() {
        y()
    })
}(jQuery);