<template>
  <div class="redeem-container">
    <div class="redeem-container-header">
      <NavBar :title="$t('gift')" left-arrow @click-left="router.go(-1)" />
      <div class="redeem-container-header-belly">
        <img v-lazy="getIconsPublic('main', 'gift')" alt="">
      </div>
    </div>

    <div class="redeem-container-content">
      <div class="redeem-container-receive">
        <p>{{ $t('tipHelloVIP') }}</p>
        <p>{{ $t('tipWepreparedGift4u') }}</p>
        <h4>{{ $t('tipPlsEnterRedeemCode') }}</h4>
        <input
          v-model="giftCode"
          type="text"
          auto-complete="new-password"
          autocomplete="off"
          :placeholder="$t('tipPlsEnterCode')"
        >
        <h5 v-if="isHaveBank">{{ $t('tipPlsBindBankcard') }}</h5>
        <button @click="exchangeGif()">
          {{ $t('receive') }}
        </button>
      </div>
      <div class="redeem-container-record">
        <div class="redeem-container-record-title">
          <svg-icon name="giftHistory" />
          <!-- <img :src="getIcons('main', 'gRecord')" /> -->
          <span>{{ $t('record') }}</span>
        </div>
        <div class="redeem-container-record-itemsBox">
          <List
            v-model:list="RedpagePageData.list"
            v-model:page-query="qeuryParms"
            :api="getRedpagePageList"
            :distance="20"
            :is-auto-load="isAutoLoad"
          >
            <template #content>
              <div v-for="item in RedpagePageData.list" :key="item.reserved" class="redeem-container-record-items">
                <div class="redeem-container-record-item ar-1px-b">
                  <div class="redeem-container-record-item-left">
                    <h5>{{ $t('receiveSuccess') }}</h5>
                    <span>{{ item.addTime }}</span>
                  </div>
                  <div class="redeem-container-record-item-right">
                    <img :src="getIcons('main', 'gold')">
                    <span>{{ item.amount }}</span>
                  </div>
                </div>
              </div>
            </template>
          </List>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ConversionRedpage, getRedpagePageList } from '@/api'
import type { RedpagePageList, getRedpagePageParams } from '@/types/api'
import { getIcons, AwaitApiResult, getIconsPublic } from '@/utils'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showDialog, showSuccessToast } from 'vant'
import { useI18n } from 'vue-i18n'
import List from '@/components/common/List.vue'

const { t } = useI18n()

const isHaveBank = ref(false) // 是否有银行卡
const router = useRouter()
const route = useRoute()
const giftCode = ref(route.query.hbcode || '')
const isAutoLoad = ref(true)

const qeuryParms = reactive<getRedpagePageParams>({
  pageSize: 10,
  pageNo: 1,
  startDate: null,
  endDate: null,
})

const RedpagePageData = ref<RedpagePageList>({
  list: [],
  pageNo: 0,
  totalPage: 0,
  totalCount: 0,
})

/**
 * @description: 兑换奖励
 * @return {*}
 */
const exchangeGif = async (): Promise<void> => {
  if (giftCode.value.trim() === '') {
    showDialog({
      message: t('tipPlsEnterCode'),
    })
    return
  }
  const res = await AwaitApiResult(ConversionRedpage({ giftCode: giftCode.value }))
  if (res) {
    showSuccessToast(t('redeemDialogDesc1'))
    giftCode.value = ''
    getList()
  }
}
/**
 * @description: 获取兑换列表
 * @return {*}
 */
const getList = async () => {
  const res = await AwaitApiResult(getRedpagePageList(qeuryParms))
  if (res) {
    RedpagePageData.value.list = res?.data.list
  }
}
</script>

<style lang="scss" scoped>
.redeem-container {
  &-header {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 438px;
    background: var(--main_gradient-color);

    &-belly {
      img {
        width: 750px;
        height: 365px;
        background-position: cover;
      }

      display: flex;
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &-receive {
    height: 550px;
    width: calc(100% - 48px);
    background: var(--bg_color_L2);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 25px 35px;
    margin-top: 30px;

    p {
      font-size: 28px;
      color: var(--text_color_L2);
      padding-top: 12px;
    }

    h4 {
      font-size: 28px;
      color: var(--text_color_L1);
      margin-top: 68px;
    }

    input {
      width: 100%;
      height: 80px;
      background: var(--bg_color_L1);
      border-radius: 60px;
      border: none;
      font-size: 30px;
      color: var(--text_color_L1);
      padding: 22px 42px;
      margin-top: 26px;
    }

    input::placeholder {
      font-size: 30px;
      color: var(--text_color_L3);
    }

    h5 {
      font-size: 24px;
      color: var(--main-color);
      margin-top: 12px;
      padding-left: 27px;
    }

    button {
      width: 100%;
      height: 80px;
      line-height: 80px;
      text-align: center;
      background: var(--main_gradient-color);
      border-radius: 80px;
      font-size: 30px;
      color: var(--text_color_L4);
      border: none;
      margin-top: 56px;
    }
  }

  &-record {
    margin: 30px 0 22px;
    width: calc(100% - 48px);
    padding: 26px 24px;
    // height: 642px;
    background: var(--darkBg, var(--bg_color_L2));
    border-radius: 20px;

    &-title {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      svg {
        width: 48px;
        height: 48px;

        padding-right: 10px;
      }

      span {
        font-size: 30px;
        color: var(--darkTextW, var(--text_color_L1));
      }
    }

    &-itemsBox {
      height: 650px;
      overflow-y: auto;
    }

    &-item {
      padding: 34px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 48px;
      }

      &-left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;

        h5 {
          font-size: 30px;
          color: var(--norm_green-color);
        }

        span {
          padding-top: 20px;
          font-size: 24px;
          color: var(--text_color_L2);
        }
      }

      &-right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 190px;
        height: 40px;
        border: 0.5px solid var(--norm_secondary-color);
        border-radius: 10px;
        padding: 0 15px;

        img {
          margin-top: -4px;
          width: 30px;
        }

        span {
          font-size: 26px;
          color: var(--norm_secondary-color);
        }
      }
    }
  }
}
</style>
