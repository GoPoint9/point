
// 
// 
// NOTE: page-center home-container
, tt = n(40173)


, it = n(4797)
, NoticeMarqueeRender = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "notice-marquee-container"
  }, [t("div", {
      staticClass: "notice-marquee-content"
  }, [t("div", {
      staticClass: "notice-main"
  }, [e._m(0), t("div", {
      staticClass: "marquee_box"
  }, [t("marquee", {
      attrs: {
          onMouseOut: "this.start()",
          onMouseOver: "this.stop()"
      }
  }, [t("ul", {
      staticClass: "notice_list"
  }, e._l(e.notice, (function(n, a) {
      return t("li", {
          key: n.id,
          on: {
              click: function(t) {
                  return e.noticeModal(a)
              }
          }
      }, [e._v(e._s(n.title))])
  }
  )), 0)])], 1)])])])
}
, st = [function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "notice-icon"
  }, [t("span", {
      staticClass: "speaker"
  })])
}
]
, NoticeMarqueeProps = {
  name: "notice",
  setup: function() {
      var e = (0,
      h.Pj)()
        , t = e.store
        , n = e.commit
        , a = (0,
      h.hS)()
        , i = (0,
      o.EW)((function() {
          return t.Public.notice
      }
      ))
        , s = (0,
      o.EW)((function() {
          return t.Public.unreadMessage
      }
      ))
        , r = function(e) {
          n("setNoticeIndex", e),
          a.show("noticeModal")
      };
      return {
          notice: i,
          unreadMessage: s,
          noticeModal: r
      }
  },
  methods: {}
}
, NoticeMarquee = (0, _.A)(NoticeMarqueeProps, NoticeMarqueeRender, st, !1, null, "5eec4b53", null)


// 
// 
// NOTE: 
, HomeGameRender = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "home-game"
  }, [t("GameMenu", {
      attrs: {
          menus: e.menuList(),
          options: e.options
      }
  }), t("HomeItem", {
      directives: [{
          name: "show",
          rawName: "v-show",
          value: e.showHomeItem("HOT"),
          expression: "showHomeItem('HOT')"
      }],
      attrs: {
          type: "HOT"
      }
  }), t("VendorGameCenter", {
      directives: [{
          name: "show",
          rawName: "v-show",
          value: e.showHomeItem("ELOTT"),
          expression: "showHomeItem('ELOTT')"
      }],
      attrs: {
          type: "ELOTT",
          options: e.options
      }
  }), t("HomeItem", {
      directives: [{
          name: "show",
          rawName: "v-show",
          value: e.showHomeItem("SPB"),
          expression: "showHomeItem('SPB')"
      }],
      attrs: {
          type: "SPB"
      }
  }), e._l(e.filterGameVendor, (function(n) {
      return t("HomeItem", {
          directives: [{
              name: "show",
              rawName: "v-show",
              value: e.showHomeItem(n),
              expression: "showHomeItem(game)"
          }],
          key: n,
          attrs: {
              type: n
          }
      })
  }
  )), t("VendorGameCenter", {
      directives: [{
          name: "show",
          rawName: "v-show",
          value: e.showHomeItem("SPORTS"),
          expression: "showHomeItem('SPORTS')"
      }],
      attrs: {
          type: "SPORTS",
          options: e.options
      }
  }), t("VendorGameCenter", {
      directives: [{
          name: "show",
          rawName: "v-show",
          value: e.showHomeItem("ESPORTS"),
          expression: "showHomeItem('ESPORTS')"
      }],
      attrs: {
          type: "ESPORTS",
          options: e.options
      }
  }), t("VendorGameCenter", {
      directives: [{
          name: "show",
          rawName: "v-show",
          value: e.showHomeItem("COCKFIGHT"),
          expression: "showHomeItem('COCKFIGHT')"
      }],
      attrs: {
          type: "COCKFIGHT",
          options: e.options
      }
  })], 2)
}

