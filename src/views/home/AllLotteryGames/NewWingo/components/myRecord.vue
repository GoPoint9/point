<template>
  <div class="my_r">
    <div class="my_r-body">
      <div v-if="mayrecord.length" class="list">
        <div v-for="(item, index) in mayrecord" :key="index">
          <div class="list-item" @click.stop.prevent="Emerd(index)">
            <div class="list-item-l">
              <div :class="['list-item-l-' + item.selectType]">
                {{ changeText(item.selectType) }}
              </div>
            </div>
            <div class="list-item-m">
              <div class="list-item-m-top">
                {{ item.issueNumber }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  :class="{ r: index == showIndexRe }"
                  width="9"
                  height="8"
                  viewBox="0 0 9 8"
                  fill="none"
                >
                  <path
                    d="M5.21907 7.57895C4.89494 8.14035 4.08463 8.14035 3.7605 7.57895L0.114077 1.26316C-0.210049 0.701754 0.195109 -5.66721e-08 0.843362 0L8.13621 6.37561e-07C8.78446 6.94233e-07 9.18962 0.701755 8.86549 1.26316L5.21907 7.57895Z"
                    fill="#323536"
                  />
                </svg>
              </div>
              <div class="list-item-m-bottom">{{ item.addTime }}</div>
            </div>
            <div v-if="item.profitAmount" class="list-item-r" :class="{ success: item.state }">
              <div v-if="item.profitAmount" :class="{ success: item.state }">
                {{ item.state ? $t('success') : $t('fail') }}
              </div>
              <span>{{ `${item.state ? '+' : '-'}${currency(item.profitAmount)}` }}</span>
            </div>
          </div>
          <div v-if="index == showIndexRe" class="list-detail">
            <div class="list-detail-text">{{ $t('detailMay') }}</div>
            <div v-if="item.orderNumber" class="list-detail-line">
              <span>{{ $t('orderNoMay') }}</span>
              <div @click="copy(item.orderNumber)">
                {{ item.orderNumber }}
                <svg-icon name="copy" />
              </div>
            </div>
            <div class="list-detail-line">
              <span>{{ $t('issueMay') }}</span>
              <div>{{ item.issueNumber }}</div>
            </div>
            <div class="list-detail-line">
              <span>{{ $t('amountMay') }}</span>
              <div>{{ currency(item.amount) }}</div>
            </div>
            <div class="list-detail-line">
              <span>{{ $t('numMay') }}</span>
              <div>{{ item.betCount }}</div>
            </div>
            <div class="list-detail-line">
              <span>{{ $t('afterTaxAmount') }}</span>
              <div class="red">{{ currency(item.realAmount) }}</div>
            </div>
            <div class="list-detail-line">
              <span>{{ $t('tax') }}</span>
              <div>{{ currency(item.fee) }}</div>
            </div>
            <div class="list-detail-line">
              <span>{{ $t('resultMay') }}</span>
              <div v-if="item.number">
                <div class="list-inlineB">{{ item.number }}</div>
                <div class="list-inlineB" :class="[cssTextColor(Number(item.number))]">
                  {{ changeTextColor(Number(item.number)) }}
                </div>
                <div v-if="item.number == 0 || item.number == 5" class="list-inlineB purpleColor">
                  {{ $t('purpleColor') }}
                </div>
                <div class="list-inlineB" :class="[Number(item.number) > 4 ? 'big' : 'small']">
                  {{ Number(item.number) > 4 ? $t('big') : $t('small') }}
                </div>
              </div>
              <div v-else>--</div>
            </div>
            <div class="list-detail-line">
              <span>{{ $t('selectMay') }}</span>
              <div>{{ changeTextSelect(item.selectType) }}</div>
            </div>
            <div class="list-detail-line">
              <span>{{ $t('statusMay') }}</span>
              <div v-if="item.state != 2" :class="[item.state ? 'green' : 'red']">
                {{ item.state ? $t('success') : $t('fail') }}
              </div>
              <div v-else>{{ $t('k3RecordDesc9') }}</div>
            </div>
            <div class="list-detail-line">
              <span>{{ $t('winOrLose') }}</span>
              <div v-if="item.state != 2" :class="[item.state ? 'green' : 'red']">
                {{ `${item.state ? '+' : '-'} ${currency(item.profitAmount)}` }}
              </div>
              <div v-else>--</div>
            </div>
            <div class="list-detail-line">
              <span>{{ $t('createTime') }}</span>
              <div>{{ item.addTime }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="my_r-body-empty">
        <Empty />
      </div>
    </div>
    <div v-if="mayrecord.length" class="my_r-foot">
      <div class="my_r-foot-previous" :class="{ disabled: pageNo <= 1 }" @click="pPage">
        <van-icon name="arrow-left" class="my_r-icon" size="20" />
      </div>
      <div class="my_r-foot-page">{{ pageNo }}/{{ totalPage }}</div>
      <div class="my_r-foot-next" :class="{ disabled: pageNo >= totalPage }" @click="nPage">
        <van-icon name="arrow" class="my_r-icon" size="20" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Empty from '@/components/Empty/index.vue'
import { ref, onActivated, onDeactivated, inject, watch } from 'vue'
import type { WinGo } from '@/types/api'
import { AwaitApiResult, currency, copy } from '@/utils'
import { winGoGetMyEmerdList } from '@/api'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const totalPage = ref(4)
const pageSize = ref(20)
const pageNo = ref(1)
// 使用 inject 接收父组件传递的实例
const winHook = inject('winHook')
const { typeid, getComponentNum } = winHook
const mayrecord = ref<WinGo.GetMyEmerdList[]>([])
// 上一页
const pPage = () => {
  pageNo.value--
  getData()
}
// 下一页
const nPage = () => {
  pageNo.value++
  getData()
}
// 获取参数
const getData = async () => {
  if (typeid == null) return
  const res = await AwaitApiResult<any>(
    winGoGetMyEmerdList({
      pageSize: pageSize.value,
      pageNo: pageNo.value,
      typeId: typeid.value,
    })
  )
  if (res) {
    mayrecord.value = res.data.list || []
    totalPage.value = res.data.totalPage || 0
  }
}
const showIndexRe = ref(-1)
// 转换文字
const changeText = (SelectType: String) => {
  switch (SelectType) {
    case 'big':
      return 'big'
    default:
      return SelectType
  }
}
// 转换颜色文字
const changeTextColor = (num: number) => {
  const m = num % 2
  switch (m) {
    case 1:
      return t('greenColor')
    default:
      return t('redColor')
  }
}
// 转换class名
const cssTextColor = (num: number) => {
  const m = num % 2
  switch (m) {
    case 1:
      return 'greenColor'
    default:
      return 'redColor'
  }
}
// 转换选择文字
const changeTextSelect = (text: String) => {
  switch (text) {
    case 'small':
      return t('small')
    case 'big':
      return t('big')
    case 'green':
      return t('green')
    case 'violet':
      return t('purpleColor')
    case 'red':
      return t('redColor')
    default:
      return text
  }
}
// 点击展示详情
const Emerd = (index: number) => {
  if (showIndexRe.value == index) {
    showIndexRe.value = -1
  } else {
    showIndexRe.value = index
  }
}
const lock = ref(false)
watch(
  () => getComponentNum.value,
  (val) => {
    if (val > 0) {
      if (lock.value) return
      console.log('投注历史')
      getData()
    }
  }
)

onDeactivated(() => {
  lock.value = true
})
onActivated(() => {
  lock.value = false
  getData()
})
</script>
<style lang="scss" scoped>
.my_r {
  padding-bottom: 20px;
  &-body {
    padding: 0 20px;
    .list {
      & > div {
        & + div {
          border-top: 1px solid #e1e1e1;
        }
      }
      &-item {
        height: 132px;
        display: flex;
        align-items: center;

        &-l {
          height: 64px;
          width: 80px;
          line-height: 64px;
          text-align: center;
          border-radius: 8px;
          border: 1px #e1e3f2;
          background: #f3f4fa;
          color: #fff;
          font-size: 48px;
          font-weight: 900;
          margin-right: 22px;
          flex: none;
          overflow: hidden;
          &-2,
          &-4,
          &-6,
          &-8 {
            color: #f23f3f;
          }
          &-1,
          &-3,
          &-7,
          &-9 {
            color: #18af5e;
          }

          &-0 {
            background: linear-gradient(146deg, #f23f3f 52.95%, #a247f6 53.93%), #f3f4fa;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          &-5 {
            background: linear-gradient(146deg, #18af5e 52.95%, #a247f6 53.93%), #f3f4fa;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          &-red,
          &-violet,
          &-green,
          &-small,
          &-big {
            font-size: 24px;
            font-weight: 400;
          }
          &-red {
            background: #f23f3f;
            box-shadow: 0px 4px 0px 0px #d5191d;
          }

          &-violet {
            background: #b76bf2;
            box-shadow: 0px 4px 0px 0px #a043e8;
          }

          &-green {
            background: #18af5e;
            box-shadow: 0px 4px 0px 0px #08aa61;
          }

          &-small {
            background: #609dec;
            box-shadow: 0px 4px 0px 0px #2d7fe9;
          }

          &-big {
            background: #f8b460;
            box-shadow: 0px 4px 0px 0px #f49c30;
          }
        }

        &-m {
          flex: none;
          height: fit-content;
          &-top {
            height: 42px;
            line-height: 42px;
            font-size: 28px;
            font-weight: 500;
            color: #323536;
            display: flex;
            gap: 10px;
            align-items: center;
            svg {
              width: 9px;
              height: 9px;
              &.r {
                transform: rotateZ(180deg);
              }
            }
          }

          &-bottom {
            height: 36px;
            line-height: 36px;
            font-size: 24px;
            color: #929292;
          }
        }

        &-r {
          flex: 1;
          font-size: 24px;
          height: fit-content;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          flex-direction: column;
          color: #f0484b;
          span {
            word-wrap: break-word;
            word-break: break-all;
            height: 36px;
            line-height: 48px;
          }

          div {
            color: #fff;
            background: #f0484b;
            border-radius: 8px;
            height: 48px;
            line-height: 48px;
            font-size: 24px;
            padding: 0 40px;
          }

          &.success {
            color: #13c164;

            div {
              background: #13c164;
            }
          }
        }
      }

      &-inlineB {
        display: inline-block;

        & + div {
          margin-left: 16px;
        }

        &.big {
          color: #f8b460;
        }

        &.small {
          color: #609dec;
        }

        &.greenColor {
          color: #13c164;
        }

        &.redColor {
          color: #f23f3f;
        }

        &.purpleColor {
          color: #a043e8;
        }
      }

      &-detail {
        display: flex;
        flex-direction: column;
        &-text {
          font-size: 28px;
          color: #323536;
          font-weight: 500;
          line-height: 39px;
          height: 39px;
        }

        &-line {
          height: fit-content;
          line-height: 74px;
          color: #323536;
          font-size: 28px;
          display: flex;
          justify-content: space-between;
          border-top: 1px solid #ebebeb;
          & > span {
            color: #929292;
          }

          & > div {
            display: flex;
            align-items: center;
          }
          .red {
            color: #f23f3f;
          }

          .green {
            color: #13c164;
          }
        }
      }
    }
    &-empty {
      height: 400px;
    }
  }

  &-foot {
    height: 70px;
    padding: 0 178px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-page {
      font-size: 24px;
      color: #323536;
    }

    &-previous,
    &-next {
      width: 70px;
      height: 70px;
      border-radius: 10px;
      background: #fd565c;
      display: flex;
      align-items: center;
      justify-content: center;

      &.disabled {
        background: #f0f0f0;
        pointer-events: none;

        .my_r-icon {
          color: #d3d3d3;
        }
      }
      .my_r-icon {
        color: #fff;
      }
    }
  }
}
</style>
