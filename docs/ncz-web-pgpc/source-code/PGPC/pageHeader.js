// 
// 
// NOTE: 
, Cn = function() {
  var e = this
    , t = e._self._c;
  return t("div", [t("div", {
      staticClass: "header-container"
  }, [t("div", {
      staticClass: "header-content page-center"
  }, [t("div", {
      staticClass: "header-left"
  }, [t("div", {
      staticClass: "header-menu-list"
  }, e._l(e.headerMenu, (function(n, a) {
      return t("div", {
          key: a,
          staticClass: "header-menu-item",
          class: {
              on: n.path === e.path
          },
          on: {
              click: function(t) {
                  return e.handleMenuClick(n)
              }
          }
      }, [e._v(" " + e._s(e.$t("".concat(n.name))) + " ")])
  }
  )), 0)]), t("div", {
      staticClass: "header-right"
  }, [e._e(), t("div", {
      staticClass: "right-content"
  }, [e.isLogin ? t("MemberInfo") : t("div", {
      staticClass: "login-register"
  }, [t("span", {
      staticClass: "btn-login",
      on: {
          click: e.goLogin
      }
  }, [e._v(e._s(e.$t("hd_login_button")))]), t("span", {
      staticClass: "btn-register",
      on: {
          click: e.goRegister
      }
  }, [e._v(e._s(e.$t("hd_sign_button")))])]), t("div", {
      staticClass: "notice",
      on: {
          click: function(t) {
              return e.$modal.show("noticeModal")
          }
      }
  }, [t("svg-icon", {
      attrs: {
          iconClass: "notice"
      }
  })], 1), t("div", {
      staticClass: "service",
      on: {
          click: e.getService
      }
  }, [t("svg-icon", {
      attrs: {
          iconClass: "service"
      }
  })], 1)], 1)], 1)]), t("DropMenu", {
      attrs: {
          show: e.showDropMenu,
          activeIndex: e.activeIndex
      },
      on: {
          showMenu: e.showMenu,
          hideMenu: e.hideMenu
      }
  })], 1), t("div", {
      staticClass: "header-holder"
  })])
}

, Zn = {
  name: "pageHeader",
  mixins: [kt.z],
  components: {
      HeaderNav: Mn,
      MemberInfo: On,
      DropMenu: jn
  },
  setup: function() {
      var e = (0, o.KR)(0)
        , t = (0, o.KR)(!1)
        , n = (0, o.nI)()
        , a = n.proxy
        , i = (0, h.As)()
        , s = i.isLogin
        , r = i.setMcPage
        , c = (0, h.OW)()
        , l = c.gameVendor
        , u = c.navItems
        , d = (0, h.yP)()
        , m = d.showSideMenu
        , p = (0, h.rd)()
        , g = (0, h.lq)()
        , f = (0, h.Pj)()
        , v = f.store
        , w = (0, h.hS)()
        , C = (0, h.Pj)()
        , b = C.dispatch
        , _ = (0, h.so)()
        , A = _.getService
        , y = (0, o.EW)((function() {
          return g.path
      }
      ))
        , P = (0, o.EW)((function() {
          var e;
          return null === (e = v.Public.availablePromo) || void 0 === e || null === (e = e.REFERRAL) || void 0 === e ? void 0 : e.enabled
      }
      ))
        , k = [{
          name: "local_header_games",
          path: "/"
      }, {
          name: "local_header_promotions",
          path: "/promotions"
      }].concat((0,
      pt.A)(P.value || !s ? [{
          name: "rewards",
          path: "",
          page: "rewardCenter"
      }] : []), [{
          name: "local_share",
          path: "",
          page: "referral"
      }])
        , M = function(e) {
          e.path !== y && (e.path ? p.push(e.path) : r(e.page))
      }
        , x = function(e) {
          var t, n = e.gameType, i = e.page, o = (null === (t = l.value) || void 0 === t ? void 0 : t[n]) || [];
          return ["HOME", "PROMO", "PVP", "FISH", "RNG"].includes(n) || o.length > 1 ? p.push(i).catch((function() {}
          )) : a.launchGameVendor(o[0])
      }
        , L = function(n) {
          t.value = !0,
          n && (e.value = n)
      }
        , S = function() {
          t.value = !1
      }
        , N = function() {
          w.show("loginPopupModal")
      }
        , T = function() {
          w.show("registerModal")
      }
        , R = function() {
          if (!["/pvp", "/fish", "/rng"].includes(g.path)) {
              var e = {
                  merchantCode: U.A.brand.merchant
              };
              b("getGameVendor", e)
          }
      };
      return (0, o.sV)((function() {
          R()
      }
      )),
      {
          router: p,
          isLogin: s,
          navItems: u,
          headerMenu: k,
          navClick: x,
          activeIndex: e,
          showDropMenu: t,
          showMenu: L,
          hideMenu: S,
          goLogin: N,
          goRegister: T,
          showSideMenu: m,
          getService: A,
          path: y,
          handleMenuClick: M
      }
  },
  watch: {
      "$i18n.locale": function(e, t) {
          e !== t && this.$store.dispatch("getGameVendor", {
              flush: !0
          })
      }
  }
}

, Qn = Zn
, Yn = (0, _.A)(Qn, Cn, bn, !1, null, null, null)
, Jn = Yn.exports