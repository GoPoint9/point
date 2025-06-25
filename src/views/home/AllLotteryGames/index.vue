<template>
  <div class="lotteryGames__container">
    <NavBar left-arrow :title="$t('lottery')" @click-left="onClickLeft" />

    <van-tabs
      v-model:active="activeGameTab"
      class="lotteryGames__container-tabBar mgt10"
      type="card"
      color="transparent"
      background="transparent"
      @click-tab="onClickTab"
    >
      <van-tab
        v-for="(item, index) in lotteryGames"
        :key="index"
        :name="index"
        :title="item.title"
      />
    </van-tabs>

    <van-tabs
      v-model:active="activeGameTimeTab"
      class="lotteryGames__container-timeTab"
      color="#ff7172"
      background="#fff"
    >
      <van-tab
        v-for="(item, index) in lotteryGamesTime"
        :key="index"
        :name="index"
        :title="item.title"
      />
    </van-tabs>

    <div ref="allGamesContainer" class="lotteryGames__container-list">
      <GamesList
        v-for="(item, index) in lotteryGamesTime"
        :id="`gamesList-${index}`"
        :key="index"
        :games-list="item"
        :active="getActive(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GamesList from '@/components/Home/AllLotteryGames/index.vue'
import { useSwipe } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const router = useRouter()

const activeGameTab = ref(0)

const activeGameTimeTab = ref(0)

const allGamesContainer = ref<HTMLElement>(null as any)

const lotteryGames = [
  {
    title: t('all'),
    value: 'all',
  },
  {
    title: 'Win Go',
    value: 'winGo',
  },
  {
    title: t('Lotre4d'),
    value: '4DLottery',
  },
  {
    title: 'Lottery',
    value: 'lottery',
  },
  {
    title: 'Xổ số',
    value: 'lotteryVi',
  },
  {
    title: 'Xổ số',
    value: 'lotteryVi',
  },
]

const lotteryGamesTime = [
  {
    title: t('all'),
    value: 'all',
  },
  {
    title: t('minites1'),
    value: '60',
  },
  {
    title: t('minites3'),
    value: '180',
  },
  {
    title: t('minites5'),
    value: '300',
  },
  {
    title: t('minites10'),
    value: '600',
  },
  {
    title: t('minitesLong'),
    value: 'long',
  },
]

function onClickLeft (): void {
  router.go(-1)
}

function getActive (idx: number) {
  return idx === activeGameTab.value ? activeGameTab.value : -1
}

/** ******               scroll behavior handler               *******/
const heightOfNavBarAndTabBar = 46 + 90 + 35 + 16

const heightOfGameListTitle = 16 + 28

const { direction } = useSwipe(allGamesContainer, {
  onSwipeStart: () => {
    onSwiping()
  },
  onSwipe: onSwiping,
  onSwipeEnd: () => {
    onSwiping()
  },
})

function onSwiping () {
  const el = document.getElementById(`gamesList-${activeGameTab.value}`)
  if (el) {
    const { top, bottom } = el.getBoundingClientRect()
    if (bottom - heightOfNavBarAndTabBar - heightOfGameListTitle < 0) {
      if (direction.value === 'UP') activeGameTab.value = activeGameTab.value + 1
    } else if (top - heightOfNavBarAndTabBar - heightOfGameListTitle > 0) {
      if (direction.value === 'DOWN') activeGameTab.value = activeGameTab.value - 1
    }
  }
}

function onClickTab () {
  scrollToView()
}

function scrollToView () {
  const el = document.getElementById(`gamesList-${activeGameTab.value}`)
  if (el) {
    allGamesContainer.value.scrollTo({
      top: el.offsetTop - heightOfNavBarAndTabBar,
      behavior: 'smooth',
    })
  }
}
/** ******               scroll behavior handler               *******/
</script>

<style>
:root {
  --van-tabs-card-height: auto;
}
</style>

<style lang="scss" scoped>
.lotteryGames__container {
  overflow: hidden;

  :deep(.van-nav-bar) {
    background-color: var(--bg_color_L2);

    .van-nav-bar__content {
      .van-nav-bar__left {
        .van-icon {
          color: var(--text_color_L1);
        }
      }
    }
  }

  &-tabBar {
    padding-inline: 12px;

    :deep(.van-tabs__nav--card) {
      height: 74px;
      margin: 0;

      .van-tab--card {
        width: 190px;
        height: 60px;
        margin-right: 10px;
        color: var(--text_color_L2) !important;
        font-size: 26px;
        border-radius: 9rem;
        background: var(--bgDark-2, var(--bg_color_L2));
        box-shadow: var(--BoxShadowColor-42);

        &.van-tab--active {
          color: #fff !important;
          background: var(--main_gradient-color);
          box-shadow: var(--BoxShadowColor-42);
        }

        &:last-of-type {
          display: none;
        }
      }
    }
  }

  &-timeTab {
    padding-inline: 12px;

    :deep(.van-tabs__nav) {
      .van-tab {
        color: var(--text_color_L2) !important;

        &.van-tab--active {
          color: var(--main-color) !important;
        }

        &:last-of-type {
          display: none;
        }
      }
    }
  }

  /*
	* 使用 grid 布局生产的卡片
	* grid-template-columns是设置每行的列数，repeat(2, 1fr)表示每行有两列，每列宽度为1fr(相对宽度)
	* row-gap是设置行间距，column-gap是设置列间距
	* justify-items是设置每个卡片的水平对齐方式，center是居中
	* grid-auto-rows是设置每个卡片的高度
	*/

  &-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    grid-auto-rows: 160px;
    height: calc(100vh - (92px + 74px + 88px + 50px));
    margin-top: 50px;
    overflow: scroll;
  }
}
</style>
