

// 
// 
// NOTE: 
, $t = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "agent-container"
  }, [t("div", {
      staticClass: "agent-top"
  }, [t("div", {
      staticClass: "top_bg"
  }), t("div", {
      staticClass: "content width_1200"
  }, [e._m(0), t("AgentLogin")], 1)]), e._m(1), e._m(2)])
}
, en = [function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "top-title"
  }, [t("div", {
      staticClass: "title"
  }, [e._v("从现在开始")]), t("div", {
      staticClass: "sub_title"
  }, [e._v("成为传奇,还是成为传奇的歌颂者?")])])
}
, function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "agent-main width_1200"
  }, [t("div", {
      staticClass: "main-title"
  }, [e._v("全行业最全推广支持")]), t("div", {
      staticClass: "promote"
  }, [t("div", {
      staticClass: "channel box"
  }, [t("img", {
      attrs: {
          src: n(17862),
          alt: ""
      }
  }), t("p", {
      staticClass: "b_t"
  }, [e._v("支持全渠道推广")]), t("div", {
      staticClass: "desc"
  }, [e._v(" 提供全面丰富的图片、视频推广素材， "), t("br"), e._v(" 专业定制马甲包，支持分发全网每个角落 ")])]), t("div", {
      staticClass: "mid"
  }, [t("img", {
      attrs: {
          src: n(37905),
          alt: ""
      }
  }), t("p", {
      staticClass: "b_t"
  }, [e._v("15天成为推广达人")]), t("div", {
      staticClass: "desc"
  }, [e._v(" 专家团队24小时提供专业指导， "), t("br"), e._v(" 零基础也可快速成为推广达人 ")])]), t("div", {
      staticClass: "data_b box"
  }, [t("img", {
      attrs: {
          src: n(95208),
          alt: ""
      }
  }), t("p", {
      staticClass: "b_t"
  }, [e._v("最全数据报表")]), t("div", {
      staticClass: "desc"
  }, [e._v(" 全面分析佣金组成、会员游戏状况 "), t("br"), e._v(" 对你的会员了如指掌 ")])])])])
}
, function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "agent-copyright"
  }, [t("p", [e._v("Copyright © 2022 代理后台")])])
}
]
, tn = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "agent-login"
  }, [t("div", {
      staticClass: "agent-login-bg"
  }, [e._m(0), t("LoginForm", {
      attrs: {
          loginType: e.loginType,
          agentPage: !0
      }
  }), e._m(1)], 1), t("TcgModal", {
      attrs: {
          name: "changePassModal"
      }
  }, [t("ChangePassword", {
      attrs: {
          agentPage: !0
      }
  })], 1)], 1)
}
, nn = [function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "form-title"
  }, [t("h5", [e._v("代理后台")])])
}
, function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "form-tip"
  }, [t("span", [e._v("专业咨询时间：周一至周五 午12点-晚9点")])])
}
]
, an = {
  mixins: [I, u.vE.firebaseMixins],
  name: "loginModal",
  components: {
      LoginForm: LoginForm,
      TcgModal: T.A,
      ChangePassword: ChangePassword_view
  },
  data: function() {
      return {
          loginType: "username"
      }
  }
}
, on = an
, sn = (0, _.A)(on, tn, nn, !1, null, null, null)
, AgentLogin = sn.exports


// 
// 
// NOTE: 
, cn = {
  name: "",
  components: {
      AgentLogin: AgentLogin
  }
}
, ln = cn
, un = (0, _.A)(ln, $t, en, !1, null, "c4cafe56", null)
, agent_components = un.exports