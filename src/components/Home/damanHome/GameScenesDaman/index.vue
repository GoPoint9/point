<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import { useRect } from '@vant/use'
import { computed, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGame } from '@/hooks'
import { SettingStore } from '@/stores'
import NavTab from '@/components/FunTab/NavBar.vue'
import { useRouter } from 'vue-router'
import DamanTitle from './Title.vue'
import DamanVideo from './Video.vue'
import DamanLottery from './Lottery.vue'
import DamanLotteryList from './LotteryList.vue'
import DamanGame from './Game.vue'
import DamanGameHome from './GameHome.vue'
import DamanElectron from './Electron.vue'
const store = SettingStore()
const { t } = useI18n()
const router = useRouter()
const getList = (list: any[] = []) => {
  if (list.length < 6) return list
  return list.slice(0, 6)
}
const game2 = [
  {
    key: 'popular',
    name: t('hot'),
    state: 1,
  },
  {
    key: 'platformList',
    name: t('platRecom'),
    state: 1,
  },
  {
    key: 'slot',
    name: t('electronic'),
  },
  {
    key: 'flash',
    name: t('miniGame'),
  },
  {
    key: 'video',
    name: t('live'),
  },
  {
    key: 'fish',
    name: t('fishing'),
  },
  {
    key: 'chess',
    name: t('chess'),
  },
  {
    key: 'sport',
    name: t('sport'),
  },
  {
    key: 'lottery',
    name: t('lottery'),
  },
]
const game = ['BRL'].includes(import.meta.env.VITE_BASE_CURRENCY)
  ? game2
  : [
      {
        key: 'lottery',
        name: t('lottery'),
      },
      {
        key: 'flash',
        name: t('miniGame'),
      },
      {
        key: 'popular',
        name: t('hot'),
        state: 1,
      },
      {
        key: 'platformList',
        name: t('platRecom'),
        state: 1,
      },
      {
        key: 'slot',
        name: t('electronic'),
      },
      {
        key: 'sport',
        name: t('sport'),
      },

      {
        key: 'video',
        name: t('live'),
      },
      {
        key: 'fish',
        name: t('fishing'),
      },
      {
        key: 'chess',
        name: t('chess'),
      },
    ]

const {
  gameList,
  setActive,
  active,
  useProvid,
  getGameList,
  gameType,
  currentList,
  allGame,
  currentGame,
  current,
  platformList,
} = useGame()
const gameTop = computed(() => gameList.value.slice(0, 2))
const gameBottom = computed(() => gameList.value.slice(2, gameList.value.length))
const list = computed(() => {
  return game
    .filter((item) => item.key !== 'popular')
    .map((item) => {
      if (item.key === 'popular') {
        const games: any = allGame.value?.[item.key] || []
        const copy = games[1] || []
        return Object.assign(item, {
          list: getList(games[1]),
          count: copy.length,
          name: t('code9302Popular'),
        })
      }
      if (item.key === 'platformList') {
        return Object.assign({}, item, {
          list: getList(platformList.value),
          count: platformList.value.length,
          key: 'popular',
        })
      }
      if (item.key === 'video') {
        const games: any = allGame.value?.clicksVideoTopList || []
        const copy = games[1] || []
        return Object.assign(
          {
            list: getList(games),
            count: copy.length,
          },
          item
        )
      }
      const games = allGame.value?.[item.key] || []
      return Object.assign(
        {
          list: getList(games),
          count: games.length,
        },
        item
      )
    })
})
const root = ref<HTMLDivElement>()
const content = ref<HTMLDivElement>()
const sticky = ref<HTMLDivElement>()
const setGame = async (key: string) => {
  setActive(gameList.value.findIndex((item) => item.key === key))
  if (!content.value) return
  const offsetTop = content.value.offsetTop || 0
  const heght = sticky.value?.clientHeight || 0
  const offsetY = offsetTop - (heght === 0 ? 70 : heght)
  window.scrollTo({
    top: offsetY,
    behavior: 'smooth',
  })
}
const goPath = (type: string) => {
  router.push({
    name: 'AllGames',
    query: {
      type,
    },
  })
}
const state = reactive({
  fixed: false,
})
const offset = 10
const { y } = useScroll(window, {
  onScroll () {
    const rootRect = useRect(root)
    state.fixed = offset > rootRect.top
  },
  throttle: 100,
})
const onScrollTo = () => {
  if (!content.value || !sticky.value) return
  const offsetTop = content.value.offsetTop || 0
  const heght = sticky.value.clientHeight
  const offsetY = offsetTop - heght
  window.scrollTo({
    top: offsetY - 10,
    behavior: 'smooth',
  })
}
onMounted(() => getGameList(true))
useProvid()
</script>

