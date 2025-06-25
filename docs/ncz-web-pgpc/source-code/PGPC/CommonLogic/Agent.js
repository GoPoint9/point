
// 
// 
// NOTE: 
, Pe = (n(62010), function() {
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
  }, [e._v(e._s(e.$t("hd_agent")))]), t("ul", {
      staticClass: "br_acmc_mlnav"
  }, e._l(e.menu, (function(n, a) {
      return t("li", {
          key: a,
          class: e.active === n.page ? "active" : "",
          attrs: {
              "data-pagemodal": n.data
          },
          on: {
              click: function(t) {
                  return e.selectPage(n.page)
              }
          }
      }, [t("i", {
          staticClass: "acmc_icon",
          class: "icon_" + n.page
      }), t("span", [e._v(e._s(n.name))])])
  }
  )), 0)]), t("div", {
      staticClass: "br_acmc_mright",
      attrs: {
          id: "br_proxy_right"
      }
  })]), t("div", {
      staticClass: "close_btn",
      on: {
          click: e.closeAc
      }
  })])]) : e._e()
}
)
, ke = []
, Me = {
  name: "agent",
  setup: function() {
      var e = (0,
      h.s9)()
        , t = e.t
        , n = [{
          name: t("in_increase_announcement"),
          page: "agentAnnouncement",
          data: "agentCenter/agentAnnouncement"
      }, {
          name: t("in_increase_overview"),
          page: "agentTeamOverview",
          data: "agentCenter/agentTeamOverview"
      }, {
          name: t("in_increase_account"),
          page: "registerCenter",
          data: "agentCenter/registerCenter"
      }, {
          name: t("in_team_management"),
          page: "downlineManagmentView",
          data: "agentCenter/downlineManagmentView"
      }, {
          name: t("in_team_betting"),
          page: "personalHistoryCopy",
          data: "agentCenter/personalHistoryCopy"
      }, {
          name: t("in_user_loss"),
          page: "palStatementsAgentCopy",
          data: "agentCenter/palStatementsAgentCopy"
      }, {
          name: t("in_my_income"),
          page: "agentRevenueReport",
          data: "agentCenter/agentRevenueReport"
      }, {
          name: t("in_account_details"),
          page: "agentDownlineTransactionDetailsCopy",
          data: "agentCenter/agentDownlineTransactionDetailsCopy"
      }, {
          name: t("in_bonus_bmwmuf"),
          page: "agentDividendRecordCopy2",
          data: "agentCenter/agentDividendRecord2",
          type: "enableCt"
      }, {
          name: t("in_daily_hdtmkj"),
          page: "agentDailyWages2",
          data: "agentCenter/agentDailyWages2",
          type: "salary"
      }, {
          name: t("in_hourly_salary"),
          page: "agentHourSalary",
          data: "agentCenter/agentHourSalary",
          type: "hourSalary"
      }, {
          name: t("real_time_salary_menu"),
          page: "agentRealtimeSalary",
          data: "agentCenter/agentRealtimeSalary",
          type: "agentRealtimeSalary"
      }]
        , a = (0,
      h.ME)(n)
        , i = a.acMenu
        , o = a.loaded
        , s = a.activeAcPage
        , r = a.selectAcPage
        , c = a.closeAc;
      return {
          loaded: o,
          menu: i,
          active: s,
          selectPage: r,
          closeAc: c
      }
  }
}
, xe = Me
, Le = (0, _.A)(xe, Pe, ke, !1, null, null, null)
, Agent_view = Le.exports
