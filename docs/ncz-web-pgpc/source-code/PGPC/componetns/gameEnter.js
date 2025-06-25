, gameEnterRender = (Hr.exports,
function() {
  var t = this
    , e = t._self._c;
  return e("div", {
      staticClass: "br_dfgameenter_main"
  }, [e("ul", {
      staticClass: "br_dfgameenter_list"
  }, t._l(t.gameEnter, (function(n, i) {
      return e("li", {
          key: i,
          class: "br_game_" + n.type,
          on: {
              click: function(e) {
                  return t.goPage(n.type)
              }
          }
      }, [e("img", {
          attrs: {
              src: n.url
          }
      }), t._t("cover_desc", null, {
          row: n
      })], 2)
  }
  )), 0)])
}
)
, Yr = []
, gameEnterProps = {
  name: "gameEnter",
  data: function() { return {} },
  props: ["gameEnter"],
  computed: {},
  methods: {
      goPage: function(t) {
          var e = this.$store.state.Game.vendor;
          if (("LOTT" === t || "ELOTT" === t) && e.data && e.data.lanes && e.data.lanes.length > 0) {
              for (var n = 0; n < e.data.lanes.length; n++)
                  if ("LOTT" === e.data.lanes[n].title || "ELOTT" === e.data.lanes[n].title)
                      return void this.$router.push(t.toLowerCase());
              this.cover.init({
                  html: this.$t("in_stay_tuned"),
                  icon: "info",
                  btn: {
                      confirm: this.$t("in_increase_submit")
                  }
              })
          } else
              this.$router.push(t.toLowerCase())
      }
  }
}
, gameEnterProps = gameEnterProps
, Qr = (0, Ct.A)(gameEnterProps, gameEnterRender, Yr, !1, null, "17f5fa3e", null)
