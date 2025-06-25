<template>
  <div class="activity-wrapper">
    <div class="activity-banner">
      <div>
        <div class="banner-title">{{ $t('activity') }}</div>
        <div class="banner-para">{{ $t('activityTip1') }}</div>
        <div class="banner-para">{{ $t('activityTip2') }}</div>
      </div>
    </div>
    <div class="activity-panel">
      <template v-if="ActiveSotre.isFinishUserGuidelines && ActiveSotre.isOpenActivityAward">
        <van-popover
          v-model:show="ActiveSotre.isFinishUserGuidelines"
          :overlay="true"
          placement="top-start"
          :close-on-click-overlay="false"
          class="arPopover"
          @close="closeDetail"
        >
          <div class="msg-window">
            <div class="msg-header">{{ $t('activityTip8') }}</div>
            <div class="msg-footer">
              <div @click="goDetail">
                <span>{{ $t('dragonEntry') }}</span>
                <van-icon name="arrow-double-right" color="var(main-color)" />
              </div>
            </div>
          </div>
          <template #reference>
            <div class="nowidth" />
          </template>
        </van-popover>
      </template>
      <div class="activity-panel-header" :class="['lg' + showLength]">
        <template v-for="item in navList">
          <div v-if="item.show" class="header-item" @click="goPath(item.goPath)">
            <van-badge
              :content="item.noread"
              max="99"
              :show-zero="false"
              color="#FA5B5B"
            >
              <div :class="[item.icon, 'bgcontainer']" />
            </van-badge>
            <span>{{ item.name }}</span>
          </div>
        </template>
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
    <div v-if="ActiveSotre.isOpenChampion == 1" class="cardBox">
      <Card
        v-model:is-refresh="isRefresh"
        :item-d="championEntranceVO"
        :state="championEntranceVO.state"
        bg-img-width="100%"
        bg-img-height="150px"
        @click="() => router.push({ name: 'Championship' })"
      />
    </div>

    <van-list
      v-model:loading="loading"
      :finished="finished"
      :finished-text="t('noMoreThere')"
      @load="onLoad"
    >
      <div class="activitySection__container">
        <div
          v-for="(item, index) in activityList"
          :key="index"
          class="box"
          @click="onClick(item)"
        >
          <img :src="item.bannerUrl" :class="`act_${index}`" @error="fixIcons(item, index)">
          <div class="box-content">
            <div class="box-title">
              {{ item.bannerTitle }}
            </div>
          </div>
        </div>
      </div>
    </van-list>
    <Empty v-if="isShowEmpty" />

    <van-dialog
      v-if="allUnAwardCount > 0 && ActiveSotre.isOpenActivityAward"
      v-model:show="ActiveSotre.isFirstUserDayRequest"
      :show-confirm-button="false"
      class-name="noOverHidden"
    >
      <div class="dialog-window">
        <div class="dialog-wrapper">
          <img v-lazy="getIconsPublic('activity/DailyTask', 'present')">
          <div class="dialog-title">
            {{ $t('activityTip5') }} <span>{{ allUnAwardCount }}</span>
          </div>
          <div class="dialog-para">
            {{ $t('activityTip6') }}
          </div>
          <div class="dialog-btn" @click="closeweekily(true)">{{ $t('activityTip7') }}</div>
          <div class="dialog-footer" @click="closeweekily()">
            <img v-lazy="getIconsPublic('activity/DailyTask', 'close')">
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { AwaitApiResult, getIcons, getIconsPublic } from '@/utils'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import type { ActivityList } from '@/types/api'
import { useI18n } from 'vue-i18n'
import { nextTick, ref, computed, watch, onMounted } from 'vue'
import { useActive } from '@/components/common/use'
import { GetActivityList } from '@/api'
import Card from '@/components/Activity/Championship/card.vue'
import { useChampionship } from '@/hooks'
import Empty from '@/components/Empty/index.vue'
const { ActiveSotre, saveUserGuidelines, saveUserDayRequest, getDailyAwardCount, allUnAwardCount, getActive } = useActive()