, pt = n(9133)
, HomeItemRender = (n(26910), function() {
  var e, t, n = this, a = n._self._c;
  return a("div", {
      staticClass: "home-item"
  }, [a("div", {
      staticClass: "main-title"
  }, [a("div", {
      staticClass: "title-label",
      class: null === (e = n.options[n.type]) || void 0 === e ? void 0 : e.icon
  }, [a("span", [n._v(n._s(n.$t("".concat(null === (t = n.options[n.type]) || void 0 === t ? void 0 : t.title))))])])]), n.filterVendorList().length && "SPB" !== n.type ? a("div", {
      staticClass: "classify-list"
  }, [a("swiper", {
      ref: "vendorSwiper",
      attrs: {
          options: n.vendorSwiperOption
      }
  }, n._l(n.filterVendorList(), (function(e, t) {
      var i;
      return a("swiper-slide", {
          key: "classify-".concat(t)
      }, [a("div", {
          staticClass: "classify-item",
          class: {
              on: n.activeClassify === e.vassalage || n.params.vassalage === e.vassalage
          },
          on: {
              click: function(t) {
                  return n.setVendor(e.vassalage)
              }
          }
      }, [a("img", {
          staticClass: "classify-icon",
          attrs: {
              src: null === (i = n.getVendorIcon(e)) || void 0 === i ? void 0 : i.rngColor,
              alt: ""
          }
      }), a("div", {
          staticClass: "classify-name"
      }, [n._v(n._s(e.displayName))])])])
  }
  )), 1)], 1) : n._e(), n.gameList.length ? a("div", {
      staticClass: "games-wrapper"
  }, [a("swiper", {
      key: "".concat(n.type),
      ref: "gameSwiper",
      attrs: {
          options: n.gameSwiperOption
      }
  }, n._l(n.gameList, (function(e, t) {
      return a("swiper-slide", {
          key: "".concat(n.type, "-").concat(t)
      }, [a("GameListItem", {
          attrs: {
              game: e
          }
      })], 1)
  }
  )), 1)], 1) : a("div", {
      staticClass: "no-data"
  }, [n._v(n._s(n.$t("in_no_data")))]), n.showPagination() ? a("div", {
      staticClass: "pagination-container"
  }, [a("div", {
      class: "menu-prev menu-prev-".concat(n.type, " swiper-nav ").concat(1 === n.currentPage ? "disabled" : ""),
      attrs: {
          slot: "button-prev"
      },
      on: {
          click: n.menuPrev
      },
      slot: "button-prev"
  }, [a("svg-icon", {
      attrs: {
          iconClass: "arrow-left"
      }
  })], 1), "HOME" === n.currentGameType ? a("div", {
      staticClass: "more-btn",
      on: {
          click: function(e) {
              return n.setGameType(n.type)
          }
      }
  }, [n._v("More")]) : n._e(), a("div", {
      class: "menu-next menu-next-".concat(n.type, " swiper-nav ").concat(n.currentPage === n.totalPages ? "disabled" : ""),
      attrs: {
          slot: "button-next"
      },
      on: {
          click: n.menuNext
      },
      slot: "button-next"
  }, [a("svg-icon", {
      attrs: {
          iconClass: "arrow-right"
      }
  })], 1)]) : n._e()])
}
)



