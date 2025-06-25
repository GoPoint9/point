


// 
// 
// NOTE: 
, we = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "form-popup-container"
  }, [e.banners.url ? t("img", {
      staticClass: "form-popup-banner",
      attrs: {
          src: e.banners.url,
          alt: ""
      }
  }) : e._e(), t("div", {
      staticClass: "form-popup-bg"
  }, [t("div", {
      staticClass: "form-title"
  }, [t("CommonLogo", {
      staticClass: "form-logo",
      attrs: {
          src: n(65549)
      }
  }), t("h5", [e._v(e._s(e.$t("in_retrieve_password")))]), t("p", [e._v(e._s(e.$t("in_please_ways")))])], 1), e.showPhoneMethod ? t("div", {
      staticClass: "method-select"
  }, [e._l(e.forgetOption, (function(n) {
      return [t("span", {
          key: n.type,
          class: ["method-item", {
              active: e.forgetPwdType === n.type
          }],
          on: {
              click: function(t) {
                  return e.setForgetPwdType(n.type)
              }
          }
      }, [e._v(" " + e._s(e.$t(n.label)) + " ")])]
  }
  ))], 2) : e._e(), t("div", {
      staticClass: "form_container"
  }, ["email" === e.forgetPwdType ? [t("form", {
      on: {
          submit: function(t) {
              return t.preventDefault(),
              e.revicePasswordByEmail.apply(null, arguments)
          }
      }
  }, [t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text"
  }, [e._v(e._s(e.$t("in_increase_username")))])]), t("div", {
      staticClass: "item_box hasIcon"
  }, [t("span", {
      staticClass: "input_icon"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "form-icon-name"
      }
  })], 1), t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.account,
          expression: "account"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0,
              username: !0
          },
          expression: "{ required: true, username: true }"
      }],
      staticClass: "input_username",
      attrs: {
          type: "text",
          name: "username",
          autocomplete: "off",
          placeholder: e.$t("in_please_username")
      },
      domProps: {
          value: e.account
      },
      on: {
          input: function(t) {
              t.target.composing || (e.account = t.target.value)
          }
      }
  })]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("username")))])]), t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text"
  }, [e._v(e._s(e.$t("in_increase_email")))])]), t("div", {
      staticClass: "item_box hasIcon"
  }, [t("span", {
      staticClass: "input_icon"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "form-icon-email"
      }
  })], 1), t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.email,
          expression: "email"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0,
              email: !0
          },
          expression: "{ required: true, email: true }"
      }],
      staticClass: "input_password",
      attrs: {
          type: "text",
          name: "email",
          autocomplete: "off",
          placeholder: e.$t("in_increase_email")
      },
      domProps: {
          value: e.email
      },
      on: {
          input: function(t) {
              t.target.composing || (e.email = t.target.value)
          }
      }
  })]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("email")))])]), t("div", {
      staticClass: "form_item btn-wrap"
  }, [t("button", {
      staticClass: "submit_btn",
      attrs: {
          type: "submit"
      }
  }, [e._v(e._s(e.$t("in_increase_submit")))])])])] : e._e(), "mobileNum" === e.forgetPwdType ? [t("form", {
      key: "mobileNum",
      on: {
          submit: function(t) {
              return t.preventDefault(),
              e.setPswByPhone.apply(null, arguments)
          }
      }
  }, [t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text"
  }, [e._v(e._s(e.$t("in_increase_mobileNum")))])]), t("div", {
      staticClass: "item_box",
      class: {
          hasCountry: e.showLoginCountryCode
      }
  }, [e.showLoginCountryCode ? t("CountryCode", {
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
          rawName: "v-model",
          value: e.mobileNum,
          expression: "mobileNum"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0,
              mobileNum: !0
          },
          expression: "{ required: true, mobileNum: true }"
      }],
      staticClass: "phone_input",
      attrs: {
          type: "text",
          name: "mobileNum",
          autocomplete: "off",
          placeholder: e.$t("in_increase_mobileNum")
      },
      domProps: {
          value: e.mobileNum
      },
      on: {
          input: function(t) {
              t.target.composing || (e.mobileNum = t.target.value)
          }
      }
  })], 1), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("mobileNum")))])]), t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text"
  }, [e._v(e._s(e.$t("in_increase_verificationCode")))])]), t("div", {
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
      attrs: {
          type: "text",
          name: "sms",
          spellcheck: "false",
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
  }), t("span", {
      staticClass: "sms-btn",
      class: [{
          disabled: e.canSendTime > 0
      }],
      on: {
          click: e.getPhoneCode
      }
  }, [e._v(" " + e._s(e.canSendTime > 0 ? "".concat(e.canSendTime, " s") : "".concat(e.$t("in_get_verificationCode"))) + " ")])]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("sms")))])]), t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text"
  }, [e._v(e._s(e.$t("new_password")))])]), t("div", {
      staticClass: "item_box hasIcon"
  }, [t("span", {
      staticClass: "input_icon"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "form-icon-password"
      }
  })], 1), "checkbox" === (e.showPassword ? "text" : "password") ? t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.newPassword,
          expression: "newPassword"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0,
              password: !0
          },
          expression: "{ required: true, password: true }"
      }],
      staticClass: "input_username",
      attrs: {
          autocomplete: "off",
          placeholder: e.$t("new_password"),
          type: "checkbox"
      },
      domProps: {
          checked: Array.isArray(e.newPassword) ? e._i(e.newPassword, null) > -1 : e.newPassword
      },
      on: {
          change: function(t) {
              var n = e.newPassword
                , a = t.target
                , i = !!a.checked;
              if (Array.isArray(n)) {
                  var o = null
                    , s = e._i(n, o);
                  a.checked ? s < 0 && (e.newPassword = n.concat([o])) : s > -1 && (e.newPassword = n.slice(0, s).concat(n.slice(s + 1)))
              } else
                  e.newPassword = i
          }
      }
  }) : "radio" === (e.showPassword ? "text" : "password") ? t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.newPassword,
          expression: "newPassword"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0,
              password: !0
          },
          expression: "{ required: true, password: true }"
      }],
      staticClass: "input_username",
      attrs: {
          autocomplete: "off",
          placeholder: e.$t("new_password"),
          type: "radio"
      },
      domProps: {
          checked: e._q(e.newPassword, null)
      },
      on: {
          change: function(t) {
              e.newPassword = null
          }
      }
  }) : t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.newPassword,
          expression: "newPassword"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0,
              password: !0
          },
          expression: "{ required: true, password: true }"
      }],
      staticClass: "input_username",
      attrs: {
          autocomplete: "off",
          placeholder: e.$t("new_password"),
          type: e.showPassword ? "text" : "password"
      },
      domProps: {
          value: e.newPassword
      },
      on: {
          input: function(t) {
              t.target.composing || (e.newPassword = t.target.value)
          }
      }
  }), t("span", {
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
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("password")))])]), t("div", {
      staticClass: "form_item btn-wrap"
  }, [t("button", {
      staticClass: "submit_btn",
      attrs: {
          type: "submit"
      }
  }, [e._v(" " + e._s(e.$t("in_increase_submit")) + " ")])])])] : e._e()], 2)])])
}
, Ce = []
, be = {
  name: "forgetPwd",
  mixins: [I, u.vE.firebaseMixins, u.vE.geetestMixins],
  components: {
      CountryCode: u.O4,
      CommonLogo: u.fA
  },
  data: function() {
      return {
          forgetOption: [{
              type: "email",
              label: "in_increase_email"
          }, {
              type: "mobileNum",
              label: "in_increase_mobileNum"
          }],
          forgetPwdType: "email",
          account: "",
          email: "",
          mobileNum: "",
          verificationCode: "",
          newPassword: "",
          canSendTime: 0,
          countDownSmsInterval: null,
          showPassword: !1
      }
  },
  beforeDestroy: function() {
      clearInterval(this.countDownSmsInterval),
      this.countDownSmsInterval = null
  },
  computed: {
      whitelabelVal: function() {
          return this.$store.state.Public.whitelabelVal
      },
      showPhoneMethod: function() {
          var e;
          return null === (e = this.whitelabelVal) || void 0 === e ? void 0 : e.CHNGPASSVERIF3
      },
      banners: function() {
          var e, t = (null === (e = this.$store.state.Public.banners) || void 0 === e ? void 0 : e.find((function(e) {
              return "w_forget" === e.groupName
          }
          ))) || {};
          return t
      }
  },
  methods: {
      getConfig: function() {
          var e = this.whitelabelVal.CHNGPASSVERIF3;
          this.forgetPwdType = e ? "mobileNum" : "email"
      },
      setCountryCode: function(e) {
          this.countryDialingCode = e
      },
      setForgetPwdType: function(e) {
          this.forgetPwdType = e
      },
      revicePasswordByEmail: function() {
          var e = this
            , t = this.$t("in_been_out")
            , n = this.$t("in_increase_submit");
          this.$validator.validateAll().then((function(a) {
              a && (e.cover.loader(!0),
              e.$store.dispatch("forgetPassword", {
                  data: {
                      username: e.account,
                      email: e.email
                  },
                  heards: {
                      "Content-Type": "application/x-www-form-urlencoded"
                  }
              }).then((function(a) {
                  a.success && e.cover.init({
                      html: t,
                      btn: {
                          confirm: n
                      }
                  }),
                  e.cover.loader(!1),
                  e.$modal.hide("forgetPassModal")
              }
              )))
          }
          ))
      },
      getPhoneCode: function() {
          var e = this
            , t = this.mobileNum;
          this.$validator.validateAll({
              mobileNum: t
          }).then(function() {
              var n = (0,
              i.A)((0,
              a.A)().mark((function n(o) {
                  var s, r, c;
                  return (0,
                  a.A)().wrap((function(n) {
                      while (1)
                          switch (n.prev = n.next) {
                          case 0:
                              if (o) {
                                  n.next = 2;
                                  break
                              }
                              return n.abrupt("return");
                          case 2:
                              if (!(e.canSendTime > 0)) {
                                  n.next = 4;
                                  break
                              }
                              return n.abrupt("return", !1);
                          case 4:
                              return n.next = 6,
                              e.geetestVerify("sms");
                          case 6:
                              s = n.sent,
                              r = {
                                  data: (0,
                                  p.A)({
                                      mobileNum: t,
                                      countryDialingCode: e.countryDialingCode
                                  }, s)
                              },
                              c = (new Date).getTime(),
                              e.$store.dispatch("getLoginCode", r).then(function() {
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
                                                  i && e.countDownSms(c),
                                                  t.abrupt("return");
                                              case 7:
                                                  e.countDownSms(c, n.value.expiredMinutes),
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
                              }());
                          case 10:
                          case "end":
                              return n.stop()
                          }
                  }
                  ), n)
              }
              )));
              return function(e) {
                  return n.apply(this, arguments)
              }
          }())
      },
      countDownSms: function(e) {
          var t = this
            , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1
            , a = 60 * n
            , i = (new Date).getTime()
            , o = (i - e) / 2
            , s = i + 1e3 * a - o;
          this.canSendTime = Math.floor((s - i) / 1e3),
          this.countDownSmsInterval = setInterval((function() {
              a = Math.floor((s - (new Date).getTime()) / 1e3),
              a <= 0 ? (clearInterval(t.countDownSmsInterval),
              t.countDownSmsInterval = void 0,
              t.canSendTime = 0) : t.canSendTime = a
          }
          ), 1e3)
      },
      setPswByPhone: function() {
          var e = this;
          this.$validator.validateAll({
              mobileNum: this.mobileNum,
              password: this.newPassword,
              sms: this.verificationCode
          }).then((function(t) {
              if (t) {
                  var n = {
                      newPassword: e.newPassword,
                      mobileNum: e.mobileNum,
                      verificationCode: e.verificationCode
                  };
                  e.$store.dispatch("getPasswordByPhone", {
                      data: n
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
                                      if (!n) {
                                          t.next = 6;
                                          break
                                      }
                                      return e.cover.loader(!0),
                                      t.next = 4,
                                      e.geetestVerify("login");
                                  case 4:
                                      i = t.sent,
                                      e.$store.dispatch("login", {
                                          data: (0,
                                          p.A)({
                                              username: e.mobileNum.replace(/^\s+|\s+$/g, ""),
                                              password: e.newPassword,
                                              type: ""
                                          }, i)
                                      }).then((function(t) {
                                          e.$store.dispatch("loginInfo", t.value).then((function(t) {
                                              e.cover.loader(!1),
                                              e.$modal.hide("forgetPassModal"),
                                              e.$router.push("/")
                                          }
                                          ))
                                      }
                                      ));
                                  case 6:
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
                  }())
              }
          }
          ))
      }
  },
  mounted: function() {
      this.getConfig()
  }
}
, _e = be
, Ae = (0, _.A)(_e, we, Ce, !1, null, null, null)
, ForgotPassword_view = Ae.exports