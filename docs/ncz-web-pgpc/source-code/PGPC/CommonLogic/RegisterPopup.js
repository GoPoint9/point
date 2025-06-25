
// 
// 
// NOTE: 
, X = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "form-popup-container"
  }, [t("img", {
      staticClass: "form-popup-banner",
      attrs: {
          src: n(50567),
          alt: ""
      }
  }), t("div", {
      staticClass: "form-popup-bg"
  }, [t("div", {
      staticClass: "form-title"
  }, [t("CommonLogo", {
      staticClass: "form-logo",
      attrs: {
          src: n(65549)
      }
  })], 1), t("div", {
      staticClass: "form-type"
  }, [t("div", {
      staticClass: "form-type-item",
      on: {
          click: e.goLogin
      }
  }, [e._v(" " + e._s(e.$t("hd_login_button")) + " ")]), t("div", {
      staticClass: "form-type-item active",
      on: {
          click: e.goLogin
      }
  }, [e._v(" " + e._s(e.$t("hd_sign_button")) + " ")])]), t("RegisterForm"), t("div", {
      staticClass: "form-tip"
  }, [t("span", [e._v(e._s(e.$t("in_already_account")) + "?")]), t("a", {
      on: {
          click: e.goLogin
      }
  }, [e._v(e._s(e.$t("hd_login_button")))])])], 1)])
}


// 
// 
// NOTE: 
, ce = {
  name: "registerPopup",
  components: {
      RegisterForm: RegisterForm,
      CommonLogo: u.fA
  },
  computed: {
      banners: function() {
          var e, t = (null === (e = this.$store.state.Public.banners) || void 0 === e ? void 0 : e.find((function(e) {
              return "w_register" === e.groupName
          }
          ))) || {};
          return t
      }
  },
  methods: {
      goLogin: function() {
          this.$modal.show("loginPopupModal"),
          this.$modal.hide("registerModal")
      }
  }
}
, le = ce
, ue = (0, _.A)(le, X, $, !1, null, null, null)
, RegisterPopup_view = ue.exports