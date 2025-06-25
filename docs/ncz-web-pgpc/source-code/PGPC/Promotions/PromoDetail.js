const PromoDetailRender = function () {
  const t = this
  const A = t._self._c
  return A('div', {
    staticClass: 'promo-detail-container',
  }, [A('img', {
    staticClass: 'detail-img',
    attrs: {
      src: (t.promotion.announcementImages[0] || {}).url,
      alt: '',
    },
  }), A('div', {
    staticClass: 'detail-title',
  }, [t._v(t._s(t.promotion.title))]), A('div', {
    staticClass: 'vhtml',
    domProps: {
      innerHTML: t._s(t.promotion.content),
    },
  }), A('div', {
    staticClass: 'detail-footer',
  }, [A('button', {
    staticClass: 'promo-btn',
    attrs: {
      type: 'button',
    },
    on: {
      click: t.goCurrentPromo,
    },
  }, [t._v(' ' + t._s(t.$t('go_promo')) + ' ')])])])
}
const PromoDetailProps = {
  name: 'promotionDetail',
  props: {
    promotion: {
      type: Object,
      required: !0,
    },
  },
  setup: function (t) {
    const A = (0,
    f.yP)()
    const o = A.showSideMenu
    const e = (0,
    f.As)()
    const n = e.setMcPage
    const r = (0,
    f.AL)()
    const a = r.promotionToMc
    const s = r.showPromoBtn
    const c = function () {
      a(t.promotion.promotionType, n)
    }
    const l = function (t) {
      const A = t.startDate
      const o = t.endDate
      const e = i()(A).format('YYYY-MM-DD HH:mm:ss')
      const n = i()(o).format('YYYY-MM-DD HH:mm:ss')
      return ''.concat(e, ' - ').concat(n)
    }
    return {
      getPromoTime: l,
      showSideMenu: o,
      showPromoBtn: s,
      goCurrentPromo: c,
    }
  },
}
const PromoDetail = (0, P.A)(PromoDetailProps, PromoDetailRender, [], !1, null, null, null)
