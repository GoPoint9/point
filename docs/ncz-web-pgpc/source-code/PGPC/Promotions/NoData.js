// 10575: function (t, A, o) {
function NoData (t, A, o) {
  'use strict'
  o.d(A, { A: function () { return c } })
  const NoDataRender = function () {
    const t = this
    const A = t._self._c
    return A('div', {
      staticClass: 'no-data',
    }, [A('img', {
      attrs: {
        src: o.p + 'img/no-record.b92c003c.png',
        alt: '',
      },
    }), A('p', [t._v(t._s(t.$t('in_no_data')))])])
  }
  const s = o(81656)
  const i = (0, s.A)({}, NoDataRender, [], !1, null, null, null)
  var c = i.exports
}
