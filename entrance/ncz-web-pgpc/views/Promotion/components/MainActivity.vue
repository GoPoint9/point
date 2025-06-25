<template>
  <div class="main-activity">
    <div class="activity-banner">
      <div>
        <div class="banner-title">{{ $t("YJ.activity") }}</div>
        <div class="banner-para">{{ $t("YJ.activityInfo06") }}</div>
        <div class="banner-para">{{ $t("YJ.activityInfo07") }}</div>
      </div>
    </div>
    <div class="activity-panel">
      <div class="info-panel-content">
        <div
          v-for="i in info"
          :key="i.img"
          class="header-item"
          @click="routePage(i)"
        >
          <div class="van-badge__wrapper">
            <van-badge v-if="i.count" :content="i.count">
              <div :class="['bgcontainer', i.img]" />
            </van-badge>
            <div v-else :class="['bgcontainer', i.img]" />
          </div>
          <span class="text-wrap">{{ i.title }}</span>
        </div>
      </div>
      <div class="activity-panel-content">
        <div class="content-title" @click="goPath('RedeemGift')">
          <img v-lazy="getIconsPublic('activity/DailyTask', 'signInBanner')">
          <div class="content-para">{{ $t('giftExchange') }}</div>
          <p>{{ $t('activityTip3') }}</p>
        </div>
        <div class="content-title" @click="goPath('DailySignIn')">
          <img v-lazy="getIconsPublic('activity/DailyTask', 'giftRedeem')">
          <div class="content-para">{{ $t('code8007') }}</div>
          <p>{{ $t('activityTip4') }}</p>
        </div>
      </div>
    </div>

    <!-- 每日任務 -->
    <van-dialog
      v-model="showDialog"
      class="dialog__container"
      :show-confirm-button="false"
    >
      <div class="dialog__container-img">
        <!-- <img src="@/assets/themes/common/activity/ActivityAward.png"> -->
      </div>
      <div class="dialog__container-title">
        <h1>
          {{ $t("YJ.activityTip5") }} <span class="red">{{ unMissionReceiveCount }}</span>
        </h1>
        <p>{{ $t("YJ.activityTip6") }}</p>
      </div>
      <div class="btn n2" @click="$router.push('/activity/DailyTasks')">
        {{ $t("YJ.activityTip7") }}
      </div>
      <div class="close" @click="showDialog = false" />
    </van-dialog>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getIcons, getIconsPublic } from '@/utils'

