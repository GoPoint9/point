
// 
// 
// NOTE: footer-container
, FooterRender = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "footer-container"
  }, [t("div", {
      staticClass: "footer-content page-center",
      class: {
          off: e.showSideMenu
      }
  }, [t("div", {
      staticClass: "footer-top"
  }, [t("div", {
      staticClass: "list-wrap help-list"
  }, [t("div", {
      staticClass: "list-title"
  }, [e._v(e._s(e.$t("help_up")))]), t("div", {
      staticClass: "list-content"
  }, [e._l(e.helpList, (function(n, a) {
      return [t("div", {
          key: a,
          class: ["br-hmenu-nav", n.tag],
          on: {
              click: function(t) {
                  return e.clickMenu(n.tag)
              }
          }
      }, [e._v(" " + e._s(n.title) + " ")])]
  }
  ))], 2)]), t("div", {
      staticClass: "list-wrap product-list"
  }, [t("div", {
      staticClass: "list-title"
  }, [e._v(e._s(e.$t("product")))]), t("div", {
      staticClass: "list-content"
  }, e._l(e.productsItem, (function(n, a) {
      return t("div", {
          key: "".concat(n.gameType, "-").concat(a),
          staticClass: "list-item",
          on: {
              click: function(t) {
                  return e.handleItemClick(n.gameType)
              }
          }
      }, [e._v(" " + e._s(e.$t(n.name)) + " ")])
  }
  )), 0)]), t("div", {
      staticClass: "list-wrap follow-list"
  }, [t("div", {
      staticClass: "list-title"
  }, [e._v(e._s(e.$t("follow_us")))]), t("div", {
      staticClass: "list-content"
  }, [e._v("© 2024 PGPC All rights reserved")])]), t("div", {
      staticClass: "list-wrap social-info"
  }, [t("div", {
      staticClass: "list-title"
  }, [e._v(e._s(e.$t("social_media")))]), t("div", {
      staticClass: "list-content"
  }, [e.hasService("FACEBOOK") ? t("div", {
      staticClass: "channel-item fb",
      on: {
          click: function(t) {
              return e.getService("FACEBOOK")
          }
      }
  }) : e._e(), e.hasService("YOUTUBE") ? t("div", {
      staticClass: "channel-item yt",
      on: {
          click: function(t) {
              return e.getService("YOUTUBE")
          }
      }
  }) : e._e()])])]), t("div", {
      staticClass: "footer-info"
  }, [t("ul", {
      staticClass: "icons"
  }, e._l(e.iconVendors, (function(n, a) {
      return t("img", {
          key: a,
          staticClass: "icon-img",
          attrs: {
              src: "".concat(e.imgUrl, "/TCG_PROD_IMAGES/RNG_LIST_VENDOR/").concat(n, "-GRAY.png"),
              alt: ""
          }
      })
  }
  )), 0)])])])
}
, FooterProps = (n(46449), n(93514), n(13609), n(16034), n(11392), {
  mixins: [I],
  components: {},
  setup: function() {
      var e = (0, o.Kh)({
          icons: [],
          iconVendors: ["PG", "EG2", "PT", "JDB", "CQ9", "FC", "JL", "BGS"]
      })
        , t = (0, h.yP)()
        , n = t.showSideMenu
        , a = (0, h.rd)()
        , i = (0, h.hS)()
        , s = (0, h.Pj)()
        , r = s.store
        , c = s.dispatch
        , l = s.commit
        , u = (0, h.ok)()
        , d = u.currentLanguage
        , m = (0, h.s9)()
        , g = m.t
        , f = (0, h.OW)()
        , w = f.navItems
        , C = f.gameVendor
        , b = (0, o.EW)((function() {
            return r.Help.helpContent
        }
      ))
        , _ = (0, o.EW)((function() {
            return r.Login.imgUrl
        }
      ))
        , A = function(e) {
          e ? a.push("/help#".concat(e)) : a.push("/help"),
          i.show("helpModal")
      }
        , y = function() {
          c("getHelpV2", {
              data: {
                  lang: d.value,
                  device: "WEB"
              }
          })
      }
        , P = (0, o.EW)((function() {
          var e = ["PROMO", "HOME"]
            , t = w.value.reduce((function(t, n) {
              var a, i = n.gameType;
              if (e.includes(i))
                  return t;
              var o = (0,
              v.cloneDeep)((null === (a = C.value) || void 0 === a ? void 0 : a[i]) || [])
                , s = !!o.length
                , r = {
                  displayName: g("in_type_all"),
                  vassalage: "",
                  gameType: i
              };
              return s && o.unshift(r),
              [].concat((0,
              pt.A)(t), [(0,
              p.A)((0,
              p.A)({}, n), {}, {
                  vendors: o,
                  hasVendors: s
              })])
          }
          ), []);
          return t
      }
      ))
        , k = function(e) {
          l("setCurrentGameType", e),
          document.body.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth"
          })
      }
        , M = function(t) {
          var n = function(e) {
              var t = e.gameType
                , n = e.vassalage;
              return "ESPORTS" === t && (t = "SPORTS"),
              "JL" === n && (t = "RNG"),
              "".concat(_.value, "/TCG_PROD_IMAGES/").concat(t, "_LIST_VENDOR/").concat(n, "-GRAY.png")
          }
            , a = Object.values(t).flat().reduce((function(e, t) {
              var a = t.vassalage;
              return a.startsWith("TCG") || (e[a] = n(t)),
              e
          }
          ), {});
          e.icons = Object.values(a)
      };
      return (0, o.wB)(d, y, {
          immediate: !0
      }),
      (0, o.wB)(C, M, {
          immediate: !0
      }),
      (0, p.A)((0, p.A)({}, (0, o.QW)(e)), {}, {
          showSideMenu: n,
          clickMenu: A,
          helpList: b,
          productsItem: P,
          getService: I,
          handleItemClick: k,
          imgUrl: _
      })
  }
})
, FooterProps = FooterProps
, Footer = (0, _.A)(FooterProps, FooterRender, [], !1, null, null, null)