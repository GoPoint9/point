

// 
// 
// NOTE: 
, Ia = function() {
  var e = this
    , t = e._self._c;
  return t("svg", {
      class: e.svgClass,
      attrs: {
          "aria-hidden": "true"
      }
  }, [t("use", {
      attrs: {
          "xlink:href": e.iconName
      }
  })])
}
, Ba = []
, Va = {
  name: "SvgIcon",
  props: {
      iconClass: {
          type: String,
          required: !0
      },
      className: {
          type: String,
          default: ""
      }
  },
  computed: {
      iconName: function() {
          return "#icon-".concat(this.iconClass)
      },
      svgClass: function() {
          return this.className ? "svg-icon " + this.className : "svg-icon"
      }
  }
}
, Ga = Va
, Ha = (0, _.A)(Ga, Ia, Ba, !1, null, "08edb591", null)
, Da = Ha.exports
