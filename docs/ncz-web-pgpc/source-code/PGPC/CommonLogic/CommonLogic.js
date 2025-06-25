
// APP 下層
, CommonLogic_render = function() {
  var e = this
      , t = e._self._c;
  return t("span", [t("TcgModal", {
      attrs: {
          name: "publicModal"
      },
      on: {
          beforeClose: e.popupClose
      }
  }, [t("AnnouncePopup", {
      attrs: {
          popupList: e.popupList
      }
  })], 1), t("TcgModal", {
      attrs: {
          name: "noticeModal"
      }
  }, [t("NoticePopup")], 1), t("TcgModal", {
      attrs: {
          name: "loginPopupModal"
      }
  }, [t("LoginPopup")], 1), t("TcgModal", {
      attrs: {
          name: "registerModal"
      }
  }, [t("RegisterPopup")], 1), t("TcgModal", {
      attrs: {
          name: "changePassModal"
      }
  }, [t("ChangePassword")], 1), t("TcgModal", {
      attrs: {
          name: "forgetPassModal"
      }
  }, [t("ForgotPassword")], 1), t("TcgModal", {
      attrs: {
          name: "helpModal"
      }
  }, [t("HelpCenter")], 1), t("GamePopup", {
      attrs: {
          iframe: !0
      }
  }), e.isLogin ? t("Contract") : e._e(), t("DfChatRoom", {
      attrs: {
          headerColor: "#e6601b"
      }
  }), e.$store.state.acmc.mcShow ? t("Member") : e._e(), e.$store.state.acmc.acShow ? t("Agent") : e._e(), e.isLogin ? t("SocketEvent", {
      attrs: {
          customerId: e.customerId,
          account: e.account,
          showMcPage: e.setMcPage
      }
  }) : e._e()], 1)
}
, u = (n(2008), n(26099), n(27495), n(5746), n(75316))

  //   LoginForm
  //   LoginPopup


// 
// 
// NOTE: 
, qe = n(55373)
, Fe = n.n(qe)
, je = "USER_POPUP"
, Ze = "ANONYMOUS_POPUP"
, CommonLogic_props = {
  components: {
      Agent: Agent_view,
      Member: Member_view,
      AnnouncePopup: AnnouncePopup_view,
      NoticePopup: NoticePopup_view,
      LoginPopup: LoginPopup_view,
      RegisterPopup: RegisterPopup_view,
      ChangePassword: ChangePassword_view,
      ForgotPassword: ForgotPassword_view,
      TcgModal: T.A,
      GamePopup: u.N9,
      DfChatRoom: u.kO,
      SocketEvent: u.yg,
      Contract: u.NZ,
      HelpCenter: HelpCenter
  },
  setup: function() {
      var e = (0, h.Pj)()
        , t = e.store
        , n = e.dispatch
        , a = (0, h.As)()
        , i = a.setMcPage
        , s = a.isLogin
        , r = a.isTrial
        , c = a.firstTimeLogin
        , l = (0, h.ok)()
        , u = l.currentLanguage
        , d = (0, h.hS)()
        , m = (0, o.KR)([])
        , p = (0, o.EW)((function() {
          return s.value ? je : Ze
      }
      ))
        , g = (0, o.EW)((function() {
          var e;
          return null === (e = t.Login.whitelabelVal) || void 0 === e ? void 0 : e.AGENTPOLICY3
      }
      ))
        , f = (0, o.EW)((function() {
          var e;
          return null === (e = t.Login.memberInfo) || void 0 === e ? void 0 : e.id
      }
      ))
        , v = (0, o.EW)((function() {
          var e;
          return null === (e = t.Login.memberInfo) || void 0 === e ? void 0 : e.account
      }
      ))
        , w = function() {
          var e = sessionStorage.getItem(p.value);
          if ("closed" !== e) {
              var n = s.value ? "A" : "B"
                , a = t.Public.popup.filter((function(e) {
                  return !("A" !== n || !c.value || "F" !== e.execution) || e.execution === n
              }
              ));
              a.length && (m.value = a,
              d.show("publicModal"))
          }
      }
        , C = function() {
          sessionStorage.setItem(p.value, "closed")
      }
        , b = function() {
          var e = Fe().parse(window.location.search, {
              ignoreQueryPrefix: !0
          })
            , t = (null === e || void 0 === e ? void 0 : e.token) || window.sessionStorage.getItem("token");
          if (!t || s.value) {
              var a = {
                  types: "B,PL,PU,PR,H",
                  platform: "W"
              };
              n("getAnnouncementContentV2", {
                  data: a
              }).then((function() {
                  w()
              }
              ))
          }
      }
        , _ = function() {
          n("getFavGames")
      }
        , A = function(e) {
          var t = {
              query: {
                  merchantCode: U.A.brand.merchant,
                  isPlatform: 2,
                  vassalage: "",
                  platform: "flash,html5-desktop",
                  language: u.value
              },
              refresh: e
          };
          n("getHotGameList", t)
      }
        , y = function() {
          var e = {
              gameCategory: "ALL",
              language: u.value,
              limitNum: 20
          };
          n("getWinnerBoard", e)
      };
      return (0, o.sV)((function() { n("getCountryCode"), A(), y() }
      )),
      (0, o.wB)(u, (function() { A(!0), y(), b() }
      )),
      (0, o.wB)(s, (function(e) { e && _(), e && !r.value && g.value && n("getConsolidated"), b() }
      ), { immediate: !0 }),
      {
          isLogin: s,
          customerId: f,
          account: v,
          setMcPage: i,
          popupList: m,
          popupClose: C
      }
  }
}
, CommonLogic_props = CommonLogic_props
, Je = (0, _.A)(CommonLogic_props, CommonLogic_render, [], !1, null, null, null)
, CommonLogic = Je.exports