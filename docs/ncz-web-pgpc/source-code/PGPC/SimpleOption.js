
// 
// 
// NOTE: simpleOption
, ma = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      class: ["select-option", e.className],
      on: {
          click: e.selectOption
      }
  }, [e._t("default")], 2)
}
, pa = []
, ga = {
  name: "simpleOption",
  props: {
      option: {
          type: [String, Number, Object],
          required: !0
      },
      className: {
          type: String,
          default: ""
      }
  },
  methods: {
      selectOption: function() {
          this.$emit("option-selected", this.option)
      }
  }
}
, fa = ga
, va = (0, _.A)(fa, ma, pa, !1, null, null, null)
, SimpleOption = va.exports
