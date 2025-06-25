<!-- <script setup lang="jsx"> -->

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
// import { Autoplay, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

import MainActivity from '@entrance/ncz-web-pgpc/views/Promotion/components/MainActivity.vue'
import TCModal from '@entrance/ncz-web-pgpc/components/CommonLogic/components/TCModal.vue'
import PromoModal from '@entrance/ncz-web-pgpc/views/Promotion/components/PromoModal.vue'
import PromoDetail from '@entrance/ncz-web-pgpc/views/Promotion/components/PromoDetail.vue'
import NoData from '@entrance/ncz-web-pgpc/components/NoData.vue'
// import { showDialog } from 'vant'
// src/views/activity/ReceivedDialog.vue
import ReceivedDialog from '@/views/activity/ReceivedDialog.vue'
// import { $t } from '@/languages'

// import { getIconsPublic } from '@/utils'
// window.showDialog = showDialog

// onMounted(() => {
//   showDialog({
//     showCancelButton: true,
//     // <img src={getIconsPublic('activity/DailyTask', 'close')} />
//     className: 'noOverHidden',
//     message: (
//       <div class="dialog-window">
//         <div class="dialog-close">
//           <svg-icon name="ticket-popup-close" onClick={onConfirm(false)} />
//         </div>
//         <div class="dialog-wrapper">
//           <img src={getIconsPublic('activity/DailyTask', 'present')} />
//           <div class="dialog-title">{ $t('activityTip5') } <span>{ 'allUnAwardCount' }</span></div>
//           <div class="dialog-para">{ $t('activityTip6') }</div>
//         </div>
//         <div class="dialog-btn" onClick={onConfirm(true)}>{ $t('activityTip7') }</div>
//       </div>
//     ),
//   }).then(res => {
//     console.warn('res ', res)
//   }).catch(err => {
//     console.warn('err ', err)
//   })
// })

// const onConfirm = res => console.log(res)
// const $showSideMenu = inject('$showSideMenu')

// const promoMenuList = [
//   { name: 'all_promo', type: 'all', iconClass: 'all' },
//   { name: 'rng_promo', type: 'rng_promo', iconClass: 'rng' },
//   { name: 'live_promo', type: 'live_promo', iconClass: 'live' },
//   { name: 'pvp_promo', type: 'pvp_promo', iconClass: 'pvp' },
//   { name: 'sport_promo', type: 'sport_promo', iconClass: 'sport' },
//   { name: 'fish_promo', type: 'fish_promo', iconClass: 'fish' },
//   { name: 'lotto_promo', type: 'lotto_promo', iconClass: 'lotto' },
//   { name: 'rebate_promo', type: 'rebate_promo', iconClass: 'rebate' },
//   { name: 'deposit_promo', type: 'deposit_promo', iconClass: 'deposit' },
//   { name: 'rank_promo', type: 'player_rank_rules', iconClass: 'rank' },
//   { name: 'point_promo', type: 'point_mall', iconClass: 'point' },
//   { name: 'download_promo', type: 'app_download', iconClass: 'download' },
//   { name: 'new_player_promo', type: 'new_player', iconClass: 'new-player' },
//   { name: 'other_promo', type: 'other_promo', iconClass: 'other' },
// ]

const activityStore = useActivityStore()
activityStore.ActivityInit()
activityStore.GetActivitySetting()
// onMounted(() => {
// })

const contentHandler = (str) => {
  if (!str || str.length === 0) return str
  const result = str
    .stringReplace(activityStore.imgFtpUrl, '') // 還原到沒有加上域名版本
    .stringReplace('/uploads/images', activityStore.imgFtpUrl + '/uploads/images') // 將圖片路徑改由前端取代
    .stringReplace('&lt;', '<')
    .stringReplace('&gt;', '>')
    // .stringReplace('<img', '<img style="max-width:300px;"') // 限制圖片大小
    .stringReplace('<img ', '<img style="max-width:100%;width:100%;"') // 限制圖片大小
    .stringReplace('style="', 'style="max-width:100%;') // 限制文字方塊不超出邊界
    .stringReplace('<table style="max-width:100%;', '<table style="') // table 要維持原寬度
    .stringReplace('<p', '<p style="word-break: break-word;"') // 強制斷行
    .stringReplace('<div', '<div style="word-break: break-word;"') // 強制斷行
  return result
}

const activityList = computed(() => {
  const list = activityStore.activityConfigH5
    .filter(i => i.type === 1 && i.status === 1)
    .map(i => {
      if (!i.img?.startsWith(activityStore.imgFtpUrl)) i.img = activityStore.imgFtpUrl + i.img
      i.name = contentHandler(i.name)
      i.intro = contentHandler(i.intro)
      i.content = contentHandler(i.content)
      return i
    })
  return list
})

const currentType = ref('all')
const showDetail = ref(false)
const activePromo = ref({})

const promoMenu = computed(() => {
  // return promoMenuList.filter(item => item.type !== 'all')
  return []
})

const switchType = (type) => {
  currentType.value = type
}

const $modal = inject('$modal')
const checkDetail = (promo) => {
  activePromo.value = promo
  // showDetail.value = true

  // Object.assign(u, t)
  $modal.show('promo-details')
}

const hideDetail = () => {
  showDetail.value = false
}

const swiperOption = {
  slidesPerView: 'auto',
  spaceBetween: 13,
  navigation: {
    prevEl: '.promo-prev',
    nextEl: '.promo-next',
  },
}
</script>

<template>
  <div class="promo-container">
    <ReceivedDialog v-model:show-dialog="activityStore.showDialog" />

    <!-- 彈窗 -->
    <TCModal name="promo-details">
      <PromoModal :promotion="activePromo" />
    </TCModal>

    <div class="promo-bg page-center" :class="{ off: $showSideMenu, dark: showDetail, promoDetail: showDetail }">
      <!-- NCZ H5 -->
      <MainActivity :info="activityStore.infoPanelList" />

      <PromoDetail v-if="showDetail" :promotion="activePromo" :close="hideDetail" />
      <div v-else class="promo-content">
        <swiper class="promo-menu-list" :options="swiperOption">
          <swiper-slide>
            <div class="promo-menu-item all" :class="{ active: currentType === 'all' }" @click="switchType('all')">
              <span class="promo-name">{{ $t('all_promo') }}</span>
            </div>
          </swiper-slide>
          <swiper-slide v-for="item in promoMenu" :key="item.type">
            <div
              class="promo-menu-item"
              :class="[item.iconClass, { active: item.type === currentType }]"
              @click="switchType(item.type)"
            >
              <!-- <img class="icon" :src="require(`@/assets/${item.iconClass}.png`)" alt=""> -->
              <span class="promo-name">{{ $t(item.name) }}</span>
            </div>
          </swiper-slide>
        </swiper>
        <!-- <div v-if="promoMenu.length > 8" slot="button-prev" class="promo-prev prev swiper-arrow" />
        <div v-if="promoMenu.length > 8" slot="button-next" class="promo-next next swiper-arrow" /> -->
        <!-- <div v-if="promoMenu.length > 8" class="promo-prev prev swiper-arrow" />
        <div v-if="promoMenu.length > 8" class="promo-next next swiper-arrow" /> -->
        <div class="active-promo-box">
          <div v-if="activityList.length" class="active-promo-list">
            <div
              v-for="(promo, index) in activityList"
              :key="`${currentType}_${index}`"
              class="active-promo-item"
              @click="checkDetail(promo)"
            >
              <div class="active-item-img">
                <!-- <img :src="require(`@/assets/${promo.iconClass}.png`)" alt=""> -->
                <img v-if="promo.actUseImage" :src="promo.img" alt="">
              </div>
              <div class="active-item-info">
                <div class="item-title">{{ promo.name }}</div>
                <div class="more-btn">{{ $t('more_button') }}</div>
              </div>
            </div>
          </div>
          <NoData v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

.promo-details-modal {
  width: 920px;
  height: 600px;
  color: #fff;
  padding: 68px 20px 20px;
  background: #212121;
  border-radius: 20px;

  .modal-content {
    position: relative;
    width: 100%;
    height: 100%;
    pointer-events: auto;
    overflow-y: auto;
    overflow-x: hidden
  }
  .modal-content::-webkit-scrollbar {
    width: 3px
  }
  .modal-content::-webkit-scrollbar-thumb,.promo-details-modal .modal-content::-webkit-scrollbar-track {
    border-radius: 2px;
    background: transparent
  }
  .modal-header {
    padding: 0 0 16px
  }
  .modal-img {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 20px
  }
  .modal-title {
    width: 100%;
    color: #fff;
    font-size: 26px;
    font-weight: 700
  }
  .modal-subtitle {
    font-size: 16px;
    color: #fff;
    padding-bottom: 20px
  }
  .modal-icon {
    width: 20px;
    height: 20px;
    margin-right: 9px
  }
  .modal-time {
    font-size: 16px;
    color: #8d8d8d;
    padding-bottom: 20px;
    display: flex;
    align-items: center
  }
  .time-light {
    padding-left: 9px;
    color: #da394f
  }
  .vhtml {
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    color: #ebebeb
  }
  .modal-body iframe,.promo-details-modal .modal-body img {
    max-width: 100%
  }
  .modal-title {
    margin-bottom: 0;
    line-height: 1.5
  }
  .modal-footer {
    width: 100%
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    transition: .2s;
    cursor: pointer;
    min-width: 90px;
    height: 39px;
    padding: 0 24px;
    border-radius: 7px;
    background-color: #da394f;
    font-size: 16px;
    color: #fff;
    font-size: 22px;
    font-weight: 700;
    height: 55px;
    border-radius: 10px;
    padding: 0 40px;
    margin-top: 40px
  }
  .btn:hover {
    opacity: .8
  }
}

.no-data {
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    display: block;
    width: 200px
  }
  p {
    margin-top: 10px;
    font-size: 14px;
    color: #fff;
    text-align: center
  }
}
.promo-detail-container {
  padding-bottom: 40px;
  padding-top: 53px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  max-width: 1085px;
  .detail-img {
    width: 100%;
    border-radius: 10px
  }
  .detail-title {
    width: 100%;
    font-size: 30px;
    font-weight: 800;
    color: #f5df4b;
    margin-top: 31px
  }
  .vhtml {
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    color: #ebebeb
  }
  .detail-footer {
    width: 100%;
    .promo-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
      transition: .2s;
      cursor: pointer;
      min-width: 90px;
      height: 39px;
      padding: 0 24px;
      border-radius: 7px;
      background-color: #da394f;
      font-size: 16px;
      color: #fff;
      font-size: 22px;
      font-weight: 700;
      height: 55px;
      border-radius: 10px;
      padding: 0 40px;
      margin-top: 40px
    }
    .promo-btn:hover {
      opacity: .8
    }
  }
}

.zoom-in-top-enter-active,.zoom-in-top-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);
  transform-origin: center top
}
.zoom-in-top-enter,.zoom-in-top-leave-active {
  opacity: 0;
  transform: scaleY(0)
}
.zoom-in-bottom-enter-active,.zoom-in-bottom-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);
  transform-origin: center bottom
}
.zoom-in-bottom-enter,.zoom-in-bottom-leave-active {
  opacity: 0;
  transform: scaleY(0)
}

.promo-container {
  min-height: calc(100vh - 63px);
  padding-bottom: 40px;
  &.dark { background-color: #000 }
  &.promoDetail { max-width: 1920px }
}
.promo-container .promo-bg {
  margin: 0 auto;
  max-width: 1085px
}
.promo-container .promo-content {
  position: relative;
  .promo-menu-list {
    gap: 20px;
    padding: 38px 0 49px 0;
    .swiper-wrapper { display: flex }
    .swiper-wrapper .swiper-slide {
      width: auto!important;
    }
    .promo-menu-item {
      display: flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
      transition: .2s;
      cursor: pointer;
      color: #fff;
      position: relative;
      text-align: center;
      font-size: 21px;
      font-weight: 500;
      margin-right: 50px
    }
    .promo-menu-item.all {
      margin-right: 15px
    }
    .promo-menu-item .promo-name {
      position: relative;
      display: flex;
      align-items: center
    }
    .promo-menu-item.active,
    .promo-menu-item:hover {
      color: #feb705;
      border-bottom: 2px solid #feb705
    }
  }

  .active-promo-box {
    position: relative
  }

  .active-promo-list {
    display: grid;
    grid-template-columns: repeat(3,348px);
    gap: 30px 20px;
    .active-promo-item {
      width: 100%;
      height: 217px;
      display: flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
      transition: .2s;
      cursor: pointer;
      flex-direction: column;
      gap: 20px;
      border-radius: 17px;
      position: relative;
      overflow: hidden
    }
    .active-promo-item:hover {
      opacity: .8
    }
    .active-item-img {
      position: relative;
      width: 100%;
      height: 100%
    }
    .active-item-img img {
      width: 100%;
      height: 100%;
      // object-fit: cover
      object-fit: fill;
    }
    .active-item-info {
      position: absolute;
      bottom: 0;
      width: 100%;
      background-color: rgba(53,27,108,.8);
      height: 45px;
      display: flex;
      align-items: center
    }
    .active-item-info .item-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      font-size: 18px;
      color: #fff;
      flex: 1;
      margin-left: 14px
    }
    .active-item-info .more-btn {
      min-width: 78.4px;
      height: 31.2px;
      padding: 0 5px;
      border-radius: 5px;
      background: #feb705;
      margin-right: 9px;
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center
    }
  }
}

.noOverHidden {
  overflow: inherit;
}

.dialog-window {
  .dialog-close {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
    cursor: pointer;
    svg {
      width: 36px;
      height: 36px;
      color: #fff;
    }
  }
  img {
    position: relative;
    margin-top: -56px;
  }
}
</style>
