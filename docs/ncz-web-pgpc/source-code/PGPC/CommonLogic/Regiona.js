
  // NOTE: 
  , wo = function() {
    var e = this
      , t = e._self._c;
    return t("div", {
        staticClass: "regiona-wrap"
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
    })], 1), t("h2", [e._v(e._s(e.$t("blockip")))]), t("div", {
        staticClass: "ip_address"
    }, [t("span", [e._v("IP：")]), t("span", [e._v(e._s("".concat(e.locationInfo.ip)))])]), t("div", {
        staticClass: "error-info"
    }, [t("p", [e._v(e._s(e.$t("info_ip_block")))])]), t("a", {
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
  , Co = []
  , bo = {
    name: "regiona",
    components: {
        CommonLogo: u.fA
    },
    setup: function() {
        var e = (0,
        h.so)()
          , t = e.getService
          , n = (0,
        h.Pj)()
          , a = n.store
          , i = (0,
        o.EW)((function() {
            return a.Login.location
        }
        ));
        return {
            getService: t,
            locationInfo: i
        }
    }
}
  , _o = bo
  , Ao = (0, _.A)(_o, wo, Co, !1, null, null, null)
  , regiona = Ao.exports