
  
  , r = []
  , c = function() {
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
  , l = []
  
  , je = n(55373)
  , Fe = n.n(je)
  , Qe = "USER_POPUP"
  , qe = "ANONYMOUS_POPUP"
  , We = {
    components: {
        Agent: Ee,
        Member: Ie,
        AnnouncePopup: T,
        NoticePopup: P,
        LoginPopup: K,
        RegisterPopup: de,
        ChangePassword: ve,
        ForgotPassword: Pe,
        TcgModal: L.A,
        GamePopup: u.N9,
        DfChatRoom: u.kO,
        SocketEvent: u.yg,
        Contract: u.NZ,
        HelpCenter: _e
    },
    setup: function() {
        var e = (0,
        v.Pj)()
          , t = e.store
          , n = e.dispatch
          , i = (0,
        v.As)()
          , a = i.setMcPage
          , s = i.isLogin
          , r = i.isTrial
          , c = i.firstTimeLogin
          , l = (0,
        v.ok)()
          , u = l.currentLanguage
          , d = (0,
        v.hS)()
          , m = (0,
        o.KR)([])
          , p = (0,
        o.EW)((function() {
            return s.value ? Qe : qe
        }
        ))
          , g = (0,
        o.EW)((function() {
            var e;
            return null === (e = t.Login.whitelabelVal) || void 0 === e ? void 0 : e.AGENTPOLICY3
        }
        ))
          , A = (0,
        o.EW)((function() {
            var e;
            return null === (e = t.Login.memberInfo) || void 0 === e ? void 0 : e.id
        }
        ))
          , f = (0,
        o.EW)((function() {
            var e;
            return null === (e = t.Login.memberInfo) || void 0 === e ? void 0 : e.account
        }
        ))
          , h = function() {
            var e = sessionStorage.getItem(p.value);
            if ("closed" !== e) {
                var n = s.value ? "A" : "B"
                  , i = t.Public.popup.filter((function(e) {
                    return !("A" !== n || !c.value || "F" !== e.execution) || e.execution === n
                }
                ));
                i.length && (m.value = i,
                d.show("publicModal"))
            }
        }
          , w = function() {
            sessionStorage.setItem(p.value, "closed")
        }
          , C = function() {
            var e = Fe().parse(window.location.search, {
                ignoreQueryPrefix: !0
            })
              , t = (null === e || void 0 === e ? void 0 : e.token) || window.sessionStorage.getItem("token");
            if (!t || s.value) {
                var i = {
                    types: "B,PL,PU,PR,H",
                    platform: "W"
                };
                n("getAnnouncementContentV2", {
                    data: i
                }).then((function() {
                    h()
                }
                ))
            }
        }
          , b = function() {
            n("getFavGames")
        }
          , y = function(e) {
            var t = {
                query: {
                    merchantCode: _.A.brand.merchant,
                    isPlatform: 2,
                    vassalage: "",
                    platform: "flash,html5-desktop",
                    language: u.value
                },
                refresh: e
            };
            n("getHotGameList", t)
        }
          , P = function() {
            var e = {
                gameCategory: "ALL",
                language: u.value,
                limitNum: 20
            };
            n("getWinnerBoard", e)
        };
        return (0,
        o.sV)((function() {
            n("getGameMatches"),
            n("getCountryCode"),
            y(),
            P()
        }
        )),
        (0,
        o.wB)(u, (function() {
            y(!0),
            P(),
            C()
        }
        )),
        (0,
        o.wB)(s, (function(e) {
            e && b(),
            e && !r.value && g.value && n("getConsolidated"),
            C()
        }
        ), {
            immediate: !0
        }),
        {
            isLogin: s,
            customerId: A,
            account: f,
            setMcPage: a,
            popupList: m,
            popupClose: w
        }
    }
}
  , Ye = We
  , Je = (0, b.A)(Ye, c, [], !1, null, null, null)
  , Ze = Je.exports