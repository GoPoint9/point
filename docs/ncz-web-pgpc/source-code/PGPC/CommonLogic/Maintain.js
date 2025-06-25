, mo = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "maintain-wrap"
  }, [t("div", {
      staticClass: "content-wrap"
  }, [t("div", {
      staticClass: "right-wrap"
  }, [t("div", {
      staticClass: "logo-wrap"
  }, [t("CommonLogo", {
      attrs: {
          src: n(65549)
      }
  })], 1), t("h2", [e._v(e._s(e.$t("game_maintenance")))]), t("div", {
      staticClass: "error-info"
  }, [t("p", [e._v(e._s(e.$t("info_maintenance")))])]), t("a", {
      staticClass: "service-btn",
      attrs: {
          href: "javascript:void(0)"
      },
      on: {
          click: function(t) {
              return e.getService()
          }
      }
  }, [t("i"), t("span", [e._v(e._s(e.$t("in_customer_service")))])])])])])
}
, go = {
  name: "maintain",
  components: {
      CommonLogo: u.fA
  },
  setup: function() {
      var e = (0,
      h.so)()
        , t = e.getService;
      return {
          getService: t
      }
  }
}
, fo = go
, vo = (0, _.A)(fo, mo, [], !1, null, null, null)
, maintain = vo.exports