, GameListItem = n(64700)
, ht = {
  RECENT: {
      icon: "recent-icon",
      title: "in_recent_game",
      type: "RECENT"
  },
  HOT: {
      icon: "hot-icon",
      title: "popular_nav",
      type: "HOT"
  },
  HOME: {
      icon: "rng-icon",
      title: "local_lobby",
      type: "HOME"
  },
  FAV: {
      icon: "rng-icon",
      title: "local_fav",
      type: "FAV"
  },
  RNG: {
      icon: "rng-icon",
      title: "con_rng",
      type: "RNG"
  },
  LIVE: {
      icon: "live-icon",
      title: "con_live",
      type: "LIVE"
  },
  FISH: {
      icon: "fish-icon",
      title: "con_fish",
      type: "FISH"
  },
  SPORTS: {
      icon: "sports-icon",
      title: "con_sports",
      type: "SPORTS"
  },
  ESPORTS: {
      icon: "sports-icon",
      title: "compete_game",
      type: "ESPORTS"
  },
  PVP: {
      icon: "pvp-icon",
      title: "pvp_promo",
      type: "PVP"
  },
  COCKFIGHT: {
      icon: "pvp-icon",
      title: "in_cockfight_nav",
      type: "COCKFIGHT"
  },
  SPB: {
      icon: "blockchain-icon",
      title: "local_block",
      type: "SPB"
  }
}
, HomeItemProps = {
  components: {
      GameListItem: GameListItem
  },
  props: {
      params: {
          type: Object
      },
      type: {
          type: String
      }
  },
  setup: function(e) {
      var t = (0,
      o.KR)()
        , n = (0,
      o.Kh)({
          gameList: [],
          currentPage: 1,
          totalPages: 0,
          activeClassify: "",
          params: {
              clientType: 3,
              platform: "flash,html5-desktop",
              merchant: U.A.brand.merchant,
              gameType: "MXWIN" === e.type ? "RNG" : e.type,
              pageNo: 1,
              vassalage: "",
              pageSize: "",
              gameClassify: ""
          }
      })
        , a = (0,
      h.s9)()
        , i = (a.t,
      (0,
      h.Pj)())
        , s = i.store
        , r = i.dispatch
        , c = i.commit
        , l = (0,
      h.OW)()
        , u = l.gameVendor
        , d = l.hotGames
        , m = (l.mappingVendor,
      (0,
      h.ok)())
        , g = m.currentLanguage
        , f = (0,
      h.fC)()
        , v = f.getVendorIcon
        , w = (0,
      o.EW)((function() {
          return s.eGameStore.currentGameType
      }
      ))
        , C = (0,
      o.EW)((function() {
          var e;
          return null === (e = s.eGameStore.favGameList) || void 0 === e ? void 0 : e.content
      }
      ))
        , b = (0,
      o.EW)((function() {
          return "HOME" === w.value ? 12 : 24
      }
      ))
        , _ = (0,
      o.EW)((function() {
          return u.value["MXWIN" === e.type ? "RNG" : e.type] || []
      }
      ))
        , A = (0,
      o.EW)((function() {
          return {
              observer: !0,
              observeParents: !0,
              on: {
                  observerUpdate: function() {
                      "HOT" !== e.type && "FAV" !== e.type && M() && t.value.swiper.slideNext()
                  }
              },
              slidesPerColumnFill: "row",
              slidesPerView: 6,
              slidesPerColumn: "HOME" === w.value ? 2 : 4,
              slidesPerGroup: "HOME" === w.value ? 12 : 24,
              spaceBetween: 20
          }
      }
      ))
        , y = (0,
      o.EW)((function() {
          return {
              observer: !0,
              observeParents: !0,
              slidesPerView: "auto",
              spaceBetween: 20
          }
      }
      ))
        , menuPrev = function() {
          n.currentPage -= 1;
          var e = t.value.swiper;
          e.slidePrev()
      }
        , menuNext = function() {
          var e = t.value.swiper;
          n.currentPage += 1,
          e.slideNext(),
          n.currentPage > n.totalPages || n.currentPage > n.params.pageNo && (n.params.pageNo += 1,
          S(!1))
      }
        , M = function() {
          switch (e.type) {
          case "HOT":
          case "FAV":
              return n.gameList.length > b.value;
          default:
              return n.gameList.length > b.value || n.totalPages > 1
          }
      }
        , x = function(e) {
          c("setCurrentGameType", e)
      }
        , L = function(t) {
          n.currentPage = 1,
          n.params.vassalage = t,
          n.activeClassify = "",
          n.params.pageNo = 1,
          n.params.gameType = e.type,
          n.gameList = [],
          S(!0)
      }
        , S = function(t) {
          window.cover.loader(!0);
          var a = (0,
          p.A)((0,
          p.A)({}, n.params), {}, {
              gameType: "SPB" === e.type ? "RNG" : n.params.gameType,
              pageSize: b.value,
              gameClassify: n.activeClassify,
              language: g.value
          });
          r("getGameList", a).then((function(e) {
              window.cover.loader(!1);
              var a = e || {}
                , i = a.games
                , o = void 0 === i ? [] : i;
              n.totalPages = e.totalPages,
              n.gameList = t ? o : n.gameList.concat(o)
          }
          ))
      }
        , N = function() {
          var e = {
              query: {
                  clientType: 3,
                  platform: "flash",
                  language: g.value,
                  token: window.sessionStorage.getItem("token"),
                  pageNo: 1,
                  pageSize: 999,
                  gameType: "RNG"
              }
          };
          r("getFavGameList", e).then((function() {
              n.gameList = C.value
          }
          ))
      }
        , T = function(e) {
          var t = {
              query: {
                  merchantCode: U.A.brand.merchant,
                  isPlatform: 2,
                  vassalage: "",
                  platform: "flash,html5-desktop",
                  language: g.value
              },
              refresh: e
          };
          r("getHotGameList", t).then((function() {
              n.gameList = (0,
              pt.A)(d.value)
          }
          ))
      }
        , R = function() {
          return "SPB" === e.type ? [{
              vassalage: "SPB,SS"
          }] : _.value
      }
        , O = function() {
          var e;
          L(R() && (null === (e = R()[0]) || void 0 === e ? void 0 : e.vassalage))
      }
        , E = function() {
          switch (e.type) {
          case "HOT":
              T();
              break;
          case "FAV":
              N();
              break;
          default:
              O();
              break
          }
      };
      return (0,
      o.sV)((function() {
          E()
      }
      )),
      (0,
      o.wB)(u, E),
      (0,
      o.wB)(w, E),
      (0,
      p.A)((0,
      p.A)({}, (0,
      o.QW)(n)), {}, {
          options: ht,
          currentGameType: w,
          setGameType: x,
          setVendor: L,
          gameSwiperOption: A,
          vendorSwiperOption: y,
          showPagination: M,
          menuPrev: menuPrev,
          menuNext: menuNext,
          gameSwiper: t,
          filterVendorList: R,
          getVendorIcon: v
      })
  }
}
, HomeItem = (0, _.A)(HomeItemProps, HomeItemRender, [], !1, null, null, null)



