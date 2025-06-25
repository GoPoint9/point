<script setup lang="ts">
import { getIcons } from '@/utils'
import { useHelp } from '@/NCZ/hooks'
import { useHome } from '@/hooks'

const { helpList } = useHelp()
const $showSideMenu = inject('$showSideMenu')
const iconVendors = ['PG', 'EG2', 'PT', 'JDB', 'CQ9', 'FC', 'JL', 'BGS']

const getImageUrl = imageName => {
  const basePath = new URL('@/assets/web_pgpc/RNG_LIST_VENDOR/', import.meta.url).href
  return basePath + imageName
}

const router = useRouter()
const $modal = inject('$modal')
// 打開 Help Center 彈窗
const clickMenu = tag => {
  router.push(tag ? `/help#${tag}` : '/help')
  $modal.show('helpModal')
}

const { gameMenus, setCurrentGameType } = useHome({ changeTitle: true })
// 切換 game type，滑到 top
const handleItemClick = gameType => {
  setCurrentGameType(gameType)
  document.body.scrollTo({ top: 0, behavior: 'smooth' })
}

// 競品原資料
// const navItems = [
//   { name: 'hd_home', gameType: 'HOME', page: '/' },
//   { name: 'con_rng', gameType: 'RNG', page: '/rng' },
//   { name: 'con_lott', gameType: 'ELOTT', page: '/elott' },
//   { name: 'con_live', gameType: 'LIVE', page: '/live' },
//   { name: 'con_fish', gameType: 'FISH', page: '/fish' },
//   { name: 'con_sports', gameType: 'SPORTS', page: '/sports' },
//   { name: 'compete_game', gameType: 'ESPORTS', page: '/esports' },
//   { name: 'con_pvp', gameType: 'PVP', page: '/pvp' },
//   { name: 'hd_event', gameType: 'PROMO', page: '/promotions' },
// ]
const productsItem = computed(() => {
  // const exclude = ['Popular', 'HOME']
  const exclude = ['Popular']
  return gameMenus.value
    .filter(item => !exclude.includes(item.categoryCode))
    .map(item => ({
      ...item,
      // vendors: cloneDeep(gameVendor[item.gameType] || [])
      vendors: [],
    }))
})

const contactList = ref<any>([])
// 获取客服列表
// const getList = async () => {
//   const res = await AwaitApiResult(GetCustomerServiceTypelist())
//   if (res) {
//     contactList.value = res.data || []
//   }
// }
// onMounted(() => getList())
</script>
<template>
  <div class="footer-container">
    <div class="footer-content page-center" :class="{ off: $showSideMenu }">
      <div class="footer-top">
        <div class="list-wrap help-list">
          <div class="list-title">{{ $t('help_up') }}</div>
          <div class="list-content">
            <div
              v-for="(item, index) in helpList"
              :key="index"
              :class="['br-hmenu-nav', item.tag]"
              @click="clickMenu(item.tag)"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
        <div class="list-wrap product-list">
          <div class="list-title">{{ $t('product') }}</div>
          <div class="list-content">
            <div
              v-for="(item, index) in productsItem"
              :key="`${item.categoryCode}-${index}`"
              class="list-item"
              @click="handleItemClick(item.categoryCode)"
            >
              <!-- {{ $t(item.name) }} -->
              {{ item.title }}
            </div>
          </div>
        </div>
        <div class="list-wrap follow-list">
          <div class="list-title">{{ $t('follow_us') }}</div>
          <div class="list-content">© 2024 PGPC All rights reserved</div>
        </div>
        <div class="list-wrap social-info">
          <div class="list-title">{{ $t('social_media') }}</div>
          <div class="list-content">
            <!-- <div v-if="hasService('FACEBOOK')" class="channel-item fb" @click="getService('FACEBOOK')"></div>
            <div v-if="hasService('YOUTUBE')" class="channel-item yt" @click="getService('YOUTUBE')"></div> -->
            <span
              v-for="(item, index) in contactList"
              :key="index"
              class="channel-item"
              @click="onItemClick(item.typeID)"
            >
              <img v-lazy="getIcons('main', `CStype${item.typeID}`)" alt="">
            </span>
          </div>
        </div>
      </div>
      <div class="footer-info">
        <ul class="icons">
          <img
            v-for="(vendor, index) in iconVendors"
            :key="index"
            class="icon-img"
            :src="getImageUrl(`${vendor}-GRAY.png`)"
            :alt="vendor"
          >
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.footer-container {
  font-size: 16px;
  text-align: center;
  background: #202020;
  padding-top: 35px;
  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .footer-top {
    display: flex;
    width: 100%;
    gap: 50px;
    border-bottom: 1px solid #3a4557;
    padding: 0 0 44px 13px;
    .list-wrap {
      display: flex;
      flex-direction: column;
      font-size: 15px;
      color: #5c677a;
      width: 230px;
      text-align: left;
    }
    .list-title {
      color: #fff;
      font-size: 18px;
      font-weight: 400;
    }
    .list-content {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-top: 22px;
      color: rgba(255, 254, 225, 0.83);
      font-size: 15px;
      font-weight: 400;
    }
    .list-content .br-hmenu-nav,
    .list-content .list-item {
      cursor: pointer;
    }
  }
  .help-list li {
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    transition: 0.2s;
    cursor: pointer;
  }
  .help-list li:hover {
    opacity: 0.8;
  }
  .follow-list {
    margin-right: 172px;
    width: 200px;
    .list-content {
      line-height: 1.5;
      color: #787878;
      font-size: 15px;
      font-weight: 400;
    }
  }
  .social-info {
    .list-content {
      flex-direction: row;
      gap: 16px;
    }
    .channel-item {
      width: 46px;
      height: 46px;
      cursor: pointer;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    .channel-item.fb {
      background: url('@/assets/web_pgpc/icon-fb.png') no-repeat 50% / contain;
    }
    .channel-item.yt {
      background: url('@/assets/web_pgpc/icon-yt.png') no-repeat 50% / contain;
    }
  }
  .footer-info {
    margin: 34px 0 32px 0;
    .icons {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      gap: 10px 10px;
    }
    .icons .icon-img {
      height: 60px;
    }
  }
}
</style>
