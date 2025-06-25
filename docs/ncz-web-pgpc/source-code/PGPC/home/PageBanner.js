
const openLinkage = async (t, e = "promotions", n = "_blank") => {
  const { linkage: url, linkageType: type, roomId: roomId, nodeId: nodeId, vendor: vendor } = t;
  const currentTime = new Date().getTime();

  if (type === "URL" && url) {
    if (url.startsWith("http")) {
      const link = new URL(url);
      link.searchParams.set("username", window.sessionStorage.getItem("username"));
      window.open(link.toString(), n);
    } else {
      this.$router.push(url);
    }
  } else if (type === "P") {
    if (url) {
      this.$router.push(`${e}?t=${currentTime}#${url}`);
    } else {
      this.$router.push(e);
    }
  } else if (type === "G") {
    const gameCode = nodeId === "LOTTO_LOBBY" ? "" : nodeId;
    switch (vendor) {
      case "TCG_LOTTO_VN":
        this.$router.push({ path: "/vnLottery", query: { gameCode } });
        break;
      case "TCG_SEA":
        await this.openTcgSea();
        break;
      case "LOTT":
      case "ELOTT":
        this.$router.push({ path: "/lottery", query: { gameCode } });
        break;
      default:
        await this.startGame({ gameId: roomId, nodeId: nodeId, vassalage: vendor });
        break;
    }
  }
};



4797: function(e, t, n) {
    "use strict";
    n.d(t, {
        A: function() {
            return m
        }
    });
    var PageBannerRender = function() {
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

      , o = n(57888)
      , s = n(75316)
      , r = n(52276)
      , PageBannerProps = {
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

      , u = n(81656)
      , d = (0, u.A)(PageBannerProps, PageBannerRender, [], !1, null, null, null)
      , PageBanner = d.exports
},
