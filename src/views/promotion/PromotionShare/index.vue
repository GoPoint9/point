<template>
  <div class="promotionShare__container">
    <NavBar :title="$t('titleInvite')" left-arrow @click-left="onClick" />

    <div class="promotionShare__container-tips">
      <p>{{ $t('tipSwipeToPickBrochure') }}</p>
    </div>

    <swiper
      class="my-swipe"
      :slides-per-view="'auto'"
      :centered-slides="true"
      :space-between="20"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
    >
      <swiper-slide v-for="index in 3" :key="index">
        <div :id="`share` + (index - 1)" class="promotionShare__container-swiper">
          <!-- <img v-lazy="getIcons('promotion/promotionShare', 'poster')" /> -->
          <div class="sContent">
            <img class="logo" :src="projectIcon" alt="">
            <div class="head1">
              <span>{{ lotName }}</span>
              <span>{{ $t('fairAndJust') }}</span>
              <span>{{ $t('openAndTransparent') }}</span>
            </div>
            <div class="head2" v-html="$t('fullOddsReturnRate')" />
            <div class="head3">
              <div>
                <img class="logo" :src="getIcons('promotion', 'bank')" alt="">
                {{ $t('financialSecurity') }}
              </div>
              <div>
                <img class="logo" :src="getIcons('promotion', 'trucktick')" alt="">
                {{ $t('withdrawFast') }}
              </div>
            </div>
            <div class="head4" v-html="$t('highestRebate', [85])" />
          </div>
          <canvas :id="'qr-code' + index" />
        </div>
      </swiper-slide>
    </swiper>

    <div class="promotionShare__container-slogan">
      <p>{{ $t('inviteFriends') }}</p>
      <p>
        {{ $t('divideBonus') }}
        <span>{{ $t('tip10billion') }}</span>
        {{ $t('commission') }}
      </p>
    </div>

    <div class="promotionShare__container-buttons">
      <!-- 非混合應用才可以顯示 -->
      <div v-if="!isHybridApp()" class="share" @click="htmlToImage('share' + currentIndex)">
        {{ $t('shareInvitationPoster') }}
      </div>
      <div class="cpy" @click="copy(shareUrl.toString())">{{ $t('copyInvitationLink') }}</div>
      <!-- <div>{{ $t('copyInvitationLink') }}</div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { getIcons, copy, AwaitApiResult } from '@/utils'
import QRCode from 'qrcode'
import { computed, ref } from 'vue'
import { GetUrlAddress } from '@/api'
import { isHybridApp } from '@/utils/jsBridge'
import html2canvas from 'html2canvas'
import { SettingStore } from '@/stores'

const router = useRouter()
const currentIndex = ref(0)

const shareUrl = ref('')

const onSwiper = (swiper: any) => {
  // console.log("swiper", swiper);
}

const onSlideChange = (val: any) => {
  currentIndex.value = val.activeIndex
  console.log(val.activeIndex)
}

const onClick = () => {
  router.back()
}
// 项目图标
const projectIcon = computed(() => SettingStore().getProjectLogo)
// 推广文本
const lotName = computed(() => SettingStore().getProjectName)

async function getUrl () {
  const res = await AwaitApiResult(GetUrlAddress())
  console.log('res: ', res.data.url, window.location.origin)
  if (res) {
    // shareUrl.value = res.data.url
    if (res.data.url.startsWith('http')) {
      shareUrl.value = res.data.url
    } else {
      shareUrl.value =
        window.location.href.substring(0, window.location.href.lastIndexOf('/#/') + 2) +
        '/' +
        res.data.url.substring(res.data.url.lastIndexOf('re'), res.data.url.length)
    }

    for (let i = 1; i <= 3; i++) {
      QRCode.toCanvas(document.getElementById('qr-code' + i), shareUrl.value, (error: any) => {
        if (error) console.error(error)
      })
    }
  }
}

