
// 
// 
// NOTE: 
, T = n(3310)
, R = function() {
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
  })], 1), e.showVerCodeLogin ? t("div", {
      staticClass: "method-select"
  }, [e._l(e.loginOption, (function(n) {
      return [t("div", {
          key: n.type,
          class: ["method-item", {
              active: e.loginType === n.type
          }],
          on: {
              click: function(t) {
                  return e.setLoginType(n.type)
              }
          }
      }, [e._v(" " + e._s(e.$t(n.label)) + " ")])]
  }
  ))], 2) : e._e(), t("div", {
      staticClass: "form-type"
  }, [t("div", {
      staticClass: "form-type-item active"
  }, [e._v(" " + e._s(e.$t("hd_login_button")) + " ")]), t("div", {
      staticClass: "form-type-item",
      on: {
          click: e.goRegister
      }
  }, [e._v(" " + e._s(e.$t("hd_sign_button")) + " ")])]), t("LoginForm", {
      attrs: {
          loginType: e.loginType
      }
  }), t("div", {
      staticClass: "form-tip"
  }, [t("span", [e._v(e._s(e.$t("no_account")))]), t("a", {
      on: {
          click: e.goRegister
      }
  }, [e._v(e._s(e.$t("in_register_now")))])])], 1)])
}
  , O = []
  , E = (n(50113), n(21092))
  , I = {
      methods: {
          getService: function(e) {
              var t = this.$store.state.home.customerService
              , n = this.$store.state.home.customerService.find((function(t) {
                  return t.csType === e
              }
              ));
              if (t.length)
                  if (n)
                      window.open(n.path, "service", "width=440,height=750");
                  else {
                      var a = (0,
                      E.A)(t, 1)
                      , i = a[0];
                      window.open(i, "service", "width=440,height=750")
                  }
          },
          hasService: function(e) {
              var t = this.$store.state.home.customerService.find((function(t) {
                  return t.csType === e
              }
              ));
              return !!t
          }
      }
  }


// 
// 
// NOTE: 
, Q = [{
  type: "username",
  label: "in_increase_username"
}, {
  type: "sms",
  label: "in_increase_mobileNum"
}]
, Y = {
  mixins: [I, u.vE.firebaseMixins],
  name: "loginModal",
  components: {
      LoginForm: LoginForm,
      CommonLogo: u.fA
  },
  data: function() {
      return {
          loginOption: Q,
          loginType: "username"
      }
  },
  mounted: function() {},
  computed: {
      showVerCodeLogin: function() {
          return this.$store.state.Login.showVerCodeLogin
      },
      banners: function() {
          var e, t = (null === (e = this.$store.state.Public.banners) || void 0 === e ? void 0 : e.find((function(e) {
              return "w_login" === e.groupName
          }
          ))) || {};
          return t
      }
  },
  methods: {
      setLoginType: function(e) {
          this.loginType = e
      },
      goRegister: function() {
          this.$modal.hide("loginPopupModal"),
          this.$modal.show("registerModal")
      }
  }
}
, J = Y
, W = (0, _.A)(J, R, O, !1, null, null, null)
, LoginPopup_view = W.exports
