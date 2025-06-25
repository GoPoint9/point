<template>
  <NavBar>
    <template #left>
      <img :src="projectIcon" alt="">
    </template>
    <template #right>
      <div v-if="!globalStore.getToken" class="nav-right">
        <div
          class="nav-btn login"
          @click="
            router.push({
              name: 'login'
            })
          "
        >
          {{ $t('login') }}
        </div>
        <div
          class="nav-btn"
          @click="
            router.push({
              name: 'register'
            })
          "
        >
          {{ $t('register') }}
        </div>
      </div>
      <div v-else class="nav-right">
        <svg-icon name="wallet1" />
        <div class="money">
          <div class="text">{{ $t('balance') }}</div>
          <div>{{ currency(Amount) }}</div>
        </div>
      </div>
    </template>
  </NavBar>
  <div class="p3home">
    <Swiper :is-show-button="true" />
    <NoticeBar />
    <GameList />
    <!-- 中奖信息 -->
    <Winner />
    <!-- 今日盈利排行榜 -->
    <Rank />
    <Team />
  </div>
  <!--下载PWA应用-->
  <DownloadPWA v-if="showPWA && isAppDownloadIcon" />
  <Turntable />
  <van-dialog v-model:show="store.prompt" :confirm-button-text="$t('confirm')" @confirm="closePrompt">
    <div class="promptHeader">{{ $t('prompt') }}</div>
    <div class="promptContent" v-html="promptContent" />
  </van-dialog>
  <Dialog
    v-model:show="store.laundry"
    :show-cancel-btn="false"
    confirm-text="OK"
    :title="$t('congratulations')"
    @confirm="onLaundy"
  >
    <template #content>
      <div class="Laundry-Con">
        <div class="Laundry-Con_tip">{{ $t('getSuper') }}</div>
        <div class="Landty-Con-tips">{{ $t('getRewards') }}</div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Swiper from '@/components/Home/Swiper/index.vue'
import NoticeBar from '@/components/Home/NoticeBar/index.vue'
import GameList from '@/components/Home/Public3Home/gameList.vue'
import Winner from '@/components/Home/Public3Home/winner.vue'
import Rank from '@/components/Home/DailyProfitRank/index.vue'
import Team from '@/components/Home/Public3Home/team.vue'
import Dialog from '@/components/common/HomeDialog.vue'
import { GlobalStore } from '@/stores'
import { useDialog, useHome } from '@/hooks'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { currency, AwaitApiResult } from '@/utils'
import { GetBalance } from '@/api'
import Turntable from '@/components/common/Turntable.vue'
import DownloadPWA from '@/components/common/DownloadPWA.vue'
const { projectIcon, isAppDownloadIcon, showPWA } = useHome()
const globalStore = GlobalStore()
const router = useRouter()
const { closeLaundry, closePrompt, store, promptContent } = useDialog()
// 钱包金额
const Amount = ref(0)
/**
 * @description:
 * @param {*} isShowT
 * @return {*}
 */
const getWinsUserAmount = async (isShowT: boolean = true) => {
  const res = await AwaitApiResult<any>(GetBalance())
  if (res) {
    Amount.value = res?.data.amount || 0
  }
}
const onLaundy = () => {
  closeLaundry()
  router.push({
    name: 'SuperJackpot',
  })
}
onMounted(() => {
  if (globalStore.getToken) {
    getWinsUserAmount()
  }
})
</script>
<style lang="scss" scoped>
.p3home {
  padding: 0 24px 160px 24px;
  .swiper_box {
    padding: 0;
  }
}
img {
  height: 60px;
  width: auto;
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
  .nav-btn {
    border: 1px solid var(--main-color);
    color: var(--main-color);
    box-sizing: border-box;
    height: 60px;
    line-height: 60px;
    padding: 0 36px;
    border-radius: 10px;
    font-size: 24px;
    &.login {
      background: var(--main_gradient-color);
      color: var(--text_color_L4);
    }
  }
  svg {
    width: 48px;
    height: 48px;
  }
  .money {
    color: var(--main-color);
    .text {
      color: var(--text_color_L2);
    }
  }
}
.noticeBar__container {
  width: calc(100% - 56px);
  margin: 40px auto;
  background-color: var(--bg_color_L2);
}

/**首页公告弹窗样式 */

.promptHeader {
  background: var(--light-main_gradient-color, var(--bg_color_L3));
  text-align: center;
  height: 88px;
  line-height: 88px;
  color: #ffffff;
  font-weight: 700;
  font-size: 36px;
}

.promptContent {
  overflow-y: auto;
  max-height: 60vh;
}
</style>