// 
// 
// NOTE: 
, VendorGameCenterRender = function() {
  var e, t, n = this, a = n._self._c;
  return a("div", {
      staticClass: "vender-game-center-container"
  }, [a("div", {
      staticClass: "vendor-game-container"
  }, [a("div", {
      staticClass: "main-title"
  }, [a("div", {
      staticClass: "title-label",
      class: null === (e = n.options[n.type]) || void 0 === e ? void 0 : e.icon
  }, [a("span", [n._v(n._s(n.$t("".concat(null === (t = n.options[n.type]) || void 0 === t ? void 0 : t.title))))])])]), n.vendors.length ? a("div", {
      staticClass: "vendor-wrapper"
  }, [a("swiper", {
      key: n.type,
      attrs: {
          options: n.vendorSwiperOption
      }
  }, n._l(n.vendors, (function(e, t) {
      return a("swiper-slide", {
          key: "".concat(n.type, "-").concat(t)
      }, [a("GameVendorItem", {
          attrs: {
              game: e
          }
      })], 1)
  }
  )), 1), n.vendors.length > 12 ? a("div", {
      staticClass: "pagination-container"
  }, [a("div", {
      class: "menu-prev-".concat(n.type, " menu-prev swiper-nav"),
      attrs: {
          slot: "button-prev"
      },
      slot: "button-prev"
  }, [a("svg-icon", {
      attrs: {
          iconClass: "arrow-left"
      }
  })], 1), "HOME" === n.currentGameType ? a("div", {
      staticClass: "more-btn",
      on: {
          click: function(e) {
              return n.setGameType(n.type)
          }
      }
  }, [n._v(" " + n._s(n.$t("more_button")) + " ")]) : n._e(), a("div", {
      class: "menu-next-".concat(n.type, " menu-next swiper-nav"),
      attrs: {
          slot: "button-next"
      },
      slot: "button-next"
  }, [a("svg-icon", {
      attrs: {
          iconClass: "arrow-right"
      }
  })], 1)]) : n._e()], 1) : n._e()])])
}
, Pt = n(77836)
, kt = n(52276)
, Mt = n(42037)
, VendorGameCenterProps = {
  name: "gameCenter",
  mixins: [kt.z],
  components: {
      GameVendorItem: Mt.A
  },
  props: {
      options: {
          type: Object
      },
      type: {
          type: String
      }
  },
  setup: function(e) {
      var t = (0,
      h.OW)()
        , n = t.gameVendor
        , a = (0,
      h.Pj)()
        , i = a.store
        , s = a.commit
        , r = (0,
      h.fC)()
        , c = r.getVendorSmallIcon
        , l = (0,
      h.yP)()
        , u = l.showSideMenu
        , d = (0,
      o.EW)((function() {
          return i.eGameStore.currentGameType
      }
      ))
        , m = (0,
      o.EW)((function() {
          var t;
          return (null === n || void 0 === n || null === (t = n.value) || void 0 === t ? void 0 : t[e.type]) || []
      }
      ))
        , p = (0,
      o.EW)((function() {
          return {
              observer: !0,
              observeParents: !0,
              slidesPerColumnFill: "SPORTS" === e.type ? "column" : "row",
              slidesPerView: 3,
              slidesPerColumn: "SPORTS" === e.type ? 2 : 1,
              spaceBetween: 20,
              navigation: {
                  prevEl: ".menu-prev",
                  nextEl: ".menu-next"
              }
          }
      }
      ))
        , g = function(e) {
          s("setCurrentGameType", e)
      };
      return {
          vendors: m,
          gameTypeName: Pt.IJ,
          getVendorSmallIcon: c,
          showSideMenu: u,
          vendorSwiperOption: p,
          currentGameType: d,
          gameVendor: n,
          setGameType: g
      }
  }
}
, VendorGameCenter = (0, _.A)(VendorGameCenterProps, VendorGameCenterRender, [], !1, null, null, null)


