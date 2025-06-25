//   mixins: [kt.z],
//   mixins: [kt.z],
//   mixins: [kt.z],
//   mixins: [kt.z],

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