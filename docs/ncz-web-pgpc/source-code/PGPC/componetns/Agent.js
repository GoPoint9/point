
, [] = []
, AgentRender = function() {
  var t = this
    , e = t._self._c;
  return t.loaded ? e("div", {
      staticClass: "br_acmc_body"
  }, [e("div", {
      staticClass: "acmc_content"
  }, [e("div", {
      staticClass: "br_acmc_main"
  }, [e("div", {
      staticClass: "br_acmc_mleft"
  }, [e("div", {
      staticClass: "br_acmc_mltitle"
  }, [t._v(t._s(t.$t("hd_agent")))]), e("ul", {
      staticClass: "br_acmc_mlnav"
  }, [t._l(t.menu, (function(n) {
      return [e("li", {
          directives: [{
              name: "show",
              rawName: "v-show",
              value: t.menuIsShow(t.whitelabelVal[n.key], n.key),
              expression: "menuIsShow(whitelabelVal[item.key], item.key)"
          }],
          key: n.key,
          class: t.active === n.page ? "active" : "",
          attrs: {
              "data-mc": n.page
          },
          on: {
              click: function(e) {
                  return t.selectPage(n.page)
              }
          }
      }, [e("div", [e("i", {
          staticClass: "acmc_icon",
          class: "icon_" + n.page
      }), e("span", [t._v(t._s(t.$t(n.title)))])])])]
  }
  ))], 2)]), e("div", {
      staticClass: "br_acmc_mright",
      attrs: {
          id: "br_proxy_right"
      }
  })]), e("div", {
      staticClass: "close_btn",
      on: {
          click: t.closeAc
      }
  }, [e("span", [t._v("×")])])])]) : t._e()
}
, [] = []
, ns = {
  computed: {
      loaded: function() {
          return this.$store.state.acmc["acShow"] && this.$store.state.acmc["acLoaded"]
      }
  },
  methods: {
      setupLang: function() {
          window.tcg.ac._lang = window.localStorage.getItem("hisLang") || "CN"
      },
      selectPage: function(t) {
          this.active = t,
          this.loaded && window.tcg.ac[t] && window.tcg.ac[t]("#br_proxy_right")
      },
      closeAc: function() {
          this.$store.commit("setAcShow", !1)
      }
  },
  watch: {
      loaded: function(t, e) {
          t && t !== e && (this.setupLang(),
          this.selectPage(this.active))
      }
  },
  beforeMount: function() {
      var t = this.$store.state.acmc.acPage || "agentTeamOverview";
      ["0", "1", "2"].includes(window.sessionStorage.isAgent) && this.$store.dispatch("getConsolidated"),
      this.setupLang(),
      this.selectPage(t)
  },
  created: function() {
      var t = this
        , e = function() {
          var e = (0,
          s.A)((0,
          r.A)().mark((function e() {
              var n, i, a, s, o, c, l;
              return (0,
              r.A)().wrap((function(e) {
                  while (1)
                      switch (e.prev = e.next) {
                      case 0:
                          return n = t.$store.state.Login.whitelabelVal || t.$store.state.Common.whitelabelVal,
                          i = n.AGEPAG,
                          a = n.AGENTRANSMULTDOWN3,
                          s = n.AGETEAMPNL3,
                          o = n.TEAMBETTING3,
                          c = n.AGEREGDOWN3 || n.CREATEAFF3 || n.AFFMAN3,
                          l = {},
                          l.agentTeamOverview = !i,
                          l.agentRedRain = !a,
                          l.palStatementsAgentCopy = !s,
                          l.personalHistoryCopy = !o,
                          l.registerCenter = !c,
                          e.abrupt("return", l);
                      case 13:
                      case "end":
                          return e.stop()
                      }
              }
              ), e)
          }
          )));
          return function() {
              return e.apply(this, arguments)
          }
      }()
        , n = this.menu
        , i = {
          agentTeamOverview: !0,
          agentRedRain: !0,
          palStatementsAgentCopy: !0,
          personalHistoryCopy: !0,
          registerCenter: !0
      };
      this.menu = n.filter((function(t) {
          var e = t.page;
          return !i[e]
      }
      )),
      e().then((function(e) {
          t.menu = n.filter((function(t) {
              var n = t.page
                , i = t.show;
              return !e[n] || i
          }
          ))
      }
      ))
  }
}
, is = ns
, AgentProps = {
  name: "agent",
  mixins: [is],
  data: function() { return { active: "",
          menu: [{
              key: "AGENTANNOUNCE3",
              title: "in_agency_announcement",
              page: "agentAnnouncement"
          }, {
              key: "AGEINFO3",
              title: "in_increase_overview",
              page: "agentTeamOverview"
          }, {
              key: "REGCEN",
              title: "in_increase_account",
              page: "registerCenter"
          }, {
              key: "DOWNMAN",
              title: "in_team_management",
              page: "downlineManagmentView"
          }, {
              key: "TRANSBETREPMEM3",
              title: "in_team_betting",
              page: "personalHistoryCopy"
          }, {
              key: "AGETEAMPNL3",
              title: "in_user_loss",
              page: "palStatementsAgentCopy"
          }, {
              key: "AGEREV3",
              title: "in_my_income",
              page: "agentRevenueReport"
          }, {
              key: "AGEDOWNTRANS3",
              title: "in_account_details",
              page: "agentDownlineTransactionDetailsCopy"
          }, {
              key: "AGENTRANSMULTDOWN3",
              title: "in_red_envelope",
              page: "agentRedRain"
          }, {
              key: "DIVIDEND",
              title: "in_bonus_bmwmuf",
              page: "agentDividendRecordCopy"
          }, {
              key: "DAYSAL",
              title: "in_daily_hdtmkj",
              page: "agentDailyWages2"
          }, {
              key: "DAYSALMR",
              title: "in_daily_hdtmkj",
              page: "agentMRDailySalary"
          }, {
              key: "HOURSAL3",
              title: "in_hourly_salary",
              page: "agentHourSalary"
          }]
      }
  },
  computed: {
      whitelabelVal: function() {
          var t = this.$store.state.Common.whitelabel || {};
          return t
      },
      dailySalary: function() {
          return this.$store.state.Common.dailySalary
      },
      mrDailySalary: function() {
          return this.$store.state.Common.mrDailySalary
      },
      hourSalary: function() {
          return this.$store.state.Common.showHourSalary
      },
      showMyWallet: function() {
          return !this.$store.state.Login.hasMerchantWallet
      }
  },
  methods: {
      menuIsShow: function(t, e) {
          var n = ["AGEINFO3", "AGENTANNOUNCE3", "AGEDOWNTRANS3"]
            , i = ["DAYSAL", "DIVIDEND"]
            , a = t || {};
          if ("1" === a.enabled) {
              if ("AGETRANSFERUP3" === e) {
                  var r = window.sessionStorage.getItem("isAgent")
                    , s = window.sessionStorage.getItem("toUpline");
                  return "1" === s && "2" !== r
              }
              return "HOURSAL3" === e ? !!this.hourSalary : "MYWALL" === e ? !!this.showMyWallet : "DAYSALMR" === e ? this.mrDailySalary : !(!this.dailySalary[e] && i.indexOf(e) >= 0)
          }
          return n.indexOf(e) >= 0
      }
  }
}
, AgentProps = AgentProps
, ss = (0, Ct.A)(AgentProps, AgentRender, [], !1, null, null, null)
, Agent = ss.exports
// NOTE: