
, cs = function() {
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
  }, [t._v(t._s(t.$t("in_personal_center")))]), e("ul", {
      staticClass: "br_acmc_mlnav"
  }, [t._l(t.menu, (function(n) {
      return [e("li", {
          key: n.page,
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
      }), "missionLeaderboard" === n.page && t.missionCount > 0 ? e("i", {
          staticClass: "tip_fixd"
      }, [t._v(" " + t._s(t.missionCount) + " ")]) : t._e(), e("span", [t._v(t._s(t.$t(n.name)))])])])]
  }
  ))], 2)]), e("div", {
      staticClass: "br_acmc_mright",
      attrs: {
          id: "br_proxy_right"
      }
  })]), e("div", {
      staticClass: "close_btn",
      on: {
          click: t.closeMc
      }
  }, [e("span", [t._v("×")])])])]) : t._e()
}
, ls = []
, us = {
  computed: {
      loaded: function() {
          return this.$store.state.acmc["mcShow"] && this.$store.state.acmc["mcLoaded"]
      },
      availablePromo: function() {
          return this.$store.state.Public.availablePromo
      }
  },
  methods: {
      setupLang: function() {
          window.tcg.mc._lang = window.localStorage.getItem("hisLang") || "CN"
      },
      selectPage: function(t) {
          var e = this
            , n = t;
          ["signInTask", "newbieTask", "rescueTask", "promoList"].includes(t) && (n = "rewardCenter"),
          "rewardCenter" === n && (window["pointMall"] = function() {
              e.$store.commit("setMcShow", !1),
              e.$router.push("pointMall")
          }
          ),
          this.active = n,
          this.loaded && window.tcg.mc[t] && window.tcg.mc[t]("#br_proxy_right")
      },
      closeMc: function() {
          this.$store.commit("setMcShow", !1),
          this.$store.dispatch("getUnreadMessageV2")
      },
      updateMenu: function() {
          var t = this
            , e = function() {
              var e = (0,
              s.A)((0,
              r.A)().mark((function e() {
                  var n, i, a, s, o, l, u, d, m, p, g, h, f, v, _, w, b;
                  return (0,
                  r.A)().wrap((function(e) {
                      while (1)
                          switch (e.prev = e.next) {
                          case 0:
                              return n = t.$store.state.Login.whitelabelVal || t.$store.state.Common.whitelabelVal,
                              i = t.$store.state.home && t.$store.state.home.type || {},
                              a = t.availablePromo.MISSION && t.availablePromo.MISSION.enabled,
                              s = t.availablePromo.REFERRAL && t.availablePromo.REFERRAL.enabled,
                              o = window.sessionStorage.getItem("isAgent"),
                              l = window.sessionStorage.getItem("toUpline"),
                              u = "1" === l && "2" !== o && n.AGETRANSFERUP3,
                              e.prev = 7,
                              e.next = 10,
                              Promise.all([c.A.getMerchantWallet({
                                  data: {
                                      merchantCode: window.localStorage.getItem("merchantCode")
                                  }
                              }), t.$store.dispatch("getRebate")]);
                          case 10:
                              m = e.sent,
                              p = (0,
                              _t.A)(m, 1),
                              d = p[0],
                              e.next = 17;
                              break;
                          case 15:
                              e.prev = 15,
                              e.t0 = e["catch"](7);
                          case 17:
                              return g = d.value && 1 !== +d.value.isSingle,
                              h = n.REWCEN3,
                              f = n.MAILCEN,
                              v = n.DEPOSIT && !n.CREDITMAR3,
                              _ = n.WITHDRAW && !n.CREDITMAR3,
                              w = n.PLYRBT && t.$store.state.Public.hasRebate,
                              b = {},
                              b.playerMRDailySalary = !i.dailySalary,
                              b.transferUpline = !u,
                              b.transferFund = !g,
                              b.rewardCenter = !h,
                              b.messageV2 = !f,
                              b.depositv2 = !v,
                              b.withdraw = !_,
                              b.bonusDetails = !w,
                              b.referral = !s,
                              b.missionLeaderboard = !a,
                              b.manualRebate = !n.MANPLAYREB3,
                              b.feedback = !n.FEEDBACK3,
                              e.abrupt("return", b);
                          case 37:
                          case "end":
                              return e.stop()
                          }
                  }
                  ), e, null, [[7, 15]])
              }
              )));
              return function() {
                  return e.apply(this, arguments)
              }
          }()
            , n = {
              playerMRDailySalary: !0,
              transferUpline: !0,
              transferFund: !0,
              rewardCenter: !0,
              messageV2: !0,
              bonusDetails: !0,
              referral: !0
          };
          this.menu = this.originalMenu.filter((function(t) {
              var e = t.page;
              return !n[e]
          }
          )),
          e().then((function(e) {
              t.menu = t.originalMenu.filter((function(t) {
                  var n = t.page
                    , i = t.show;
                  return !e[n] || i
              }
              ))
          }
          ))
      }
  },
  watch: {
      loaded: function(t, e) {
          t && t !== e && (this.setupLang(),
          this.selectPage(this.active))
      },
      availablePromo: function() {
          this.updateMenu()
      }
  },
  beforeMount: function() {
      var t = this.$store.state.acmc.mcPage;
      ["0", "1", "2"].includes(window.sessionStorage.isAgent) && this.$store.dispatch("getConsolidated"),
      this.setupLang(),
      this.selectPage(t)
  },
  created: function() {
      this.originalMenu = this.menu,
      this.updateMenu()
  }
}
, MemberMixins = us
, Memberprops = {
  name: "member",
  mixins: [MemberMixins],
  data: function() { return { active: "",
          menu: [
            { name: "in_my_account", page: "securityCenter" },
            { name: "in_my_wallet", page: "transferFund" },
            { name: "in_increase_deposit", page: "depositv2" },
            { name: "in_increase_withdrawal", page: "withdraw" },
            { name: "in_betting_record", page: "personalHistoryCopy" },
            { name: "in_account_record", page: "transactionHistory" },
            { name: "in_personal_loss", page: "personalProfit" },
            { name: "in_transfer_upline", page: "transferUpline" },
            { name: "in_reward_center", page: "rewardCenter" },
            { name: "invite_friends", page: "referral" },
            { name: "in_bonus_details", page: "bonusDetails" },
            { name: "mission_activity", page: "missionLeaderboard" },
            { name: "in_platform_information", page: "messageV2" },
            { name: "manual_rebate", page: "manualRebate" }
          ]
      }
  },
  computed: {
      missionCount: function() {
          return this.availablePromo.MISSION && this.availablePromo.MISSION.count || 0
      }
  }
}
, Memberprops = ms
, gs = (0, Ct.A)(Memberprops, cs, ls, !1, null, null, null)
, Member = gs.exports
// NOTE:
