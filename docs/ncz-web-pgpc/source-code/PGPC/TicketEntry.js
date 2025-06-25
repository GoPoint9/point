 Wje = /* @__PURE__ */ Qe({
    __name: "TicketEntry",
    emits: ["closeTip", 
    "openTicketPopUp", 
    "goRewardCenter"],
    setup(t, 
    { emit: e }) {
      const {
        hasRaffleEvent: n,
        hasCountdown: i,
        displayTime: o,
        getRafflePrize: r,
        showEventModal: a,
        closeEventModal: s,
        rafflePrize: l,
        closeRaffle: c
      } = d7e(), 
      d = rn(), 
      u = Se(() => d.promoList || []), 
      _ = Se(() => d.promotionConfig), 
      p = Se(() => d.availablePromoCount), 
      f = Se(() => d.claimTicketList || []), 
      h = ["MANUAL", "SAVIOR", "UPGRADE_BONUS", "MISSION_MANUAL"], 
      g = ue(!1), 
      b = ue(!0), 
      v = ue(""), 
      m = ue(null);
      window.shellAPI.openPromoUI = async (y) => {
        Xe(!0), 
        await d.getAvailablePromotions(), 
        await d.getClaimTicketList();
        const w = f.value.find((R) => R.id === y);
        w && d.setTicketItem(w), 
        Xe(!1), 
        g.value = d.ticketCount > 0 || !!f.value.length, 
        (g.value || f.value.length) && os(() => {
          var R;
          (R = m.value) == null || R.slideToById();
        });
      };
      const E = async () => {
        await Promise.allSettled([d.getAvailablePromotions(), 
        d.getPromotionConfig()]);
        const y = _.value.unusedTicketNotify === "Y";
        g.value = y && (d.ticketCount > 0 || !!f.value.length);
      }, 
      $ = () => {
        c(), 
        b.value = !b.value;
      }, 
      k = () => {
        g.value = !1;
      }, 
      T = (y) => {
        switch (v.value = y, y) {
          case "GOLDEN_EGG":
          case "RAFFLE":
          case "PRIZE_WHEEL":
          case "CASH_VOUCHER":
          case "GIFT_CODE":
            g.value = !0;
            break;
          case "MISSION":
            xn("missionLeaderboard");
            break;
          case "LOGIN":
            xn("signInTask");
            break;
          case "REGISTER":
            xn("newbieTask");
            break;
          case "DEFAULT":
            xn("rewardCenter");
            break;
          case "EVENT":
            xn("rewardCenter");
            break;
        }
      };
      return dt(() => {
        E();
      }), 
      lt(
        () => n.value,
        () => {
          n.value && (b.value = !0);
        }
      ), 
      (y, 
      w) => {
        var R;
        return J(), 
        re(He, 
        null, 
        [
          b.value && (((R = u.value) == null ? void 0 : R.length) > 0 || we(n)) ? (J(), 
          re("div", 
          {
            key: 0,
            class: Ce(["available-promotions", 
            _.value.ticketIconPosition])
          }, 
          [
            Te(H_, 
            {
              class: "swiper-container",
              navigation: { nextEl: ".custom-prev-button", 
              prevEl: ".custom-next-button" },
              slidesPerView: 1,
              centeredSlides: !0,
              slideToClickedSlide: !0,
              loop: !0,
              speed: 1e3,
              slidesPerGroup: 1,
              autoplay: {
                delay: 3e3,
                disableOnInteraction: !1
              }
            }, 
            {
              default: _r(() => [
                we(n) ? (J(), 
                re("swiper-slide", 
                qje, 
                [
                  W("div", 
                  Mje, 
                  [
                    W("div", 
                    Fje, 
                    [
                      W("div", 
                      Bje, 
                      [
                        Uje,
                        W("div", 
                        {
                          class: Ce(["get-reward-button", 
                          { disabled: we(i) }]),
                          onClick: w[0] || (w[0] = //@ts-ignore
                          (...x) => we(r) && we(r)(...x))
                        }, 
                        ae(y.$t("new_year_claim")), 
                        3)
                      ]),
                      we(i) ? (J(), 
                      re("div", 
                      Hje, 
                      ae(we(o)), 
                      1)) : fe("", 
                      !0)
                    ]),
                    Qje
                  ])
                ])) : fe("", 
                !0),
                (J(!0), 
                re(He, 
                null, 
                Sn(u.value, 
                (x, 
                I) => (J(), 
                re("swiper-slide", 
                {
                  key: x.ticketType + I,
                  class: "swiper-slide"
                }, 
                [
                  W("div", 
                  {
                    class: Ce(["gif-container", 
                    h.includes(x.ticketType) ? "public" : x.ticketType]),
                    onClick: (A) => T(x.ticketType)
                  }, 
                  null, 
                  10, 
                  jje),
                  x.ticketType === "DEFAULT" ? (J(), 
                  re("span", 
                  zje, 
                  ae(p.value), 
                  1)) : fe("", 
                  !0)
                ]))), 
                128))
              ]),
              _: 1
            }),
            p.value > 0 || u.value.length || we(n) ? (J(), 
            re("span", 
            {
              key: 0,
              class: "close-btn",
              onClick: $
            })) : fe("", 
            !0)
          ], 
          2)) : fe("", 
          !0),
          we(a) ? (J(), 
          Tt(k4e, 
          {
            key: 1,
            rafflePrize: we(l),
            onCloseEventModal: we(s)
          }, 
          null, 
          8, 
          ["rafflePrize", "onCloseEventModal"])) : fe("", !0),
          g.value ? (
          J(), 
          Tt(Nje, 
          {
            key: 2,
            ref_key: "ticketPopup",
            ref: m,
            type: v.value,
            onToggleTicketPopup: k
          }, 
          null, 
          8, 
          ["type"])) : fe("", 
          !0)
        ], 
        64);
      };
    }
  }),



   Nje = /* @__PURE__ */ ht(Lje, [["__scopeId", "data-v-d58933df"]]), $xe = (t) => (Fi("data-v-1408cf09"), t = t(), Bi(), t), qje = { key: "raffle-event" }, Mje = { class: "event-wrap" }, Fje = { class: "event-tips-wrap" }, Bje = { class: "event-tips-content" }, Uje = /* @__PURE__ */ $xe(() => /* @__PURE__ */ W("i", { class: "reward-icon" }, null, -1)), Hje = {
    key: 0,
    class: "reward-count-time"
  },