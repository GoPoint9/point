
37001: function(t, e) {
    "use strict";
    e.A = {
        login: {
            getPlayerRankProgress: {
                link: "/wps/relay/MCSFE_getPlayerRankProgress"
            },
            login: {
                link: "/wps/session/login",
                modID: "COMM3",
                encrypt: !0
            },
            loginVerify: {
                link: "/wps/session/login/verification",
                modID: "LOGINIPVERF3",
                encrypt: !0
            },
            logout: {
                link: "/wps/session/logout",
                modID: "COMM3"
            },
            mbInfo: {
                link: "/wps/member/info",
                alert: !1
            },
            changePwd: {
                link: "/wps/member/password",
                modID: "PASS3",
                encrypt: !0
            },
            forgetPwd: {
                link: "/wps/member/password/email",
                modID: "COMM3"
            },
            freePlay: {
                link: "/wps/session/login/freeplay",
                modID: "FREEPLAY3"
            },
            findPasswordByPhone: {
                link: "/wps/member/password/sms",
                modID: "PWRESETSMS3",
                token: !1
            },
            setPasswordByPhone: {
                link: "/wps/member/password/verification",
                modID: "CHNGPASSVERIF3",
                token: !1,
                encrypt: !0
            },
            icon: {
                link: "/wps/member/info/icon",
                modID: "PROFPIC3"
            },
            loginCode: {
                link: "/wps/verification/sms/noLogin",
                modID: "VERIFICATION3"
            },
            securityConfig: {
                link: "/wps/v2/member/securityConfig",
                modID: "COMM3"
            },
            phoneCode: {
                link: "/wps/verification/sms/register",
                modID: "REGMOBVERF3",
                token: !1
            }
        },
        register: {
            register: {
                link: "/wps/member/register",
                modID: "REG3",
                encrypt: !0
            },
            setRegister: {
                link: "/wps/system/setting/register",
                modID: "REG3"
            },
            affiliate: {
                link: "/wps/agent/affiliate",
                modID: "AFFMAN3"
            },
            captcha: {
                link: "/wps/captcha",
                modID: "CAPTCHA3"
            },
            captchaGeetest: {
                link: "/wps/captcha/geetest",
                modID: "GEETEST3",
                token: !1
            },
            getSms: {
                link: "/wps/verification/sms/register",
                modID: "REGMOBVERF3"
            },
            mobileRegSMS: {
                link: "/wps/verification/sms/register",
                modID: "MOBILENUMREG3",
                token: !1
            },
            registerMobile: {
                link: "/wps/member/register/mobile",
                modID: "MOBILENUMREG3",
                encrypt: !0
            },
            registerAuto: {
                link: "/wps/member/register/autoUsername",
                modID: "REG3"
            },
            countryCode: {
                link: "/wps/system/country",
                modID: "COMM3"
            }
        },
        lottery: {
            game: {
                link: "/lgw/games",
                modID: "COMM3"
            },
            openedNumero: {
                link: "/lotto/lgw/games/opened/numero",
                modID: "COMM3"
            },
            lottOpenedNumero: {
                link: "/lgw/games/opened/numero",
                modID: "COMM3",
                token: !0
            },
            gameMenu: {
                link: "/lgw/games/game_menus",
                modID: "COMM3"
            },
            popular: {
                link: "/lgw/games/popular",
                modID: "AGEANNOUNCE3"
            },
            lottLabby: {
                link: "/wps/game/launchGame",
                modID: "GAMELO3"
            },
            draw: {
                link: "/lgw/draw",
                modID: "COMM3"
            },
            lottoDraw: {
                link: "/lgw/draw/code/",
                modID: ""
            },
            issue: {
                link: "/lgw/numeros/near"
            },
            vnLotteryList: {
                link: "/lgw/vn/numeros/opened/game",
                modID: "AGEANNOUNCE3",
                token: !1
            },
            vnlottMenus: {
                link: "/lgw/vn/games/game_menu",
                modID: "COMM3",
                token: !1
            },
            recentLottGame: {
                link: "/lgw/games/game_menus/recent",
                modID: "COMM3",
                token: !0
            }
        },
        game: {
            getGameMatchV2: {
                link: "/wps/relay/GCSGAME_getGameMatchV2"
            },
            gameVendor: {
                link: "/wps/relay/GCSGAME_gameVendor",
                modID: "COMM3"
            },
            vassGameType: {
                link: "/wps/relay/GLS2_getVassGameType",
                modID: "GAMELO3"
            },
            rooms: {
                link: "/wps/relay/GLS2_roomList"
            },
            launchGame: {
                link: "/wps/game/launchGame",
                modID: "GAMELO3"
            },
            trialGame: {
                link: "/wps/relay/GCS_gameTrialLaunch",
                token: !1
            },
            userGame: {
                link: "/wps/relay/GCSGAME_gameList",
                modID: "GAMELO3"
            },
            getRecentGameList: {
                link: "/wps/relay/GCS_recentGame",
                modID: "GAMELOREC3"
            },
            getFavGameList: {
                link: "/wps/relay/MCSFE_getFavoriteGamesList"
            },
            addFavorite: {
                link: "/wps/relay/MCSFE_addFavoriteGameV2",
                modID: "GAMELO3"
            },
            removeFavorite: {
                link: "/wps/relay/MCSFE_removeFavoriteGameV2",
                modID: "GAMELO3"
            },
            gameHot: {
                link: "/wps/relay/GCSGAME_hotGamesV2",
                modID: "GAMELOHOT3",
                token: !1
            }
        },
        common: {
            rafflePromotion: {
                link: "/wps/relay/MCSFE_claimRafflePromotion",
                modID: "REWCEN3",
                token: !0
            },
            feedback: {
                link: "/wps/feedback",
                modID: "FEEDBACK3",
                token: !1
            },
            getCustomerServiceScript: {
                link: "/wps/relay/WPSCORE_getCustomerServiceScript",
                token: !1,
                alert: !1
            },
            rafflePromotionStatus: {
                link: "/wps/relay/MCSFE_getRafflePromotionStatus",
                modID: "REWCEN3",
                token: !0
            },
            getPromotionAnnouncementCategory: {
                link: "/wps/relay/PROMOFE_getPromotionAnnouncementCategory"
            },
            getAvailablePromotions: {
                link: "/wps/relay/MCSFE_getAvailablePromotions",
                modID: "REWCEN3",
                token: !0
            },
            getMerchantAvailablePromotions: {
                link: "/wps/relay/MCSFE_getMerchantAvailablePromotions",
                modID: "REWCEN3",
                token: !1
            },
            promotionClaimList: {
                link: "/wps/relay/MCS2_getPromotionClaimList",
                modID: "REWCEN3",
                token: !0
            },
            settings: {
                link: "/wps/system/settings/consolidated",
                modID: "COMM3"
            },
            permission: {
                link: "/wps/system/status",
                modID: "COMM3"
            },
            location: {
                link: "/wps/system/location",
                modID: "COMM3"
            },
            menu: {
                link: "/wps/system/whitelabel",
                modID: "COMM3"
            },
            merchantWallet: {
                link: "/wps/relay/GCS_merchantWallet",
                modID: "COMM3",
                token: !0
            },
            routers: {
                link: "/wps/system/domainRoute",
                modID: "COMM3"
            },
            balance: {
                link: "/wps/v2/wallets/balance",
                modID: "COMM3"
            },
            notice: {
                link: "/wps/relay/MCSFE_getListAnnouncements",
                modID: "COMM3"
            },
            consolidated: {
                link: "/wps/member/info/funds/consolidated",
                modID: "COMM3"
            },
            processRealTimeSalaryContract: {
                link: "/wps/relay/MCSFE_processRealTimeSalaryContract",
                modID: "RTSALARY3",
                token: !0
            },
            processDividendReq: {
                link: "/wps/relay/MCSFE_processContractDividend",
                modID: "SIGNCONDIV3"
            },
            processDailySalary: {
                link: "/wps/relay/MCSFE_processDailySalaryContract",
                modID: "DAILYSALCONT3"
            },
            processContractHourSalary: {
                link: "/wps/relay/MCSFE_processContractHourSalary",
                modID: "HOURSAL3"
            },
            unreadMessage: {
                link: "/wps/relay/CSP_unreadCount",
                modID: "INBOX3"
            },
            getInbox: {
                link: "/wps/relay/CSP_getInbox",
                modID: "INBOX3"
            },
            templates: {
                link: "/wps/system/templates",
                modID: "COMM3"
            },
            getWinnerBoard: {
                link: "/wps/relay/ODSFE2_getWinnerBoard",
                modID: "COMM3"
            },
            getJackpot: {
                link: "/wps/relay/VIS_getJackpot",
                modID: "COMM3"
            },
            chatMessage: {
                link: "/wps/relay/CBS_unreadCount",
                modID: "CBS3",
                token: !0
            },
            launchChat: {
                link: "/wps/relay/CBS_launchChat",
                modID: "CBS3",
                token: !0
            },
            updateLanguage: {
                link: "/wps/member/language",
                modID: "COMM3",
                token: !0
            },
            getRebate: {
                link: "/wps/relay/MCSFE_getCustomerRebateSettingByProductType",
                token: !0
            },
            getTemplate: {
                link: "/wps/system/templates",
                modID: "COMM3",
                token: !1
            },
            getPaymentConfirmationList: {
                link: "/wps/relay/MCSFE_getPaymentConfirmationList",
                token: !0
            },
            processC2CTransaction: {
                link: "/wps/relay/MCSFE_processC2CTransaction",
                token: !0
            },
            getSignUpRequestReward: {
                link: "/wps/relay/MCSFE_signUpRequestReward",
                token: !0
            },
            getPlayerAvatar: {
                link: "/wps/relay/MCSFE_getPlayerAvatar",
                token: !0
            },
            chatPermission: {
                link: "/wps/relay/CBS_groupPermission",
                token: !0
            }
        },
        integral: {
            pointBalance: {
                link: "/wps/relay/MCSFE_getPointBalance",
                modID: "PTSYS3"
            },
            pointRewardConversionType: {
                link: "/wps/relay/MCSFE_getPointRewardConversionType",
                modID: "PTSYS3"
            },
            pointReward: {
                link: "/wps/relay/MCSFE_getPointReward",
                modID: "PTSYS3"
            },
            redeemPoint: {
                link: "/wps/relay/passwordCheck/MCSFE_redeemPointReward",
                modID: "PTSYS3",
                encrypt: !0
            },
            redeemPointList: {
                link: "/wps/relay/MCSFE_getRedeemPointList",
                modID: "PTSYS3"
            },
            pointConfig: {
                link: "/wps/relay/MCSFE_getPointConfig",
                modID: "PTSYS3"
            },
            memTransDet: {
                link: "/wps/relay/ODSFE2_MemTransDet",
                modID: "MEMTRANS3"
            },
            convertPoint: {
                link: "/wps/relay/passwordCheck/MCSFE_convertPoint",
                modID: "PTSYS3",
                encrypt: !0
            }
        },
        help: {
            getHelp: {
                link: "/wps/system/helpCenter",
                modID: "COMM3"
            }
        }
    }
},