// 
// 
// NOTE: 
, GameMenuRender = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "game-menu-container"
  }, [e.menus.length > 0 ? t("div", {
      staticClass: "game-menu-swiper"
  }, [t("swiper", {
      ref: "menuSwiper",
      attrs: {
          options: e.menuSwiperOption
      }
  }, e._l(e.menus, (function(n, a) {
      var i;
      return t("swiper-slide", {
          key: "game_menu_".concat(a)
      }, [t("div", {
          class: ["game-menu-item", {
              active: e.currentGameType === (null === n || void 0 === n ? void 0 : n.gameCategory)
          }],
          on: {
              click: function(t) {
                  return e.setGameType(null === n || void 0 === n ? void 0 : n.gameCategory)
              }
          }
      }, [t("div", {
          staticClass: "menu-icon",
          class: null === n || void 0 === n ? void 0 : n.gameCategory
      }), t("span", {
          staticClass: "menu-title"
      }, [e._v(e._s(null === (i = e.options[null === n || void 0 === n ? void 0 : n.gameCategory]) || void 0 === i ? void 0 : i.title))])])])
  }
  )), 1), t("div", {
      staticClass: "menu-prev hover swiper-nav",
      attrs: {
          slot: "button-prev"
      },
      slot: "button-prev"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "arrow-left"
      }
  })], 1), t("div", {
      staticClass: "menu-next hover swiper-nav",
      attrs: {
          slot: "button-next"
      },
      slot: "button-next"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "arrow-right"
      }
  })], 1)], 1) : e._e()])
}

, GameMenuProps = {
  name: "gameMenu",
  props: {
      menus: {
          type: Array,
          required: !0
      },
      options: {
          type: Object
      }
  },
  mixins: [kt.z],
  setup: function(e) {
      var t = (0,
      h.fC)()
        , n = t.getVendorIcon
        , a = (0,
      h.Pj)()
        , i = a.store
        , s = a.commit
        , r = (0,
      o.nI)()
        , c = r.proxy
        , l = (0,
      h.hS)()
        , u = (0,
      o.EW)((function() {
          return i.eGameStore.currentGameType
      }
      ))
        , d = {
          slidesPerView: "auto",
          spaceBetween: 20,
          freeMode: !0,
          observer: !0,
          observeParents: !0,
          navigation: {
              prevEl: ".menu-prev",
              nextEl: ".menu-next"
          }
      }
        , m = (0,
      o.EW)((function() {
          return i.Login.isLogin
      }
      ))
        , p = function(e) {
          if ("FAV" !== e || m.value || l.show("loginPopupModal"),
          "RUMMY" !== e)
              if ("LUDO" !== e)
                  s("setCurrentGameType", e);
              else {
                  var t = {
                      vassalage: "JL",
                      gameId: "JL0092",
                      nodeId: 174856
                  };
                  c.startGameV2(t)
              }
          else {
              var n = {
                  vassalage: "JL",
                  gameId: "JL0078",
                  nodeId: 173957
              };
              c.startGameV2(n)
          }
      };
      return {
          menuSwiperOption: d,
          getVendorIcon: n,
          currentGameType: u,
          setGameType: p
      }
  }
}
, GameMenu = (0, _.A)(GameMenuProps, GameMenuRender, [], !1, null, null, null)


