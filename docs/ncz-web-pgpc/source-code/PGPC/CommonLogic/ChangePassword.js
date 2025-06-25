


// 
// 
// NOTE: 
, me = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "form-popup-container"
  }, [t("div", {
      staticClass: "form-popup-bg"
  }, [t("div", {
      staticClass: "form-title"
  }, [t("h5", [e._v(e._s(e.$t("in_change_expired")))]), t("p", [e._v(e._s(e.$t("in_changing_security")))])]), t("div", {
      staticClass: "form_container"
  }, [t("form", {
      on: {
          submit: function(t) {
              return t.preventDefault(),
              e.changePwd.apply(null, arguments)
          }
      }
  }, [e.userInfo.userName ? t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "item_box hasIcon"
  }, [t("span", {
      staticClass: "input_icon"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "form-icon-name"
      }
  })], 1), t("input", {
      attrs: {
          disabled: "",
          readonly: "",
          name: "password",
          type: "text"
      },
      domProps: {
          value: e.userInfo.userName
      }
  })]), t("p", {
      staticClass: "errorMsg"
  })]) : e._e(), e.userInfo.password ? e._e() : t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text"
  }, [e._v(e._s(e.$t("in_please_password")))])]), t("div", {
      staticClass: "item_box hasIcon"
  }, [t("span", {
      staticClass: "input_icon"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "form-icon-password"
      }
  })], 1), t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.oldPassword,
          expression: "oldPassword"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0
          },
          expression: "{ required: true }"
      }],
      attrs: {
          name: "password",
          type: "password",
          autocomplete: "new-password",
          placeholder: e.$t("in_please_password")
      },
      domProps: {
          value: e.oldPassword
      },
      on: {
          input: function(t) {
              t.target.composing || (e.oldPassword = t.target.value)
          }
      }
  })]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("password")))])]), t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text"
  }, [e._v(e._s(e.$t("enter_new_password")))])]), t("div", {
      staticClass: "item_box hasIcon"
  }, [t("span", {
      staticClass: "input_icon"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "form-icon-password"
      }
  })], 1), t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.password,
          expression: "password"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0,
              password: !0
          },
          expression: "{ required: true, password: true }"
      }],
      attrs: {
          name: "password",
          type: "password",
          autocomplete: "new-password",
          placeholder: e.$t("enter_new_password")
      },
      domProps: {
          value: e.password
      },
      on: {
          input: function(t) {
              t.target.composing || (e.password = t.target.value)
          }
      }
  })]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("password")))])]), t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text"
  }, [e._v(e._s(e.$t("enter_new_password")))])]), t("div", {
      staticClass: "item_box hasIcon"
  }, [t("span", {
      staticClass: "input_icon"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "form-icon-password"
      }
  })], 1), t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.confirm,
          expression: "confirm"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0,
              checkPass: !0
          },
          expression: "{ required: true, checkPass: true }"
      }],
      class: {
          hasError: e.errors.has("checkPass")
      },
      attrs: {
          name: "checkPass",
          type: "password",
          autocomplete: "new-password",
          placeholder: e.$t("enter_new_password")
      },
      domProps: {
          value: e.confirm
      },
      on: {
          input: function(t) {
              t.target.composing || (e.confirm = t.target.value)
          }
      }
  })]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("checkPass")))])]), t("div", {
      staticClass: "form_item btn-wrap"
  }, [t("button", {
      staticClass: "submit_btn",
      attrs: {
          type: "submit"
      }
  }, [e._v(e._s(e.$t("in_increase_submit")))])])])])])])
}
, pe = []
, ge = (n(42018), {
  name: "changePwd",
  data: function() {
      return {
          oldPassword: "",
          password: "",
          confirm: "",
          info: ""
      }
  },
  created: function() {
      var e = this;
      ne.Dr.extend("checkPass", {
          validate: function(t) {
              return t === e.password
          }
      })
  },
  computed: {
      regValid: function() {
          return this.$store.state.Login.validate
      },
      userInfo: function() {
          var e = this.$store.state.Login.userInfo
            , t = void 0 === e ? {} : e;
          return t
      }
  },
  methods: {
      changePwd: function() {
          var e = this;
          this.$validator.validateAll().then((function(t) {
              t && (e.cover.loader(!0),
              e.$store.dispatch("changePassword", {
                  data: {
                      oldPassword: e.userInfo.password || e.oldPassword,
                      newPassword: e.password,
                      confirmNewPassword: e.confirm
                  }
              }).then((function(t) {
                  t.success && e.$store.dispatch("loginInfo", e.userInfo).then((function(t) {
                      e.$modal.hide("changePassModal"),
                      e.cover.loader(!1),
                      e.$router.push("/")
                  }
                  ))
              }
              )))
          }
          ))
      }
  }
})
, fe = ge
, ve = (0, _.A)(fe, me, pe, !1, null, null, null)
, ChangePassword_view = ve.exports