const { championEntranceV, championEntranceVO } = useChampionship()
watch(
  () => ActiveSotre.value.isOpenChampion,
  (newValue) => {
    if (newValue == 1) {
      championEntranceV()
    }
  }
)
const isRefresh = ref(false)
watch(isRefresh, (val) => {
  if (isRefresh.value) {
    championEntranceV()
  }
})

const showDialog = ref(true)
const showMsg = ref(true)
const activityList = ref<ActivityList[]>([])
const { t } = useI18n()
const loading = ref(false)
const finished = ref(false)
const pageNo = ref(1)
const isShowEmpty = ref(false)

const router = useRouter()
const navList = computed(() => [
  {
    name: t('actTip1'),
    icon: 'a1',
    goPath: 'DailyTasks',
    noread: allUnAwardCount.value,
    show: ActiveSotre.value.isOpenActivityAward,
  },
  { name: t('invitationBonus'), icon: 'a2', goPath: 'InvitationBonus', noread: 0, show: ActiveSotre.value.isTaskState },
  { name: t('laundryAmount'), icon: 'a3', goPath: 'Laundry', noread: 0, show: ActiveSotre.value.isOpenWashCode },
  {
    name: t('superjackpot'),
    icon: 'a4',
    goPath: 'SuperJackpot',
    noread: ActiveSotre.value.unJackpotCount,
    show: ActiveSotre.value.isOpenJackpotReward,
  },
  {
    name: t('newMenberPackage'),
    icon: 'a5',
    goPath: 'MemberPackage',
    noread: 0,
    show: ActiveSotre.value.newMemberGiftPackageSwitch,
  },
])
const showLength = computed(() => {
  return navList.value.filter((item) => item.show).length
})
defineProps({
  activityList: {
    type: Array<ActivityList>,
    default: () => {},
  },
})

function onClick (item: any) {
  let url
  const { bannerID: id, jumpType, contents } = item
  if (jumpType == 2) {
    if (contents.startsWith('/')) {
      router.push({
        path: contents,
      })
      return
    }
    window.location.assign(contents)
    return
  }
  switch (id) {
    case 1:
      url = 'DailyTasks' // 每日签到
      break
    case 2:
      url = 'PointMall' // 积分商城
      break
    case 3:
      url = 'InvitationBonus' // 邀请好友
      break
    default:
      url = 'ActivityDetail'
      break
  }
  if (url == 'ActivityDetail') {
    router.push({
      name: url,
      query: { id },
    })
  } else {
    url &&
      router.push({
        name: url,
      })
  }
}

const fixIcons = (item: any, index: any) => {
  item.bannerUrl = getIconsPublic('images', 'avatar')

  nextTick(() => {
    const dom: any = document.querySelector(`.act_${index}`)
    dom.src = item.bannerUrl
    dom.style.objectFit = 'contain'
  })
}

const goPath = (path: any) => {
  router.push({ name: path })
}
const goDetail = () => {
  saveUserGuidelines()
  goPath('DailyTasks')
}
const closeDetail = () => {
  showMsg.value = false
  showDialog.value = false
}
const closeweekily = (val: any = null) => {
  saveUserDayRequest()
  if (val) {
    closeDetail()
    goPath('DailyTasks')
  }
}
const onLoad = async () => {
  const res: any = await AwaitApiResult(GetActivityList({ pageNo: pageNo.value, pageSize: 20 }))
  if (res) {
    if (res.data.totalCount == 0) isShowEmpty.value = true
    if (res.data.totalPage <= pageNo.value) finished.value = true
    if (res.data.list) activityList.value.push(...res.data.list)
    pageNo.value++
  } else {
    finished.value = true
  }
  loading.value = false
}

onMounted(async () => {
  await getActive()
  if (ActiveSotre.value.isOpenActivityAward) getDailyAwardCount()
  if (ActiveSotre.value.isOpenChampion == 1) {
    championEntranceV()
  }
})

onBeforeRouteLeave(() => {
  showMsg.value = false
  showDialog.value = false
})
</script>