// 
// 
// NOTE: 
, HomeGameProps = {
  mixins: [kt.z],
  components: {
      HomeItem: HomeItem,
      GameMenu: GameMenu,
      VendorGameCenter: VendorGameCenter
  },
  setup: function() {
      var e = (0,
      o.Kh)({
          games: [],
          recentGames: []
      })
        , t = (0, h.s9)()
        , n = t.t
        , a = (0, h.OW)()
        , i = a.gameVendor
        , s = a.hotGames
        , r = a.sortingVendor
        , c = (0, h.As)()
        , l = c.isLogin
        , u = (0, h.ok)()
        , d = u.currentLanguage
        , m = (0, h.Pj)()
        , g = m.store
        , f = (m.dispatch, m.commit, (0, o.EW)((function() {
          var e = (0,
          pt.A)(Object.keys(i.value).filter((function(e) {
              return !["SPORTS", "LOTT", "ELOTT", "ESPORTS", "COCKFIGHT", "SPB"].includes(e)
          }
          )));
          return e
      }
      )))
        , v = (0, o.EW)((function() {
          return g.eGameStore.currentGameType
      }
      ))
        , w = ((0, o.EW)((function() {
          var e, t, n, a = (null === (e = i.value) || void 0 === e || null === (e = e.RNG) || void 0 === e || null === (e = e.slice(0, 3)) || void 0 === e ? void 0 : e.reduce((function(e, t) {
              return [].concat((0,
              pt.A)(e), [t])
          }
          ), [])) || [], o = (null === (t = i.value) || void 0 === t || null === (t = t.LIVE) || void 0 === t || null === (t = t.slice(0, 1)) || void 0 === t ? void 0 : t.reduce((function(e, t) {
              return [].concat((0,
              pt.A)(e), [t])
          }
          ), [])) || [], s = (null === (n = i.value) || void 0 === n || null === (n = n.FISH) || void 0 === n || null === (n = n.slice(0, 1)) || void 0 === n ? void 0 : n.reduce((function(e, t) {
              return [].concat((0,
              pt.A)(e), [t])
          }
          ), [])) || [];
          return [].concat((0,
          pt.A)(a), (0,
          pt.A)(s), (0,
          pt.A)(o))
      }
      )),
      (0, o.EW)((function() {
          var t, a, o, r, c, l, u, d, m;
          return {
              RECENT: {
                  icon: "recent-icon",
                  title: n("in_recent_game"),
                  list: e.recentGames,
                  type: "RECENT"
              },
              HOT: {
                  icon: "hot-icon",
                  title: n("in_hot_games"),
                  list: s.value,
                  type: "HOT"
              },
              HOME: {
                  icon: "hot-icon",
                  title: n("popular_nav"),
                  type: "HOME"
              },
              FAV: {
                  icon: "rng-icon",
                  title: n("local_fav"),
                  list: null === (t = g.eGameStore.favGameList) || void 0 === t ? void 0 : t.content,
                  type: "FAV"
              },
              GAMES: b(e.games),
              RNG: {
                  icon: "rng-icon",
                  title: n("con_rng"),
                  list: A(null === (a = i.value) || void 0 === a ? void 0 : a.RNG, "rng") || [],
                  type: "RNG"
              },
              LIVE: {
                  icon: "live-icon",
                  title: n("con_live"),
                  list: A(null === (o = i.value) || void 0 === o ? void 0 : o.LIVE, "live") || [],
                  type: "LIVE"
              },
              FISH: {
                  icon: "fish-icon",
                  title: n("con_fish"),
                  list: A(null === (r = i.value) || void 0 === r ? void 0 : r.FISH) || [],
                  type: "FISH"
              },
              SPORTS: {
                  icon: "sports-icon",
                  title: n("con_sports"),
                  list: (null === (c = i.value) || void 0 === c ? void 0 : c.SPORTS) || [],
                  type: "SPORTS"
              },
              ESPORTS: {
                  icon: "sports-icon",
                  title: n("compete_game"),
                  list: A(null === (l = i.value) || void 0 === l ? void 0 : l.ESPORTS) || [],
                  type: "ESPORTS"
              },
              PVP: {
                  icon: "pvp-icon",
                  title: n("cards"),
                  list: A(null === (u = i.value) || void 0 === u ? void 0 : u.PVP) || [],
                  type: "PVP"
              },
              ELOTT: {
                  icon: "lottery-icon",
                  title: n("con_lott"),
                  list: (null === (d = i.value) || void 0 === d ? void 0 : d.ELOTT) || [],
                  type: "ELOTT"
              },
              COCKFIGHT: {
                  icon: "cockfight-icon",
                  title: n("in_cockfight_nav"),
                  list: A(null === (m = i.value) || void 0 === m ? void 0 : m.COCKFIGHT) || [],
                  type: "COCKFIGHT"
              },
              RUMMY: {
                  icon: "rummy-icon",
                  title: "Rummy",
                  type: "RUMMY"
              },
              LUDO: {
                  icon: "ludo-icon",
                  title: "Ludo",
                  type: "LUDO"
              },
              SPB: {
                  icon: "blockchain-icon",
                  title: "local_block",
                  type: "SPB"
              }
          }
      }
      )))
        , C = function() {
          var e = [{
              gameCategory: "HOME"
          }, {
              gameCategory: "RUMMY"
          }, {
              gameCategory: "LUDO"
          }].concat((0,
          pt.A)(r.value))
            , t = ["HOME", "SPORTS", "LIVE", "RUMMY", "RNG", "FISH", "LUDO", "PVP", "ELOTT", "ESPORTS", "COCKFIGHT"];
          e = e.filter((function(e) {
              return t.includes(e.gameCategory)
          }
          ));
          var n = e.sort((function(e, n) {
              return t.indexOf(e.gameCategory) - t.indexOf(n.gameCategory)
          }
          ));
          return n
      }
        , b = function(e) {
          var t = {
              LIVE: n("con_live"),
              FISH: n("con_fish"),
              RNG: n("con_rng")
          };
          return e.reduce((function(e, n) {
              var a = (0,
              E.A)(n, 2)
                , i = a[0]
                , o = a[1]
                , s = (0,
              E.A)(i, 2)
                , r = s[0]
                , c = s[1];
              return e.push({
                  title: "".concat(c, " ").concat(t[r]),
                  icon: "".concat(r.toLowerCase(), "-icon"),
                  list: o
              }),
              e
          }
          ), [])
      }
        , _ = function(e) {
          return "HOME" === v.value ? "FAV" !== e || l.value : v.value === e
      }
        , A = function(e, t) {
          return "HOME" === v.value && e && e.length > 5 ? e.slice(0, 5) : e
      };
      return (0,
      p.A)((0,
      p.A)({}, (0,
      o.QW)(e)), {}, {
          options: w,
          currentLanguage: d,
          menuList: C,
          gameVendor: i,
          filterGameVendor: f,
          showHomeItem: _,
          currentGameType: v
      })
  }
}
, HomeGame = (0, _.A)(HomeGameProps, HomeGameRender, [], !1, null, null, null)


