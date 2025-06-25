<template>
  <div class="settingPanel__container">
    <div class="settingPanel__container-items">
      <div
        v-for="item in settingPanelItems"
        v-show="item.isopen == '1'"
        :key="item.title"
        v-haspermission="item.haspermission"
        class="settingPanel__container-items__item ar-1px-b"
        @click="handleItem(item)"
      >
        <div class="settingPanel__container-items__title">
          <svg-icon :name="`${item.name}`" />
          <!-- <img :src="getIcons('main', `${item.icon}`)" /> -->
          <span>{{ item.title }}</span>
        </div>
        <div class="settingPanel__container-items-right">
          <h5 v-show="item.name === 'notification' && userInfo?.unRead > 0">
            {{ userInfo?.unRead }}
          </h5>
          <span v-show="item.name === 'language'">{{ globalStore.getLanguageName }}</span>
          <van-icon name="arrow" color="#666" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/stores'
import { computed, ref } from 'vue'
import { getIcons } from '@/utils'
import { useRouter } from 'vue-router'
import type { UserInfo } from '@/types/api'
import { useI18n } from 'vue-i18n'
import { useSessionStorage } from '@vueuse/core'
const { t } = useI18n()
const router = useRouter()
const globalStore = GlobalStore()
// 查询是否开启积分商城
const userInfo = computed(() => {
  return globalStore.userInfo as UserInfo
})
let permission: any = useSessionStorage('permission', null)
permission && (permission = JSON.parse(permission.value))
const isOpenChampion = computed(() => {
  return userInfo.value.isOpenChampion
})
const settingPanelItems = ref([
  {
    name: 'notification',
    title: t('notifications'),
    link: 'Messages',
    isopen: '1',
  },
  {
    name: 'gifts',
    title: t('giftExchange'),
    link: 'RedeemGift',
    isopen: '1',
  },
  {
    name: 'tournament',
    title: t('cpsTip6'),
    link: 'MyCps',
    isopen: isOpenChampion,
  },
  {
    name: 'productCode',
    title: t('productOrder'),
    link: 'PointMall-MyOrders',
    isopen: userInfo.value.isOpenPointMall,
  },
  {
    name: 'myDraw',
    title: t('MyLottery'),
    link: 'PointMall-MyLottery',
    isopen: userInfo.value.isOpenPointMall,
  },
  {
    name: 'statsIcon',
    title: t('gameStatistics'),
    link: 'GameStats',
    isopen: '1',
    haspermission: 17,
  },
  {
    name: 'language',
    title: t('switchLanguages'),
    link: 'Language',
    isopen: '1',
  },
])

function handleItem (item: any) {
  router.push({
    name: item.link,
  })
}
</script>

<style lang="scss" scoped>
.settingPanel__container {
  padding: 0 20px 10px;
  border-radius: 20px;
  background: var(--darkBg, var(--bg_color_L2));

  h1 {
    margin-bottom: 20px;
    color: var(--darkTextW, var(--text_color_L1));
    font-size: 30px;
  }

  &-items {
    display: flex;
    flex-direction: column;
    color: var(--text_color_L1);
    padding-bottom: 20px;

    &__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 28px;
      padding: 25px 0;

      svg {
        width: 60px;
        height: 60px;
      }
      span {
        color: var(--text_color_L1);
      }
      &:last-child {
        &.ar-1px-b {
          &::after {
            content: none;
          }
        }
      }
    }

    &__title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 12px;
      svg {
        color: var(--main-color);
      }
    }

    &-right {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      span {
        font-size: 28px;
        padding-right: 30px;
        color: var(--text_color_L1);
      }

      h5 {
        font-size: 24px;
        color: #fff;
        border-radius: 32px;
        margin-right: 30px;
        background: var(--norm_red-color);
        height: 32px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
