, NoticeRender = (_s.exports, function() {
  var t = this
    , e = t._self._c;
  return t.active ? e("div", {
      staticClass: "br_index_modal active"
  }, [e("div", {
      staticClass: "br_imodal_main"
  }, [e("div", {
      staticClass: "br_imodal_mbg"
  }), e("div", {
      staticClass: "br_imodal_content"
  }, [e("div", {
      staticClass: "br_imodal_cmain"
  }, [e("div", {
      staticClass: "br_imodal_cmtitle"
  }, [t._v(t._s(t.$t("br_mkezget_mcgovs")))]), e("div", {
      staticClass: "br_imodal_cmclose",
      on: {
          click: t.modalClose
      }
  }, [t._v("X")]), e("div", {
      staticClass: "br_imodal_cmbody"
  }, [e("div", {
      staticClass: "br_imodal_pbody"
  }, [e("div", {
      staticClass: "br_imodal_typereq"
  }, [t._l(t.kind, (function(n, i) {
      return e("div", {
          key: i,
          staticClass: "br_imodal_trmain"
      }, [e("div", {
          staticClass: "br_imodal_tname"
      }, [t._v(t._s(t.$t(t.type[n])) + t._s(t.$t("in_bonus_bmwmuf")))]), e("ul", {
          staticClass: "br_imodal_tlist four"
      }, [e("li", [e("span", [t._v(t._s(t.$t("br_jsargd_pwwcto")))]), e("span", [t._v(t._s(t.$t("br_vajhsvh_fxdpos")))]), e("span", [t._v(t._s(t.$t("br_sjdfed_bwefu")))]), e("span", [t._v(t._s(t.$t("br_qpvusa_fvosl")))])]), t._l(t.divtypereq[n], (function(n, i) {
          return e("li", {
              key: i
          }, [e("span", [t._v(t._s(n.minimumBet) + "元")]), e("span", [t._v(t._s(n.netLoss) + "元")]), e("span", [t._v(t._s(n.activeMember) + "人")]), e("span", [t._v(t._s(parseInt(100 * n.contractRate)) + "%")])])
      }
      ))], 2), e("div", {
          staticClass: "br_imodal_tbtn"
      }, ["P" === t.divtypereq[n][0].status || "E" === t.divtypereq[n][0].status ? e("span", {
          staticClass: "res",
          on: {
              click: function(e) {
                  return t.participation(n, "A", t.divtypereq[n][0])
              }
          }
      }, [t._v(t._s(t.$t("br_oighuvbk_dgrwie")))]) : t._e(), "V" === t.divtypereq[n][0].status ? e("span", {
          staticClass: "res",
          on: {
              click: function(e) {
                  return t.participation(n, "C")
              }
          }
      }, [t._v(t._s(t.$t("br_ioddlq_swsrf")))]) : t._e(), "P" === t.divtypereq[n][0].status || "E" === t.divtypereq[n][0].status ? e("span", {
          staticClass: "rej",
          on: {
              click: function(e) {
                  return t.participation(n, "R")
              }
          }
      }, [t._v(t._s(t.$t("br_oyzao_gubukr")))]) : t._e(), "V" === t.divtypereq[n][0].status ? e("span", {
          staticClass: "rej",
          on: {
              click: function(e) {
                  return t.participation(n, "A")
              }
          }
      }, [t._v(t._s(t.$t("br_oyzao_gubukr")))]) : t._e()])])
  }
  )), t.kind && t.kind.length > 0 ? e("div", {
      staticClass: "br_imodal_tagreement"
  }, [e("p", {
      staticClass: "title"
  }, [t._v(t._s(t.$t("br_frttrr_qkxir")))]), e("p", [t._v(t._s(t.$t("br_vtarzkrq_mfrflk")))]), e("p", [t._v(t._s(t.$t("br_fcqouvf_gdbmvdm")))]), e("p", [t._v(t._s(t.$t("br_yeffxs_wepurpso")))])]) : t._e()], 2), e("div", {
      staticClass: "br_imodal_typereq"
  }, [t._l(t.sarlrkind, (function(n, i) {
      return e("div", {
          key: i,
          staticClass: "br_imodal_trmain"
      }, [e("div", {
          staticClass: "br_imodal_tname"
      }, [t._v(t._s(t.$t(t.type[n])) + t._s(t.$t("in_daily_hdtmkj")))]), e("div", [e("ul", {
          staticClass: "br_imodal_tlist three"
      }, [e("li", [e("span", [t._v(t._s(t.$t("br_ihdkcab_hgsdicgf")))]), e("span", [t._v(t._s(t.$t("br_pyogvw_bifuxqm")))]), e("span", [t._v(t._s(t.$t("br_idqho_exmbdevj")))])]), t._l(t.dailysalreq[n][0].details, (function(n, i) {
          return e("li", {
              key: i
          }, [e("span", [t._v(t._s(t.$t("br_gfhdge_lbdxbmp")) + "≥" + t._s(n.betVolume) + "元")]), e("span", [t._v(t._s(n.activeMember) + "人")]), e("span", [t._v(t._s("P" === n.rateType ? t.$t("br_gjsfjcqo_mtkkbpl") : t.$t("br_varjv_doqbjqbi")) + t._s("P" === n.rateType ? (100 * n.rate).toFixed(2) + "%" : n.rate))])])
      }
      ))], 2), e("div", {
          staticClass: "br_imodal_tbtn"
      }, ["P" === t.dailysalreq[n][0].status ? e("span", {
          staticClass: "res",
          on: {
              click: function(e) {
                  return t.wage(t.dailysalreq[n][0].id, "A", t.dailysalreq[n][0])
              }
          }
      }, [t._v(t._s(t.$t("br_oighuvbk_dgrwie")))]) : t._e(), "V" === t.dailysalreq[n][0].status ? e("span", {
          staticClass: "res",
          on: {
              click: function(e) {
                  return t.wage(t.dailysalreq[n][0].id, "C")
              }
          }
      }, [t._v(t._s(t.$t("br_ioddlq_swsrf")))]) : t._e(), "P" === t.dailysalreq[n][0].status ? e("span", {
          staticClass: "rej",
          on: {
              click: function(e) {
                  return t.wage(t.dailysalreq[n][0].id, "R")
              }
          }
      }, [t._v(t._s(t.$t("br_oyzao_gubukr")))]) : t._e(), "V" === t.dailysalreq[n][0].status ? e("span", {
          staticClass: "rej",
          on: {
              click: function(e) {
                  return t.wage(t.dailysalreq[n][0].id, "A")
              }
          }
      }, [t._v(t._s(t.$t("br_oyzao_gubukr")))]) : t._e()])])])
  }
  )), t.sarlrkind && t.sarlrkind.length > 0 ? e("div", {
      staticClass: "br_imodal_tagreement"
  }, [e("p", {
      staticClass: "title"
  }, [t._v(t._s(t.$t("br_fcqaon_nloihn")))]), e("p", [t._v(t._s(t.$t("br_fgtjfutl_wvsderq")))]), e("p", [t._v(t._s(t.$t("br_ddottzq_xdhqkja")))]), e("p", [t._v(t._s(t.$t("br_gclmyni_dlaat")))])]) : t._e()], 2), e("div", {
      staticClass: "br_imodal_typereq"
  }, [t._l(t.hourkind, (function(n, i) {
      return e("div", {
          key: i,
          staticClass: "br_imodal_trmain"
      }, [e("div", {
          staticClass: "br_imodal_tname"
      }, [t._v(t._s(t.$t(t.type[n])) + t._s(t.$t("in_hourly_salary")))]), e("div", [e("ul", {
          staticClass: "br_imodal_tlist three"
      }, [e("li", [e("span", [t._v(t._s(t.$t("br_qgqbbjo_oillv")))]), e("span", [t._v(t._s(t.$t("br_pyogvw_bifuxqm")))]), e("span", [t._v(t._s(t.$t("br_kmojqy_qqxdpeg")))])]), t._l(t.hoursalreq[n][0].hourSalaryRates, (function(n, i) {
          return e("li", {
              key: i
          }, [e("span", [t._v(t._s(t.$t("br_lpqmrfrg_mvacmxf")) + "≥" + t._s(n.minimumBet) + "元")]), e("span", [t._v(t._s(n.activeMember) + "人")]), e("span", [t._v(t._s("P" === n.rateType ? t.$t("br_gjsfjcqo_mtkkbpl") : t.$t("br_varjv_doqbjqbi")) + t._s("P" === n.rateType ? (100 * n.rate).toFixed(2) + "%" : n.rate))])])
      }
      ))], 2), e("div", {
          staticClass: "br_imodal_tbtn"
      }, ["P" === t.hoursalreq[n][0].status ? e("span", {
          staticClass: "res",
          on: {
              click: function(e) {
                  return t.hourSalary(t.hoursalreq[n][0].contractId, "A", t.hoursalreq[n][0])
              }
          }
      }, [t._v(t._s(t.$t("br_oighuvbk_dgrwie")))]) : t._e(), "V" === t.hoursalreq[n][0].status ? e("span", {
          staticClass: "res",
          on: {
              click: function(e) {
                  return t.hourSalary(t.hoursalreq[n][0].contractId, "A")
              }
          }
      }, [t._v(t._s(t.$t("br_ioddlq_swsrf")))]) : t._e(), "P" === t.hoursalreq[n][0].status ? e("span", {
          staticClass: "rej",
          on: {
              click: function(e) {
                  return t.hourSalary(t.hoursalreq[n][0].contractId, "R")
              }
          }
      }, [t._v(t._s(t.$t("br_oyzao_gubukr")))]) : t._e(), "V" === t.hoursalreq[n][0].status ? e("span", {
          staticClass: "rej",
          on: {
              click: function(e) {
                  return t.hourSalary(t.hoursalreq[n][0].contractId, "R")
              }
          }
      }, [t._v(t._s(t.$t("br_oyzao_gubukr")))]) : t._e()])])])
  }
  )), t.hourkind && t.hourkind.length > 0 ? e("div", {
      staticClass: "br_imodal_tagreement"
  }, [e("p", {
      staticClass: "title"
  }, [t._v(t._s(t.$t("br_rfcndw_mijltrk")))]), e("p", [t._v(t._s(t.$t("br_hvpoynj_ydeqcjb")))]), e("p", [t._v(t._s(t.$t("br_ddottzq_xdhqkja")))]), e("p", [t._v(t._s(t.$t("br_gclmyni_dlaat")))])]) : t._e()], 2)])])])])])]) : t._e()
}
)
, [] = []
, NoticeProps = {
  name: "notice",
  data: function() { return { type: {
              LIVE: "in_real_person",
              RNG: "in_rng_electronic",
              CONS: "in_all_Comprehensive",
              SPORTS: "in_physical_education",
              LOTT: "in_lott_ticket",
              FISH: "in_game_fishing",
              ELOTT: "in_elott_Handicap",
              PVP: "in_chess"
          }
      }
  },
  computed: {
      divtypereq: function() {
          return this.$store.state.Common.consolidated.divtypereq
      },
      dailysalreq: function() {
          var t = this.$store.state.Common.consolidated.dailysalreq
            , e = t || [];
          return e
      },
      hoursalreq: function() {
          return this.$store.state.Common.consolidated.contracthoursalreq || {}
      },
      kind: function() {
          var t = this.divtypereq;
          return t ? Object.keys(t) : []
      },
      sarlrkind: function() {
          var t = this.dailysalreq;
          return t ? Object.keys(t) : []
      },
      hourkind: function() {
          var t = this.hoursalreq;
          return t ? Object.keys(t) : []
      },
      active: function() {
          return this.$store.state.Common.showConsolidated
      },
      isLogin: function() {
          return this.$store.state.Login.isLogin
      }
  },
  methods: {
      modalClose: function() {
          this.$store.dispatch("closeConsolidated")
      },
      confirm: function(t) {
          var e = this;
          return new Promise((function(n) {
              t && "Y" === t.downlineHigherRate ? e.cover.init({
                  html: '<p style="max-width: 300px">'.concat(e.$t("higher_rate"), "</p>"),
                  icon: "info",
                  btn: {
                      cancel: e.$t("label_cancel"),
                      confirm: e.$t("in_increase_submit")
                  }
              }, (function(t) {
                  n("confirm" === t)
              }
              )) : n(!0)
          }
          ))
      },


      participation: function(t, e, n) {
          var i = this;
          return (0,
          s.A)((0,
          r.A)().mark((function a() {
              var s;
              return (0,
              r.A)().wrap((function(a) {
                  while (1)
                      switch (a.prev = a.next) {
                      case 0:
                          return a.next = 2,
                          i.confirm(n);
                      case 2:
                          s = a.sent,
                          s && (i.cover.loader(!0),
                          i.$store.dispatch("participation", {
                              data: {
                                  type: t,
                                  status: e
                              }
                          }).then((function(t) {
                              i.cover.loader(!1),
                              i.$store.dispatch("getConsolidated")
                          }
                          )));
                      case 4:
                      case "end":
                          return a.stop()
                      }
              }
              ), a)
          }
          )))()
      },


      wage: function(t, e, n) {
          var i = this;
          return (0,
          s.A)((0,
          r.A)().mark((function a() {
              var s;
              return (0,
              r.A)().wrap((function(a) {
                  while (1)
                      switch (a.prev = a.next) {
                      case 0:
                          return a.next = 2,
                          i.confirm(n);
                      case 2:
                          s = a.sent,
                          s && (i.cover.loader(!0),
                          i.$store.dispatch("wage", {
                              data: {
                                  id: t,
                                  status: e
                              }
                          }).then((function(t) {
                              i.cover.loader(!1),
                              i.$store.dispatch("getConsolidated")
                          }
                          )));
                      case 4:
                      case "end":
                          return a.stop()
                      }
              }
              ), a)
          }
          )))()
      },


      hourSalary: function(t, e, n) {
          var i = this;
          return (0,
          s.A)((0,
          r.A)().mark((function a() {
              var s;
              return (0,
              r.A)().wrap((function(a) {
                  while (1)
                      switch (a.prev = a.next) {
                      case 0:
                          return a.next = 2,
                          i.confirm(n);
                      case 2:
                          s = a.sent,
                          s && (i.cover.loader(!0),
                          i.$store.dispatch("hourSalary", {
                              data: {
                                  contractId: t,
                                  status: e
                              }
                          }).then((function(t) {
                              i.cover.loader(!1),
                              i.$store.dispatch("getConsolidated")
                          }
                          )));
                      case 4:
                      case "end":
                          return a.stop()
                      }
              }
              ), a)
          }
          )))()
      }
  }
}
, NoticeProps = NoticeProps
, Cs = (0, Ct.A)(NoticeProps, NoticeRender, [], !1, null, "f30df6e8", null)