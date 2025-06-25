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