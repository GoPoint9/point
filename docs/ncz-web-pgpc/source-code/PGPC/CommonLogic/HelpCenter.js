
// 
// 
// NOTE: 
, Ve = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "br_help_wrap"
  }, [t("div", {
      staticClass: "help_nav_body"
  }, [t("div", {
      staticClass: "top-title"
  }, [e._v(e._s(e.$t("in_help_center")))]), t("McHelp")], 1)])
}
, Ge = []
, He = {
  name: "help",
  components: {
      McHelp: McHelp
      // McHelp: u.wY
  },
  created: function() {
      document.body.scrollTo(0, 0) || window.scrollTo(0, 0)
  },
  methods: {}
}
, De = He
, ze = (0, _.A)(De, Ve, Ge, !1, null, null, null)
, HelpCenter = ze.exports


, qm = (n(48980), n.p, function() {
  var t = this
    , e = t._self._c;
  return e("div", {
      staticClass: "menu_wrap"
  }, [t._t("default")], 2)
}
)
, Fm = []
, Um = {
  name: "collpase",
  methods: {
      cut: function(t) {
          this.$children.forEach((function(e) {
              e._uid !== t && (e.show = !1)
          }
          ))
      }
  }
}
, jm = Um
, Collpase = (0, Ct.A)(jm, qm, Fm, !1, null, null, null)




, CollpaseItemRender = function() {
  var t = this
    , e = t._self._c;
  return e("div", {
      staticClass: "menuItem_wrap"
  }, [e("div", {
      staticClass: "title",
      class: (0,
      oi.A)({
          active: t.select
      }, t.newTag, t.newTag),
      on: {
          click: t.change
      }
  }, [e("i", {
      staticClass: "help-icon",
      attrs: {
          slot: "helpIcon"
      },
      slot: "helpIcon"
  }, [e("svg", [e("use", {
      attrs: {
          "xlink:href": "#helpCenter"
      }
  })])]), e("span", [t._v(t._s(t.title))])]), e("div", {
      directives: [{
          name: "show",
          rawName: "v-show",
          value: t.show,
          expression: "show"
      }]
  }, [t._t("default")], 2)])
}
, CollpaseItemRenderProps = {
  name: "collpaseItem",
  props: ["title", "tag", "select"],
  data: function() { return { show: !1
      }
  },
  computed: {
      newTag: function() {
          return this.tag ? this.tag.trim() : "default"
      }
  },
  created: function() {
      this.select && (this.show = !0)
  },
  methods: {
      change: function() {
          this.$parent.cut(this._uid),
          this.show = !this.show,
          this.$emit("selectTag", this.tag)
      }
  }
}
, Jm = (0, Ct.A)(CollpaseItemRenderProps, CollpaseItemRender, [], !1, null, null, null)
, CollpaseItem = Jm.exports
// NOTE:





