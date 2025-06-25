
// 
// 
// NOTE: drop-menu-container
, En = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      class: ["drop-menu-container", {
          active: e.show
      }],
      on: {
          mouseenter: function(t) {
              return t.stopPropagation(),
              t.preventDefault(),
              e.showMenu.apply(null, arguments)
          },
          mouseleave: function(t) {
              return t.stopPropagation(),
              t.preventDefault(),
              e.hideMenu.apply(null, arguments)
          }
      }
  }, [t("div", {
      staticClass: "drop-menu-bg"
  }, [e._l(e.navItems, (function(n, a) {
      return [e.activeIndex !== a || ["HOME", "PROMO"].includes(n.gameType) ? e._e() : t("div", {
          key: "drop_".concat(a),
          staticClass: "drop-menu-item"
      }, [t("HeaderGame", {
          attrs: {
              games: e.gameVendor[n.gameType]
          }
      })], 1)]
  }
  ))], 2)])
}

// 
// 
// NOTE: dropMenu
, Un = {
  name: "dropMenu",
  components: {
      HeaderGame: zn
  },
  props: {
      activeIndex: {
          type: Number,
          required: !0
      },
      show: {
          type: Boolean,
          required: !0
      }
  },
  setup: function(e, t) {
      var n = (0, h.OW)()
        , a = n.navItems
        , i = n.gameVendor
        , o = t.emit
        , s = function() {
          o("showMenu")
      }
        , r = function() {
          o("hideMenu")
      };
      return {
          navItems: a,
          gameVendor: i,
          showMenu: s,
          hideMenu: r
      }
  }
}
, qn = Un
, Fn = (0, _.A)(qn, En, In, !1, null, null, null)
, jn = Fn.exports