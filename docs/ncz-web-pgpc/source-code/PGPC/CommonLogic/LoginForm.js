
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
                  var a = (0, E.A)(t, 1)
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
, B = (n(28706), n(34782), n(42762), function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "form_container"
  }, [t("form", {
      key: e.loginType,
      staticClass: "login-form",
      attrs: {
          autocomplete: "off",
          "data-vv-scope": "login-form"
      },
      on: {
          submit: function(t) {
              return t.preventDefault(),
              e.handleLogin.apply(null, arguments)
          }
      }
  }, ["username" === e.loginType ? [t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("p", {
      staticClass: "label-text"
  }, [e._v(e._s(e.$t("in_increase_username")))]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("login-form.username")))])]), t("div", {
      staticClass: "item_box user hasIcon"
  }, [t("span", {
      staticClass: "input_icon"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "form-icon-name"
      }
  })], 1), t("input", {
      directives: [{
          name: "model",
          rawName: "v-model.trim",
          value: e.username,
          expression: "username",
          modifiers: {
              trim: !0
          }
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0
          },
          expression: "{ required: true }"
      }],
      staticClass: "username_input",
      class: [{
          err: e.errors.first("login-form.username")
      }],
      attrs: {
          placeholder: e.$t("in_increase_username"),
          type: "text",
          name: "username"
      },
      domProps: {
          value: e.username
      },
      on: {
          input: function(t) {
              t.target.composing || (e.username = t.target.value.trim())
          },
          blur: function(t) {
              return e.$forceUpdate()
          }
      }
  })]), t("p", {
      staticClass: "errorMsg",
      class: {
          showIcon: e.errors.first("login-form.username")
      }
  }, [e._v(" " + e._s(e.errors.first("login-form.username")) + " ")])]), t("div", {
      staticClass: "form_item password"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("p", {
      staticClass: "label-text"
  }, [e._v(e._s(e.$t("in_increase_password")))]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("login-form.password")))])]), t("div", {
      staticClass: "item_box pass hasIcon"
  }, [t("span", {
      staticClass: "input_icon"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "form-icon-password"
      }
  })], 1), t("input", {
      directives: [{
          name: "model",
          rawName: "v-model.trim",
          value: e.password,
          expression: "password",
          modifiers: {
              trim: !0
          }
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0
          },
          expression: "{ required: true }"
      }],
      staticClass: "password_input",
      class: [{
          err: e.errors.first("login-form.password")
      }],
      attrs: {
          placeholder: e.$t("in_increase_password"),
          type: e.showPassword ? "text" : "password",
          name: "password"
      },
      domProps: {
          value: e.password
      },
      on: {
          input: function(t) {
              t.target.composing || (e.password = t.target.value.trim())
          },
          blur: function(t) {
              return e.$forceUpdate()
          }
      }
  }), e.isHeaderLogin ? t("span", {
      staticClass: "forget header-forget",
      on: {
          click: e.forgetPassword
      }
  }, [t("svg-icon", {
      attrs: {
          iconClass: "header-forget"
      }
  })], 1) : t("span", {
      staticClass: "password-eyes",
      on: {
          click: function(t) {
              e.showPassword = !e.showPassword
          }
      }
  }, [t("svg-icon", {
      attrs: {
          iconClass: e.showPassword ? "show-eyes-default" : "hide-eyes-default"
      }
  })], 1)]), t("p", {
      staticClass: "errorMsg",
      class: {
          showIcon: e.errors.first("login-form.password")
      }
  }, [e._v(" " + e._s(e.errors.first("login-form.password")) + " ")])]), e.showCaptcha ? t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("p", {
      staticClass: "label-text"
  }, [e._v(e._s(e.$t("in_increase_captcha")))]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("login-form.captcha")))])]), t("div", {
      staticClass: "item_box capt hasIcon"
  }, [t("span", {
      staticClass: "input_icon"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "login-modal-capt"
      }
  })], 1), t("input", {
      directives: [{
          name: "model",
          rawName: "v-model.trim",
          value: e.captcha,
          expression: "captcha",
          modifiers: {
              trim: !0
          }
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0
          },
          expression: "{ required: true }"
      }],
      staticClass: "captcha_input",
      class: [{
          err: e.errors.first("login-form.captcha")
      }],
      attrs: {
          placeholder: e.$t("in_increase_captcha"),
          type: "text",
          name: "captcha"
      },
      domProps: {
          value: e.captcha
      },
      on: {
          input: function(t) {
              t.target.composing || (e.captcha = t.target.value.trim())
          },
          blur: function(t) {
              return e.$forceUpdate()
          }
      }
  }), t("div", {
      staticClass: "captcha_box",
      on: {
          click: e.changeCaptcha
      }
  }, [t("img", {
      attrs: {
          src: e.captchaSrc,
          alt: ""
      }
  })])]), t("p", {
      staticClass: "errorMsg",
      class: {
          showIcon: e.errors.first("login-form.captcha")
      }
  }, [e._v(" " + e._s(e.errors.first("login-form.captcha")) + " ")])]) : e._e()] : e._e(), "sms" === e.loginType ? [t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("p", {
      staticClass: "label-text"
  }, [e._v(e._s(e.$t("in_increase_mobileNum")))]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("login-form.mobileNum")))])]), t("div", {
      staticClass: "item_box country",
      class: {
          hasCountry: e.showLoginCountryCode
      }
  }, [e.showLoginCountryCode ? t("country-code", {
      attrs: {
          initDialingCode: e.initDialingCode
      },
      on: {
          setCountryCode: e.setCountryCode
      }
  }) : e._e(), t("span", {
      staticClass: "input_icon"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "form-icon-phone"
      }
  })], 1), t("input", {
      directives: [{
          name: "model",
          rawName: "v-model.trim",
          value: e.mobileNum,
          expression: "mobileNum",
          modifiers: {
              trim: !0
          }
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0,
              mobileNum: !0
          },
          expression: "{ required: true, mobileNum: true }"
      }],
      staticClass: "password_input",
      class: [{
          err: e.errors.first("login-form.mobileNum")
      }],
      attrs: {
          autocomplete: "off",
          placeholder: e.$t("in_increase_mobileNum"),
          type: "text",
          name: "mobileNum"
      },
      domProps: {
          value: e.mobileNum
      },
      on: {
          input: function(t) {
              t.target.composing || (e.mobileNum = t.target.value.trim())
          },
          blur: function(t) {
              return e.$forceUpdate()
          }
      }
  })], 1), t("p", {
      staticClass: "errorMsg",
      class: {
          showIcon: e.errors.first("login-form.mobileNum")
      }
  }, [e._v(" " + e._s(e.errors.first("login-form.mobileNum")) + " ")])]), t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("p", {
      staticClass: "label-text"
  }, [e._v(e._s(e.$t("in_increase_verificationCode")))]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("login-form.sms")))])]), t("div", {
      staticClass: "item_box capt hasIcon"
  }, [t("span", {
      staticClass: "input_icon"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "form-icon-sms"
      }
  })], 1), t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.verificationCode,
          expression: "verificationCode"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0
          },
          expression: "{ required: true }"
      }],
      staticClass: "captcha_input",
      class: [{
          err: e.errors.first("login-form.sms")
      }],
      attrs: {
          type: "text",
          name: "sms",
          autocomplete: "off",
          placeholder: e.$t("in_increase_verificationCode")
      },
      domProps: {
          value: e.verificationCode
      },
      on: {
          input: function(t) {
              t.target.composing || (e.verificationCode = t.target.value)
          }
      }
  }), e.canSendSms ? t("div", {
      staticClass: "sms-btn",
      on: {
          click: e.getSms
      }
  }, [e._v(" " + e._s(e.$t("in_get_verificationCode")) + " ")]) : t("div", {
      staticClass: "sms-btn disabled"
  }, [e._v(e._s("".concat(e.countdown, "s")))])]), t("p", {
      staticClass: "errorMsg",
      class: {
          showIcon: e.errors.first("login-form.sms")
      }
  }, [e._v(" " + e._s(e.errors.first("login-form.sms")) + " ")])])] : e._e(), e.agentPage ? e._e() : t("div", {
      staticClass: "form_item rem-wrap"
  }, [t("div", {
      staticClass: "remember-item"
  }, [t("div", {
      staticClass: "remPass_box",
      class: {
          checked: e.rememberUserPass
      }
  }, [t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.rememberUserPass,
          expression: "rememberUserPass"
      }],
      staticClass: "remPass_checkbox",
      attrs: {
          type: "checkbox"
      },
      domProps: {
          checked: Array.isArray(e.rememberUserPass) ? e._i(e.rememberUserPass, null) > -1 : e.rememberUserPass
      },
      on: {
          change: function(t) {
              var n = e.rememberUserPass
                , a = t.target
                , i = !!a.checked;
              if (Array.isArray(n)) {
                  var o = null
                    , s = e._i(n, o);
                  a.checked ? s < 0 && (e.rememberUserPass = n.concat([o])) : s > -1 && (e.rememberUserPass = n.slice(0, s).concat(n.slice(s + 1)))
              } else
                  e.rememberUserPass = i
          }
      }
  }), t("span", {
      staticClass: "cheched-bg"
  }), t("span", {
      staticClass: "gougou"
  })]), t("span", {
      staticClass: "jzmm"
  }, [e._v(e._s(e.$t("in_remember_password")))])]), t("span", {
      staticClass: "forget",
      on: {
          click: e.forgetPassword
      }
  }, [e._v(e._s(e.$t("in_forget_password")))])]), e.isHeaderLogin ? [t("div", {
      staticClass: "form_item btn-wrap"
  }, [t("div", {
      staticClass: "submit_btn",
      class: {
          firebase: e.firebase
      }
  }, [t("button", {
      staticClass: "form-btn",
      attrs: {
          type: "submit"
      }
  }, [e._v(e._s(e.$t("hd_login_button")))]), e.firebase ? t("div", {
      staticClass: "fire-arrow"
  }, [t("div", {
      staticClass: "fire-drop"
  }, [t("span", {
      staticClass: "or-connect"
  }, [e._v(e._s(e.$t("local_login_way")))]), t("div", {
      staticClass: "firebase-group"
  }, [e.firebaseFacebook ? t("span", {
      staticClass: "item facebook",
      on: {
          click: function(t) {
              return e.loginByFirebaseDelegate("facebook")
          }
      }
  }, [t("svg-icon", {
      attrs: {
          iconClass: "facebook-m"
      }
  })], 1) : e._e(), e.firebaseGoogle ? t("span", {
      staticClass: "item google",
      on: {
          click: function(t) {
              return e.loginByFirebaseDelegate("google")
          }
      }
  }, [t("svg-icon", {
      attrs: {
          iconClass: "google-m"
      }
  })], 1) : e._e()])])]) : e._e(), e.firebase ? t("div", {
      staticClass: "fire-drop"
  }, [t("span", {
      staticClass: "or-connect"
  }, [e._v(e._s(e.$t("local_login_way")))]), t("div", {
      staticClass: "firebase-group"
  }, [e.firebaseFacebook ? t("span", {
      staticClass: "item facebook",
      on: {
          click: function(t) {
              return e.loginByFirebaseDelegate("facebook")
          }
      }
  }, [t("svg-icon", {
      attrs: {
          iconClass: "facebook-m"
      }
  })], 1) : e._e(), e.firebaseGoogle ? t("span", {
      staticClass: "item google",
      on: {
          click: function(t) {
              return e.loginByFirebaseDelegate("google")
          }
      }
  }, [t("svg-icon", {
      attrs: {
          iconClass: "google-m"
      }
  })], 1) : e._e()])]) : e._e()])])] : [t("div", {
      staticClass: "form_item btn-wrap"
  }, [t("button", {
      staticClass: "submit_btn hover",
      attrs: {
          type: "submit"
      }
  }, [e._v(e._s(e.$t("hd_login_button")))])]), !e.agentPage && e.firebase ? t("div", {
      staticClass: "firebase-login"
  }, [t("div", {
      staticClass: "tips"
  }, [t("span", {
      staticClass: "or-connect"
  }, [e._v(e._s(e.$t("local_login_way")))])]), t("div", {
      staticClass: "firebase-group"
  }, [e.firebaseFacebook ? t("span", {
      staticClass: "item facebook",
      on: {
          click: function(t) {
              return e.loginByFirebaseDelegate("facebook")
          }
      }
  }, [t("svg-icon", {
      attrs: {
          iconClass: "facebook-m"
      }
  })], 1) : e._e(), e.firebaseGoogle ? t("span", {
      staticClass: "item google",
      on: {
          click: function(t) {
              return e.loginByFirebaseDelegate("google")
          }
      }
  }, [t("svg-icon", {
      attrs: {
          iconClass: "google-m"
      }
  })], 1) : e._e()])]) : e._e(), t("div", {
      staticClass: "form_item terms"
  }, [t("div", {
      staticClass: "terms_box login"
  }, [t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.rememberUserPass,
          expression: "rememberUserPass"
      }],
      staticClass: "terms_checkbox",
      attrs: {
          type: "checkbox"
      },
      domProps: {
          checked: Array.isArray(e.rememberUserPass) ? e._i(e.rememberUserPass, null) > -1 : e.rememberUserPass
      },
      on: {
          change: function(t) {
              var n = e.rememberUserPass
                , a = t.target
                , i = !!a.checked;
              if (Array.isArray(n)) {
                  var o = null
                    , s = e._i(n, o);
                  a.checked ? s < 0 && (e.rememberUserPass = n.concat([o])) : s > -1 && (e.rememberUserPass = n.slice(0, s).concat(n.slice(s + 1)))
              } else
                  e.rememberUserPass = i
          }
      }
  }), t("span", {
      staticClass: "cheched-bg"
  }), t("span", {
      staticClass: "gougou"
  })]), t("span", [e._v(" " + e._s(e.$t("local_terms_content")) + " "), t("span", {
      staticClass: "link",
      on: {
          click: e.handleTermClick
      }
  }, [e._v(e._s(e.$t("local_terms_link")))])])])]], 2)])
}
),

