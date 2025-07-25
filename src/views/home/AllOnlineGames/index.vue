<template>
  <div class="onlineGames__container">
    <NavBar class="white" left-arrow @click-left="onClickLeft">
      <template #center>
        <span :class="{ active: searchActive }">{{ gameType?.title }}{{ $t('game') }}</span>
        <input
          ref="searchBarRef"
          v-model="searchInput"
          type="text"
          :placeholder="$t('searchGame')"
          :class="{ active: searchActive }"
        >
      </template>

      <template #right>
        <svg-icon name="SearchTrx" :class="{ active: searchActive }" @click="handleOnSearchClick(true)" />
        <span :class="{ active: searchActive }" @click="handleOnSearchClick(false)">{{ $t('cancel') }}</span>
      </template>
    </NavBar>

    <van-tabs
      v-if="gameType?.key !== 'fish' && gameType?.key !== 'flash'"
      ref="tabsRef"
      v-model:active="active"
      class="onlineGames__container-tabBar"
      type="card"
      :sticky="true"
      :offset-top="46"
    >
      <van-tab v-for="(item, index) in onlineGamesList" :key="index">
        <template #title>
          <svg-icon :name="item.slotsName" class="gameIcon" />
          <span>{{ item.slotsName }}</span>
        </template>
      </van-tab>
      <FunTabs v-if="!searchActive || types.length === 0" v-model="typeActive" :line-width="0">
        <fun-tab-item
          v-for="(item, index) in types"
          :key="index"
          :name="index"
          :class="[{ activeClassName: typeActive === item.customGameType }]"
          @click="typeActive = item.customGameType"
        >
          <span>{{ item.customGameTypeName }}</span>
        </fun-tab-item>
      </FunTabs>
      <div class="onlineGames__container-list">
        <div
          v-for="(item, index) in resultList"
          :key="index"
          class="onlineGames__container-list__item"
          @click="onItemClick(item)"
        >
          <img v-lazy="item.img">
          <div>
            <span>{{ formatGameName(item.gameNameEn) }}</span>
          </div>
        </div>
      </div>
    </van-tabs>

    <div v-else>
      <div class="onlineGames__container-list miniGames">
        <div
          v-for="(item, index) in onlineGamesList"
          :key="index"
          class="onlineGames__container-list__item"
          @click="onItemClick(item)"
        >
          <img v-lazy="item.img">
          <div>
            <span>{{ item.gameNameEn }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getThirdGameList } from '@/api'
import { getIcons, AwaitApiResult } from '@/utils'
import { watchDebounced } from '@vueuse/shared'
import { useArrayFilter } from '@vueuse/core'
import { type TabsInstance } from 'vant'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { FunTabs, FunTabItem } from '@/components/FunTab'
import '@/components/FunTab/index.css'
import { useHome } from '@/hooks'

const { onItemClick } = useHome()
const tabsRef = ref<TabsInstance>()
const active = ref(0)
const types = ref([])
const typeActive = ref(0)
// 监听当点前点击的游戏，获取对应的游戏列表
watch(active, (val) => {
  const activeType = onlineGamesList.value[val]
  onlineGameData.value = []
  typeActive.value = 0
  getOnlineGameData(activeType.slotsTypeID)
})

const searchActive = ref(false)
watch(searchActive, (val) => {
  if (val) {
    setTimeout(() => {
      searchBarRef.value.focus()
    }, 0)
  } else {
    searchInput.value = ''
  }
})

/**
 * @description: 获取图片url
 * @param {*} str
 * @return {*}
 */
const getUrl = (str: string) => {
  if (str.indexOf('_') === -1) {
    return str
  } else {
    console.log(str.split('_')[0])
    return str.split('_')[0].toUpperCase()
  }
}

const searchInput = ref('')
watchDebounced(
  searchInput,
  (val: any) => {
    if (gameType.value) {
      if (gameType.value.key === 'fish' || gameType.value.key === 'flash') {
        onlineGamesList.value = onlineGamesList.value.filter((item: any) => {
          return item.gameNameEn.toLowerCase().includes(val)
        })

        if (val.length === 0) {
          onlineGamesList.value = sessionStorage.getItem('slotGamesList')
            ? JSON.parse(sessionStorage.getItem('slotGamesList') as string)
            : null
        }
      } else {
        const activeType = onlineGamesList.value[active.value]
        getOnlineGameData(activeType.slotsTypeID, val)
      }
    }
  },
  {
    debounce: 300,
  }
)

const searchBarRef = ref<HTMLElement>(null as any)

const gameType = ref<{
  gameList: any[]
  isShow: boolean
  title: string
  img: string
  key: string
}>()
const onlineGamesList = ref<any[]>([])
const onlineGameData = ref<any[]>([])

const router = useRouter()
const resultList = useArrayFilter(onlineGameData, (i) => {
  if (searchActive.value) {
    const gameNameEn = i.gameNameEn.toLowerCase()
    return gameNameEn.includes(searchInput.value.toLowerCase())
  }
  return i.customGameType === typeActive.value
})
/**
 * @description: 格式化名称
 * @param {*} string
 * @return {*}
 */
function formatGameName (string: string) {
  if (string) {
    return string.split(/(?=[A-Z])/).join(' ')
  }
  return ''
}

