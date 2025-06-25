<!-- 玩法和规则 -->
<template>
  <div class="vietnamPlay__C">
    <NavBar
      left-arrow
      :title="$t('lotteryManual')"
      background-color="linear-gradient(90deg, #F95959 0%, #FF9A8E 100%)"
      @click-left="backGo"
    />
    <van-tabs v-model:active="active" type="card" :class="{ dis: gVSs == '2' }">
      <van-tab :title="$t('gamePlay')">
        <div v-if="type == '1'" class="play">
          <NorthPlay />
        </div>
        <div v-else class="play">
          <SorthPlay />
        </div>
      </van-tab>
      <van-tab v-if="gVSs != '2'" :title="$t('rule')">
        <div v-if="type == '1'" class="northrule">
          <NorthRule />
        </div>
        <div v-else class="sorthrule">
          <SorthRule />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import NorthPlay from '@/components/Home/AllLotteryGames/NewVietnam/NorthPlay.vue'
import NorthRule from '@/components/Home/AllLotteryGames/NewVietnam/NorthRule.vue'
import SorthPlay from '@/components/Home/AllLotteryGames/NewVietnam/SorthPlay.vue'
import SorthRule from '@/components/Home/AllLotteryGames/NewVietnam/SorthRule.vue'
import { ref } from 'vue'
const router = useRouter()
// 定义recode内容
const active = ref(0)

const type = router.currentRoute.value.query.id
const gVSs = router.currentRoute.value.query?.gVSs?.toString() || ''

// 返回上一页
const backGo = () => {
  router.go(-1)
}
</script>
<style lang="scss" scoped>
.vietnamPlay__C {
  width: 100%;

  :deep(.van-tabs__wrap) {
    margin: 26px 0;
    height: 80px;
    line-height: 80px;

    .van-tabs__nav {
      height: 80px;
      line-height: 80px;
      background: var(--darkBg, var(--bg_color_L2));
      border: 1px solid var(--darkBg, var(--bg_color_L2));
      border-radius: 10px;
      overflow: hidden;
    }

    .van-tab--card {
      color: var(--text_color_L2);
      font-size: 32px;
      border-right: none;
    }

    .van-tab--active {
      border-radius: 10px;
      background: var(--linerGradien-94, var(--main_gradient-color2));
      border-right: 1px solid var(--walletBgColor-1);
      color: #fff;
    }
  }

  .northrule,
  .sorthrule {
    margin: 32px 24px;
  }
  .dis {
    :deep(> .van-tabs__wrap:first-of-type) {
      display: none;
    }
  }
}
</style>
