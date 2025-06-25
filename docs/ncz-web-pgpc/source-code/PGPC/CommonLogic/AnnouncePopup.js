

// 
// 
// NOTE: 
, P = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "announce-popup-container"
  }, [t("div", {
      staticClass: "popup-bg"
  }, [t("div", {
      staticClass: "popup-title"
  }, [e._v(e._s(e.$t("in_increase_announcement")))]), t("div", {
      staticClass: "popup-content"
  }, [t("div", {
      staticClass: "popup-main"
  }, [t("div", {
      staticClass: "left-wrap"
  }, [t("ul", {
      staticClass: "content-nav"
  }, e._l(e.publicityList[e.page - 1], (function(n, a) {
      return t("li", {
          key: a,
          class: {
              active: e.select === a
          },
          on: {
              click: function(t) {
                  return e.tabChange(a)
              }
          }
      }, [t("i", {
          staticClass: "icon icon_notice"
      }), t("div", {
          staticClass: "nav-title"
      }, [e._v(e._s(n.title))]), t("span", {
          staticClass: "item-arrow"
      }, [t("svg-icon", {
          attrs: {
              iconClass: "common-arrow"
          }
      })], 1)])
  }
  )), 0), t("div", {
      staticClass: "paginate-wrapper"
  }, [t("paginate", {
      attrs: {
          "page-count": e.publicityList.length,
          "margin-pages": 1,
          "page-range": 5,
          "click-handler": e.changePage,
          "prev-text": "",
          "next-text": "",
          "container-class": "pagination-container",
          "page-class": "page-item",
          "page-link-class": "page-link-item",
          "prev-class": "prev-item",
          "prev-link-class": "prev-link-item",
          "next-class": "next-item",
          "next-link-class": "next-link-item",
          "break-view-class": "break-view",
          "break-view-link-class": "break-view-link"
      },
      model: {
          value: e.page,
          callback: function(t) {
              e.page = t
          },
          expression: "page"
      }
  })], 1)]), t("div", {
      staticClass: "content-detail"
  }, [t("div", {
      staticClass: "content-title"
  }, [e._v(e._s(((e.publicityList[e.page - 1] || {})[e.select] || {}).title || ""))]), t("div", {
      staticClass: "detail-box"
  }, [t("div", {
      staticClass: "detail-text vhtml",
      domProps: {
          innerHTML: e._s(((e.publicityList[e.page - 1] || {})[e.select] || {}).content || "")
      }
  })]), t("div", {
      staticClass: "notice_footer"
  }, [((e.publicityList[e.page - 1] || {})[e.select] || {})["promotionType"] ? t("button", {
      staticClass: "btn_promo hover",
      on: {
          click: function(t) {
              e.toPromotion((e.publicityList[e.page - 1] || {})[e.select])
          }
      }
  }, [e._v(" " + e._s(e.$t("go_promo")) + " ")]) : e._e()])])])])])])
}
, k = []
, M = 9
, x = {
  name: "notice",
  props: {
      popupList: {
          type: Array,
          required: !0
      }
  },
  setup: function(e) {
      var t = (0,
      o.Kh)({
          select: 0,
          page: 1
      })
        , n = (0,
      h.As)()
        , a = n.setMcPage
        , i = (0,
      h.hS)()
        , s = (0,
      o.EW)((function() {
          return (0,
          v.chunk)(e.popupList, M)
      }
      ))
        , r = function(e) {
          t.page = e,
          t.select = 1
      }
        , c = function(e) {
          t.select = e
      }
        , l = function(e) {
          t.select = t.select === e ? .5 : e
      }
        , u = function(e) {
          a("rewardCenter"),
          i.hide("publicModal")
      }
        , d = function(e) {
          var t = new Date(+e);
          return f()(t).format("yyyy-MM-dd hh:mm:ss")
      };
      return (0,
      p.A)((0,
      p.A)({}, (0,
      o.QW)(t)), {}, {
          publicityList: s,
          unfold: l,
          toPromotion: u,
          formatTime: d,
          changePage: r,
          tabChange: c
      })
  }
}
, L = x
, S = (0, _.A)(L, P, k, !1, null, null, null)
, AnnouncePopup_view = S.exports
