

// 
// 
// NOTE: 
, xn = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "member-info-container"
  }, [t("div", {
      staticClass: "group"
  }, [e.isGamePage ? e._e() : t("div", {
      staticClass: "member-info-item"
  }, [t("div", {
      staticClass: "balance-container"
  }, [t("div", {
      staticClass: "symbol"
  }, [e._v(e._s(e.currencySymbol))]), t("span", {
      staticClass: "balance"
  }, [e._v(e._s(e.showBalance ? e.balance : "***"))]), t("span", {
      staticClass: "refresh",
      on: {
          click: e.refreshBalance
      }
  }, [t("svg-icon", {
      attrs: {
          iconClass: "refresh"
      }
  })], 1)])]), t("div", {
      staticClass: "member-info-item",
      on: {
          click: function(t) {
              return e.setMcPage("depositv2")
          }
      }
  }, [t("svg-icon", {
      attrs: {
          iconClass: "btn-deposit"
      }
  })], 1), t("div", {
      staticClass: "member-info-item",
      on: {
          click: function(t) {
              return e.setMcPage("withdraw")
          }
      }
  }, [t("svg-icon", {
      attrs: {
          iconClass: "btn-withdraw"
      }
  })], 1)]), t("div", {
      staticClass: "group member"
  }, [t("div", {
      staticClass: "member-account"
  }, [t("div", {
      staticClass: "user-avatar",
      on: {
          click: function(t) {
              return t.stopPropagation(),
              e.changeUserAvatar.apply(null, arguments)
          }
      }
  }, [t("img", {
      attrs: {
          src: e.avatarSrc,
          alt: ""
      },
      on: {
          "~error": function(t) {
              return e.handleError.apply(null, arguments)
          }
      }
  }), e.hasVip ? t("div", {
      staticClass: "vip"
  }, [e._v(e._s(e.vipLabelName))]) : e._e()]), t("div", {
      staticClass: "icon-down"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "common-arrow"
      }
  })], 1), t("transition", {
      attrs: {
          name: "zoom-in-top"
      }
  }, [t("div", {
      staticClass: "member-menu"
  }, [t("div", {
      staticClass: "member-menu-bg"
  }, [t("div", {
      staticClass: "main-info"
  }, [t("div", {
      staticClass: "avatar-wrap"
  }, [t("img", {
      staticClass: "avatar",
      attrs: {
          src: e.avatarSrc,
          alt: ""
      },
      on: {
          "~error": function(t) {
              return e.handleError.apply(null, arguments)
          }
      }
  }), e.hasVip ? t("div", {
      staticClass: "vip-content"
  }, [t("div", {
      staticClass: "vip-text"
  }, [e._v(e._s(e.vipLabelName))])]) : e._e()]), t("div", {
      staticClass: "info-content"
  }, [t("div", {
      staticClass: "account"
  }, [e._v(e._s(e.account))]), t("div", {
      staticClass: "id"
  }, [t("span", [e._v("ID:" + e._s(e.userId))]), t("div", {
      directives: [{
          name: "clipboard",
          rawName: "v-clipboard:copy",
          value: "".concat(e.userId),
          expression: "`${userId}`",
          arg: "copy"
      }, {
          name: "clipboard",
          rawName: "v-clipboard:success",
          value: e.copyOnSuccess,
          expression: "copyOnSuccess",
          arg: "success"
      }],
      staticClass: "copy-btn"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "icon-edit"
      }
  })], 1)])])]), t("div", {
      staticClass: "member-menu-item account",
      on: {
          click: function(t) {
              return e.setMcPage("securityCenter")
          }
      }
  }, [t("svg-icon", {
      staticClass: "account",
      attrs: {
          iconClass: "icon-account"
      }
  }), t("span", [e._v(e._s(e.$t("in_my_account")))])], 1), t("div", {
      staticClass: "member-menu-item betting-record",
      on: {
          click: function(t) {
              return e.setMcPage("personalHistoryCopy")
          }
      }
  }, [t("svg-icon", {
      staticClass: "betting-record",
      attrs: {
          iconClass: "icon-betting-record"
      }
  }), t("span", [e._v(e._s(e.$t("in_betting_record")))])], 1), t("div", {
      staticClass: "member-menu-item message",
      on: {
          click: function(t) {
              return e.setMcPage("messageV2")
          }
      }
  }, [t("svg-icon", {
      staticClass: "message",
      attrs: {
          iconClass: "icon-message"
      }
  }), e._v(" " + e._s(e.$t("in_platform_information")) + " ")], 1), t("div", {
      staticClass: "member-menu-item cs",
      on: {
          click: e.getService
      }
  }, [t("svg-icon", {
      staticClass: "cs",
      attrs: {
          iconClass: "icon-cs"
      }
  }), t("span", [e._v(e._s(e.$t("in_customer_services")))])], 1), e.isAgent ? t("div", {
      staticClass: "member-menu-item agent",
      on: {
          click: function(t) {
              return e.setAcPage("agentTeamOverview")
          }
      }
  }, [t("svg-icon", {
      staticClass: "agent",
      attrs: {
          iconClass: "icon-agent"
      }
  }), t("span", [e._v(e._s(e.$t("hd_agent")))])], 1) : e._e(), t("div", {
      staticClass: "member-menu-item logout",
      on: {
          click: e.logout
      }
  }, [t("svg-icon", {
      staticClass: "logout",
      attrs: {
          iconClass: "icon-logout"
      }
  }), t("span", [e._v(e._s(e.$t("in_sign_out")))])], 1)])])])], 1)])])
}
n(9868);
var Sn = function() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
    , t = e.toFixed(2)
    , n = t.toString().replace(/\d+/, (function(e) {
      return e.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")
  }
  ));
  return n
}
, Nn = {
  name: "memberInfo",
  setup: function() {
      var e = (0,
      o.Kh)({
          showBalance: !0
      })
        , t = (0, h.Pj)()
        , n = t.store
        , a = t.dispatch
        , i = (0, h.As)()
        , s = i.setAcPage
        , r = i.setMcPage
        , c = i.logout
        , l = i.isTrial
        , u = i.isAgent
        , d = i.isGamePage
        , m = (0, h.rz)()
        , g = m.avatarSrc
        , f = m.avatarErrorSrc
        , v = (0, h.so)()
        , w = v.getService
        , C = (0, h.OW)()
        , b = C.hasResource
        , _ = C.getResourceName
        , A = C.openResource
        , y = (0, o.EW)((function() {
          var e;
          return null === (e = n.Login.memberInfo) || void 0 === e ? void 0 : e.account
      }
      ))
        , P = (0, o.EW)((function() {
          var e;
          return null === (e = n.Login.memberInfo) || void 0 === e ? void 0 : e.id
      }
      ))
        , k = (0, o.EW)((function() {
          return n.Public.hasVip
      }
      ))
        , M = (0, o.EW)((function() {
          return n.Public.vipLabelName
      }
      ))
        , x = (0, o.EW)((function() {
          return n.Public.vipRankLevel
      }
      ))
        , L = (0, o.EW)((function() {
          return n.Public.availablePromoCount || 0
      }
      ))
        , S = (0, o.EW)((function() {
          return n.Public.unreadMessage || 0
      }
      ))
        , N = (0, o.EW)((function() {
          return L.value + S.value
      }
      ))
        , T = (0, o.EW)((function() {
          var e = n.Public.balance.toString();
          return e.replace(/[^/.]/g, "*")
      }
      ))
        , R = (0, o.EW)((function() {
          var e = n.Public.balance;
          return "number" === typeof e ? Sn(e) : e
      }
      ))
        , O = (0, o.EW)((function() {
          return n.Public.currencySymbol || ""
      }
      ))
        , E = (0, o.EW)((function() {
          var e = n.Public.availablePromo;
          return e["REFERRAL"] && e["REFERRAL"]["enabled"]
      }
      ))
        , I = function() {
          return a("getBalanceV2")
      }
        , B = function() {
          r(),
          window.sessionStorage.setItem("toWhichItem", "profile")
      }
        , V = function() {
          return e.showBalance = !e.showBalance
      }
        , G = function(e) {
          e.target.src = f.value
      }
        , H = function() {
          window.cover.loader(!0),
          window.cover.init({
              html: window.$i18n.t("copy_success"),
              icon: "success",
              btn: {
                  confirm: window.$i18n.t("in_increase_submit", "确定")
              }
          }),
          window.cover.loader(!1)
      };
      return (0,
      o.sV)((function() {
          I(),
          l.value || a("getUnreadMessageV2")
      }
      )),
      (0,
      p.A)((0,
      p.A)({}, (0,
      o.QW)(e)), {}, {
          account: y,
          userId: P,
          setMcPage: r,
          logout: c,
          refreshBalance: I,
          setShowBalance: V,
          unclaimedCount: N,
          balanceEyes: T,
          balance: R,
          currencySymbol: O,
          showInviteFriends: E,
          avatarSrc: g,
          handleError: G,
          getService: w,
          isAgent: u,
          setAcPage: s,
          hasResource: b,
          getResourceName: _,
          openResource: A,
          changeUserAvatar: B,
          hasVip: k,
          vipLabelName: M,
          vipRankLevel: x,
          isGamePage: d,
          copyOnSuccess: H
      })
  }
}
, Tn = Nn
, Rn = (0, _.A)(Tn, xn, [], !1, null, null, null)
, On = Rn.exports