// 
// 
// NOTE: 
, WinnerRender = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "winner-wrapper"
  }, [t("div", {
      staticClass: "winner-title"
  }, [t("img", {
      staticClass: "icon-winner-board",
      attrs: {
          src: n(84614),
          alt: ""
      }
  }), t("span", [e._v(e._s(e.$t("br_tuikje_lbeuhf")))])]), t("div", {
      staticClass: "winner-board"
  }, [t("div", {
      staticClass: "list-title"
  }, [t("span", {
      staticClass: "list-title-item"
  }, [e._v(e._s(e.$t("rank_promo")))]), t("span", {
      staticClass: "list-title-item"
  }, [e._v(e._s(e.$t("winner_game")))]), t("span", {
      staticClass: "list-title-item"
  }, [e._v(e._s(e.$t("winner_money")))])]), t("div", {
      staticClass: "list-warp-container"
  }, [e._l(e.winner.slice(0, 3), (function(a, i) {
      return t("div", {
          key: i,
          staticClass: "win-item",
          on: {
              click: function(t) {
                  return e.startGameV2(a)
              }
          }
      }, [t("div", {
          staticClass: "rank"
      }, [0 === i ? t("img", {
          attrs: {
              src: n(27892),
              alt: "rank1"
          }
      }) : e._e(), 1 === i ? t("img", {
          attrs: {
              src: n(18735),
              alt: "rank2"
          }
      }) : e._e(), 2 === i ? t("img", {
          attrs: {
              src: n(79718),
              alt: "rank3"
          }
      }) : e._e()]), t("div", {
          staticClass: "custom-name"
      }, [e._v(e._s(a.customerName))]), t("div", {
          staticClass: "win-amount"
      }, [t("span", {
          staticClass: "symbol"
      }, [e._v(e._s(e.currencySymbol))]), e._v(" " + e._s(a.winAmount) + " ")])])
  }
  )), t("vueSeamless", {
      staticClass: "list-warp",
      attrs: {
          data: e.winner,
          "class-option": e.classOption
      }
  }, e._l(e.winner.slice(3, e.winner.length), (function(n, a) {
      return t("div", {
          key: a,
          staticClass: "win-item",
          on: {
              click: function(t) {
                  return e.startGameV2(n)
              }
          }
      }, [t("div", {
          staticClass: "rank"
      }, [t("span", [e._v(e._s(a + 4))])]), t("div", {
          staticClass: "custom-name"
      }, [e._v(e._s(n.customerName))]), t("div", {
          staticClass: "win-amount"
      }, [t("span", {
          staticClass: "symbol"
      }, [e._v(e._s(e.currencySymbol))]), e._v(" " + e._s(n.winAmount) + " ")])])
  }
  )), 0)], 2)])])
}
, qt = n(7866)
, Ft = n.n(qt)
, jt = {
  components: {
      vueSeamless: Ft()
  },
  mixins: [kt.z],
  setup: function() {
      var e = (0,
      o.Kh)({
          classOption: {
              step: .5,
              limitMoveNum: 3
          }
      })
        , t = (0,
      h.Pj)()
        , n = t.store
        , a = (0,
      o.EW)((function() {
          return n.home.winnerBoard
      }
      ))
        , i = (0,
      o.EW)((function() {
          return n.Public.currencySymbol
      }
      ));
      return (0,
      p.A)((0,
      p.A)({}, (0,
      o.QW)(e)), {}, {
          winner: a,
          currencySymbol: i
      })
  }
}
, WinnerProps = WinnerProps
, Winner = (0, _.A)(WinnerProps, WinnerRender, [], !1, null, null, null)


