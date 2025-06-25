
, Bn = (n(2892),
function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      class: ["header-game-container", {
          large: e.isLarge
      }]
  }, [t("div", {
      staticClass: "header-game-list"
  }, e._l(e.games, (function(n, a) {
      return t("div", {
          key: "".concat(n.gameType, "_").concat(a),
          staticClass: "header-game-item",
          on: {
              click: function(t) {
                  return e.gameClick(n)
              }
          }
      }, [t("img", {
          staticClass: "vendor-img",
          attrs: {
              src: e.getNavVendorIcon(n),
              alt: ""
          }
      }), t("p", {
          staticClass: "vendor-name"
      }, [e._v(e._s(n.displayName))])])
  }
  )), 0)])
}
)
, Vn = []
, Gn = {
  name: "headerGame",
  mixins: [kt.z],
  props: {
      games: {
          type: Array,
          required: !0
      }
  },
  setup: function(e) {
      var t = (0,
      h.fC)()
        , n = t.getNavVendorIcon
        , a = (0,
      o.nI)()
        , i = a.proxy
        , s = (0,
      o.EW)((function() {
          return e.games.length > 10
      }
      ))
        , r = function(e) {
          i.launchGameVendor(e)
      };
      return {
          getNavVendorIcon: n,
          isLarge: s,
          gameClick: r
      }
  }
}
, Hn = Gn
, Dn = (0, _.A)(Hn, Bn, Vn, !1, null, null, null)
, zn = Dn.exports