<style lang="scss" scoped>
.activity-wrapper {
  .activitySection__container {
    display: flex;
    flex-direction: column;
    gap: 26px;
    width: 100%;
    padding-left: 24px;
    padding-right: 24px;

    & > .box {
      width: 100%;
      border-radius: 20px;
      background: var(--darkBg, var(--bg_color_L2));
      overflow: hidden;
      color: var(--darkTextW, var(--text_color_L1));

      & > .box-content {
        padding: 18px 24px;
        line-height: 24px;

        .box-title {
          font-size: 30px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        p {
          font-size: 24px;
          color: var(--text_color_L2);
        }
      }

      img {
        width: 100%;
        height: 260px;
      }
    }
  }
  .activity-banner {
    color: #fff;
    font-size: 24px;
    font-style: normal;
    min-height: 150px;
    background: var(--light-main_gradient-color, var(--bg_color_L2));
    padding: 24px;
    display: flex;
    align-items: center;
    .banner-title {
      font-size: 36px;
      margin-bottom: 20px;
    }
    .banner-para {
      margin-bottom: 5px;
    }
  }
  .activity-panel {
    padding: 24px;
    &-header {
      display: flex;
      align-items: self-start;
      justify-content: space-between;
      &.lg3 {
        padding: 0 44px;
      }
      &.lg2 {
        padding: 0 127px;
      }
      &.lg1 {
        justify-content: center;
      }
      &.lg5 {
        flex-wrap: wrap;
        .header-item {
          width: 160px;
          margin-bottom: 20px;
        }
      }
      .header-item {
        display: flex;
        flex-direction: column;
        color: var(--text_color_L2);
        width: 100px;
        align-items: center;
        text-align: center;
        // flex: 1;
        .bgcontainer {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          padding: 10px;
          margin-bottom: 22px;
          &::after {
            content: '';
            display: block;
            width: 60px;
            height: 60px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 60px;
          }
          &.a1 {
            background: url('@/assets/icons/activity/Home/activityReward.png') no-repeat;
            background-position: center;
            background-size: 80px, 80px;
          }
          &.a2 {
            background: url('@/assets/icons/activity/Home/invitationBonus.png') no-repeat;
            background-position: center;
            background-size: 80px, 80px;
          }
          &.a3 {
            background: url('@/assets/icons/activity/Home/BettingRebate.png') no-repeat;
            background-position: center;
            background-size: 80px, 80px;
          }
          &.a4 {
            background: url('@/assets/icons/activity/Home/superJackpot.png') no-repeat;
            background-position: center;
            background-size: 80px, 80px;
          }
          &.a5 {
            background: url('@/assets/icons/activity/Home/memberGift.png') no-repeat;
            background-position: center;
            background-size: 80px, 80px;
          }
        }
      }
    }
    &-content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 20px;
      .content-title {
        width: calc((100% - 18px) / 2);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        background: var(--darkBg, var(--bg_color_L2));
        border-radius: 10px;
        padding-bottom: 20px;
        box-shadow: var(--BoxShadowColor-35);
        .content-para {
          color: var(--darkTextW, var(--text_color_L1));
          font-weight: bold;
          padding: 10px 20px;
          font-size: 28px;
        }
        p {
          padding: 5px 20px;
          color: var(--text_color_L2);
        }
      }
    }
  }
  .dialog-wrapper {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 345px;
      height: 345px;
      position: relative;
      margin-top: -160px;
    }
    .dialog-title {
      color: var(--text_color_L1);
      margin-bottom: 10px;
      font-size: 30px;
      padding: 0 12px;
      span {
        color: var(--norm_red-color);
        font-weight: bold;
        font-size: 36px;
      }
    }
    .dialog-para {
      color: var(--text_color_L2);
      font-size: 24px;
      padding: 0 20px;
    }
    .dialog-btn {
      width: 420px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      background: var(--GradiantBlue, var(--main_gradient-color));
      border-radius: 80px;
      font-weight: bold;
      color: var(--text_color_L4);
      font-size: 32px;
      margin-top: 80px;
    }
    .dialog-footer {
      position: relative;
      bottom: -110px;
      img {
        width: 60px;
        height: 60px;
      }
    }
  }

  .cardBox {
    padding: 0 20px;
  }
}
:deep() .van-dialog.MsgRadius {
  border-radius: 10px;
}
:deep() .van-dialog.noOverHidden {
  overflow: inherit;
}
.nowidth {
  width: 0;
  flex: none;
}
</style>
