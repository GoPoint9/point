

// 
// 
// NOTE: 
, Ne = function() {
  var e = this
    , t = e._self._c;
  return e.loaded ? t("div", {
      staticClass: "br_acmc_body"
  }, [t("div", {
      staticClass: "acmc_content"
  }, [t("div", {
      staticClass: "br_acmc_main"
  }, [t("div", {
      staticClass: "br_acmc_mleft"
  }, [t("div", {
      staticClass: "br_acmc_mltitle"
  }, [e._v(e._s(e.$t("in_personal_center")))]), t("ul", {
      staticClass: "br_acmc_mlnav"
  }, [e._l(e.menu, (function(n, a) {
      return [t("li", {
          key: a,
          class: e.active === n.page ? "active" : "",
          attrs: {
              "data-mc": n.page
          },
          on: {
              click: function(t) {
                  return e.selectPage(n.page)
              }
          }
      }, [t("i", {
          staticClass: "acmc_icon",
          class: "icon_" + n.page
      }), "missionLeaderboard" === n.page && e.missionCount > 0 ? t("i", {
          staticClass: "tip_fixd"
      }, [e._v(e._s(e.missionCount))]) : e._e(), "messageV2" === n.page && e.messageCount > 0 ? t("i", {
          staticClass: "tip_fixd"
      }, [e._v(e._s(e.messageCount))]) : e._e(), "rewardCenter" === n.page && e.rewardCount > 0 ? t("i", {
          staticClass: "tip_fixd"
      }, [e._v(e._s(e.rewardCount))]) : e._e(), t("span", [e._v(e._s(e.$t(n.name)))])])]
  }
  ))], 2)]), t("div", {
      staticClass: "br_acmc_mright",
      attrs: {
          id: "br_proxy_right"
      }
  })]), t("div", {
      staticClass: "close_btn",
      on: {
          click: e.closeMc
      }
  })])]) : e._e()
}
, Te = []
, Re = n(77337)
, Oe = {
  name: "member",
  setup: function() {
      var e = (0,
      Re.qf)([{
          name: "in_my_account",
          page: "securityCenter"
      }, {
          name: "in_my_wallet",
          page: "transferFund"
      }, {
          name: "in_increase_deposit",
          page: "depositv2"
      }, {
          name: "in_increase_withdrawal",
          page: "withdraw"
      }, {
          name: "in_transfer_upline",
          page: "transferUpline"
      }, {
          name: "in_betting_record",
          page: "personalHistoryCopy"
      }, {
          name: "in_account_record",
          page: "transactionHistory"
      }, {
          name: "in_personal_loss",
          page: "personalProfit"
      }, {
          name: "in_bonus_details",
          page: "bonusDetails"
      }, {
          name: "in_reward_center",
          page: "rewardCenter"
      }, {
          name: "invite_friends",
          page: "referral"
      }, {
          name: "mission_activity",
          page: "missionLeaderboard"
      }, {
          name: "in_platform_information",
          page: "messageV2"
      }, {
          name: "manual_rebate",
          page: "manualRebate"
      }])
        , t = e.loaded
        , n = e.mcMenu
        , a = e.selectMcPage
        , i = e.activeMcPage
        , o = e.missionCount
        , s = e.messageCount
        , r = e.rewardCount
        , c = e.closeMc;
      return {
          active: i,
          loaded: t,
          menu: n,
          selectPage: a,
          missionCount: o,
          messageCount: s,
          rewardCount: r,
          closeMc: c
      }
  }
}
, Ee = Oe
, Ie = (0, _.A)(Ee, Ne, Te, !1, null, null, null)
, Member_view = Ie.exports
