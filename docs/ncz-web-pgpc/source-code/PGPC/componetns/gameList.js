
, Ur = (Fr.exports,
function() {
  var t = this
    , e = t._self._c;
  return e("div", {
      class: "br_game_main br_game_".concat(t.gameList.type)
  }, [t._t("game_title", null, {
      row: t.gameList
  }), t._l(t.gameList.list, (function(n) {
      return e("div", {
          key: n.accountTypeId,
          class: "br_game_mlist br_gaml_".concat(t.gameList.type, " ").concat(n.accountTypeName)
      }, [e("div", {
          class: "br_game_mlbody"
      }, [t._t("game_item_body", null, {
          row: n
      }), t.games.title ? e("p", {
          staticClass: "br_game_mltitle"
      }, [t._v(t._s(t.$t("in_".concat(n.accountTypeName, "_title"))))]) : t._e(), t.games.content ? e("p", {
          staticClass: "br_game_mlcontent"
      }, [t._v(t._s(t.$t("in_live_device")))]) : t._e()], 2), t.games.img ? e("div", {
          staticClass: "br_game_mlbimg"
      }, [t.games.useIcloudImg ? e("img", {
          ref: n.title,
          refInFor: !0,
          attrs: {
              src: "".concat(t.imgUrl, "/TCG_PROD_IMAGES/B2C/").concat(t.merchantCode.toUpperCase(), "/WEB/").concat(n.id, ".png"),
              alt: n.accountTypeName
          },
          on: {
              error: function(e) {
                  return t.errorImg(n)
              }
          }
      }) : t._e(), t.games.useIcloudImg ? t._e() : e("img", {
          attrs: {
              src: n.lagerIcon,
              alt: n.accountTypeName
          }
      })]) : t._e(), t.games.btn || n.freeplay ? e("div", {
          staticClass: "br_game_mlbtn",
          class: t.games.btn && n.freeplay ? "twobtn" : ""
      }, [e("span", {
          staticClass: "br_game_mlbutton start",
          on: {
              click: function(e) {
                  return t.gameStar(t.gameList.type, n)
              }
          }
      }, [t._v(t._s(t.$t(t.games.btn)))]), 1 === n.freeplay ? e("span", {
          staticClass: "br_game_mlbutton free",
          on: {
              click: function(e) {
                  return t.gameStar(t.gameList.type, n, 1)
              }
          }
      }, [t._v(t._s(t.$t(t.games.free)))]) : t._e()]) : t._e(), t._t("game_bottom_desc", null, {
          row: n
      })], 2)
  }
  ))], 2)
}
)
, jr = []
, Wr = {
  name: "gameList",
  mixins: [sn, on],
  props: ["games"],
  data: function() { return { loadImgSuc: !0
      }
  },
  computed: {
      imgUrl: function() {
          return this.$store.state.Common.imgUrl
      },
      merchantCode: function() {
          return window.localStorage.getItem("merchantCode")
      },
      gameList: function() {
          var t = {}
            , e = this.$store.state.Game.vendor || {}
            , n = e.data || []
            , i = n.lanes || []
            , a = this.games || {}
            , r = a.type
            , s = {}
            , o = [];
          i.map((function(t) {
              "SPORTS" === t.title && (o = t.cards)
          }
          )),
          "ESPORTS" === r && (s.id = "10",
          s.title = "ESPORTS",
          s.cards = o.filter((function(t) {
              return "IMES" === t.accountTypeName || "AV" === t.accountTypeName
          }
          )),
          s.cards.length && i.push(s));
          for (var c = 0; c < i.length; c++)
              if (i[c].title === r) {
                  var l = i[c].cards;
                  void 0 !== a.listLength && a.listLength <= l.length && (l = l.slice(0, a.listLength));
                  for (var u = 0; u < l.length; u++)
                      t[l[u].accountTypeName] = l[u]
              }
          return {
              type: r,
              list: t
          } || {}
      }
  },
  methods: {
      notLogin: function(t) {
          this.cover.init({
              html: t,
              icon: "warning",
              btn: {
                  confirm: this.$t("in_increase_submit")
              }
          })
      },
      errorImg: function(t) {
          this.$refs[t.title] && this.$refs[t.title][0] && this.$refs[t.title][0].src && (this.$refs[t.title][0].src = n(86966)("./" + t.id + ".png"))
      },


      gameStar: function(t, e, n) {
          var i = ["LIVE", "SPORTS", "FISH", "PVP", "ESPORTS"];
          i.indexOf(t) >= 0 ? "VASSALAGE" === e.isGame ? this.getPopupGameList(e) : "game" === e.isGame && this.startGame(e, n) : this.$router.push(this.games.link + "?page=" + e.accountTypeName)
      }
  },
  beforeMount: function() {
      this.$store.dispatch("gameVendor", {
          data: {
              merchantCode: window.localStorage.getItem("merchantCode")
          }
      })
  }
}
, zr = Wr
, Hr = (0, Ct.A)(zr, Ur, jr, !1, null, "bab3a11c", null)