function onClickLeft (): void {
  router.go(-1)
}

function handleOnSearchClick (val: boolean) {
  searchActive.value = val
}

/**
 * @description: 获取游戏列表
 * @param {*} type
 * @param {*} gameName
 * @return {*}
 */
async function getOnlineGameData (type: number, gameName: string = '') {
  const res = await AwaitApiResult(
    getThirdGameList({
      type,
      gameNameEn: gameName,
    })
  )
  if (res) {
    // console.log(res)
    onlineGameData.value = res.data.gameLists || []
    types.value = res.data.gameCustomTypeLists || []
    if (!types.value.length) return
    typeActive.value = types.value[0].customGameType
  }
}

onMounted(() => {
  // 从session中获取gametype  首页点击左侧菜单存下的
  gameType.value = sessionStorage.getItem('gameType') ? JSON.parse(sessionStorage.getItem('gameType') as string) : null
  console.log('gameType.value', gameType.value)
  onlineGamesList.value = sessionStorage.getItem('slotGamesList')
    ? JSON.parse(sessionStorage.getItem('slotGamesList') as string)
    : null
  console.log('onlineGamesList.value', onlineGamesList.value)
  const clickedItem: { slotsTypeID: number; slotsName: string } = JSON.parse(sessionStorage.getItem('clickedItem') as string)

  if (clickedItem) {
    active.value = onlineGamesList.value.findIndex((item) => item.slotsTypeID === clickedItem.slotsTypeID)
  }

  if (tabsRef.value) {
    tabsRef.value.scrollTo(active.value)
  }

  const activeType = onlineGamesList.value[active.value]

  getOnlineGameData(activeType.slotsTypeID)
})
</script>

<style>
:root {
  --van-tabs-card-height: auto;
}
</style>

<style lang="scss" scoped>
.onlineGames__container {
  overflow: hidden;

  :deep(.navbar) {
    .navbar__content {
      .navbar__content-center {
        span {
          opacity: 1;
          transition: all 0.3s ease-in-out;
        }

        span {
          &.active {
            opacity: 0;
          }
        }

        input {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(0, -50%);
          width: 10px;
          height: 70px;
          padding: 5px;
          padding: 15px 0 15px 110px;
          font-size: 28px;
          font-weight: 400;
          border: none;
          border-radius: 35px;
          background-color: var(--bg_color_L2);
          color: var(--text_color_L1);

          opacity: 0;
          transition: all 0.3s ease-in-out;

          &.active {
            transform: translate(-50%, -50%);
            width: 482px;
            opacity: 1;
          }

          &::placeholder {
            color: var(--text_color_L3);
            font-size: 24px;
            position: relative;
          }
        }
      }

      .navbar__content-right {
        width: 58px;

        svg {
          font-size: 48px;
          transition: all 0.3s ease-in-out;
          color: var(--main-color);

          &.active {
            transform: translateX(-510px) translateY(2px);
          }
        }

        span {
          position: absolute;
          transition: all 0.3s ease-in-out;
          color: var(--text_color_L2);
          font-size: 28px;
          line-height: 40px;
          white-space: nowrap;
          display: none;

          &.active {
            display: initial;
            top: 10px;
            right: 0;
          }
        }
      }
    }
  }
  :deep(.fun-tabs) {
    background-color: transparent;
    padding-bottom: 20px;
    .fun-tab-item {
      width: 220px;
      height: 60px;
      color: var(--text_color_L2);
      text-align: center;
      font-style: normal;
      font-weight: 400;
      line-height: 26px;
      background: var(--bg_color_L2);
      margin-right: 20px;
      border-radius: 40px;
      span {
        font-size: 24px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        padding: 0 4px;
        width: 100%;
      }
      &:last-child {
        margin-right: 0;
      }
      &.activeClassName {
        background: var(--main_gradient-color);
        span {
          color: var(--text_color_L4) !important;
        }
      }
    }
  }

  &-tabBar {
    padding-inline: 20px;

    :deep(.van-tabs__nav) {
      padding-top: 28px;
      background: var(--bg_color_L1);
    }
    :deep(.van-tabs__nav--card) {
      height: 140px;
      margin: 0;
      border: none;
      background: var(--bg_color_L1);

      .van-tab--card {
        width: 190px;
        height: 100px;
        margin-right: 15px;
        padding: 0;
        color: var(--text_color_L2) !important;
        border-radius: 10px;
        background-color: var(--bg_color_L2);
        border: none;

        & > span {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;

          img {
            max-height: 55%;
            max-width: 55%;
          }
        }

        &.van-tab--active {
          color: var(--text_color_L4) !important;
          background: var(--main_gradient-color);
        }
      }
    }
  }

  &-list {
    margin: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px 18px;
    padding-bottom: 20px;

    &__item {
      width: 100%;
      height: auto;
      border-radius: 5px;
      img {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 6px;
        background-color: var(--bg_color_L2);
      }
      div {
        margin-top: 6px;
        width: 100%;
        height: 58px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      span {
        font-size: 24px;
        text-align: center;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        padding-inline: 10px;
        overflow: hidden;
        color: var(--text_color_L2);
      }
    }

    &.miniGames {
      height: calc(100vh - 120px);
    }
  }
  .gameIcon {
    width: 100px;
    height: 50px;
  }
}
</style>
