const promoDetailsModalRender = function () {
  const t = this
  const A = t._self._c
  return A('div', {
    staticClass: 'promo-details-modal',
  }, [A('div', {
    staticClass: 'modal-content',
  }, [A('div', {
    staticClass: 'modal-body',
  }, [A('div', {
    staticClass: 'modal-header',
  }, [A('div', {
    staticClass: 'modal-info',
  }, [A('h5', {
    staticClass: 'modal-title',
  }, [t._v(t._s(t.promotion.title))])])]), A('div', {
    staticClass: 'vhtml',
    domProps: {
      innerHTML: t._s(t.promotion.content),
    },
  })]), t.showPromoMcBtn && t.isLogin
    ? A('div', {
      staticClass: 'modal-footer',
    }, [A('button', {
      staticClass: 'btn btn-gomc',
      attrs: {
        type: 'button',
      },
      on: {
        click: t.goCurrentPromo,
      },
    }, [t._v(' ' + t._s(t.$t('go_promo')) + ' ')])])
    : t._e()])])
}
const u = o(4091)
const promoDetailsModalProps = {
  name: 'promoDetailsModal',
  mixins: [u.vE.promotionToMc],
  props: {
    promotion: {
      type: Object,
      required: !0,
    },
  },
  data: function () {
    return {
      showRegister: !0,
    }
  },
  computed: {
    isLogin: function () {
      return this.$store.state.Login.isLogin
    },
  },
  beforeMount: function () {
    this.showPromoBtn(this.promotion.promotionType, this.showRegister)
  },
  methods: {
    formatTime: function (t, A, o) {
      return +o !== 1 && A ? ''.concat(i()(t).format('YYYY/MM/DD HH:mm:ss'), ' - ').concat(i()(A).format('YYYY/MM/DD HH:mm:ss')) : ''.concat(i()(t).format('YYYY/MM/DD HH:mm:ss'), ' - ').concat(this.$t('long_term'))
    },
    handleTime: function (t, A, o) {
      if (+o !== 1 && A && t) {
        const e = A - t
        return this.dateCount(e)
      }
      return this.$t('long_term')
    },
    dateCount: function (t) {
      const A = t / 1e3 / 3600 / 24
      const o = Math.floor(A)
      const e = 24 * (A - o)
      const n = Math.floor(e)
      return n === 0 ? ''.concat(o, ' days') : ''.concat(n, ' hour ').concat(o, ' days')
    },
    goCurrentPromo: function () {
      return this.promotionToMc(this.promotion.promotionType, this.setMcPage),
      this.close()
    },
    setMcPage: function (t) {
      this.$store.commit('setMcShow', !0),
      this.$store.commit('setMcPage', t)
    },
    close: function () {
      this.$modal.hide('promo-details')
    },
  },
}
const P = o(81656)
const promoDetailsModal = (0, P.A)(promoDetailsModalProps, promoDetailsModalRender, [], !1, null, null, null)
const C = promoDetailsModal
