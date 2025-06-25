// mixins: [u.vE.promotionToMc],

/**
  vE: function() {
    return cg
  }

// mixins: [u.vE.promotionToMc] promotionToMc
const Wn = {
  data: function () {
    return {
      showPromoMcBtn: !1,
      noLogin: !1,
    }
  },
  computed: {
    showVipBenefit: function () {
      return this.$store.state.Public.showVipBenefit
    },
  },
  methods: {
    promotionToMc: function (t, e) {
      const n = sessionStorage.getItem('token')
      if (n || !this.noLogin) { return Un[t] ? e(Un[t]) : void 0 }
      e()
    },
    showPromoBtn: function (t) {
      const e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
      const n = sessionStorage.getItem('token')
      if (this.noLogin = e,
      n) {
        const i = sessionStorage.getItem('isAgent')
        Un[t] && jn.includes(i) ? this.showPromoMcBtn = !0 : this.showPromoMcBtn = !1,
        t === 'REFERRAL' && i !== '0' && (this.showPromoMcBtn = !1),
        t === 'UPGRADE_BONUS' && (this.showPromoMcBtn = this.showVipBenefit)
      } else { this.showPromoMcBtn = e || !1 }
      return this.showPromoMcBtn
    },
  },
}
*/

// {
//     "startGame": {
//         "computed": {},
//         "methods": {}
//     },
//     "promotionToMc": {
//         "computed": {},
//         "methods": {}
//     },
//     "getPopupGameList": {
//         "methods": {},
//         "computed": {}
//     },
//     "openLinkage": {
//         "methods": {}
//     },
//     "basicMC": {
//         "computed": {},
//         "methods": {},
//         "watch": {}
//     },
//     "basicAC": {
//         "computed": {},
//         "methods": {},
//         "watch": {}
//     },
//     "regexValidator": {
//         "methods": {}
//     },
//     "firebaseMixins": {
//         "mixins": [
//             {
//                 "computed": {},
//                 "methods": {}
//             }
//         ],
//         "computed": {},
//         "methods": {},
//         "watch": {
//             "$store.state.Public.smsProvider": {
//                 "immediate": true
//             }
//         }
//     },
//     "loginMixins": {
//         "methods": {}
//     },
//     "geetestMixins": {
//         "computed": {},
//         "methods": {}
//     },
//     "getService": {
//         "methods": {}
//     }
// }
