var accordionShortcodesSettings = [{
    id: "accordion-1",
    autoClose: !0,
    openFirst: !1,
    openAll: !1,
    clickToClose: !0,
    scroll: !1
}];

!function (t) {
    "use strict";
    var o;
    t.fn.accordionShortcodes = function (o) {
        function e() {
            return t(this).hasClass("open") ? h.clickToClose && n(t(this)) : (h.autoClose && a.each(function () {
                n(t(this))
            }), i(t(this), !0)), !1
        }
        function i(o, e) {
            o.next().clearQueue().stop().slideDown(l, function () {
                e && h.scroll && t("html, body").animate({scrollTop: t(this).prev().offset().top - h.scrollOffset}, l)
            }), o.addClass("open read").attr({
                "aria-selected": "true",
                "aria-expanded": "true"
            }).next().attr({"aria-hidden": "false"})
        }
        function n(t) {
            t.next().slideUp(l), t.removeClass("open"), t.attr({
                "aria-selected": "false",
                "aria-expanded": "false"
            }).next().attr({"aria-hidden": "true"})
        }
        var a = this.children(".accordion-title"), s = this.children(".accordion-content").hide(), c = a.first(),
            r = (s.first(), t(window.location.hash)), l = 250,
            h = t.extend({autoClose: !0, openFirst: !1, openAll: !1, clickToClose: !1, scroll: !1}, o);
        return t(".accordion").removeClass("no-js"), h.scrollOffset = 0 | Math.floor(parseInt(h.scroll)), r.length && r.hasClass("accordion-title") ? i(r, !0) : h.openAll ? a.each(function () {
            i(t(this), !1)
        }) : h.openFirst && i(c, !1), t('[data-initialstate!=""]').each(function () {
            switch (t(this).data("initialstate")) {
                case"open":
                    i(t(this), !1);
                    break;
                case"closed":
                    t(this).attr("id") !== r.attr("id") && n(t(this))
            }
        }), a.click(e), a.keydown(function (o) {
            var e = o.which;
            (13 === e || 32 === e) && t(this).click()
        }), t(window).on("hashchange", function () {
            r = t(window.location.hash), r.length && r.hasClass("accordion-title") && (h.autoClose && a.each(function () {
                n(t(this))
            }), i(r, !0))
        }), this
    }, t(window).on("load", function () {
        for (var e = 0; e < accordionShortcodesSettings.length; e += 1) o = accordionShortcodesSettings[e], t("#" + o.id).accordionShortcodes(o)
    })
}(jQuery);