getUrl()
const htmlToImage = (id: string) => {
  const myDiv = document.getElementById(id) as HTMLElement
  html2canvas(myDiv, {
    useCORS: true,
    x: 0,
    y: 0,
    width: myDiv.offsetWidth,
    height: myDiv.offsetHeight,
  }).then((canvas: any) => {
    console.log(canvas, 'canvas')
    canvas.toDataURL('image/jpeg')
    const downloadLink = document.createElement('a')
    downloadLink.href = canvas.toDataURL('image/jpeg')
    downloadLink.download = 'share.jpeg'
    document.body.appendChild(downloadLink)
    downloadLink.click()
  })
}
</script>

<style lang="scss" scoped>
.promotionShare__container {
  padding-block: 0 112px;

  :deep(.van-nav-bar) {
    background-color: #f6f6f6;

    .van-nav-bar__content {
      .van-nav-bar__left {
        .van-icon {
          color: var(--text_color_L1);
        }
      }

      .van-nav-bar__title {
        color: var(--text_color_L1);
      }
    }
  }

  &-tips {
    margin-block: 40px;
    color: var(--text_color_L2);
    font-size: 28px;
    text-align: center;
  }

  .swiper {
    width: 100%;

    &-wrapper {
      .swiper-slide {
        width: 520px;
        height: 860px;
        text-align: center;

        // img {
        // 	width: 100%;
        // }
      }
    }
  }

  &-slogan {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-block: 80px 74px;
    font-size: 32px;

    p {
      color: var(--text_color_L1);

      &:first-of-type {
        margin-right: 54px;
      }

      span {
        color: var(--norm_red-color);
        font-weight: 700;
      }
    }
  }

  &-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;

    div {
      width: 660px;
      height: 70px;
      color: var(--text_color_L4);
      font-size: 30px;
      text-align: center;
      line-height: 70px;
      border-radius: 9rem;

      &.share {
        background: var(--main_gradient-color);
      }

      &.cpy {
        color: var(--main-color);
        border: 1px solid var(--main-color);
      }
    }
  }
}

.promotionShare__container-swiper {
  position: relative;
  // background: url('@icon/promotion/poster.png') no-repeat center;
  background-size: 100% 100%;
  height: 100%;

  .sContent {
    padding: 40px 40px;
    display: flex;
    flex-direction: column;

    .logo {
      width: 166px;
      height: 38px;
    }

    .head1 {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      margin-top: 20px;
      //margin-left: 10px;

      > span:nth-of-type(1) {
        font-family: 'Kumar One';
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        line-height: 57px;
        color: #fff;
        //margin-left: 30px;
      }

      > span:nth-of-type(2),
      > span:nth-of-type(3) {
        background: url('@icon/promotion/bg1.png') no-repeat center;
        background-size: 100% 100%;
        //margin-left: 10px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #f24544;
        padding: 6px 10px;
      }
    }

    .head2 {
      font-family: 'Kumbh Sans';
      font-style: normal;
      font-weight: 900;
      font-size: 40px;
      line-height: 40px;
      letter-spacing: 4px;
      margin-left: 6px;
      text-align: center;
      color: #fff;
      margin-top: 10px;
      word-break: break-all;
      > span {
        // background-clip: text;
        // -webkit-background-clip: text;
        // background-image: linear-gradient(180deg, #FFF3C6 21.67%, rgba(253, 241, 178, 1) 100%);
        // -webkit-text-fill-color: transparent;
        color: red !important;
      }
    }

    .head3 {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin-top: 24px;

      > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
        font-family: 'Kumbh Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 26px;
        line-height: 32px;
        border: 1px solid #fff4c6;
        border-radius: 10px;
        min-width: 180px;
        min-height: 120px;
        gap: 6px;
        justify-content: center;

        > img {
          width: 60px;
          height: 60px;
        }
      }
    }

    .head4 {
      color: #fff;
      font-family: 'Kumbh Sans';
      font-style: normal;
      font-weight: 700;
      font-size: 32px;
      line-height: 40px;
      margin-top: 50px;
      letter-spacing: 5px;

      > span {
        letter-spacing: 1px;
        color: rgba(253, 241, 173);
        text-shadow: 0px 2px 0px #fd5f06;
      }
    }
  }

  canvas {
    position: absolute;
    bottom: 15px;
    left: 50%;
    margin-left: -90px;
    z-index: 22;
    width: 182px !important;
    height: 182px !important;
  }
}
</style>