<template>
  <div class="gameScenes-daman">
    <div ref="root" class="game-menu">
      <div class="row space">
        <div v-for="item of gameTop" class="row-item" @click="setGame(item.key)">
          <img v-lazy="item.img" class="game_image" alt="">
          <img v-lazy="item.image" class="game_bg" alt="">
          <div class="game_text">{{ item.title }}</div>
        </div>
      </div>
      <div class="row wrap">
        <div
          v-for="item of gameBottom"
          class="row-item row-small"
          :class="[`game_${item.key}`]"
          @click="setGame(item.key)"
        >
          <img v-lazy="item.img" class="game_image" alt="">
          <img v-lazy="item.image" class="game_bg" alt="">
          <div class="game_text">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <transition name="van-fade">
      <div v-if="state.fixed" ref="sticky" class="game-sticky">
        <NavTab
          v-slot="{ item, index }"
          ref="tabRefs"
          v-model:active="active"
          :list="gameList"
          tab-class-name="tabs"
          active-class-name="tab_active"
          tab-item-class-name="funtab_item"
          @on-click-tab="onScrollTo"
        >
          <div class="tab_item" :class="{ tab_active: index === active }">
            <img v-lazy="item.img">
            <span>{{ item.title }}</span>
          </div>
        </NavTab>
      </div>
    </transition>

    <div ref="content" class="game-content">
      <div v-if="['popular'].includes(currentGame)" class="game-list">
        <div v-for="item of list" :key="item.key" class="">
          <DamanTitle
            :btn="true"
            :count="item.count"
            :title="item.name"
            :icon="!['popular'].includes(item.key)"
            @change="goPath(item.key)"
          />
          <!--热门-->
          <DamanGame
            v-if="['popular'].includes(item.key)"
            :odd="store.isShowHotGameWinOdds"
            :is-all="true"
            :platform-list="item.list"
          />
          <!--彩票-->
          <DamanLottery v-if="['lottery'].includes(item.key)" :platform-list="item.list" />
          <!--其他-->
          <DamanGame
            v-if="['flash', 'fish', 'video'].includes(item.key)"
            :title="['sport', 'chess'].includes(item.key) ? item.name : ''"
            :is-all="true"
            :platform-list="item.list"
            :code="item.key"
            :enter-game="['video'].includes(item.key)"
          />
          <DamanGameHome
            v-if="['sport', 'slot', 'chess'].includes(item.key)"
            :title="['sport', 'chess'].includes(item.key) ? item.name : ''"
            :is-all="true"
            :platform-list="item.list"
            :code="item.key"
            :enter-game="['video'].includes(item.key)"
          />
        </div>
      </div>
      <div v-else class="game-list">
        <DamanTitle v-if="!['slot', 'lottery', 'video'].includes(currentGame)" :icon="true" :title="current?.title" />
        <DamanLotteryList v-if="gameType === 3" :platform-list="currentList" />
        <DamanElectron v-if="['slot'].includes(currentGame)" />
        <DamanVideo v-if="['video'].includes(currentGame)" />
        <DamanGame
          v-if="['fish'].includes(currentGame)"
          :enter-game="true"
          :is-all="true"
          :platform-list="currentList"
        />
        <DamanGame
          v-if="['flash', 'sport', 'chess'].includes(currentGame)"
          :title="['sport', 'chess'].includes(currentGame) ? current?.title : ''"
          :is-all="true"
          :platform-list="currentList"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gameScenes-daman {
  .game-menu {
    margin-top: 15px;
  }

  .row {
    display: flex;
    align-content: center;

    &.space {
      justify-content: space-between;
    }

    &.wrap {
      flex-wrap: wrap;
    }
  }

  .row-item {
    position: relative;
    width: 340px;
    height: 140px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 372px 172px;
    border-radius: 20px;
    margin-bottom: 20px;

    &.row-small {
      width: 220px;
      margin-right: 20px;

      .game_bg {
        width: 252px;
      }

      &:nth-child(3n) {
        margin-right: 0;
      }
      &:nth-child(4),
      &:nth-child(5),
      &:nth-child(6) {
        .game_text {
          top: 90px;
        }
      }
      &.game_sport {
        .game_image {
          height: 140px;
          width: 180px;
          top: 7px;
        }
      }
      .game_text {
        bottom: inherit;
        top: 20px;
      }
    }
  }

  .game_image {
    position: absolute;
    top: 0;
    left: -4px;
    height: 150px;
    width: 190px;
    object-fit: contain;
    z-index: 1;
  }

  .game_bg {
    display: block;
    position: absolute;
    bottom: -24px;
    left: -16px;
    width: 372px;
    height: 172px;
  }

  .game_text {
    position: absolute;
    bottom: 34px;
    right: 12px;
    color: #fff;
    font-family: Inter;
    font-size: 24px;
    font-weight: 700;
    z-index: 1;
  }

  .tabs {
    background: var(--bg_color_L1);
    max-width: 750px;
    margin: 0 auto;
  }

  .tab_item {
    width: 190px;
    height: 100px;
    margin-inline: 5px;
    padding: 0;
    color: var(--text_color_L2);
    border-radius: 10px;
    background: var(--bg_color_L2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      height: 50px;
    }

    span {
      font-size: 24px;
    }
  }

  .tab_active {
    color: var(--text_color_L4);
    background: var(--main_gradient-color) !important;
  }

  ::v-deep(.fun-tabs .fun-tab-item) {
    padding: 14px 0;
  }

  .game-sticky {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 200;
  }

  .game-content {
    margin-top: 15px;
  }
}
</style>
