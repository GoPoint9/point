<template>
  <div class="promotion-page">
    <NavBar
      class="white"
      :title="$t('titleInvitationRule')"
      left-arrow
      @click-left="router.go(-1)"
    />
    <div class="promotion-mian">
      <div class="promotion-mian__title">
        <h1>{{ $t('tipPromotionPartner') }}</h1>
        <p>{{ $t('tipActivityValidForLongTime') }}</p>
      </div>

      <div v-for="(item, index) in rulesTop" :key="index" class="promotion-box ruleHead">
        <svg-icon name="ruleHead" />
        <div class="promotion-title">
          {{ item.title }}
        </div>
        <div class="promotion-txt">
          <p v-html="item.content" />
          <!-- {{ item.content }} -->
        </div>
      </div>
      <!-- 等级列表 -->
      <div class="promotion-grade">
        <div class="promotion-grade-th">
          <div class="item">{{ $t('rebateLevel') }}</div>
          <div class="item">{{ $t('teamMembers') }}</div>
          <div class="item">{{ $t('teamStream') }}</div>
          <div class="item">{{ $t('teamRecharge') }}</div>
        </div>
        <div v-for="(item, index) in PromotionArrlist" :key="index" class="promotion-grade-tr">
          <div class="item">
            <div class="icon-LV">
              <span class="txt">L{{ item.lv }}</span>
            </div>
          </div>
          <div class="item">{{ item.lvCount }}</div>
          <div class="item">{{ digitalCarry(item.lotteryAmount) }}</div>
          <div class="item">{{ digitalCarry(item.rechargeAmount) }}</div>
        </div>
      </div>

      <div class="promotion-box ruleHead">
        <svg-icon name="ruleHead" />
        <div class="promotion-title">06</div>
        <div class="promotion-txt">
          {{ $t('promotionRuleDesc5') }}
          <p>{{ $t('promotionRuleRedTXT') }}</p>
          <div class="txt" @click="router.push({ name: 'RebateRatio' })">
            {{ $t('lookRerbate') }}
          </div>
        </div>
      </div>
      <div v-for="(item, index) in rulesBottom" :key="index" class="promotion-box ruleHead">
        <svg-icon name="ruleHead" />
        <div class="promotion-title">
          {{ item.title }}
        </div>
        <div class="promotion-txt">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { digitalCarry } from '@/utils'
import { GetTotalRebateRules } from '@/api'
import { computed, onMounted, ref } from 'vue'
import type { PromotionRebateData } from '@/types/api'
import { SettingStore } from '@/stores'
import { useI18n } from 'vue-i18n'
const { t: $t } = useI18n()
const router = useRouter()

// 推广文本
const lotName = computed(() => SettingStore().getProjectName)
const rulesTop = [
  {
    title: '01',
    content: $t('promotionRuleDesc1'),
  },
  {
    title: '02',
    content: $t('promotionRuleDesc2'),
  },
  {
    title: '03',
    content: $t('promotionRuleDesc3'),
  },
  {
    title: '04',
    content: $t('promotionRuleDesc6', ['01:00']),
  },
  {
    title: '05',
    content: $t('promotionRuleDesc4') + '<br/>' + $t('proRule1'),
  },
]
const rulesBottom = [
  {
    title: '07',
    content: $t('tipTop20RankingAdditionalRewords'),
  },
  {
    title: '08',
    content: $t('tipInterpretationRightSaved', [lotName.value]),
  },
]
// 返佣等级表
const PromotionArrlist = ref<PromotionRebateData[]>()

const promotionTutorialData = async () => {
  try {
    const res = await GetTotalRebateRules()
    PromotionArrlist.value = res
  } catch (err) {
    console.log(err)
  }
  // const res = await promotionTutorial()
}

onMounted(() => {
  promotionTutorialData()
})
</script>

<style lang="scss" scoped>
.icon-LV {
  height: 46px;
  width: 100px;
  background: url('@icon/promotion/lv.png') no-repeat center center;
  background-size: cover;
  position: relative;
  text-align: center;
  .txt {
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 30px;
    line-height: 32px;
    width: 52px;
    background: linear-gradient(180deg, #fffba9 0%, #fff670 56.13%, #ffd180 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
}
.promotion-page {
  padding-inline: 26px;
  padding-block: 0 112px;
  font-family: $font-family;
  .promotion-mian {
    padding-top: 30px;
    .promotion-mian__title {
      text-align: center;
      margin-bottom: 50px;
      h1 {
        margin-bottom: 15px;
        color: var(--main-color);
        font-size: 36px;
        line-height: 36px;
        font-weight: 600;
      }
      p {
        color: var(--text_color_L2);
        font-size: 28px;
      }
    }
    .promotion-box {
      position: relative;
      padding: 43px 18px 25px;
      border-radius: 16px;
      background: var(--bg_color_L2);
      margin-bottom: 50px;
      .promotion-title {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 160px;
        height: 40px;
        color: var(--text_color_L1);
        font-size: 24px;
        text-align: center;
        line-height: 40px;
        z-index: 1;
      }
      .promotion-txt {
        color: var(--text_color_L2);
        font-size: 24px;
        letter-spacing: 1px;
        line-height: 38px;
        padding-top: 35px;
        .txt {
          color: var(--norm_red-color);
        }
      }
      &:nth-of-type(6) {
        margin-bottom: 0;
        border-bottom: none;
        .promotion-txt {
          padding-bottom: 80px;
        }
      }
    }
    .promotion-grade {
      overflow: hidden;
      margin-bottom: 50px;
      &-th {
        display: flex;
        height: 100px;
        color: #fff;
        font-size: 26px;
        line-height: 100px;
        background: var(--light-main-color, var(--sheet_nva_color));
        border-radius: 16px 16px 0px 0px;
        text-align: center;
        .item {
          flex: 1;
        }
      }
      &-tr {
        display: flex;
        width: calc(100% + 1px);
        background-color: var(--bgDark-3, var(--bg_color_L2));
        margin: 0 -1px;
        color: var(--text_color_L2);
        &:nth-child(odd) {
          background: var(--sheet_detail_bg_color);
        }
        .item {
          display: flex;
          align-items: center;
          justify-content: center;
          width: calc(33.3%);
          height: 70px;
          padding: 5px 0;
          font-size: 26px;
          margin-bottom: -1px;
          margin-right: -1px;
        }
      }
    }
    .promotion-content {
      width: 100%;
      margin-bottom: 40px;
      overflow: hidden;
      &_title {
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 21px;
        font-size: 28px;
        font-weight: 600;

        &::before {
          content: '';
          display: block;
          width: 6px;
          height: 30px;
          margin-right: 17px;
          background-color: var(--main-color);
        }
      }
    }
  }
}
</style>
