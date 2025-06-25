(function() {
    var e = {
        64700: function(e, t, n) {
            "use strict";
            n.d(t, {
                A: function() {
                    return p
                }
            });
            var a = function() {
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
              , i = []
              , o = (n(74423),
            n(21699),
            n(2543))
              , s = n(85471)
              , r = n(68770)
              , c = n(52276)
              , l = {
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
              , u = l
              , d = n(81656)
              , m = (0,
            d.A)(u, a, i, !1, null, null, null)
              , p = m.exports
        },
        42037: function(e, t, n) {
            "use strict";
            n.d(t, {
                A: function() {
                    return d
                }
            });
            var a = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "game-vendor-item",
                    class: e.gameType,
                    on: {
                        click: function(t) {
                            return e.gameClick(e.game)
                        }
                    }
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
                })]), "RNG" !== e.gameType ? t("div", {
                    staticClass: "action-wrap"
                }, [t("div", {
                    staticClass: "action-btn start-btn",
                    on: {
                        click: function(t) {
                            return e.startGameV2(e.game)
                        }
                    }
                }, [e._v(e._s(e.$t("in_immediate_game")))])]) : e._e()])
            }
              , i = []
              , o = n(85471)
              , s = n(52276)
              , r = {
                mixins: [s.z],
                props: {
                    game: {
                        type: Object,
                        required: !0
                    }
                },
                setup: function(e, t) {
                    var n = e.game
                      , a = n.lagerIcon
                      , i = n.displayName
                      , r = n.gameType
                      , c = a
                      , l = i
                      , u = (0,
                    o.nI)()
                      , d = u.proxy
                      , m = function(e) {
                        d.launchGameVendor(e)
                    };
                    return {
                        startGame: s.z,
                        itemImg: c,
                        itemName: l,
                        gameType: r,
                        gameClick: m
                    }
                }
            }
              , c = r
              , l = n(81656)
              , u = (0,
            l.A)(c, a, i, !1, null, null, null)
              , d = u.exports
        },
        4797: function(e, t, n) {
            "use strict";
            n.d(t, {
                A: function() {
                    return m
                }
            });
            var a = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "page-banner"
                }, [e.banners.length ? t("div", {
                    staticClass: "game-banner"
                }, [t("swiper", {
                    key: "".concat(e.$route.path),
                    ref: "mySwiper",
                    staticClass: "swiper-wrap",
                    attrs: {
                        options: e.swiperOption
                    }
                }, [e._l(e.banners, (function(e, n) {
                    return t("swiper-slide", {
                        key: "banner_".concat(n)
                    }, [t("img", {
                        staticClass: "banner-img",
                        style: e.linkageType ? "cursor: pointer;" : "",
                        attrs: {
                            src: e.url
                        }
                    })])
                }
                )), e.banners.length > 1 ? t("div", {
                    staticClass: "banner-pagination swiper-pagination",
                    attrs: {
                        slot: "pagination"
                    },
                    slot: "pagination"
                }) : e._e()], 2)], 1) : e._e()])
            }
              , i = []
              , o = n(57888)
              , s = n(75316)
              , r = n(52276)
              , c = {
                name: "banner",
                mixins: [s.vE.openLinkage, r.z],
                props: {
                    banners: {
                        type: Array,
                        required: !0
                    }
                },
                computed: {
                    swiperOption: function() {
                        var e = this;
                        return (0,
                        o.A)((0,
                        o.A)({}, this.banners.length > 1 ? {
                            loop: !0,
                            speed: 1e3,
                            autoplay: {
                                delay: 5e3,
                                disableOnInteraction: !1
                            },
                            pagination: {
                                el: ".banner-pagination",
                                clickable: !0
                            }
                        } : {}), {}, {
                            observer: !0,
                            observeParents: !0,
                            preloadImages: !1,
                            slidesPerView: 1,
                            spaceBetween: 20.3,
                            on: {
                                click: function() {
                                    var t = e.banners[e.mySwiper.realIndex];
                                    e.openLinkage(t)
                                }
                            }
                        })
                    },
                    mySwiper: function() {
                        return this.$refs.mySwiper.swiper
                    }
                }
            }
              , l = c
              , u = n(81656)
              , d = (0,
            u.A)(l, a, i, !1, null, null, null)
              , m = d.exports
        },
        3310: function(e, t, n) {
            "use strict";
            n.d(t, {
                A: function() {
                    return l
                }
            });
            n(62010);
            var a = function() {
                var e = this
                  , t = e._self._c;
                return t("modal", {
                    attrs: {
                        name: e.name,
                        transition: "nice-modal-fade",
                        width: 200,
                        height: 200,
                        adaptive: !0,
                        delay: 100,
                        draggable: !0,
                        clickToClose: !1
                    },
                    on: {
                        "before-open": e.beforeOpen,
                        "before-close": e.beforeClose
                    }
                }, [t("div", {
                    staticClass: "popup_modal_wrap"
                }, [e.showClose ? t("div", {
                    staticClass: "popup_modal_close",
                    class: e.name,
                    on: {
                        click: e.close
                    }
                }, [e._t("close", (function() {
                    return [t("svg-icon", {
                        attrs: {
                            iconClass: "popup-close"
                        }
                    })]
                }
                ))], 2) : e._e(), t("div", {
                    staticClass: "popup_modal_body"
                }, [e._t("default")], 2)])])
            }
              , i = []
              , o = {
                name: "tmodal",
                props: {
                    name: {
                        type: String,
                        required: !0
                    },
                    mtitle: {
                        type: String
                    },
                    showClose: {
                        type: Boolean,
                        default: function() {
                            return !0
                        }
                    },
                    scrollable: {
                        type: Boolean,
                        default: !0
                    }
                },
                methods: {
                    close: function() {
                        this.$modal.hide(this.name)
                    },
                    beforeOpen: function() {
                        this.scrollable && (this.scrollTop = document.scrollingElement.scrollTop,
                        document.body.style.position = "fixed",
                        document.body.style.top = -this.scrollTop + "px",
                        this.$emit("beforeOpen"))
                    },
                    beforeClose: function() {
                        this.scrollable && (document.body.style.position = "",
                        document.body.style.top = "",
                        document.scrollingElement.scrollTop = this.scrollTop,
                        this.$emit("beforeClose"))
                    }
                }
            }
              , s = o
              , r = n(81656)
              , c = (0,
            r.A)(s, a, i, !1, null, "6eaf9166", null)
              , l = c.exports
        },
        88296: function(e, t, n) {
            "use strict";
            var a = n(62615)
              , i = n(37374)
              , o = {
                getLabby: function(e) {
                    return a.A.get(i.A.lottLabby, {
                        data: e
                    })
                },
                getLottRecent: function(e) {
                    return a.A.get(i.A.lott.lottRecent, e)
                },
                getVnlottMenus: function(e) {
                    return a.A.get(i.A.lott.vnlottMenus, e)
                },
                getMissionSummary: function(e) {
                    return a.A.get(i.A.lott.MissionSummary, e)
                },
                getMissionLeaderboard: function(e) {
                    return a.A.get(i.A.lott.MissionLeaderboard, e)
                }
            };
            t.A = o
        },
        37374: function(e, t) {
            "use strict";
            t.A = {
                login: {
                    login: {
                        link: "/wps/session/login",
                        modID: "COMM3",
                        token: !1,
                        encrypt: !0
                    },
                    loginCode: {
                        link: "/wps/verification/sms/noLogin",
                        modID: "VERIFICATION3",
                        token: !1
                    },
                    menu: {
                        link: "/wps/system/whitelabel",
                        modID: "COMM3",
                        token: !1
                    },
                    game: {
                        link: "/lgw/games/game_menus",
                        modID: "COMM3",
                        token: !1
                    },
                    mbInfo: {
                        link: "/wps/member/info",
                        modID: "COMM3",
                        token: !0
                    },
                    register: {
                        link: "/wps/member/register",
                        modID: "REG3",
                        token: !1,
                        encrypt: !0
                    },
                    registerMobile: {
                        link: "/wps/member/register/mobile",
                        modID: "COMM3",
                        token: !1,
                        encrypt: !0
                    },
                    changePwd: {
                        link: "/wps/member/password",
                        modID: "PASS3",
                        token: !0,
                        encrypt: !0
                    },
                    affiliate: {
                        link: "/wps/agent/affiliate",
                        modID: "AFFMAN3",
                        token: !1
                    },
                    setRegister: {
                        link: "/wps/system/setting/register",
                        modID: "REG3",
                        token: !1
                    },
                    forgetPwd: {
                        link: "/wps/member/password/email",
                        modID: "COMM3",
                        token: !1
                    },
                    freePlay: {
                        link: "/wps/session/login/freeplay",
                        modID: "FREEPLAY3",
                        token: !1
                    },
                    captcha: {
                        link: "/wps/captcha",
                        modID: "CAPTCHA3",
                        token: !1
                    },
                    regValidata: {
                        link: "/wps/system/setting/register",
                        modID: "COMM3",
                        token: !1
                    },
                    icon: {
                        link: "/wps/member/info/icon",
                        modID: "PROFPIC3",
                        token: !0
                    },
                    permission: {
                        link: "/wps/system/status",
                        modID: "COMM3",
                        token: !1
                    },
                    setPasswordByPhone: {
                        link: "/wps/member/password/verification",
                        modID: "CHNGPASSVERIF3",
                        token: !1,
                        encrypt: !0
                    }
                },
                balance: {
                    link: "/wps/v2/wallets/balance",
                    modID: "COMM3",
                    token: !0
                },
                walletTransfer: {
                    link: "/wps/relay/GCS_walletTransfer",
                    modID: "FUNDTRANS3",
                    token: !0
                },
                logout: {
                    link: "/wps/session/logout",
                    modID: "COMM3",
                    token: !0
                },
                eGame: {
                    gameLaunchFB: {
                        link: "/wps/relay/GCS_gameLaunchFB",
                        token: !1
                    },
                    games: {
                        link: "/wps/relay/GCSGAME_gameList",
                        modID: "GAMELO3",
                        token: !0
                    },
                    gameHot: {
                        link: "/wps/relay/GCSGAME_hotGamesV2",
                        modID: "GAMELOHOT3",
                        token: !1
                    },
                    announcements: {
                        link: "/wps/relay/MCSFE_getListAnnouncements",
                        modID: "COMM3",
                        token: !1
                    },
                    vassGameType: {
                        link: "/wps/relay/GCSGAME_getVassGameType",
                        modID: "COMM3",
                        token: !0
                    },
                    gameVendor: {
                        link: "/wps/relay/GCSGAME_newGameVendor"
                    },
                    favGames: {
                        link: "/wps/relay/MCSFE_getFavoriteGames",
                        modID: "GAMELOFAV3",
                        token: !0
                    },
                    favGameList: {
                        link: "/wps/relay/MCSFE_getFavoriteGamesList",
                        modID: "GAMELOFAV3",
                        token: !0
                    },
                    addFavGame: {
                        link: "/wps/relay/MCSFE_addFavoriteGameV2",
                        modID: "GAMELOFAV3",
                        token: !0
                    },
                    removeFavGame: {
                        link: "/wps/relay/MCSFE_removeFavoriteGameV2",
                        modID: "GAMELOFAV3",
                        token: !0
                    },
                    recentGameList: {
                        link: "/wps/relay/GCS_recentGame",
                        modID: "GAMELOREC3",
                        token: !0
                    }
                },
                pvp: {
                    rooms: {
                        link: "/wps/relay/GLS2_roomList",
                        token: !0
                    },
                    launchGame: {
                        link: "/wps/game/launchGame",
                        modID: "GAMELO3",
                        token: !0
                    }
                },
                lott: {
                    vnlottMenus: {
                        link: "/lgw/vn/games/game_menu",
                        modID: "COMM3",
                        token: !1
                    },
                    lottRecent: {
                        link: "/lgw/vn/games/game_menu/recent",
                        modID: "COMM3",
                        token: !0
                    },
                    MissionSummary: {
                        link: "/wps/relay/MCSFE_getMissionSummaryDetails",
                        token: !0
                    },
                    MissionLeaderboard: {
                        link: "/wps/relay/MCSFE_getMissionLeaderboard",
                        token: !0
                    }
                },
                lottLabby: {
                    link: "/wps/game/launchGame",
                    modID: "GAMELO3",
                    token: !0
                },
                home: {
                    notice: {
                        link: "/wps/relay/MCSFE_getListAnnouncements",
                        modID: "COMM3",
                        token: !0
                    },
                    popular: {
                        link: "/lgw/vn/numeros/opened/game",
                        modID: "AGEANNOUNCE3",
                        token: !1
                    },
                    vnNumero: {
                        link: "/lgw/vn/numeros/opened/game",
                        modID: "AGEANNOUNCE3",
                        token: !1
                    },
                    consolidated: {
                        link: "/wps/member/info/funds/consolidated",
                        modID: "COMM3",
                        token: !0
                    },
                    processDividendReq: {
                        link: "/wps/relay/MCS2_processDividendReq",
                        modID: "SIGNCONDIV3",
                        token: !0
                    },
                    processDailySalary: {
                        link: "/wps/relay/MCS2_processDailySalContract",
                        modID: "DAILYSALCONT3",
                        token: !0
                    },
                    openedNumero: {
                        link: "/lotto/lgw/games/opened/numero",
                        modID: "COMM3",
                        token: !0
                    },
                    merchantWallet: {
                        link: "/wps/relay/GCS_merchantWallet",
                        modID: "COMM3",
                        token: !0
                    },
                    processContractHourSalary: {
                        link: "/wps/relay/MCS2_processContractHourSalary",
                        modID: "HOURSAL3",
                        token: !0
                    },
                    processRealTimeSalaryContract: {
                        link: "/wps/relay/MCSFE_processRealTimeSalaryContract",
                        modID: "RTSALARY3",
                        token: !0
                    },
                    winnerBoard: {
                        link: "/wps/relay/ODSFE2_getWinnerBoard",
                        modID: "COMM3",
                        token: !1
                    }
                },
                common: {
                    routers: {
                        link: "/wps/system/domainRoute",
                        modID: "COMM3",
                        token: !1
                    },
                    usernameRegSMS: {
                        link: "/wps/verification/sms/register",
                        modID: "REGMOBVERF3",
                        token: !1
                    },
                    mobileRegSMS: {
                        link: "/wps/verification/sms/register",
                        modID: "MOBILENUMREG3",
                        token: !1
                    },
                    feedback: {
                        link: "/wps/feedback",
                        modID: "FEEDBACK3",
                        token: !1
                    },
                    rafflePromotion: {
                        link: "/wps/relay/MCS2_claimRafflePromotion",
                        modID: "REWCEN3",
                        token: !0
                    },
                    getWinnerBoard: {
                        link: "/wps/relay/ODSFE2_getWinnerBoard",
                        modID: "COMM3"
                    }
                },
                unreadMessage: {
                    link: "/wps/relay/CSP_unreadCount",
                    modID: "INBOX3",
                    token: !0
                },
                integral: {
                    pointBalance: {
                        link: "/wps/relay/MCS2_getPointBalance",
                        modID: "PTSYS3",
                        token: !0
                    },
                    pointReward: {
                        link: "/wps/relay/MCS2_getPointReward",
                        modID: "PTSYS3",
                        token: !0
                    },
                    redeemPoint: {
                        link: "/wps/relay/passwordCheck/MCS2_redeemPointReward",
                        modID: "PTSYS3",
                        token: !0,
                        encrypt: !0
                    },
                    redeemPointList: {
                        link: "/wps/relay/MCS2_getRedeemPointList",
                        modID: "PTSYS3",
                        token: !0
                    },
                    pointConfig: {
                        link: "/wps/relay/MCS2_getPointConfig",
                        modID: "PTSYS3",
                        token: !0
                    },
                    memTransDet: {
                        link: "/wps/relay/ODSFE2_MemTransDet",
                        modID: "MEMTRANS3",
                        token: !0
                    },
                    convertPoint: {
                        link: "/wps/relay/passwordCheck/MCS2_convertPoint",
                        modID: "PTSYS3",
                        token: !0,
                        encrypt: !0
                    }
                },
                help: {
                    getHelp: {
                        link: "/wps/system/helpCenter",
                        modID: "COMM3",
                        token: !1
                    }
                },
                lotteryGameMenus: {
                    link: "/lgw/vn/games/game_menu",
                    modID: "COMM3",
                    token: !1
                },
                live: {
                    getModelList: {
                        link: "/wps/relay/CBS_modelList",
                        modID: "CBS3",
                        token: !1
                    },
                    launchChat: {
                        link: "/wps/relay/CBS_launchChat",
                        modID: "CBS3",
                        token: !1
                    }
                }
            }
        },
        76619: function(e, t) {
            "use strict";
            var n = {
                brand: {
                    platform: "WEB",
                    merchant: "wic11f3",
                    lotteryType: "Lott"
                },
                defaultLang: "EN",
                supportLanguages: ["EN", "HI"],
                esportGames: ["IMES", "TF", "IA"],
                SPBGames: ["SPB", "SS"],
                cockfightGames: ["SV3"],
                prizeModes: {
                    ModeLott: "LOTT",
                    ModeZy: "ZY",
                    ModeElott: "ELOTT",
                    ModeSea: "SEA"
                },
                agentType: [1, 2, 41, 42],
                trialType: [4]
            };
            window.sessionStorage.setItem("merchant", n.brand.merchant),
            window.sessionStorage.setItem("merchantCode", n.brand.merchant),
            window.localStorage.setItem("merchantCode", n.brand.merchant),
            t.A = n
        },
        77836: function(e, t, n) {
            "use strict";
            n.d(t, {
                IJ: function() {
                    return s
                },
                Rs: function() {
                    return c
                },
                rE: function() {
                    return r
                },
                yE: function() {
                    return o
                }
            });
            var a = n(9133)
              , i = (n(28706),
            n(74423),
            n(21699),
            n(76619))
              , o = {
                "/sports": "SPORTS",
                "/esports": "ESPORTS",
                "/live": "LIVE",
                "/lott": "LOTT",
                "/elott": "ELOTT",
                "/fish": "FISH",
                "/pvp": "PVP",
                "/rng": "RNG"
            }
              , s = {
                ELOTT: "con_lott",
                LOTT: "con_lott",
                LIVE: "hd_live_casino",
                SPORTS: "con_sports",
                FISH: "con_fish",
                RNG: "con_rng",
                PVP: "hd_pvp",
                ESPORTS: "compete_game",
                COCKFIGHT: "in_cockfight_nav"
            }
              , r = {
                HOME: "w_home",
                PROMO: "",
                RNG: "w_rng",
                LIVE: "w_live",
                FISH: "w_fish",
                PVP: "w_pvp",
                SPORTS: "w_sports",
                ESPORTS: "w_esports",
                ELOTT: "w_elott",
                LOTT: "w_lott"
            }
              , c = [{
                name: "in_scratch_music",
                type: "SC"
            }, {
                name: "in_video_poker",
                type: "VP"
            }, {
                name: "jackpot",
                type: "JP"
            }, {
                name: "in_table_games",
                type: "TG"
            }, {
                name: "in_arcade_games",
                type: "AC"
            }].concat((0,
            a.A)(i.A.supportLanguages.includes("TY") ? [{
                name: "in_bingo",
                type: "BG"
            }] : []))
        },
        62615: function(e, t, n) {
            "use strict";
            var a = n(75316)
              , i = n(76619);
            t.A = new a.xH(i.A.defaultLang)
        },
        68770: function(e, t, n) {
            "use strict";
            n.d(t, {
                As: function() {
                    return u
                },
                rz: function() {
                    return a.rz
                },
                ME: function() {
                    return a.ME
                },
                qf: function() {
                    return a.qf
                },
                so: function() {
                    return a.so
                },
                OW: function() {
                    return s
                },
                s9: function() {
                    return a.s9
                },
                ok: function() {
                    return f
                },
                hS: function() {
                    return a.hS
                },
                AL: function() {
                    return a.AL
                },
                lq: function() {
                    return a.lq
                },
                rd: function() {
                    return a.rd
                },
                yP: function() {
                    return h
                },
                Pj: function() {
                    return a.Pj
                },
                fC: function() {
                    return v
                }
            });
            var a = n(77337)
              , i = n(9133)
              , o = (n(28706),
            n(74423),
            n(44114),
            n(79432),
            n(26099),
            n(21699),
            n(85471));
            function s() {
                var e = (0,
                a.Pj)()
                  , t = e.store
                  , n = (0,
                a.rd)()
                  , s = (0,
                o.EW)((function() {
                    return t.eGameStore.gameVendor
                }
                ))
                  , r = (0,
                o.EW)((function() {
                    return t.eGameStore.sortingVendor
                }
                ))
                  , c = (0,
                o.EW)((function() {
                    return t.eGameStore.mappingVendor
                }
                ))
                  , l = (0,
                o.EW)((function() {
                    return t.eGameStore.hotGames
                }
                ))
                  , u = (0,
                o.EW)((function() {
                    return t.home.resources
                }
                ))
                  , d = (0,
                o.EW)((function() {
                    return t.Public.currencySymbol
                }
                ))
                  , m = (0,
                o.EW)((function() {
                    var e, t = {
                        HOME: {
                            name: "hd_home",
                            gameType: "HOME",
                            page: "/"
                        },
                        PROMO: {
                            name: "hd_event",
                            gameType: "PROMO",
                            page: "/promotions"
                        },
                        ELOTT: {
                            name: "con_lott",
                            gameType: "ELOTT",
                            page: "/elott"
                        },
                        LOTT: {
                            name: "con_lott",
                            gameType: "LOTT",
                            page: "/lott"
                        },
                        LIVE: {
                            name: "con_live",
                            gameType: "LIVE",
                            page: "/live"
                        },
                        SPORTS: {
                            name: "con_sports",
                            gameType: "SPORTS",
                            page: "/sports"
                        },
                        FISH: {
                            name: "con_fish",
                            gameType: "FISH",
                            page: "/fish"
                        },
                        RNG: {
                            name: "con_rng",
                            gameType: "RNG",
                            page: "/rng"
                        },
                        PVP: {
                            name: "con_pvp",
                            gameType: "PVP",
                            page: "/pvp"
                        },
                        ESPORTS: {
                            name: "compete_game",
                            gameType: "ESPORTS",
                            page: "/esports"
                        }
                    }, n = null === r || void 0 === r || null === (e = r.value) || void 0 === e ? void 0 : e.reduce((function(e, n) {
                        return n.vendors.length && Object.keys(t).includes(n.gameCategory) ? [].concat((0,
                        i.A)(e), [t[n.gameCategory]]) : e
                    }
                    ), []);
                    return [t.HOME].concat((0,
                    i.A)(n), [t.PROMO])
                }
                ))
                  , p = function(e) {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    }),
                    n.push(e).catch((function() {}
                    ))
                }
                  , g = function(e) {
                    var t;
                    return null === u || void 0 === u || null === (t = u.value) || void 0 === t ? void 0 : t[e]
                }
                  , f = function(e) {
                    var t, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "labelNameEn";
                    return (null === (t = g(e)) || void 0 === t ? void 0 : t[n]) || ""
                }
                  , v = function(e) {
                    var t;
                    return null === (t = g(e)) || void 0 === t ? void 0 : t.url
                }
                  , h = function(e) {
                    var t = v(e);
                    t && window.open(t)
                };
                return {
                    gameVendor: s,
                    sortingVendor: r,
                    mappingVendor: c,
                    hotGames: l,
                    navItems: m,
                    resources: u,
                    currencySymbol: d,
                    goPage: p,
                    hasResource: g,
                    getResourceName: f,
                    getResourceUrl: v,
                    openResource: h
                }
            }
            var r = n(69870)
              , c = n(17654)
              , l = (n(27495),
            n(25440),
            ["/seamless", "/lottert", "/vnlottery", "/sealottery"]);
            function u() {
                var e = (0,
                o.nI)()
                  , t = e.proxy
                  , n = (0,
                a.Pj)()
                  , i = n.store
                  , s = n.commit
                  , u = n.dispatch
                  , d = (0,
                a.s9)()
                  , m = d.t
                  , p = (0,
                a.rd)()
                  , g = (0,
                a.lq)()
                  , f = (0,
                o.EW)((function() {
                    return i.Login.isLogin
                }
                ))
                  , v = (0,
                o.EW)((function() {
                    return i.Login.isAgent
                }
                ))
                  , h = (0,
                o.EW)((function() {
                    return i.Login.isTrial
                }
                ))
                  , w = (0,
                o.EW)((function() {
                    return i.Public.firstTimeLogin
                }
                ))
                  , C = (0,
                o.EW)((function() {
                    return l.includes(g.path)
                }
                ))
                  , b = function() {
                    return f.value ? !h.value || (window.cover.init({
                        html: m("in_need_true_account"),
                        icon: "warning",
                        btn: {
                            confirm: m("in_increase_submit")
                        }
                    }),
                    !1) : (t.$modal.show("loginPopupModal"),
                    !1)
                }
                  , _ = function(e) {
                    b() && (s("setMcPage", e),
                    s("setMcShow", !0))
                }
                  , A = function(e) {
                    b() && (s("setAcPage", e),
                    s("setAcShow", !0))
                }
                  , y = function() {
                    window.cover.init({
                        title: m("in_popup_prompt"),
                        html: m("in_sure_logout"),
                        icon: "info",
                        btn: {
                            cancel: m("in_more_cancel"),
                            confirm: m("in_increase_submit")
                        }
                    }, function() {
                        var e = (0,
                        c.A)((0,
                        r.A)().mark((function e(t) {
                            return (0,
                            r.A)().wrap((function(e) {
                                while (1)
                                    switch (e.prev = e.next) {
                                    case 0:
                                        if ("confirm" === t) {
                                            e.next = 2;
                                            break
                                        }
                                        return e.abrupt("return");
                                    case 2:
                                        return window.cover.loader(!0),
                                        e.next = 5,
                                        u("logout");
                                    case 5:
                                        window.cover.loader(!1),
                                        p.replace("/").catch((function() {}
                                        ));
                                    case 7:
                                    case "end":
                                        return e.stop()
                                    }
                            }
                            ), e)
                        }
                        )));
                        return function(t) {
                            return e.apply(this, arguments)
                        }
                    }())
                };
                return {
                    isLogin: f,
                    isAgent: v,
                    isTrial: h,
                    firstTimeLogin: w,
                    isGamePage: C,
                    setMcPage: _,
                    setAcPage: A,
                    logout: y,
                    checkLogin: b
                }
            }
            n(57888),
            n(2008),
            n(62062),
            n(34782),
            n(23500),
            n(62953),
            n(2543),
            n(74353);
            var d = n(76619)
              , m = (n(88296),
            d.A.supportLanguages);
            [{
                name: "jackpot",
                type: "JP"
            }, {
                name: "in_table_games",
                type: "TG"
            }, {
                name: "in_arcade_games",
                type: "AC"
            }].concat((0,
            i.A)(m.includes("TY") ? [{
                name: "in_bingo",
                type: "BG"
            }] : []));
            var p = n(15261)
              , g = n(95167);
            function f() {
                var e = (0,
                a.Pj)()
                  , t = e.store
                  , n = e.dispatch
                  , i = e.commit
                  , s = (0,
                o.EW)((function() {
                    return t.home.language
                }
                ))
                  , r = function(e) {
                    g.A.locale = e,
                    localStorage.setItem("lang", e),
                    localStorage.setItem("hisLang", e),
                    window.brLang = g.A.messages[e],
                    n("getUpdateLanguage", {
                        language: e
                    }),
                    p.Dr.localize(e),
                    i("setLanguage", e)
                };
                return {
                    currentLanguage: s,
                    changeLanguageTo: r
                }
            }
            function v() {
                var e = (0,
                a.Pj)()
                  , t = e.store
                  , n = (0,
                o.EW)((function() {
                    return t.Public.imgUrl
                }
                ))
                  , i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                      , t = e.vassalage;
                    return {
                        default: "".concat(n.value, "/TCG_PROD_IMAGES/VENDOR_ICON_SMALL/").concat(t, "-DEFAULT.png"),
                        active: "".concat(n.value, "/TCG_PROD_IMAGES/VENDOR_ICON_SMALL/").concat(t, "-ACTIVE.png")
                    }
                }
                  , s = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                      , t = e.vassalage
                      , a = e.gameType;
                    return "LOTT" === a && (a = "ELOTT"),
                    {
                        white: "".concat(n.value, "/TCG_PROD_IMAGES/").concat(a, "_LIST_VENDOR/").concat(t, "-WHITE.png"),
                        color: "".concat(n.value, "/TCG_PROD_IMAGES/").concat(a, "_LIST_VENDOR/").concat(t, "-COLOR.png"),
                        rngColor: "".concat(n.value, "/TCG_PROD_IMAGES/RNG_LIST_VENDOR/").concat(t, "-COLOR.png"),
                        purple: "".concat(n.value, "/TCG_PROD_IMAGES/").concat(a, "_LIST_VENDOR/").concat(t, "-PURPLE.png")
                    }
                }
                  , r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                      , t = e.vassalage
                      , a = e.gameType;
                    return "".concat(n.value, "/TCG_PROD_IMAGES/SUBMENU_IMG/STYLE4/").concat(a, "-").concat(t, ".png")
                };
                return {
                    getVendorSmallIcon: i,
                    getVendorIcon: s,
                    getNavVendorIcon: r
                }
            }
            function h() {
                var e = (0,
                a.Pj)()
                  , t = e.store
                  , n = e.commit
                  , i = u()
                  , s = i.isGamePage
                  , r = (0,
                o.EW)((function() {
                    return t.home.showSideMenu
                }
                ))
                  , c = function(e) {
                    return n("setShowSideMenu", e)
                };
                return (0,
                o.wB)(s, (function() {
                    c(!s.value)
                }
                ), {
                    immediate: !0
                }),
                {
                    showSideMenu: r,
                    setShowSideMenu: c
                }
            }
        },
        95167: function(e, t, n) {
            "use strict";
            n(26099),
            n(27495),
            n(71761),
            n(23500),
            n(62953);
            var a = n(85471)
              , i = n(64765)
              , o = n(76619)
              , s = n(11930).merge;
            a.Ay.use(i.A);
            var r = o.A.defaultLang;
            function c() {
                var e = n(22095)
                  , t = n(99949)
                  , a = {}
                  , i = {};
                e.keys().forEach((function(t) {
                    var n = t.match(/([A-Za-z0-9-_]+)\./i);
                    if (n && n.length > 1) {
                        var i = n[1];
                        a[i] = e(t)
                    }
                }
                )),
                t.keys().forEach((function(e) {
                    var n = e.match(/([A-Za-z0-9-_]+)\./i);
                    if (n && n.length > 1) {
                        var a = n[1];
                        i[a] = t(e)
                    }
                }
                ));
                var o = s(i, a)
                  , c = l || r;
                return window.brLang = o[c],
                o
            }
            var l = window.localStorage.getItem("hisLang");
            l || (window.localStorage.setItem("hisLang", r),
            window.localStorage.setItem("lang", r));
            var u = new i.A({
                locale: l || r,
                fallbackLocale: r,
                messages: c(),
                silentTranslationWarn: !0
            });
            window.$i18n = u,
            t.A = u
        },
        81014: function(e, t, n) {
            "use strict";
            var a = n(69870)
              , i = n(17654)
              , o = (n(50517),
            n(82733),
            n(87902),
            n(28704),
            n(85471))
              , s = (n(74423),
            function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    attrs: {
                        id: "app"
                    }
                }, [["/agent", "/agentHome"].includes(e.$route.path) ? t("router-view", {
                    staticClass: "agent-main",
                    attrs: {
                        name: "agent"
                    }
                }) : [t("div", {
                    staticClass: "view-wrapper"
                }, [t("router-view", {
                    attrs: {
                        name: "sideMenu"
                    }
                }), t("div", {
                    staticClass: "view-container"
                }, [t("router-view", {
                    attrs: {
                        name: "header"
                    }
                }), t("router-view", {
                    key: e.mainRouterKey,
                    staticClass: "main-content"
                }), t("router-view", {
                    attrs: {
                        name: "footer"
                    }
                })], 1)], 1), t("CommonLogic")]], 2)
            }
            )
              , r = []
              , c = function() {
                var e = this
                  , t = e._self._c;
                return t("span", [t("TcgModal", {
                    attrs: {
                        name: "publicModal"
                    },
                    on: {
                        beforeClose: e.popupClose
                    }
                }, [t("AnnouncePopup", {
                    attrs: {
                        popupList: e.popupList
                    }
                })], 1), t("TcgModal", {
                    attrs: {
                        name: "noticeModal"
                    }
                }, [t("NoticePopup")], 1), t("TcgModal", {
                    attrs: {
                        name: "loginPopupModal"
                    }
                }, [t("LoginPopup")], 1), t("TcgModal", {
                    attrs: {
                        name: "registerModal"
                    }
                }, [t("RegisterPopup")], 1), t("TcgModal", {
                    attrs: {
                        name: "changePassModal"
                    }
                }, [t("ChangePassword")], 1), t("TcgModal", {
                    attrs: {
                        name: "forgetPassModal"
                    }
                }, [t("ForgotPassword")], 1), t("TcgModal", {
                    attrs: {
                        name: "helpModal"
                    }
                }, [t("HelpCenter")], 1), t("GamePopup", {
                    attrs: {
                        iframe: !0
                    }
                }), e.isLogin ? t("Contract") : e._e(), t("DfChatRoom", {
                    attrs: {
                        headerColor: "#e6601b"
                    }
                }), e.$store.state.acmc.mcShow ? t("Member") : e._e(), e.$store.state.acmc.acShow ? t("Agent") : e._e(), e.isLogin ? t("SocketEvent", {
                    attrs: {
                        customerId: e.customerId,
                        account: e.account,
                        showMcPage: e.setMcPage
                    }
                }) : e._e()], 1)
            }
              , l = []
              , u = (n(2008),
            n(26099),
            n(27495),
            n(5746),
            n(75316))
              , d = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "announce-popup-container"
                }, [t("div", {
                    staticClass: "popup-bg"
                }, [t("div", {
                    staticClass: "popup-content"
                }, [t("div", {
                    staticClass: "popup-main"
                }, [t("div", {
                    staticClass: "left-wrap"
                }, [t("ul", {
                    staticClass: "content-nav"
                }, e._l(e.list[e.page - 1], (function(n, a) {
                    return t("li", {
                        key: a,
                        class: {
                            active: e.select === a
                        },
                        on: {
                            click: function(t) {
                                return e.tabChange(a)
                            }
                        }
                    }, [t("i", {
                        staticClass: "icon icon_notice"
                    }), t("div", {
                        staticClass: "nav-title"
                    }, [e._v(e._s(n.title))]), t("span", {
                        staticClass: "item-arrow"
                    }, [t("svg-icon", {
                        attrs: {
                            iconClass: "common-arrow"
                        }
                    })], 1)])
                }
                )), 0), t("div", {
                    staticClass: "paginate-wrapper"
                }, [t("paginate", {
                    attrs: {
                        "page-count": e.list.length,
                        "page-range": 1,
                        "click-handler": e.changePage,
                        "prev-text": "",
                        "next-text": "",
                        "container-class": "pagination-container",
                        "page-class": "page-item",
                        "page-link-class": "page-link-item",
                        "prev-class": "prev-item",
                        "prev-link-class": "prev-link-item",
                        "next-class": "next-item",
                        "next-link-class": "next-link-item",
                        "break-view-class": "break-view",
                        "break-view-link-class": "break-view-link"
                    },
                    model: {
                        value: e.page,
                        callback: function(t) {
                            e.page = t
                        },
                        expression: "page"
                    }
                })], 1)]), t("div", {
                    staticClass: "content-detail"
                }, [t("div", {
                    staticClass: "content-title"
                }, [e._v(e._s(((e.list[e.page - 1] || {})[e.select] || {}).title || ""))]), t("div", {
                    staticClass: "detail-box"
                }, [t("div", {
                    staticClass: "detail-text vhtml",
                    domProps: {
                        innerHTML: e._s(((e.list[e.page - 1] || {})[e.select] || {}).content || "")
                    }
                })])])])])])])
            }
              , m = []
              , p = n(57888)
              , g = n(74353)
              , f = n.n(g)
              , v = n(2543)
              , h = n(68770)
              , w = 9
              , C = {
                name: "notice",
                setup: function() {
                    var e = (0,
                    o.Kh)({
                        select: 1,
                        page: 1,
                        list: []
                    })
                      , t = (0,
                    h.Pj)()
                      , n = t.store
                      , a = (0,
                    o.EW)((function() {
                        return n.home.noticeIndex
                    }
                    ))
                      , i = (0,
                    o.EW)((function() {
                        return n.Public.notice
                    }
                    ))
                      , s = function(t) {
                        e.select = e.select === t ? .5 : t
                    }
                      , r = function(e) {
                        var t = new Date(+e);
                        return f()(t).format("yyyy-MM-dd hh:mm:ss")
                    }
                      , c = function() {
                        var t = e.select
                          , n = (0,
                        v.chunk)(i.value, w)
                          , a = Math.ceil((t + 1) / w)
                          , o = t - (a - 1) * w;
                        e.list = n,
                        e.page = a,
                        e.select = o
                    }
                      , l = function(t) {
                        e.page = t,
                        e.select = 1
                    }
                      , u = function(t) {
                        e.select = t
                    };
                    return (0,
                    o.wB)(a, (function(t) {
                        (t || 0 === t) && (e.select = t,
                        c())
                    }
                    ), {
                        immediate: !0
                    }),
                    (0,
                    p.A)((0,
                    p.A)({}, (0,
                    o.QW)(e)), {}, {
                        notice: i,
                        unfold: s,
                        formatTime: r,
                        changePage: l,
                        tabChange: u
                    })
                }
            }
              , b = C
              , _ = n(81656)
              , A = (0, _.A)(b, d, m, !1, null, null, null)
              , y = A.exports
              , P = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "announce-popup-container"
                }, [t("div", {
                    staticClass: "popup-bg"
                }, [t("div", {
                    staticClass: "popup-title"
                }, [e._v(e._s(e.$t("in_increase_announcement")))]), t("div", {
                    staticClass: "popup-content"
                }, [t("div", {
                    staticClass: "popup-main"
                }, [t("div", {
                    staticClass: "left-wrap"
                }, [t("ul", {
                    staticClass: "content-nav"
                }, e._l(e.publicityList[e.page - 1], (function(n, a) {
                    return t("li", {
                        key: a,
                        class: {
                            active: e.select === a
                        },
                        on: {
                            click: function(t) {
                                return e.tabChange(a)
                            }
                        }
                    }, [t("i", {
                        staticClass: "icon icon_notice"
                    }), t("div", {
                        staticClass: "nav-title"
                    }, [e._v(e._s(n.title))]), t("span", {
                        staticClass: "item-arrow"
                    }, [t("svg-icon", {
                        attrs: {
                            iconClass: "common-arrow"
                        }
                    })], 1)])
                }
                )), 0), t("div", {
                    staticClass: "paginate-wrapper"
                }, [t("paginate", {
                    attrs: {
                        "page-count": e.publicityList.length,
                        "margin-pages": 1,
                        "page-range": 5,
                        "click-handler": e.changePage,
                        "prev-text": "",
                        "next-text": "",
                        "container-class": "pagination-container",
                        "page-class": "page-item",
                        "page-link-class": "page-link-item",
                        "prev-class": "prev-item",
                        "prev-link-class": "prev-link-item",
                        "next-class": "next-item",
                        "next-link-class": "next-link-item",
                        "break-view-class": "break-view",
                        "break-view-link-class": "break-view-link"
                    },
                    model: {
                        value: e.page,
                        callback: function(t) {
                            e.page = t
                        },
                        expression: "page"
                    }
                })], 1)]), t("div", {
                    staticClass: "content-detail"
                }, [t("div", {
                    staticClass: "content-title"
                }, [e._v(e._s(((e.publicityList[e.page - 1] || {})[e.select] || {}).title || ""))]), t("div", {
                    staticClass: "detail-box"
                }, [t("div", {
                    staticClass: "detail-text vhtml",
                    domProps: {
                        innerHTML: e._s(((e.publicityList[e.page - 1] || {})[e.select] || {}).content || "")
                    }
                })]), t("div", {
                    staticClass: "notice_footer"
                }, [((e.publicityList[e.page - 1] || {})[e.select] || {})["promotionType"] ? t("button", {
                    staticClass: "btn_promo hover",
                    on: {
                        click: function(t) {
                            e.toPromotion((e.publicityList[e.page - 1] || {})[e.select])
                        }
                    }
                }, [e._v(" " + e._s(e.$t("go_promo")) + " ")]) : e._e()])])])])])])
            }
              , k = []
              , M = 9
              , x = {
                name: "notice",
                props: {
                    popupList: {
                        type: Array,
                        required: !0
                    }
                },
                setup: function(e) {
                    var t = (0,
                    o.Kh)({
                        select: 0,
                        page: 1
                    })
                      , n = (0,
                    h.As)()
                      , a = n.setMcPage
                      , i = (0,
                    h.hS)()
                      , s = (0,
                    o.EW)((function() {
                        return (0,
                        v.chunk)(e.popupList, M)
                    }
                    ))
                      , r = function(e) {
                        t.page = e,
                        t.select = 1
                    }
                      , c = function(e) {
                        t.select = e
                    }
                      , l = function(e) {
                        t.select = t.select === e ? .5 : e
                    }
                      , u = function(e) {
                        a("rewardCenter"),
                        i.hide("publicModal")
                    }
                      , d = function(e) {
                        var t = new Date(+e);
                        return f()(t).format("yyyy-MM-dd hh:mm:ss")
                    };
                    return (0,
                    p.A)((0,
                    p.A)({}, (0,
                    o.QW)(t)), {}, {
                        publicityList: s,
                        unfold: l,
                        toPromotion: u,
                        formatTime: d,
                        changePage: r,
                        tabChange: c
                    })
                }
            }
              , L = x
              , S = (0, _.A)(L, P, k, !1, null, null, null)
              , N = S.exports
              , T = n(3310)
              , R = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "form-popup-container"
                }, [t("img", {
                    staticClass: "form-popup-banner",
                    attrs: {
                        src: n(50567),
                        alt: ""
                    }
                }), t("div", {
                    staticClass: "form-popup-bg"
                }, [t("div", {
                    staticClass: "form-title"
                }, [t("CommonLogo", {
                    staticClass: "form-logo",
                    attrs: {
                        src: n(65549)
                    }
                })], 1), e.showVerCodeLogin ? t("div", {
                    staticClass: "method-select"
                }, [e._l(e.loginOption, (function(n) {
                    return [t("div", {
                        key: n.type,
                        class: ["method-item", {
                            active: e.loginType === n.type
                        }],
                        on: {
                            click: function(t) {
                                return e.setLoginType(n.type)
                            }
                        }
                    }, [e._v(" " + e._s(e.$t(n.label)) + " ")])]
                }
                ))], 2) : e._e(), t("div", {
                    staticClass: "form-type"
                }, [t("div", {
                    staticClass: "form-type-item active"
                }, [e._v(" " + e._s(e.$t("hd_login_button")) + " ")]), t("div", {
                    staticClass: "form-type-item",
                    on: {
                        click: e.goRegister
                    }
                }, [e._v(" " + e._s(e.$t("hd_sign_button")) + " ")])]), t("LoginForm", {
                    attrs: {
                        loginType: e.loginType
                    }
                }), t("div", {
                    staticClass: "form-tip"
                }, [t("span", [e._v(e._s(e.$t("no_account")))]), t("a", {
                    on: {
                        click: e.goRegister
                    }
                }, [e._v(e._s(e.$t("in_register_now")))])])], 1)])
            }
              , O = []
              , E = (n(50113),
            n(21092))
              , I = {
                methods: {
                    getService: function(e) {
                        var t = this.$store.state.home.customerService
                          , n = this.$store.state.home.customerService.find((function(t) {
                            return t.csType === e
                        }
                        ));
                        if (t.length)
                            if (n)
                                window.open(n.path, "service", "width=440,height=750");
                            else {
                                var a = (0,
                                E.A)(t, 1)
                                  , i = a[0];
                                window.open(i, "service", "width=440,height=750")
                            }
                    },
                    hasService: function(e) {
                        var t = this.$store.state.home.customerService.find((function(t) {
                            return t.csType === e
                        }
                        ));
                        return !!t
                    }
                }
            }
              , B = (n(28706),
            n(34782),
            n(42762),
            function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "form_container"
                }, [t("form", {
                    key: e.loginType,
                    staticClass: "login-form",
                    attrs: {
                        autocomplete: "off",
                        "data-vv-scope": "login-form"
                    },
                    on: {
                        submit: function(t) {
                            return t.preventDefault(),
                            e.handleLogin.apply(null, arguments)
                        }
                    }
                }, ["username" === e.loginType ? [t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("p", {
                    staticClass: "label-text"
                }, [e._v(e._s(e.$t("in_increase_username")))]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("login-form.username")))])]), t("div", {
                    staticClass: "item_box user hasIcon"
                }, [t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "form-icon-name"
                    }
                })], 1), t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model.trim",
                        value: e.username,
                        expression: "username",
                        modifiers: {
                            trim: !0
                        }
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0
                        },
                        expression: "{ required: true }"
                    }],
                    staticClass: "username_input",
                    class: [{
                        err: e.errors.first("login-form.username")
                    }],
                    attrs: {
                        placeholder: e.$t("in_increase_username"),
                        type: "text",
                        name: "username"
                    },
                    domProps: {
                        value: e.username
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || (e.username = t.target.value.trim())
                        },
                        blur: function(t) {
                            return e.$forceUpdate()
                        }
                    }
                })]), t("p", {
                    staticClass: "errorMsg",
                    class: {
                        showIcon: e.errors.first("login-form.username")
                    }
                }, [e._v(" " + e._s(e.errors.first("login-form.username")) + " ")])]), t("div", {
                    staticClass: "form_item password"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("p", {
                    staticClass: "label-text"
                }, [e._v(e._s(e.$t("in_increase_password")))]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("login-form.password")))])]), t("div", {
                    staticClass: "item_box pass hasIcon"
                }, [t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "form-icon-password"
                    }
                })], 1), t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model.trim",
                        value: e.password,
                        expression: "password",
                        modifiers: {
                            trim: !0
                        }
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0
                        },
                        expression: "{ required: true }"
                    }],
                    staticClass: "password_input",
                    class: [{
                        err: e.errors.first("login-form.password")
                    }],
                    attrs: {
                        placeholder: e.$t("in_increase_password"),
                        type: e.showPassword ? "text" : "password",
                        name: "password"
                    },
                    domProps: {
                        value: e.password
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || (e.password = t.target.value.trim())
                        },
                        blur: function(t) {
                            return e.$forceUpdate()
                        }
                    }
                }), e.isHeaderLogin ? t("span", {
                    staticClass: "forget header-forget",
                    on: {
                        click: e.forgetPassword
                    }
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "header-forget"
                    }
                })], 1) : t("span", {
                    staticClass: "password-eyes",
                    on: {
                        click: function(t) {
                            e.showPassword = !e.showPassword
                        }
                    }
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: e.showPassword ? "show-eyes-default" : "hide-eyes-default"
                    }
                })], 1)]), t("p", {
                    staticClass: "errorMsg",
                    class: {
                        showIcon: e.errors.first("login-form.password")
                    }
                }, [e._v(" " + e._s(e.errors.first("login-form.password")) + " ")])]), e.showCaptcha ? t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("p", {
                    staticClass: "label-text"
                }, [e._v(e._s(e.$t("in_increase_captcha")))]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("login-form.captcha")))])]), t("div", {
                    staticClass: "item_box capt hasIcon"
                }, [t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "login-modal-capt"
                    }
                })], 1), t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model.trim",
                        value: e.captcha,
                        expression: "captcha",
                        modifiers: {
                            trim: !0
                        }
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0
                        },
                        expression: "{ required: true }"
                    }],
                    staticClass: "captcha_input",
                    class: [{
                        err: e.errors.first("login-form.captcha")
                    }],
                    attrs: {
                        placeholder: e.$t("in_increase_captcha"),
                        type: "text",
                        name: "captcha"
                    },
                    domProps: {
                        value: e.captcha
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || (e.captcha = t.target.value.trim())
                        },
                        blur: function(t) {
                            return e.$forceUpdate()
                        }
                    }
                }), t("div", {
                    staticClass: "captcha_box",
                    on: {
                        click: e.changeCaptcha
                    }
                }, [t("img", {
                    attrs: {
                        src: e.captchaSrc,
                        alt: ""
                    }
                })])]), t("p", {
                    staticClass: "errorMsg",
                    class: {
                        showIcon: e.errors.first("login-form.captcha")
                    }
                }, [e._v(" " + e._s(e.errors.first("login-form.captcha")) + " ")])]) : e._e()] : e._e(), "sms" === e.loginType ? [t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("p", {
                    staticClass: "label-text"
                }, [e._v(e._s(e.$t("in_increase_mobileNum")))]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("login-form.mobileNum")))])]), t("div", {
                    staticClass: "item_box country",
                    class: {
                        hasCountry: e.showLoginCountryCode
                    }
                }, [e.showLoginCountryCode ? t("country-code", {
                    attrs: {
                        initDialingCode: e.initDialingCode
                    },
                    on: {
                        setCountryCode: e.setCountryCode
                    }
                }) : e._e(), t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "form-icon-phone"
                    }
                })], 1), t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model.trim",
                        value: e.mobileNum,
                        expression: "mobileNum",
                        modifiers: {
                            trim: !0
                        }
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0,
                            mobileNum: !0
                        },
                        expression: "{ required: true, mobileNum: true }"
                    }],
                    staticClass: "password_input",
                    class: [{
                        err: e.errors.first("login-form.mobileNum")
                    }],
                    attrs: {
                        autocomplete: "off",
                        placeholder: e.$t("in_increase_mobileNum"),
                        type: "text",
                        name: "mobileNum"
                    },
                    domProps: {
                        value: e.mobileNum
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || (e.mobileNum = t.target.value.trim())
                        },
                        blur: function(t) {
                            return e.$forceUpdate()
                        }
                    }
                })], 1), t("p", {
                    staticClass: "errorMsg",
                    class: {
                        showIcon: e.errors.first("login-form.mobileNum")
                    }
                }, [e._v(" " + e._s(e.errors.first("login-form.mobileNum")) + " ")])]), t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("p", {
                    staticClass: "label-text"
                }, [e._v(e._s(e.$t("in_increase_verificationCode")))]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("login-form.sms")))])]), t("div", {
                    staticClass: "item_box capt hasIcon"
                }, [t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "form-icon-sms"
                    }
                })], 1), t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.verificationCode,
                        expression: "verificationCode"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0
                        },
                        expression: "{ required: true }"
                    }],
                    staticClass: "captcha_input",
                    class: [{
                        err: e.errors.first("login-form.sms")
                    }],
                    attrs: {
                        type: "text",
                        name: "sms",
                        autocomplete: "off",
                        placeholder: e.$t("in_increase_verificationCode")
                    },
                    domProps: {
                        value: e.verificationCode
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || (e.verificationCode = t.target.value)
                        }
                    }
                }), e.canSendSms ? t("div", {
                    staticClass: "sms-btn",
                    on: {
                        click: e.getSms
                    }
                }, [e._v(" " + e._s(e.$t("in_get_verificationCode")) + " ")]) : t("div", {
                    staticClass: "sms-btn disabled"
                }, [e._v(e._s("".concat(e.countdown, "s")))])]), t("p", {
                    staticClass: "errorMsg",
                    class: {
                        showIcon: e.errors.first("login-form.sms")
                    }
                }, [e._v(" " + e._s(e.errors.first("login-form.sms")) + " ")])])] : e._e(), e.agentPage ? e._e() : t("div", {
                    staticClass: "form_item rem-wrap"
                }, [t("div", {
                    staticClass: "remember-item"
                }, [t("div", {
                    staticClass: "remPass_box",
                    class: {
                        checked: e.rememberUserPass
                    }
                }, [t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.rememberUserPass,
                        expression: "rememberUserPass"
                    }],
                    staticClass: "remPass_checkbox",
                    attrs: {
                        type: "checkbox"
                    },
                    domProps: {
                        checked: Array.isArray(e.rememberUserPass) ? e._i(e.rememberUserPass, null) > -1 : e.rememberUserPass
                    },
                    on: {
                        change: function(t) {
                            var n = e.rememberUserPass
                              , a = t.target
                              , i = !!a.checked;
                            if (Array.isArray(n)) {
                                var o = null
                                  , s = e._i(n, o);
                                a.checked ? s < 0 && (e.rememberUserPass = n.concat([o])) : s > -1 && (e.rememberUserPass = n.slice(0, s).concat(n.slice(s + 1)))
                            } else
                                e.rememberUserPass = i
                        }
                    }
                }), t("span", {
                    staticClass: "cheched-bg"
                }), t("span", {
                    staticClass: "gougou"
                })]), t("span", {
                    staticClass: "jzmm"
                }, [e._v(e._s(e.$t("in_remember_password")))])]), t("span", {
                    staticClass: "forget",
                    on: {
                        click: e.forgetPassword
                    }
                }, [e._v(e._s(e.$t("in_forget_password")))])]), e.isHeaderLogin ? [t("div", {
                    staticClass: "form_item btn-wrap"
                }, [t("div", {
                    staticClass: "submit_btn",
                    class: {
                        firebase: e.firebase
                    }
                }, [t("button", {
                    staticClass: "form-btn",
                    attrs: {
                        type: "submit"
                    }
                }, [e._v(e._s(e.$t("hd_login_button")))]), e.firebase ? t("div", {
                    staticClass: "fire-arrow"
                }, [t("div", {
                    staticClass: "fire-drop"
                }, [t("span", {
                    staticClass: "or-connect"
                }, [e._v(e._s(e.$t("local_login_way")))]), t("div", {
                    staticClass: "firebase-group"
                }, [e.firebaseFacebook ? t("span", {
                    staticClass: "item facebook",
                    on: {
                        click: function(t) {
                            return e.loginByFirebaseDelegate("facebook")
                        }
                    }
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "facebook-m"
                    }
                })], 1) : e._e(), e.firebaseGoogle ? t("span", {
                    staticClass: "item google",
                    on: {
                        click: function(t) {
                            return e.loginByFirebaseDelegate("google")
                        }
                    }
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "google-m"
                    }
                })], 1) : e._e()])])]) : e._e(), e.firebase ? t("div", {
                    staticClass: "fire-drop"
                }, [t("span", {
                    staticClass: "or-connect"
                }, [e._v(e._s(e.$t("local_login_way")))]), t("div", {
                    staticClass: "firebase-group"
                }, [e.firebaseFacebook ? t("span", {
                    staticClass: "item facebook",
                    on: {
                        click: function(t) {
                            return e.loginByFirebaseDelegate("facebook")
                        }
                    }
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "facebook-m"
                    }
                })], 1) : e._e(), e.firebaseGoogle ? t("span", {
                    staticClass: "item google",
                    on: {
                        click: function(t) {
                            return e.loginByFirebaseDelegate("google")
                        }
                    }
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "google-m"
                    }
                })], 1) : e._e()])]) : e._e()])])] : [t("div", {
                    staticClass: "form_item btn-wrap"
                }, [t("button", {
                    staticClass: "submit_btn hover",
                    attrs: {
                        type: "submit"
                    }
                }, [e._v(e._s(e.$t("hd_login_button")))])]), !e.agentPage && e.firebase ? t("div", {
                    staticClass: "firebase-login"
                }, [t("div", {
                    staticClass: "tips"
                }, [t("span", {
                    staticClass: "or-connect"
                }, [e._v(e._s(e.$t("local_login_way")))])]), t("div", {
                    staticClass: "firebase-group"
                }, [e.firebaseFacebook ? t("span", {
                    staticClass: "item facebook",
                    on: {
                        click: function(t) {
                            return e.loginByFirebaseDelegate("facebook")
                        }
                    }
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "facebook-m"
                    }
                })], 1) : e._e(), e.firebaseGoogle ? t("span", {
                    staticClass: "item google",
                    on: {
                        click: function(t) {
                            return e.loginByFirebaseDelegate("google")
                        }
                    }
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "google-m"
                    }
                })], 1) : e._e()])]) : e._e(), t("div", {
                    staticClass: "form_item terms"
                }, [t("div", {
                    staticClass: "terms_box login"
                }, [t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.rememberUserPass,
                        expression: "rememberUserPass"
                    }],
                    staticClass: "terms_checkbox",
                    attrs: {
                        type: "checkbox"
                    },
                    domProps: {
                        checked: Array.isArray(e.rememberUserPass) ? e._i(e.rememberUserPass, null) > -1 : e.rememberUserPass
                    },
                    on: {
                        change: function(t) {
                            var n = e.rememberUserPass
                              , a = t.target
                              , i = !!a.checked;
                            if (Array.isArray(n)) {
                                var o = null
                                  , s = e._i(n, o);
                                a.checked ? s < 0 && (e.rememberUserPass = n.concat([o])) : s > -1 && (e.rememberUserPass = n.slice(0, s).concat(n.slice(s + 1)))
                            } else
                                e.rememberUserPass = i
                        }
                    }
                }), t("span", {
                    staticClass: "cheched-bg"
                }), t("span", {
                    staticClass: "gougou"
                })]), t("span", [e._v(" " + e._s(e.$t("local_terms_content")) + " "), t("span", {
                    staticClass: "link",
                    on: {
                        click: e.handleTermClick
                    }
                }, [e._v(e._s(e.$t("local_terms_link")))])])])]], 2)])
            }
            )
              , V = [];
            n(44114),
            n(33110),
            n(79432),
            n(16280),
            n(48598),
            n(62062),
            n(90906),
            n(38781),
            n(25440),
            n(23500);
            function G(e) {
                var t = e + "="
                  , n = t.length
                  , a = document.cookie.length
                  , i = 0;
                while (i < a) {
                    var o = i + n;
                    if (document.cookie.substring(i, o) === t)
                        return H(o);
                    if (i = document.cookie.indexOf(" ", i) + 1,
                    0 === i)
                        break
                }
                return null
            }
            function H(e) {
                var t = document.cookie.indexOf(";", e);
                return -1 === t && (t = document.cookie.length),
                unescape(document.cookie.substring(e, t))
            }
            function D(e, t, n) {
                document.cookie = e + "=" + escape(t) + (null == n ? "" : "; expires=" + n.toGMTString())
            }
            function z(e) {
                var t = new Date;
                D(e, null, t)
            }
            var U = n(76619)
              , q = {
                mixins: [u.vE.firebaseMixins, u.vE.geetestMixins, I],
                props: ["loginType", "isHeaderLogin", "agentPage"],
                components: {
                    CountryCode: u.O4
                },
                data: function() {
                    return {
                        username: "",
                        password: "",
                        mobilePassword: "",
                        verificationCode: "",
                        mobileNum: "",
                        canSendSms: !0,
                        rememberUserPass: !1,
                        rememberPhonePass: !1,
                        countdown: 0,
                        id: "".concat(U.A.brand.merchant, "-login"),
                        captcha: null,
                        showCaptcha: !1,
                        captchaSrc: "",
                        time: new Date,
                        countryDialingCode: void 0,
                        initDialingCode: void 0,
                        showPassword: !1
                    }
                },
                mounted: function() {
                    this.showCaptcha && this.getCaptcha(),
                    this.getLastUser()
                },
                computed: {
                    pwdEnabled: function() {
                        return this.$store.state.Login.pwdEnabled
                    },
                    freePlayEnabled: function() {
                        return this.$store.state.Login.hasFreePlay
                    },
                    showVerCodeLogin: function() {
                        return this.$store.state.Login.showVerCodeLogin
                    },
                    device: function() {
                        return this.$store.state.Login.codeUrl
                    }
                },
                methods: {
                    handleLogin: function() {
                        var e = this;
                        return (0,
                        i.A)((0,
                        a.A)().mark((function t() {
                            var n, o;
                            return (0,
                            a.A)().wrap((function(t) {
                                while (1)
                                    switch (t.prev = t.next) {
                                    case 0:
                                        n = "sms" === e.loginType,
                                        o = {
                                            username: n ? e.mobileNum : e.username,
                                            password: n ? e.verificationCode : e.password,
                                            captcha: e.captcha,
                                            type: n ? "sms" : "username"
                                        },
                                        e.$validator.validateAll("login-form").then(function() {
                                            var t = (0,
                                            i.A)((0,
                                            a.A)().mark((function t(n) {
                                                var i;
                                                return (0,
                                                a.A)().wrap((function(t) {
                                                    while (1)
                                                        switch (t.prev = t.next) {
                                                        case 0:
                                                            if (!n) {
                                                                t.next = 13;
                                                                break
                                                            }
                                                            if ("sms" !== o.type) {
                                                                t.next = 5;
                                                                break
                                                            }
                                                            t.t0 = !0,
                                                            t.next = 8;
                                                            break;
                                                        case 5:
                                                            return t.next = 7,
                                                            e.geetestVerify("login");
                                                        case 7:
                                                            t.t0 = t.sent;
                                                        case 8:
                                                            if (i = t.t0,
                                                            o = (0,
                                                            p.A)((0,
                                                            p.A)({}, o), i),
                                                            !e.firebaseSms || "sms" !== o.type) {
                                                                t.next = 12;
                                                                break
                                                            }
                                                            return t.abrupt("return", e.loginFirebaseBySms({
                                                                mobileNum: e.mobileNum,
                                                                code: e.verificationCode,
                                                                afterLogin: e.handleAfterLogin
                                                            }));
                                                        case 12:
                                                            e.loginMethod(o);
                                                        case 13:
                                                        case "end":
                                                            return t.stop()
                                                        }
                                                }
                                                ), t)
                                            }
                                            )));
                                            return function(e) {
                                                return t.apply(this, arguments)
                                            }
                                        }());
                                    case 3:
                                    case "end":
                                        return t.stop()
                                    }
                            }
                            ), t)
                        }
                        )))()
                    },
                    setCountryCode: function(e) {
                        this.countryDialingCode = e
                    },
                    loginByFirebaseDelegate: function(e) {
                        var t = this;
                        this.loginFirebaseV2({
                            channel: e,
                            showLoginModal: function() {
                                t.$modal.show("loginPopupModal")
                            },
                            afterLogin: this.handleAfterLogin,
                            showLoading: function(e) {
                                return t.cover.loader(e)
                            }
                        })
                    },
                    getLastUser: function() {
                        var e = G(this.id);
                        this.username = e || "",
                        this.getPwdAndChk()
                    },
                    setPwdAndChk: function() {
                        if (this.rememberUserPass) {
                            this.setLastUser(this.username);
                            var e = new Date;
                            e.setTime(e.getTime() + 864e5),
                            D("loginRemember", "1", e),
                            D(this.username, this.password, e),
                            this.mobileNum && D("loginTypeSms", JSON.stringify({
                                mobileNum: this.mobileNum,
                                countryDialingCode: this.countryDialingCode
                            }), e)
                        } else
                            z(this.username),
                            z(this.id),
                            z("loginRemember"),
                            z("loginTypeSms")
                    },
                    setLastUser: function(e) {
                        var t = new Date;
                        t.setTime(t.getTime() + 864e5),
                        D(this.id, e, t)
                    },
                    getPwdAndChk: function() {
                        var e = G(this.username);
                        e ? (this.rememberUserPass = !0,
                        this.password = e) : this.password = "";
                        var t = G("loginTypeSms");
                        if (t) {
                            var n = JSON.parse(t);
                            this.mobileNum = n.mobileNum,
                            this.initDialingCode = n.countryDialingCode
                        }
                        var a = G("loginRemember");
                        a && (this.rememberUserPass = !0)
                    },
                    hideModal: function() {
                        this.$modal.hide("loginPopupModal")
                    },
                    startCountDown: function(e) {
                        var t = this;
                        this.canSendSms = !1,
                        this.countdown = 60 * e,
                        this.timer = setInterval((function() {
                            t.countdown--,
                            t.countdown <= 0 && (t.canSendSms = !0,
                            clearInterval(t.timer))
                        }
                        ), 1e3)
                    },
                    loginMethod: function(e) {
                        var t = this;
                        this.cover.loader(!0),
                        this.$store.dispatch("loginV2", {
                            data: e
                        }).then((function(n) {
                            t.cover.loader(!1),
                            t.handleAfterLogin({
                                formData: e,
                                res: n
                            })
                        }
                        )).catch((function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            t.cover.loader(!1),
                            (e.value || {}).captcha && (t.showCaptcha = !0,
                            t.getCaptcha())
                        }
                        ))
                    },
                    handleAfterLogin: function(e) {
                        var t = this
                          , n = e.formData
                          , a = e.res;
                        if (n && a) {
                            this.setPwdAndChk();
                            var i = (0,
                            p.A)((0,
                            p.A)({}, a.value), {}, {
                                password: this.password
                            });
                            this.$store.commit("setUserInfo", i);
                            var o = a.value
                              , s = o.firstTimeLogin
                              , r = o.passwordExpired
                              , c = o.token;
                            sessionStorage.setItem("token", c),
                            s && this.$store.dispatch("firstLogin"),
                            this.$modal.hide("loginPopupModal"),
                            ("123456" === this.password || r && this.pwdEnabled) && !["sms", "firebase"].includes(n.type) ? (this.cover.loader(!1),
                            this.$modal.show("changePassModal")) : this.$store.dispatch("loginInfo", a.value).then((function(e) {
                                t.cover.loader(!1),
                                t.$store.commit("setAfterLoginModal", !0),
                                t.agentPage && t.$router.push("/agentHome")
                            }
                            ))
                        }
                    },
                    getCaptcha: function() {
                        var e = this;
                        this.$store.dispatch("captcha").then((function(t) {
                            t.success && (e.captchaSrc = "data:image/png;base64," + t.value)
                        }
                        ))
                    },
                    getSms: (0,
                    v.throttle)((function() {
                        var e = this;
                        this.$validator.validate("login-form.mobileNum").then((function(t) {
                            t && (e.cover.loader(!0),
                            e.$store.dispatch("getLoginCode", {
                                data: {
                                    mobileNum: e.mobileNum,
                                    countryDialingCode: e.countryDialingCode
                                }
                            }).then(function() {
                                var t = (0,
                                i.A)((0,
                                a.A)().mark((function t(n) {
                                    var i;
                                    return (0,
                                    a.A)().wrap((function(t) {
                                        while (1)
                                            switch (t.prev = t.next) {
                                            case 0:
                                                if (!n.success) {
                                                    t.next = 10;
                                                    break
                                                }
                                                if (!e.firebaseSms) {
                                                    t.next = 7;
                                                    break
                                                }
                                                return t.next = 4,
                                                e.sendCodeByFirebase("+".concat(e.countryDialingCode), e.mobileNum);
                                            case 4:
                                                return i = t.sent,
                                                i && e.startCountDown(1),
                                                t.abrupt("return");
                                            case 7:
                                                e.startCountDown(n.value.expiredMinutes),
                                                t.next = 11;
                                                break;
                                            case 10:
                                                e.cover.init({
                                                    html: n.message,
                                                    icon: "warning",
                                                    btn: {
                                                        confirm: e.$t("in_increase_submit")
                                                    }
                                                });
                                            case 11:
                                            case "end":
                                                return t.stop()
                                            }
                                    }
                                    ), t)
                                }
                                )));
                                return function(e) {
                                    return t.apply(this, arguments)
                                }
                            }()).finally((function() {
                                e.cover.loader(!1)
                            }
                            )))
                        }
                        ))
                    }
                    ), 1e3),
                    changeCaptcha: function() {
                        var e = new Date;
                        e - this.time > 1e3 && (this.getCaptcha(),
                        this.time = e)
                    },
                    forgetPassword: function() {
                        this.$modal.hide("loginPopupModal"),
                        this.$modal.show("forgetPassModal")
                    },
                    freePlay: function() {
                        var e = this;
                        this.cover.loader(!0),
                        this.$store.dispatch("loginFreePlay").then((function(t) {
                            t.success && e.$store.dispatch("loginInfo", t).then((function(t) {
                                t.success && (sessionStorage.removeItem("cpw"),
                                e.$modal.hide("loginModal"),
                                e.$router.push("/"),
                                e.$modal.hide("loginPopupModal"),
                                e.$store.commit("setLoginState", !0))
                            }
                            )),
                            e.cover.loader(!1)
                        }
                        ))
                    },
                    handleTermClick: function() {
                        this.$modal.hide("loginPopupModal"),
                        this.$router.push("/help#term"),
                        this.$modal.show("helpModal")
                    }
                }
            }
              , F = q
              , j = (0, _.A)(F, B, V, !1, null, null, null)
              , Z = j.exports
              , Q = [{
                type: "username",
                label: "in_increase_username"
            }, {
                type: "sms",
                label: "in_increase_mobileNum"
            }]
              , Y = {
                mixins: [I, u.vE.firebaseMixins],
                name: "loginModal",
                components: {
                    LoginForm: Z,
                    CommonLogo: u.fA
                },
                data: function() {
                    return {
                        loginOption: Q,
                        loginType: "username"
                    }
                },
                mounted: function() {},
                computed: {
                    showVerCodeLogin: function() {
                        return this.$store.state.Login.showVerCodeLogin
                    },
                    banners: function() {
                        var e, t = (null === (e = this.$store.state.Public.banners) || void 0 === e ? void 0 : e.find((function(e) {
                            return "w_login" === e.groupName
                        }
                        ))) || {};
                        return t
                    }
                },
                methods: {
                    setLoginType: function(e) {
                        this.loginType = e
                    },
                    goRegister: function() {
                        this.$modal.hide("loginPopupModal"),
                        this.$modal.show("registerModal")
                    }
                }
            }
              , J = Y
              , W = (0, _.A)(J, R, O, !1, null, null, null)
              , K = W.exports
              , X = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "form-popup-container"
                }, [t("img", {
                    staticClass: "form-popup-banner",
                    attrs: {
                        src: n(50567),
                        alt: ""
                    }
                }), t("div", {
                    staticClass: "form-popup-bg"
                }, [t("div", {
                    staticClass: "form-title"
                }, [t("CommonLogo", {
                    staticClass: "form-logo",
                    attrs: {
                        src: n(65549)
                    }
                })], 1), t("div", {
                    staticClass: "form-type"
                }, [t("div", {
                    staticClass: "form-type-item",
                    on: {
                        click: e.goLogin
                    }
                }, [e._v(" " + e._s(e.$t("hd_login_button")) + " ")]), t("div", {
                    staticClass: "form-type-item active",
                    on: {
                        click: e.goLogin
                    }
                }, [e._v(" " + e._s(e.$t("hd_sign_button")) + " ")])]), t("RegisterForm"), t("div", {
                    staticClass: "form-tip"
                }, [t("span", [e._v(e._s(e.$t("in_already_account")) + "?")]), t("a", {
                    on: {
                        click: e.goLogin
                    }
                }, [e._v(e._s(e.$t("hd_login_button")))])])], 1)])
            }
              , $ = []
              , ee = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "register-form-container"
                }, [e.registerOption.length > 1 ? t("div", {
                    staticClass: "method-select"
                }, [e._l(e.registerOption, (function(n) {
                    return [t("div", {
                        key: n.type,
                        class: ["method-item", {
                            active: e.regType === n.type
                        }],
                        on: {
                            click: function(t) {
                                return e.loginTabChange(n.type)
                            }
                        }
                    }, [e._v(" " + e._s(e.$t(n.label)) + " ")])]
                }
                ))], 2) : e._e(), t("div", {
                    staticClass: "form_container"
                }, [t("form", {
                    key: e.regType,
                    staticClass: "register-form",
                    attrs: {
                        autocomplete: "off"
                    },
                    on: {
                        submit: function(t) {
                            return t.preventDefault(),
                            e.submitRegister.apply(null, arguments)
                        }
                    }
                }, ["register" === e.regType ? [t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text",
                    class: {
                        isRequire: !0
                    }
                }, [e._v(e._s(e.$t("in_increase_username")))]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("username")))])]), t("div", {
                    staticClass: "item_box hasIcon"
                }, [t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "form-icon-name"
                    }
                })], 1), t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.user.username,
                        expression: "user.username"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0,
                            username: !0
                        },
                        expression: "{ required: true, username: true }"
                    }],
                    key: "username-input",
                    staticClass: "username_input",
                    attrs: {
                        type: "text",
                        spellcheck: "false",
                        placeholder: e.getPlaceHolder("username", e.$t("in_increase_username")),
                        name: "username",
                        autocomplete: "off"
                    },
                    domProps: {
                        value: e.user.username
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || e.$set(e.user, "username", t.target.value)
                        }
                    }
                })]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("username")))])]), t("div", {
                    key: "firstPass",
                    staticClass: "form_item password"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text",
                    class: {
                        isRequire: !0
                    }
                }, [e._v(e._s(e.$t("in_increase_password")))]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("password")))])]), t("div", {
                    staticClass: "item_box hasIcon"
                }, [t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "form-icon-password"
                    }
                })], 1), "checkbox" === (e.showPassword ? "text" : "password") ? t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.user.password,
                        expression: "user.password"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0,
                            password: !0
                        },
                        expression: "{ required: true, password: true }"
                    }],
                    staticClass: "password_input",
                    attrs: {
                        name: "password",
                        autocomplete: "new-password",
                        placeholder: e.getPlaceHolder("password", e.$t("in_increase_password")),
                        type: "checkbox"
                    },
                    domProps: {
                        checked: Array.isArray(e.user.password) ? e._i(e.user.password, null) > -1 : e.user.password
                    },
                    on: {
                        change: function(t) {
                            var n = e.user.password
                              , a = t.target
                              , i = !!a.checked;
                            if (Array.isArray(n)) {
                                var o = null
                                  , s = e._i(n, o);
                                a.checked ? s < 0 && e.$set(e.user, "password", n.concat([o])) : s > -1 && e.$set(e.user, "password", n.slice(0, s).concat(n.slice(s + 1)))
                            } else
                                e.$set(e.user, "password", i)
                        }
                    }
                }) : "radio" === (e.showPassword ? "text" : "password") ? t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.user.password,
                        expression: "user.password"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0,
                            password: !0
                        },
                        expression: "{ required: true, password: true }"
                    }],
                    staticClass: "password_input",
                    attrs: {
                        name: "password",
                        autocomplete: "new-password",
                        placeholder: e.getPlaceHolder("password", e.$t("in_increase_password")),
                        type: "radio"
                    },
                    domProps: {
                        checked: e._q(e.user.password, null)
                    },
                    on: {
                        change: function(t) {
                            return e.$set(e.user, "password", null)
                        }
                    }
                }) : t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.user.password,
                        expression: "user.password"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0,
                            password: !0
                        },
                        expression: "{ required: true, password: true }"
                    }],
                    staticClass: "password_input",
                    attrs: {
                        name: "password",
                        autocomplete: "new-password",
                        placeholder: e.getPlaceHolder("password", e.$t("in_increase_password")),
                        type: e.showPassword ? "text" : "password"
                    },
                    domProps: {
                        value: e.user.password
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || e.$set(e.user, "password", t.target.value)
                        }
                    }
                }), t("span", {
                    staticClass: "password-eyes",
                    on: {
                        click: function(t) {
                            e.showPassword = !e.showPassword
                        }
                    }
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: e.showPassword ? "show-eyes-default" : "hide-eyes-default"
                    }
                })], 1)]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("password")))])])] : e._e(), e.showMobile ? t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text",
                    class: {
                        isRequire: e.mobileRequired
                    }
                }, [e._v(e._s(e.$t("in_increase_mobileNum")))]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("mobileNum")))])]), t("div", {
                    staticClass: "item_box country",
                    class: {
                        hasCountry: e.showRegisterCountryCode
                    }
                }, [e.showRegisterCountryCode ? t("CountryCode", {
                    on: {
                        setCountryCode: e.setCountryCode
                    }
                }) : e._e(), t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "form-icon-phone"
                    }
                })], 1), t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.user.mobileNum,
                        expression: "user.mobileNum"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: e.mobileRequired,
                            mobileNum: !0
                        },
                        expression: "{ required: mobileRequired, mobileNum: true }"
                    }],
                    key: "mobileNum-input",
                    staticClass: "phone_input",
                    attrs: {
                        type: "text",
                        name: "mobileNum",
                        autocomplete: "off",
                        placeholder: e.getPlaceHolder("mobileNum", e.$t("in_increase_mobileNum"))
                    },
                    domProps: {
                        value: e.user.mobileNum
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || e.$set(e.user, "mobileNum", t.target.value)
                        }
                    }
                })], 1), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("mobileNum")))])]) : e._e(), e.smsEnabled ? t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text",
                    class: {
                        isRequire: !0
                    }
                }, [e._v(" " + e._s(e.$t("in_increase_verificationCode")) + " ")]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("verificationCode")))])]), t("div", {
                    staticClass: "item_box capt"
                }, [t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "form-icon-sms"
                    }
                })], 1), t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.user.verificationCode,
                        expression: "user.verificationCode"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0
                        },
                        expression: "{ required: true }"
                    }],
                    staticClass: "sms_input",
                    attrs: {
                        type: "text",
                        name: "sms",
                        spellcheck: "false",
                        autocomplete: "off",
                        placeholder: "".concat(e.$t("in_increase_verificationCode"))
                    },
                    domProps: {
                        value: e.user.verificationCode
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || e.$set(e.user, "verificationCode", t.target.value)
                        }
                    }
                }), e.canSendSms ? t("div", {
                    staticClass: "sms-btn",
                    on: {
                        click: e.getSms
                    }
                }, [e._v(e._s(e.$t("in_get_verificationCode")))]) : t("div", {
                    staticClass: "sms-btn disabled"
                }, [e._v(e._s("".concat(e.countdown, "s")))])]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("sms")))])]) : e._e(), "registerMobile" === e.regType && e.showMobileRegPass ? [t("div", {
                    key: "secondPass",
                    staticClass: "form_item password"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text",
                    class: {
                        isRequire: !0
                    }
                }, [e._v(e._s(e.$t("in_increase_password")))]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("password")))])]), t("div", {
                    staticClass: "item_box hasIcon"
                }, [t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "form-icon-password"
                    }
                })], 1), "checkbox" === (e.showPassword ? "text" : "password") ? t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.user.password,
                        expression: "user.password"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0,
                            password: !0
                        },
                        expression: "{ required: true, password: true }"
                    }],
                    staticClass: "password_input",
                    attrs: {
                        name: "password",
                        autocomplete: "new-password",
                        placeholder: e.getPlaceHolder("password", e.$t("in_increase_password")),
                        type: "checkbox"
                    },
                    domProps: {
                        checked: Array.isArray(e.user.password) ? e._i(e.user.password, null) > -1 : e.user.password
                    },
                    on: {
                        change: function(t) {
                            var n = e.user.password
                              , a = t.target
                              , i = !!a.checked;
                            if (Array.isArray(n)) {
                                var o = null
                                  , s = e._i(n, o);
                                a.checked ? s < 0 && e.$set(e.user, "password", n.concat([o])) : s > -1 && e.$set(e.user, "password", n.slice(0, s).concat(n.slice(s + 1)))
                            } else
                                e.$set(e.user, "password", i)
                        }
                    }
                }) : "radio" === (e.showPassword ? "text" : "password") ? t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.user.password,
                        expression: "user.password"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0,
                            password: !0
                        },
                        expression: "{ required: true, password: true }"
                    }],
                    staticClass: "password_input",
                    attrs: {
                        name: "password",
                        autocomplete: "new-password",
                        placeholder: e.getPlaceHolder("password", e.$t("in_increase_password")),
                        type: "radio"
                    },
                    domProps: {
                        checked: e._q(e.user.password, null)
                    },
                    on: {
                        change: function(t) {
                            return e.$set(e.user, "password", null)
                        }
                    }
                }) : t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.user.password,
                        expression: "user.password"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0,
                            password: !0
                        },
                        expression: "{ required: true, password: true }"
                    }],
                    staticClass: "password_input",
                    attrs: {
                        name: "password",
                        autocomplete: "new-password",
                        placeholder: e.getPlaceHolder("password", e.$t("in_increase_password")),
                        type: e.showPassword ? "text" : "password"
                    },
                    domProps: {
                        value: e.user.password
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || e.$set(e.user, "password", t.target.value)
                        }
                    }
                }), t("span", {
                    staticClass: "password-eyes",
                    on: {
                        click: function(t) {
                            e.showPassword = !e.showPassword
                        }
                    }
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: e.showPassword ? "show-eyes-default" : "hide-eyes-default"
                    }
                })], 1)]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("password")))])])] : e._e(), e.showPayeeName ? t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text",
                    class: {
                        isRequire: e.payeeNameValid.required
                    }
                }, [e._v(" " + e._s(e.$t("in_increase_payeeName")) + " ")]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("payeeName")))])]), t("div", {
                    staticClass: "item_box"
                }, [t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.user.payeeName,
                        expression: "user.payeeName"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: e.payeeNameValid.required,
                            payeeName: !0
                        },
                        expression: "{\n              required: payeeNameValid.required,\n              payeeName: true,\n            }"
                    }],
                    staticClass: "payeeName_input",
                    attrs: {
                        type: "text",
                        name: "payeeName",
                        autocomplete: "off",
                        placeholder: e.getPlaceHolder("payeeName", e.$t("in_increase_payeeName"))
                    },
                    domProps: {
                        value: e.user.payeeName
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || e.$set(e.user, "payeeName", t.target.value)
                        }
                    }
                })]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("payeeName")))])]) : e._e(), e.showpaymentPassword ? t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text",
                    class: {
                        isRequire: !0
                    }
                }, [e._v(" " + e._s(e.$t("in_increase_paymentPassword")) + " ")]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("paymentPassword")))])]), t("div", {
                    staticClass: "item_box"
                }, [t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.user.paymentPassword,
                        expression: "user.paymentPassword"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0,
                            paymentPassword: !0
                        },
                        expression: "{ required: true, paymentPassword: true }"
                    }],
                    class: {
                        hasError: e.errors.has("paymentPassword")
                    },
                    attrs: {
                        type: "password",
                        name: "paymentPassword",
                        autocomplete: "off",
                        placeholder: e.getPlaceHolder("paymentPassword", e.$t("in_increase_paymentPassword"))
                    },
                    domProps: {
                        value: e.user.paymentPassword
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || e.$set(e.user, "paymentPassword", t.target.value)
                        }
                    }
                })]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("paymentPassword")))])]) : e._e(), e.showQQ ? t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text",
                    class: {
                        isRequire: e.qqValid.required
                    }
                }, [e._v(e._s(e.$t("in_increase_qqNum")))]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("qqNum")))])]), t("div", {
                    staticClass: "item_box"
                }, [t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.user.qqNum,
                        expression: "user.qqNum"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: e.qqValid.required,
                            qqNum: !0
                        },
                        expression: "{ required: qqValid.required, qqNum: true }"
                    }],
                    staticClass: "qqNum_input",
                    attrs: {
                        type: "text",
                        name: "qqNum",
                        autocomplete: "off",
                        placeholder: e.getPlaceHolder("qqNum", e.$t("in_increase_qqNum"))
                    },
                    domProps: {
                        value: e.user.qqNum
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || e.$set(e.user, "qqNum", t.target.value)
                        }
                    }
                })]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("qqNum")))])]) : e._e(), e.showline ? t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text",
                    class: {
                        isRequire: e.lineValid.required
                    }
                }, [e._v(e._s(e.$t("in_increase_qqNum")))]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("line")))])]), t("div", {
                    staticClass: "item_box"
                }, [t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.user.line,
                        expression: "user.line"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: e.lineValid.required,
                            line: !0
                        },
                        expression: "{ required: lineValid.required, line: true }"
                    }],
                    class: {
                        hasError: e.errors.has("line")
                    },
                    attrs: {
                        type: "text",
                        name: "line",
                        autocomplete: "off",
                        placeholder: e.getPlaceHolder("line", e.$t("in_increase_line"))
                    },
                    domProps: {
                        value: e.user.line
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || e.$set(e.user, "line", t.target.value)
                        }
                    }
                })]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("line")))])]) : e._e(), e.showwhatsapp ? t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text",
                    class: {
                        isRequire: e.whatsappValid.required
                    }
                }, [e._v(" " + e._s(e.$t("in_increase_qqNum")) + " ")]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("whatsapp")))])]), t("div", {
                    staticClass: "item_box"
                }, [t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.user.whatsapp,
                        expression: "user.whatsapp"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: e.whatsappValid.required,
                            whatsapp: !0
                        },
                        expression: "{ required: whatsappValid.required, whatsapp: true }"
                    }],
                    class: {
                        hasError: e.errors.has("whatsapp")
                    },
                    attrs: {
                        type: "text",
                        name: "whatsapp",
                        autocomplete: "off",
                        placeholder: e.getPlaceHolder("whatsapp", e.$t("in_increase_whatsapp"))
                    },
                    domProps: {
                        value: e.user.whatsapp
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || e.$set(e.user, "whatsapp", t.target.value)
                        }
                    }
                })]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("whatsapp")))])]) : e._e(), e.showfacebook ? t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text",
                    class: {
                        isRequire: e.facebookValid.required
                    }
                }, [e._v(" " + e._s(e.$t("in_increase_facebook")) + " ")]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("facebook")))])]), t("div", {
                    staticClass: "item_box"
                }, [t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.user.facebook,
                        expression: "user.facebook"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: e.facebookValid.required,
                            facebook: !0
                        },
                        expression: "{ required: facebookValid.required, facebook: true }"
                    }],
                    class: {
                        hasError: e.errors.has("facebook")
                    },
                    attrs: {
                        type: "text",
                        name: "facebook",
                        autocomplete: "off",
                        placeholder: e.getPlaceHolder("facebook", e.$t("in_increase_facebook"))
                    },
                    domProps: {
                        value: e.user.facebook
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || e.$set(e.user, "facebook", t.target.value)
                        }
                    }
                })]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("facebook")))])]) : e._e(), e.showwechat ? t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text",
                    class: {
                        isRequire: e.wechatValid.required
                    }
                }, [e._v(" " + e._s(e.$t("in_increase_wechat")) + " ")]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("wechat")))])]), t("div", {
                    staticClass: "item_box"
                }, [t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.user.wechat,
                        expression: "user.wechat"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: e.wechatValid.required,
                            wechat: !0
                        },
                        expression: "{ required: wechatValid.required, wechat: true }"
                    }],
                    class: {
                        hasError: e.errors.has("wechat")
                    },
                    attrs: {
                        type: "text",
                        name: "wechat",
                        autocomplete: "off",
                        placeholder: e.getPlaceHolder("wechat", e.$t("in_increase_wechat"))
                    },
                    domProps: {
                        value: e.user.wechat
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || e.$set(e.user, "wechat", t.target.value)
                        }
                    }
                })]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("wechat")))])]) : e._e(), e.showidNumber ? t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text",
                    class: {
                        isRequire: e.idNumberValid.required
                    }
                }, [e._v(" " + e._s(e.$t("in_increase_idNumber")) + " ")]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("idNumber")))])]), t("div", {
                    staticClass: "item_box"
                }, [t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.user.idNumber,
                        expression: "user.idNumber"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: e.idNumberValid.required,
                            idNumber: !0
                        },
                        expression: "{ required: idNumberValid.required, idNumber: true }"
                    }],
                    class: {
                        hasError: e.errors.has("idNumber")
                    },
                    attrs: {
                        type: "text",
                        name: "idNumber",
                        autocomplete: "off",
                        placeholder: e.getPlaceHolder("idNumber", e.$t("in_increase_idNumber"))
                    },
                    domProps: {
                        value: e.user.idNumber
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || e.$set(e.user, "idNumber", t.target.value)
                        }
                    }
                })]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("idNumber")))])]) : e._e(), e.showEmail ? t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text",
                    class: {
                        isRequire: e.emailValid.required
                    }
                }, [e._v(" " + e._s(e.$t("in_increase_emailInfo")) + " ")]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("email")))])]), t("div", {
                    staticClass: "item_box"
                }, [t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "form-icon-email"
                    }
                })], 1), t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.user.email,
                        expression: "user.email"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: e.emailValid.required,
                            email: !0
                        },
                        expression: "{ required: emailValid.required, email: true }"
                    }],
                    staticClass: "email_input",
                    attrs: {
                        type: "text",
                        name: "email",
                        autocomplete: "off",
                        placeholder: e.getPlaceHolder("email", e.$t("in_increase_emailInfo"))
                    },
                    domProps: {
                        value: e.user.email
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || e.$set(e.user, "email", t.target.value)
                        }
                    }
                })]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("email")))])]) : e._e(), e.showRecommenderId ? t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text",
                    class: {
                        isRequire: e.recommenderIdValid.required
                    }
                }, [e._v(" " + e._s(e.$t("in_increase_recommenderId")) + " ")]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("recommenderId")))])]), t("div", {
                    staticClass: "item_box"
                }, [t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.user.recommenderId,
                        expression: "user.recommenderId"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: e.recommenderIdValid.required,
                            recommenderId: !0
                        },
                        expression: "{\n              required: recommenderIdValid.required,\n              recommenderId: true,\n            }"
                    }],
                    staticClass: "recommender_input",
                    attrs: {
                        type: "text",
                        name: "recommenderId",
                        autocomplete: "off",
                        placeholder: e.getPlaceHolder("recommenderId", e.$t("in_increase_recommenderId"))
                    },
                    domProps: {
                        value: e.user.recommenderId
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || e.$set(e.user, "recommenderId", t.target.value)
                        }
                    }
                })]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("recommenderId")))])]) : e._e(), e.hasAffiliate ? t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text",
                    class: {
                        isRequire: e.affiliateCodeValid.required
                    }
                }, [e._v(" " + e._s(e.$t("in_increase_affiliateCode")) + " ")]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("affiliateCode")))])]), t("div", {
                    staticClass: "item_box hasIcon"
                }, [t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "form-icon-invitation"
                    }
                })], 1), t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.user.affiliateCode,
                        expression: "user.affiliateCode"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: e.affiliateCodeValid.required,
                            affiliateCode: !0
                        },
                        expression: "{\n              required: affiliateCodeValid.required,\n              affiliateCode: true,\n            }"
                    }],
                    staticClass: "affiliateCode_input",
                    attrs: {
                        type: "text",
                        name: "affiliateCode",
                        autocomplete: "off",
                        placeholder: e.getPlaceHolder("affiliateCode", e.$t("in_increase_affiliateCode"))
                    },
                    domProps: {
                        value: e.user.affiliateCode
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || e.$set(e.user, "affiliateCode", t.target.value)
                        }
                    }
                })]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("affiliateCode")))])]) : e._e(), e.showCaptcha ? t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text",
                    class: {
                        isRequire: e.captchaValid.required
                    }
                }, [e._v(" " + e._s(e.$t("in_increase_captcha")) + " ")]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("captcha")))])]), t("div", {
                    staticClass: "item_box capt hasIcon"
                }, [t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "form-icon-verify"
                    }
                })], 1), t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.user.captcha,
                        expression: "user.captcha"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: e.captchaValid.required
                        },
                        expression: "{ required: captchaValid.required }"
                    }],
                    staticClass: "captcha_input",
                    attrs: {
                        id: "captcha_input",
                        name: "captcha",
                        placeholder: "".concat(e.$t("in_increase_captcha")),
                        type: "text"
                    },
                    domProps: {
                        value: e.user.captcha
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || e.$set(e.user, "captcha", t.target.value)
                        }
                    }
                }), t("span", {
                    staticClass: "captcha_box",
                    on: {
                        click: e.changeCaptcha
                    }
                }, [t("img", {
                    attrs: {
                        src: e.captchaSrc,
                        alt: ""
                    }
                })])]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("captcha")))])]) : e._e(), t("div", {
                    staticClass: "form_item terms"
                }, [t("div", {
                    staticClass: "terms_box",
                    class: {
                        checked: e.termsUserPass
                    }
                }, [t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.termsUserPass,
                        expression: "termsUserPass"
                    }],
                    staticClass: "terms_checkbox",
                    attrs: {
                        type: "checkbox"
                    },
                    domProps: {
                        checked: Array.isArray(e.termsUserPass) ? e._i(e.termsUserPass, null) > -1 : e.termsUserPass
                    },
                    on: {
                        change: function(t) {
                            var n = e.termsUserPass
                              , a = t.target
                              , i = !!a.checked;
                            if (Array.isArray(n)) {
                                var o = null
                                  , s = e._i(n, o);
                                a.checked ? s < 0 && (e.termsUserPass = n.concat([o])) : s > -1 && (e.termsUserPass = n.slice(0, s).concat(n.slice(s + 1)))
                            } else
                                e.termsUserPass = i
                        }
                    }
                }), t("span", {
                    staticClass: "cheched-bg"
                }), t("span", {
                    staticClass: "gougou"
                })]), t("span", [e._v(" " + e._s(e.$t("local_terms_content")) + " "), t("span", {
                    staticClass: "link",
                    on: {
                        click: e.handleTermClick
                    }
                }, [e._v(e._s(e.$t("local_terms_link")))])]), e.termsCheck ? t("p", {
                    staticClass: "errorMsg"
                }, [e._v("not empty?")]) : e._e()]), t("div", {
                    staticClass: "form_item btn-wrap"
                }, [t("button", {
                    staticClass: "submit_btn hover",
                    attrs: {
                        type: "submit"
                    }
                }, [e._v(e._s(e.$t("hd_sign_button")))])])], 2), e.firebase ? t("div", {
                    staticClass: "firebase-login"
                }, [t("div", {
                    staticClass: "tips"
                }, [t("span", {
                    staticClass: "or-connect"
                }, [e._v(e._s(e.$t("local_login_way")))])]), t("div", {
                    staticClass: "firebase-group"
                }, [e.firebaseFacebook ? t("span", {
                    staticClass: "item facebook",
                    on: {
                        click: function(t) {
                            return e.loginByFirebaseDelegate("facebook")
                        }
                    }
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "facebook-m"
                    }
                })], 1) : e._e(), e.firebaseGoogle ? t("span", {
                    staticClass: "item google",
                    on: {
                        click: function(t) {
                            return e.loginByFirebaseDelegate("google")
                        }
                    }
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "google-m"
                    }
                })], 1) : e._e()])]) : e._e()])])
            }
              , te = []
              , ne = n(15261)
              , ae = [{
                type: "register",
                key: "USERNAMEREG3",
                label: "in_register_user"
            }, {
                type: "registerMobile",
                key: "MOBILENUMREG3",
                label: "in_register_mobile"
            }]
              , ie = {
                name: "register",
                components: {
                    CountryCode: u.O4
                },
                mixins: [I, u.vE.firebaseMixins, u.vE.geetestMixins],
                data: function() {
                    return {
                        regType: "register",
                        isAgree: !0,
                        showAffiliateCode: !1,
                        user: {
                            username: "",
                            password: "",
                            confirmPassword: "",
                            payeeName: "",
                            email: "",
                            qqNum: "",
                            mobileNum: "",
                            recommenderId: "",
                            captcha: "",
                            verificationCode: "",
                            affiliateCode: "",
                            paymentPassword: "",
                            line: "",
                            whatsapp: "",
                            facebook: "",
                            wechat: "",
                            idNumber: "",
                            referralCode: null,
                            domain: u.h.getCode().domain || ""
                        },
                        captchaSrc: "",
                        time: new Date,
                        canSendSms: !0,
                        countdown: 60,
                        urlInfo: u.h.getCode(),
                        countryDialingCode: void 0,
                        showPassword: !1,
                        showConfirmPassword: !1,
                        termsUserPass: !1,
                        termsCheck: !1
                    }
                },
                computed: {
                    whitelabelVal: function() {
                        return this.$store.state.Public.whitelabelVal
                    },
                    registerOption: function() {
                        var e = this;
                        return ae.filter((function(t) {
                            return !!e.whitelabelVal[t.key]
                        }
                        ))
                    },
                    hasAffiliate: function() {
                        return this.showAffiliateCode && this.affiliateCodeEnabled
                    },
                    verificationCodeVaild: function() {
                        var e = {
                            key: "verificationCode"
                        };
                        return e.acceptedPattern = this.mobileValid.acceptedPattern,
                        e.patternId = this.mobileValid.patternId,
                        e.maxLength = 255,
                        e.minLength = 0,
                        e.enabled = this.mobileValid.enabled,
                        e.required = this.mobileValid.required,
                        e.type = "text",
                        e
                    },
                    hasCountryCode: function() {
                        return this.showRegisterCountryCode
                    },
                    mobileRequired: function() {
                        return "registerMobile" === this.regType || !!this.regValid.mobileNum && this.regValid.mobileNum.required
                    },
                    showMobileRegPass: function() {
                        return this.whitelabelVal.MOBILENUMPASSREG3
                    },
                    smsEnabled: function() {
                        return "registerMobile" === this.regType || this.whitelabelVal.REGMOBVERF3
                    },
                    regValid: function() {
                        return this.$store.state.Login.validate
                    },
                    usernameValid: function() {
                        return this.regValid ? this.regValid.username : {}
                    },
                    passwordValid: function() {
                        return this.regValid ? this.regValid.password : {}
                    },
                    payeeNameValid: function() {
                        return this.regValid ? this.regValid.payeeName : {}
                    },
                    paymentPasswordValid: function() {
                        return this.regValid ? this.regValid.paymentPassword : {}
                    },
                    qqValid: function() {
                        return this.regValid ? this.regValid.qqNum : {}
                    },
                    lineValid: function() {
                        return this.regValid ? this.regValid.line : {}
                    },
                    whatsappValid: function() {
                        return this.regValid ? this.regValid.whatsapp : {}
                    },
                    facebookValid: function() {
                        return this.regValid ? this.regValid.facebook : {}
                    },
                    wechatValid: function() {
                        return this.regValid ? this.regValid.wechat : {}
                    },
                    idNumberValid: function() {
                        return this.regValid ? this.regValid.idNumber : {}
                    },
                    emailValid: function() {
                        return this.regValid ? this.regValid.email : {}
                    },
                    mobileValid: function() {
                        return this.regValid ? this.regValid.mobileNum : {}
                    },
                    affiliateCodeValid: function() {
                        return this.regValid ? this.regValid.affiliateCode : {}
                    },
                    captchaValid: function() {
                        return this.regValid ? this.regValid.captcha : {}
                    },
                    showPayeeName: function() {
                        return !!this.regValid.payeeName && this.regValid.payeeName.enabled
                    },
                    showQQ: function() {
                        return !!this.regValid.qqNum && this.regValid.qqNum.enabled
                    },
                    showEmail: function() {
                        return !!this.regValid.email && this.regValid.email.enabled
                    },
                    showMobile: function() {
                        return "registerMobile" === this.regType || !!this.regValid.mobileNum && this.regValid.mobileNum.enabled
                    },
                    showRecommenderId: function() {
                        return !!this.regValid.recommenderId && this.regValid.recommenderId.enabled
                    },
                    showCaptcha: function() {
                        return this.$store.state.Public.showCaptcha
                    },
                    showpaymentPassword: function() {
                        return !!this.regValid.paymentPassword && this.regValid.paymentPassword.enabled
                    },
                    showline: function() {
                        return !!this.regValid.line && this.regValid.line.enabled
                    },
                    showwhatsapp: function() {
                        return !!this.regValid.whatsapp && this.regValid.whatsapp.enabled
                    },
                    showfacebook: function() {
                        return !!this.regValid.facebook && this.regValid.facebook.enabled
                    },
                    showwechat: function() {
                        return !!this.regValid.wechat && this.regValid.wechat.enabled
                    },
                    showidNumber: function() {
                        return !!this.regValid.idNumber && this.regValid.idNumber.enabled
                    },
                    affiliateCodeEnabled: function() {
                        return !!this.regValid.affiliateCode && this.regValid.affiliateCode.enabled
                    }
                },
                methods: {
                    getConfig: function() {
                        var e = this.whitelabelVal.MOBILENUMREG3;
                        this.regType = e ? "registerMobile" : "register"
                    },
                    setCountryCode: function(e) {
                        this.countryDialingCode = e
                    },
                    hideModal: function() {
                        this.$modal.hide("registerModal")
                    },
                    goToPage: function(e) {
                        this.$router.push(e)
                    },
                    getPlaceHolder: function(e, t) {
                        return t
                    },
                    reset: function() {
                        for (var e in this.user)
                            "countryDialingCode" !== e && (this.user[e] = null)
                    },
                    getErrorMsg: function(e) {
                        return e.minLength === e.maxLength ? this.$t("reg_pattern_".concat(e.patternId)).replace("(min) - (max)", e.minLength) : this.$t("reg_pattern_".concat(e.patternId)).replace("(min)", e.minLength).replace("(max)", e.maxLength)
                    },
                    getRequired: function(e) {
                        return !(!this.regValid[e] || !this.regValid[e].required)
                    },
                    submitRegister: function() {
                        var e = this;
                        if (!this.termsUserPass)
                            return this.termsCheck = !0;
                        this.termsCheck = !1,
                        this.$validator.validateAll().then((function(t) {
                            t && (e.showAffiliateCode || (e.user.affiliateCode = e.urlInfo.code),
                            e.doAffiliate())
                        }
                        ))
                    },
                    doAffiliate: function() {
                        var e = this;
                        this.hasAffiliate && this.user.affiliateCode ? (this.cover.loader(!0),
                        this.$store.dispatch("affiliate", {
                            data: {
                                code: this.user.affiliateCode,
                                domain: this.urlInfo.domain
                            }
                        }).then((function(t) {
                            t.success ? e.registerMethod() : e.cover.init({
                                html: e.$i18n.t("invitation_code_error"),
                                icon: "warning",
                                btn: {
                                    confirm: e.$i18n.t("in_increase_submit")
                                }
                            })
                        }
                        )).finally((function() {
                            return e.cover.loader(!1)
                        }
                        ))) : this.registerMethod()
                    },
                    registerMethod: function() {
                        var e = this;
                        return (0,
                        i.A)((0,
                        a.A)().mark((function t() {
                            var n, i, o;
                            return (0,
                            a.A)().wrap((function(t) {
                                while (1)
                                    switch (t.prev = t.next) {
                                    case 0:
                                        return "registerMobile" === e.regType && (e.user.username = e.user.mobileNum),
                                        e.user.confirmPassword = e.user.password,
                                        e.cover.loader(!0),
                                        t.next = 5,
                                        e.geetestVerify("register");
                                    case 5:
                                        if (n = t.sent,
                                        i = (0,
                                        p.A)((0,
                                        p.A)((0,
                                        p.A)({}, e.user), n), {}, {
                                            login: !0
                                        }),
                                        i.countryDialingCode = e.countryDialingCode,
                                        !e.smsEnabled || !e.firebaseSms) {
                                            t.next = 16;
                                            break
                                        }
                                        return t.next = 11,
                                        e.verifyCodeByFirebase(e.user.verificationCode);
                                    case 11:
                                        if (o = t.sent,
                                        o) {
                                            t.next = 14;
                                            break
                                        }
                                        return t.abrupt("return", !1);
                                    case 14:
                                        i.firebaseChannel = "sms",
                                        i.firebaseIdToken = o;
                                    case 16:
                                        e.$store.dispatch(e.regType, {
                                            data: i
                                        }).then((function(t) {
                                            e.$store.dispatch("loginInfo", t.value).then((function(t) {
                                                e.cover.loader(!1),
                                                e.$modal.hide("registerModal"),
                                                e.$router.push("/")
                                            }
                                            ))
                                        }
                                        ));
                                    case 17:
                                    case "end":
                                        return t.stop()
                                    }
                            }
                            ), t)
                        }
                        )))()
                    },
                    loginByFirebaseDelegate: function(e) {
                        var t = this;
                        this.loginOrRegister({
                            channel: e,
                            showLoginModal: function() {
                                t.$modal.show("loginPopupModal")
                            },
                            afterLogin: this.handleAfterLogin,
                            showLoading: function(e) {
                                return t.cover.loader(e)
                            }
                        })
                    },
                    handleAfterLogin: function(e) {
                        var t = this
                          , n = e.formData
                          , a = e.res;
                        if (n && a) {
                            var i = a.value
                              , o = i.firstTimeLogin
                              , s = i.token;
                            sessionStorage.setItem("token", s),
                            o && this.$store.dispatch("firstLogin"),
                            this.$modal.hide("registerModal"),
                            this.$store.dispatch("loginInfo", a.value).then((function(e) {
                                t.cover.loader(!1)
                            }
                            ))
                        }
                    },
                    getSms: function() {
                        var e = this
                          , t = {
                            countryDialingCode: this.countryDialingCode,
                            mobileNo: this.user.mobileNum
                        };
                        this.$validator.validate("mobileNum").then(function() {
                            var n = (0,
                            i.A)((0,
                            a.A)().mark((function n(i) {
                                var o, s, r;
                                return (0,
                                a.A)().wrap((function(n) {
                                    while (1)
                                        switch (n.prev = n.next) {
                                        case 0:
                                            if (!i) {
                                                n.next = 14;
                                                break
                                            }
                                            if (e.cover.loader(!0),
                                            !e.firebaseSms) {
                                                n.next = 10;
                                                break
                                            }
                                            return o = "+".concat(e.countryDialingCode),
                                            n.next = 6,
                                            e.sendCodeByFirebase(o, e.user.mobileNum);
                                        case 6:
                                            return s = n.sent,
                                            s && e.startCountDown(1),
                                            e.cover.loader(!1),
                                            n.abrupt("return");
                                        case 10:
                                            return n.next = 12,
                                            e.geetestVerify("sms");
                                        case 12:
                                            r = n.sent,
                                            e.$store.dispatch("sendRegPhoneCode", {
                                                data: (0,
                                                p.A)((0,
                                                p.A)({}, t), r),
                                                regType: e.regType
                                            }).then((function(t) {
                                                t.success ? e.startCountDown(t.value.expiredMinutes) : e.cover.init({
                                                    html: t.message,
                                                    icon: "warning",
                                                    btn: {
                                                        confirm: e.$i18n.t("in_increase_submit")
                                                    }
                                                })
                                            }
                                            )).finally((function() {
                                                e.cover.loader(!1)
                                            }
                                            ));
                                        case 14:
                                        case "end":
                                            return n.stop()
                                        }
                                }
                                ), n)
                            }
                            )));
                            return function(e) {
                                return n.apply(this, arguments)
                            }
                        }())
                    },
                    startCountDown: function(e) {
                        var t = this;
                        this.canSendSms = !1,
                        this.countdown = 60 * e,
                        this.timer = setInterval((function() {
                            t.countdown--,
                            t.countdown <= 0 && (t.canSendSms = !0,
                            clearInterval(t.timer))
                        }
                        ), 1e3)
                    },
                    getCaptcha: function() {
                        var e = this;
                        this.$store.dispatch("captcha").then((function(t) {
                            t.success && (e.captchaSrc = "data:image/png;base64," + t.value)
                        }
                        ))
                    },
                    changeCaptcha: function() {
                        var e = new Date;
                        e - this.time > 1e3 && (this.getCaptcha(),
                        this.time = e)
                    },
                    loginTabChange: function(e) {
                        this.regType = e,
                        this.getCaptcha()
                    },
                    userProtocol: function() {
                        this.$modal.hide("registerModal"),
                        this.$router.push("/help")
                    },
                    checkAffiliate: function() {
                        var e = this;
                        this.$store.dispatch("affiliate", {
                            data: this.urlInfo
                        }).then((function(t) {
                            t.success ? e.showAffiliateCode = !1 : e.showAffiliateCode = !0
                        }
                        ))
                    },
                    forgetPassword: function() {
                        this.$modal.hide("registerModal"),
                        this.$modal.show("forgetPassModal")
                    },
                    handleTermClick: function() {
                        this.$modal.hide("registerModal"),
                        this.$router.push("/help#term"),
                        this.$modal.show("helpModal")
                    }
                },
                beforeMount: function() {
                    var e = this.$route.query.referralCode;
                    e && (this.user.referralCode = e)
                },
                created: function() {},
                mounted: function() {
                    this.showCaptcha && this.getCaptcha(),
                    this.urlInfo.code ? this.checkAffiliate() : this.showAffiliateCode = !0,
                    this.getConfig()
                }
            }
              , oe = ie
              , se = (0, _.A)(oe, ee, te, !1, null, null, null)
              , re = se.exports
              , ce = {
                name: "registerPopup",
                components: {
                    RegisterForm: re,
                    CommonLogo: u.fA
                },
                computed: {
                    banners: function() {
                        var e, t = (null === (e = this.$store.state.Public.banners) || void 0 === e ? void 0 : e.find((function(e) {
                            return "w_register" === e.groupName
                        }
                        ))) || {};
                        return t
                    }
                },
                methods: {
                    goLogin: function() {
                        this.$modal.show("loginPopupModal"),
                        this.$modal.hide("registerModal")
                    }
                }
            }
              , le = ce
              , ue = (0, _.A)(le, X, $, !1, null, null, null)
              , de = ue.exports
              , me = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "form-popup-container"
                }, [t("div", {
                    staticClass: "form-popup-bg"
                }, [t("div", {
                    staticClass: "form-title"
                }, [t("h5", [e._v(e._s(e.$t("in_change_expired")))]), t("p", [e._v(e._s(e.$t("in_changing_security")))])]), t("div", {
                    staticClass: "form_container"
                }, [t("form", {
                    on: {
                        submit: function(t) {
                            return t.preventDefault(),
                            e.changePwd.apply(null, arguments)
                        }
                    }
                }, [e.userInfo.userName ? t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "item_box hasIcon"
                }, [t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "form-icon-name"
                    }
                })], 1), t("input", {
                    attrs: {
                        disabled: "",
                        readonly: "",
                        name: "password",
                        type: "text"
                    },
                    domProps: {
                        value: e.userInfo.userName
                    }
                })]), t("p", {
                    staticClass: "errorMsg"
                })]) : e._e(), e.userInfo.password ? e._e() : t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text"
                }, [e._v(e._s(e.$t("in_please_password")))])]), t("div", {
                    staticClass: "item_box hasIcon"
                }, [t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "form-icon-password"
                    }
                })], 1), t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.oldPassword,
                        expression: "oldPassword"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0
                        },
                        expression: "{ required: true }"
                    }],
                    attrs: {
                        name: "password",
                        type: "password",
                        autocomplete: "new-password",
                        placeholder: e.$t("in_please_password")
                    },
                    domProps: {
                        value: e.oldPassword
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || (e.oldPassword = t.target.value)
                        }
                    }
                })]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("password")))])]), t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text"
                }, [e._v(e._s(e.$t("enter_new_password")))])]), t("div", {
                    staticClass: "item_box hasIcon"
                }, [t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "form-icon-password"
                    }
                })], 1), t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.password,
                        expression: "password"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0,
                            password: !0
                        },
                        expression: "{ required: true, password: true }"
                    }],
                    attrs: {
                        name: "password",
                        type: "password",
                        autocomplete: "new-password",
                        placeholder: e.$t("enter_new_password")
                    },
                    domProps: {
                        value: e.password
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || (e.password = t.target.value)
                        }
                    }
                })]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("password")))])]), t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text"
                }, [e._v(e._s(e.$t("enter_new_password")))])]), t("div", {
                    staticClass: "item_box hasIcon"
                }, [t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "form-icon-password"
                    }
                })], 1), t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.confirm,
                        expression: "confirm"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0,
                            checkPass: !0
                        },
                        expression: "{ required: true, checkPass: true }"
                    }],
                    class: {
                        hasError: e.errors.has("checkPass")
                    },
                    attrs: {
                        name: "checkPass",
                        type: "password",
                        autocomplete: "new-password",
                        placeholder: e.$t("enter_new_password")
                    },
                    domProps: {
                        value: e.confirm
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || (e.confirm = t.target.value)
                        }
                    }
                })]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("checkPass")))])]), t("div", {
                    staticClass: "form_item btn-wrap"
                }, [t("button", {
                    staticClass: "submit_btn",
                    attrs: {
                        type: "submit"
                    }
                }, [e._v(e._s(e.$t("in_increase_submit")))])])])])])])
            }
              , pe = []
              , ge = (n(42018),
            {
                name: "changePwd",
                data: function() {
                    return {
                        oldPassword: "",
                        password: "",
                        confirm: "",
                        info: ""
                    }
                },
                created: function() {
                    var e = this;
                    ne.Dr.extend("checkPass", {
                        validate: function(t) {
                            return t === e.password
                        }
                    })
                },
                computed: {
                    regValid: function() {
                        return this.$store.state.Login.validate
                    },
                    userInfo: function() {
                        var e = this.$store.state.Login.userInfo
                          , t = void 0 === e ? {} : e;
                        return t
                    }
                },
                methods: {
                    changePwd: function() {
                        var e = this;
                        this.$validator.validateAll().then((function(t) {
                            t && (e.cover.loader(!0),
                            e.$store.dispatch("changePassword", {
                                data: {
                                    oldPassword: e.userInfo.password || e.oldPassword,
                                    newPassword: e.password,
                                    confirmNewPassword: e.confirm
                                }
                            }).then((function(t) {
                                t.success && e.$store.dispatch("loginInfo", e.userInfo).then((function(t) {
                                    e.$modal.hide("changePassModal"),
                                    e.cover.loader(!1),
                                    e.$router.push("/")
                                }
                                ))
                            }
                            )))
                        }
                        ))
                    }
                }
            })
              , fe = ge
              , ve = (0, _.A)(fe, me, pe, !1, null, null, null)
              , he = ve.exports
              , we = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "form-popup-container"
                }, [e.banners.url ? t("img", {
                    staticClass: "form-popup-banner",
                    attrs: {
                        src: e.banners.url,
                        alt: ""
                    }
                }) : e._e(), t("div", {
                    staticClass: "form-popup-bg"
                }, [t("div", {
                    staticClass: "form-title"
                }, [t("CommonLogo", {
                    staticClass: "form-logo",
                    attrs: {
                        src: n(65549)
                    }
                }), t("h5", [e._v(e._s(e.$t("in_retrieve_password")))]), t("p", [e._v(e._s(e.$t("in_please_ways")))])], 1), e.showPhoneMethod ? t("div", {
                    staticClass: "method-select"
                }, [e._l(e.forgetOption, (function(n) {
                    return [t("span", {
                        key: n.type,
                        class: ["method-item", {
                            active: e.forgetPwdType === n.type
                        }],
                        on: {
                            click: function(t) {
                                return e.setForgetPwdType(n.type)
                            }
                        }
                    }, [e._v(" " + e._s(e.$t(n.label)) + " ")])]
                }
                ))], 2) : e._e(), t("div", {
                    staticClass: "form_container"
                }, ["email" === e.forgetPwdType ? [t("form", {
                    on: {
                        submit: function(t) {
                            return t.preventDefault(),
                            e.revicePasswordByEmail.apply(null, arguments)
                        }
                    }
                }, [t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text"
                }, [e._v(e._s(e.$t("in_increase_username")))])]), t("div", {
                    staticClass: "item_box hasIcon"
                }, [t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "form-icon-name"
                    }
                })], 1), t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.account,
                        expression: "account"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0,
                            username: !0
                        },
                        expression: "{ required: true, username: true }"
                    }],
                    staticClass: "input_username",
                    attrs: {
                        type: "text",
                        name: "username",
                        autocomplete: "off",
                        placeholder: e.$t("in_please_username")
                    },
                    domProps: {
                        value: e.account
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || (e.account = t.target.value)
                        }
                    }
                })]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("username")))])]), t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text"
                }, [e._v(e._s(e.$t("in_increase_email")))])]), t("div", {
                    staticClass: "item_box hasIcon"
                }, [t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "form-icon-email"
                    }
                })], 1), t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.email,
                        expression: "email"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0,
                            email: !0
                        },
                        expression: "{ required: true, email: true }"
                    }],
                    staticClass: "input_password",
                    attrs: {
                        type: "text",
                        name: "email",
                        autocomplete: "off",
                        placeholder: e.$t("in_increase_email")
                    },
                    domProps: {
                        value: e.email
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || (e.email = t.target.value)
                        }
                    }
                })]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("email")))])]), t("div", {
                    staticClass: "form_item btn-wrap"
                }, [t("button", {
                    staticClass: "submit_btn",
                    attrs: {
                        type: "submit"
                    }
                }, [e._v(e._s(e.$t("in_increase_submit")))])])])] : e._e(), "mobileNum" === e.forgetPwdType ? [t("form", {
                    key: "mobileNum",
                    on: {
                        submit: function(t) {
                            return t.preventDefault(),
                            e.setPswByPhone.apply(null, arguments)
                        }
                    }
                }, [t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text"
                }, [e._v(e._s(e.$t("in_increase_mobileNum")))])]), t("div", {
                    staticClass: "item_box",
                    class: {
                        hasCountry: e.showLoginCountryCode
                    }
                }, [e.showLoginCountryCode ? t("CountryCode", {
                    on: {
                        setCountryCode: e.setCountryCode
                    }
                }) : e._e(), t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "form-icon-phone"
                    }
                })], 1), t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.mobileNum,
                        expression: "mobileNum"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0,
                            mobileNum: !0
                        },
                        expression: "{ required: true, mobileNum: true }"
                    }],
                    staticClass: "phone_input",
                    attrs: {
                        type: "text",
                        name: "mobileNum",
                        autocomplete: "off",
                        placeholder: e.$t("in_increase_mobileNum")
                    },
                    domProps: {
                        value: e.mobileNum
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || (e.mobileNum = t.target.value)
                        }
                    }
                })], 1), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("mobileNum")))])]), t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text"
                }, [e._v(e._s(e.$t("in_increase_verificationCode")))])]), t("div", {
                    staticClass: "item_box capt hasIcon"
                }, [t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "form-icon-sms"
                    }
                })], 1), t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.verificationCode,
                        expression: "verificationCode"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0
                        },
                        expression: "{ required: true }"
                    }],
                    staticClass: "captcha_input",
                    attrs: {
                        type: "text",
                        name: "sms",
                        spellcheck: "false",
                        autocomplete: "off",
                        placeholder: e.$t("in_increase_verificationCode")
                    },
                    domProps: {
                        value: e.verificationCode
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || (e.verificationCode = t.target.value)
                        }
                    }
                }), t("span", {
                    staticClass: "sms-btn",
                    class: [{
                        disabled: e.canSendTime > 0
                    }],
                    on: {
                        click: e.getPhoneCode
                    }
                }, [e._v(" " + e._s(e.canSendTime > 0 ? "".concat(e.canSendTime, " s") : "".concat(e.$t("in_get_verificationCode"))) + " ")])]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("sms")))])]), t("div", {
                    staticClass: "form_item"
                }, [t("div", {
                    staticClass: "label-box"
                }, [t("div", {
                    staticClass: "label-text"
                }, [e._v(e._s(e.$t("new_password")))])]), t("div", {
                    staticClass: "item_box hasIcon"
                }, [t("span", {
                    staticClass: "input_icon"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "form-icon-password"
                    }
                })], 1), "checkbox" === (e.showPassword ? "text" : "password") ? t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.newPassword,
                        expression: "newPassword"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0,
                            password: !0
                        },
                        expression: "{ required: true, password: true }"
                    }],
                    staticClass: "input_username",
                    attrs: {
                        autocomplete: "off",
                        placeholder: e.$t("new_password"),
                        type: "checkbox"
                    },
                    domProps: {
                        checked: Array.isArray(e.newPassword) ? e._i(e.newPassword, null) > -1 : e.newPassword
                    },
                    on: {
                        change: function(t) {
                            var n = e.newPassword
                              , a = t.target
                              , i = !!a.checked;
                            if (Array.isArray(n)) {
                                var o = null
                                  , s = e._i(n, o);
                                a.checked ? s < 0 && (e.newPassword = n.concat([o])) : s > -1 && (e.newPassword = n.slice(0, s).concat(n.slice(s + 1)))
                            } else
                                e.newPassword = i
                        }
                    }
                }) : "radio" === (e.showPassword ? "text" : "password") ? t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.newPassword,
                        expression: "newPassword"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0,
                            password: !0
                        },
                        expression: "{ required: true, password: true }"
                    }],
                    staticClass: "input_username",
                    attrs: {
                        autocomplete: "off",
                        placeholder: e.$t("new_password"),
                        type: "radio"
                    },
                    domProps: {
                        checked: e._q(e.newPassword, null)
                    },
                    on: {
                        change: function(t) {
                            e.newPassword = null
                        }
                    }
                }) : t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.newPassword,
                        expression: "newPassword"
                    }, {
                        name: "validate",
                        rawName: "v-validate",
                        value: {
                            required: !0,
                            password: !0
                        },
                        expression: "{ required: true, password: true }"
                    }],
                    staticClass: "input_username",
                    attrs: {
                        autocomplete: "off",
                        placeholder: e.$t("new_password"),
                        type: e.showPassword ? "text" : "password"
                    },
                    domProps: {
                        value: e.newPassword
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || (e.newPassword = t.target.value)
                        }
                    }
                }), t("span", {
                    staticClass: "password-eyes",
                    on: {
                        click: function(t) {
                            e.showPassword = !e.showPassword
                        }
                    }
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: e.showPassword ? "show-eyes-default" : "hide-eyes-default"
                    }
                })], 1)]), t("p", {
                    staticClass: "errorMsg"
                }, [e._v(e._s(e.errors.first("password")))])]), t("div", {
                    staticClass: "form_item btn-wrap"
                }, [t("button", {
                    staticClass: "submit_btn",
                    attrs: {
                        type: "submit"
                    }
                }, [e._v(" " + e._s(e.$t("in_increase_submit")) + " ")])])])] : e._e()], 2)])])
            }
              , Ce = []
              , be = {
                name: "forgetPwd",
                mixins: [I, u.vE.firebaseMixins, u.vE.geetestMixins],
                components: {
                    CountryCode: u.O4,
                    CommonLogo: u.fA
                },
                data: function() {
                    return {
                        forgetOption: [{
                            type: "email",
                            label: "in_increase_email"
                        }, {
                            type: "mobileNum",
                            label: "in_increase_mobileNum"
                        }],
                        forgetPwdType: "email",
                        account: "",
                        email: "",
                        mobileNum: "",
                        verificationCode: "",
                        newPassword: "",
                        canSendTime: 0,
                        countDownSmsInterval: null,
                        showPassword: !1
                    }
                },
                beforeDestroy: function() {
                    clearInterval(this.countDownSmsInterval),
                    this.countDownSmsInterval = null
                },
                computed: {
                    whitelabelVal: function() {
                        return this.$store.state.Public.whitelabelVal
                    },
                    showPhoneMethod: function() {
                        var e;
                        return null === (e = this.whitelabelVal) || void 0 === e ? void 0 : e.CHNGPASSVERIF3
                    },
                    banners: function() {
                        var e, t = (null === (e = this.$store.state.Public.banners) || void 0 === e ? void 0 : e.find((function(e) {
                            return "w_forget" === e.groupName
                        }
                        ))) || {};
                        return t
                    }
                },
                methods: {
                    getConfig: function() {
                        var e = this.whitelabelVal.CHNGPASSVERIF3;
                        this.forgetPwdType = e ? "mobileNum" : "email"
                    },
                    setCountryCode: function(e) {
                        this.countryDialingCode = e
                    },
                    setForgetPwdType: function(e) {
                        this.forgetPwdType = e
                    },
                    revicePasswordByEmail: function() {
                        var e = this
                          , t = this.$t("in_been_out")
                          , n = this.$t("in_increase_submit");
                        this.$validator.validateAll().then((function(a) {
                            a && (e.cover.loader(!0),
                            e.$store.dispatch("forgetPassword", {
                                data: {
                                    username: e.account,
                                    email: e.email
                                },
                                heards: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                }
                            }).then((function(a) {
                                a.success && e.cover.init({
                                    html: t,
                                    btn: {
                                        confirm: n
                                    }
                                }),
                                e.cover.loader(!1),
                                e.$modal.hide("forgetPassModal")
                            }
                            )))
                        }
                        ))
                    },
                    getPhoneCode: function() {
                        var e = this
                          , t = this.mobileNum;
                        this.$validator.validateAll({
                            mobileNum: t
                        }).then(function() {
                            var n = (0,
                            i.A)((0,
                            a.A)().mark((function n(o) {
                                var s, r, c;
                                return (0,
                                a.A)().wrap((function(n) {
                                    while (1)
                                        switch (n.prev = n.next) {
                                        case 0:
                                            if (o) {
                                                n.next = 2;
                                                break
                                            }
                                            return n.abrupt("return");
                                        case 2:
                                            if (!(e.canSendTime > 0)) {
                                                n.next = 4;
                                                break
                                            }
                                            return n.abrupt("return", !1);
                                        case 4:
                                            return n.next = 6,
                                            e.geetestVerify("sms");
                                        case 6:
                                            s = n.sent,
                                            r = {
                                                data: (0,
                                                p.A)({
                                                    mobileNum: t,
                                                    countryDialingCode: e.countryDialingCode
                                                }, s)
                                            },
                                            c = (new Date).getTime(),
                                            e.$store.dispatch("getLoginCode", r).then(function() {
                                                var t = (0,
                                                i.A)((0,
                                                a.A)().mark((function t(n) {
                                                    var i;
                                                    return (0,
                                                    a.A)().wrap((function(t) {
                                                        while (1)
                                                            switch (t.prev = t.next) {
                                                            case 0:
                                                                if (!n.success) {
                                                                    t.next = 10;
                                                                    break
                                                                }
                                                                if (!e.firebaseSms) {
                                                                    t.next = 7;
                                                                    break
                                                                }
                                                                return t.next = 4,
                                                                e.sendCodeByFirebase("+".concat(e.countryDialingCode), e.mobileNum);
                                                            case 4:
                                                                return i = t.sent,
                                                                i && e.countDownSms(c),
                                                                t.abrupt("return");
                                                            case 7:
                                                                e.countDownSms(c, n.value.expiredMinutes),
                                                                t.next = 11;
                                                                break;
                                                            case 10:
                                                                e.cover.init({
                                                                    html: n.message,
                                                                    icon: "warning",
                                                                    btn: {
                                                                        confirm: e.$t("in_increase_submit")
                                                                    }
                                                                });
                                                            case 11:
                                                            case "end":
                                                                return t.stop()
                                                            }
                                                    }
                                                    ), t)
                                                }
                                                )));
                                                return function(e) {
                                                    return t.apply(this, arguments)
                                                }
                                            }());
                                        case 10:
                                        case "end":
                                            return n.stop()
                                        }
                                }
                                ), n)
                            }
                            )));
                            return function(e) {
                                return n.apply(this, arguments)
                            }
                        }())
                    },
                    countDownSms: function(e) {
                        var t = this
                          , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1
                          , a = 60 * n
                          , i = (new Date).getTime()
                          , o = (i - e) / 2
                          , s = i + 1e3 * a - o;
                        this.canSendTime = Math.floor((s - i) / 1e3),
                        this.countDownSmsInterval = setInterval((function() {
                            a = Math.floor((s - (new Date).getTime()) / 1e3),
                            a <= 0 ? (clearInterval(t.countDownSmsInterval),
                            t.countDownSmsInterval = void 0,
                            t.canSendTime = 0) : t.canSendTime = a
                        }
                        ), 1e3)
                    },
                    setPswByPhone: function() {
                        var e = this;
                        this.$validator.validateAll({
                            mobileNum: this.mobileNum,
                            password: this.newPassword,
                            sms: this.verificationCode
                        }).then((function(t) {
                            if (t) {
                                var n = {
                                    newPassword: e.newPassword,
                                    mobileNum: e.mobileNum,
                                    verificationCode: e.verificationCode
                                };
                                e.$store.dispatch("getPasswordByPhone", {
                                    data: n
                                }).then(function() {
                                    var t = (0,
                                    i.A)((0,
                                    a.A)().mark((function t(n) {
                                        var i;
                                        return (0,
                                        a.A)().wrap((function(t) {
                                            while (1)
                                                switch (t.prev = t.next) {
                                                case 0:
                                                    if (!n) {
                                                        t.next = 6;
                                                        break
                                                    }
                                                    return e.cover.loader(!0),
                                                    t.next = 4,
                                                    e.geetestVerify("login");
                                                case 4:
                                                    i = t.sent,
                                                    e.$store.dispatch("login", {
                                                        data: (0,
                                                        p.A)({
                                                            username: e.mobileNum.replace(/^\s+|\s+$/g, ""),
                                                            password: e.newPassword,
                                                            type: ""
                                                        }, i)
                                                    }).then((function(t) {
                                                        e.$store.dispatch("loginInfo", t.value).then((function(t) {
                                                            e.cover.loader(!1),
                                                            e.$modal.hide("forgetPassModal"),
                                                            e.$router.push("/")
                                                        }
                                                        ))
                                                    }
                                                    ));
                                                case 6:
                                                case "end":
                                                    return t.stop()
                                                }
                                        }
                                        ), t)
                                    }
                                    )));
                                    return function(e) {
                                        return t.apply(this, arguments)
                                    }
                                }())
                            }
                        }
                        ))
                    }
                },
                mounted: function() {
                    this.getConfig()
                }
            }
              , _e = be
              , Ae = (0, _.A)(_e, we, Ce, !1, null, null, null)
              , ye = Ae.exports
              , Pe = (n(62010),
            function() {
                var e = this
                  , t = e._self._c;
                return e.loaded ? t("div", {
                    staticClass: "br_acmc_body"
                }, [t("div", {
                    staticClass: "acmc_content"
                }, [t("div", {
                    staticClass: "br_acmc_main"
                }, [t("div", {
                    staticClass: "br_acmc_mleft"
                }, [t("div", {
                    staticClass: "br_acmc_mltitle"
                }, [e._v(e._s(e.$t("hd_agent")))]), t("ul", {
                    staticClass: "br_acmc_mlnav"
                }, e._l(e.menu, (function(n, a) {
                    return t("li", {
                        key: a,
                        class: e.active === n.page ? "active" : "",
                        attrs: {
                            "data-pagemodal": n.data
                        },
                        on: {
                            click: function(t) {
                                return e.selectPage(n.page)
                            }
                        }
                    }, [t("i", {
                        staticClass: "acmc_icon",
                        class: "icon_" + n.page
                    }), t("span", [e._v(e._s(n.name))])])
                }
                )), 0)]), t("div", {
                    staticClass: "br_acmc_mright",
                    attrs: {
                        id: "br_proxy_right"
                    }
                })]), t("div", {
                    staticClass: "close_btn",
                    on: {
                        click: e.closeAc
                    }
                })])]) : e._e()
            }
            )
              , ke = []
              , Me = {
                name: "agent",
                setup: function() {
                    var e = (0,
                    h.s9)()
                      , t = e.t
                      , n = [{
                        name: t("in_increase_announcement"),
                        page: "agentAnnouncement",
                        data: "agentCenter/agentAnnouncement"
                    }, {
                        name: t("in_increase_overview"),
                        page: "agentTeamOverview",
                        data: "agentCenter/agentTeamOverview"
                    }, {
                        name: t("in_increase_account"),
                        page: "registerCenter",
                        data: "agentCenter/registerCenter"
                    }, {
                        name: t("in_team_management"),
                        page: "downlineManagmentView",
                        data: "agentCenter/downlineManagmentView"
                    }, {
                        name: t("in_team_betting"),
                        page: "personalHistoryCopy",
                        data: "agentCenter/personalHistoryCopy"
                    }, {
                        name: t("in_user_loss"),
                        page: "palStatementsAgentCopy",
                        data: "agentCenter/palStatementsAgentCopy"
                    }, {
                        name: t("in_my_income"),
                        page: "agentRevenueReport",
                        data: "agentCenter/agentRevenueReport"
                    }, {
                        name: t("in_account_details"),
                        page: "agentDownlineTransactionDetailsCopy",
                        data: "agentCenter/agentDownlineTransactionDetailsCopy"
                    }, {
                        name: t("in_bonus_bmwmuf"),
                        page: "agentDividendRecordCopy2",
                        data: "agentCenter/agentDividendRecord2",
                        type: "enableCt"
                    }, {
                        name: t("in_daily_hdtmkj"),
                        page: "agentDailyWages2",
                        data: "agentCenter/agentDailyWages2",
                        type: "salary"
                    }, {
                        name: t("in_hourly_salary"),
                        page: "agentHourSalary",
                        data: "agentCenter/agentHourSalary",
                        type: "hourSalary"
                    }, {
                        name: t("real_time_salary_menu"),
                        page: "agentRealtimeSalary",
                        data: "agentCenter/agentRealtimeSalary",
                        type: "agentRealtimeSalary"
                    }]
                      , a = (0,
                    h.ME)(n)
                      , i = a.acMenu
                      , o = a.loaded
                      , s = a.activeAcPage
                      , r = a.selectAcPage
                      , c = a.closeAc;
                    return {
                        loaded: o,
                        menu: i,
                        active: s,
                        selectPage: r,
                        closeAc: c
                    }
                }
            }
              , xe = Me
              , Le = (0, _.A)(xe, Pe, ke, !1, null, null, null)
              , Se = Le.exports
              , Ne = function() {
                var e = this
                  , t = e._self._c;
                return e.loaded ? t("div", {
                    staticClass: "br_acmc_body"
                }, [t("div", {
                    staticClass: "acmc_content"
                }, [t("div", {
                    staticClass: "br_acmc_main"
                }, [t("div", {
                    staticClass: "br_acmc_mleft"
                }, [t("div", {
                    staticClass: "br_acmc_mltitle"
                }, [e._v(e._s(e.$t("in_personal_center")))]), t("ul", {
                    staticClass: "br_acmc_mlnav"
                }, [e._l(e.menu, (function(n, a) {
                    return [t("li", {
                        key: a,
                        class: e.active === n.page ? "active" : "",
                        attrs: {
                            "data-mc": n.page
                        },
                        on: {
                            click: function(t) {
                                return e.selectPage(n.page)
                            }
                        }
                    }, [t("i", {
                        staticClass: "acmc_icon",
                        class: "icon_" + n.page
                    }), "missionLeaderboard" === n.page && e.missionCount > 0 ? t("i", {
                        staticClass: "tip_fixd"
                    }, [e._v(e._s(e.missionCount))]) : e._e(), "messageV2" === n.page && e.messageCount > 0 ? t("i", {
                        staticClass: "tip_fixd"
                    }, [e._v(e._s(e.messageCount))]) : e._e(), "rewardCenter" === n.page && e.rewardCount > 0 ? t("i", {
                        staticClass: "tip_fixd"
                    }, [e._v(e._s(e.rewardCount))]) : e._e(), t("span", [e._v(e._s(e.$t(n.name)))])])]
                }
                ))], 2)]), t("div", {
                    staticClass: "br_acmc_mright",
                    attrs: {
                        id: "br_proxy_right"
                    }
                })]), t("div", {
                    staticClass: "close_btn",
                    on: {
                        click: e.closeMc
                    }
                })])]) : e._e()
            }
              , Te = []
              , Re = n(77337)
              , Oe = {
                name: "member",
                setup: function() {
                    var e = (0,
                    Re.qf)([{
                        name: "in_my_account",
                        page: "securityCenter"
                    }, {
                        name: "in_my_wallet",
                        page: "transferFund"
                    }, {
                        name: "in_increase_deposit",
                        page: "depositv2"
                    }, {
                        name: "in_increase_withdrawal",
                        page: "withdraw"
                    }, {
                        name: "in_transfer_upline",
                        page: "transferUpline"
                    }, {
                        name: "in_betting_record",
                        page: "personalHistoryCopy"
                    }, {
                        name: "in_account_record",
                        page: "transactionHistory"
                    }, {
                        name: "in_personal_loss",
                        page: "personalProfit"
                    }, {
                        name: "in_bonus_details",
                        page: "bonusDetails"
                    }, {
                        name: "in_reward_center",
                        page: "rewardCenter"
                    }, {
                        name: "invite_friends",
                        page: "referral"
                    }, {
                        name: "mission_activity",
                        page: "missionLeaderboard"
                    }, {
                        name: "in_platform_information",
                        page: "messageV2"
                    }, {
                        name: "manual_rebate",
                        page: "manualRebate"
                    }])
                      , t = e.loaded
                      , n = e.mcMenu
                      , a = e.selectMcPage
                      , i = e.activeMcPage
                      , o = e.missionCount
                      , s = e.messageCount
                      , r = e.rewardCount
                      , c = e.closeMc;
                    return {
                        active: i,
                        loaded: t,
                        menu: n,
                        selectPage: a,
                        missionCount: o,
                        messageCount: s,
                        rewardCount: r,
                        closeMc: c
                    }
                }
            }
              , Ee = Oe
              , Ie = (0, _.A)(Ee, Ne, Te, !1, null, null, null)
              , Be = Ie.exports
              , Ve = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "br_help_wrap"
                }, [t("div", {
                    staticClass: "help_nav_body"
                }, [t("div", {
                    staticClass: "top-title"
                }, [e._v(e._s(e.$t("in_help_center")))]), t("McHelp")], 1)])
            }
              , Ge = []
              , He = {
                name: "help",
                components: {
                    McHelp: u.wY
                },
                created: function() {
                    document.body.scrollTo(0, 0) || window.scrollTo(0, 0)
                },
                methods: {}
            }
              , De = He
              , ze = (0, _.A)(De, Ve, Ge, !1, null, null, null)
              , Ue = ze.exports
              , qe = n(55373)
              , Fe = n.n(qe)
              , je = "USER_POPUP"
              , Ze = "ANONYMOUS_POPUP"
              , Qe = {
                components: {
                    Agent: Se,
                    Member: Be,
                    AnnouncePopup: N,
                    NoticePopup: y,
                    LoginPopup: K,
                    RegisterPopup: de,
                    ChangePassword: he,
                    ForgotPassword: ye,
                    TcgModal: T.A,
                    GamePopup: u.N9,
                    DfChatRoom: u.kO,
                    SocketEvent: u.yg,
                    Contract: u.NZ,
                    HelpCenter: Ue
                },
                setup: function() {
                    var e = (0,
                    h.Pj)()
                      , t = e.store
                      , n = e.dispatch
                      , a = (0,
                    h.As)()
                      , i = a.setMcPage
                      , s = a.isLogin
                      , r = a.isTrial
                      , c = a.firstTimeLogin
                      , l = (0,
                    h.ok)()
                      , u = l.currentLanguage
                      , d = (0,
                    h.hS)()
                      , m = (0,
                    o.KR)([])
                      , p = (0,
                    o.EW)((function() {
                        return s.value ? je : Ze
                    }
                    ))
                      , g = (0,
                    o.EW)((function() {
                        var e;
                        return null === (e = t.Login.whitelabelVal) || void 0 === e ? void 0 : e.AGENTPOLICY3
                    }
                    ))
                      , f = (0,
                    o.EW)((function() {
                        var e;
                        return null === (e = t.Login.memberInfo) || void 0 === e ? void 0 : e.id
                    }
                    ))
                      , v = (0,
                    o.EW)((function() {
                        var e;
                        return null === (e = t.Login.memberInfo) || void 0 === e ? void 0 : e.account
                    }
                    ))
                      , w = function() {
                        var e = sessionStorage.getItem(p.value);
                        if ("closed" !== e) {
                            var n = s.value ? "A" : "B"
                              , a = t.Public.popup.filter((function(e) {
                                return !("A" !== n || !c.value || "F" !== e.execution) || e.execution === n
                            }
                            ));
                            a.length && (m.value = a,
                            d.show("publicModal"))
                        }
                    }
                      , C = function() {
                        sessionStorage.setItem(p.value, "closed")
                    }
                      , b = function() {
                        var e = Fe().parse(window.location.search, {
                            ignoreQueryPrefix: !0
                        })
                          , t = (null === e || void 0 === e ? void 0 : e.token) || window.sessionStorage.getItem("token");
                        if (!t || s.value) {
                            var a = {
                                types: "B,PL,PU,PR,H",
                                platform: "W"
                            };
                            n("getAnnouncementContentV2", {
                                data: a
                            }).then((function() {
                                w()
                            }
                            ))
                        }
                    }
                      , _ = function() {
                        n("getFavGames")
                    }
                      , A = function(e) {
                        var t = {
                            query: {
                                merchantCode: U.A.brand.merchant,
                                isPlatform: 2,
                                vassalage: "",
                                platform: "flash,html5-desktop",
                                language: u.value
                            },
                            refresh: e
                        };
                        n("getHotGameList", t)
                    }
                      , y = function() {
                        var e = {
                            gameCategory: "ALL",
                            language: u.value,
                            limitNum: 20
                        };
                        n("getWinnerBoard", e)
                    };
                    return (0,
                    o.sV)((function() {
                        n("getCountryCode"),
                        A(),
                        y()
                    }
                    )),
                    (0,
                    o.wB)(u, (function() {
                        A(!0),
                        y(),
                        b()
                    }
                    )),
                    (0,
                    o.wB)(s, (function(e) {
                        e && _(),
                        e && !r.value && g.value && n("getConsolidated"),
                        b()
                    }
                    ), {
                        immediate: !0
                    }),
                    {
                        isLogin: s,
                        customerId: f,
                        account: v,
                        setMcPage: i,
                        popupList: m,
                        popupClose: C
                    }
                }
            }
              , Ye = Qe
              , Je = (0, _.A)(Ye, c, l, !1, null, null, null)
              , We = Je.exports
              , Ke = {
                name: "App",
                components: {
                    CommonLogic: We
                },
                computed: {
                    mainRouterKey: function() {
                        return ["/", "/index", "/login", "/register"].includes(this.$route.path) ? "index" : this.$route.fullPath
                    }
                }
            }
              , Xe = Ke
              , $e = (0, _.A)(Xe, s, r, !1, null, null, null)
              , et = $e.exports
              , tt = n(40173)
              , nt = (n(47764),
            n(62953),
            function() {
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
              , at = []
              , it = n(4797)
              , ot = function() {
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
              , rt = {
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
              , ct = rt
              , lt = (0, _.A)(ct, ot, st, !1, null, "5eec4b53", null)
              , ut = lt.exports
              , dt = function() {
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
              , mt = []
              , pt = n(9133)
              , gt = (n(26910),
            function() {
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
              , ft = []
              , vt = n(64700)
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
              , wt = {
                components: {
                    GameListItem: vt.A
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
                      , P = function() {
                        n.currentPage -= 1;
                        var e = t.value.swiper;
                        e.slidePrev()
                    }
                      , k = function() {
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
                        menuPrev: P,
                        menuNext: k,
                        gameSwiper: t,
                        filterVendorList: R,
                        getVendorIcon: v
                    })
                }
            }
              , Ct = wt
              , bt = (0, _.A)(Ct, gt, ft, !1, null, null, null)
              , _t = bt.exports
              , At = function() {
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
              , yt = []
              , Pt = n(77836)
              , kt = n(52276)
              , Mt = n(42037)
              , xt = {
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
              , Lt = xt
              , St = (0, _.A)(Lt, At, yt, !1, null, null, null)
              , Nt = St.exports
              , Tt = function() {
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
              , Rt = []
              , Ot = {
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
              , Et = Ot
              , It = (0, _.A)(Et, Tt, Rt, !1, null, null, null)
              , Bt = It.exports
              , Vt = {
                mixins: [kt.z],
                components: {
                    HomeItem: _t,
                    GameMenu: Bt,
                    VendorGameCenter: Nt
                },
                setup: function() {
                    var e = (0,
                    o.Kh)({
                        games: [],
                        recentGames: []
                    })
                      , t = (0,
                    h.s9)()
                      , n = t.t
                      , a = (0,
                    h.OW)()
                      , i = a.gameVendor
                      , s = a.hotGames
                      , r = a.sortingVendor
                      , c = (0,
                    h.As)()
                      , l = c.isLogin
                      , u = (0,
                    h.ok)()
                      , d = u.currentLanguage
                      , m = (0,
                    h.Pj)()
                      , g = m.store
                      , f = (m.dispatch,
                    m.commit,
                    (0,
                    o.EW)((function() {
                        var e = (0,
                        pt.A)(Object.keys(i.value).filter((function(e) {
                            return !["SPORTS", "LOTT", "ELOTT", "ESPORTS", "COCKFIGHT", "SPB"].includes(e)
                        }
                        )));
                        return e
                    }
                    )))
                      , v = (0,
                    o.EW)((function() {
                        return g.eGameStore.currentGameType
                    }
                    ))
                      , w = ((0,
                    o.EW)((function() {
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
                    (0,
                    o.EW)((function() {
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
              , Gt = Vt
              , Ht = (0, _.A)(Gt, dt, mt, !1, null, null, null)
              , Dt = Ht.exports
              , zt = function() {
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
              , Ut = []
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
              , Zt = jt
              , Qt = (0, _.A)(Zt, zt, Ut, !1, null, null, null)
              , Yt = Qt.exports
              , Jt = {
                name: "home",
                components: {
                    PageBanner: it.A,
                    NoticeMarquee: ut,
                    HomeGame: Dt,
                    Winner: Yt
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
              , Wt = Jt
              , Kt = (0, _.A)(Wt, nt, at, !1, null, null, null)
              , Xt = Kt.exports
              , $t = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "agent-container"
                }, [t("div", {
                    staticClass: "agent-top"
                }, [t("div", {
                    staticClass: "top_bg"
                }), t("div", {
                    staticClass: "content width_1200"
                }, [e._m(0), t("AgentLogin")], 1)]), e._m(1), e._m(2)])
            }
              , en = [function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "top-title"
                }, [t("div", {
                    staticClass: "title"
                }, [e._v("从现在开始")]), t("div", {
                    staticClass: "sub_title"
                }, [e._v("成为传奇,还是成为传奇的歌颂者?")])])
            }
            , function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "agent-main width_1200"
                }, [t("div", {
                    staticClass: "main-title"
                }, [e._v("全行业最全推广支持")]), t("div", {
                    staticClass: "promote"
                }, [t("div", {
                    staticClass: "channel box"
                }, [t("img", {
                    attrs: {
                        src: n(17862),
                        alt: ""
                    }
                }), t("p", {
                    staticClass: "b_t"
                }, [e._v("支持全渠道推广")]), t("div", {
                    staticClass: "desc"
                }, [e._v(" 提供全面丰富的图片、视频推广素材， "), t("br"), e._v(" 专业定制马甲包，支持分发全网每个角落 ")])]), t("div", {
                    staticClass: "mid"
                }, [t("img", {
                    attrs: {
                        src: n(37905),
                        alt: ""
                    }
                }), t("p", {
                    staticClass: "b_t"
                }, [e._v("15天成为推广达人")]), t("div", {
                    staticClass: "desc"
                }, [e._v(" 专家团队24小时提供专业指导， "), t("br"), e._v(" 零基础也可快速成为推广达人 ")])]), t("div", {
                    staticClass: "data_b box"
                }, [t("img", {
                    attrs: {
                        src: n(95208),
                        alt: ""
                    }
                }), t("p", {
                    staticClass: "b_t"
                }, [e._v("最全数据报表")]), t("div", {
                    staticClass: "desc"
                }, [e._v(" 全面分析佣金组成、会员游戏状况 "), t("br"), e._v(" 对你的会员了如指掌 ")])])])])
            }
            , function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "agent-copyright"
                }, [t("p", [e._v("Copyright © 2022 代理后台")])])
            }
            ]
              , tn = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "agent-login"
                }, [t("div", {
                    staticClass: "agent-login-bg"
                }, [e._m(0), t("LoginForm", {
                    attrs: {
                        loginType: e.loginType,
                        agentPage: !0
                    }
                }), e._m(1)], 1), t("TcgModal", {
                    attrs: {
                        name: "changePassModal"
                    }
                }, [t("ChangePassword", {
                    attrs: {
                        agentPage: !0
                    }
                })], 1)], 1)
            }
              , nn = [function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "form-title"
                }, [t("h5", [e._v("代理后台")])])
            }
            , function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "form-tip"
                }, [t("span", [e._v("专业咨询时间：周一至周五 午12点-晚9点")])])
            }
            ]
              , an = {
                mixins: [I, u.vE.firebaseMixins],
                name: "loginModal",
                components: {
                    LoginForm: Z,
                    TcgModal: T.A,
                    ChangePassword: he
                },
                data: function() {
                    return {
                        loginType: "username"
                    }
                }
            }
              , on = an
              , sn = (0, _.A)(on, tn, nn, !1, null, null, null)
              , rn = sn.exports
              , cn = {
                name: "",
                components: {
                    AgentLogin: rn
                }
            }
              , ln = cn
              , un = (0, _.A)(ln, $t, en, !1, null, "c4cafe56", null)
              , dn = un.exports
              , mn = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "agent-center-container"
                }, [t("div", {
                    staticClass: "agent-center-header"
                }, [t("div", {
                    staticClass: "innner width_1200"
                }, [t("div", {
                    staticClass: "agent_logo"
                }, [t("CommonLogo", {
                    attrs: {
                        src: n(65549)
                    }
                })], 1), t("div", {
                    staticClass: "agent_info"
                }, [t("div", {
                    staticClass: "time"
                }, [t("span", {
                    staticClass: "time-zone"
                }, [e._v("GMT" + e._s(e.timeZone))]), t("span", {
                    staticClass: "now-time"
                }, [e._v(e._s(e.nowTime))])]), t("span", {
                    staticClass: "name"
                }, [e._v(e._s(e.nickname))]), t("span", {
                    staticClass: "logout",
                    on: {
                        click: e.logout
                    }
                }, [e._v(e._s(e.$t("in_sign_out")))])])])]), t("div", {
                    staticClass: "user-center-bg"
                }, [e.loaded ? t("div", {
                    staticClass: "user-center-content"
                }, [t("div", {
                    staticClass: "content-left"
                }, [t("ul", {
                    staticClass: "user-center-nav"
                }, [t("li", {
                    class: {
                        active: "depositv2" === e.activeAcPage
                    },
                    on: {
                        click: function(t) {
                            return e.selectMcPage("depositv2")
                        }
                    }
                }, [t("i", {
                    staticClass: "acmc_icon depositv2"
                }), e._v(" " + e._s(e.$t("in_increase_deposit")) + " ")]), t("li", {
                    class: {
                        active: "withdraw" === e.activeAcPage
                    },
                    on: {
                        click: function(t) {
                            return e.selectMcPage("withdraw")
                        }
                    }
                }, [t("i", {
                    staticClass: "acmc_icon withdraw"
                }), e._v(" " + e._s(e.$t("in_increase_withdrawal")) + " ")]), e._l(e.acMenu, (function(n, a) {
                    return [t("li", {
                        key: a,
                        class: {
                            active: e.activeAcPage === n.page
                        },
                        attrs: {
                            "data-pagemodal": n.data
                        },
                        on: {
                            click: function(t) {
                                return e.selectAcPage(n.page)
                            }
                        }
                    }, [t("i", {
                        staticClass: "acmc_icon",
                        class: n.page
                    }), t("span", [e._v(e._s(e.$t(n.name)))])])]
                }
                )), t("li", {
                    class: {
                        active: "messageV2" === e.activeAcPage
                    },
                    on: {
                        click: function(t) {
                            return e.selectMcPage("messageV2")
                        }
                    }
                }, [t("i", {
                    staticClass: "acmc_icon messageV2"
                }), e._v(" " + e._s(e.$t("in_platform_information")) + " ")]), t("li", {
                    on: {
                        click: e.getService
                    }
                }, [t("i", {
                    staticClass: "acmc_icon service"
                }), e._v(" " + e._s(e.$t("in_customer_services")) + " ")])], 2)]), t("div", {
                    staticClass: "active-content",
                    attrs: {
                        id: "br_proxy_right"
                    }
                })]) : e._e()])])
            }
              , pn = []
              , gn = [{
                name: "in_increase_announcement",
                page: "agentAnnouncement",
                data: "agentCenter/agentAnnouncement"
            }, {
                name: "in_increase_overview",
                page: "agentTeamOverview",
                data: "agentCenter/agentTeamOverview"
            }, {
                name: "in_increase_account",
                page: "registerCenter",
                data: "agentCenter/registerCenter"
            }, {
                name: "in_team_management",
                page: "downlineManagmentView",
                data: "agentCenter/downlineManagmentView"
            }, {
                name: "in_team_betting",
                page: "personalHistoryCopy",
                data: "agentCenter/personalHistoryCopy"
            }, {
                name: "in_user_loss",
                page: "palStatementsAgentCopy",
                data: "agentCenter/palStatementsAgentCopy"
            }, {
                name: "in_my_income",
                page: "agentRevenueReport",
                data: "agentCenter/agentRevenueReport"
            }, {
                name: "in_account_details",
                page: "agentDownlineTransactionDetailsCopy",
                data: "agentCenter/agentDownlineTransactionDetailsCopy"
            }, {
                name: "in_bonus_bmwmuf",
                page: "agentDividendRecordCopy2",
                data: "agentCenter/agentDividendRecord2"
            }, {
                name: "in_daily_hdtmkj",
                page: "agentDailyWages2",
                data: "agentCenter/agentDailyWages2"
            }, {
                name: "in_hourly_salary",
                page: "agentHourSalary",
                data: "agentCenter/agentHourSalary"
            }, {
                name: "real_time_salary_menu",
                page: "agentRealtimeSalary",
                data: "agentCenter/agentRealtimeSalary"
            }]
              , fn = {
                mixins: [I],
                components: {
                    CommonLogo: u.fA
                },
                setup: function(e) {
                    var t = (0,
                    o.KR)("")
                      , n = (0,
                    o.KR)("")
                      , s = (0,
                    o.KR)(null)
                      , r = (0,
                    h.ME)(gn)
                      , c = r.acMenu
                      , l = r.loaded
                      , u = r.selectAcPage
                      , d = r.activeAcPage
                      , m = (0,
                    h.Pj)()
                      , p = m.store
                      , g = m.dispatch
                      , v = (0,
                    h.rd)()
                      , w = (0,
                    h.As)()
                      , C = w.isAgent
                      , b = (0,
                    o.EW)((function() {
                        return p.Login.memberInfo.nickname || p.Login.memberInfo.account
                    }
                    ))
                      , _ = function() {
                        s.value = setInterval((function() {
                            t.value = f()(new Date).format("YYYY-MM-DD HH:mm:ss")
                        }
                        ), 1e3)
                    }
                      , A = function() {
                        var e = -(new Date).getTimezoneOffset() / 60;
                        n.value = e >= 0 ? "+".concat(e) : e
                    }
                      , y = function(e) {
                        d.value = e,
                        l.value && window.tcg.mc[e] && window.tcg.mc[e]("#br_proxy_right")
                    }
                      , P = function() {
                        var e = (0,
                        i.A)((0,
                        a.A)().mark((function e() {
                            return (0,
                            a.A)().wrap((function(e) {
                                while (1)
                                    switch (e.prev = e.next) {
                                    case 0:
                                        return window.cover.loader(!0),
                                        e.next = 3,
                                        g("logout");
                                    case 3:
                                        window.cover.loader(!1),
                                        v.replace("/agent").catch((function() {}
                                        ));
                                    case 5:
                                    case "end":
                                        return e.stop()
                                    }
                            }
                            ), e)
                        }
                        )));
                        return function() {
                            return e.apply(this, arguments)
                        }
                    }()
                      , k = function() {
                        C.value || v.replace("/agent").then((function() {
                            window.cover.loader(!1)
                        }
                        )).catch((function() {}
                        ))
                    };
                    return (0,
                    o.KC)((function() {
                        k()
                    }
                    )),
                    (0,
                    o.sV)((function() {
                        _(),
                        A(),
                        (0,
                        o.hi)((function() {
                            clearInterval(s.value)
                        }
                        ))
                    }
                    )),
                    {
                        logout: P,
                        acMenu: c,
                        loaded: l,
                        selectAcPage: u,
                        selectMcPage: y,
                        activeAcPage: d,
                        nickname: b,
                        nowTime: t,
                        timeZone: n
                    }
                }
            }
              , vn = fn
              , hn = (0, _.A)(vn, mn, pn, !1, null, null, null)
              , wn = hn.exports
              , Cn = function() {
                var e = this
                  , t = e._self._c;
                return t("div", [t("div", {
                    staticClass: "header-container"
                }, [t("div", {
                    staticClass: "header-content page-center"
                }, [t("div", {
                    staticClass: "header-left"
                }, [t("div", {
                    staticClass: "header-menu-list"
                }, e._l(e.headerMenu, (function(n, a) {
                    return t("div", {
                        key: a,
                        staticClass: "header-menu-item",
                        class: {
                            on: n.path === e.path
                        },
                        on: {
                            click: function(t) {
                                return e.handleMenuClick(n)
                            }
                        }
                    }, [e._v(" " + e._s(e.$t("".concat(n.name))) + " ")])
                }
                )), 0)]), t("div", {
                    staticClass: "header-right"
                }, [e._e(), t("div", {
                    staticClass: "right-content"
                }, [e.isLogin ? t("MemberInfo") : t("div", {
                    staticClass: "login-register"
                }, [t("span", {
                    staticClass: "btn-login",
                    on: {
                        click: e.goLogin
                    }
                }, [e._v(e._s(e.$t("hd_login_button")))]), t("span", {
                    staticClass: "btn-register",
                    on: {
                        click: e.goRegister
                    }
                }, [e._v(e._s(e.$t("hd_sign_button")))])]), t("div", {
                    staticClass: "notice",
                    on: {
                        click: function(t) {
                            return e.$modal.show("noticeModal")
                        }
                    }
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "notice"
                    }
                })], 1), t("div", {
                    staticClass: "service",
                    on: {
                        click: e.getService
                    }
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "service"
                    }
                })], 1)], 1)], 1)]), t("DropMenu", {
                    attrs: {
                        show: e.showDropMenu,
                        activeIndex: e.activeIndex
                    },
                    on: {
                        showMenu: e.showMenu,
                        hideMenu: e.hideMenu
                    }
                })], 1), t("div", {
                    staticClass: "header-holder"
                })])
            }
              , bn = []
              , _n = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "header-nav"
                }, e._l(e.menus, (function(n, a) {
                    return t("div", {
                        key: "nav_".concat(a),
                        staticClass: "nav-item",
                        on: {
                            click: function(t) {
                                return e.navClick(n)
                            }
                        }
                    }, [t("i", {
                        staticClass: "nav-icon",
                        style: {
                            backgroundImage: "url(".concat(n.icon, ")")
                        }
                    }), t("span", {
                        staticClass: "nav-name"
                    }, [e._v(e._s(e.$t(n.name)))])])
                }
                )), 0)
            }
              , An = []
              , yn = {
                setup: function() {
                    var e = [{
                        name: "in_increase_deposit",
                        page: "depositv2",
                        icon: n(68164)
                    }, {
                        name: "in_increase_withdrawal",
                        page: "withdraw",
                        icon: n(854)
                    }, {
                        name: "hd_agent",
                        path: "/agent",
                        icon: n(38929)
                    }]
                      , t = (0,
                    h.As)()
                      , a = t.setMcPage
                      , i = (0,
                    h.rd)()
                      , o = function(e) {
                        var t = e.page
                          , n = e.path;
                        return n ? i.push(n) : a(t)
                    };
                    return {
                        menus: e,
                        navClick: o
                    }
                }
            }
              , Pn = yn
              , kn = (0, _.A)(Pn, _n, An, !1, null, null, null)
              , Mn = kn.exports
              , xn = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "member-info-container"
                }, [t("div", {
                    staticClass: "group"
                }, [e.isGamePage ? e._e() : t("div", {
                    staticClass: "member-info-item"
                }, [t("div", {
                    staticClass: "balance-container"
                }, [t("div", {
                    staticClass: "symbol"
                }, [e._v(e._s(e.currencySymbol))]), t("span", {
                    staticClass: "balance"
                }, [e._v(e._s(e.showBalance ? e.balance : "***"))]), t("span", {
                    staticClass: "refresh",
                    on: {
                        click: e.refreshBalance
                    }
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "refresh"
                    }
                })], 1)])]), t("div", {
                    staticClass: "member-info-item",
                    on: {
                        click: function(t) {
                            return e.setMcPage("depositv2")
                        }
                    }
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "btn-deposit"
                    }
                })], 1), t("div", {
                    staticClass: "member-info-item",
                    on: {
                        click: function(t) {
                            return e.setMcPage("withdraw")
                        }
                    }
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "btn-withdraw"
                    }
                })], 1)]), t("div", {
                    staticClass: "group member"
                }, [t("div", {
                    staticClass: "member-account"
                }, [t("div", {
                    staticClass: "user-avatar",
                    on: {
                        click: function(t) {
                            return t.stopPropagation(),
                            e.changeUserAvatar.apply(null, arguments)
                        }
                    }
                }, [t("img", {
                    attrs: {
                        src: e.avatarSrc,
                        alt: ""
                    },
                    on: {
                        "~error": function(t) {
                            return e.handleError.apply(null, arguments)
                        }
                    }
                }), e.hasVip ? t("div", {
                    staticClass: "vip"
                }, [e._v(e._s(e.vipLabelName))]) : e._e()]), t("div", {
                    staticClass: "icon-down"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "common-arrow"
                    }
                })], 1), t("transition", {
                    attrs: {
                        name: "zoom-in-top"
                    }
                }, [t("div", {
                    staticClass: "member-menu"
                }, [t("div", {
                    staticClass: "member-menu-bg"
                }, [t("div", {
                    staticClass: "main-info"
                }, [t("div", {
                    staticClass: "avatar-wrap"
                }, [t("img", {
                    staticClass: "avatar",
                    attrs: {
                        src: e.avatarSrc,
                        alt: ""
                    },
                    on: {
                        "~error": function(t) {
                            return e.handleError.apply(null, arguments)
                        }
                    }
                }), e.hasVip ? t("div", {
                    staticClass: "vip-content"
                }, [t("div", {
                    staticClass: "vip-text"
                }, [e._v(e._s(e.vipLabelName))])]) : e._e()]), t("div", {
                    staticClass: "info-content"
                }, [t("div", {
                    staticClass: "account"
                }, [e._v(e._s(e.account))]), t("div", {
                    staticClass: "id"
                }, [t("span", [e._v("ID:" + e._s(e.userId))]), t("div", {
                    directives: [{
                        name: "clipboard",
                        rawName: "v-clipboard:copy",
                        value: "".concat(e.userId),
                        expression: "`${userId}`",
                        arg: "copy"
                    }, {
                        name: "clipboard",
                        rawName: "v-clipboard:success",
                        value: e.copyOnSuccess,
                        expression: "copyOnSuccess",
                        arg: "success"
                    }],
                    staticClass: "copy-btn"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "icon-edit"
                    }
                })], 1)])])]), t("div", {
                    staticClass: "member-menu-item account",
                    on: {
                        click: function(t) {
                            return e.setMcPage("securityCenter")
                        }
                    }
                }, [t("svg-icon", {
                    staticClass: "account",
                    attrs: {
                        iconClass: "icon-account"
                    }
                }), t("span", [e._v(e._s(e.$t("in_my_account")))])], 1), t("div", {
                    staticClass: "member-menu-item betting-record",
                    on: {
                        click: function(t) {
                            return e.setMcPage("personalHistoryCopy")
                        }
                    }
                }, [t("svg-icon", {
                    staticClass: "betting-record",
                    attrs: {
                        iconClass: "icon-betting-record"
                    }
                }), t("span", [e._v(e._s(e.$t("in_betting_record")))])], 1), t("div", {
                    staticClass: "member-menu-item message",
                    on: {
                        click: function(t) {
                            return e.setMcPage("messageV2")
                        }
                    }
                }, [t("svg-icon", {
                    staticClass: "message",
                    attrs: {
                        iconClass: "icon-message"
                    }
                }), e._v(" " + e._s(e.$t("in_platform_information")) + " ")], 1), t("div", {
                    staticClass: "member-menu-item cs",
                    on: {
                        click: e.getService
                    }
                }, [t("svg-icon", {
                    staticClass: "cs",
                    attrs: {
                        iconClass: "icon-cs"
                    }
                }), t("span", [e._v(e._s(e.$t("in_customer_services")))])], 1), e.isAgent ? t("div", {
                    staticClass: "member-menu-item agent",
                    on: {
                        click: function(t) {
                            return e.setAcPage("agentTeamOverview")
                        }
                    }
                }, [t("svg-icon", {
                    staticClass: "agent",
                    attrs: {
                        iconClass: "icon-agent"
                    }
                }), t("span", [e._v(e._s(e.$t("hd_agent")))])], 1) : e._e(), t("div", {
                    staticClass: "member-menu-item logout",
                    on: {
                        click: e.logout
                    }
                }, [t("svg-icon", {
                    staticClass: "logout",
                    attrs: {
                        iconClass: "icon-logout"
                    }
                }), t("span", [e._v(e._s(e.$t("in_sign_out")))])], 1)])])])], 1)])])
            }
              , Ln = [];
            n(9868);
            var Sn = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                  , t = e.toFixed(2)
                  , n = t.toString().replace(/\d+/, (function(e) {
                    return e.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")
                }
                ));
                return n
            }
              , Nn = {
                name: "memberInfo",
                setup: function() {
                    var e = (0,
                    o.Kh)({
                        showBalance: !0
                    })
                      , t = (0,
                    h.Pj)()
                      , n = t.store
                      , a = t.dispatch
                      , i = (0,
                    h.As)()
                      , s = i.setAcPage
                      , r = i.setMcPage
                      , c = i.logout
                      , l = i.isTrial
                      , u = i.isAgent
                      , d = i.isGamePage
                      , m = (0,
                    h.rz)()
                      , g = m.avatarSrc
                      , f = m.avatarErrorSrc
                      , v = (0,
                    h.so)()
                      , w = v.getService
                      , C = (0,
                    h.OW)()
                      , b = C.hasResource
                      , _ = C.getResourceName
                      , A = C.openResource
                      , y = (0,
                    o.EW)((function() {
                        var e;
                        return null === (e = n.Login.memberInfo) || void 0 === e ? void 0 : e.account
                    }
                    ))
                      , P = (0,
                    o.EW)((function() {
                        var e;
                        return null === (e = n.Login.memberInfo) || void 0 === e ? void 0 : e.id
                    }
                    ))
                      , k = (0,
                    o.EW)((function() {
                        return n.Public.hasVip
                    }
                    ))
                      , M = (0,
                    o.EW)((function() {
                        return n.Public.vipLabelName
                    }
                    ))
                      , x = (0,
                    o.EW)((function() {
                        return n.Public.vipRankLevel
                    }
                    ))
                      , L = (0,
                    o.EW)((function() {
                        return n.Public.availablePromoCount || 0
                    }
                    ))
                      , S = (0,
                    o.EW)((function() {
                        return n.Public.unreadMessage || 0
                    }
                    ))
                      , N = (0,
                    o.EW)((function() {
                        return L.value + S.value
                    }
                    ))
                      , T = (0,
                    o.EW)((function() {
                        var e = n.Public.balance.toString();
                        return e.replace(/[^/.]/g, "*")
                    }
                    ))
                      , R = (0,
                    o.EW)((function() {
                        var e = n.Public.balance;
                        return "number" === typeof e ? Sn(e) : e
                    }
                    ))
                      , O = (0,
                    o.EW)((function() {
                        return n.Public.currencySymbol || ""
                    }
                    ))
                      , E = (0,
                    o.EW)((function() {
                        var e = n.Public.availablePromo;
                        return e["REFERRAL"] && e["REFERRAL"]["enabled"]
                    }
                    ))
                      , I = function() {
                        return a("getBalanceV2")
                    }
                      , B = function() {
                        r(),
                        window.sessionStorage.setItem("toWhichItem", "profile")
                    }
                      , V = function() {
                        return e.showBalance = !e.showBalance
                    }
                      , G = function(e) {
                        e.target.src = f.value
                    }
                      , H = function() {
                        window.cover.loader(!0),
                        window.cover.init({
                            html: window.$i18n.t("copy_success"),
                            icon: "success",
                            btn: {
                                confirm: window.$i18n.t("in_increase_submit", "确定")
                            }
                        }),
                        window.cover.loader(!1)
                    };
                    return (0,
                    o.sV)((function() {
                        I(),
                        l.value || a("getUnreadMessageV2")
                    }
                    )),
                    (0,
                    p.A)((0,
                    p.A)({}, (0,
                    o.QW)(e)), {}, {
                        account: y,
                        userId: P,
                        setMcPage: r,
                        logout: c,
                        refreshBalance: I,
                        setShowBalance: V,
                        unclaimedCount: N,
                        balanceEyes: T,
                        balance: R,
                        currencySymbol: O,
                        showInviteFriends: E,
                        avatarSrc: g,
                        handleError: G,
                        getService: w,
                        isAgent: u,
                        setAcPage: s,
                        hasResource: b,
                        getResourceName: _,
                        openResource: A,
                        changeUserAvatar: B,
                        hasVip: k,
                        vipLabelName: M,
                        vipRankLevel: x,
                        isGamePage: d,
                        copyOnSuccess: H
                    })
                }
            }
              , Tn = Nn
              , Rn = (0, _.A)(Tn, xn, Ln, !1, null, null, null)
              , On = Rn.exports
              , En = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    class: ["drop-menu-container", {
                        active: e.show
                    }],
                    on: {
                        mouseenter: function(t) {
                            return t.stopPropagation(),
                            t.preventDefault(),
                            e.showMenu.apply(null, arguments)
                        },
                        mouseleave: function(t) {
                            return t.stopPropagation(),
                            t.preventDefault(),
                            e.hideMenu.apply(null, arguments)
                        }
                    }
                }, [t("div", {
                    staticClass: "drop-menu-bg"
                }, [e._l(e.navItems, (function(n, a) {
                    return [e.activeIndex !== a || ["HOME", "PROMO"].includes(n.gameType) ? e._e() : t("div", {
                        key: "drop_".concat(a),
                        staticClass: "drop-menu-item"
                    }, [t("HeaderGame", {
                        attrs: {
                            games: e.gameVendor[n.gameType]
                        }
                    })], 1)]
                }
                ))], 2)])
            }
              , In = []
              , Bn = (n(2892),
            function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    class: ["header-game-container", {
                        large: e.isLarge
                    }]
                }, [t("div", {
                    staticClass: "header-game-list"
                }, e._l(e.games, (function(n, a) {
                    return t("div", {
                        key: "".concat(n.gameType, "_").concat(a),
                        staticClass: "header-game-item",
                        on: {
                            click: function(t) {
                                return e.gameClick(n)
                            }
                        }
                    }, [t("img", {
                        staticClass: "vendor-img",
                        attrs: {
                            src: e.getNavVendorIcon(n),
                            alt: ""
                        }
                    }), t("p", {
                        staticClass: "vendor-name"
                    }, [e._v(e._s(n.displayName))])])
                }
                )), 0)])
            }
            )
              , Vn = []
              , Gn = {
                name: "headerGame",
                mixins: [kt.z],
                props: {
                    games: {
                        type: Array,
                        required: !0
                    }
                },
                setup: function(e) {
                    var t = (0,
                    h.fC)()
                      , n = t.getNavVendorIcon
                      , a = (0,
                    o.nI)()
                      , i = a.proxy
                      , s = (0,
                    o.EW)((function() {
                        return e.games.length > 10
                    }
                    ))
                      , r = function(e) {
                        i.launchGameVendor(e)
                    };
                    return {
                        getNavVendorIcon: n,
                        isLarge: s,
                        gameClick: r
                    }
                }
            }
              , Hn = Gn
              , Dn = (0, _.A)(Hn, Bn, Vn, !1, null, null, null)
              , zn = Dn.exports
              , Un = {
                name: "dropMenu",
                components: {
                    HeaderGame: zn
                },
                props: {
                    activeIndex: {
                        type: Number,
                        required: !0
                    },
                    show: {
                        type: Boolean,
                        required: !0
                    }
                },
                setup: function(e, t) {
                    var n = (0,
                    h.OW)()
                      , a = n.navItems
                      , i = n.gameVendor
                      , o = t.emit
                      , s = function() {
                        o("showMenu")
                    }
                      , r = function() {
                        o("hideMenu")
                    };
                    return {
                        navItems: a,
                        gameVendor: i,
                        showMenu: s,
                        hideMenu: r
                    }
                }
            }
              , qn = Un
              , Fn = (0, _.A)(qn, En, In, !1, null, null, null)
              , jn = Fn.exports
              , Zn = {
                name: "pageHeader",
                mixins: [kt.z],
                components: {
                    HeaderNav: Mn,
                    MemberInfo: On,
                    DropMenu: jn
                },
                setup: function() {
                    var e = (0,
                    o.KR)(0)
                      , t = (0,
                    o.KR)(!1)
                      , n = (0,
                    o.nI)()
                      , a = n.proxy
                      , i = (0,
                    h.As)()
                      , s = i.isLogin
                      , r = i.setMcPage
                      , c = (0,
                    h.OW)()
                      , l = c.gameVendor
                      , u = c.navItems
                      , d = (0,
                    h.yP)()
                      , m = d.showSideMenu
                      , p = (0,
                    h.rd)()
                      , g = (0,
                    h.lq)()
                      , f = (0,
                    h.Pj)()
                      , v = f.store
                      , w = (0,
                    h.hS)()
                      , C = (0,
                    h.Pj)()
                      , b = C.dispatch
                      , _ = (0,
                    h.so)()
                      , A = _.getService
                      , y = (0,
                    o.EW)((function() {
                        return g.path
                    }
                    ))
                      , P = (0,
                    o.EW)((function() {
                        var e;
                        return null === (e = v.Public.availablePromo) || void 0 === e || null === (e = e.REFERRAL) || void 0 === e ? void 0 : e.enabled
                    }
                    ))
                      , k = [{
                        name: "local_header_games",
                        path: "/"
                    }, {
                        name: "local_header_promotions",
                        path: "/promotions"
                    }].concat((0,
                    pt.A)(P.value || !s ? [{
                        name: "rewards",
                        path: "",
                        page: "rewardCenter"
                    }] : []), [{
                        name: "local_share",
                        path: "",
                        page: "referral"
                    }])
                      , M = function(e) {
                        e.path !== y && (e.path ? p.push(e.path) : r(e.page))
                    }
                      , x = function(e) {
                        var t, n = e.gameType, i = e.page, o = (null === (t = l.value) || void 0 === t ? void 0 : t[n]) || [];
                        return ["HOME", "PROMO", "PVP", "FISH", "RNG"].includes(n) || o.length > 1 ? p.push(i).catch((function() {}
                        )) : a.launchGameVendor(o[0])
                    }
                      , L = function(n) {
                        t.value = !0,
                        n && (e.value = n)
                    }
                      , S = function() {
                        t.value = !1
                    }
                      , N = function() {
                        w.show("loginPopupModal")
                    }
                      , T = function() {
                        w.show("registerModal")
                    }
                      , R = function() {
                        if (!["/pvp", "/fish", "/rng"].includes(g.path)) {
                            var e = {
                                merchantCode: U.A.brand.merchant
                            };
                            b("getGameVendor", e)
                        }
                    };
                    return (0,
                    o.sV)((function() {
                        R()
                    }
                    )),
                    {
                        router: p,
                        isLogin: s,
                        navItems: u,
                        headerMenu: k,
                        navClick: x,
                        activeIndex: e,
                        showDropMenu: t,
                        showMenu: L,
                        hideMenu: S,
                        goLogin: N,
                        goRegister: T,
                        showSideMenu: m,
                        getService: A,
                        path: y,
                        handleMenuClick: M
                    }
                },
                watch: {
                    "$i18n.locale": function(e, t) {
                        e !== t && this.$store.dispatch("getGameVendor", {
                            flush: !0
                        })
                    }
                }
            }
              , Qn = Zn
              , Yn = (0, _.A)(Qn, Cn, bn, !1, null, null, null)
              , Jn = Yn.exports
              , Wn = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "footer-container"
                }, [t("div", {
                    staticClass: "footer-content page-center",
                    class: {
                        off: e.showSideMenu
                    }
                }, [t("div", {
                    staticClass: "footer-top"
                }, [t("div", {
                    staticClass: "list-wrap help-list"
                }, [t("div", {
                    staticClass: "list-title"
                }, [e._v(e._s(e.$t("help_up")))]), t("div", {
                    staticClass: "list-content"
                }, [e._l(e.helpList, (function(n, a) {
                    return [t("div", {
                        key: a,
                        class: ["br-hmenu-nav", n.tag],
                        on: {
                            click: function(t) {
                                return e.clickMenu(n.tag)
                            }
                        }
                    }, [e._v(" " + e._s(n.title) + " ")])]
                }
                ))], 2)]), t("div", {
                    staticClass: "list-wrap product-list"
                }, [t("div", {
                    staticClass: "list-title"
                }, [e._v(e._s(e.$t("product")))]), t("div", {
                    staticClass: "list-content"
                }, e._l(e.productsItem, (function(n, a) {
                    return t("div", {
                        key: "".concat(n.gameType, "-").concat(a),
                        staticClass: "list-item",
                        on: {
                            click: function(t) {
                                return e.handleItemClick(n.gameType)
                            }
                        }
                    }, [e._v(" " + e._s(e.$t(n.name)) + " ")])
                }
                )), 0)]), t("div", {
                    staticClass: "list-wrap follow-list"
                }, [t("div", {
                    staticClass: "list-title"
                }, [e._v(e._s(e.$t("follow_us")))]), t("div", {
                    staticClass: "list-content"
                }, [e._v("© 2024 PGPC All rights reserved")])]), t("div", {
                    staticClass: "list-wrap social-info"
                }, [t("div", {
                    staticClass: "list-title"
                }, [e._v(e._s(e.$t("social_media")))]), t("div", {
                    staticClass: "list-content"
                }, [e.hasService("FACEBOOK") ? t("div", {
                    staticClass: "channel-item fb",
                    on: {
                        click: function(t) {
                            return e.getService("FACEBOOK")
                        }
                    }
                }) : e._e(), e.hasService("YOUTUBE") ? t("div", {
                    staticClass: "channel-item yt",
                    on: {
                        click: function(t) {
                            return e.getService("YOUTUBE")
                        }
                    }
                }) : e._e()])])]), t("div", {
                    staticClass: "footer-info"
                }, [t("ul", {
                    staticClass: "icons"
                }, e._l(e.iconVendors, (function(n, a) {
                    return t("img", {
                        key: a,
                        staticClass: "icon-img",
                        attrs: {
                            src: "".concat(e.imgUrl, "/TCG_PROD_IMAGES/RNG_LIST_VENDOR/").concat(n, "-GRAY.png"),
                            alt: ""
                        }
                    })
                }
                )), 0)])])])
            }
              , Kn = []
              , Xn = (n(46449),
            n(93514),
            n(13609),
            n(16034),
            n(11392),
            {
                mixins: [I],
                components: {},
                setup: function() {
                    var e = (0,
                    o.Kh)({
                        icons: [],
                        iconVendors: ["PG", "EG2", "PT", "JDB", "CQ9", "FC", "JL", "BGS"]
                    })
                      , t = (0,
                    h.yP)()
                      , n = t.showSideMenu
                      , a = (0,
                    h.rd)()
                      , i = (0,
                    h.hS)()
                      , s = (0,
                    h.Pj)()
                      , r = s.store
                      , c = s.dispatch
                      , l = s.commit
                      , u = (0,
                    h.ok)()
                      , d = u.currentLanguage
                      , m = (0,
                    h.s9)()
                      , g = m.t
                      , f = (0,
                    h.OW)()
                      , w = f.navItems
                      , C = f.gameVendor
                      , b = (0,
                    o.EW)((function() {
                        return r.Help.helpContent
                    }
                    ))
                      , _ = (0,
                    o.EW)((function() {
                        return r.Login.imgUrl
                    }
                    ))
                      , A = function(e) {
                        e ? a.push("/help#".concat(e)) : a.push("/help"),
                        i.show("helpModal")
                    }
                      , y = function() {
                        c("getHelpV2", {
                            data: {
                                lang: d.value,
                                device: "WEB"
                            }
                        })
                    }
                      , P = (0,
                    o.EW)((function() {
                        var e = ["PROMO", "HOME"]
                          , t = w.value.reduce((function(t, n) {
                            var a, i = n.gameType;
                            if (e.includes(i))
                                return t;
                            var o = (0,
                            v.cloneDeep)((null === (a = C.value) || void 0 === a ? void 0 : a[i]) || [])
                              , s = !!o.length
                              , r = {
                                displayName: g("in_type_all"),
                                vassalage: "",
                                gameType: i
                            };
                            return s && o.unshift(r),
                            [].concat((0,
                            pt.A)(t), [(0,
                            p.A)((0,
                            p.A)({}, n), {}, {
                                vendors: o,
                                hasVendors: s
                            })])
                        }
                        ), []);
                        return t
                    }
                    ))
                      , k = function(e) {
                        l("setCurrentGameType", e),
                        document.body.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth"
                        })
                    }
                      , M = function(t) {
                        var n = function(e) {
                            var t = e.gameType
                              , n = e.vassalage;
                            return "ESPORTS" === t && (t = "SPORTS"),
                            "JL" === n && (t = "RNG"),
                            "".concat(_.value, "/TCG_PROD_IMAGES/").concat(t, "_LIST_VENDOR/").concat(n, "-GRAY.png")
                        }
                          , a = Object.values(t).flat().reduce((function(e, t) {
                            var a = t.vassalage;
                            return a.startsWith("TCG") || (e[a] = n(t)),
                            e
                        }
                        ), {});
                        e.icons = Object.values(a)
                    };
                    return (0,
                    o.wB)(d, y, {
                        immediate: !0
                    }),
                    (0,
                    o.wB)(C, M, {
                        immediate: !0
                    }),
                    (0,
                    p.A)((0,
                    p.A)({}, (0,
                    o.QW)(e)), {}, {
                        showSideMenu: n,
                        clickMenu: A,
                        helpList: b,
                        productsItem: P,
                        getService: I,
                        handleItemClick: k,
                        imgUrl: _
                    })
                }
            })
              , $n = Xn
              , ea = (0, _.A)($n, Wn, Kn, !1, null, null, null)
              , ta = ea.exports
              , na = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "side-wrapper"
                }, [t("div", {
                    staticClass: "side-top"
                }, [t("div", {
                    staticClass: "switch-icon",
                    class: {
                        off: !e.showSideMenu
                    },
                    on: {
                        click: function(t) {
                            return t.stopPropagation(),
                            e.setShowSideMenu("reverse")
                        }
                    }
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "icon-menu"
                    }
                })], 1), t("CommonLogo", {
                    staticClass: "logo",
                    attrs: {
                        src: n(65549)
                    },
                    on: {
                        logoClick: function(t) {
                            return e.setGameType("HOME")
                        }
                    }
                })], 1), t("div", {
                    staticClass: "side-menu",
                    class: {
                        off: !e.showSideMenu,
                        show: e.showDownload
                    }
                }, [t("div", {
                    staticClass: "side-menu-bg"
                }, [t("div", {
                    staticClass: "nav-wrapper"
                }, e._l(e.menu, (function(n, a) {
                    return t("div", {
                        key: a,
                        staticClass: "nav-item",
                        class: {
                            style1: "depositv2" === n.page || "withdraw" === n.page
                        },
                        on: {
                            click: function(t) {
                                return e.handleItemClick(n.page)
                            }
                        }
                    }, [t("svg-icon", {
                        staticClass: "nav-item-icon",
                        attrs: {
                            iconClass: n.icon
                        }
                    }), t("div", {
                        staticClass: "label-text"
                    }, [e._v(e._s(e.$t(n.name)))])], 1)
                }
                )), 0), t("div", {
                    staticClass: "nav-wrapper"
                }, [t("div", {
                    staticClass: "nav-item style1",
                    on: {
                        click: function(t) {
                            return e.toggleShow("showMemberList")
                        }
                    }
                }, [t("svg-icon", {
                    staticClass: "nav-item-icon",
                    attrs: {
                        iconClass: "member"
                    }
                }), t("div", {
                    staticClass: "label-text"
                }, [e._v(e._s(e.$t("hd_member_center")))])], 1), t("div", {
                    staticClass: "member-list",
                    class: {
                        show: e.showMemberList
                    }
                }, e._l(e.memberNav, (function(n, a) {
                    return t("div", {
                        key: a,
                        staticClass: "nav-item member",
                        on: {
                            click: function(t) {
                                return e.handleItemClick(n.page)
                            }
                        }
                    }, [t("div", {
                        staticClass: "label-text"
                    }, [e._v(e._s(e.$t(n.name)))]), t("svg-icon", {
                        staticClass: "nav-item-icon",
                        attrs: {
                            iconClass: "side-arrow"
                        }
                    })], 1)
                }
                )), 0)]), t("div", {
                    staticClass: "nav-wrapper"
                }, [t("div", {
                    staticClass: "nav-item style1",
                    on: {
                        click: function(t) {
                            return e.toggleShow("showGameList")
                        }
                    }
                }, [t("svg-icon", {
                    staticClass: "nav-item-icon",
                    attrs: {
                        iconClass: "game-center"
                    }
                }), t("div", {
                    staticClass: "label-text"
                }, [e._v(e._s(e.$t("in_game_center")))])], 1), t("div", {
                    staticClass: "game-list",
                    class: {
                        show: e.showGameList
                    }
                }, e._l(e.menuList, (function(n, a) {
                    return t("div", {
                        key: a,
                        staticClass: "game-list-wrap"
                    }, [t("div", {
                        staticClass: "nav-item",
                        on: {
                            click: function(t) {
                                return e.setGameType(n.gameCategory)
                            }
                        }
                    }, [t("div", {
                        staticClass: "label-text"
                    }, [e._v(e._s(e.$t("".concat(e.gameTypeName[n.gameCategory]))))]), t("svg-icon", {
                        attrs: {
                            iconClass: "side-arrow"
                        }
                    })], 1)])
                }
                )), 0)]), t("div", {
                    staticClass: "download-group",
                    on: {
                        mouseenter: function(t) {
                            return e.handleShowDownload(!0)
                        },
                        mouseleave: function(t) {
                            return e.handleShowDownload(!1)
                        }
                    }
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "icon-download"
                    }
                }), t("span", {
                    staticClass: "download-text"
                }, [e._v(e._s(e.$t("download_promo")))]), t("div", {
                    staticClass: "download-content-wrapper"
                }, [t("div", {
                    staticClass: "download-content"
                }, [t("div", {
                    staticClass: "qrcode-ios"
                }, [t("div", {
                    staticClass: "qrcode_box"
                }, [t("VueQr", {
                    attrs: {
                        logoMargin: 2,
                        text: e.iosUrl,
                        size: 120,
                        margin: 5
                    }
                })], 1), t("div", {
                    staticClass: "qrcode-info"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "icon-apple"
                    }
                }), t("p", [e._v("IOS")])], 1)]), t("div", {
                    staticClass: "qrcode-android"
                }, [e.resources.Android ? t("div", {
                    staticClass: "qrcode_box"
                }, [t("VueQr", {
                    attrs: {
                        logoMargin: 2,
                        text: e.resources.Android && e.resources.Android.url || "",
                        size: 120,
                        margin: 5
                    }
                })], 1) : e._e(), t("div", {
                    staticClass: "qrcode-info"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "icon-android"
                    }
                }), t("p", [e._v("Android")])], 1)])])])], 1), e.activeMediaList.length > 1 ? t("div", {
                    staticClass: "channel-group"
                }, e._l(e.activeMediaList, (function(n) {
                    return t("div", {
                        key: n.type,
                        staticClass: "channel-list"
                    }, [t("div", {
                        staticClass: "channel-item",
                        on: {
                            click: function(t) {
                                return e.openResource(n.type)
                            }
                        }
                    }, [t("img", {
                        staticClass: "channel-img",
                        attrs: {
                            src: n.icon
                        }
                    })])])
                }
                )), 0) : e._e(), t("LanguageSelect")], 1)])])
            }
              , aa = []
              , ia = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "language-select"
                }, [t("SimpleSelect", {
                    attrs: {
                        dropAnimationName: "zoom-in-bottom"
                    }
                }, [t("template", {
                    slot: "selected"
                }, [t("div", {
                    staticClass: "language-selected"
                }, [t("NationFlag", {
                    attrs: {
                        type: "2",
                        lang: e.currentLanguage
                    }
                }), t("span", {
                    staticClass: "selected-name"
                }, [e._v(e._s(e.$t(e.currentLanguage)))])], 1)]), t("template", {
                    slot: "arrow"
                }, [t("svg-icon", {
                    attrs: {
                        iconClass: "common-arrow"
                    }
                })], 1), e._l(e.languages, (function(n, a) {
                    return [t("SimpleOption", {
                        key: "lang_".concat(a),
                        attrs: {
                            className: n === e.currentLanguage ? "selected" : "",
                            option: n
                        },
                        on: {
                            "option-selected": e.selectLanguage
                        }
                    }, [t("NationFlag", {
                        attrs: {
                            type: "2",
                            lang: n
                        }
                    }), t("span", [e._v(e._s(e.$t(n)))])], 1)]
                }
                ))], 2)], 1)
            }
              , oa = []
              , sa = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "simple-select"
                }, [t("div", {
                    ref: "selectInput",
                    staticClass: "select-input",
                    on: {
                        click: e.toggleOptions
                    }
                }, [t("div", {
                    staticClass: "selected-option"
                }, [e._t("selected")], 2), t("i", {
                    staticClass: "arrow-icon",
                    class: {
                        up: e.showOptions,
                        down: !e.showOptions
                    }
                }, [e._t("arrow", (function() {
                    return [t("svg-icon", {
                        attrs: {
                            className: "arrow-down",
                            iconClass: "arrow-down"
                        }
                    })]
                }
                ))], 2)]), t("transition", {
                    attrs: {
                        name: e.dropAnimationName
                    }
                }, [t("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.showOptions,
                        expression: "showOptions"
                    }],
                    staticClass: "select-options"
                }, [e._t("default")], 2)])], 1)
            }
              , ra = []
              , ca = {
                name: "simpleSelect",
                props: {
                    dropAnimationName: {
                        type: String,
                        default: "zoom-in-top"
                    }
                },
                data: function() {
                    return {
                        showOptions: !1
                    }
                },
                methods: {
                    toggleOptions: function() {
                        this.showOptions = !this.showOptions,
                        this.showOptions ? document.addEventListener("click", this.closeOptions) : document.removeEventListener("click", this.closeOptions)
                    },
                    closeOptions: function(e) {
                        this.$refs.selectInput.contains(e.target) || (this.showOptions = !1,
                        document.removeEventListener("click", this.closeOptions))
                    }
                }
            }
              , la = ca
              , ua = (0, _.A)(la, sa, ra, !1, null, null, null)
              , da = ua.exports
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
              , ha = va.exports
              , wa = {
                components: {
                    NationFlag: u.io,
                    SimpleSelect: da,
                    SimpleOption: ha
                },
                setup: function() {
                    var e = U.A.supportLanguages
                      , t = (0,
                    h.ok)()
                      , n = t.currentLanguage
                      , a = t.changeLanguageTo
                      , i = function(e) {
                        a(e)
                    };
                    return {
                        languages: e,
                        currentLanguage: n,
                        selectLanguage: i
                    }
                }
            }
              , Ca = wa
              , ba = (0, _.A)(Ca, ia, oa, !1, null, null, null)
              , _a = ba.exports
              , Aa = n(95167)
              , ya = function() {
                var e = this
                  , t = e._self._c;
                return e.bindElement ? t("div", {
                    staticClass: "qr_img_wrap"
                }, [t("img", e._b({}, "img", {
                    id: e.uuid
                }, !1))]) : e._e()
            }
              , Pa = [];
            function ka(e) {
                return "" === e ? e : "true" === e || "1" == e
            }
            function Ma(e) {
                for (var t = "", n = "", a = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], i = 0; i < e; i++)
                    n = Math.round(Math.random() * (a.length - 1)),
                    t += a[n];
                return t
            }
            var xa;
            n(33771);
            (function() {
                function e(e) {
                    this.mode = n.MODE_8BIT_BYTE,
                    this.data = e,
                    this.parsedData = [];
                    for (var t = 0, a = this.data.length; t < a; t++) {
                        var i = []
                          , o = this.data.charCodeAt(t);
                        o > 65536 ? (i[0] = 240 | (1835008 & o) >>> 18,
                        i[1] = 128 | (258048 & o) >>> 12,
                        i[2] = 128 | (4032 & o) >>> 6,
                        i[3] = 128 | 63 & o) : o > 2048 ? (i[0] = 224 | (61440 & o) >>> 12,
                        i[1] = 128 | (4032 & o) >>> 6,
                        i[2] = 128 | 63 & o) : o > 128 ? (i[0] = 192 | (1984 & o) >>> 6,
                        i[1] = 128 | 63 & o) : i[0] = o,
                        this.parsedData.push(i)
                    }
                    this.parsedData = Array.prototype.concat.apply([], this.parsedData),
                    this.parsedData.length != this.data.length && (this.parsedData.unshift(191),
                    this.parsedData.unshift(187),
                    this.parsedData.unshift(239))
                }
                function t(e, t) {
                    this.typeNumber = e,
                    this.errorCorrectLevel = t,
                    this.modules = null,
                    this.moduleCount = 0,
                    this.dataCache = null,
                    this.dataList = []
                }
                e.prototype = {
                    getLength: function(e) {
                        return this.parsedData.length
                    },
                    write: function(e) {
                        for (var t = 0, n = this.parsedData.length; t < n; t++)
                            e.put(this.parsedData[t], 8)
                    }
                },
                t.prototype = {
                    addData: function(t) {
                        var n = new e(t);
                        this.dataList.push(n),
                        this.dataCache = null
                    },
                    isDark: function(e, t) {
                        if (e < 0 || this.moduleCount <= e || t < 0 || this.moduleCount <= t)
                            throw new Error(e + "," + t);
                        return this.modules[e][t]
                    },
                    getModuleCount: function() {
                        return this.moduleCount
                    },
                    make: function() {
                        if (this.typeNumber < 1) {
                            var e = 1;
                            for (e = 1; e < 40; e++) {
                                for (var t = l.getRSBlocks(e, this.errorCorrectLevel), n = new u, a = 0, i = 0; i < t.length; i++)
                                    a += t[i].dataCount;
                                for (i = 0; i < this.dataList.length; i++) {
                                    var s = this.dataList[i];
                                    n.put(s.mode, 4),
                                    n.put(s.getLength(), o.getLengthInBits(s.mode, e)),
                                    s.write(n)
                                }
                                if (n.getLengthInBits() <= 8 * a)
                                    break
                            }
                            this.typeNumber = e
                        }
                        this.makeImpl(!1, this.getBestMaskPattern())
                    },
                    makeImpl: function(e, n) {
                        this.moduleCount = 4 * this.typeNumber + 17,
                        this.modules = new Array(this.moduleCount);
                        for (var a = 0; a < this.moduleCount; a++) {
                            this.modules[a] = new Array(this.moduleCount);
                            for (var i = 0; i < this.moduleCount; i++)
                                this.modules[a][i] = null
                        }
                        this.setupPositionProbePattern(0, 0),
                        this.setupPositionProbePattern(this.moduleCount - 7, 0),
                        this.setupPositionProbePattern(0, this.moduleCount - 7),
                        this.setupPositionAdjustPattern(),
                        this.setupTimingPattern(),
                        this.setupTypeInfo(e, n),
                        this.typeNumber >= 7 && this.setupTypeNumber(e),
                        null == this.dataCache && (this.dataCache = t.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)),
                        this.mapData(this.dataCache, n)
                    },
                    setupPositionProbePattern: function(e, t) {
                        for (var n = -1; n <= 7; n++)
                            if (!(e + n <= -1 || this.moduleCount <= e + n))
                                for (var a = -1; a <= 7; a++)
                                    t + a <= -1 || this.moduleCount <= t + a || (this.modules[e + n][t + a] = 0 <= n && n <= 6 && (0 == a || 6 == a) || 0 <= a && a <= 6 && (0 == n || 6 == n) || 2 <= n && n <= 4 && 2 <= a && a <= 4)
                    },
                    getBestMaskPattern: function() {
                        for (var e = 0, t = 0, n = 0; n < 8; n++) {
                            this.makeImpl(!0, n);
                            var a = o.getLostPoint(this);
                            (0 == n || e > a) && (e = a,
                            t = n)
                        }
                        return t
                    },
                    createMovieClip: function(e, t, n) {
                        var a = e.createEmptyMovieClip(t, n)
                          , i = 1;
                        this.make();
                        for (var o = 0; o < this.modules.length; o++)
                            for (var s = o * i, r = 0; r < this.modules[o].length; r++) {
                                var c = r * i
                                  , l = this.modules[o][r];
                                l && (a.beginFill(0, 100),
                                a.moveTo(c, s),
                                a.lineTo(c + i, s),
                                a.lineTo(c + i, s + i),
                                a.lineTo(c, s + i),
                                a.endFill())
                            }
                        return a
                    },
                    setupTimingPattern: function() {
                        for (var e = 8; e < this.moduleCount - 8; e++)
                            null == this.modules[e][6] && (this.modules[e][6] = e % 2 == 0);
                        for (var t = 8; t < this.moduleCount - 8; t++)
                            null == this.modules[6][t] && (this.modules[6][t] = t % 2 == 0)
                    },
                    setupPositionAdjustPattern: function() {
                        for (var e = o.getPatternPosition(this.typeNumber), t = 0; t < e.length; t++)
                            for (var n = 0; n < e.length; n++) {
                                var a = e[t]
                                  , i = e[n];
                                if (null == this.modules[a][i])
                                    for (var s = -2; s <= 2; s++)
                                        for (var r = -2; r <= 2; r++)
                                            this.modules[a + s][i + r] = -2 == s || 2 == s || -2 == r || 2 == r || 0 == s && 0 == r
                            }
                    },
                    setupTypeNumber: function(e) {
                        for (var t = o.getBCHTypeNumber(this.typeNumber), n = 0; n < 18; n++) {
                            var a = !e && 1 == (t >> n & 1);
                            this.modules[Math.floor(n / 3)][n % 3 + this.moduleCount - 8 - 3] = a
                        }
                        for (n = 0; n < 18; n++) {
                            a = !e && 1 == (t >> n & 1);
                            this.modules[n % 3 + this.moduleCount - 8 - 3][Math.floor(n / 3)] = a
                        }
                    },
                    setupTypeInfo: function(e, t) {
                        for (var n = this.errorCorrectLevel << 3 | t, a = o.getBCHTypeInfo(n), i = 0; i < 15; i++) {
                            var s = !e && 1 == (a >> i & 1);
                            i < 6 ? this.modules[i][8] = s : i < 8 ? this.modules[i + 1][8] = s : this.modules[this.moduleCount - 15 + i][8] = s
                        }
                        for (i = 0; i < 15; i++) {
                            s = !e && 1 == (a >> i & 1);
                            i < 8 ? this.modules[8][this.moduleCount - i - 1] = s : i < 9 ? this.modules[8][15 - i - 1 + 1] = s : this.modules[8][15 - i - 1] = s
                        }
                        this.modules[this.moduleCount - 8][8] = !e
                    },
                    mapData: function(e, t) {
                        for (var n = -1, a = this.moduleCount - 1, i = 7, s = 0, r = this.moduleCount - 1; r > 0; r -= 2) {
                            6 == r && r--;
                            while (1) {
                                for (var c = 0; c < 2; c++)
                                    if (null == this.modules[a][r - c]) {
                                        var l = !1;
                                        s < e.length && (l = 1 == (e[s] >>> i & 1));
                                        var u = o.getMask(t, a, r - c);
                                        u && (l = !l),
                                        this.modules[a][r - c] = l,
                                        i--,
                                        -1 == i && (s++,
                                        i = 7)
                                    }
                                if (a += n,
                                a < 0 || this.moduleCount <= a) {
                                    a -= n,
                                    n = -n;
                                    break
                                }
                            }
                        }
                    }
                },
                t.PAD0 = 236,
                t.PAD1 = 17,
                t.createData = function(e, n, a) {
                    for (var i = l.getRSBlocks(e, n), s = new u, r = 0; r < a.length; r++) {
                        var c = a[r];
                        s.put(c.mode, 4),
                        s.put(c.getLength(), o.getLengthInBits(c.mode, e)),
                        c.write(s)
                    }
                    var d = 0;
                    for (r = 0; r < i.length; r++)
                        d += i[r].dataCount;
                    if (s.getLengthInBits() > 8 * d)
                        throw new Error("code length overflow. (" + s.getLengthInBits() + ">" + 8 * d + ")");
                    s.getLengthInBits() + 4 <= 8 * d && s.put(0, 4);
                    while (s.getLengthInBits() % 8 != 0)
                        s.putBit(!1);
                    while (1) {
                        if (s.getLengthInBits() >= 8 * d)
                            break;
                        if (s.put(t.PAD0, 8),
                        s.getLengthInBits() >= 8 * d)
                            break;
                        s.put(t.PAD1, 8)
                    }
                    return t.createBytes(s, i)
                }
                ,
                t.createBytes = function(e, t) {
                    for (var n = 0, a = 0, i = 0, s = new Array(t.length), r = new Array(t.length), l = 0; l < t.length; l++) {
                        var u = t[l].dataCount
                          , d = t[l].totalCount - u;
                        a = Math.max(a, u),
                        i = Math.max(i, d),
                        s[l] = new Array(u);
                        for (var m = 0; m < s[l].length; m++)
                            s[l][m] = 255 & e.buffer[m + n];
                        n += u;
                        var p = o.getErrorCorrectPolynomial(d)
                          , g = new c(s[l],p.getLength() - 1)
                          , f = g.mod(p);
                        r[l] = new Array(p.getLength() - 1);
                        for (m = 0; m < r[l].length; m++) {
                            var v = m + f.getLength() - r[l].length;
                            r[l][m] = v >= 0 ? f.get(v) : 0
                        }
                    }
                    var h = 0;
                    for (m = 0; m < t.length; m++)
                        h += t[m].totalCount;
                    var w = new Array(h)
                      , C = 0;
                    for (m = 0; m < a; m++)
                        for (l = 0; l < t.length; l++)
                            m < s[l].length && (w[C++] = s[l][m]);
                    for (m = 0; m < i; m++)
                        for (l = 0; l < t.length; l++)
                            m < r[l].length && (w[C++] = r[l][m]);
                    return w
                }
                ;
                for (var n = {
                    MODE_NUMBER: 1,
                    MODE_ALPHA_NUM: 2,
                    MODE_8BIT_BYTE: 4,
                    MODE_KANJI: 8
                }, a = {
                    L: 1,
                    M: 0,
                    Q: 3,
                    H: 2
                }, i = {
                    PATTERN000: 0,
                    PATTERN001: 1,
                    PATTERN010: 2,
                    PATTERN011: 3,
                    PATTERN100: 4,
                    PATTERN101: 5,
                    PATTERN110: 6,
                    PATTERN111: 7
                }, o = {
                    PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
                    G15: 1335,
                    G18: 7973,
                    G15_MASK: 21522,
                    getBCHTypeInfo: function(e) {
                        var t = e << 10;
                        while (o.getBCHDigit(t) - o.getBCHDigit(o.G15) >= 0)
                            t ^= o.G15 << o.getBCHDigit(t) - o.getBCHDigit(o.G15);
                        return (e << 10 | t) ^ o.G15_MASK
                    },
                    getBCHTypeNumber: function(e) {
                        var t = e << 12;
                        while (o.getBCHDigit(t) - o.getBCHDigit(o.G18) >= 0)
                            t ^= o.G18 << o.getBCHDigit(t) - o.getBCHDigit(o.G18);
                        return e << 12 | t
                    },
                    getBCHDigit: function(e) {
                        var t = 0;
                        while (0 != e)
                            t++,
                            e >>>= 1;
                        return t
                    },
                    getPatternPosition: function(e) {
                        return o.PATTERN_POSITION_TABLE[e - 1]
                    },
                    getMask: function(e, t, n) {
                        switch (e) {
                        case i.PATTERN000:
                            return (t + n) % 2 == 0;
                        case i.PATTERN001:
                            return t % 2 == 0;
                        case i.PATTERN010:
                            return n % 3 == 0;
                        case i.PATTERN011:
                            return (t + n) % 3 == 0;
                        case i.PATTERN100:
                            return (Math.floor(t / 2) + Math.floor(n / 3)) % 2 == 0;
                        case i.PATTERN101:
                            return t * n % 2 + t * n % 3 == 0;
                        case i.PATTERN110:
                            return (t * n % 2 + t * n % 3) % 2 == 0;
                        case i.PATTERN111:
                            return (t * n % 3 + (t + n) % 2) % 2 == 0;
                        default:
                            throw new Error("bad maskPattern:" + e)
                        }
                    },
                    getErrorCorrectPolynomial: function(e) {
                        for (var t = new c([1],0), n = 0; n < e; n++)
                            t = t.multiply(new c([1, s.gexp(n)],0));
                        return t
                    },
                    getLengthInBits: function(e, t) {
                        if (1 <= t && t < 10)
                            switch (e) {
                            case n.MODE_NUMBER:
                                return 10;
                            case n.MODE_ALPHA_NUM:
                                return 9;
                            case n.MODE_8BIT_BYTE:
                                return 8;
                            case n.MODE_KANJI:
                                return 8;
                            default:
                                throw new Error("mode:" + e)
                            }
                        else if (t < 27)
                            switch (e) {
                            case n.MODE_NUMBER:
                                return 12;
                            case n.MODE_ALPHA_NUM:
                                return 11;
                            case n.MODE_8BIT_BYTE:
                                return 16;
                            case n.MODE_KANJI:
                                return 10;
                            default:
                                throw new Error("mode:" + e)
                            }
                        else {
                            if (!(t < 41))
                                throw new Error("type:" + t);
                            switch (e) {
                            case n.MODE_NUMBER:
                                return 14;
                            case n.MODE_ALPHA_NUM:
                                return 13;
                            case n.MODE_8BIT_BYTE:
                                return 16;
                            case n.MODE_KANJI:
                                return 12;
                            default:
                                throw new Error("mode:" + e)
                            }
                        }
                    },
                    getLostPoint: function(e) {
                        for (var t = e.getModuleCount(), n = 0, a = 0; a < t; a++)
                            for (var i = 0; i < t; i++) {
                                for (var o = 0, s = e.isDark(a, i), r = -1; r <= 1; r++)
                                    if (!(a + r < 0 || t <= a + r))
                                        for (var c = -1; c <= 1; c++)
                                            i + c < 0 || t <= i + c || 0 == r && 0 == c || s == e.isDark(a + r, i + c) && o++;
                                o > 5 && (n += 3 + o - 5)
                            }
                        for (a = 0; a < t - 1; a++)
                            for (i = 0; i < t - 1; i++) {
                                var l = 0;
                                e.isDark(a, i) && l++,
                                e.isDark(a + 1, i) && l++,
                                e.isDark(a, i + 1) && l++,
                                e.isDark(a + 1, i + 1) && l++,
                                0 != l && 4 != l || (n += 3)
                            }
                        for (a = 0; a < t; a++)
                            for (i = 0; i < t - 6; i++)
                                e.isDark(a, i) && !e.isDark(a, i + 1) && e.isDark(a, i + 2) && e.isDark(a, i + 3) && e.isDark(a, i + 4) && !e.isDark(a, i + 5) && e.isDark(a, i + 6) && (n += 40);
                        for (i = 0; i < t; i++)
                            for (a = 0; a < t - 6; a++)
                                e.isDark(a, i) && !e.isDark(a + 1, i) && e.isDark(a + 2, i) && e.isDark(a + 3, i) && e.isDark(a + 4, i) && !e.isDark(a + 5, i) && e.isDark(a + 6, i) && (n += 40);
                        var u = 0;
                        for (i = 0; i < t; i++)
                            for (a = 0; a < t; a++)
                                e.isDark(a, i) && u++;
                        var d = Math.abs(100 * u / t / t - 50) / 5;
                        return n += 10 * d,
                        n
                    }
                }, s = {
                    glog: function(e) {
                        if (e < 1)
                            throw new Error("glog(" + e + ")");
                        return s.LOG_TABLE[e]
                    },
                    gexp: function(e) {
                        while (e < 0)
                            e += 255;
                        while (e >= 256)
                            e -= 255;
                        return s.EXP_TABLE[e]
                    },
                    EXP_TABLE: new Array(256),
                    LOG_TABLE: new Array(256)
                }, r = 0; r < 8; r++)
                    s.EXP_TABLE[r] = 1 << r;
                for (r = 8; r < 256; r++)
                    s.EXP_TABLE[r] = s.EXP_TABLE[r - 4] ^ s.EXP_TABLE[r - 5] ^ s.EXP_TABLE[r - 6] ^ s.EXP_TABLE[r - 8];
                for (r = 0; r < 255; r++)
                    s.LOG_TABLE[s.EXP_TABLE[r]] = r;
                function c(e, t) {
                    if (void 0 == e.length)
                        throw new Error(e.length + "/" + t);
                    var n = 0;
                    while (n < e.length && 0 == e[n])
                        n++;
                    this.num = new Array(e.length - n + t);
                    for (var a = 0; a < e.length - n; a++)
                        this.num[a] = e[a + n]
                }
                function l(e, t) {
                    this.totalCount = e,
                    this.dataCount = t
                }
                function u() {
                    this.buffer = [],
                    this.length = 0
                }
                c.prototype = {
                    get: function(e) {
                        return this.num[e]
                    },
                    getLength: function() {
                        return this.num.length
                    },
                    multiply: function(e) {
                        for (var t = new Array(this.getLength() + e.getLength() - 1), n = 0; n < this.getLength(); n++)
                            for (var a = 0; a < e.getLength(); a++)
                                t[n + a] ^= s.gexp(s.glog(this.get(n)) + s.glog(e.get(a)));
                        return new c(t,0)
                    },
                    mod: function(e) {
                        if (this.getLength() - e.getLength() < 0)
                            return this;
                        for (var t = s.glog(this.get(0)) - s.glog(e.get(0)), n = new Array(this.getLength()), a = 0; a < this.getLength(); a++)
                            n[a] = this.get(a);
                        for (a = 0; a < e.getLength(); a++)
                            n[a] ^= s.gexp(s.glog(e.get(a)) + t);
                        return new c(n,0).mod(e)
                    }
                },
                l.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]],
                l.getRSBlocks = function(e, t) {
                    var n = l.getRsBlockTable(e, t);
                    if (void 0 == n)
                        throw new Error("bad rs block @ typeNumber:" + e + "/errorCorrectLevel:" + t);
                    for (var a = n.length / 3, i = [], o = 0; o < a; o++)
                        for (var s = n[3 * o + 0], r = n[3 * o + 1], c = n[3 * o + 2], u = 0; u < s; u++)
                            i.push(new l(r,c));
                    return i
                }
                ,
                l.getRsBlockTable = function(e, t) {
                    switch (t) {
                    case a.L:
                        return l.RS_BLOCK_TABLE[4 * (e - 1) + 0];
                    case a.M:
                        return l.RS_BLOCK_TABLE[4 * (e - 1) + 1];
                    case a.Q:
                        return l.RS_BLOCK_TABLE[4 * (e - 1) + 2];
                    case a.H:
                        return l.RS_BLOCK_TABLE[4 * (e - 1) + 3];
                    default:
                        return
                    }
                }
                ,
                u.prototype = {
                    get: function(e) {
                        var t = Math.floor(e / 8);
                        return 1 == (this.buffer[t] >>> 7 - e % 8 & 1)
                    },
                    put: function(e, t) {
                        for (var n = 0; n < t; n++)
                            this.putBit(1 == (e >>> t - n - 1 & 1))
                    },
                    getLengthInBits: function() {
                        return this.length
                    },
                    putBit: function(e) {
                        var t = Math.floor(this.length / 8);
                        this.buffer.length <= t && this.buffer.push(0),
                        e && (this.buffer[t] |= 128 >>> this.length % 8),
                        this.length++
                    }
                };
                function d() {
                    return "undefined" != typeof CanvasRenderingContext2D
                }
                var m = d() ? function() {
                    function e() {
                        this._elImage.src = this._elCanvas.toDataURL("image/png"),
                        this._elImage.style.display = "block",
                        this._elCanvas.style.display = "none"
                    }
                    function t(e, t) {
                        var n = this;
                        if (n._fFail = t,
                        n._fSuccess = e,
                        null === n._bSupportDataURI) {
                            var a = document.createElement("img")
                              , i = function() {
                                n._bSupportDataURI = !1,
                                n._fFail && n._fFail.call(n)
                            }
                              , o = function() {
                                n._bSupportDataURI = !0,
                                n._fSuccess && n._fSuccess.call(n)
                            };
                            return a.onabort = i,
                            a.onerror = i,
                            a.onload = o,
                            void (a.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")
                        }
                        !0 === n._bSupportDataURI && n._fSuccess ? n._fSuccess.call(n) : !1 === n._bSupportDataURI && n._fFail && n._fFail.call(n)
                    }
                    var n = function(e) {
                        this._bIsPainted = !1,
                        this._htOption = e,
                        this._elCanvas = document.createElement("canvas"),
                        this._elCanvas.width = e.size,
                        this._elCanvas.height = e.size,
                        this._oContext = this._elCanvas.getContext("2d"),
                        this._bIsPainted = !1,
                        this._elImage = document.createElement("img"),
                        this._elImage.alt = "Scan me!",
                        this._elImage.style.display = "none",
                        this._bSupportDataURI = null,
                        this._callback = e.callback,
                        this._bindElement = e.bindElement
                    };
                    return n.prototype.draw = function(e) {
                        var t = this._elImage
                          , n = document.createElement("canvas")
                          , a = n.getContext("2d")
                          , i = this._htOption
                          , s = e.getModuleCount()
                          , r = i.size
                          , c = i.margin;
                        (c < 0 || 2 * c >= r) && (c = 0);
                        var l = Math.ceil(c)
                          , u = r - 2 * c
                          , d = i.whiteMargin
                          , m = i.backgroundDimming
                          , C = u / s
                          , b = Math.ceil(C)
                          , _ = b
                          , A = b * s
                          , y = A + 2 * l;
                        n.width = y,
                        n.height = y;
                        var P = i.dotScale;
                        t.style.display = "none",
                        this.clear(),
                        (P <= 0 || P > 1) && (P = .35),
                        a.save(),
                        a.translate(l, l);
                        var k = document.createElement("canvas");
                        k.width = y,
                        k.height = y;
                        var M = k.getContext("2d")
                          , x = void 0
                          , L = void 0;
                        if (void 0 !== i.backgroundImage) {
                            if (i.autoColor) {
                                var S = w(i.backgroundImage);
                                i.colorDark = "rgb(" + S.r + ", " + S.g + ", " + S.b + ")"
                            }
                            i.maskedDots ? (x = document.createElement("canvas"),
                            x.width = y,
                            x.height = y,
                            L = x.getContext("2d"),
                            L.drawImage(i.backgroundImage, 0, 0, i.backgroundImage.width, i.backgroundImage.height, 0, 0, y, y),
                            M.rect(0, 0, y, y),
                            M.fillStyle = "#ffffff",
                            M.fill()) : (M.drawImage(i.backgroundImage, 0, 0, i.backgroundImage.width, i.backgroundImage.height, 0, 0, y, y),
                            M.rect(0, 0, y, y),
                            M.fillStyle = m,
                            M.fill())
                        } else
                            M.rect(0, 0, y, y),
                            M.fillStyle = "#ffffff",
                            M.fill();
                        i.binarize && (i.colorDark = "#000000",
                        i.colorLight = "#FFFFFF");
                        for (var N = o.getPatternPosition(e.typeNumber), T = .5 * (1 - P), R = 0; R < s; R++)
                            for (var O = 0; O < s; O++) {
                                for (var E = e.isDark(R, O), I = O < 8 && (R < 8 || R >= s - 8) || O >= s - 8 && R < 8, B = 6 === R || 6 === O || I, V = 0; V < N.length - 1; V++)
                                    B = B || R >= N[V] - 2 && R <= N[V] + 2 && O >= N[V] - 2 && O <= N[V] + 2;
                                var G = O * b + (B ? 0 : T * b)
                                  , H = R * _ + (B ? 0 : T * _);
                                if (a.strokeStyle = E ? i.colorDark : i.colorLight,
                                a.lineWidth = .5,
                                a.fillStyle = E ? i.colorDark : "rgba(255, 255, 255, 0.6)",
                                0 === N.length)
                                    B || f(a, G, H, (B ? 1 : P) * b, (B ? 1 : P) * _, x, E);
                                else {
                                    var D = O < s - 4 && O >= s - 4 - 5 && R < s - 4 && R >= s - 4 - 5;
                                    B || D || f(a, G, H, (B ? 1 : P) * b, (B ? 1 : P) * _, x, E)
                                }
                            }
                        var z = "rgba(255, 255, 255, 0.6)";
                        a.fillStyle = z,
                        a.fillRect(0, 0, 8 * b, 8 * _),
                        a.fillRect(0, (s - 8) * _, 8 * b, 8 * _),
                        a.fillRect((s - 8) * b, 0, 8 * b, 8 * _),
                        a.fillRect(8 * b, 6 * _, (s - 8 - 8) * b, _),
                        a.fillRect(6 * b, 8 * _, b, (s - 8 - 8) * _);
                        var U = N[N.length - 1];
                        for (V = 0; V < N.length; V++)
                            for (var q = 0; q < N.length; q++) {
                                var F = N[q]
                                  , j = N[V];
                                (6 !== F || 6 !== j && j !== U) && ((6 !== j || 6 !== F && F !== U) && v(a, F, j, b, _))
                            }
                        a.fillStyle = i.colorDark,
                        a.fillRect(0, 0, 7 * b, _),
                        a.fillRect((s - 7) * b, 0, 7 * b, _),
                        a.fillRect(0, 6 * _, 7 * b, _),
                        a.fillRect((s - 7) * b, 6 * _, 7 * b, _),
                        a.fillRect(0, (s - 7) * _, 7 * b, _),
                        a.fillRect(0, (s - 7 + 6) * _, 7 * b, _),
                        a.fillRect(0, 0, b, 7 * _),
                        a.fillRect(6 * b, 0, b, 7 * _),
                        a.fillRect((s - 7) * b, 0, b, 7 * _),
                        a.fillRect((s - 7 + 6) * b, 0, b, 7 * _),
                        a.fillRect(0, (s - 7) * _, b, 7 * _),
                        a.fillRect(6 * b, (s - 7) * _, b, 7 * _),
                        a.fillRect(2 * b, 2 * _, 3 * b, 3 * _),
                        a.fillRect((s - 7 + 2) * b, 2 * _, 3 * b, 3 * _),
                        a.fillRect(2 * b, (s - 7 + 2) * _, 3 * b, 3 * _);
                        for (V = 0; V < s - 8; V += 2)
                            a.fillRect((8 + V) * b, 6 * _, b, _),
                            a.fillRect(6 * b, (8 + V) * _, b, _);
                        for (V = 0; V < N.length; V++)
                            for (q = 0; q < N.length; q++) {
                                F = N[q],
                                j = N[V];
                                (6 !== F || 6 !== j && j !== U) && ((6 !== j || 6 !== F && F !== U) && (6 !== F && F !== U && 6 !== j && j !== U ? (a.fillStyle = "rgba(0, 0, 0, .2)",
                                h(a, F, j, b, _)) : (a.fillStyle = i.colorDark,
                                h(a, F, j, b, _))))
                            }
                        if (d && (a.fillStyle = "#FFFFFF",
                        a.fillRect(-l, -l, y, l),
                        a.fillRect(-l, A, y, l),
                        a.fillRect(A, -l, l, y),
                        a.fillRect(-l, -l, l, y)),
                        void 0 !== i.logoImage) {
                            var Z = i.logoScale
                              , Q = i.logoMargin
                              , Y = i.logoCornerRadius;
                            (Z <= 0 || Z >= 1) && (Z = .2),
                            Q < 0 && (Q = 0),
                            Y < 0 && (Y = 0),
                            a.restore();
                            var J = A * Z
                              , W = .5 * (y - J)
                              , K = W;
                            a.fillStyle = "#FFFFFF",
                            a.save(),
                            p(a, W - Q, K - Q, J + 2 * Q, J + 2 * Q, Y),
                            a.clip(),
                            a.fill(),
                            a.restore(),
                            a.save(),
                            p(a, W, K, J, J, Y),
                            a.clip(),
                            a.drawImage(i.logoImage, W, K, J, J),
                            a.restore()
                        }
                        if (M.drawImage(n, 0, 0, y, y),
                        a.drawImage(k, -l, -l, y, y),
                        i.binarize) {
                            var X = a.getImageData(0, 0, y, y)
                              , $ = 128;
                            parseInt(i.binarizeThreshold) > 0 && parseInt(i.binarizeThreshold) < 255 && ($ = parseInt(i.binarizeThreshold));
                            for (V = 0; V < X.data.length; V += 4) {
                                var ee = X.data[V]
                                  , te = X.data[V + 1]
                                  , ne = X.data[V + 2]
                                  , ae = g(ee, te, ne);
                                ae > $ ? (X.data[V] = 255,
                                X.data[V + 1] = 255,
                                X.data[V + 2] = 255) : (X.data[V] = 0,
                                X.data[V + 1] = 0,
                                X.data[V + 2] = 0)
                            }
                            a.putImageData(X, 0, 0)
                        }
                        var ie = document.createElement("canvas")
                          , oe = ie.getContext("2d");
                        if (ie.width = r,
                        ie.height = r,
                        oe.drawImage(n, 0, 0, r, r),
                        this._elCanvas = ie,
                        this._bIsPainted = !0,
                        void 0 !== this._callback && this._callback(this._elCanvas.toDataURL()),
                        void 0 !== this._bindElement)
                            try {
                                var se = document.getElementById(this._bindElement);
                                if ("IMG" === se.nodeName)
                                    se.src = this._elCanvas.toDataURL();
                                else {
                                    var re = se.style;
                                    re["background-image"] = "url(" + this._elCanvas.toDataURL() + ")",
                                    re["background-size"] = "contain",
                                    re["background-repeat"] = "no-repeat"
                                }
                            } catch (ce) {
                                console.error(ce)
                            }
                    }
                    ,
                    n.prototype.makeImage = function() {
                        this._bIsPainted && t.call(this, e)
                    }
                    ,
                    n.prototype.isPainted = function() {
                        return this._bIsPainted
                    }
                    ,
                    n.prototype.clear = function() {
                        this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height),
                        this._bIsPainted = !1
                    }
                    ,
                    n.prototype.round = function(e) {
                        return e ? Math.floor(1e3 * e) / 1e3 : e
                    }
                    ,
                    n
                }() : function() {
                    var e = function(e) {
                        this._htOption = e
                    };
                    return e.prototype.draw = function(e) {
                        for (var t = this._htOption, n = e.getModuleCount(), a = Math.floor(t.size / n), i = Math.floor(t.size / n), o = ['<table style="border:0;border-collapse:collapse;">'], s = 0; s < n; s++) {
                            o.push("<tr>");
                            for (var r = 0; r < n; r++)
                                o.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + a + "px;height:" + i + "px;background-color:" + (e.isDark(s, r) ? t.colorDark : t.colorLight) + ';"></td>');
                            o.push("</tr>")
                        }
                        o.push("</table>");
                        var c = (t.size - elTable.offsetWidth) / 2
                          , l = (t.size - elTable.offsetHeight) / 2;
                        c > 0 && l > 0 && (elTable.style.margin = l + "px " + c + "px")
                    }
                    ,
                    e.prototype.clear = function() {}
                    ,
                    e
                }();
                function p(e, t, n, a, i, o) {
                    e.beginPath(),
                    e.moveTo(t, n),
                    e.arcTo(t + a, n, t + a, n + i, o),
                    e.arcTo(t + a, n + i, t, n + i, o),
                    e.arcTo(t, n + i, t, n, o),
                    e.arcTo(t, n, t + a, n, o),
                    e.closePath()
                }
                function g(e, t, n) {
                    return .3 * e + .59 * n + .11 * n
                }
                function f(e, t, n, a, i, o) {
                    void 0 === o ? e.fillRect(t, n, a, i) : e.drawImage(o, t, n, a, i, t, n, a, i)
                }
                function f(e, t, n, a, i, o, s) {
                    if (void 0 === o)
                        e.fillRect(t, n, a, i);
                    else {
                        e.drawImage(o, t, n, a, i, t, n, a, i);
                        var r = e.fillStyle;
                        e.fillStyle = s ? "rgba(0, 0, 0, .5)" : "rgba(255, 255, 255, .7)",
                        e.fillRect(t, n, a, i),
                        e.fillStyle = r
                    }
                }
                function v(e, t, n, a, i) {
                    e.clearRect((t - 2) * a, (n - 2) * i, 5 * a, 5 * i),
                    e.fillRect((t - 2) * a, (n - 2) * i, 5 * a, 5 * i)
                }
                function h(e, t, n, a, i) {
                    e.fillRect((t - 2) * a, (n - 2) * i, a, 4 * i),
                    e.fillRect((t + 2) * a, (n - 2 + 1) * i, a, 4 * i),
                    e.fillRect((t - 2 + 1) * a, (n - 2) * i, 4 * a, i),
                    e.fillRect((t - 2) * a, (n + 2) * i, 4 * a, i),
                    e.fillRect(t * a, n * i, a, i)
                }
                function w(e) {
                    var t, n, a, i, o = 5, s = {
                        r: 0,
                        g: 0,
                        b: 0
                    }, r = document.createElement("canvas"), c = r.getContext && r.getContext("2d"), l = -4, u = {
                        r: 0,
                        g: 0,
                        b: 0
                    }, d = 0;
                    if (!c)
                        return s;
                    a = r.height = e.naturalHeight || e.offsetHeight || e.height,
                    n = r.width = e.naturalWidth || e.offsetWidth || e.width,
                    c.drawImage(e, 0, 0);
                    try {
                        t = c.getImageData(0, 0, n, a)
                    } catch (m) {
                        return s
                    }
                    i = t.data.length;
                    while ((l += 4 * o) < i)
                        t.data[l] > 200 || t.data[l + 1] > 200 || t.data[l + 2] > 200 || (++d,
                        u.r += t.data[l],
                        u.g += t.data[l + 1],
                        u.b += t.data[l + 2]);
                    return u.r = ~~(u.r / d),
                    u.g = ~~(u.g / d),
                    u.b = ~~(u.b / d),
                    u
                }
                xa = function() {}
                ,
                xa.prototype.create = function(e) {
                    if (this._htOption = {
                        size: 800,
                        margin: 20,
                        typeNumber: 4,
                        colorDark: "#000000",
                        colorLight: "#ffffff",
                        correctLevel: a.M,
                        backgroundImage: void 0,
                        backgroundDimming: "rgba(0,0,0,0)",
                        logoImage: void 0,
                        logoScale: .2,
                        logoMargin: 6,
                        logoCornerRadius: 8,
                        whiteMargin: !0,
                        dotScale: .35,
                        maskedDots: !1,
                        autoColor: !0,
                        binarize: !1,
                        binarizeThreshold: 128,
                        callback: void 0,
                        bindElement: void 0
                    },
                    "string" === typeof e && (e = {
                        text: e
                    }),
                    e)
                        for (var t in e)
                            this._htOption[t] = e[t];
                    this._htOption.useSVG && (m = svgDrawer),
                    this._oQRCode = null,
                    this._oDrawing = new m(this._htOption),
                    this._htOption.text && this.makeCode(this._htOption.text)
                }
                ,
                xa.prototype.makeCode = function(e) {
                    this._oQRCode = new t(-1,this._htOption.correctLevel),
                    this._oQRCode.addData(e),
                    this._oQRCode.make(),
                    this._oDrawing.draw(this._oQRCode),
                    this.makeImage()
                }
                ,
                xa.prototype.makeImage = function() {
                    "function" == typeof this._oDrawing.makeImage && this._oDrawing.makeImage()
                }
                ,
                xa.prototype.clear = function() {
                    this._oDrawing.clear()
                }
                ,
                xa.CorrectLevel = a
            }
            )();
            var La = xa;
            n(3296),
            n(27208),
            n(48408),
            n(14603),
            n(47566),
            n(98721);
            function Sa(e) {
                return new Promise((function(t, n) {
                    if ("data" == e.slice(0, 4)) {
                        var a = new Image;
                        return a.onload = function() {
                            t(a)
                        }
                        ,
                        a.onerror = function() {
                            n("Image load error")
                        }
                        ,
                        void (a.src = e)
                    }
                    var i = new XMLHttpRequest;
                    i.onload = function() {
                        var e = URL.createObjectURL(this.response)
                          , a = new Image;
                        a.onload = function() {
                            t(a),
                            URL.revokeObjectURL(e)
                        }
                        ,
                        a.onerror = function() {
                            n("Image load error")
                        }
                        ,
                        a.src = e
                    }
                    ,
                    i.open("GET", e, !0),
                    i.responseType = "blob",
                    i.send()
                }
                ))
            }
            var Na = Sa
              , Ta = {
                props: {
                    text: {
                        type: String,
                        required: !0
                    },
                    qid: {
                        type: String
                    },
                    size: {
                        type: Number,
                        default: 200
                    },
                    margin: {
                        type: Number,
                        default: 20
                    },
                    colorDark: {
                        type: String,
                        default: "#000000"
                    },
                    colorLight: {
                        type: String,
                        default: "#FFFFFF"
                    },
                    bgSrc: {
                        type: String,
                        default: void 0
                    },
                    backgroundDimming: {
                        type: String,
                        default: "rgba(0,0,0,0)"
                    },
                    logoSrc: {
                        type: String,
                        default: void 0
                    },
                    logoScale: {
                        type: Number,
                        default: .2
                    },
                    logoMargin: {
                        type: Number,
                        default: 0
                    },
                    logoCornerRadius: {
                        type: Number,
                        default: 8
                    },
                    whiteMargin: {
                        type: [Boolean, String],
                        default: !0
                    },
                    dotScale: {
                        type: Number,
                        default: 1
                    },
                    autoColor: {
                        type: [Boolean, String],
                        default: !0
                    },
                    binarize: {
                        type: [Boolean, String],
                        default: !1
                    },
                    binarizeThreshold: {
                        type: Number,
                        default: 128
                    },
                    callback: {
                        type: Function,
                        default: function() {}
                    },
                    bindElement: {
                        type: Boolean,
                        default: !0
                    }
                },
                name: "vue-qr",
                data: function() {
                    return {
                        uuid: ""
                    }
                },
                watch: {
                    $props: {
                        deep: !0,
                        handler: function() {
                            this.main()
                        }
                    }
                },
                mounted: function() {
                    this.uuid = Ma(32),
                    this.main()
                },
                methods: {
                    main: function() {
                        var e = this;
                        return (0,
                        i.A)((0,
                        a.A)().mark((function t() {
                            var n, i, o, s, r;
                            return (0,
                            a.A)().wrap((function(t) {
                                while (1)
                                    switch (t.prev = t.next) {
                                    case 0:
                                        if (n = e,
                                        !e.bgSrc || !e.logoSrc) {
                                            t.next = 10;
                                            break
                                        }
                                        return t.next = 4,
                                        Na(e.bgSrc);
                                    case 4:
                                        return i = t.sent,
                                        t.next = 7,
                                        Na(e.logoSrc);
                                    case 7:
                                        return o = t.sent,
                                        e.render(i, o),
                                        t.abrupt("return");
                                    case 10:
                                        if (!e.bgSrc) {
                                            t.next = 16;
                                            break
                                        }
                                        return t.next = 13,
                                        Na(e.bgSrc);
                                    case 13:
                                        return s = t.sent,
                                        e.render(s),
                                        t.abrupt("return");
                                    case 16:
                                        if (!e.logoSrc) {
                                            t.next = 22;
                                            break
                                        }
                                        return t.next = 19,
                                        Na(e.logoSrc);
                                    case 19:
                                        return r = t.sent,
                                        e.render(void 0, r),
                                        t.abrupt("return");
                                    case 22:
                                        setTimeout((function() {
                                            n.render()
                                        }
                                        ), 0);
                                    case 23:
                                    case "end":
                                        return t.stop()
                                    }
                            }
                            ), t)
                        }
                        )))()
                    },
                    render: function(e, t) {
                        var n = this;
                        (new La).create({
                            text: n.text,
                            size: n.size,
                            margin: n.margin,
                            colorDark: n.colorDark,
                            colorLight: n.colorLight,
                            backgroundImage: e,
                            backgroundDimming: n.backgroundDimming,
                            logoImage: t,
                            logoScale: n.logoScale,
                            logoMargin: n.logoMargin,
                            logoCornerRadius: n.logoCornerRadius,
                            whiteMargin: ka(n.whiteMargin),
                            dotScale: n.dotScale,
                            autoColor: ka(n.autoColor),
                            binarize: ka(n.binarize),
                            binarizeThreshold: n.binarizeThreshold,
                            callback: function(e) {
                                n.callback && n.callback(e, n.qid)
                            },
                            bindElement: n.bindElement ? n.uuid : void 0
                        })
                    }
                }
            }
              , Ra = Ta
              , Oa = (0,_.A)(Ra, ya, Pa, !1, null, null, null), Ea = Oa.exports
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
              , za = {
                mixins: [u.vE.openLinkage, kt.z],
                components: {
                    LanguageSelect: _a,
                    VueQr: Ea,
                    CommonLogo: u.fA,
                    SvgIcon: Da
                },
                setup: function() {
                    var e = (0, o.Kh)({
                        showDownload: !1,
                        showMemberList: !1,
                        showGameList: !1
                    })
                      , t = (0, o.nI)()
                      , a = t.proxy
                      , i = (0, h.OW)()
                      , s = i.mappingVendor
                      , r = i.sortingVendor
                      , c = i.openResource
                      , l = (0, h.rd)()
                      , u = (0, h.s9)()
                      , d = (u.t, (0, h.As)())
                      , m = d.setMcPage
                      , g = d.isGamePage
                      , f = (0, h.Pj)()
                      , v = f.store
                      , w = f.commit
                      , C = (0, h.so)()
                      , b = C.getServiceByType
                      , _ = C.getService
                      , A = C.hasService
                      , y = (0, h.yP)()
                      , P = y.showSideMenu
                      , k = y.setShowSideMenu
                      , M = (0, o.EW)((function() {
                        return v.Login.isLogin
                    }
                    ))
                      , x = (0, o.EW)((function() {
                        return v.Public.banners.find((function(e) {
                            return "w_leftmenu" === e.groupName
                        }
                        ))
                    }
                    ))
                      , L = (0, o.EW)((function() {
                        return !!v.Public.hasVip
                    }
                    ))
                      , S = (0, o.EW)((function() {
                        return v.eGameStore.currentGameType
                    }
                    ))
                      , N = (0, o.EW)((function() {
                        return v.eGameStore.currentVassalage
                    }
                    ))
                      , T = (0, o.EW)((function() {
                        return v.home.resources
                    }
                    ))
                      , R = (0, o.EW)((function() {
                        var e;
                        return null === (e = v.Public.availablePromo) || void 0 === e || null === (e = e.REFERRAL) || void 0 === e ? void 0 : e.enabled
                    }
                    ))
                      , O = (0, o.EW)((function() {
                        var e = window.sessionStorage.getItem("token") || "";
                        return "".concat(window.location.origin, "/m/appDownload?language=").concat(Aa.A.locale, "&tokens=").concat(e)
                    }
                    ))
                      , E = [{ name: "in_increase_deposit", page: "depositv2", icon: "deposit"
                    }, { name: "in_increase_withdrawal", page: "withdraw", icon: "withdraw"
                    }, { name: "activity_up", page: "promotions", icon: "promo-2"
                    }].concat((0,
                    pt.A)(R.value || !M ? [{ name: "invite_friends", page: "referral", icon: "share"
                    }] : []), [{ name: "in_reward_center", page: "rewardCenter", icon: "reward"
                    }, { name: "rebate_promo", page: "manualRebate", icon: "cashback"
                    }])
                      , I = [{ name: "in_betting_record", page: "personalHistoryCopy", icon: "bet-record"
                    }, { name: "in_my_account", page: "securityCenter", icon: "security-center"
                    }, { name: "in_increase_deposit", page: "depositv2", icon: "deposit_record"
                    }, { name: "in_personal_loss", page: "personalProfit", icon: "profit-loss"
                    }, { name: "in_platform_information", page: "messageV2", icon: "mailcen"
                    }]
                      , B = [{ type: "WHATSAPP", icon: n(62357)
                    }, { type: "FACEBOOK", icon: n(16295)
                    }, { type: "INSTAGRAM", icon: n(74635)
                    }, { type: "TELEGRAM", icon: n(79060)
                    }]
                      , V = (0,  o.EW)((function() {
                        return B.filter((function(e) {
                            return !!T.value[e.type]
                        }
                        ))
                    }
                    ))
                      , G = (0,  o.EW)((function() {
                        return (0,
                        pt.A)(r.value)
                    }
                    ))
                      , H = function(e) {
                        var t = e.gameType
                          , n = e.hasVendors;
                        return !g.value && (!P.value && S.value === t || S.value === t && !n)
                    }
                      , D = function(e) {
                        l.push("/"),
                        w("setCurrentGameType", e)
                    }
                      , z = function(e, t) {
                        if ("RNG" === e)
                            w("setCurrentVassalage", t),
                            l.push({
                                path: "/".concat(e.toLowerCase()),
                                query: {
                                    vassalage: t
                                }
                            });
                        else {
                            var n, i = (null === (n = s.value) || void 0 === n || null === (n = n[e]) || void 0 === n ? void 0 : n.cards) || {}, o = i[t];
                            o && a.startGameV2(o)
                        }
                    }
                      , U = function(t) {
                        e.showDownload = t
                    }
                      , q = function(t) {
                        e[t] = !e[t]
                    }
                      , F = function(e) {
                        if ("promotions" === e)
                            return l.push("/promotions");
                        m(e)
                    }
                      , j = function(e) {
                        var t, n;
                        return "RNG" === e ? [].concat((0,
                        pt.A)(null === (t = s.value) || void 0 === t || null === (t = t[e]) || void 0 === t ? void 0 : t.gameClassify), [{
                            gameCount: null,
                            displayName: "FISH",
                            key: "FISH"
                        }]) : null === (n = s.value) || void 0 === n || null === (n = n[e]) || void 0 === n ? void 0 : n.gameClassify
                    };
                    return (0,
                    p.A)((0,
                    p.A)({}, (0,
                    o.QW)(e)), {}, {
                        banner: x,
                        currentGameType: S,
                        currentVassalage: N,
                        setGameType: D,
                        setVassalage: z,
                        setShowSideMenu: k,
                        showSideMenu: P,
                        judgeMenuActive: H,
                        setMcPage: m,
                        iosUrl: O,
                        resources: T,
                        handleShowDownload: U,
                        hasVip: L,
                        getServiceByType: b,
                        hasService: A,
                        getService: _,
                        menu: E,
                        memberNav: I,
                        menuList: G,
                        gameTypeName: Pt.IJ,
                        handleItemClick: F,
                        getGameClassifyMenu: j,
                        toggleShow: q,
                        activeMediaList: V,
                        openResource: c
                    })
                }
            }
              , Ua = za
              , qa = (0, _.A)(Ua, na, aa, !1, null, null, null)
              , Fa = qa.exports
              , ja = function() {
                return n.e(990).then(n.bind(n, 33357))
            }
              , Za = function() {
                return n.e(846).then(n.bind(n, 66736))
            }
              , Qa = function() {
                return n.e(73).then(n.bind(n, 99029))
            }
              , Ya = function() {
                return n.e(282).then(n.bind(n, 67291))
            }
              , Ja = function() {
                return n.e(429).then(n.bind(n, 3702))
            }
              , Wa = function() {
                return n.e(93).then(n.bind(n, 74279))
            }
              , Ka = function() {
                return n.e(242).then(n.bind(n, 38702))
            }
              , Xa = function() {
                return n.e(474).then(n.bind(n, 87466))
            }
              , $a = [{
                path: "/:path(index|index.html|home|)",
                name: "index",
                components: {
                    default: Xt,
                    header: Jn,
                    footer: ta,
                    sideMenu: Fa
                }
            }, {
                path: "/login",
                name: "login",
                components: {
                    default: Xt,
                    header: Jn,
                    footer: ta,
                    sideMenu: Fa
                }
            }, {
                path: "/register",
                name: "register",
                components: {
                    default: Xt,
                    header: Jn,
                    footer: ta,
                    sideMenu: Fa
                }
            }, {
                path: "/agent",
                name: "Agent",
                components: {
                    agent: dn
                }
            }, {
                path: "/agentHome",
                name: "AgentHome",
                components: {
                    agent: wn
                }
            }, {
                path: "/member",
                name: "member",
                components: {
                    default: Ya,
                    header: Jn,
                    footer: ta,
                    sideMenu: Fa
                }
            }, {
                path: "/help",
                name: "Help",
                components: {
                    default: Xt,
                    header: Jn,
                    footer: ta,
                    sideMenu: Fa
                }
            }, {
                path: "/:gameType(\\b|sports|esports|lott|elott\\b)",
                name: "GameCenter",
                components: {
                    default: ja,
                    header: Jn,
                    footer: ta,
                    sideMenu: Fa
                }
            }, {
                path: "/:gameType(\\b|live|fish|rng|pvp\\b)",
                name: "GameListCenter",
                components: {
                    default: Za,
                    header: Jn,
                    footer: ta,
                    sideMenu: Fa
                }
            }, {
                path: "/:type(\\b|favorite|recent\\b)",
                name: "accountGame",
                components: {
                    default: Xa,
                    header: Jn,
                    footer: ta,
                    sideMenu: Fa
                }
            }, {
                path: "/lottery",
                name: "lottery",
                components: {
                    default: Ka,
                    header: Jn,
                    sideMenu: Fa
                },
                meta: {
                    requireAuth: !0
                }
            }, {
                path: "/seaLottery",
                name: "seaLottery",
                components: {
                    default: Ka,
                    header: Jn,
                    sideMenu: Fa
                },
                meta: {
                    requireAuth: !0
                }
            }, {
                path: "/vnLottery",
                name: "vnLottery",
                components: {
                    default: Ka,
                    header: Jn,
                    sideMenu: Fa
                },
                meta: {
                    requireAuth: !0
                }
            }, {
                path: "/promotions",
                name: "Promotions",
                components: {
                    default: Qa,
                    header: Jn,
                    footer: ta,
                    sideMenu: Fa
                }
            }, {
                path: "/pointMall",
                name: "pointMall",
                components: {
                    default: Ja,
                    header: Jn,
                    footer: ta,
                    sideMenu: Fa
                }
            }, {
                path: "/seamless",
                name: "Seamless",
                components: {
                    default: Wa,
                    header: Jn,
                    sideMenu: Fa
                }
            }]
              , ei = document.querySelector("body");
            o.Ay.use(tt.Ay);
            var ti = new tt.Ay({
                mode: "history",
                routes: $a,
                scrollBehavior: function(e, t, n) {
                    return e.hash ? {
                        selector: e.hash
                    } : {
                        x: 0,
                        y: 0
                    }
                }
            })
              , ni = function() {
                ti.beforeEach((function(e, t, n) {
                    var a = window.sessionStorage.getItem("token");
                    a ? n() : e.meta.requireAuth ? n("/login") : n()
                }
                ))
            };
            ti.afterEach((function(e, t) {
                e.name !== t.name && (ei.scrollTop = 0),
                window.cover.loader(!1)
            }
            )),
            ni();
            var ai = ti
              , ii = n(95353)
              , oi = n(75374)
              , si = (n(84864),
            n(57465),
            n(87745),
            n(21699),
            n(62615))
              , ri = n(37374)
              , ci = {
                login: function(e) {
                    return si.A.post(ri.A.login.login, e)
                },
                logout: function() {
                    return si.A.del(ri.A.logout)
                },
                getLoginCode: function(e) {
                    return si.A.post(ri.A.login.loginCode, e)
                },
                getInfo: function() {
                    return si.A.get(ri.A.login.mbInfo)
                },
                menu: function(e) {
                    return si.A.get(ri.A.login.menu, e)
                },
                game: function(e) {
                    return si.A.get(ri.A.login.game, e)
                },
                register: function(e) {
                    return si.A.put(ri.A.login.register, e)
                },
                registerMobile: function(e) {
                    return si.A.put(ri.A.login.registerMobile, e)
                },
                changePassword: function(e) {
                    return si.A.post(ri.A.login.changePwd, e)
                },
                affiliate: function(e) {
                    return si.A.get(ri.A.login.affiliate, e)
                },
                setRegister: function(e) {
                    return si.A.get(ri.A.login.setRegister, e)
                },
                forgetPassword: function(e) {
                    return si.A.formPost(ri.A.login.forgetPwd, e)
                },
                freePlay: function(e) {
                    return si.A.post(ri.A.login.freePlay, e)
                },
                captcha: function() {
                    return si.A.get(ri.A.login.captcha)
                },
                regValidatas: function() {
                    return si.A.get(ri.A.login.regValidata, {})
                },
                icon: function() {
                    return si.A.get(ri.A.login.icon)
                },
                permission: function() {
                    return si.A.get(ri.A.login.permission)
                },
                setPasswordByPhone: function(e) {
                    return si.A.post(ri.A.login.setPasswordByPhone, e)
                }
            }
              , li = ci
              , ui = {
                getNotice: function(e) {
                    return si.A.get(ri.A.home.notice, e)
                },
                getPopular: function(e) {
                    return si.A.get(ri.A.home.popular, e)
                },
                getDomainRoute: function() {
                    return si.A.get(ri.A.common.routers)
                },
                getConsolidated: function(e) {
                    return si.A.get(ri.A.home.consolidated, e)
                },
                getProcess: function(e) {
                    return si.A.get(ri.A.home.processDividendReq, e)
                },
                getSalary: function(e) {
                    return si.A.get(ri.A.home.processDailySalary, e)
                },
                getVnNumero: function(e) {
                    return si.A.get(ri.A.home.vnNumero, e)
                },
                getOpNumero: function(e) {
                    return si.A.get(ri.A.home.openedNumero, e)
                },
                getUsernameRegSMS: function(e) {
                    return si.A.post(ri.A.common.usernameRegSMS, e)
                },
                getMobileRegSMS: function(e) {
                    return si.A.post(ri.A.common.mobileRegSMS, e)
                },
                walletTransfer: function(e) {
                    return si.A.post(ri.A.walletTransfer, e)
                },
                feedback: function(e) {
                    return si.A.put(ri.A.common.feedback, e)
                },
                getMerchantWallet: function(e) {
                    return si.A.get(ri.A.home.merchantWallet, e)
                },
                getHourSalary: function(e) {
                    return si.A.post(ri.A.home.processContractHourSalary, e)
                },
                processRealTimeSalaryContract: function(e) {
                    return si.A.post(ri.A.home.processRealTimeSalaryContract, e)
                },
                getRafflePromotion: function(e) {
                    return si.A.post(ri.A.common.rafflePromotion, e)
                },
                getWinnerBoard: function(e) {
                    return si.A.get(ri.A.common.getWinnerBoard, {
                        data: e
                    })
                }
            }
              , di = ui;
            function mi() {
                var e = tcg.lib.rndString()
                  , t = tcg.lib.RSAEncrypt(e.split("").reverse().join(""));
                return t
            }
            var pi = {
                userInfo: {},
                setReg: {},
                lottGames: [],
                validate: {},
                isLogin: !1,
                isAgent: !1,
                isTrial: !1,
                isChangePaw: !1,
                icon: null,
                hasFreePlay: !1,
                pwdEnabled: !1,
                showPhoneLogin: !1,
                showVerCodeLogin: !1,
                smsEnabled: !1,
                mobileReg: !1,
                mobileRegPass: !1,
                hasMerchantWallet: 1,
                imgUrl: "https://images.b298100.com:42666",
                startGameUrl: "https://www2.854819.com:42666",
                whitelabelVal: {},
                location: {},
                memberInfo: {},
                systemStatus: 0
            }
              , gi = {
                login: function(e, t) {
                    return li.login(t)
                },
                getLoginCode: function(e, t) {
                    return new Promise((function(e, n) {
                        e(li.getLoginCode(t))
                    }
                    ))
                },
                merchantWallet: function(e, t) {
                    return (0,
                    i.A)((0,
                    a.A)().mark((function e() {
                        var n, i;
                        return (0,
                        a.A)().wrap((function(e) {
                            while (1)
                                switch (e.prev = e.next) {
                                case 0:
                                    if (n = JSON.parse(window.sessionStorage.getItem("merchantWallet")),
                                    n) {
                                        e.next = 10;
                                        break
                                    }
                                    return e.next = 4,
                                    di.getMerchantWallet(t);
                                case 4:
                                    return i = e.sent,
                                    window.sessionStorage.setItem("merchantWallet", JSON.stringify(i)),
                                    pi.hasMerchantWallet = i.value.isSingle,
                                    e.abrupt("return", i);
                                case 10:
                                    return pi.hasMerchantWallet = n.value.isSingle,
                                    e.abrupt("return", n);
                                case 12:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e)
                    }
                    )))()
                },
                loginInfo: function(e, t) {
                    return (0,
                    i.A)((0,
                    a.A)().mark((function n() {
                        var i, o;
                        return (0,
                        a.A)().wrap((function(n) {
                            while (1)
                                switch (n.prev = n.next) {
                                case 0:
                                    return i = e.commit,
                                    window.sessionStorage.setItem("token", t.token),
                                    n.next = 4,
                                    li.getInfo();
                                case 4:
                                    return o = n.sent,
                                    i("setMemberInfo", o),
                                    i("storeInfo", o),
                                    n.abrupt("return", o);
                                case 8:
                                case "end":
                                    return n.stop()
                                }
                        }
                        ), n)
                    }
                    )))()
                },
                getMemberInfo: function(e) {
                    return (0,
                    i.A)((0,
                    a.A)().mark((function t() {
                        var n, i;
                        return (0,
                        a.A)().wrap((function(t) {
                            while (1)
                                switch (t.prev = t.next) {
                                case 0:
                                    return n = e.commit,
                                    t.next = 3,
                                    li.getInfo();
                                case 3:
                                    return i = t.sent,
                                    i.success && (n("storeInfo", i),
                                    n("setLoginState", !0)),
                                    t.abrupt("return", i);
                                case 6:
                                case "end":
                                    return t.stop()
                                }
                        }
                        ), t)
                    }
                    )))()
                },
                affiliate: function(e, t) {
                    return li.affiliate(t)
                },
                setRegister: function() {
                    li.setRegister().then((function(e) {
                        pi.setReg = e
                    }
                    ))
                },
                register: function(e, t) {
                    var n = u.h.getCode()
                      , a = {
                        data: (0,
                        p.A)({}, t.data)
                    };
                    return a.data.registerUrl = u.h.getRegUrl(),
                    a.data.affiliateCode = a.data.affiliateCode || n.code,
                    a.data.referralCode = a.data.referralCode || n.referralCode,
                    a.data.domain = n.domain || "",
                    a.data.registerMethod = "WEB",
                    li.register(a)
                },
                registerMobile: function(e, t) {
                    var n = u.h.getCode()
                      , a = {
                        data: (0,
                        p.A)({}, t.data)
                    };
                    return a.data.registerUrl = u.h.getRegUrl(),
                    a.data.affiliateCode = a.data.affiliateCode || n.code,
                    a.data.referralCode = a.data.referralCode || n.referralCode,
                    a.data.domain = n.domain || "",
                    a.data.registerMethod = "WEB",
                    li.registerMobile(t)
                },
                changePassword: function(e, t) {
                    return li.changePassword(t)
                },
                getLottGames: function(e) {
                    return (0,
                    i.A)((0,
                    a.A)().mark((function t() {
                        var n, i, o, s;
                        return (0,
                        a.A)().wrap((function(t) {
                            while (1)
                                switch (t.prev = t.next) {
                                case 0:
                                    return n = e.commit,
                                    i = {
                                        data: {
                                            prizeMode: U.A.brand.lotteryType
                                        }
                                    },
                                    t.next = 4,
                                    li.game(i);
                                case 4:
                                    if (t.t0 = t.sent,
                                    t.t0) {
                                        t.next = 7;
                                        break
                                    }
                                    t.t0 = {};
                                case 7:
                                    return o = t.t0,
                                    s = Object.values(o).map((function(e) {
                                        return (0,
                                        p.A)((0,
                                        p.A)({}, e), {}, {
                                            tag: e.gameGroupCode
                                        })
                                    }
                                    )),
                                    n("setLottGames", s),
                                    t.abrupt("return", s);
                                case 11:
                                case "end":
                                    return t.stop()
                                }
                        }
                        ), t)
                    }
                    )))()
                },
                forgetPassword: function(e, t) {
                    return (0,
                    i.A)((0,
                    a.A)().mark((function e() {
                        var n;
                        return (0,
                        a.A)().wrap((function(e) {
                            while (1)
                                switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2,
                                    li.forgetPassword(t);
                                case 2:
                                    return n = e.sent,
                                    e.abrupt("return", n);
                                case 4:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e)
                    }
                    )))()
                },
                loginFreePlay: function(e) {
                    return (0,
                    i.A)((0,
                    a.A)().mark((function t() {
                        var n, i;
                        return (0,
                        a.A)().wrap((function(t) {
                            while (1)
                                switch (t.prev = t.next) {
                                case 0:
                                    return e.commit,
                                    n = {
                                        os: tcg.lib.os,
                                        platform: "W",
                                        Encryption: mi(),
                                        "X-Gateway-Version": 3
                                    },
                                    t.next = 4,
                                    li.freePlay(n);
                                case 4:
                                    return i = t.sent,
                                    t.abrupt("return", i);
                                case 6:
                                case "end":
                                    return t.stop()
                                }
                        }
                        ), t)
                    }
                    )))()
                },
                captcha: function() {
                    return (0,
                    i.A)((0,
                    a.A)().mark((function e() {
                        var t;
                        return (0,
                        a.A)().wrap((function(e) {
                            while (1)
                                switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2,
                                    li.captcha();
                                case 2:
                                    return t = e.sent,
                                    e.abrupt("return", t);
                                case 4:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e)
                    }
                    )))()
                },
                regValidatas: function(e) {
                    return (0,
                    i.A)((0,
                    a.A)().mark((function t() {
                        var n, i, o;
                        return (0,
                        a.A)().wrap((function(t) {
                            while (1)
                                switch (t.prev = t.next) {
                                case 0:
                                    if (n = e.commit,
                                    i = JSON.parse(sessionStorage.getItem("validate")),
                                    i) {
                                        t.next = 8;
                                        break
                                    }
                                    return t.next = 5,
                                    li.regValidatas();
                                case 5:
                                    o = t.sent,
                                    i = o.value,
                                    sessionStorage.setItem("validate", JSON.stringify(o.value));
                                case 8:
                                    return n("setRegValidate", i),
                                    t.abrupt("return", i);
                                case 10:
                                case "end":
                                    return t.stop()
                                }
                        }
                        ), t)
                    }
                    )))()
                },
                getPermission: function(e) {
                    return (0,
                    i.A)((0,
                    a.A)().mark((function t() {
                        var n, i, o, s, r, c, l, u, d, m, p, g, f, v;
                        return (0,
                        a.A)().wrap((function(t) {
                            while (1)
                                switch (t.prev = t.next) {
                                case 0:
                                    return n = e.commit,
                                    i = e.rootState,
                                    t.next = 3,
                                    li.permission();
                                case 3:
                                    return o = t.sent,
                                    s = o.value,
                                    r = s.info,
                                    c = r.customerService,
                                    l = r.domainRoute,
                                    u = r.resources,
                                    d = r.whitelabel,
                                    m = r.register,
                                    p = r.mainDomain,
                                    g = r.analytics,
                                    f = gi.getRegister(m),
                                    v = gi.getWhitelabelVal(d),
                                    n("setStatus", s),
                                    n("setSystemStatus", o.value),
                                    n("setWhitelabelVal", v),
                                    n("setBasicModule", v),
                                    n("setCDN", s.info),
                                    n("setRegValidate", f),
                                    n("setResources", u),
                                    n("setDomainList", l),
                                    n("setMainDomain", p),
                                    n("setCustomerService", c),
                                    n("setLocation", s.location),
                                    n("setAnalytics", g.gtagId),
                                    gi.applyValidator(f, i),
                                    t.abrupt("return", s);
                                case 22:
                                case "end":
                                    return t.stop()
                                }
                        }
                        ), t)
                    }
                    )))()
                },
                logout: function(e) {
                    var t = e.commit;
                    li.logout(),
                    window.sessionStorage.clear(),
                    window.sessionStorage.setItem("merchant", U.A.brand.merchant),
                    window.sessionStorage.setItem("merchantCode", U.A.brand.merchant),
                    t("setLoginState", !1),
                    t("setAgent", !1)
                },
                getRegister: function(e) {
                    return Object.keys(e).reduce((function(t, n) {
                        var a = e[n];
                        return "*" === a.acceptedPattern && (a.acceptedPattern = ".*"),
                        t[n] = a,
                        t
                    }
                    ), {})
                },
                applyValidator: function(e, t) {
                    var n = function(e) {
                        return Aa.A.t("reg_pattern_".concat(e.patternId)).replace("(min)", e.minLength).replace("(max)", e.maxLength).replace("".concat(e.minLength, " - ").concat(e.minLength), e.minLength)
                    }
                      , a = U.A.supportLanguages.reduce((function(e, t) {
                        return (0,
                        p.A)((0,
                        p.A)({}, e), {}, (0,
                        oi.A)({}, t, {}))
                    }
                    ), {});
                    Object.keys(a).forEach((function(t) {
                        a[t].messages = {
                            required: function(e) {
                                return n(e)
                            },
                            checkPass: function() {
                                return Aa.A.t("inconsistent_twice")
                            }
                        },
                        a[t].attributes = {
                            checkPass: Aa.A.t("in_increase_verifyPwd")
                        },
                        Object.keys(e).forEach((function(i) {
                            a[t].messages[i] = function() {
                                return n(e[i])
                            }
                            ,
                            a[t].attributes[i] = e[i]
                        }
                        ))
                    }
                    )),
                    Object.keys(e).forEach((function(t) {
                        ne.Dr.extend(t, {
                            validate: function(n) {
                                return new RegExp(e[t].acceptedPattern).test(n) && n.length >= e[t].minLength && n.length <= e[t].maxLength
                            }
                        })
                    }
                    )),
                    ne.Dr.localize(a),
                    ne.Dr.localize(t.home.language)
                },
                getWhitelabelVal: function(e) {
                    function t(e) {
                        var n = {};
                        return n[e.modId] = "1" === e.enabled,
                        e.childrenNodes.forEach((function(e) {
                            Object.assign(n, t(e))
                        }
                        )),
                        n
                    }
                    return t(e)
                },
                getPasswordByPhone: function(e, t) {
                    e.commit;
                    return li.setPasswordByPhone(t)
                }
            }
              , fi = {
                storeInfo: function(e, t) {
                    window.sessionStorage.setItem("nickname", t.value.nickname),
                    window.sessionStorage.setItem("account", t.value.account),
                    window.sessionStorage.setItem("username", t.value.account),
                    window.sessionStorage.setItem("customerId", t.value.id),
                    window.sessionStorage.setItem("isAgent", t.value.type);
                    var n = 1 * t.value.type;
                    U.A.agentType.includes(n) && (e.isAgent = !0),
                    U.A.trialType.includes(n) && (e.isTrial = !0),
                    e.memberInfo = t.value,
                    e.isLogin = !0
                },
                setUserInfo: function(e, t) {
                    e.userInfo = t
                },
                setLottGames: function(e, t) {
                    e.lottGames = t
                },
                setLoginState: function(e, t) {
                    e.isLogin = t
                },
                setAgent: function(e, t) {
                    e.isAgent = t
                },
                setRegValidate: function(e, t) {
                    e.validate = t
                },
                setMemberInfo: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    e.memberInfo = t.value || {}
                },
                setWhitelabelVal: function(e, t) {
                    e.whitelabelVal = t
                },
                setBasicModule: function(e, t) {
                    e.mobileReg = t.MOBILENUMREG3,
                    e.smsEnabled = t.REGMOBVERF3,
                    e.mobileRegPass = t.MOBILENUMPASSREG3,
                    e.hasFreePlay = t.FREEPLAY3,
                    e.pwdEnabled = t.PWDEXPFORCECHANGE3,
                    e.showVerCodeLogin = t.MOBILEVERCODELOGIN3
                },
                setCDN: function(e, t) {
                    t.imageCDNs && t.imageCDNs.length > 0 && (e.imgUrl = t.imageCDNs[Math.floor(Math.random() * t.imageCDNs.length)]),
                    t.launchGameCDNs && t.launchGameCDNs.length > 0 && (e.startGameUrl = t.launchGameCDNs[Math.floor(Math.random() * t.launchGameCDNs.length)])
                },
                setLocation: function(e, t) {
                    e.location = t
                },
                setAnalytics: function(e, t) {
                    e.gtagId = t
                },
                setSystemStatus: function(e, t) {
                    var n = t.maintenance
                      , a = t.regionRestriction;
                    e.systemStatus = n ? 1 : a ? 2 : 0
                }
            }
              , vi = {
                state: pi,
                actions: gi,
                mutations: fi
            }
              , hi = {
                getModelList: function(e) {
                    return si.A.get(ri.A.live.getModelList, e)
                },
                launchChat: function(e) {
                    return si.A.get(ri.A.live.launchChat, e)
                }
            }
              , wi = hi
              , Ci = {
                modelList: []
            }
              , bi = {
                getModelList: function(e, t) {
                    e.commit;
                    return wi.getModelList(t).then((function(e) {
                        console.log(e)
                    }
                    ))
                },
                getLaunchChat: function(e, t) {
                    return (0,
                    i.A)((0,
                    a.A)().mark((function n() {
                        var i;
                        return (0,
                        a.A)().wrap((function(n) {
                            while (1)
                                switch (n.prev = n.next) {
                                case 0:
                                    return i = e.commit,
                                    e.state,
                                    n.abrupt("return", wi.getLaunchChat(t).then((function(e) {
                                        e.value.chatUrl && i("setLiveSrc", "".concat(e.value.chatUrl))
                                    }
                                    )));
                                case 2:
                                case "end":
                                    return n.stop()
                                }
                        }
                        ), n)
                    }
                    )))()
                }
            }
              , _i = {
                setModelList: function(e, t) {
                    e.modelList = t
                }
            }
              , Ai = {
                state: Ci,
                actions: bi,
                mutations: _i
            }
              , yi = {
                navIndex: -1,
                showLoginPopup: !1,
                showChangePopup: !1,
                hiddenHeader: !1,
                showForgotPopup: !1,
                showEgameMenu: !1
            }
              , Pi = {}
              , ki = {
                setNavIndex: function(e, t) {
                    e.navIndex = t
                },
                setShowLoginPopup: function(e, t) {
                    e.showLoginPopup = t
                },
                setShowChangePopup: function(e, t) {
                    e.showChangePopup = t
                },
                setShowForgotPopup: function(e, t) {
                    e.showForgotPopup = t
                },
                setHiddenHeader: function(e, t) {
                    e.hiddenHeader = t
                },
                setShowEgameMenu: function(e, t) {
                    e.showEgameMenu = t
                }
            }
              , Mi = {
                state: yi,
                actions: Pi,
                mutations: ki
            }
              , xi = (n(48980),
            n(54554),
            {
                getGames: function(e) {
                    return si.A.get(ri.A.eGame.games, {
                        data: e
                    })
                },
                getGamesAnoucements: function(e) {
                    return si.A.get(ri.A.eGame.announcements, {
                        data: e
                    })
                },
                getVassGameType: function(e) {
                    return si.A.get(ri.A.eGame.vassGameType, {
                        data: e
                    })
                },
                getGameVendor: function(e) {
                    return si.A.get(ri.A.eGame.gameVendor, {
                        data: (0,
                        p.A)({
                            platform: "html5-desktop"
                        }, e)
                    })
                },
                getFavGames: function(e) {
                    return si.A.get(ri.A.eGame.favGames, {
                        data: e
                    })
                },
                getFavGameList: function(e) {
                    return si.A.get(ri.A.eGame.favGameList, {
                        data: e
                    })
                },
                getRecentGameList: function(e) {
                    return si.A.get(ri.A.eGame.recentGameList, {
                        data: e
                    })
                },
                getHotGameList: function(e) {
                    return si.A.get(ri.A.eGame.gameHot, {
                        data: e
                    })
                },
                addFavGame: function(e) {
                    return si.A.post(ri.A.eGame.addFavGame, {
                        data: e
                    })
                },
                removeFavGame: function(e) {
                    return si.A.del(ri.A.eGame.removeFavGame, {
                        data: e
                    })
                },
                gameLaunchFB: function(e) {
                    return si.A.get(ri.A.eGame.gameLaunchFB, {
                        data: e
                    })
                }
            })
              , Li = xi
              , Si = "HOT_GAMES"
              , Ni = {
                sortingVendor: [],
                gameVendor: {},
                mappingVendor: {},
                hotGames: [],
                lottFavIds: [],
                favGameIds: [],
                favGameList: {
                    content: [],
                    pageNum: 1,
                    totalPages: 0
                },
                prizeMode: "",
                currentGameType: "HOME",
                currentVassalage: ""
            }
              , Ti = {
                getGameList: function(e, t) {
                    e.dispatch,
                    e.commit;
                    return Li.getGames(t).then((function(e) {
                        return e.value
                    }
                    ))
                },
                getFavGames: function(e, t) {
                    e.dispatch;
                    var n = e.commit;
                    return Li.getFavGames(t).then((function(e) {
                        return n("setFavGameIds", e.value),
                        e.value
                    }
                    ))
                },
                getFavGameList: function(e, t) {
                    e.dispatch;
                    var n = e.commit
                      , a = (e.state,
                    t.query)
                      , i = t.loadMore;
                    return Li.getFavGameList(a).then((function(e) {
                        var t = {
                            data: e.value,
                            loadMore: i
                        };
                        return n("setFavGameList", t),
                        e.value
                    }
                    ))
                },
                getRecentGameList: function(e, t) {
                    e.dispatch,
                    e.commit;
                    return Li.getRecentGameList(t).then((function(e) {
                        return e.value
                    }
                    ))
                },
                getHotGameList: function(e, t) {
                    return (0,
                    i.A)((0,
                    a.A)().mark((function n() {
                        var i, o, s, r, c, l;
                        return (0,
                        a.A)().wrap((function(n) {
                            while (1)
                                switch (n.prev = n.next) {
                                case 0:
                                    if (e.dispatch,
                                    i = e.commit,
                                    o = t.query,
                                    s = t.refresh,
                                    s && sessionStorage.removeItem(Si),
                                    c = sessionStorage.getItem(Si),
                                    !c) {
                                        n.next = 8;
                                        break
                                    }
                                    r = JSON.parse(c),
                                    n.next = 13;
                                    break;
                                case 8:
                                    return n.next = 10,
                                    Li.getHotGameList(o);
                                case 10:
                                    l = n.sent,
                                    r = l.value.list,
                                    sessionStorage.setItem(Si, JSON.stringify(r));
                                case 13:
                                    return i("setHotGames", r),
                                    n.abrupt("return", r);
                                case 15:
                                case "end":
                                    return n.stop()
                                }
                        }
                        ), n)
                    }
                    )))()
                },
                getGameVendor: function(e) {
                    var t = e.commit
                      , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                        flush: !0
                    };
                    return new Promise((function(e, a) {
                        var i = JSON.parse(sessionStorage.getItem("gameVendor"));
                        !n.flush && i ? (t("SET_GAMEVENDOR", i),
                        e(i)) : Li.getGameVendor(n).then((function(n) {
                            var a = n.value.data.lanes;
                            sessionStorage.setItem("gameVendor", JSON.stringify(a)),
                            t("SET_GAMEVENDOR", a),
                            e(a)
                        }
                        )).catch((function(e) {
                            a(e)
                        }
                        ))
                    }
                    ))
                },
                addFavGame: function(e, t) {
                    e.dispatch;
                    var n = e.commit
                      , a = e.state
                      , i = "".concat(t.nodeId);
                    return a.favGameIds.includes(i) ? null : (n("setFavGameIds", [].concat((0,
                    pt.A)(a.favGameIds), [i])),
                    Li.addFavGame(t))
                },
                removeFavGame: function(e, t) {
                    e.dispatch,
                    e.commit;
                    var n = e.state;
                    return n.favGameIds = n.favGameIds.filter((function(e) {
                        return +e !== +t.nodeId
                    }
                    )),
                    n.favGameList = (0,
                    p.A)((0,
                    p.A)({}, n.favGameList), {}, {
                        content: n.favGameList.content.filter((function(e) {
                            return +e.nodeId !== +t.nodeId
                        }
                        ))
                    }),
                    Li.removeFavGame(t)
                }
            }
              , Ri = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
                  , t = []
                  , n = []
                  , a = [];
                e.forEach((function(e) {
                    "SPORTS" === e.title && e.cards.length && (t = e.cards.filter((function(e) {
                        return U.A.esportGames.includes(e.vassalage)
                    }
                    )),
                    n = e.cards.filter((function(e) {
                        return U.A.cockfightGames.includes(e.vassalage)
                    }
                    )),
                    t.length && (e.cards = e.cards.filter((function(e) {
                        return !U.A.esportGames.includes(e.vassalage)
                    }
                    ))),
                    n.length && (e.cards = e.cards.filter((function(e) {
                        return !U.A.cockfightGames.includes(e.vassalage)
                    }
                    )))),
                    "RNG" === e.title && e.cards.length && (a = e.cards.filter((function(e) {
                        return U.A.SPBGames.includes(e.vassalage)
                    }
                    )))
                }
                ));
                var i = e.findIndex((function(e) {
                    return "SPORTS" === e.title
                }
                )) || 0
                  , o = e.findIndex((function(e) {
                    return "RNG" === e.title
                }
                )) || 0;
                return n.length && e.splice(i + 1, 0, {
                    title: "COCKFIGHT",
                    cards: n
                }),
                t.length && e.splice(i + 1, 0, {
                    title: "ESPORTS",
                    cards: t
                }),
                a.length && e.splice(o + 1, 0, {
                    title: "SPB",
                    cards: a
                }),
                (0,
                pt.A)(e)
            }
              , Oi = {
                setHotGames: function(e, t) {
                    e.hotGames = t
                },
                setPrizeMode: function(e, t) {
                    var n = "LOTT";
                    ["TCG_LOTTO_VN", "LOTT"].some((function(e) {
                        var n;
                        return !(null === t || void 0 === t || null === (n = t.ELOTT) || void 0 === n || null === (n = n.cards) || void 0 === n || !n[e])
                    }
                    )) && (n = "ELOTT");
                    var a = {
                        LOTT: U.A.prizeModes.ModeLott,
                        ELOTT: U.A.prizeModes.ModeElott
                    };
                    e.prizeMode = a[n]
                },
                SET_GAMEVENDOR: function(e, t) {
                    var n = {}
                      , a = Ri(t)
                      , i = a.map((function(e) {
                        var t = {};
                        n[e.title] = e.cards;
                        var a = e.cards.map((function(e) {
                            var n = e.vassalage;
                            return t[n] = e,
                            e
                        }
                        ));
                        return {
                            gameCategory: e.title,
                            vendors: a,
                            cards: t,
                            gameClassify: e.gameClassify
                        }
                    }
                    ))
                      , o = i.reduce((function(e, t) {
                        return (0,
                        p.A)((0,
                        p.A)({}, e), {}, (0,
                        oi.A)({}, t.gameCategory, t))
                    }
                    ), {});
                    this.commit("setPrizeMode", o),
                    e.sortingVendor = i,
                    e.mappingVendor = o,
                    e.gameVendor = n
                },
                setFavGameList: function(e, t) {
                    var n = t.data
                      , a = t.loadMore;
                    if (a) {
                        var i = {
                            content: e.favGameList.content.concat(n.content),
                            pageNum: n.pageNum,
                            totalPages: n.totalPages
                        };
                        e.favGameList = i
                    } else
                        e.favGameList = n
                },
                setFavGameIds: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                    e.favGameIds = t
                },
                setCurrentGameType: function(e, t) {
                    e.currentGameType = t
                },
                setCurrentVassalage: function(e, t) {
                    e.currentVassalage = t
                }
            }
              , Ei = {
                state: Ni,
                actions: Ti,
                mutations: Oi
            }
              , Ii = n(88296)
              , Bi = U.A.device
              , Vi = U.A.defaultLang
              , Gi = {
                prizeMode: "",
                vnLotteryMenus: []
            }
              , Hi = {
                changePrizeMode: function(e, t) {
                    e.prizeMode = t
                },
                setvnLotteryMenus: function(e, t) {
                    e.vnLotteryMenus = t
                }
            }
              , Di = {
                getLabby: function(e, t) {
                    return (0,
                    i.A)((0,
                    a.A)().mark((function n() {
                        var i, o, s, r;
                        return (0,
                        a.A)().wrap((function(n) {
                            while (1)
                                switch (n.prev = n.next) {
                                case 0:
                                    return e.commit,
                                    i = e.rootState,
                                    o = t.gameCode,
                                    s = {
                                        lottoArea: "VN",
                                        launchMode: "LOTT",
                                        lottoPrizeMode: i.eGameStore.prizeMode,
                                        lottoGameCode: o,
                                        lottoView: o ? "betting" : "lobby",
                                        device: Bi,
                                        backUrl: window.location.href,
                                        language: localStorage.getItem("hisLang") || Vi
                                    },
                                    n.next = 5,
                                    Ii.A.getLabby(s);
                                case 5:
                                    return r = n.sent,
                                    n.abrupt("return", r);
                                case 7:
                                case "end":
                                    return n.stop()
                                }
                        }
                        ), n)
                    }
                    )))()
                },
                getVnLotteryMenu: function(e) {
                    return (0,
                    i.A)((0,
                    a.A)().mark((function t() {
                        var n, i, o, s, r;
                        return (0,
                        a.A)().wrap((function(t) {
                            while (1)
                                switch (t.prev = t.next) {
                                case 0:
                                    return n = e.commit,
                                    i = e.rootState,
                                    o = {
                                        data: {
                                            prizeMode: i.eGameStore.prizeMode,
                                            device: "WEB"
                                        }
                                    },
                                    t.next = 4,
                                    Ii.A.getVnlottMenus(o);
                                case 4:
                                    return s = t.sent,
                                    r = Object.values(s).map((function(e) {
                                        return (0,
                                        p.A)((0,
                                        p.A)({}, e), {}, {
                                            gameMenus: e.gameMenus.map((function(e) {
                                                return (0,
                                                p.A)((0,
                                                p.A)({}, e), {}, {
                                                    accountTypeName: "TCG_LOTTO_VN"
                                                })
                                            }
                                            ))
                                        })
                                    }
                                    )),
                                    n("setvnLotteryMenus", r),
                                    t.abrupt("return", r);
                                case 8:
                                case "end":
                                    return t.stop()
                                }
                        }
                        ), t)
                    }
                    )))()
                },
                getMissionSummary: function(e, t) {
                    return (0,
                    i.A)((0,
                    a.A)().mark((function n() {
                        var i;
                        return (0,
                        a.A)().wrap((function(n) {
                            while (1)
                                switch (n.prev = n.next) {
                                case 0:
                                    return e.commit,
                                    n.next = 3,
                                    Ii.A.getMissionSummary(t);
                                case 3:
                                    return i = n.sent,
                                    n.abrupt("return", i);
                                case 5:
                                case "end":
                                    return n.stop()
                                }
                        }
                        ), n)
                    }
                    )))()
                },
                getMissionLeaderboard: function(e, t) {
                    return (0,
                    i.A)((0,
                    a.A)().mark((function n() {
                        var i;
                        return (0,
                        a.A)().wrap((function(n) {
                            while (1)
                                switch (n.prev = n.next) {
                                case 0:
                                    return e.commit,
                                    n.next = 3,
                                    Ii.A.getMissionLeaderboard(t);
                                case 3:
                                    return i = n.sent,
                                    n.abrupt("return", i);
                                case 5:
                                case "end":
                                    return n.stop()
                                }
                        }
                        ), n)
                    }
                    )))()
                }
            }
              , zi = {
                state: Gi,
                actions: Di,
                mutations: Hi
            }
              , Ui = {
                notice: [],
                announcementContent: null,
                banners: [],
                popular: [],
                popup: [],
                promotion: [],
                routers: [],
                consolidated: {},
                showConsolidated: !1,
                beforeLoginModal: !0,
                afterLoginModal: !0,
                noticeIndex: 0,
                type: {},
                resources: {},
                domainList: [],
                customerService: [],
                language: Aa.A.locale,
                winnerBoard: [],
                mainDomain: "",
                showSideMenu: !0
            }
              , qi = {
                getAnnouncementContent: function(e) {
                    var t = arguments;
                    return (0,
                    i.A)((0,
                    a.A)().mark((function n() {
                        var i, o, s, r;
                        return (0,
                        a.A)().wrap((function(n) {
                            while (1)
                                switch (n.prev = n.next) {
                                case 0:
                                    if (i = e.commit,
                                    o = e.state,
                                    s = t.length > 1 && void 0 !== t[1] && t[1],
                                    o.announcementContent && !s) {
                                        n.next = 8;
                                        break
                                    }
                                    return n.next = 5,
                                    di.getNotice({
                                        data: {
                                            types: "B,PL,PU,PR",
                                            platform: "W",
                                            execution: "B"
                                        }
                                    });
                                case 5:
                                    r = n.sent,
                                    o.announcementContent = r.success,
                                    i("setAnnouncementAndPromo", r.value);
                                case 8:
                                case "end":
                                    return n.stop()
                                }
                        }
                        ), n)
                    }
                    )))()
                },
                getPopular: function(e, t) {
                    return (0,
                    i.A)((0,
                    a.A)().mark((function n() {
                        var i;
                        return (0,
                        a.A)().wrap((function(n) {
                            while (1)
                                switch (n.prev = n.next) {
                                case 0:
                                    return e.commit,
                                    n.next = 3,
                                    di.getPopular(t).then((function(e) {
                                        var t = [];
                                        for (var n in e)
                                            t.push(e[n]);
                                        Ui.popular = t,
                                        i = t
                                    }
                                    ));
                                case 3:
                                    return n.abrupt("return", i);
                                case 4:
                                case "end":
                                    return n.stop()
                                }
                        }
                        ), n)
                    }
                    )))()
                },
                getConsolidated: function(e) {
                    return (0,
                    i.A)((0,
                    a.A)().mark((function t() {
                        var n, i, o;
                        return (0,
                        a.A)().wrap((function(t) {
                            while (1)
                                switch (t.prev = t.next) {
                                case 0:
                                    return t.next = 2,
                                    di.getConsolidated();
                                case 2:
                                    n = t.sent,
                                    window.sessionStorage.setItem("consolidated", JSON.stringify(n)),
                                    i = n.value,
                                    o = {
                                        dailysalreq: i.dailysalreqtype,
                                        divtypereq: i.divtypereq,
                                        contracthoursalreq: i.contracthoursalreq,
                                        realtimesalreqtype: i.realtimesalreqtype
                                    },
                                    Ui.consolidated = o,
                                    Ui.showConsolidated = u.Uu.hasContract(i),
                                    e.commit("updateType", i),
                                    e.commit("setContract", i);
                                case 10:
                                case "end":
                                    return t.stop()
                                }
                        }
                        ), t)
                    }
                    )))()
                },
                closeConsolidated: function() {
                    Ui.showConsolidated = !1
                },
                participation: function(e, t) {
                    e.commit;
                    return new Promise((function(e, n) {
                        e(di.getProcess(t))
                    }
                    ))
                },
                wage: function(e, t) {
                    e.commit;
                    return new Promise((function(e, n) {
                        e(di.getSalary(t))
                    }
                    ))
                },
                hourSalary: function(e, t) {
                    e.commit;
                    return new Promise((function(e, n) {
                        e(di.getHourSalary(t))
                    }
                    ))
                },
                getOpened: function(e, t) {
                    e.commit;
                    return new Promise((function(e, n) {
                        e(di.getOpNumero(t))
                    }
                    ))
                },
                walletTransfer: function(e, t) {
                    return (0,
                    i.A)((0,
                    a.A)().mark((function n() {
                        var i;
                        return (0,
                        a.A)().wrap((function(n) {
                            while (1)
                                switch (n.prev = n.next) {
                                case 0:
                                    return e.commit,
                                    e.state,
                                    n.next = 3,
                                    di.walletTransfer(t);
                                case 3:
                                    return i = n.sent,
                                    n.abrupt("return", i);
                                case 5:
                                case "end":
                                    return n.stop()
                                }
                        }
                        ), n)
                    }
                    )))()
                },
                getWinnerBoard: function(e, t) {
                    return (0,
                    i.A)((0,
                    a.A)().mark((function n() {
                        var i, o;
                        return (0,
                        a.A)().wrap((function(n) {
                            while (1)
                                switch (n.prev = n.next) {
                                case 0:
                                    return i = e.commit,
                                    n.next = 3,
                                    di.getWinnerBoard(t);
                                case 3:
                                    return o = n.sent,
                                    i("setWinnerBoard", o.value.list),
                                    n.abrupt("return", o);
                                case 6:
                                case "end":
                                    return n.stop()
                                }
                        }
                        ), n)
                    }
                    )))()
                },
                sendfeedback: function(e, t) {
                    return (0,
                    i.A)((0,
                    a.A)().mark((function n() {
                        var i;
                        return (0,
                        a.A)().wrap((function(n) {
                            while (1)
                                switch (n.prev = n.next) {
                                case 0:
                                    return e.commit,
                                    n.next = 3,
                                    di.feedback(t);
                                case 3:
                                    return i = n.sent,
                                    n.abrupt("return", i);
                                case 5:
                                case "end":
                                    return n.stop()
                                }
                        }
                        ), n)
                    }
                    )))()
                },
                sendRegPhoneCode: function(e, t) {
                    var n = t.data
                      , a = t.regType;
                    return "registerMobile" === a ? di.getMobileRegSMS({
                        data: n
                    }) : di.getUsernameRegSMS({
                        data: n
                    })
                }
            }
              , Fi = {
                setConsolidated: function(e, t) {
                    e.showConsolidated = t
                },
                setNoticeIndex: function(e, t) {
                    Ui.noticeIndex = t || 0
                },
                setBeforeLoginModal: function(e, t) {
                    e.beforeLoginModal = t
                },
                setAfterLoginModal: function(e, t) {
                    e.afterLoginModal = t
                },
                setLanguage: function(e, t) {
                    e.language = t
                },
                setResources: function(e, t) {
                    var n = t.reduce((function(e, t) {
                        return (0,
                        p.A)((0,
                        p.A)({}, e), {}, (0,
                        oi.A)({}, t.resourceType, t))
                    }
                    ), {});
                    e.resources = n
                },
                setDomainList: function(e, t) {
                    e.domainList = t
                },
                setMainDomain: function(e, t) {
                    e.mainDomain = t || ""
                },
                setCustomerService: function(e, t) {
                    var n = t.map((function(e) {
                        var t = e.path.substr(e.path.length - 8)
                          , n = e.path.slice(0, e.path.length - 8)
                          , a = window.desDecrypt(n, t);
                        return (0,
                        p.A)((0,
                        p.A)({}, e), {}, {
                            path: a
                        })
                    }
                    ));
                    e.customerService = n
                },
                setWinnerBoard: function(e, t) {
                    e.winnerBoard = t.map((function(e) {
                        var t, n = e.vo, a = void 0 === n ? {} : n;
                        return (0,
                        p.A)((0,
                        p.A)({}, a), {}, {
                            winAmount: Sn((null !== (t = a.winAmount) && void 0 !== t ? t : 0 === a.winAmount) ? +a.winAmount : 0)
                        })
                    }
                    )).sort((function(e, t) {
                        return +t.winAmount - +e.winAmount
                    }
                    ))
                },
                setShowSideMenu: function(e, t) {
                    e.showSideMenu = "reverse" === t ? !e.showSideMenu : t
                },
                setAnnouncementAndPromo: function(e, t) {
                    e.banners = t.banners,
                    e.notice = t.player,
                    e.popup = t.popup,
                    e.promotion = t.promotion
                },
                updateType: function(e, t) {
                    var n = (0,
                    p.A)({}, e.type);
                    n.dailySalary = u.Uu.checkConsolidated(t, "contractmrdailysalinfotype"),
                    n.hourSalary = u.Uu.checkConsolidated(t, "contracthoursalinfo"),
                    n.salary = u.Uu.checkConsolidated(t, "dailysalinfotype"),
                    window.sessionStorage.setItem("enableSalary", n.salary),
                    n.enableCt = u.Uu.checkConsolidated(t, "divtypeinfo"),
                    window.sessionStorage.setItem("enableContract", n.enableCt),
                    e.type = n
                }
            }
              , ji = {
                state: Ui,
                actions: qi,
                mutations: Fi
            }
              , Zi = {
                acLoaded: !1,
                mcLoaded: !1,
                acShow: !1,
                mcShow: !1,
                mcPage: "securityCenter",
                acPage: "agentTeamOverview",
                rewardMcPageData: null,
                prizeDetail: null
            }
              , Qi = {
                acLoaded: function(e) {
                    e.acLoaded = !0
                },
                mcLoaded: function(e) {
                    e.mcLoaded = !0
                },
                setAcShow: function(e, t) {
                    e.acShow = t
                },
                setMcShow: function(e, t) {
                    t || (window["pointMall"] = null),
                    e.mcShow = t
                },
                setMcPage: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "securityCenter";
                    e.mcPage = t
                },
                setAcPage: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "agentTeamOverview";
                    e.acPage = t
                },
                setRewardMcDate: function(e, t) {
                    e.rewardMcPageData = t
                },
                setPrizeDetail: function(e, t) {
                    e.prizeDetail = t
                }
            }
              , Yi = {
                state: Zi,
                mutations: Qi
            };
            o.Ay.use(ii.Ay);
            var Ji = new ii.Ay.Store({
                modules: {
                    Login: vi,
                    Header: Mi,
                    eGameStore: Ei,
                    lottery: zi,
                    home: ji,
                    acmc: Yi,
                    Integral: u.H5,
                    Help: u._V,
                    Public: u.w3,
                    Live: Ai
                }
            })
              , Wi = Ji
              , Ki = {
                loader: function(e, t) {
                    var n = document.getElementById("br_loader")
                      , a = n;
                    if (!n) {
                        var i = document.createDocumentFragment()
                          , o = document.createElement("div");
                        o.id = "br_loader";
                        var s = document.getElementById("app");
                        a = o;
                        var r = "<div class='br_loader_main'><div class='br_loader_bg'></div><div class='br_loader_content'><div class='br_spinner'><div class='spinner_inner'><div class='spinner_line'></div><div class='spinner_line'></div><div class='spinner_line'></div><div class='spinner_circle'>&#9679;</div></div></div></div></div>";
                        a.innerHTML = r,
                        i.appendChild(o),
                        t ? (o.className = "br_loader_child",
                        t.appendChild(i)) : (o.className = "br_loader_root",
                        document.body.insertBefore(i, s))
                    }
                    this.close(a, e)
                },
                init: function(e, t) {
                    var n, a = this, i = e || {}, o = document.getElementById("pp_model_dialog"), s = this.sortObj(i);
                    if (o) {
                        var r = this.getByClass(o, "pp_model_dmain")
                          , c = this.getByClass(o, "pp_model_dbody");
                        r.removeChild(c);
                        var l = document.createDocumentFragment();
                        n = o,
                        l.appendChild(this.createDom(s, i, n, (function(e) {
                            t && t(e)
                        }
                        ))),
                        o.classList.add("active"),
                        r.appendChild(l)
                    } else {
                        var u = document.createDocumentFragment()
                          , d = 0
                          , m = [];
                        while (d < 2)
                            m[d] = document.createElement("div"),
                            d > 0 && m[d - 1].appendChild(m[d]),
                            d++;
                        m[0].id = "pp_model_dialog",
                        m[0].className = i.class ? "pp_model_dialog active ".concat(i.class) : "pp_model_dialog active",
                        m[1].className = "pp_model_dmain",
                        n = m[0],
                        m[1].appendChild(this.createDom(s, i, n, (function(e) {
                            t && t(e)
                        }
                        )));
                        var p = document.createElement("div");
                        p.className = "pp_model_dcover",
                        p.id = "pp_model_dcover",
                        m[1].appendChild(p),
                        u.appendChild(m[0]),
                        document.getElementsByTagName("body")[0].appendChild(u)
                    }
                    var g = document.getElementById("pp_model_dcover");
                    g.onclick = null,
                    g.onclick = function() {
                        ("boolean" !== typeof i.cover || i.cover) && (a.close(n),
                        t && t("cover"))
                    }
                    ,
                    i.timeOut && this.close(n, i.timeOut)
                },
                sortObj: function(e) {
                    var t = {};
                    return e.icon && (t.icon = e.icon),
                    e.title && (t.title = e.title),
                    e.html && (t.html = e.html),
                    e.btn && (t.btn = e.btn),
                    t
                },
                getByClass: function(e, t) {
                    for (var n = e.getElementsByTagName("*"), a = [], i = 0; i < n.length; i++)
                        n[i].className === t && a.push(n[i]);
                    return a[0]
                },
                createDom: function(e, t, n, a) {
                    var i = this
                      , o = document.createElement("div");
                    o.className = "pp_model_dbody",
                    o.style = t.style || "";
                    var s = {};
                    for (var r in e)
                        if ("btn" === r) {
                            var c = e.btn || {}
                              , l = document.createElement("div");
                            l.className = "pp_model_db".concat(r);
                            var u = function(e) {
                                var t = document.createElement("div");
                                t.className = e,
                                t.addEventListener("click", (function(t) {
                                    i.close(n),
                                    a(e)
                                }
                                )),
                                t.innerHTML = "<span>".concat(c[e], "</span>"),
                                l.appendChild(t)
                            };
                            for (var d in c)
                                u(d);
                            o.appendChild(l)
                        } else if ("icon" === r) {
                            var m = document.createElement("div");
                            m.className = "pp_model_db".concat(r, " ").concat(e[r]),
                            m.innerHTML = "<span class=br_dialog_d".concat(e[r], "></span>"),
                            o.appendChild(m)
                        } else
                            "class" !== r && (s[r] = document.createElement("div"),
                            s[r].className = "pp_model_db".concat(r),
                            s[r].innerHTML = e[r],
                            o.appendChild(s[r]));
                    return o
                },
                close: function(e, t) {
                    "number" === typeof t ? (e.classList.add("active"),
                    setTimeout((function() {
                        e.classList.remove("active")
                    }
                    ), t)) : t ? e.classList.add("active") : e.classList.remove("active")
                }
            };
            window.cover = Ki,
            o.Ay.prototype.cover = Ki;
            var Xi = {};
            function $i() {
                var e = Fe().parse(window.location.search, {
                    ignoreQueryPrefix: !0
                })
                  , t = (null === e || void 0 === e ? void 0 : e.token) || window.sessionStorage.getItem("token");
                t && Wi.dispatch("loginInfo", {
                    token: t
                })
            }
            var eo = n(17318)
              , to = n(72662)
              , no = n.n(to)
              , ao = n(27567)
              , io = n.n(ao)
              , oo = n(95681)
              , so = n.n(oo)
              , ro = n(24276)
              , co = n.n(ro)
              , lo = n(96375)
              , uo = n.n(lo)
              , mo = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "maintain-wrap"
                }, [t("div", {
                    staticClass: "content-wrap"
                }, [t("div", {
                    staticClass: "right-wrap"
                }, [t("div", {
                    staticClass: "logo-wrap"
                }, [t("CommonLogo", {
                    attrs: {
                        src: n(65549)
                    }
                })], 1), t("h2", [e._v(e._s(e.$t("game_maintenance")))]), t("div", {
                    staticClass: "error-info"
                }, [t("p", [e._v(e._s(e.$t("info_maintenance")))])]), t("a", {
                    staticClass: "service-btn",
                    attrs: {
                        href: "javascript:void(0)"
                    },
                    on: {
                        click: function(t) {
                            return e.getService()
                        }
                    }
                }, [t("i"), t("span", [e._v(e._s(e.$t("in_customer_service")))])])])])])
            }
              , po = []
              , go = {
                name: "maintain",
                components: {
                    CommonLogo: u.fA
                },
                setup: function() {
                    var e = (0,
                    h.so)()
                      , t = e.getService;
                    return {
                        getService: t
                    }
                }
            }
              , fo = go
              , vo = (0, _.A)(fo, mo, po, !1, null, null, null)
              , ho = vo.exports
              , wo = function() {
                var e = this
                  , t = e._self._c;
                return t("div", {
                    staticClass: "regiona-wrap"
                }, [t("div", {
                    staticClass: "content-wrap"
                }, [t("div", {
                    staticClass: "right-wrap"
                }, [t("div", {
                    staticClass: "logo-wrap"
                }, [t("CommonLogo", {
                    attrs: {
                        src: n(65549)
                    }
                })], 1), t("h2", [e._v(e._s(e.$t("blockip")))]), t("div", {
                    staticClass: "ip_address"
                }, [t("span", [e._v("IP：")]), t("span", [e._v(e._s("".concat(e.locationInfo.ip)))])]), t("div", {
                    staticClass: "error-info"
                }, [t("p", [e._v(e._s(e.$t("info_ip_block")))])]), t("a", {
                    staticClass: "service-btn",
                    attrs: {
                        href: "javascript:void(0)"
                    },
                    on: {
                        click: function(t) {
                            return e.getService()
                        }
                    }
                }, [t("i"), t("span", [e._v(e._s(e.$t("in_customer_service")))])])])])])
            }
              , Co = []
              , bo = {
                name: "regiona",
                components: {
                    CommonLogo: u.fA
                },
                setup: function() {
                    var e = (0,
                    h.so)()
                      , t = e.getService
                      , n = (0,
                    h.Pj)()
                      , a = n.store
                      , i = (0,  o.EW)((function() {
                        return a.Login.location
                    }
                    ));
                    return {
                        getService: t,
                        locationInfo: i
                    }
                }
            }
              , _o = bo
              , Ao = (0, _.A)(_o, wo, Co, !1, null, null, null)
              , yo = Ao.exports;
            o.Ay.component("svg-icon", Da);
            var Po = function(e) {
                return e.keys().map(e)
            }
              , ko = n(30279);
            Po(ko);
            var Mo = n.p + "img/img-loading.cf8e36f5.gif";
            u.wG.loadACMC(Wi),
            o.Ay.config.productionTip = !1,
            window.$i18n = Aa.A,
            o.Ay.component("paginate", uo()),
            o.Ay.use(no(), {
                dynamic: !0
            }),
            o.Ay.use(ne.Ay),
            o.Ay.use(io()),
            o.Ay.use(so()),
            o.Ay.use(co()),
            o.Ay.use(u.ZR, {
                router: ai,
                store: Wi,
                i18n: Aa.A
            });
            var xo = function() {
                o.Ay.use(eo.Ay, {
                    error: "".concat(Wi.state.Public.imgUrl, "/TCG_GAME_ICONS/default.png"),
                    loading: Mo,
                    attempt: 1,
                    lazyComponent: !0,
                    observer: !0,
                    listenEvents: ["scroll"],
                    observerOptions: {
                        rootMargin: "0px",
                        threshold: .1
                    }
                })
            };
            function Lo() {
                return So.apply(this, arguments)
            }
            function So() {
                return So = (0,
                i.A)((0,
                a.A)().mark((function e() {
                    var t;
                    return (0,
                    a.A)().wrap((function(e) {
                        while (1)
                            switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                Wi.dispatch("getPermission");
                            case 2:
                                return t = e.sent,
                                u.ga.loadAnalytics(t.info.analytics),
                                xo(),
                                e.abrupt("return", new o.Ay({
                                    el: "#app",
                                    router: ai,
                                    store: Wi,
                                    popup: Xi,
                                    i18n: Aa.A,
                                    render: function(e) {
                                        var t = Wi.state.Login.systemStatus;
                                        return 0 === t ? ($i(),
                                        e(et)) : 1 === t ? e(ho) : 2 === t ? e(yo) : null
                                    }
                                }));
                            case 6:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e)
                }
                ))),
                So.apply(this, arguments)
            }
            Lo(),
            window.shellAPI.helpCenterUrl = "/helpmc"
        },
        52276: function(e, t, n) {
            "use strict";
            n.d(t, {
                z: function() {
                    return i
                }
            });
            n(44114);
            var a = n(75316)
              , i = {
                mixins: [a.vE.startGame, a.vE.getPopupGameList],
                computed: {
                    isLogin: function() {
                        return this.$store.state.Login.isLogin
                    },
                    isAgent: function() {
                        return this.$store.state.Login.isAgent
                    },
                    isTrial: function() {
                        return this.$store.state.Login.isTrial
                    }
                },
                methods: {
                    checkLogin: function() {
                        return this.isLogin ? !this.isTrial || (this.cover.init({
                            html: this.$t("in_need_true_account"),
                            icon: "info",
                            btn: {
                                confirm: this.$t("in_increase_submit")
                            }
                        }),
                        !1) : (this.$modal.show("loginPopupModal"),
                        !1)
                    },
                    startGameV2: function(e, t) {
                        if (this.checkLogin()) {
                            var n = e.vassalage
                              , a = e.gameCode
                              , i = e.isGame;
                            switch (n) {
                            case "TCG_LOTTO_VN":
                                this.$router.push({
                                    path: "/vnLottery",
                                    query: {
                                        gameCode: a
                                    }
                                });
                                break;
                            case "TCG_SEA":
                                this.$router.push({
                                    path: "/seaLottery",
                                    query: {
                                        gameCode: a
                                    }
                                });
                                break;
                            case "LOTT":
                            case "ELOTT":
                                this.$router.push({
                                    path: "/lottery",
                                    query: {
                                        gameCode: a
                                    }
                                });
                                break;
                            default:
                                "VASSALAGE" === i ? this.getPopupGameList(e) : this.startGameInRoute(e, t);
                                break
                            }
                        }
                    },
                    launchGameVendor: function(e, t) {
                        var n = e.gameType
                          , a = e.vassalage;
                        "RNG" === n ? this.$router.push({
                            path: "/rng",
                            query: {
                                vassalage: a
                            }
                        }) : this.startGameV2(e, t)
                    },
                    launchGameList: function(e, t) {
                        this.startGameV2(e, t)
                    }
                }
            }
        },

        62547: function(e, t, n) {
        10917: function(e) {
            "use strict";
            e.exports = JSON.parse('{"reg_pattern_0":"Please enter (min) - (max) characters","reg_pattern_1":"Please enter (min) - (max) characters, the first character must be a letter, followed by a combination of letters and numbers.","reg_pattern_2":"Please enter (min) - (max) characters, combination of chinese character (kanji) and numbers.","reg_pattern_3":"Please enter (min) - (max) characters in mailbox format","reg_pattern_4":"Please enter (min) - (max) alphanumeric without special character.","reg_pattern_5":"Please enter (min) - (max) characters, must be a combination of letters and numbers.","reg_pattern_6":"Please enter (min) - (max) characters, only numbers allowed","reg_pattern_7":"Please enter (min) - (max) characters, a combination of alphanumeric without special character, and at least one uppercase letters.","reg_pattern_8":"Please enter (min) - (max) characters, english alphabet and spacing only","reg_pattern_9":"Please enter (min) - (max) characters, spacing not allowed","reg_pattern_10":"Please enter (min) - (max) characters , chinese character and punctuation marks","reg_pattern_11":"Please enter the correct date format (yyyy-MM-dd)","reg_pattern_12":"Please enter (min) - (max) characters , must be a combination of letters and a spacing.","reg_pattern_13":"Please enter the correct date format (MM-dd-yyyy)","reg_pattern_14":"Please enter (min) - (max) characters, that consists of alphabets and numbers only.","reg_pattern_15":"Please enter (min) - (max) characters, korean only.","reg_pattern_16":"Please enter (min) - (max) characters, Thai only","reg_pattern_17":"Please enter (min) - (max) characters, Thai or english alphabet and spacing only","reg_pattern_18":"Please enter (min) - (max) characters, uppercase letters and spaces are allowed, and must contain at least one English letter","reg_pattern_19":"Please enter (min) - (max) characters, letters, numbers, and symbols are allowed","error_password":"Please fill in your password with (min) - (max) characters","enter_verification_code":"Please enter a valid verification code","error_phone_number_limit":"Please enter a valid mobile number","inconsistent_twice":"Incorrect confirmation input","in_payeeName_error":"Real name format is incorrect","in_mobileNum_error":"Phone number format is incorrect","invitation_code_error":"Invalid invitation code","in_user_register":"Username","in_mobile_register":"Mobile","hd_login_button":"Login","hd_sign_button":"Register","hd_free_demo":"Trial","in_increase_username":"Username","in_increase_password":"Password","new_password":"New Password","hd_home":"Home","hd_live_casino":"Live Casino","hd_slots_games":"Slot Games","hd_sports_betting":"Sports Betting","hd_esport":"E-Sports","hd_members":"Members","hd_member_center":"Member Center","hd_agent":"Agent","hd_pvp":"Poker Games","hd_event":"Promotion","hd_deposit_button":"Deposit","hd_withdraw_button":"Withdraw","ft_user_agreement":"USER AGREEMENT","member_info":"Member Info","shee":"START","in_live_device":"Mobile Applications, Android Bind Support","in_more_cancel":"Cancel","in_please_wait":"Please Wait...","in_popup_prompt":"Confirmation","in_popup_agree":"Agree","in_display_all":"Display All","in_recent_game":"Recent Game","in_my_collection":"My Collection","in_slot_search":"Slot Machine Game Search","in_type_all":"All","in_game_category":"Game Category","in_slot_machine":"Slot machine","in_scratch_music":"Scratch Card","in_video_poker":"Video Poker","in_table_games":"Board Game","in_arcade_games":"Arcade Games","in_accumulative_prize":"Jackpot","in_bingo":"Bingo","in_minimum_bet":"Minimum bet","in_number_lines":"Number of lines","in_yuan_more":"1 yuan or more","in_lines_more":"25 lines or more","in_game_fishing":"Fish","in_rng_electronic":"Slots","in_all_Comprehensive":"Consolidated","in_lott_ticket":"Lottery","in_lott_game":"Lottery Games","in_pvp_game":"Poker Games","in_fish_game":"Fish Games","in_cockfight_nav":"Cockfight","in_elott_Handicap":"E-Lottery","in_real_person":"Live Casino","in_physical_education":"Sports","in_chess":"Poker","in_no_data":"No data","in_logged_login":"You are not logged in, please login","in_immediate_game":"PLAY NOW","in_free_trial":"FREE TRIAL","in_first_password":"Please change your password (first login or expired password)","in_live_video":"Live Casino","in_activity_center":"Activity Center","in_sure_logout":"Are you sure you want to logout?","in_customer_service":"Customer Service","in_hot_games":"Hot Games","in_save_game":"Save this game","in_name":"Name","in_app_download":"APP Download","in_forget_password":"Forgot Password","in_register_now":"Register now","in_remember_password":"Remember","in_been_out":"The password has been sent. Please check it out.","in_retrieve_password":"Retrieve your password","in_registered_successfully":"Registered successfully, ready for login","in_agree_accept":"I am 18 years old and agree to accept","in_terms_use":"Terms of Use","in_term_use":"《Terms of Use》","in_incorrect_password":"Please enter the username and password","in_account_number":"Account number","in_increase_submit":"OK","in_increase_title":"Title","in_increase_announcement":"Announcement","in_increase_date":"Date","in_i_agree":"I agree","in_first_security":"First login password has expired Changing passwords from time to time helps account security","in_increase_close":"Close","in_sign_out":"Sign out","in_personal_center":"Personal Center","in_my_account":"My Account","in_my_wallet":"My Wallet","in_increase_deposit":"Deposit","in_increase_withdrawal":"Withdrawal","in_betting_record":"Betting Record","in_account_record":"Account Record","in_personal_loss":"Profit And Loss","in_bonus_details":"Bonus Details","in_reward_center":"Reward center","in_agency_announcement":"Announcement","in_increase_overview":"Overview","in_increase_account":"Account","in_team_management":"Team Management","in_team_betting":"Team Betting","in_team_transaction":"Team Transaction","in_user_loss":"User Profit and Loss","in_my_income":"My Income","in_account_details":"Transaction Details","in_red_envelope":"Red Envelope","in_please_information":"Please enter the correct user information","in_sorry_in":"Sorry, you are not logged in yet, please log in.","in_please_account":"Please login to the user account","in_account_incorrect":"Account format is incorrect","in_password_incorrect":"Password format is incorrect","in_email_incorrect":"E-mail format is incorrect","in_confirmation_correct":"Confirmation password is not correct.","in_vwrite_code":"Please enter the captcha","in_increase_affiliateCode":"Invitation code","form_input_optional":"If not available, optional.","in_increase_captcha":"Captcha","in_increase_email":"Email","in_increase_mobileNum":"Mobile","in_increase_mobile_no":"Phone number","in_increase_mobile_placeholder":"Mobile","in_increase_nickname":"Nickname","in_increase_payeeName":"Real name","in_increase_fullname":"Full name","in_increase_paymentPassword":"Transaction password","in_increase_qqNum":"QQ","in_increase_whatsapp":"WhatsApp","in_increase_facebook":"Facebook","in_increase_telegram":"Telegram","in_increase_idNumber":"ID Number","in_increase_line":"Line ID","in_increase_recommenderId":"Referrer","in_increase_verifyPwd":"Confirm password","in_increase_emailInfo":"Valid mail address","in_increase_digit":"digit","in_increase_d0":null,"in_increase_d1":", the first letter must be a combination of letters and Numbers","in_increase_d2":", Chinese and English letters","in_increase_d3":", valid email","in_increase_d4":", consisting of letters and numbers, without special characters","in_increase_d5":", please input a combination of letters and numbers","in_increase_d6":", only numbers allowed","in_increase_d7":", please input a combination of letters, numbers and atleast one uppercase character","in_increase_d8":", english alphabet and spacing only","in_increase_d9":", any character but spacing not allowed","in_increase_d10":", chinese character and punctuation marks","in_forgot_password":"Forgot","in_please_password":"Please confirm the current password","in_customer_services":"Customer Services","in_username_exist":"Username/Email does not exist","in_increase_mailbox":"Mailbox","in_please_username":"Please enter username","in_please_address":"Please input the email address","in_please_ways":"Please retrieve your password in the following ways","in_first_login":"First Login","in_password_expired":"Password has expired","in_changing_security":"Changing passwords from time to time helps account security","in_please_game":"Please enter the name of the game","in_increase_game":"Games","in_network_again":"Network link is abnormal, please try again","in_help_center":"Help Center","in_transfer_upline":"Transfer to Upline","in_user_agreement":"User Agreement","in_platform_information":"Internal Message","in_change_expired":"Change Password (First Login or Password Expired)","br_enter_plname":"Please enter name","br_ennum_total":"Total","in_increase_wechat":"Wechat","in_stay_tuned":"Coming Soon","in_bet":"Betting","refresh_balance":"Refresh Balance","br_etkgini_lkxqulo":"APP","br_lhhvfwm_ipcvew":"1.Scan the QR code, enter the download page to download","br_vcspb_suiiyfy":"2. Allow installing the app. Click here to see how to install in iOS and Android.","br_froqigg_jljxdudy":"3. Open the App, log in or register your account to enjoy the games","br_omolq_sapygzxc":"If you failed to scan the QR code, you can also check our website on your browser","br_njrhpowu_aysutep":"iOS","br_rcigcm_nasclv":"Click to download","br_lcwqhde_kqmrypu":"Android","br_wmezzon_sifhyh":"Mobile Web","br_dugltyx_tocfgy":"One account access to both PC and Mobile","br_hsvgpexk_lpparv":"Say goodbye to individual software","br_xlypyv_lblhmihk":"Play on iOS or Android devices","app_top_row_1":"Support ios & android all mobile devices, mobile games support lottery, slots, fishing and live casino products","app_top_row_2":"A rich variety of nearly 10,000 slots games and the most complete lottery games, bringing you a wonderful and exciting game experience","app_mid_row_3":"Support IOS version and Android version","app_top_row_6":"Apple download tutorial","click_to_down":"Click to download","click_to_check":"Click to view","br_knogskjv_uilyveu":"Have fun through our platform","br_tuikje_lbeuhf":"List of Winners","br_kywqxq_rxrszsoq":"Prize Money","br_mbgluwh_ikzblrn":"Guide","br_tkncoiz_glogk":"Application Agent","br_pkbyeshj_jkfjiud":"Deposit","br_lrugixg_rnzkh":"Withdrawal","br_uxtyro_zufquirt":"Live Casino","br_ybdehrc_eeknku":"Easy to Start","br_pesmasp_euafdm":"Join Us to Make Money","br_lhwcetf_lvzpd":"Easy and Secure","br_weebrix_ajwpdpfp":"Quick and Easy","br_adpcs_qxxdmb":"Sports Betting","br_show_license":"Show License","br_mobile_betting":"Mobile Betting","skype":"Skype","wechat":"Wechat","in_display_swiper":"Show Carousel","in_rng_pool":"Total Pool","in_other_lott":"Other Lott","br_lott_new":"NEW","br_lott_hot":"HOT","in_user_login":"Username/Mobile","in_mobile_login":"SMS","in_register_user":"Username","in_register_mobile":"Mobile","in_increase_verificationCode":"SMS","in_mgsCode_countTime":"s","in_regInfo_reset":"Reset","in_get_verificationCode":"Get code","in_need_true_account":"Please Register An Account First","br_index_scan":"Scan to","br_index_dream":"enjoy Your Jounery","br_index_betting":"Enjoy Anytime and Anywhere !","br_index_mobile":"MOBILE BET","br_right_quick":"SUPPORT","in_qq_customer":"QQ Service","in_speed_check":"Line Detection","in_system_notice":"System Notification","in_recharge_center":"Recharge Withdrawal","TOP":"TOP","in_elott_game":"Lottery Games","go_promo":"Go","in_account_info":"Account Info","congrats":"Congrats","get":"Get","join":"REWARD","egg_ticket":"Golden Egg Ticket","in_increase_zalo":"Zalo number","in_increase_zalo_desc":"Please enter your Zalo account, get rewarded up to 131K","in_registered_success":"REGISTRATION SUCCESSFUL","in_registered_popuptitle1_1":"Add","in_registered_popuptitle1":"Zalo","in_registered_popuptitle1_2":"to redeem BONUS","in_registered_popuptitle2":"Start your lucky journey with {0}!","in_registered_topromtion":"CLAIM","in_new_register":"New member could receive bonus {0} immediately after completing the registration.","br_kpsciac_sxxde":"Balance","in_daily_hdtmkj":"Daily Salary","in_hourly_salary":"Hourly Salary","in_bonus_bmwmuf":"Dividend","click_to_get":"Claim","message":"Message","red_envelope_ticket":"Red Envelope Ticket","wheel_title":"Prize Wheel Ticket","bonus":"Bonus","points":"Points","get_reward":"Claim","go":"Go to","info_new_mail":"New message","info_deposit_arrival":"Hi, your {1} deposit request at {0} has been credited.","info_withdraw_approve":"Hi, your {1} withdrawal request at {0} has been approved.","info_withdraw_reject":"Hi, your {1} withdrawal request at {0} has been rejected.","info_deposit_failed":"Hi, your {1} deposit request at {0} has failed.","br_uapsgaua_gvvbhnpo":"Current Point","br_kbhigp_juwjor":"Redeem History","br_tnfukuis_rjjyqa":"Points Details","br_vtodu_hdjsnica":"Points Rules","br_olbqegi_dlbmmgr":"Points","br_ruwelb_hnlmfcec":"Amount","br_dbglvpl_fzdyyffh":"Points","br_ivyvhbd_plqdke":"Goods Details","br_gjqnvvy_iryxjct":"Redeem","br_vnliis_uixdju":"Check More","br_zpxnzwtl_ahrmtzvz":"Search","br_fsfkqe_mocopxg":"Transaction Reference Number","br_zskguild_rlcqqk":"Apply Time","br_vkbkpu_leedsy":"Type","br_lxdltp_elyuwvbc":"Name","br_idllfy_mhuzjxfh":"Quantity","br_xccevwn_fjuvqbw":"Points Requirement","br_etgwkoc_fqifvim":"Amount Requirement","br_iaprpir_sqefjc":"Status","br_ltxfqh_ucybifg":"Time","br_ndxjxg_tuflsp":"Changed Points","br_okfhmh_fmaarbt":"Points Balance","br_vcjchv_ffquwrqp":"Remark","br_xcrvghw_neykrj":"Units","br_grcoftcc_jtjpbu":"Points Ratio","br_urflfyt_rmytyz":"Redeem Amount","br_tzzdxk_yxrtg":"Points Earns","br_veeoa_hbzkb":"Submits","br_svceofz_wcvdg":"Redeem History","br_jyyja_wdywrci":"Redeem Promotion","br_qjljs_uchsbw":"Live","br_vqosuc_pxgvcw":"Gift","br_mgkvcm_bovyxv":"In Process","br_qfdmfmp_cfhotd":"Rejected","br_bembw_cavbkru":"Approved","br_hoohu_pxbocnca":"Redeem","br_sqmypaur_twtjtu":"Please Enter Correct Information","br_vwxdjflb_sfyljuh":"Redeem Complete","br_kdelhzx_addyo":"Account","br_ektqjtn_dxdglces":"Redeem Conditions","br_fdlerbkw_puifuy":"Redeem Quantity","br_xxuboj_piyam":"Available Quantity","br_kfqhgbf_ayytrfv":"Paid Account","br_gifihpe_qfobsp":"Main Wallet","br_wpubkp_hqwpdbn":"Paid Amount","br_chtyuwwz_bbkoi":"Receiving Address","br_address_bbkoi":"Address","br_yuan_monkey":"Yen","br_exchange_quantity":"Redeemed Quantity","br_enter_moneypwd":"Please enter withdraw password","br_enter_getaddree":"Please enter receiving address","br_enter_cphone":"Please enter mobile number","br_enright_cphone":"Please enter correct mobile number","in_increase_instructionsOne":"The point is a currency for the point mall, you may use it to redeeming the chips, services, gift and many more.","in_increase_instructionsTwo":"Members can earn the points by deposit, please refer to 【Points Table】for more details about the ratios","br_exchange_points":"Get Points by Cash","br_convertible_proportion":"Exchange Ratio","br_current_balance":"Available Balance","points_type_live":"Live Casino","points_type_lott":"Lottery Ticket","points_type_pvp":"PVP Game","points_type_rng":"Slot Games","points_type_sports":"Sports Betting","points_type_redeem":"Redeem","points_type_deposit":"Deposit","points_table":"Exchange Rate Table","br_mkezget_mcgovs":"Dividend Contract","br_jsargd_pwwcto":"Period Valid Bet","br_vajhsvh_fxdpos":"Period P&L","br_sjdfed_bwefu":"Active member","br_qpvusa_fvosl":"Rate","periodic_bets":"Periodic/Valid Bet","br_oighuvbk_dgrwie":"Accept","br_ioddlq_swsrf":"Terminate","br_oyzao_gubukr":"Reject","br_frttrr_qkxir":"This Contract is Offered by your Upline/Agent. Please read and understand the policy carefully, if you agreed with this policy, click on \'Accept\' else \'Reject\' this offer.","br_vtarzkrq_mfrflk":"1. Contract agreement is the higher and lower levels agreed to establish a dividend within the platform.","br_fcqouvf_gdbmvdm":"2. The Operator reserves the right, in its sole discretion, to change, modify, add, or remove any portion of this website or these Terms of Use, in whole or in part, at any time for any reason.","br_yeffxs_wepurpso":"3. All terms and conditions of the platform, the platform reserves the final interpretation!","br_ihdkcab_hgsdicgf":"Team betting","br_pyogvw_bifuxqm":"Active member","br_idqho_exmbdevj":"Rate","br_gfhdge_lbdxbmp":"Bet Amount Daily","br_gjsfjcqo_mtkkbpl":"Rates","br_varjv_doqbjqbi":"Amount","br_fcqaon_nloihn":"This Contract is Offered by your Upline/Agent. Please read and understand the policy carefully, if you agreed with this policy, click on \'Accept\' else \'Reject\' this offer.","br_fgtjfutl_wvsderq":"1. The daily wage statistics rules one day before the sales team, the daily wage is calculated in accordance with the rules, the daily wage will be distributed the day before the next day.","br_ddottzq_xdhqkja":"2. lack of lower sales of active compliance, will be the actual payroll activity.","br_gclmyni_dlaat":"3. The Operator reserves the right, in its sole discretion, to change, modify, add, or remove any portion of this website or these Terms of Use, in whole or in part, at any time for any reason.","br_qgqbbjo_oillv":"Team betting","br_kmojqy_qqxdpeg":"Rate","br_lpqmrfrg_mvacmxf":"Bet Amount per Hours","br_rfcndw_mijltrk":"To protect the interests of the agent\'s salary when the platform launched the Time-funded contract agreement, the agency agreement signed by the voluntary principles on the lower platform, and accept the supervision of the platform.","br_hvpoynj_ydeqcjb":"1. The Operator reserves the right, in its sole discretion, to change, modify, add, or remove any portion of this website or these Terms of Use, in whole or in part, at any time for any reason.","label_cancel":"Cancel","higher_rate":"There is downline with higher rate than the new contract, if agree to proceed, will automatically terminate the contract with the downline.","chat_room":"Chat room","point_date_placeholder":"Select Date Range","ponit_date_day1":"Sun","ponit_date_day2":"Mon","ponit_date_day3":"Tue","ponit_date_day4":"Wed","ponit_date_day5":"Thu","ponit_date_day6":"Fri","ponit_date_day7":"Sat","ponit_date_month1":"Jan","ponit_date_month2":"Feb","ponit_date_month3":"Mar","ponit_date_month4":"Apr","ponit_date_month5":"May","ponit_date_month6":"Jun","ponit_date_month7":"Jul","ponit_date_month8":"Aug","ponit_date_month9":"Sep","ponit_date_month10":"Oct","ponit_date_month11":"Nov","ponit_date_month12":"Dec","ponit_date_picker1":"next 7 days","ponit_date_picker2":"next 30 days","ponit_date_picker3":"previous 7 days","ponit_date_picker4":"previous 30 days","more_game":"More Games","symbol_required":"Items marked with * are required","game_classify":"Game Classify","min_one":"More than 1","line_id":"Line ID","live_game_up":"LIVE CASINO","slots_game_up":"Slots","download_up":"Download","help_up":"Help","sports_up":"Sports","fish_up":"Fish","lottery_up":"Lottery","activity_up":"Promotion","ios_get_out":"GET OUR","ios_app":"IOS APP","android_app":"Android APP","load_step":"Step","ios_install":"IOS-APP INSTALLATION STEPS","lite_install":"LITE-APP INSTALLATION STEPS","ios_load_step1":"Scan the code, and click install or download button","ios_load_step2":"If the installed APP fails to start, this pop up message appears, please proceed to step 3","ios_load_step3":"Go to Settings - General","ios_load_step4":"Tap Device Management","ios_load_step5":"Select the downloaded file","ios_load_step6":"Tap and trust the app file","ios_load_step7":"Tap trust button and find the app in your phone","lite_load_step1":"Tap Download - ”install ios lite-app“","lite_load_step2":"Tap Download again  - Allow","lite_load_step3":"Go to Settings - General","lite_load_step4":"Tap Profile","lite_load_step5":"Select the downloaded profile","lite_load_step6":"Tap install on the top right corner of the page","not_empty":"Input cannot be empty","notification":"Notification","partner":"Partner","online_player":"Online Player","game_maintenance":"Game maintenance","viewing":"Viewing","add_bookmark":"Add bookmark","vip_level":"VIP","compete_game":"E-Sports","agreement":"I am 18 years old, have read and co-administered the rules and regulations.","casino":"Casino","register_success":"Register successful","winner_game":"Player","winner_name":"Game Name","winner_money":"Prize","winner_title":"List of Winners","list_winner":"List of Winners","winner_info":"Congrats {0}, {1} Won {2}","feedback_title":"Feedback and suggestions","feedback_success":"After receiving a response, we will contact you as soon as possible.","feedback":"Feedback","feedback_placeholder":"Please leave your contact information after editing the content, thank you","please_feedback":"Please enter content","viewing_now":"View now","see_more":"See more","referral_code":"Referral code","no_account":"No account yet?","in_already_account":"Already have an account","invite_friends":"Invite friends","promoTip_title":"APP Promotion","promoTip_line1":"1. Download and install the Apple/Android APP","promoTip_line2":"2. Log in in the APP to immediately receive various offers for free","blog":"Blog","draw_time":"Draw Time","enter_new_password":"Please enter a new password","reset_pass_sms":"SMS reset password","mission_activity":"Mission","jackpot":"Jackpot","more_button":"More","join_us":"Join us","btn_join":"Join","choose_a_hero":"Choose a hero","choose_btn":"Choose","popular_nav":"Popular","play_jackpot_game":"Play Jackpot Games","game_new":"New","timeout_retry_please":"The page took longer time to load, please check your network connectivity","scan_qr_code_or":"Scan the QR Code or","qr_code_desc_1":"Scan the QR code according to the mobile platform","qr_code_desc_2":"Follow the instructions on the page, click “Install” or “Download” to install the APP","qr_code_desc_3":"Open the App, log in or register account to enjoy the games If the QR code scan fails, please use mobile browser to open website to download the APP.","qr_code_desc_4":"Play on iOS or Android devices. One account access to both PC and Mobile","qr_code_desc_5":"Have fun through our platform Say goodbye to individual software","ios_lite_app":"LITE APP","tutorial_here":"Tutorial Here","web_and_mobile_dw":"Web And Mobile Download","click_Install":"4. Click “Install”","hd_sports_rolling":"Rolling","hd_sports_today":"Today","hd_promotion_claim":"Promotions Claim","login_exist_account":"Sign in existing","register_new":"Register new one","code_sent":"Verification code sent","auth/invalid-phone-number":"Invalid phone number format.","auth/missing-phone-number":"Please enter a valid phone number.","auth/too-many-requests":"Too many requests, please try again after 5 minutes.","auth/unknown":"An unknown error occured.","auth/invalid-verification-code":"Verification code is not valid","auth/missing-verification-code":"Verification code is missing","auth/captcha-check-failed":"Invalid reCaptcha input, or if this method was called from a non-whitelisted domain.","auth/quota-exceeded":"Quota not sufficient, please contact customer service.","auth/operation-not-allowed":"Not enabled function, please contact customer service.","auth/code-expired":"Verification code has expired, please send again.","auth/popup-closed-by-user":"Login failure. Please try again.","member_no_enter":"Non-member account unable to login","winning_time":"Winning Time","label_content":"Content","affiliate_service":"Affiliate","your_ip":"Your IP Address","hot_sport":"HOT MATCHES","featured_matches":"Featured Matches-Enjoyable Games","league":"LEAGUE","match":"MATCH","hot_time":"TIME","sports_bet":"BET","more_history":"More History","lead_board":"LEADERBOARD","winners":"WINNERS","send_sms":"Send verification code","sms_code":"SMS Code","not_member":"Not yet member?","register_here":"Register here","create_account":"Create Account","zalo_redeem":"Enter Zalo number ID to redeem bonus","whatsapp_redeem":"Enter Whatsapp number ID to redeem bonus","verify_first":"Please complete verification first","click_verify":"Click to verify","verify_success":"Successful","click_retry_again":"Click to try","unknown_error":"Unknown error","login_2fa_pass":"Verification done, logging in","login_2fa_tips":"Dear customer, we notice that you have try to login with an unregistered IP, please proceed with additional verification","login_2fa_mobile":"Mobile number","login_2fa_vcode":"Verification code","login_2fa_email":"Binding email","login_2fa_payee":"Bank account name","login_2fa_payee_tips":"Please key in the Bank account name","google_verification":"Google verification","sms":"SMS","email":"Mailbox","ga_ver_code":"Google verification","facebook_google_login":"You can use facebook or google to log in to the game","ask_your_agent":"Please contact your agent","beginner_manual":"Beginner Manual","rt_win_rate":"Profit salary","rt_loss_rate":"Loss salary","rt_bet_amount":"Single betting","real_time_salary_menu":"Real-Time Salary","real_time_salary_tip":"To safeguard the interests of our agents, the platform has launched a \\"real-time wage agreement.\\" The agreement is signed on a voluntary basis by agents at all levels on the platform and is subject to supervision by the platform.","real_time_salary_rule1":"1. The wage calculation is based on the proportion of each player\'s bets for each lottery game and each round.","real_time_salary_rule2":"2. If the players are profitable in a round, then it\'s a profit wage; if the players are losing, then it\'s a loss wage.","real_time_salary_rule3":"3. Wages are settled and distributed every 5 minutes.","real_time_salary_rule4":"4. The platform has the final interpretation and modification rights.","con_fish":"Fish","con_live":"Live","con_sports":"Sports","con_pvp":"Poker","con_lott":"Lottery","con_elotto":"E-Lottery","con_rng":"Slots","con_deposit":"Deposit","con_cons":"Consolidated","long_term":"Long term","login_way":"or connect with","or":"Or","payment_method":"Payment Method","our_partners":"Our Partners","after_reset_pass":"Password reset successfully, please log in again","promo_types":"Promotion types","all_promo":"All","other_promo":"Others","sport_promo":"Sports","live_promo":"Live Casino","rng_promo":"Slots","pvp_promo":"Card Games","fish_promo":"Fish","lotto_promo":"Lotto","rebate_promo":"Rebate","point_promo":"Points Mall","rank_promo":"Ranking","deposit_promo":"Deposit","download_promo":"APP Download","new_player_promo":"Newbie","gaming_promo":"Game Promotions","testimony":"Brand Story","brand_endorsement":"Brand Ambassador","promo_newbie":"NEWBIE","promo_limited":"LIMITED","promo_special":"SPECIAL OFFER","promo_daily":"DAILY","promo_rabate":"HIGH RABATE","promo_vip":"VIP","read_and_agree":"I have read and agree to the {0}","terms":"Terms","privacy_policy":"Privacy Policy","contract_request_haeder":"Contract","contract_request_new":"New contract request","contract_request_termination":"Contract termination request","contract_request_success":"Success","sure_leave_game":"Are you sure you want to leave the game?","confirm_withdrawal_request":"The payment has been disbursed, please click whether it has been received.","not_confirm_as_received":"If you do not confirm within {0} minutes, it will be regarded as received.","amount_received":"Received amount","amount_remainder":"Remaining amount","not_received":"Not received","already_received":"Received","upload_proof_unreceived":"Please upload proof of not receiving for staff to investigate","all_received":"Full payment has been made","withdrawal_confirmation":"Withdrawal confirmation","upload_image":"Upload image","upload":"Upload","forced_received":"Your withdrawal request has been forcibly received, and the deposit will not be refunded.","scan_qrcode_below":"Scan the QR code below","activity_join":"Join","activity_claim":"Claim","activity_applying":"Applying","activity_close":"Close","activity_rejected":"Rejected","activity_issued":"Issued","activity_claimed":"Claimed","activity_process":"Process","activity_signed":"Joined","activity_coming":"coming soon","activity_apply_info":"Comment","activity_apply_remark_limit1":"Please limit your content to 140 characters","activity_apply_remark_limit2":"Acceptable png or jpg, max 5MB each","activity_apply_remark_limit3":"The image maximum size is 5MB","activity_apply_remark_limit4":"Can\'t accept upload more than 3 images","activity_choose_doc":"Choose","activity_submit_apply":"Send","activity_apply_image":"File Upload","activity_image_type":"Only acceptable png or jpg","username_or_mobile":"Username/mobile","return_balance":"Recall balance","result_done_return_balance":"Balance returned successfully","contact_us":"Contact Us","point_tips_title1":"Earn points:","point_tips1":"Earn points by participating in platform activities","point_tips_title2":"Points usage:","point_tips2":"Points can be used to redeem game currency or commodities in the Points Mall","point_tips_title3":"Points validity period:","point_tips3":"No expiration","error_not_agent":"Non-agents cannot log in","joined_days":"Join {0} on the {1} day","CN":"中文","EN":"English","JA":"日本語","TH":"ไทย","VI":"Tiếng Việt","MY":"မြန်မာ","ES":"Español","HI":"हिन्दी","ID":"Bahasa Indonesia","KM":"ភាសាខ្មែរ","KO":"한국어","KR":"한국어","MS":"Bahasa Melayu","PT":"Português","TA":"தமிழ்","TW":"繁體中文","TY":"Tagalog","UR":"اُردُو‬","PT-BR":"Português brasileiro","TR":"Türkçe","BN":"বাংলা","AR":"عربي","FA":"فارسی‎","RU":"Русский","KK":"قازاق ٴتىلى‎","UZ":"اوزبیک تیلی","LO":"ພາສາລາວ","NE":"नेपाली","copy_success":"Copied Successfully","link_mgmt":"Referral link","period_D":"Daily","period_W":"Weekly","period_H":"Semimonthly","period_M":"Monthly","blockip":"Access restricted","info_ip_block":"Dear valued Customer: Due to restriction of your location or IP address, you are not allowed to access the site. We apologize for the inconvenience.","info_maintenance":"Dear valued Customer：We are currently performing a system maintenance to serve you better. We apologize for the inconvenience.","maintenance":"System maintenance","refresh":"Refresh","mobile_login":"Mobile Login","username_login":"Username login","mobile_register":"Mobile Register","username_register":"Username Register","affiliate_application":"Affiliate application","deposit_tutorial":"Deposit Tutorial","retry_once":"Retry","domain_check_failed":"Invalid URL, please contact customer service","follow_us":"Follow us","security":"Security","certification":"Certification","gaming_license":"Gaming license","responsible_gaming":"Responsible Gaming","social_media":"Social Media","responsibility":"Responsibility","game_providers":"Game Providers","transfer_downline_msg":"The transfer is successful, {0} transfers to the subordinate {1}, amount: {2}. {3}","transfer_upline_msg":"The transfer is successful, {0} transfers to Upline {1}, amount: {2}. {3}","transfer_to_sub":"Transfer to downline","please_agree":"Please agree to the {0}","apply_success":"Application successful","popular_slot":"Popular Slot","popular_live":"Popular Live Casino","popular_card_game":"Popular Card Game","in_increase_birthday":"Birthday","click_return":"Click Return","in_cashback":"Cash Back","rewards":"Rewards","change_password":"Change password","regulation":"Regulation","time_day":"Day","time_hour":"Hour","popular_live_stream":"Popular Live","is_live":"Is live","scan_to_download":"Scan QR to download","support_ios_android":"Support iOS & Android","access_without_download":"Direct access without download","entertainment_city":"Entertainment city","sponsor":"Sponsor","read_more":"Read more","hide_info":"Hide info","app_download_notice":"Download and install and register under the same network environment, do not switch networks. If unable to download normally, please use mobile browser to open.","delete_old_app":"Please uninstall the old version of the app before reinstalling.","ios_need_safari":"IOS users please use Safari browser to open the page and download.","installation_guide":"Installation Guide","device_apple":"Apple","device_android":"Android","licenses":"Licenses","game_vendors":"Game Vendors","manual_rebate":"Manual rebate","in_house":"In-house","bind_bank_card":"Bank Account Number","recommend":"Recommend","question_type":"Question type","select_question_type":"Select question type","content_description":"Content description","content_between":"The content is between {0} and {1} words","deposit_issues":"Deposit problem","withdraw_issues":"Withdrawal issues","game_issues":"Game problem","service_issues":"Customer Service Question","apply_issues":"Application question","other_issues":"Other problems","in_enter":"Enter","pages":"Pages","in_maintenance":"Maintenance","please_enter":"Please enter","reset_password":"Reset Password","change_pass_success":"You have successfully changed your password.","next_step":"Next step","in_favorite":"Favorites","latest_winners":"Latest Winners","supported_bank":"Supported Bank","remaining_time":"Remaining Time","lobby":"Lobby","service_advantage":"Service Advantage","caveat":"Warning","input_required":"Required","feedback_complaints":"Complaints","product":"Product","licensed_by":"Licensed by","in_game_center":"Game center","set_new_pass":"Set New Password","hd_language":"Language","in_back_home":"Return home","today_hide":"Don\'t remind me again today","close_all":"Close All","share":"Share","in_all_games":"All games","new_games":"New Games","in_play":"Play","just_won_in":"Just won in {0}","classify_baccarat":"Baccarat","classify_sicbo":"Sicbo","classify_roulette":"Roulette","classify_dragon_tiger":"Dragon Tiger","classify_blackjack":"Blackjack","classify_live":"Live","classify_ahjong":"Ahjong","classify_3card_poker":"3-Card-Poker","classify_wenzhou":"Wenzhou","classify_sedie":"Se Die","classify_fantan":"Fan Tan","classify_niuniu":"NiuNiu","classify_yuxiaxie":"Fish Prawn Crab","classify_zjh":"ZJH","back":"Back","other":"Other","all_category":"All Category","choose_category":"Choose a category","live_support":"Live Support","official_channel":"Official Channel","navigation":"Navigation","beginner_guide":"Beginner Guide","winning_ranking":"Winner list","biggest_wins":"Biggest wins","end_time":"End time","about_us":"About Us","one_click_login":"One-Click login","expiretime_time":"Valid time","news":"News","theme":"Theme","theme_dark":"Dark","theme_light":"Light","sports_live":"Sports Live","cs_service":"Services","top_vendors":"Top Vendors","select_vendors":"Select Vendors","best_promotions":"Best Promotions","rebate":"Rebate","recent":"Recent","credit_report":"Credit Report","vip_bonus":"VIP Bonus","refer_earn":"Refer Earn","bonus_bets":"Bonus Bets","security_center":"Security Center","days":"Days","hours":"Hours","minutes":"Minutes","single_cash_back":"Cash Back","earn":"Earn","providers":"Providers","search_results":"Search Results","game_room":"Venue","cards":"Cards","server":"Server","enter_address":"Please fill in your address","enter_nationality":"Please fill in your nationality","select_occupation":"Occupation","select_sourceOfIncome":"Source of Income","notice":"Notice","fish_hunter":"Fish Hunter","exchange_goods":"Point Reward","select_region":"Select Your Region","n_digit_number":"{0} digit phone number","minigames":"Mini Games","profit":"Profit","in_reg_type_title":"Username/Phone Number","LINE":"LINE","bonus_code":"Bonus Code","filter":"Filter","welcome":"Welcome","logout":"Logout","vendor":"Vendor","products":"Products","on":"On","off":"Off","all_promos":"All Promotions","invite_earn":"Invite & Earn","get_otp":"Get OTP","redeem_code":"Redeem Code","continue_with_google":"Sign in with Google+","continue_with_facebook":"Sign in with Facebook+","profit_loss":"Profit & Loss","sign_up":"Sign Up","sign_in":"Sign In","fill_in_mobile":"Fill in correct mobile number","load_more":"Load more","jackpot_games":"Jackpot Games","menu":"Menu","information":"Information","links":"Links","cricket":"Cricket","featured_games":"Featured Games","crash":"Crash","arcade":"Arcade","table":"Table","fishing":"Fishing","slot":"Slot","rescue_fund":"Rescue fund","live_chat_cs":"Live Chat","details":"Details","community":"Community"}')
        },
        53105: function(e) {
            "use strict";
            e.exports = JSON.parse('{"reg_pattern_0":"कृपया दर्ज करें (min) - (max) वर्ण","reg_pattern_1":"कृपया (min) - (max) वर्ण दर्ज करें, पहला वर्ण एक अक्षर होना चाहिए, इसके बाद अक्षरों और संख्याओं का एक संयोजन होना चाहिए।","reg_pattern_2":"कृपया (min) - (max) अक्षर, चीनी चरित्र (कांजी) और संख्याओं का संयोजन दर्ज करें।","reg_pattern_3":"कृपया मेलबॉक्स के फॉर्मेट में (min) - (max) अक्षर दर्ज करें","reg_pattern_4":"कृपया (min) - (max) अल्फ़ान्यूमेरिक वर्ण दर्ज करें। गैर-केस-संवेदी। (चीनी वर्णो की अनुमति नहीं है)","reg_pattern_5":"कृपया (min) - (max) अक्षर दर्ज करें, अक्षरों और संख्याओं का एक संयोजन होना चाहिए","reg_pattern_6":"कृपया (min) - (max) अक्षर दर्ज करें, केवल संख्याएँ अनुमत","reg_pattern_7":"कृपया (min) - (max) वर्ण, विशेष वर्ण के बिना अल्फ़ान्यूमेरिक का संयोजन और कम से कम एक अपरकेस अक्षर दर्ज करें।","reg_pattern_8":"कृपया (min) - (max) वर्ण, केवल अंग्रेजी वर्णमाला और रिक्ति","reg_pattern_9":"कृपया दर्ज करें (min) - (max) वर्ण रिक्ति की अनुमति नहीं है","reg_pattern_10":"कृपया (min) - (max) वर्ण, चीनी वर्ण और विराम चिह्न दर्ज करें","reg_pattern_11":"कृपया सही तारीख प्रारूप (yyyy-MM-dd) दर्ज करें","reg_pattern_12":"कृपया दर्ज करें (min) - (max) वर्ण, अक्षरों और एक रिक्ति का संयोजन होना चाहिए।","reg_pattern_13":"कृपया सही तारीख प्रारूप (MM-dd-yyyy) दर्ज करें","reg_pattern_14":"कृपया केवल अक्षरों और संख्याओं से मिलकर बने (min) - (max) वर्णों को दर्ज करें।","reg_pattern_15":"कृपया (min) - (max) वर्ण, केवल कोरियाई वर्ण दर्ज करें।","reg_pattern_16":"कृपया (min) - (max) अक्षर दर्ज करें, केवल थाई","reg_pattern_17":"कृपया (min) - (max) वर्ण, थाई या अंग्रेजी वर्णमाला और केवल रिक्त स्थान दर्ज करें","reg_pattern_18":"कृपया (min) - (max) अक्षर दर्ज करें, बड़े अक्षर और स्पेस की अनुमति है, और कम से कम एक अंग्रेजी अक्षर होना चाहिए","reg_pattern_19":"कृपया (min) - (max) अक्षर दर्ज करें, केवल अक्षर, संख्या और प्रतीक अनुमति हैं","error_password":"लॉगिन पासवर्ड एक (min) - (max) अंक संख्या या अक्षर है","enter_verification_code":"कृपया वेरिफिकेशन कोड दर्ज करें","error_phone_number_limit":"कृपया एक मान्य फोन नंबर दर्ज करें","inconsistent_twice":"दो बार असंगत इनपुट","in_payeeName_error":"वास्तविक नाम प्रारूप गलत है","in_mobileNum_error":"फोन संख्या फॉर्मेट गलत है","invitation_code_error":"अमान्य आमंत्रण कोड","in_user_register":"उपयोगकर्ता नाम","in_mobile_register":"फ़ोन नंबर","hd_login_button":"लॉगइन","hd_sign_button":"पंजीकरण करवाना","hd_free_demo":"परीक्षण","in_increase_username":"उपयोगकर्ता नाम","in_increase_password":"पासवर्ड","new_password":"नया पासवर्ड","hd_home":"घर","hd_live_casino":"लाइव कैसीनो","hd_slots_games":"स्लॉट खेल","hd_sports_betting":"खेल में सट्टेबाजी","hd_esport":"ई-खेल","hd_members":"सदस्यों","hd_member_center":"सदस्य केंद्र","hd_agent":"एजेंट","hd_pvp":"बोर्ड खेल","hd_event":"घटना","hd_deposit_button":"जमा","hd_withdraw_button":"निकालना","ft_user_agreement":"उपयोगकर्ता का समझौता","member_info":"सदस्य जानकारी","shee":"शुरू","in_live_device":"मोबाइल एप्लिकेशन, एंड्रॉइड बाइंड सपोर्ट","in_more_cancel":"रद्द करना","in_please_wait":"कृपया प्रतीक्षा करें","in_popup_prompt":"पुष्टीकरण","in_popup_agree":"सहमत","in_display_all":"सभी प्रदर्शित करें","in_recent_game":"हालिया गेम","in_my_collection":"मेरा संग्रह","in_slot_search":"स्लॉट मशीन खेल खोज","in_type_all":"सभी","in_game_category":"खेल श्रेणी","in_slot_machine":"स्लॉट मशीन","in_scratch_music":"स्क्रैच कार्ड","in_video_poker":"वीडियो पोकर","in_table_games":"बोर्ड गेम","in_arcade_games":"आर्केड खेल","in_accumulative_prize":"संचित भव्य पुरस्कार","in_bingo":"बिंगो","in_minimum_bet":"न्यूनतम शर्त","in_number_lines":"लाइनों की संख्या","in_yuan_more":"1 युआन या अधिक","in_lines_more":"25 लाइनें या अधिक","in_game_fishing":"मछली पकड़ने","in_rng_electronic":"स्लॉट खेल","in_all_Comprehensive":"समेकित","in_lott_ticket":"लॉटरी","in_lott_game":"लॉटरी के खेल","in_pvp_game":"पोकर खेल","in_fish_game":"फिशिंग का खेल","in_cockfight_nav":"मुर्गा लड़ाई","in_elott_Handicap":"ई-लॉटरी","in_real_person":"लाइव कैसीनो","in_physical_education":"खेल-कूद","in_chess":"बोर्ड खेल","in_no_data":"कोई डेटा नहीं","in_logged_login":"आप लॉग इन नहीं हैं, कृपया लॉग इन करें","in_immediate_game":"अब खेलो","in_free_trial":"नि: शुल्क परीक्षण","in_first_password":"कृपया अपना पासवर्ड बदलें (पहला लॉगिन या समाप्त पासवर्ड)","in_live_video":"लाइव कैसीनो","in_activity_center":"गतिविधि केंद्र","in_sure_logout":"क्या आप वाकई लॉगआउट करना चाहते हैं?","in_customer_service":"ग्राहक सेवा","in_hot_games":"गर्म खेल","in_save_game":"इस खेल को सहेजें","in_name":"नाम","in_app_download":"एपीपी डाउनलोड करें","in_forget_password":"पासवर्ड भूल गए","in_register_now":"अभी पंजीकरण करें","in_remember_password":"याद करना","in_been_out":"पासवर्ड भेज दिया गया है. कृपया इसकी जांच करें।","in_retrieve_password":"अपना पासवर्ड पुनर्प्राप्त करें","in_registered_successfully":"सफलतापूर्वक पंजीकृत, लॉगिन के लिए तैयार","in_agree_accept":"मैं 18 साल का हूं और स्वीकार करने के लिए सहमत हूं।","in_terms_use":"उपयोग की शर्तें","in_term_use":"उपयोग की शर्तें","in_incorrect_password":"कृपया उपयोगकर्ता नाम और पासवर्ड दर्ज करें","in_account_number":"खाता संख्या","in_increase_submit":"क्या आपको यकीन है","in_increase_title":"उपाधि","in_increase_announcement":"घोषणा","in_increase_date":"खजूर","in_i_agree":"मैं सहमत हूँ","in_first_security":"पहले लॉगिन पासवर्ड की समय सीमा समाप्त हो गई है समय-समय पर पासवर्ड बदलने से खाता सुरक्षा में मदद मिलती है","in_increase_close":"बंद करना","in_sign_out":"साइन आउट करें","in_personal_center":"व्यक्तिगत केंद्र","in_my_account":"मेरा खाता","in_my_wallet":"मेरा बटुआ","in_increase_deposit":"जमा","in_increase_withdrawal":"प्रत्याहरण","in_betting_record":"सट्टेबाजी का रिकॉर्ड","in_account_record":"खाता रिकॉर्ड","in_personal_loss":"लाभ और हानि","in_bonus_details":"बोनस विवरण","in_reward_center":"पुरस्कार केंद्र","in_agency_announcement":"घोषणा","in_increase_overview":"सिंहावलोकन","in_increase_account":"खाता","in_team_management":"टीम प्रबंधन","in_team_betting":"टीम सट्टेबाजी","in_team_transaction":"टीम का लेन-देन","in_user_loss":"उपयोगकर्ता लाभ और हानि","in_my_income":"मेरी आय","in_account_details":"लेन-देन का विवरण","in_red_envelope":"लाल लिफाफा","in_please_information":"कृपया सही उपयोगकर्ता जानकारी दर्ज करें","in_sorry_in":"क्षमा करें, आप अभी तक लॉग इन नहीं हैं, कृपया लॉग इन करें।","in_please_account":"कृपया उपयोगकर्ता खाते में लॉगिन करें","in_account_incorrect":"खाता स्वरूप गलत है","in_password_incorrect":"पासवर्ड स्वरूप गलत है","in_email_incorrect":"ई-मेल स्वरूप ग़लत है","in_confirmation_correct":"कन्फ़र्मेशन पासवर्ड सही नहीं है.","in_vwrite_code":"कृपया कैप्चा दर्ज करें","in_increase_affiliateCode":"निमंत्रण कोड","form_input_optional":"उपलब्ध न होने पर वैकल्पिक।","in_increase_captcha":"कैप्चा","in_increase_email":"ईमेल","in_increase_mobileNum":"फ़ोन नंबर","in_increase_mobile_no":"फ़ोन नंबर","in_increase_mobile_placeholder":"फ़ोन नंबर","in_increase_nickname":"उपनाम","in_increase_payeeName":"असली नाम","in_increase_fullname":"पूरा नाम","in_increase_paymentPassword":"लेनदेन पासवर्ड","in_increase_qqNum":"QQ","in_increase_whatsapp":"WhatsApp","in_increase_facebook":"Facebook","in_increase_telegram":"Telegram","in_increase_idNumber":"आईडी नंबर","in_increase_line":"Line ID","in_increase_recommenderId":"संदर्भ","in_increase_verifyPwd":"पासवर्ड की पुष्टि करें","in_increase_emailInfo":"मान्य मेल पता","in_increase_digit":"अंक","in_increase_d0":null,"in_increase_d1":"पहला अक्षर अक्षरों और संख्याओं का एक संयोजन होना चाहिए","in_increase_d2":"चीनी और अंग्रेजी अक्षर","in_increase_d3":"मान्य ई-मेल","in_increase_d4":"अक्षरों और संख्याओं से बना होना चाहिए, कोई विशेष वर्ण नहीं होना चाहिए","in_increase_d5":"अक्षरों और संख्याओं का संयोजन होना आवश्यक है","in_increase_d6":"केवल संख्याओं की अनुमति","in_increase_d7":"कृपया अक्षरों, संख्याओं और कम से कम एक ऊपरी वर्ण का संयोजन इनपुट करें","in_increase_d8":"केवल अंग्रेजी वर्णमाला और रिक्ति","in_increase_d9":"कोई भी चरित्र लेकिन अंतराल की अनुमति नहीं है","in_increase_d10":", चीनी वर्ण और विराम चिह्न दर्ज करें","in_forgot_password":"भूल गया","in_please_password":"कृपया वर्तमान पासवर्ड की पुष्टि करें","in_customer_services":"ग्राहक सेवा","in_username_exist":"उपयोगकर्ता नाम/ईमेल मौजूद नहीं है","in_increase_mailbox":"मेलबॉक्स","in_please_username":"कृपया उपयोगकर्ता नाम दर्ज करें","in_please_address":"कृपया ईमेल पता दर्ज करें","in_please_ways":"कृपया निम्न तरीकों से अपना पासवर्ड पुनर्प्राप्त करें","in_first_login":"सबसे पहले लॉगिन","in_password_expired":"पासवर्ड की समय सीमा समाप्त हो गई है","in_changing_security":"समय-समय पर पासवर्ड बदलने से खाते की सुरक्षा में मदद मिलती है","in_please_game":"कृपया खेल का नाम दर्ज करें","in_increase_game":"खेल","in_network_again":"नेटवर्क लिंक असामान्य है, कृपया पुन: प्रयास करें","in_help_center":"सहायता केंद्र","in_transfer_upline":"अपलाइन में स्थानांतरण","in_user_agreement":"उपयोगकर्ता अनुबंध","in_platform_information":"आंतरिक संदेश","in_change_expired":"पासवर्ड बदलें (प्रथम लॉगिन या पासवर्ड की समय सीमा समाप्त हो गई)","br_enter_plname":"कृपया नाम दर्ज करें","br_ennum_total":"कुल","in_increase_wechat":"Wechat","in_stay_tuned":"जल्द आ रहा है","in_bet":"सट्टेबाजी","refresh_balance":"संतुलन ताज़ा करें","br_etkgini_lkxqulo":"APP","br_lhhvfwm_ipcvew":"1. क्यूआर कोड स्कैन करें, डाउनलोड करने के लिए डाउनलोड पृष्ठ दर्ज करें","br_vcspb_suiiyfy":"2. एप्लिकेशन इंस्टॉल करने की अनुमति दें। आईओएस और एंड्रॉइड में इंस्टॉल करने का तरीका देखने के लिए यहां क्लिक करें।","br_froqigg_jljxdudy":"3. ऐप खोलें, लॉग इन करें या गेम का आनंद लेने के लिए अपना खाता पंजीकृत करें","br_omolq_sapygzxc":"यदि आप QR कोड स्कैन करने में विफल रहे हैं, तो आप अपने ब्राउज़र पर हमारी वेबसाइट भी देख सकते हैं।","br_njrhpowu_aysutep":"iOS","br_rcigcm_nasclv":"डाउनलोड करने के लिए क्लिक करें","br_lcwqhde_kqmrypu":"Android","br_wmezzon_sifhyh":"मोबाइल वेब","br_dugltyx_tocfgy":"पीसी और मोबाइल दोनों के लिए एक खाता एक्सेस","br_hsvgpexk_lpparv":"व्यक्तिगत सॉफ़्टवेयर को अलविदा कहें","br_xlypyv_lblhmihk":"आईओएस या एंड्रॉइड डिवाइस पर खेलें","app_top_row_1":"आईओएस और एंड्रॉइड का समर्थन सभी मोबाइल डिवाइस, मोबाइल गेम लॉटरी, स्लॉट, मछली पकड़ने और लाइव कैसीनो उत्पादों का समर्थन करते हैं","app_top_row_2":"लगभग 10,000 स्लॉट गेम और सबसे पूर्ण लॉटरी गेम की एक समृद्ध विविधता, आपको एक अद्भुत और रोमांचक गेम अनुभव प्रदान करती है।","app_mid_row_3":"आईओएस संस्करण और Android संस्करण का समर्थन करें","app_top_row_6":"IOS डाउनलोड ट्यूटोरियल","click_to_down":"डाउनलोड करने के लिए क्लिक करें","click_to_check":"देखने के लिए क्लिक करें","br_knogskjv_uilyveu":"हमारे मंच के माध्यम से मज़ा है","br_tuikje_lbeuhf":"विजेताओं की सूची","br_kywqxq_rxrszsoq":"पुरस्कार राशि","br_mbgluwh_ikzblrn":"मार्गदर्शक","br_tkncoiz_glogk":"अनुप्रयोग एजेंट","br_pkbyeshj_jkfjiud":"जमा","br_lrugixg_rnzkh":"प्रत्याहरण","br_uxtyro_zufquirt":"लाइव कैसीनो","br_ybdehrc_eeknku":"शुरू करने में आसान","br_pesmasp_euafdm":"पैसे कमाने के लिए हमसे जुड़ें","br_lhwcetf_lvzpd":"आसान और सुरक्षित","br_weebrix_ajwpdpfp":"त्वरित और आसान","br_adpcs_qxxdmb":"खेल सट्टेबाजी","br_show_license":"लाइसेंस दिखाएँ","br_mobile_betting":"मोबाइल सट्टेबाजी","skype":"Skype","wechat":"Wechat","in_display_swiper":"हिंडोला दिखाएँ","in_rng_pool":"कुल बर्तन","in_other_lott":"अन्य लॉटरी","br_lott_new":"नया","br_lott_hot":"गरम","in_user_login":"उपयोगकर्ता नाम/मोबाइल","in_mobile_login":"एसएमएस","in_register_user":"उपयोगकर्ता नाम","in_register_mobile":"मोबाइल","in_increase_verificationCode":"एसएमएस","in_mgsCode_countTime":"s और पुन: प्रयास करें","in_regInfo_reset":"रीसेट","in_get_verificationCode":"कोड प्राप्त करें","in_need_true_account":"कृपया पहले एक खाता पंजीकृत करें","br_index_scan":"स्कैन करें","br_index_dream":"अपने मनोरंजन का आनंद लें","br_index_betting":"किसी भी समय और कहीं भी आनंद लें!","br_index_mobile":"मोबाइल BET","br_right_quick":"सहारा","in_qq_customer":"QQ सेवा","in_speed_check":"लाइन डिटेक्शन","in_system_notice":"अधिसूचना","in_recharge_center":"रिचार्ज निकासी","TOP":"शीर्ष","in_elott_game":"लॉटरी के खेल","go_promo":"जाएँ","in_account_info":"खाता देखें","congrats":"इनाम मिलने पर बधाई","get":"मिलना","join":"इनाम","egg_ticket":"गोल्डन अंडे का टिकट","in_increase_zalo":"Zalo संख्या","in_increase_zalo_desc":"कृपया अपना Zalo खाता दर्ज करें, 131K तक का इनाम प्राप्त करें","in_registered_success":"पंजीकरण सफल","in_registered_popuptitle1_1":"जोड़ना","in_registered_popuptitle1":"Zalo संख्या","in_registered_popuptitle1_2":"बोनस को भुनाने के लिए","in_registered_popuptitle2":"{0} के साथ अपनी भाग्यशाली यात्रा शुरू करें!","in_registered_topromtion":"दावा","in_new_register":"पंजीकरण पूरा करने के तुरंत बाद नए सदस्य बोनस {0} प्राप्त कर सकते हैं।","br_kpsciac_sxxde":"तराजू","in_daily_hdtmkj":"दैनिक वेतन","in_hourly_salary":"प्रति घंटा वेतन","in_bonus_bmwmuf":"लाभांश","click_to_get":"दावा","message":"संदेश","red_envelope_ticket":"लाल लिफाफा टिकट","wheel_title":"प्राइज व्हील टिकट","bonus":"बोनस","points":"अंक","get_reward":"दावा","go":"यहाँ जाओ","info_new_mail":"नया संदेश","info_deposit_arrival":"हाय, {0} पर आपका {1} जमा अनुरोध जमा कर दिया गया है।","info_withdraw_approve":"हाय, {0} पर आपके {1} वापसी अनुरोध को मंजूरी दे दी गई है।","info_withdraw_reject":"हाय, {0} पर आपके {1} वापसी अनुरोध को अस्वीकार कर दिया गया है।","info_deposit_failed":"हाय, {0} पर आपका {1} जमा अनुरोध विफल हो गया है।","br_uapsgaua_gvvbhnpo":"वर्तमान बिंदु","br_kbhigp_juwjor":"इतिहास को छुड़ाएं","br_tnfukuis_rjjyqa":"अंक विवरण","br_vtodu_hdjsnica":"अंक नियम","br_olbqegi_dlbmmgr":"अंक","br_ruwelb_hnlmfcec":"राशि","br_dbglvpl_fzdyyffh":"अंक","br_ivyvhbd_plqdke":"माल का विवरण","br_gjqnvvy_iryxjct":"मुक्त करना","br_vnliis_uixdju":"अधिक जाँच करें","br_zpxnzwtl_ahrmtzvz":"ढूँढ","br_fsfkqe_mocopxg":"लेन-देन संदर्भ संख्या","br_zskguild_rlcqqk":"समय लागू करें","br_vkbkpu_leedsy":"प्रकार","br_lxdltp_elyuwvbc":"नाम","br_idllfy_mhuzjxfh":"परिमाण","br_xccevwn_fjuvqbw":"अंक की आवश्यकता","br_etgwkoc_fqifvim":"राशि की आवश्यकता","br_iaprpir_sqefjc":"राज्य","br_ltxfqh_ucybifg":"समय","br_ndxjxg_tuflsp":"चर बिंदु","br_okfhmh_fmaarbt":"अंक संतुलन","br_vcjchv_ffquwrqp":"टिप्पणी","br_xcrvghw_neykrj":"इकाइयों","br_grcoftcc_jtjpbu":"अंक अनुपात","br_urflfyt_rmytyz":"रिडीम राशि","br_tzzdxk_yxrtg":"अंक अर्जित करते हैं","br_veeoa_hbzkb":"सबमिट","br_svceofz_wcvdg":"इतिहास को छुड़ाएं","br_jyyja_wdywrci":"रिडीम प्रमोशन","br_qjljs_uchsbw":"रहना","br_vqosuc_pxgvcw":"उपहार","br_mgkvcm_bovyxv":"प्रक्रिया में","br_qfdmfmp_cfhotd":"खारिज कर दिया","br_bembw_cavbkru":"अनुमोदित","br_hoohu_pxbocnca":"मुक्त करना","br_sqmypaur_twtjtu":"कृपया सही जानकारी दर्ज करें","br_vwxdjflb_sfyljuh":"रिडीम कम्प्लीट","br_kdelhzx_addyo":"खाता","br_ektqjtn_dxdglces":"शर्तों को भुनाना","br_fdlerbkw_puifuy":"मात्रा को भुनाएं","br_xxuboj_piyam":"उपलब्ध मात्रा","br_kfqhgbf_ayytrfv":"सशुल्क खाता","br_gifihpe_qfobsp":"मुख्य बटुआ","br_wpubkp_hqwpdbn":"भुगतान की गई राशि","br_chtyuwwz_bbkoi":"पता प्राप्त करना","br_address_bbkoi":"पता","br_yuan_monkey":"युआन","br_exchange_quantity":"भुनाई गई मात्रा","br_enter_moneypwd":"कृपया पासवर्ड वापस लें दर्ज करें","br_enter_getaddree":"कृपया प्राप्त करने का पता दर्ज करें","br_enter_cphone":"कृपया मोबाइल नंबर दर्ज करें","br_enright_cphone":"कृपया सही मोबाइल नंबर दर्ज करें","in_increase_instructionsOne":"स्कोर एक सामान्य मुद्रा है जो स्कोर स्टोर में है, आप गेम चिप्स, ऑफ़र्स, लाइफ सेवाएं, वस्त्रादि को खरीदने के लिए स्कोर का उपयोग कर सकते हैं।","in_increase_instructionsTwo":"सदस्य स्कोर इकाइयों को जमा करके प्राप्त कर सकते हैं, विस्तृत अनुपात के लिए कृपया【स्कोर समानांतर सारणी】देखें","br_exchange_points":"नकद द्वारा अंक प्राप्त करें","br_convertible_proportion":"विनिमय अनुपात","br_current_balance":"उपलब्ध शेष राशि","points_type_live":"लाइव कैसीनो","points_type_lott":"लॉटरी टिकट","points_type_pvp":"PVP खेल","points_type_rng":"स्लॉट खेल","points_type_sports":"खेल सट्टेबाजी","points_type_redeem":"मुक्त करना","points_type_deposit":"जमा","points_table":"विनिमय दर तालिका","br_mkezget_mcgovs":"लाभांश अनुबंध","br_jsargd_pwwcto":"अवधि वैध शर्त","br_vajhsvh_fxdpos":"अवधि P&L","br_sjdfed_bwefu":"सक्रिय सदस्य","br_qpvusa_fvosl":"दर","periodic_bets":"आवधिक/वैध शर्त","br_oighuvbk_dgrwie":"स्वीकार करना","br_ioddlq_swsrf":"समाप्त","br_oyzao_gubukr":"अस्वीकार करना","br_frttrr_qkxir":"यह अनुबंध आपके अपलाइन / एजेंट द्वारा पेश किया जाता है। कृपया पॉलिसी को ध्यान से पढ़ें और समझें, यदि आप इस नीति से सहमत हैं, तो \'स्वीकार करें\' पर क्लिक करें अन्यथा इस प्रस्ताव को \'अस्वीकार\' करें।","br_vtarzkrq_mfrflk":"1. अनुबंध समझौता मंच के भीतर लाभांश स्थापित करने के लिए सहमत उच्च और निचले स्तर हैं।","br_fcqouvf_gdbmvdm":"2. ऑपरेटर अपने विवेकाधिकार से, किसी भी कारण से किसी भी समय इस वेबसाइट या इन उपयोग की शर्तों के किसी भी हिस्से को पूरी तरह से या आंशिक रूप से बदलने, संशोधित करने, जोड़ने या हटाने का अधिकार सुरक्षित रखता है।","br_yeffxs_wepurpso":"3. प्लेटफ़ॉर्म के सभी नियम और शर्तें, प्लेटफ़ॉर्म अंतिम व्याख्या सुरक्षित रखता है!","br_ihdkcab_hgsdicgf":"टीम सट्टेबाजी","br_pyogvw_bifuxqm":"सक्रिय सदस्य","br_idqho_exmbdevj":"दर","br_gfhdge_lbdxbmp":"दैनिक शर्त राशि","br_gjsfjcqo_mtkkbpl":"दरों","br_varjv_doqbjqbi":"राशि","br_fcqaon_nloihn":"यह अनुबंध आपके अपलाइन/एजेंट द्वारा प्रस्तावित है। कृपया पॉलिसी को ध्यान से पढ़ें और समझें, यदि आप इस पॉलिसी से सहमत हैं, तो \'स्वीकार करें\' अन्यथा इस प्रस्ताव को \'अस्वीकार करें\' पर क्लिक करें।","br_fgtjfutl_wvsderq":"1. दैनिक वेतन सांख्यिकी नियम बिक्री टीम से एक दिन पहले, दैनिक वेतन की गणना नियमों के अनुसार की जाती है, दैनिक वेतन अगले दिन से एक दिन पहले वितरित किया जाएगा।","br_ddottzq_xdhqkja":"2. सक्रिय अनुपालन की कम बिक्री की कमी, वास्तविक पेरोल गतिविधि होगी।","br_gclmyni_dlaat":"3. ऑपरेटर अपने विवेक से, किसी भी समय, किसी भी कारण से, इस वेबसाइट या उपयोग की शर्तों के किसी भी हिस्से को पूर्ण या आंशिक रूप से बदलने, संशोधित करने, जोड़ने या हटाने का अधिकार सुरक्षित रखता है।","br_qgqbbjo_oillv":"टीम सट्टेबाजी","br_kmojqy_qqxdpeg":"दर","br_lpqmrfrg_mvacmxf":"शर्त राशि प्रति घंटे","br_rfcndw_mijltrk":"एजेंट के वेतन के हितों की रक्षा के लिए जब प्लेटफ़ॉर्म ने समय-वित्त पोषित अनुबंध समझौता लॉन्च किया, तो एजेंसी समझौते ने निचले प्लेटफ़ॉर्म पर स्वैच्छिक सिद्धांतों पर हस्ताक्षर किए, और प्लेटफ़ॉर्म की देखरेख को स्वीकार किया।","br_hvpoynj_ydeqcjb":"1. ऑपरेटर अपने विवेक से, किसी भी समय, किसी भी कारण से, इस वेबसाइट या उपयोग की शर्तों के किसी भी हिस्से को पूर्ण या आंशिक रूप से बदलने, संशोधित करने, जोड़ने या हटाने का अधिकार सुरक्षित रखता है।","label_cancel":"रद्द करना","higher_rate":"तारीख़ चुनें","chat_room":"गपशप करने का कमरा","point_date_placeholder":"दिनांक सीमा चुनें","ponit_date_day1":"र","ponit_date_day2":"सो","ponit_date_day3":"मं","ponit_date_day4":"बु","ponit_date_day5":"गु","ponit_date_day6":"शु","ponit_date_day7":"श","ponit_date_month1":"जनवरी","ponit_date_month2":"फरवरी","ponit_date_month3":"मार्च","ponit_date_month4":"अप्रैल","ponit_date_month5":"मई","ponit_date_month6":"जून","ponit_date_month7":"जुलाई","ponit_date_month8":"अगस्त","ponit_date_month9":"सितंबर","ponit_date_month10":"अक्टूबर","ponit_date_month11":"नवंबर","ponit_date_month12":"दिसंबर","ponit_date_picker1":"अगले 7 दिन","ponit_date_picker2":"अगले 30 दिन","ponit_date_picker3":"पिछले 7 दिन","ponit_date_picker4":"पिछले 30 दिन","more_game":"अधिक खेल","symbol_required":"* से चिह्नित आइटम आवश्यक हैं","game_classify":"खेल वर्गीकृत करें","min_one":"1 से अधिक","line_id":"Line ID","live_game_up":"लाइव कैसीनो","slots_game_up":"स्लॉट","download_up":"डाउनलोड करना","help_up":"मदद","sports_up":"खेल","fish_up":"मछली","lottery_up":"लॉटरी के खेल","activity_up":"पदोन्नति","ios_get_out":"हमारा लाओ","ios_app":"IOS APP","android_app":"Android APP","load_step":"कदम","ios_install":"IOS-APP स्थापना चरण","lite_install":"LITE-APP स्थापना चरण","ios_load_step1":"कोड को स्कैन करें, और इंस्टॉल या डाउनलोड बटन पर क्लिक करें","ios_load_step2":"यदि इंस्टॉल किया गया एपीपी शुरू होने में विफल रहता है, तो यह पॉप अप संदेश दिखाई देता है, कृपया चरण 3 पर आगे बढ़ें","ios_load_step3":"सेटिंग्स - सामान्य पर जाएँ","ios_load_step4":"डिवाइस प्रबंधन टैप करें","ios_load_step5":"डाउनलोड की गई फ़ाइल का चयन करें","ios_load_step6":"ऐप फ़ाइल पर टैप करें और उस पर भरोसा करें","ios_load_step7":"ट्रस्ट बटन पर टैप करें और अपने फोन में ऐप ढूंढें","lite_load_step1":"डाउनलोड पर टैप करें - \'\'आईओएस लाइट-ऐप इंस्टॉल करें\'\'","lite_load_step2":"फिर से डाउनलोड करें - अनुमति दें पर टैप करें","lite_load_step3":"सेटिंग्स - सामान्य पर जाएँ","lite_load_step4":"प्रोफ़ाइल टैप करें","lite_load_step5":"डाउनलोड की गई प्रोफ़ाइल का चयन करें","lite_load_step6":"पेज के ऊपरी दाएं कोने पर इंस्टॉल पर टैप करें","not_empty":"इनपुट खाली नहीं हो सकता","notification":"अधिसूचना","partner":"साथी","online_player":"ऑनलाइन प्लेयर","game_maintenance":"खेल का रखरखाव","viewing":"देखना","add_bookmark":"बुकमार्क जोड़ें","vip_level":"वीआईपी","compete_game":"ई-खेल","agreement":"मैं 18 वर्ष का हूं, मैंने नियमों और विनियमों को पढ़ा है और उनका सह-प्रशासन किया है。","casino":"सट्टेबाजी","register_success":"पंजीकरण सफल","winner_game":"खिलाड़ी","winner_name":"गेम का नाम","winner_money":"पुरस्कार","winner_title":"विजेताओं की सूची","list_winner":"विजेताओं की सूची","winner_info":"बधाई हो {0}, {1} जीता {2}","feedback_title":"प्रतिक्रिया और सुझाव","feedback_success":"प्रतिक्रिया प्राप्त होने के बाद, हम यथाशीघ्र आपसे संपर्क करेंगे।","feedback":"प्रतिक्रिया","feedback_placeholder":"कृपया सामग्री संपादित करने के बाद अपनी संपर्क जानकारी छोड़ें, धन्यवाद","please_feedback":"कृपया सामग्री दर्ज करें","viewing_now":"अभी देखें","see_more":"और देखें","referral_code":"रेफरल कोड","no_account":"अभी तक कोई खाता नहीं","in_already_account":"क्या आपके पास पहले से एक खाता मौजूद है","invite_friends":"रेफरल","promoTip_title":"APP पदोन्नति","promoTip_line1":"1. Apple/Android APP डाउनलोड और इंस्टॉल करें","promoTip_line2":"2. विभिन्न ऑफर तुरंत निःशुल्क प्राप्त करने के लिए एपीपी में लॉग इन करें","blog":"ब्लॉग","draw_time":"ड्रा समय","enter_new_password":"कृपया एक नया पासवर्ड दर्ज करें","reset_pass_sms":"एसएमएस रीसेट पासवर्ड","mission_activity":"मिशन","jackpot":"जैकपोट","more_button":"अन्य","join_us":"हमसे जुड़ें","btn_join":"जोड़ना","choose_a_hero":"एक नायक चुनें","choose_btn":"चुनना","popular_nav":"लोकप्रिय","play_jackpot_game":"जैकपॉट गेम खेलें","game_new":"नया","timeout_retry_please":"पृष्ठ को लोड होने में अधिक समय लगा, कृपया अपने नेटवर्क कनेक्टिविटी की जांच करें","scan_qr_code_or":"QR कोड स्कैन करें या","qr_code_desc_1":"मोबाइल प्लेटफॉर्म के अनुसार क्यूआर कोड को स्कैन करें","qr_code_desc_2":"पेज पर दिए गए निर्देशों का पालन करें, एपीपी इंस्टॉल करने के लिए \\"इंस्टॉल करें\\" या \\"डाउनलोड करें\\" पर क्लिक करें","qr_code_desc_3":"गेम का आनंद लेने के लिए ऐप खोलें, लॉग इन करें या खाता पंजीकृत करें यदि क्यूआर कोड स्कैन विफल हो जाता है, तो कृपया ऐप डाउनलोड करने के लिए वेबसाइट खोलने के लिए मोबाइल ब्राउज़र का उपयोग करें।","qr_code_desc_4":"आईओएस या एंड्रॉइड डिवाइस पर खेलें। एक खाते से पीसी और मोबाइल दोनों तक पहुंच","qr_code_desc_5":"हमारे प्लेटफ़ॉर्म के माध्यम से आनंद लें, व्यक्तिगत सॉफ़्टवेयर को अलविदा कहें","ios_lite_app":"हल्का APP","tutorial_here":"ट्यूटोरियल यहाँ","web_and_mobile_dw":"वेब और मोबाइल डाउनलोड","click_Install":"4. \\"इंस्टॉल करें\\" पर क्लिक करें","hd_sports_rolling":"रोलिंग","hd_sports_today":"आज","hd_promotion_claim":"प्रमोशन का दावा","login_exist_account":"मौजूदा में साइन इन करें","register_new":"नया रजिस्टर करें","code_sent":"वेरिफक्शन कोड भेजा","auth/invalid-phone-number":"मोबाइल फ़ोन नंबर का स्वरूप ग़लत है","auth/missing-phone-number":"कृपया अपना मोबाइल फ़ोन नंबर दर्ज करें","auth/too-many-requests":"सत्यापन कोड बहुत बार भेजना, कृपया बाद में पुन: प्रयास करें","auth/unknown":"कार्रवाई असाधारण है, कृपया पुन: प्रयास करें","auth/invalid-verification-code":"कृपया सही सत्यापन कोड दर्ज करें","auth/missing-verification-code":"कृपया सत्यापन कोड दर्ज करें","auth/captcha-check-failed":"कृपया सही छवि सत्यापन पास करें","auth/quota-exceeded":"कोटा पर्याप्त नहीं है, कृपया ग्राहक सेवा से संपर्क करें।","auth/operation-not-allowed":"फ़ंक्शन सक्षम नहीं है, कृपया ग्राहक सेवा से संपर्क करें।","auth/code-expired":"सत्यापन कोड की समय सीमा समाप्त हो गई है, कृपया पुन: भेजें.","auth/popup-closed-by-user":"लॉगिन विफलता। कृपया पुन: प्रयास करें.","member_no_enter":"गैर सदस्य खाता लॉगिन नहीं कर सकता","winning_time":"जीत का समय","label_content":"सामग्री","affiliate_service":"सहयोगी","your_ip":"आपका आईपी पता","hot_sport":"लोकप्रिय घटनाएँ","featured_matches":"उन्नत फ़िल्टरिंग","league":"गठबंधन","match":"घटनाओं","hot_time":"समय","sports_bet":"खेल सट्टेबाजी","more_history":"अधिक जानकारी","lead_board":"सूची","winners":"विजेता लीडरबोर्ड","send_sms":"वेरिफिकेशन कोड भेजें","sms_code":"SMS कोड","not_member":"अभी तक सदस्य नहीं हैं?","register_here":"यहां रजिस्टर करें","create_account":"खाता बनाएँ","zalo_redeem":"बोनस को भुनाने के लिए Zalo नंबर आईडी दर्ज करें","whatsapp_redeem":"बोनस को भुनाने के लिए व्हाट्सएप नंबर आईडी दर्ज करें","verify_first":"कृपया पहले सत्यापन पूरा करें","click_verify":"सत्यापित करने के लिए क्लिक करें","verify_success":"सफल वेरिफक्शन","click_retry_again":"कोशिश करने के लिए क्लिक करें","unknown_error":"सिस्टम त्रुटि","login_2fa_pass":"सत्यापन हो गया, लॉग इन करना","login_2fa_tips":"प्रिय ग्राहक, हमने देखा है कि आपने एक अपंजीकृत आईपी के साथ लॉगिन करने का प्रयास किया है, कृपया अतिरिक्त सत्यापन के साथ आगे बढ़ें","login_2fa_mobile":"मोबाइल नंबर","login_2fa_vcode":"कृपया 6 अंकों का वेरिफिकेशन कोड दर्ज करें","login_2fa_email":"ईमेल को बाइंड करें","login_2fa_payee":"बैंक खाते का नाम","login_2fa_payee_tips":"कृपया बैंक खाते का नाम दर्ज करें","google_verification":"Google सत्यापन","sms":"एसएमएस","email":"ईमेल","ga_ver_code":"गूगल (Google) वेरिफिकेशन","facebook_google_login":"You can use facebook or google to log in to the game","ask_your_agent":"कृपया अपने एजेंट से संपर्क करें","beginner_manual":"शुरुआती मैनुअल","rt_win_rate":"लाभदायक वेतन","rt_loss_rate":"घाटे में चल रही मजदूरी","rt_bet_amount":"एकल दांव","real_time_salary_menu":"रियल-टाइम पेरोल","real_time_salary_tip":"हमारे एजेंटों के हितों की रक्षा के लिए, मंच ने \\"वास्तविक समय वेतन समझौता\\" लॉन्च किया है। समझौते पर मंच पर सभी स्तरों पर एजेंटों द्वारा स्वैच्छिक आधार पर हस्ताक्षर किए जाते हैं और यह मंच द्वारा पर्यवेक्षण के अधीन है।","real_time_salary_rule1":"1. वेतन की गणना प्रत्येक लॉटरी गेम और प्रत्येक राउंड के लिए प्रत्येक खिलाड़ी के दांव के अनुपात पर आधारित होती है।","real_time_salary_rule2":"2. यदि खिलाड़ी किसी दौर में लाभदायक होते हैं, तो यह एक लाभ वेतन है; यदि खिलाड़ी हार रहे हैं, तो यह घाटे की मज़दूरी है।","real_time_salary_rule3":"3. वेतन का निपटान और वितरण हर 5 मिनट में किया जाता है।","real_time_salary_rule4":"4. प्लेटफ़ॉर्म के पास अंतिम व्याख्या और संशोधन अधिकार हैं।","con_fish":"फिक्सिंग","con_live":"लाइव कसीनो","con_sports":"खेल की किताब","con_pvp":"बोर्ड खेल","con_lott":"लॉटरी","con_elotto":"ई लॉटरी","con_rng":"स्लॉट खेल","con_deposit":"डिपाजिट","con_cons":"व्यापक","long_term":"लंबे समय तक","login_way":"या से जुड़ें","or":"या","payment_method":"भुगतान विधि","our_partners":"हमारे सहयोगियों","after_reset_pass":"पासवर्ड सफलतापूर्वक रीसेट हो गया, कृपया दोबारा लॉग इन करें","promo_types":"पदोन्नति के प्रकार","all_promo":"सब","other_promo":"अन्य","sport_promo":"खेल","live_promo":"लाइव कैसीनो","rng_promo":"स्लॉट","pvp_promo":"कार्ड का खेल","fish_promo":"मछली पकड़ना","lotto_promo":"लोट्टो","rebate_promo":"छूटना","point_promo":"मॉल को इंगित करता है","rank_promo":"रैंकिंग","deposit_promo":"जमा","download_promo":"APP","new_player_promo":"नौसिखिया ऑफ़र","gaming_promo":"गेम प्रोमोशंस","testimony":"ब्रांड कहानी","brand_endorsement":"ब्रांड एम्बेसडर","promo_newbie":"नौसिखिया ऑफ़र","promo_limited":"सीमित समय","promo_special":"खास ऑफर","promo_daily":"दैनिक","promo_rabate":"उच्च छूट","promo_vip":"वीआईपी","read_and_agree":"मैंने {0} को पढ़ लिया है और उससे सहमत हूं","terms":"शर्तें","privacy_policy":"गोपनीयता नीति","contract_request_haeder":"अनुबंध","contract_request_new":"नये अनुबंध का अनुरोध","contract_request_termination":"अनुबंध समाप्ति अनुरोध","contract_request_success":"आवेदन सफल रहा","sure_leave_game":"क्या आप खेल छोड़ने के लिए निश्चित हैं?","confirm_withdrawal_request":"भुगतान वितरित कर दिया गया है, कृपया क्लिक करें कि क्या यह प्राप्त हुआ है।","not_confirm_as_received":"यदि आप {0} मिनट के भीतर पुष्टि नहीं करते हैं, तो इसे प्राप्त माना जाएगा।","amount_received":"आगमन राशि","amount_remainder":"शेष राशि","not_received":"नही मिला","already_received":"प्राप्त","upload_proof_unreceived":"कृपया जाँच के लिए स्टाफ़ के न मिलने का प्रमाण अपलोड करें","all_received":"पूरा भुगतान कर दिया गया है","withdrawal_confirmation":"निकासी की पुष्टि","upload_image":"तस्वीर डालिये","upload":"डालना","forced_received":"आपका निकासी अनुरोध जबरन प्राप्त कर लिया गया है, और जमा राशि वापस नहीं की जाएगी।","scan_qrcode_below":"नीचे दिए गए QR कोड को स्कैन करें","activity_join":"जोड़ना","activity_claim":"दावा","activity_applying":"को लागू करने","activity_close":"बंद करना","activity_rejected":"अस्वीकार कर दिया","activity_issued":"जारी किए गए","activity_claimed":"दावा किया","activity_process":"प्रक्रिया","activity_signed":"में शामिल हो गए","activity_coming":"जल्द आ रहा है","activity_apply_info":"टिप्पणी","activity_apply_remark_limit1":"कृपया अपनी सामग्री को 140 अक्षरों तक सीमित रखें","activity_apply_remark_limit2":"स्वीकार्य पीएनजी या जेपीजी, अधिकतम 5एमबी प्रत्येक","activity_apply_remark_limit3":"छवि का अधिकतम आकार 5MB है","activity_apply_remark_limit4":"3 से अधिक छवियाँ अपलोड करना स्वीकार नहीं किया जा सकता","activity_choose_doc":"चुनना","activity_submit_apply":"भेजना","activity_apply_image":"फाइल अपलोड","activity_image_type":"केवल पीएनजी या जेपीजी ही स्वीकार्य है","username_or_mobile":"उपयोगकर्ता नाम / मोबाइल","return_balance":"विथड्रावल कॉलबैक","result_done_return_balance":"शेष राशि सफलतापूर्वक लौटी","contact_us":"हमसे संपर्क करें","point_tips_title1":"अंक अर्जित करें :","point_tips1":"प्लेटफ़ॉर्म गतिविधियों में भाग लेकर अंक अर्जित करें","point_tips_title2":"अंक उपयोग:","point_tips2":"पॉइंट्स मॉल में खेल मुद्रा या वस्तुओं को भुनाने के लिए पॉइंट्स का उपयोग किया जा सकता है","point_tips_title3":"अंक वैधता अवधि:","point_tips3":"समाप्ति नहीं","error_not_agent":"गैर-प्रतिनिधि लॉग इन नहीं कर सकते","joined_days":"{0} में {1} वें दिन शामिल हुए","CN":"中文","EN":"English","JA":"日本語","TH":"ไทย","VI":"Tiếng Việt","MY":"မြန်မာ","ES":"Español","HI":"हिन्दी","ID":"Bahasa Indonesia","KM":"ភាសាខ្មែរ","KO":"한국어","KR":"한국어","MS":"Bahasa Melayu","PT":"Português","TA":"தமிழ்","TW":"繁體中文","TY":"Tagalog","UR":"اُردُو‬","PT-BR":"Português brasileiro","TR":"Türkçe","BN":"বাংলা","AR":"عربي","FA":"فارسی‎","RU":"Русский","KK":"قازاق ٴتىلى‎","UZ":"اوزبیک تیلی","LO":"ພາສາລາວ","NE":"नेपाली","copy_success":"कॉपी सफल","link_mgmt":"रेफ़रल लिंक","period_D":"दैनिक","period_W":"साप्ताहिक","period_H":"अर्ध मासिक","period_M":"महीने के","blockip":"प्रवेश प्रतिबंधित","info_ip_block":"प्रिय ग्राहक: आपके क्षेत्र या उपयोग किए गए आईपी पते की सीमा के कारण, इस साइट को एक्सेस करने में कठिनाई हो सकती है, कृपया क्षमा करें","info_maintenance":"प्रिय मूल्यवान ग्राहक: हम वर्तमान में एक सिस्टम रखरखाव कर रहे हैं ताकि हम आपको बेहतर सेवा प्रदान कर सकें। हम इस असुविधा के लिए खेद प्रकट करते हैं।","maintenance":"सिस्टम रखरखाव","refresh":"रिफ्रेश","mobile_login":"मोबाइल लॉगिन","username_login":"उपयोगकर्ता नाम लॉगिन","mobile_register":"मोबाइल रजिस्टर","username_register":"उपयोगकर्ता नाम पंजीकरण","affiliate_application":"संबद्ध आवेदन","deposit_tutorial":"जमा ट्यूटोरियल","retry_once":"पुन: प्रयास करें","domain_check_failed":"अमान्य URL, कृपया ग्राहक सेवा से संपर्क करें","follow_us":"हमें फॉलो करें","security":"सुरक्षा","certification":"प्रमाणीकरण","gaming_license":"गेमिंग लाइसेंस","responsible_gaming":"ज़िम्मेदार गेमिंग","social_media":"सामाजिक मीडिया","responsibility":"ज़िम्मेदारी","game_providers":"खेल प्रदाताओं","transfer_downline_msg":"स्थानांतरण सफल रहा, {0} अधीनस्थ को स्थानांतरण {1}, राशि: {2}। {3}","transfer_upline_msg":"स्थानांतरण सफल रहा, {0} Upline में स्थानान्तरण {1}, राशि: {2}. {3}","transfer_to_sub":"डाउनलाइन को ट्रांसफर","please_agree":"कृपया {0} स्वीकार करें","apply_success":"आवेदन सफल हुआ","popular_slot":"लोकप्रिय स्लॉट","popular_live":"लोकप्रिय लाइव कैसीनो","popular_card_game":"लोकप्रिय कार्ड गेम","in_increase_birthday":"जन्मदिन","click_return":"वापस क्लिक करें","in_cashback":"कैशबैक","rewards":"पुरस्कार","change_password":"(पहली बार लॉगिन या पासवर्ड एक्सपायर हो गया है)","regulation":"विनियम","time_day":"दिन","time_hour":"घंटे","popular_live_stream":"लोकप्रिय लाइव","is_live":"लाइव है","scan_to_download":"डाउनलोड करने के लिए क्यूआर कोड स्कैन करें","support_ios_android":"iOS और Android का समर्थन करें","access_without_download":"डाउनलोड किए बिना सीधा पहुँच","entertainment_city":"मनोरंजन शहर","sponsor":"प्रायोजक","read_more":"अधिक पढ़ें","hide_info":"जानकारी छुपाएं","app_download_notice":"एक ही नेटवर्क पर डाउनलोड, स्थापित करें और रजिस्टर करें, नेटवर्क स्विच न करें। यदि सही ढंग से डाउनलोड नहीं होता है, तो मोबाइल ब्राउज़र का उपयोग करें।","delete_old_app":"पुराने संस्करण को हटाकर पुनः स्थापित करने से पहले कृपया करके।","ios_need_safari":"iOS उपयोगकर्ताओं को पृष्ठ खोलने और डाउनलोड करने के लिए Safari ब्राउज़र का उपयोग करें।","installation_guide":"स्थापना गाइड","device_apple":"Apple","device_android":"Android","licenses":"लाइसेंस","game_vendors":"गेम वेंडर","manual_rebate":"मैनुअल रिबेट","in_house":"घर में","bind_bank_card":"बैंक कार्ड बाइंड करें","recommend":"सिफारिश करना","question_type":"प्रश्न प्रकार","select_question_type":"प्रश्न प्रकार का चयन करें","content_description":"सामग्री विवरण","content_between":"सामग्री {0} और {1} शब्दों के बीच होती है","deposit_issues":"जमा समस्या","withdraw_issues":"निकास समस्याएं","game_issues":"खेल समस्या","service_issues":"ग्राहक सेवा सवाल","apply_issues":"आवेदन सवाल","other_issues":"अन्य समस्याएं","in_enter":"प्रवेश करें","pages":"पेज","in_maintenance":"रखरखाव","please_enter":"कृपया दर्ज करें","reset_password":"पासवर्ड रीसेट करें","change_pass_success":"आपने अपना पासवर्ड सफलतापूर्वक बदल दिया है","next_step":"अगला कदम","in_favorite":"पसंदीदा","latest_winners":"नवीनतम विजेताएं","supported_bank":"समर्थित बैंक","remaining_time":"शेष समय","lobby":"खेल लॉबी","service_advantage":"सेवा लाभ","caveat":"चेतावनी","input_required":"आवश्यक","feedback_complaints":"शिकायतें","product":"उत्पाद","licensed_by":"द्वारा लाइसेंसदार","in_game_center":"खेल केंद्र","set_new_pass":"नया पासवर्ड सेट करें","hd_language":"भाषा","in_back_home":"\\"घर वापस जाओ\\"","today_hide":"आज मुझे और समय समय पर याद न","close_all":"सभी बंद करें","share":"शेयर करें","in_all_games":"सभी खेल","new_games":"नए खेल","in_play":"खेलें","just_won_in":"{0} में जीत लिया","classify_baccarat":"Baccarat","classify_sicbo":"Sicbo","classify_roulette":"रूलेट","classify_dragon_tiger":"ड्रैगन टाइगर","classify_blackjack":"सोंटा","classify_live":"लाइव कैसीनो पोकर","classify_ahjong":"Ahjong","classify_3card_poker":"3-Card-Poker","classify_wenzhou":"Wenzhou","classify_sedie":"Se Die","classify_fantan":"Fan Tan","classify_niuniu":"NiuNiu","classify_yuxiaxie":"Fish Prawn Crab","classify_zjh":"ZJH","back":"पीछे","other":"अन्य","all_category":"सभी श्रेणियाँ","choose_category":"एक श्रेणी चुनें","live_support":"लाइव समर्थन","official_channel":"आधिकारिक चैनल","navigation":"नेविगेशन","beginner_guide":"मार्गदर्शिका","winning_ranking":"विजेता सूची","biggest_wins":"सबसे बड़ी जीत","end_time":"अंत का समय","about_us":"हमारे बारे में","one_click_login":"वन-क्लिक लॉगिन","expiretime_time":"वैध समय","news":"समाचार","theme":"विषय","theme_dark":"अंधकार","theme_light":"प्रकाश","sports_live":"खेल लाइव","cs_service":"ग्राहक सेवा","top_vendors":"शीर्ष विक्रेता","select_vendors":"विकल्पित विक्रेता","best_promotions":"सर्वोत्तम प्रमोशन","rebate":"रीबेट","recent":"हाल का","credit_report":"क्रेडिट रिपोर्ट","vip_bonus":"वीआईपी बोनस","refer_earn":"संदर्भ करें कमाई","bonus_bets":"बोनस बेट","security_center":"खाते की सुरक्षा","days":"दिन","hours":"घंटे","minutes":"मिनट","single_cash_back":"कैशबैक","earn":"कमाना","providers":"उत्पादक","search_results":"खोज परिणाम","game_room":"स्थल","cards":"कार्ड","server":"सर्वर","enter_address":"कृपया अपना पता भरें","enter_nationality":"कृपया अपनी राष्ट्रीयता भरें","select_occupation":"व्यवसाय","select_sourceOfIncome":"आय का स्रोत","notice":"नोटिस","fish_hunter":"मछली शिकारी","exchange_goods":"प्वाइंट रिवॉर्ड","select_region":"अपना क्षेत्र चुनें","n_digit_number":"{0} अंकों वाला फोन नंबर","minigames":"मिनीगेम्स","profit":"फायदा","in_reg_type_title":"उपयोगकर्ता नाम/मोबाइल","LINE":"LINE","bonus_code":"बोनस कोड","filter":"फ़िल्टर","welcome":"स्वागत है","logout":"लॉगआउट","vendor":"विक्रेता","products":"उत्पाद","on":"चालू","off":"बंद","all_promos":"सभी प्रमोशन","invite_earn":"आमंत्रित करें & कमाएं","get_otp":"OTP प्राप्त करें","redeem_code":"रिडीम कोड","continue_with_google":"Google+ के साथ साइन इन करें","continue_with_facebook":"Facebook+ के साथ साइन इन करें","profit_loss":"लाभ और हानि","sign_up":"साइन अप करें","sign_in":"साइन इन करें","fill_in_mobile":"सही मोबाइल नंबर दर्ज करें","load_more":"अधिक लोड करें","jackpot_games":"जैकपॉट खेल","menu":"मेनू","information":"जानकारी","links":"लिंक","cricket":"क्रिकेट","featured_games":"विशेष खेल","crash":"क्रैश","arcade":"आर्केड","table":"टेबल","fishing":"मछली पकड़ना","slot":"स्लॉट खेल","rescue_fund":"सहायता निधि","live_chat_cs":"ग्राहक सेवाएं","details":"विवरण","community":"समुदाय"}')
        },
        19519: function(e) {
            "use strict";
            e.exports = JSON.parse('{"vendor":"Vendor","in_customer_service":"Live Support","nav_vip":"VIP BONUS","nav_invite":"REFER and WIN","nav_bet":"GET BONUS BETS","nav_more":"All promotions","nav_channel":"Official Channel","help":"Help","products":"Products","social_media":"Social media","local_terms_content":"I confirm that I am 18 years old and I have read the","local_terms_link":"Terms and Services","local_lobby":"Lobby","local_fav":"Favorite","local_login_way":"Or log in with","local_mixin":"Exclusive","local_block":"Blockchain","local_header_games":"GAMES","local_header_promotions":"PROMOTIONS","local_share":"SHARE & EARN"}')
        },
        86431: function(e) {
            "use strict";
            e.exports = JSON.parse('{"local_header_games":"हिन्दी","local_header_promotions":"प्रचार","local_share":"पैसे कमाएं","local_lobby":"लॉबी","local_fav":"पसंदीदा","local_mixin":"अनन्य","nav_channel":"अधिकारी","local_terms_content":"मैं पुष्टि करता हूं कि मैं 18 वर्ष का हूं और मैंने इसे पढ़ा है","local_terms_link":"नियम और सेवाएँ","HI":"हिन्दी","product":"उत्पादों","local_block":"ब्लॉकचेन"}')
        },
        28741: function(e) {
            "use strict";
            e.exports = JSON.parse('{"local_header_games":"ゲーム","local_header_promotions":"イベント情報","local_share":"アカウント","local_lobby":"ホーム","local_fav":"コレクション"}')
        },
        55034: function(e) {
            "use strict";
            e.exports = JSON.parse('{"local_header_games":"계략","local_header_promotions":"프로모션","local_share":"홍보","local_lobby":"홈","local_fav":"내 즐겨 찾기"}')
        },
        68192: function(e) {
            "use strict";
            e.exports = JSON.parse('{"vendor":"Vendor","in_customer_service":"Live Support","nav_vip":"BÔNUS VIP","nav_invite":"REFERIR GANHE","nav_bet":"APOSTAS BÔNUS","nav_more":"Todas promoções","nav_channel":"Official Channel","help":"Help","products":"Products","social_media":"Social media","local_terms_content":"Alcancando o local. Eu confirmo que eu tenho 18 anos velho e eu li","local_terms_link":"Termos de servico","local_login_way":"Ou inscreva-se com","local_header_games":"JOGOS","local_header_promotions":"PROMOÇÃO","local_share":"SHARE","local_lobby":"Casa","local_fav":"Favorito","local_mixin":"Exclusive"}')
        }
    }
      , t = {};
    function n(a) {
        var i = t[a];
        if (void 0 !== i)
            return i.exports;
        var o = t[a] = {
            id: a,
            loaded: !1,
            exports: {}
        };
        return e[a].call(o.exports, o, o.exports, n),
        o.loaded = !0,
        o.exports
    }
    n.m = e,
    function() {
        var e = [];
        n.O = function(t, a, i, o) {
            if (!a) {
                var s = 1 / 0;
                for (u = 0; u < e.length; u++) {
                    a = e[u][0],
                    i = e[u][1],
                    o = e[u][2];
                    for (var r = !0, c = 0; c < a.length; c++)
                        (!1 & o || s >= o) && Object.keys(n.O).every((function(e) {
                            return n.O[e](a[c])
                        }
                        )) ? a.splice(c--, 1) : (r = !1,
                        o < s && (s = o));
                    if (r) {
                        e.splice(u--, 1);
                        var l = i();
                        void 0 !== l && (t = l)
                    }
                }
                return t
            }
            o = o || 0;
            for (var u = e.length; u > 0 && e[u - 1][2] > o; u--)
                e[u] = e[u - 1];
            e[u] = [a, i, o]
        }
    }(),
    function() {
        n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e["default"]
            }
            : function() {
                return e
            }
            ;
            return n.d(t, {
                a: t
            }),
            t
        }
    }(),
    function() {
        n.d = function(e, t) {
            for (var a in t)
                n.o(t, a) && !n.o(e, a) && Object.defineProperty(e, a, {
                    enumerable: !0,
                    get: t[a]
                })
        }
    }(),
    function() {
        n.f = {},
        n.e = function(e) {
            return Promise.all(Object.keys(n.f).reduce((function(t, a) {
                return n.f[a](e, t),
                t
            }
            ), []))
        }
    }(),
    function() {
        n.u = function(e) {
            return "js/" + {
                73: "Promotions",
                93: "Seamless",
                242: "Lottery",
                282: "MemberCenter",
                429: "PointMall",
                474: "AccountGame",
                846: "GameListCenter",
                990: "GameCenter"
            }[e] + "." + {
                73: "6d81d4f7",
                93: "10c45976",
                242: "b26dfcea",
                282: "3426a573",
                429: "e9d3bd55",
                474: "7484f3a8",
                846: "354e3225",
                990: "d261c437"
            }[e] + ".js"
        }
    }(),
    function() {
        n.miniCssF = function(e) {
            return "css/" + {
                73: "Promotions",
                282: "MemberCenter",
                429: "PointMall",
                474: "AccountGame",
                846: "GameListCenter",
                990: "GameCenter"
            }[e] + "." + {
                73: "1f3d27e6",
                282: "02967fcf",
                429: "ec38af06",
                474: "28f58170",
                846: "d2d92b01",
                990: "e705c707"
            }[e] + ".css"
        }
    }(),
    function() {
        n.g = function() {
            if ("object" === typeof globalThis)
                return globalThis;
            try {
                return this || new Function("return this")()
            } catch (e) {
                if ("object" === typeof window)
                    return window
            }
        }()
    }(),
    function() {
        n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
    }(),
    function() {
        var e = {}
          , t = "wic11f3-web:";
        n.l = function(a, i, o, s) {
            if (e[a])
                e[a].push(i);
            else {
                var r, c;
                if (void 0 !== o)
                    for (var l = document.getElementsByTagName("script"), u = 0; u < l.length; u++) {
                        var d = l[u];
                        if (d.getAttribute("src") == a || d.getAttribute("data-webpack") == t + o) {
                            r = d;
                            break
                        }
                    }
                r || (c = !0,
                r = document.createElement("script"),
                r.charset = "utf-8",
                r.timeout = 120,
                n.nc && r.setAttribute("nonce", n.nc),
                r.setAttribute("data-webpack", t + o),
                r.src = a),
                e[a] = [i];
                var m = function(t, n) {
                    r.onerror = r.onload = null,
                    clearTimeout(p);
                    var i = e[a];
                    if (delete e[a],
                    r.parentNode && r.parentNode.removeChild(r),
                    i && i.forEach((function(e) {
                        return e(n)
                    }
                    )),
                    t)
                        return t(n)
                }
                  , p = setTimeout(m.bind(null, void 0, {
                    type: "timeout",
                    target: r
                }), 12e4);
                r.onerror = m.bind(null, r.onerror),
                r.onload = m.bind(null, r.onload),
                c && document.head.appendChild(r)
            }
        }
    }(),
    function() {
        n.r = function(e) {
            "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
    }(),
    function() {
        n.nmd = function(e) {
            return e.paths = [],
            e.children || (e.children = []),
            e
        }
    }(),
    function() {
        n.p = "/"
    }(),
    function() {
        if ("undefined" !== typeof document) {
            var e = function(e, t, a, i, o) {
                var s = document.createElement("link");
                s.rel = "stylesheet",
                s.type = "text/css",
                n.nc && (s.nonce = n.nc);
                var r = function(n) {
                    if (s.onerror = s.onload = null,
                    "load" === n.type)
                        i();
                    else {
                        var a = n && n.type
                          , r = n && n.target && n.target.href || t
                          , c = new Error("Loading CSS chunk " + e + " failed.\n(" + a + ": " + r + ")");
                        c.name = "ChunkLoadError",
                        c.code = "CSS_CHUNK_LOAD_FAILED",
                        c.type = a,
                        c.request = r,
                        s.parentNode && s.parentNode.removeChild(s),
                        o(c)
                    }
                };
                return s.onerror = s.onload = r,
                s.href = t,
                a ? a.parentNode.insertBefore(s, a.nextSibling) : document.head.appendChild(s),
                s
            }
              , t = function(e, t) {
                for (var n = document.getElementsByTagName("link"), a = 0; a < n.length; a++) {
                    var i = n[a]
                      , o = i.getAttribute("data-href") || i.getAttribute("href");
                    if ("stylesheet" === i.rel && (o === e || o === t))
                        return i
                }
                var s = document.getElementsByTagName("style");
                for (a = 0; a < s.length; a++) {
                    i = s[a],
                    o = i.getAttribute("data-href");
                    if (o === e || o === t)
                        return i
                }
            }
              , a = function(a) {
                return new Promise((function(i, o) {
                    var s = n.miniCssF(a)
                      , r = n.p + s;
                    if (t(s, r))
                        return i();
                    e(a, r, null, i, o)
                }
                ))
            }
              , i = {
                57: 0
            };
            n.f.miniCss = function(e, t) {
                var n = {
                    73: 1,
                    282: 1,
                    429: 1,
                    474: 1,
                    846: 1,
                    990: 1
                };
                i[e] ? t.push(i[e]) : 0 !== i[e] && n[e] && t.push(i[e] = a(e).then((function() {
                    i[e] = 0
                }
                ), (function(t) {
                    throw delete i[e],
                    t
                }
                )))
            }
        }
    }(),
    function() {
        var e = {
            57: 0
        };
        n.f.j = function(t, a) {
            var i = n.o(e, t) ? e[t] : void 0;
            if (0 !== i)
                if (i)
                    a.push(i[2]);
                else {
                    var o = new Promise((function(n, a) {
                        i = e[t] = [n, a]
                    }
                    ));
                    a.push(i[2] = o);
                    var s = n.p + n.u(t)
                      , r = new Error
                      , c = function(a) {
                        if (n.o(e, t) && (i = e[t],
                        0 !== i && (e[t] = void 0),
                        i)) {
                            var o = a && ("load" === a.type ? "missing" : a.type)
                              , s = a && a.target && a.target.src;
                            r.message = "Loading chunk " + t + " failed.\n(" + o + ": " + s + ")",
                            r.name = "ChunkLoadError",
                            r.type = o,
                            r.request = s,
                            i[1](r)
                        }
                    };
                    n.l(s, c, "chunk-" + t, t)
                }
        }
        ,
        n.O.j = function(t) {
            return 0 === e[t]
        }
        ;
        var t = function(t, a) {
            var i, o, s = a[0], r = a[1], c = a[2], l = 0;
            if (s.some((function(t) {
                return 0 !== e[t]
            }
            ))) {
                for (i in r)
                    n.o(r, i) && (n.m[i] = r[i]);
                if (c)
                    var u = c(n)
            }
            for (t && t(a); l < s.length; l++)
                o = s[l],
                n.o(e, o) && e[o] && e[o][0](),
                e[o] = 0;
            return n.O(u)
        }
          , a = self["webpackChunkwic11f3_web"] = self["webpackChunkwic11f3_web"] || [];
        a.forEach(t.bind(null, 0)),
        a.push = t.bind(null, a.push.bind(a))
    }();
    var a = n.O(void 0, [879, 504], (function() {
        return n(81014)
    }
    ));
    a = n.O(a)
}
)();
