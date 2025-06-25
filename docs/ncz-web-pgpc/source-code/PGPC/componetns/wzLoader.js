
, ks = function() {
          var t = this , e = t._self._c;
          return e("div", { staticClass: "br_loader_main" }, [t._v("加载中...")])  
      }
, Is = {
  name: "wzLoader",
  data: function() { return {} },
  props: ["parameter"],
  methods: {},
  components: {},
  computed: {},
  beforeMount: function() {
      var t = this
        , e = window.localStorage.getItem("templates");
      e ? (window.localStorage.setItem("merchantCode", JSON.parse(e).merchantCode),
      this.$emit("loadBack")) : this.$store.dispatch("getTemplates", {
          data: this.parameter
      }).then((function(e) {
          window.localStorage.setItem("templates", JSON.stringify(e.value)),
          window.localStorage.setItem("merchantCode", e.value.merchantCode),
          t.$emit("loadBack")
      }
      ))
  }
}
, Ps = Is
, Ts = (0, Ct.A)(Ps, ks, [], !1, null, "17192050", null)
, wzLoader = (0, Ct.A)(Ps, ks, [], !1, null, "17192050", null)