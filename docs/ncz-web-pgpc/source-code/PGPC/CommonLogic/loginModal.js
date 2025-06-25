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
, LoginModalProps = {
    mixins: [I, u.vE.firebaseMixins],
    name: "loginModal",
    components: {
        LoginForm: Z,
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
  , LoginModal = (0, _.A)(LoginModalProps, R, [], !1, null, null, null)
  , K = LoginModal.exports