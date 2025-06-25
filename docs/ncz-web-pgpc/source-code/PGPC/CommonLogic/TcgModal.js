
3310: function(e, t, n) {
    "use strict";
    n.d(t, {
        A: function() { return l }
    });
    n(62010);
    var a = function() {
        var e = this
          , t = e._self._c;
        return t("modal", {
            attrs: {
                name: e.name,
                transition: "nice-modal-fade",
                width: 200,
                height: 200,
                adaptive: !0,
                delay: 100,
                draggable: !0,
                clickToClose: !1
            },
            on: {
                "before-open": e.beforeOpen,
                "before-close": e.beforeClose
            }
        }, [t("div", {
            staticClass: "popup_modal_wrap"
        }, [e.showClose ? t("div", {
            staticClass: "popup_modal_close",
            class: e.name,
            on: {
                click: e.close
            }
        }, [e._t("close", (function() {
            return [t("svg-icon", {
                attrs: {
                    iconClass: "popup-close"
                }
            })]
        }
        ))], 2) : e._e(), t("div", {
            staticClass: "popup_modal_body"
        }, [e._t("default")], 2)])])
    }
      , i = []
      , o = {
        name: "tmodal",
        props: {
            name: {
                type: String,
                required: !0
            },
            mtitle: {
                type: String
            },
            showClose: {
                type: Boolean,
                default: function() {
                    return !0
                }
            },
            scrollable: {
                type: Boolean,
                default: !0
            }
        },
        methods: {
            close: function() {
                this.$modal.hide(this.name)
            },
            beforeOpen: function() {
                this.scrollable && (this.scrollTop = document.scrollingElement.scrollTop,
                document.body.style.position = "fixed",
                document.body.style.top = -this.scrollTop + "px",
                this.$emit("beforeOpen"))
            },
            beforeClose: function() {
                this.scrollable && (document.body.style.position = "",
                document.body.style.top = "",
                document.scrollingElement.scrollTop = this.scrollTop,
                this.$emit("beforeClose"))
            }
        }
    }
      , s = o
      , r = n(81656)
      , c = (0, r.A)(s, a, i, !1, null, "6eaf9166", null) , l = c.exports
},