// 
// 
// NOTE: home (PageBanner NoticeMarquee HomeGame Winner)
, home_props = {
  name: "home",
  components: {
      PageBanner: it.A,
      NoticeMarquee: ut,
      HomeGame: Dt,
      Winner: Winner
  },
  computed: {
      banners: function() {
          return this.$store.state.Public.banners.filter((function(e) {
              return "w_home" === e.groupName
          }
          ))
      },
      currentGameType: function() {
          return this.$store.state.eGameStore.currentGameType
      }
  },
  setup: function() {
      var e = (0,
      h.rd)()
        , t = (0,
      h.lq)()
        , n = (0,
      h.hS)()
        , a = (0,
      h.yP)()
        , i = a.showSideMenu;
      return (0,
      o.sV)((function() {
          "/login" === t.path ? (e.push("/"),
          n.show("loginPopupModal")) : "/register" === t.path && n.show("registerModal")
      }
      )),
      {
          showSideMenu: i
      }
  }
}


, home_render = (n(47764), n(62953), function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "page-center home-container",
      class: {
          off: e.showSideMenu
      }
  }, [t("div", {
      staticClass: "home-banner"
  }, [t("PageBanner", {
      attrs: {
          banners: e.banners
      }
  }), t("NoticeMarquee")], 1), t("HomeGame"), e._e()], 1)
}
)
, home_props = home_props
, Kt = (0, _.A)(home_props, home_render, [], !1, null, null, null)
, home_view = Kt.exports









n.d(t, {
A: function() {
    return p
}
});
var GameListItemRender = function() {
    var e = this
        , t = e._self._c;
    return t("div", {
        staticClass: "game-list-item"
    }, [t("div", {
        staticClass: "game-img"
    }, [t("img", {
        directives: [{
            name: "lazy",
            rawName: "v-lazy",
            value: e.itemImg,
            expression: "itemImg"
        }],
        attrs: {
            alt: ""
        }
    }), t("span", {
        staticClass: "game-vassalage"
    }, [e._v(e._s(e.game.displayName))])]), t("div", {
        staticClass: "action-wrap"
    }, [t("div", {
        staticClass: "action-btn start-btn",
        on: {
            click: function(t) {
                return e.startGameV2(e.game)
            }
        }
    }, [e._v(e._s(e.$t("in_immediate_game")))]), t("div", {
        staticClass: "action-btn free-btn",
        on: {
            click: function(t) {
                return e.startGameV2(e.game, !0)
            }
        }
    }, [e._v(e._s(e.$t("in_free_trial")))])]), t("div", {
        staticClass: "game-info"
    }, [t("div", {
        staticClass: "game-name"
    }, [e._v(" " + e._s(e.itemName) + " ")]), t("div", {
        class: ["fav-btn"],
        on: {
            click: e.toggleFav
        }
    }, [e.isFav ? t("svg-icon", {
        attrs: {
            iconClass: "game-fav-active"
        }
    }) : t("svg-icon", {
        attrs: {
            iconClass: "game-fav-default"
        }
    })], 1)])])
}


, o = (n(74423), n(21699), n(2543))
, s = n(85471)
, r = n(68770)
, c = n(52276)
, GameListItemProps = {
    mixins: [c.z],
    props: {
        game: {
            type: Object,
            required: !0
        }
    },
    setup: function(e) {
        var t = (0,
        r.Pj)()
            , n = t.store
            , a = t.dispatch
            , i = e.game
            , c = i.showIcon
            , l = i.iconUrl
            , u = i.gameName
            , d = i.nodeName
            , m = i.nodeId
            , p = null !== c && void 0 !== c ? c : l
            , g = null !== u && void 0 !== u ? u : d
            , f = (0,
        s.EW)((function() {
            return n.eGameStore.favGameIds.includes("".concat(m))
        }
        ))
            , v = (0,
        o.throttle)((function() {
            var t = e.game
                , n = t.nodeId
                , i = t.vassalage
                , o = t.gameType
                , s = f.value ? "removeFavGame" : "addFavGame"
                , r = {
                nodeId: n,
                vendor: i,
                gameType: o
            };
            a(s, r)
        }
        ), 1e3, {
            trailing: !1
        });
        return {
            itemImg: p,
            itemName: g,
            isFav: f,
            toggleFav: v
        }
    }
}
, d = n(81656)
, GameListItem = (0, d.A)(GameListItemProps, GameListItemRender, [], !1, null, null, null)