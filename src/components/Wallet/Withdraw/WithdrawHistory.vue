<template>
  <div class="rechargeh__container">
    <div class="rechargeh__container-head">
      <svg-icon name="historyHead" />
      <h1>{{ $t('whTitle5') }}</h1>
    </div>
    <div class="rechargeh__container-content">
      <template v-if="WithdrawLogList.length > 0">
        <div v-for="(item, index) in WithdrawLogList" :key="index" class="rechargeh__container-content__item">
          <!-- <div class="rechargeh__container-content__item-header ar-1px-b" @click="onToDetail(item.state)"> -->
          <div class="rechargeh__container-content__item-header ar-1px-b">
            <span>{{ $t('withdraw') }}</span>
            <span :class="{ stateR: item.state === 0, stateG: item.state === 1 }">
              {{ getArrayKey(rootConfig.WithdrawState, item.state) }}
              <!-- <van-icon name="arrow" /> -->
            </span>
          </div>
          <div class="rechargeh__container-content__item-body">
            <div>
              <span>{{ $t('amount') }}</span>
              <span>{{ currency(item.price) }}</span>
            </div>
            <div>
              <span>{{ $t('type') }}</span>
              <span>{{ item.withdrawName }}</span>
            </div>
            <div>
              <span>{{ $t('time') }}</span>
              <span>{{ item.addTime }}</span>
            </div>
            <div>
              <span>{{ $t('orderNo') }}</span>
              <span>{{ item.withdrawNumber }}</span>
              <svg-icon name="copy" @click="copy(item.withdrawNumber.toString())" />
            </div>
          </div>
        </div>
      </template>
      <Empty v-else />
    </div>
    <div class="rechargeh__container-footer">
      <button @click="onToWithdrawHistory">{{ $t('allRecords') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { rootConfig } from '@/utils/selectArr/rootConfig'
import { copy, getArrayKey, AwaitApiResult, currency } from '@/utils'
import { GetWithdrawLogF } from '@/api'
import { useCommonStore } from '@/stores'
import type { withdrawLogList } from '@/types/api'
import { useRouter } from 'vue-router'
import Empty from '@/components/Empty/index.vue'
const router = useRouter()

const { setLoading } = useCommonStore()

const WithdrawLogList = ref<withdrawLogList[]>([])
const pageQuery = reactive<any>({
  pageNo: 1,
  pageSize: 5,
  startDate: '',
  endDate: '',
  state: -1,
  type: -1,
})

// 查看全部提现记录
function onToWithdrawHistory () {
  router.push({
    name: 'WithdrawHistory',
  })
}

// 获取提现记录5条
async function getWithdrawLog () {
  setLoading(true)
  const res = await AwaitApiResult(GetWithdrawLogF(pageQuery))
  if (res) {
    WithdrawLogList.value = res.data.list
  }
  setLoading(false)
}
onMounted(async () => {
  await getWithdrawLog()
  // location.reload()
  // nextTick(() => {
  // 	window.location.reload()

  // })
})
defineExpose({
  getWithdrawLog,
})
</script>
<style>
:root {
  --van-tabs-card-height: auto;
}
</style>
<style lang="scss" scoped>
.rechargeh__container {
  // padding-inline: 24px;
  // padding-block: 0 112px;
  margin-top: 60px;
  font-family: $font-family;

  &-head {
    display: flex;
    flex-direction: row;
    align-items: center;

    .svg-icon {
      width: 48px;
      height: 48px;
      margin-right: 15px;
    }

    h1 {
      font-family: 'Inter';
      font-style: normal;
      color: var(--text_color_L1);
      font-weight: 600;
      font-size: 32px;
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
    margin-bottom: 30px;

    &__item {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 24px 10px;
      border-radius: 10px;
      background-color: var(--darkBg, var(--bg_color_L2));

      &-header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding-bottom: 10px;

        span {
          //width: 150px;
          min-width: 150px;
          height: 50px;
          font-size: 28px;
          text-align: center;
          line-height: 50px;
          color: var(--text_color_L2);

          &:first-of-type {
            margin-left: 10px;
            color: #fff;
            background: var(--darkLight, var(--norm_red-color));
            border: 1px solid var(--darkLight, var(--norm_red-color));
            border-radius: 10px;
          }

          &:nth-of-type(2) {
            text-align: left;
            // color: #ff7172;
            // border: 1px solid #ff7172;
          }

          &:last-of-type {
            margin-left: auto;
            text-align: right;
          }

          &.stateR {
            color: var(--norm_red-color);
          }

          &.stateG {
            color: var(--norm_green-color);
          }

          &.inactive {
            // background: #ff7172;
          }
        }
      }

      &-body {
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-size: 24px;
        color: var(--text_color_L2);

        & > div:last-of-type {
          justify-content: space-between;
        }

        & > div {
          display: flex;
          align-items: center;

          //background: #f7f8ff;
          &:first-of-type {
            span {
              &:last-of-type {
                color: var(--norm_secondary-color);
              }
            }
          }

          &:last-of-type {
            span {
              &:last-of-type {
                //color: var(--norm_secondary-color);
                color: #aeb0c6;
                max-width: 70%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }

          span {
            //height: 40px;
            padding: 0 20px;
            //line-height: 60px;
            margin: 5px 0;

            &:first-of-type {
              // flex: 0.45;
              // background: #f1f3ff;
              clip-path: polygon(0 0, 100% 0, 92% 100%, 0 100%);
            }

            &:last-of-type {
              // flex: 0.55;
              //text-align: right;
            }

            &:nth-of-type(2) {
              margin-left: auto;
              text-align: right;
            }
          }

          img {
            width: 30px;
          }
        }
      }
    }
  }

  &-footer {
    button {
      border: 1px solid var(--main-color);
      border-radius: 80px;
      height: 70px;
      width: 95%;
      background: none;
      color: var(--main-color);
      font-size: 30px;
      margin-bottom: 30px;
    }
  }
}
</style>
