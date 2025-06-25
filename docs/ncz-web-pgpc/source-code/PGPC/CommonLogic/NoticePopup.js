

, l = []
, u = (n(2008), n(26099), n(27495), n(5746), n(75316))

, d = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "announce-popup-container"
  }, [t("div", {
      staticClass: "popup-bg"
  }, [t("div", {
      staticClass: "popup-content"
  }, [t("div", {
      staticClass: "popup-main"
  }, [t("div", {
      staticClass: "left-wrap"
  }, [t("ul", {
      staticClass: "content-nav"
  }, e._l(e.list[e.page - 1], (function(n, a) {
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
          "page-count": e.list.length,
          "page-range": 1,
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
  }, [e._v(e._s(((e.list[e.page - 1] || {})[e.select] || {}).title || ""))]), t("div", {
      staticClass: "detail-box"
  }, [t("div", {
      staticClass: "detail-text vhtml",
      domProps: {
          innerHTML: e._s(((e.list[e.page - 1] || {})[e.select] || {}).content || "")
      }
  })])])])])])])
}
, m = []
, p = n(57888)
, g = n(74353)
, f = n.n(g)
, v = n(2543)
, h = n(68770)
, w = 9
, C = {
  name: "notice",
  setup: function() {
      var e = (0,
      o.Kh)({
          select: 1,
          page: 1,
          list: []
      })
        , t = (0, h.Pj)()
        , n = t.store
        , a = (0, o.EW)((function() {
          return n.home.noticeIndex
      }
      ))
        , i = (0, o.EW)((function() {
          return n.Public.notice
      }
      ))
        , s = function(t) {
          e.select = e.select === t ? .5 : t
      }
        , r = function(e) {
          var t = new Date(+e);
          return f()(t).format("yyyy-MM-dd hh:mm:ss")
      }
        , c = function() {
          var t = e.select
            , n = (0, v.chunk)(i.value, w)
            , a = Math.ceil((t + 1) / w)
            , o = t - (a - 1) * w;
          e.list = n,
          e.page = a,
          e.select = o
      }
        , l = function(t) {
          e.page = t,
          e.select = 1
      }
        , u = function(t) {
          e.select = t
      };
      return (0, o.wB)(a, (function(t) {
          (t || 0 === t) && (e.select = t,
          c())
      }
      ), {
          immediate: !0
      }),
      (0,
      p.A)((0,
      p.A)({}, (0,
      o.QW)(e)), {}, {
          notice: i,
          unfold: s,
          formatTime: r,
          changePage: l,
          tabChange: u
      })
  }
}
, b = C
, _ = n(81656)
, A = (0, _.A)(b, d, m, !1, null, null, null)
, NoticePopup_view = A.exports