V = [];

n(44114), n(33110), n(79432), n(16280), n(48598), n(62062), n(90906), n(38781), n(25440), n(23500);
function G(e) {
  var t = e + "="
    , n = t.length
    , a = document.cookie.length
    , i = 0;
  while (i < a) {
      var o = i + n;
      if (document.cookie.substring(i, o) === t)
          return H(o);
      if (i = document.cookie.indexOf(" ", i) + 1,
      0 === i)
          break
  }
  return null
}
function H(e) {
  var t = document.cookie.indexOf(";", e);
  return -1 === t && (t = document.cookie.length),
  unescape(document.cookie.substring(e, t))
}
function D(e, t, n) {
  document.cookie = e + "=" + escape(t) + (null == n ? "" : "; expires=" + n.toGMTString())
}
function z(e) {
  var t = new Date;
  D(e, null, t)
}
var U = n(76619)
, q = {
  mixins: [u.vE.firebaseMixins, u.vE.geetestMixins, I],
  props: ["loginType", "isHeaderLogin", "agentPage"],
  components: {
      CountryCode: u.O4
  },
  data: function() {
      return {
          username: "",
          password: "",
          mobilePassword: "",
          verificationCode: "",
          mobileNum: "",
          canSendSms: !0,
          rememberUserPass: !1,
          rememberPhonePass: !1,
          countdown: 0,
          id: "".concat(U.A.brand.merchant, "-login"),
          captcha: null,
          showCaptcha: !1,
          captchaSrc: "",
          time: new Date,
          countryDialingCode: void 0,
          initDialingCode: void 0,
          showPassword: !1
      }
  },
  mounted: function() {
      this.showCaptcha && this.getCaptcha(),
      this.getLastUser()
  },
  computed: {
      pwdEnabled: function() {
          return this.$store.state.Login.pwdEnabled
      },
      freePlayEnabled: function() {
          return this.$store.state.Login.hasFreePlay
      },
      showVerCodeLogin: function() {
          return this.$store.state.Login.showVerCodeLogin
      },
      device: function() {
          return this.$store.state.Login.codeUrl
      }
  },
  methods: {
      handleLogin: function() {
          var e = this;
          return (0,
          i.A)((0,
          a.A)().mark((function t() {
              var n, o;
              return (0,
              a.A)().wrap((function(t) {
                  while (1)
                      switch (t.prev = t.next) {
                      case 0:
                          n = "sms" === e.loginType,
                          o = {
                              username: n ? e.mobileNum : e.username,
                              password: n ? e.verificationCode : e.password,
                              captcha: e.captcha,
                              type: n ? "sms" : "username"
                          },
                          e.$validator.validateAll("login-form").then(function() {
                              var t = (0,
                              i.A)((0,
                              a.A)().mark((function t(n) {
                                  var i;
                                  return (0,
                                  a.A)().wrap((function(t) {
                                      while (1)
                                          switch (t.prev = t.next) {
                                          case 0:
                                              if (!n) {
                                                  t.next = 13;
                                                  break
                                              }
                                              if ("sms" !== o.type) {
                                                  t.next = 5;
                                                  break
                                              }
                                              t.t0 = !0,
                                              t.next = 8;
                                              break;
                                          case 5:
                                              return t.next = 7,
                                              e.geetestVerify("login");
                                          case 7:
                                              t.t0 = t.sent;
                                          case 8:
                                              if (i = t.t0,
                                              o = (0,
                                              p.A)((0,
                                              p.A)({}, o), i),
                                              !e.firebaseSms || "sms" !== o.type) {
                                                  t.next = 12;
                                                  break
                                              }
                                              return t.abrupt("return", e.loginFirebaseBySms({
                                                  mobileNum: e.mobileNum,
                                                  code: e.verificationCode,
                                                  afterLogin: e.handleAfterLogin
                                              }));
                                          case 12:
                                              e.loginMethod(o);
                                          case 13:
                                          case "end":
                                              return t.stop()
                                          }
                                  }
                                  ), t)
                              }
                              )));
                              return function(e) {
                                  return t.apply(this, arguments)
                              }
                          }());
                      case 3:
                      case "end":
                          return t.stop()
                      }
              }
              ), t)
          }
          )))()
      },
      setCountryCode: function(e) {
          this.countryDialingCode = e
      },
      loginByFirebaseDelegate: function(e) {
          var t = this;
          this.loginFirebaseV2({
              channel: e,
              showLoginModal: function() {
                  t.$modal.show("loginPopupModal")
              },
              afterLogin: this.handleAfterLogin,
              showLoading: function(e) {
                  return t.cover.loader(e)
              }
          })
      },
      getLastUser: function() {
          var e = G(this.id);
          this.username = e || "",
          this.getPwdAndChk()
      },
      setPwdAndChk: function() {
          if (this.rememberUserPass) {
              this.setLastUser(this.username);
              var e = new Date;
              e.setTime(e.getTime() + 864e5),
              D("loginRemember", "1", e),
              D(this.username, this.password, e),
              this.mobileNum && D("loginTypeSms", JSON.stringify({
                  mobileNum: this.mobileNum,
                  countryDialingCode: this.countryDialingCode
              }), e)
          } else
              z(this.username),
              z(this.id),
              z("loginRemember"),
              z("loginTypeSms")
      },
      setLastUser: function(e) {
          var t = new Date;
          t.setTime(t.getTime() + 864e5),
          D(this.id, e, t)
      },
      getPwdAndChk: function() {
          var e = G(this.username);
          e ? (this.rememberUserPass = !0,
          this.password = e) : this.password = "";
          var t = G("loginTypeSms");
          if (t) {
              var n = JSON.parse(t);
              this.mobileNum = n.mobileNum,
              this.initDialingCode = n.countryDialingCode
          }
          var a = G("loginRemember");
          a && (this.rememberUserPass = !0)
      },
      hideModal: function() {
          this.$modal.hide("loginPopupModal")
      },
      startCountDown: function(e) {
          var t = this;
          this.canSendSms = !1,
          this.countdown = 60 * e,
          this.timer = setInterval((function() {
              t.countdown--,
              t.countdown <= 0 && (t.canSendSms = !0,
              clearInterval(t.timer))
          }
          ), 1e3)
      },
      loginMethod: function(e) {
          var t = this;
          this.cover.loader(!0),
          this.$store.dispatch("loginV2", {
              data: e
          }).then((function(n) {
              t.cover.loader(!1),

                //   
              t.handleAfterLogin({
                  formData: e,
                  res: n
              })
          }
          )).catch((function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              t.cover.loader(!1),
              (e.value || {}).captcha && (t.showCaptcha = !0,
              t.getCaptcha())
          }
          ))
      },
      handleAfterLogin: function(e) {
          var t = this
            , n = e.formData
            , a = e.res;
          if (n && a) {
              this.setPwdAndChk();
              var i = (0,
              p.A)((0,
              p.A)({}, a.value), {}, {
                  password: this.password
              });
              this.$store.commit("setUserInfo", i);
              var o = a.value
                , s = o.firstTimeLogin
                , r = o.passwordExpired
                , c = o.token;
              sessionStorage.setItem("token", c),
              s && this.$store.dispatch("firstLogin"),
              this.$modal.hide("loginPopupModal"),
              ("123456" === this.password || r && this.pwdEnabled) && !["sms", "firebase"].includes(n.type) ? (this.cover.loader(!1),
              this.$modal.show("changePassModal")) : this.$store.dispatch("loginInfo", a.value).then((function(e) {
                  t.cover.loader(!1),
                  t.$store.commit("setAfterLoginModal", !0),
                  t.agentPage && t.$router.push("/agentHome")
              }
              ))
          }
      },
      getCaptcha: function() {
          var e = this;
          this.$store.dispatch("captcha").then((function(t) {
              t.success && (e.captchaSrc = "data:image/png;base64," + t.value)
          }
          ))
      },
      getSms: (0,
      v.throttle)((function() {
          var e = this;
          this.$validator.validate("login-form.mobileNum").then((function(t) {
              t && (e.cover.loader(!0),
              e.$store.dispatch("getLoginCode", {
                  data: {
                      mobileNum: e.mobileNum,
                      countryDialingCode: e.countryDialingCode
                  }
              }).then(function() {
                  var t = (0,
                  i.A)((0,
                  a.A)().mark((function t(n) {
                      var i;
                      return (0,
                      a.A)().wrap((function(t) {
                          while (1)
                              switch (t.prev = t.next) {
                              case 0:
                                  if (!n.success) {
                                      t.next = 10;
                                      break
                                  }
                                  if (!e.firebaseSms) {
                                      t.next = 7;
                                      break
                                  }
                                  return t.next = 4,
                                  e.sendCodeByFirebase("+".concat(e.countryDialingCode), e.mobileNum);
                              case 4:
                                  return i = t.sent,
                                  i && e.startCountDown(1),
                                  t.abrupt("return");
                              case 7:
                                  e.startCountDown(n.value.expiredMinutes),
                                  t.next = 11;
                                  break;
                              case 10:
                                  e.cover.init({
                                      html: n.message,
                                      icon: "warning",
                                      btn: {
                                          confirm: e.$t("in_increase_submit")
                                      }
                                  });
                              case 11:
                              case "end":
                                  return t.stop()
                              }
                      }
                      ), t)
                  }
                  )));
                  return function(e) {
                      return t.apply(this, arguments)
                  }
              }()).finally((function() {
                  e.cover.loader(!1)
              }
              )))
          }
          ))
      }
      ), 1e3),
      changeCaptcha: function() {
          var e = new Date;
          e - this.time > 1e3 && (this.getCaptcha(),
          this.time = e)
      },
      forgetPassword: function() {
          this.$modal.hide("loginPopupModal"),
          this.$modal.show("forgetPassModal")
      },
      freePlay: function() {
          var e = this;
          this.cover.loader(!0),
          this.$store.dispatch("loginFreePlay").then((function(t) {
              t.success && e.$store.dispatch("loginInfo", t).then((function(t) {
                  t.success && (sessionStorage.removeItem("cpw"),
                  e.$modal.hide("loginModal"),
                  e.$router.push("/"),
                  e.$modal.hide("loginPopupModal"),
                  e.$store.commit("setLoginState", !0))
              }
              )),
              e.cover.loader(!1)
          }
          ))
      },
      handleTermClick: function() {
          this.$modal.hide("loginPopupModal"),
          this.$router.push("/help#term"),
          this.$modal.show("helpModal")
      }
  }
}
, F = q
, j = (0, _.A)(F, B, V, !1, null, null, null)
, LoginForm = j.exports