(self.webpackChunkwic11f3_web = self.webpackChunkwic11f3_web || []).push([[73], {
  99029: function (t, A, o) {
    'use strict'
    o.r(A),
    o.d(A, { default: function () { return R } })
    o(28706),
    o(62010)

    // const n = []
    const r = o(9133)
    const a = o(57888)
    const s = (o(2008), o(50113), o(74423), o(62062), o(26099), o(21699), o(98992), o(54520), o(72577), o(81454), o(8872), o(74353))
    const i = o.n(s)
    const c = o(85471)
    const f = o(68770)
    const l = o(3310)

    // const PromoModal = promoDetailsModal

    const M = o(10575)

    const b = [
      { name: 'all_promo', type: 'all', iconClass: 'all' },
      { name: 'rng_promo', type: 'rng_promo', iconClass: 'rng' },
      { name: 'live_promo', type: 'live_promo', iconClass: 'live' },
      { name: 'pvp_promo', type: 'pvp_promo', iconClass: 'pvp' },
      { name: 'sport_promo', type: 'sport_promo', iconClass: 'sport' },
      { name: 'fish_promo', type: 'fish_promo', iconClass: 'fish' },
      { name: 'lotto_promo', type: 'lotto_promo', iconClass: 'lotto' },
      { name: 'rebate_promo', type: 'rebate_promo', iconClass: 'rebate' },
      { name: 'deposit_promo', type: 'deposit_promo', iconClass: 'deposit' },
      { name: 'rank_promo', type: 'player_rank_rules', iconClass: 'rank' },
      { name: 'point_promo', type: 'point_mall', iconClass: 'point' },
      { name: 'download_promo', type: 'app_download', iconClass: 'download' },
      { name: 'new_player_promo', type: 'new_player', iconClass: 'new-player' },
      { name: 'other_promo', type: 'other_promo', iconClass: 'other' },
    ]
    const PromotionRender = function () {
      const t = this
      const A = t._self._c
      return A('div', {
        staticClass: 'promo-container',
      }, [A('div', {
        staticClass: 'promo-bg page-center',
        class: {
          off: t.showSideMenu,
          dark: t.showDetail,
          promoDetail: t.showDetail,
        },
      }, [t.showDetail
        ? A('PromoDetail', {
          key: t.activePromo.id,
          attrs: {
            promotion: t.activePromo,
            close: t.hideDetail,
          },
        })
        : A('div', {
          staticClass: 'promo-content',
        }, [A('swiper', {
          staticClass: 'promo-menu-list',
          attrs: {
            options: t.swiperOption,
          },
        }, [A('swiper-slide', [A('div', {
          staticClass: 'div',
          class: ['promo-menu-item', {
            active: t.currentType === 'all',
          }, 'all'],
          on: {
            click: function (A) {
              return t.switchType('all')
            },
          },
        }, [A('span', {
          staticClass: 'promo-name',
        }, [t._v(t._s(t.$t('all_promo')))])])]), t._l(t.promoMenu, function (e) {
          return A('swiper-slide', {
            key: e.type,
          }, [A('div', {
            class: ['promo-menu-item', {
              active: e.type === t.currentType,
            }, e.iconClass],
            on: {
              click: function (A) {
                return t.switchType(e.type)
              },
            },
          }, [A('img', {
            staticClass: 'icon',
            attrs: {
              src: o(7807)('./'.concat(e.iconClass, '.png')),
              alt: '',
            },
          }), A('span', {
            staticClass: 'promo-name',
          }, [t._v(t._s(t.$t(e.name)))])])])
        }
        )], 2), t.promoMenu.length > 8
          ? [A('div', {
              staticClass: 'promo-prev prev swiper-arrow',
              attrs: {
                slot: 'button-prev',
              },
              slot: 'button-prev',
            }), A('div', {
              staticClass: 'promo-next next swiper-arrow',
              attrs: {
                slot: 'button-next',
              },
              slot: 'button-next',
            })]
          : t._e(), A('div', {
          staticClass: 'active-promo-box',
        }, [t.list.length
          ? A('div', {
            staticClass: 'active-promo-list',
          }, t._l(t.list, function (o, e) {
            return A('div', {
              key: ''.concat(t.currentType, '_').concat(e),
              staticClass: 'active-promo-item',
              on: {
                click: function (A) {
                  return t.checkDetail(o)
                },
              },
            }, [A('div', {
              staticClass: 'active-item-img',
            }, [A('img', {
              attrs: {
                src: t.getImage(o),
                alt: '',
              },
            })]), A('div', {
              staticClass: 'active-item-info',
            }, [A('div', {
              staticClass: 'item-title',
            }, [t._v(t._s(o.title))]), A('div', {
              staticClass: 'more-btn',
            }, [t._v(t._s(t.$t('more_button')))])])])
          }
          ), 0)
          : A('NoData')], 1)], 2)], 1), A('TcgModal', {
        attrs: {
          name: 'promo-details',
        },
      }, [A('PromoModal', {
        attrs: {
          promotion: t.activePromo,
        },
      })], 1)], 1)
    }
    const PromotionProps = {
      name: 'promotion',
      components: {
        PromoModal: PromoModal,
        TcgModal: l.A,
        PromoDetail: PromoDetail,
        NoData: M.A,
      },
      setup: function () {
        let t
        const A = (0, f.Pj)()
        const o = A.store
        const e = (0, f.yP)()
        const n = e.showSideMenu
        const s = (0, f.rd)()
        const l = (0, f.hS)()
        const v = (0, c.KR)('all')
        const p = (0, c.KR)(!1)
        const u = (0, c.Kh)({})
        const m = (0, c.EW)(function () {
          return o.Public.banners.filter(function (t) {
            return t.groupName === 'w_promotion'
          }
          )
        })
        const d = (0, c.EW)(function () { return o.Public.promotion || [] })
        const P = (0, c.EW)(function () {
          let t
          return (t = d.value) === null || void 0 === t
            ? void 0
            : t.map(function (t) {
              return t.category
                ? t
                : (0,
                  a.A)((0,
                  a.A)({}, t), {}, {
                    category: 'other_promo',
                  })
            })
        })
        const g = (0, c.EW)(function () {
          let t
          const A = ((t = d.value) === null || void 0 === t ? void 0 : t.map(function (t) { const A = t.category; return A })) || []
          const o = b.reduce(function (t, o) {
            return A.includes(o.type) ? [].concat((0, r.A)(t), [o]) : t
          }, [])
          return o
        })
        const C = (0, c.EW)(function () {
          let t
          return v.value === 'all'
            ? P.value
            : (t = P.value) === null || void 0 === t
                ? void 0
                : t.reduce(function (t, A) { return A.category === v.value ? [].concat((0, r.A)(t), [A]) : t }, [])
        })
        const M = function (t) {
          v.value = t
        }
        const O = function (t) {
          const A = t.announcementImages
          return A
            ? (A.find(function (t) {
                const A = t.sequence
                return A === 1
              }
              ) || {}).url
            : null
        }
        const h = function (t) {
          const A = t.startDate
          const o = t.endDate
          const e = i()(A).format('YYYY-MM-DD HH:mm:ss')
          const n = i()(o).format('YYYY-MM-DD HH:mm:ss')
          return ''.concat(e, ' - ').concat(n)
        }
        const B = function (t) {
          Object.assign(u, t),
          l.show('promo-details')
        }
        const J = function () {
          p.value = !1
        }
        const K = {
          slidesPerView: 'auto',
          spaceBetween: 13,
          navigation: {
            prevEl: '.promo-prev',
            nextEl: '.promo-next',
          },
        }
        const U = (t = s.history.current) === null || void 0 === t ? void 0 : t.hash
        if (U) {
          const E = C.value.filter(function (t) {
            return t.id === parseInt(U.substring(1))
          }
          )
          Object.assign.apply(Object, [u].concat((0,
          r.A)(E))),
          p.value = !0
        }
        return {
          activePromo: u,
          banners: m,
          promoMenu: g,
          currentType: v,
          switchType: M,
          promotions: P,
          getImage: O,
          getPromoTime: h,
          showDetail: p,
          checkDetail: B,
          hideDetail: J,
          showSideMenu: n,
          swiperOption: K,
          list: C,
        }
      },
    }
    const Promotion = (0, P.A)(PromotionProps, PromotionRender, [], !1, null, null, null)
    var R = Promotion
  },

  7807: function (t, A, o) {
    const e = {
      './deposit.png': 90796,
      './download.png': 33088,
      './fish.png': 10898,
      './live.png': 83262,
      './lotto.png': 84592,
      './new-player.png': 70648,
      './other.png': 17716,
      './point.png': 82544,
      './pvp.png': 51408,
      './rank.png': 77318,
      './rebate.png': 95733,
      './rng.png': 22581,
      './sport.png': 69700,
    }
    function n (t) {
      const A = r(t)
      return o(A)
    }
    function r (t) {
      if (!o.o(e, t)) {
        const A = new Error('Cannot find module \'' + t + '\'')
        throw A.code = 'MODULE_NOT_FOUND',
        A
      }
      return e[t]
    }
    n.keys = function () {
      return Object.keys(e)
    },
    n.resolve = r,
    t.exports = n,
    n.id = 7807
  },

}])
