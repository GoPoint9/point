
, _n = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "header-nav"
  }, e._l(e.menus, (function(n, a) {
      return t("div", {
          key: "nav_".concat(a),
          staticClass: "nav-item",
          on: {
              click: function(t) {
                  return e.navClick(n)
              }
          }
      }, [t("i", {
          staticClass: "nav-icon",
          style: {
              backgroundImage: "url(".concat(n.icon, ")")
          }
      }), t("span", {
          staticClass: "nav-name"
      }, [e._v(e._s(e.$t(n.name)))])])
  }
  )), 0)
}
, yn = {
  setup: function() {
      var e = [{
          name: "in_increase_deposit",
          page: "depositv2",
          icon: n(68164)
      }, {
          name: "in_increase_withdrawal",
          page: "withdraw",
          icon: n(854)
      }, {
          name: "hd_agent",
          path: "/agent",
          icon: n(38929)
      }]
        , t = (0,
      h.As)()
        , a = t.setMcPage
        , i = (0,
      h.rd)()
        , o = function(e) {
          var t = e.page
            , n = e.path;
          return n ? i.push(n) : a(t)
      };
      return {
          menus: e,
          navClick: o
      }
  }
}
, Pn = yn
, kn = (0, _.A)(Pn, _n, [], !1, null, null, null)
, Mn = kn.exports