, Bm = function() {
  var t = this
    , e = t._self._c;
  return t.helpList.length ? e("div", {
      staticClass: "mcHelp-wrap"
  }, [e("div", {
      staticClass: "mcHelp-menu"
  }, [e("Collpase", t._l(t.helpList, (function(n, i) {
      return e("Collpase-item", {
          key: i,
          attrs: {
              title: n.title,
              select: t.activeIndex.split(",")[0] === "".concat(i),
              tag: n.tag,
              id: "help-" + i
          },
          on: {
              selectTag: function(e) {
                  return t.changeTab("".concat(i))
              }
          }
      }, [n.children ? e("ul", {
          staticClass: "children-list"
      }, t._l(n.children, (function(n, a) {
          return e("li", {
              key: n.tag,
              class: ["children-item", {
                  active: t.activeIndex === "".concat(i, ",").concat(a)
              }],
              on: {
                  click: function(e) {
                      return t.changeTab("".concat(i, ",").concat(a))
                  }
              }
          }, [e("span", [t._v(t._s(n.title))])])
      }
      )), 0) : t._e()])
  }
  )), 1), t._t("other_menu")], 2), e("div", {
      staticClass: "mcHelp-content",
      class: {
          "help-slide-in": t.animation
      },
      on: {
          animationend: function(e) {
              return t.removeAnimation()
          }
      }
  }, [t.showTitle ? e("div", {
      staticClass: "content-title"
  }, [t._v(t._s(t.helpContent["title"]))]) : t._e(), e("div", {
      staticClass: "content vhtml",
      style: {
          backgroundColor: t.helpContent["bgColor"] || "#fff"
      },
      domProps: {
          innerHTML: t._s(t.helpContent["content"])
      }
  })])]) : t._e()
}
, Xm = {
  name: "mcHelp",
  components: {
      Collpase: Collpase,
      CollpaseItem: Qm
  },
  data: function() { return { helpContent: {},
          showTitle: !1,
          activeIndex: "",
          animation: !0
      }
  },
  computed: {
      helpList: function() {
          var t = location.hash || ""
            , e = t.split("#");
          return window.opener && "deposit" === e[1] ? this.$store.state.Help.helpContent.filter((function(t) {
              return "deposit" === t.tag
          }
          )) : this.$store.state.Help.helpContent
      }
  },
  created: function() {
      this.initData()
  },
  methods: {
      removeAnimation: function() {
          this.animation = !1
      },
      findIndex: function(t, e, n) {
          var i = "";
          function a(t, e, n) {
              var r = "";
              t.forEach((function(t, s) {
                  r = n ? n + "," + s : s,
                  t.tag === e ? i = r : t.children instanceof Array && (r = a(t.children, e, r))
              }
              ))
          }
          return a(t, e, n),
          "".concat(i)
      },
      changeTab: function(t) {
          var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
          document.querySelector("body").scrollTop = 0,
          e && (this.animation = !0);
          var n = t.split(",").map((function(t) {
              return 1 * t
          }
          ));
          n.length > 1 ? (this.activeIndex = "".concat(n[0], ",").concat(n[1]),
          this.showTitle = !0,
          this.helpContent = this.helpList[n[0]]["children"][n[1]]) : (this.activeIndex = "".concat(n[0]),
          this.showTitle = !1,
          this.helpContent = this.helpList[n[0]])
      },
      initData: function() {
          if (this.helpList.length) {
              var t = location.hash;
              if (t) {
                  var e = t.split("#");
                  t = e.length > 2 ? e[e.length - 1] : e[1];
                  var n = this.findIndex(this.helpList, decodeURIComponent(t));
                  n ? (this.activeIndex = n,
                  this.$nextTick((function() {
                      document.querySelector(".mcHelp-menu").closest(".tcg_modal_body") && document.querySelector("#help-".concat(n)).scrollIntoView({
                          behavior: "smooth"
                      })
                  }
                  ))) : this.activeIndex = "0",
                  this.changeTab(this.activeIndex, !1)
              } else
                  this.changeTab("0", !1)
          }
      }
  },
  watch: {
      helpList: {
          handler: function() {
              this.initData()
          },
          deep: !0
      },
      $route: function(t, e) {
          window.scrollTo(0, 0),
          this.initData()
      }
  }
}
, Km = Xm
, mcHelp = (0, Ct.A)(Km, Bm, Vm, !1, null, null, null)
, ep = mcHelp.exports
// NOTE:




, xm = (Lm.exports, function() {
        var t = this
          , e = t._self._c;
        return e(t.rendorComponent, {
            tag: "components",
            attrs: {
                include: t.include,
                exclude: t.exclude
            }
        }, [t._l(t.$slots, (function(e, n) {
            return t._t(n, null, {
                slot: n
            })
        }
        ))], 2)
    }
  )
, np = {
  name: "helpCenter",
  props: {
      include: {
          type: Array
      },
      exclude: {
          type: Array
      },
      type: {
          type: String,
          default: "content",
          validator: function(t) {
              return ["menu", "content"].includes(t)
          }
      }
  },
  computed: {
      rendorComponent: function() {
          switch (this.type) {
          case "menu":
              return Om;
          case "content":
              return ep;
          default:
              return ep
          }
      }
  },
  methods: {
      getHelp: (0,
      Si.S$)((function() {
          var t = window.localStorage.getItem("hisLang") || "CN";
          this.$store.dispatch("getHelpV2", {
              data: {
                  lang: t,
                  device: "WEB"
              }
          }, 300)
      }
      ))
  },
  created: function() {
      this.getHelp()
  },
  watch: {
      "$i18n.locale": function(t, e) {
          t !== e && this.getHelp()
      }
  }
}
, ip = np
, McHelp = (0, Ct.A)(ip, xm, Rm, !1, null, null, null)
, rp = McHelp.exports