export default {
  props: {
    info: {
      type: Array,
    },
  },
  data () {
    return {
      showDialog: false,
      unMissionReceiveCount: 0,
    }
  },
  created () {
    const activityStore = useActivityStore()
    activityStore.GetActivitySetting()
    console.log(' ----------  info ----------  ', this.info)

    // if (this.info) return
    // this.GetActivitySetting({})
    //   .then((res) => {
    //     const {
    //       unMissionReceiveCount,
    //     } = res.data.data
    //     if (
    //       // res.data.isFirstCall &&
    //       unMissionReceiveCount &&
    //       localStorage.getItem(`dailyDate_${loginName}`) !==
    //         new Date().toLocaleDateString()
    //     ) {
    //       localStorage.setItem(`dailyDate_${loginName}`, new Date().toLocaleDateString()) // 每日任務提示彈窗
    //       this.showDialog = true
    //       this.unMissionReceiveCount = unMissionReceiveCount
    //     }
    //   })
    //   .catch((err) => {
    //     Toast.fail(err.msg)
    //   })
  },
  methods: {
    // ...mapActions(['GetActivitySetting']),
    getIcons,
    getIconsPublic,
    GetActivitySetting () {},
    routePage (item) {
      const { path = '', type = '' } = item

      console.log(' type ', type)
      if (type && ['-2', '-3'].includes(type)) {
        this.$emit('openIframe', type)
      } else {
        this.$router.push(path)
      }
    },
    openIframe (type) {
      if (type === '-2') {
        this.$router.push('/activity/DailySignIn')
      } else {
        this.$emit('openIframe', type)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.main-activity {
  border-radius: 17px;
  overflow: auto;
  margin: 38px 0 49px 0;
  background-color: var(--bg_color_L0);
}
.activity-panel {
  padding: 12px;
}
.activity-banner {
  // border-radius: 17px;
  // border-top-left-radius: inherit;
  // border-top-right-radius: inherit;

  // border-radius: 10px;
  // padding: 0 12px;
  padding: 20px 12px;
  color: #fff;
  // font-size: 12px;
  // font-style: normal;
  min-height: 2rem;
  // background: var(--light-main_gradient-color, var(--top-bgColor, linear-gradient(90deg, #ce0204 0%, #f2403a 100%)));
  background: var(--main_gradient-color);
  display: flex;
  align-items: center;
  .banner-title {
    // font-size: 0.48rem;
    margin-bottom: 0.26667rem;
    font-weight: 600;
  }
  .banner-para {
    margin-bottom: 0.06667rem;
  }
}
.info-panel-content {
  padding: 0 0.586rem;
  display: flex;
  justify-content: space-around;
  align-items: self-start;
  .header-item {
    display: flex;
    flex-direction: column;
    color: var(--text_color_L2, var(--text-color, #666));
    // width: 1.77rem; // 1.377rem;
    width: 160px;
    align-items: center;
    text-align: center;
    // span {
    //   font-size: 0.33rem;
    // }
    .van-badge__wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .van-badge__wrapper .bgcontainer {
      width: 60px;
      height: 60px;
      border-radius: 10px;
      // padding: 0.1332rem;
      margin-bottom: 0.1303rem;
    }
    .van-badge__wrapper .bgcontainer:after {
      content: "";
      display: block;
      width: 60px;
      height: 60px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 90%;
    }
    .van-badge__wrapper .invitation.bgcontainer {
      background-image: linear-gradient(180deg, #5ca6ff 0%, #a9e5ff 100%);
      box-shadow: 0 -0.0237rem 0.071rem #fff inset, 0 0.0474rem 0.0948rem #d0d0ed5c;
      &:after {
        background-image: url("@/assets/web_pgpc/mainActivity/invitation.png");
      }
    }
    .van-badge__wrapper .activityCenter.bgcontainer {
      background-image: linear-gradient(to bottom, #fb6c5f, #fcdcab);
      box-shadow: 0 -0.0237rem 0.071rem #fff inset, 0 0.0474rem 0.0948rem #d0d0ed5c;
      &:after {
        background-image: url("@/assets/web_pgpc/mainActivity/activityCenter.png");
      }
    }
    .van-badge__wrapper .betting.bgcontainer {
      background-image: linear-gradient(180deg, #f87700 0%, #ffce22 100%);
      box-shadow: 0 -0.0237rem 0.071rem #fff inset, 0 0.0948rem 0.0948rem #d0d0ed5c;
      &:after {
        background-image: url("@/assets/web_pgpc/mainActivity/betting.png");
      }
    }
    .van-badge__wrapper .super.bgcontainer {
      background-image: linear-gradient(180deg, #15cea2 0%, #b6ffe0 100%);
      box-shadow: 0 -0.0237rem 0.071rem #fff inset, 0 0.0948rem 0.0948rem #d0d0ed5c;
      &:after {
        background-image: url("@/assets/web_pgpc/mainActivity/superJackpot.png");
      }
    }
    .van-badge__wrapper .NewMemberGift.bgcontainer {
      background-image: linear-gradient(180deg, #a658ff 0%, #dfd1ff 100%);
      box-shadow: 0 -0.0237rem 0.071rem #fff inset, 0 0.0948rem 0.0948rem #d0d0ed5c;
      &:after {
        background-image: url("@/assets/web_pgpc/mainActivity/NewMemberGift.png");
      }
    }
  }
}
.activity-panel-content {
  display: flex;
  justify-content: center;
  gap: 50px;
  flex-wrap: wrap;
  margin-top: 20px;
  .content-title {
    width: calc((100% - 0.24rem) / 2);
    max-width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: var(--darkBg, var(--bg_color_L2));
    border-radius: 10px;
    padding-bottom: 10px;
    .content-para {
      color: var(--text_color_L1);
      font-weight: 700;
      padding: 5px 10px;
    }
    span {
      padding: 5px 10px;
      color: var(--activityMian-supTitle, #666);
    }
    p {
      padding: 5px 10px;
      color: var(--text_color_L2);
    }
  }
}

.btn {
  background: var(--main_gradient-color, var(--btn-ver-background, linear-gradient(#ff867a, #f95959)));
  width: 5rem;
  min-height: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  text-align: center;
  color: var(--text_color_L4, var(--btn-text-color, #fff));
  font-size: 0.4rem;
  font-weight: 700;
  margin: 0.5rem auto 0.3rem;
}
.close {
  position: absolute;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  left: 50%;
  transform: translate(-50%);
  bottom: -0.93333rem;
  // background-image: url("@/assets/themes/common/close.png");
  background-repeat: no-repeat;
  background-size: contain;
}
.dialog__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 8rem;
  // min-height: 6.66667rem;
  // background: #fff;
  transition: opacity 0.3s, transform 0.3s ease-in-out;
  z-index: 2003;
  padding: 0.53333rem 0.26667rem;
  border-radius: 20px;
  overflow: visible;
}

.dialog__container-img {
  margin: auto;
  // height: 2.5rem;
  // width: 100%;
  position: absolute;
  top: -1.6rem;
  left: 50%;
  transform: translateX(-50%);

  img {
    width: 100%;
    height: 100%;
  }
}

.dialog__container-title {
  margin-top: 2rem;
  // font-size: 0.48rem;
  font-weight: 700;
  h1 {
    text-align: center;
    margin-bottom: 0.2rem;
    font-weight: 400;
    & + p {
      // text-align: center;
      font-size: 0.33rem;
      // font-weight: 500;
      color: #898989;
    }
  }
  .red {
    color: red;
  }
}
:deep(.van-dialog__content) {
  width: 100%;
}
</style>
