<template>
  <div class="MyGameRecordList__C">
    <div
      v-for="(item, index) in mayrecord"
      :key="item"
      :class="showIndex === index ? 'item active' : 'item'"
      @click="onOrder(index)"
    >
      <div class="box">
        <div>
          <h4>{{ $t('code' + item.bettingParentTypeNameCode) }}</h4>
          <span class="time"> {{ item.createTime }} </span>
        </div>
        <div v-if="item.status === 1" class="state state0">
          <p>{{ $t('bettingResultState1') }}</p>
        </div>
        <div v-if="item.status === 3" class="state state3">
          <p>{{ $t('hasWon') }}</p>
          <span>+{{ item.winningAmount }}</span>
        </div>
        <div v-if="item.status === 2" class="state state4">
          <p>{{ $t('bettingResultState3') }}</p>
          <span>-{{ item.realBettingAmount }}</span>
        </div>
        <div v-if="item.status === 4" class="state state2">
          <p>{{ $t('xosoTxt74') }}</p>
        </div>
        <div v-if="item.status === 5" class="state state5">
          <p>{{ $t('xosoTxt75') }}</p>
        </div>
        <div v-if="item.status === 6" class="state state1">
          <p>{{ $t('xosoTxt76') }}</p>
        </div>
      </div>
      <div v-if="showIndex === index" class="info">
        <div class="order">
          <div v-if="item.orderNo" class="li">
            <div class="lab">{{ $t('orderNo') }}</div>
            <div class="sub" @click.stop="copy(item.orderNo)">
              {{ item.orderNo }}
              <svg-icon name="copy" />
            </div>
          </div>
          <div v-if="item.issueNo" class="li">
            <div class="lab">{{ $t('betIssue') }}</div>
            <div class="sub">{{ item.issueNo }}</div>
          </div>
          <div class="li">
            <div class="lab">{{ $t('area') }}</div>
            <div v-if="gVSs == '1'" class="sub">{{ $t('code' + item.areNameCode) }}</div>
            <div v-else-if="gVSs == '2'" class="sub">
              {{ $t('code' + item.typeCode) }}
            </div>
          </div>
          <div v-if="gVSs == '1'" class="li">
            <div class="lab">{{ $t('xosoTxt77') }}</div>
            <div class="sub">{{ $t('code' + item.nameCode) }}</div>
          </div>
          <div class="li">
            <div class="lab">{{ $t('gamePlay') }}</div>
            <div class="sub">{{ $t('code' + item.bettingParentTypeNameCode) }}</div>
          </div>
          <div class="li">
            <div class="lab">{{ $t('xosoTxt78') }}</div>
            <div class="sub">{{ $t('code' + item.bettingTypeNameCode) }}</div>
          </div>
          <div class="li">
            <div class="lab">{{ $t('amountMay') }}</div>
            <div class="sub">{{ item.amount }}</div>
          </div>
          <div class="li">
            <div class="lab">{{ $t('multiple') }}</div>
            <div class="sub">{{ item.bettingMultiple }}</div>
          </div>
          <div class="li">
            <div class="lab">{{ $t('xosoTxt79') }}</div>
            <div class="sub">{{ item.totalBetting }} {{ $t('note') }}</div>
          </div>
          <!-- <div class="li" v-if="item.realBettingAmount">
						<div class="lab">{{ $t('afterTaxAmount') }}</div>
						<div class="sub">{{ item.realBettingAmount }}</div>
					</div>
					<div class="li" v-if="item.serviceCharge">
						<div class="lab">{{ $t('tax') }}</div>
						<div class="sub">{{ item.serviceCharge }}</div>
					</div> -->
        </div>
        <div class="line">
          <p />
        </div>
        <div class="bet">
          <div class="li betNum">
            <div class="lab">
              {{ $t('bettingnumber') }}<span v-if="item.bettingFormat === 1" class="txt">({{ $t('selectNo') }})</span>
              <span v-if="item.bettingFormat === 2" class="txt">({{ $t('xosoTxt80') }})</span>
              <span v-if="item.bettingFormat === 3" class="txt">({{ $t('xosoTxt81') }})</span>
              <!-- 选择号码 -->
              <div v-if="item.bettingFormat == 1" class="betList select">
                <span
                  v-for="(citem, cindex) in betBast(item.bettingContent)"
                  :key="cindex"
                  :class="{ active: winLottery(item.winningNum).includes(citem) }"
                >
                  {{ citem }}
                </span>
              </div>
              <div v-else class="betList select">
                <span
                  v-for="(citem, cindex) in item.bettingContent.split(',')"
                  :key="cindex"
                  :class="{ active: winLottery(item.winningNum).includes(citem) }"
                >
                  {{ getRep(citem) }}
                </span>
              </div>
            </div>
          </div>
          <div class="li">
            <div class="lab">{{ $t('statusMay') }}</div>
            <div v-if="item.status === 1" class="state state0">
              <p>{{ $t('bettingResultState1') }}</p>
            </div>
            <div v-if="item.status === 3" class="state state3">
              <p>{{ $t('hasWon') }}</p>
            </div>
            <div v-if="item.status === 2" class="state state4">
              <p>{{ $t('bettingResultState3') }}</p>
            </div>
            <div v-if="item.status === 4" class="state state2">
              <p>{{ $t('xosoTxt74') }}</p>
            </div>
            <div v-if="item.status === 5" class="state state5">
              <p>{{ $t('xosoTxt75') }}</p>
            </div>
            <div v-if="item.status === 6" class="state state1">
              <p>{{ $t('xosoTxt76') }}</p>
            </div>
          </div>
          <div class="li">
            <div class="lab">{{ $t('winOrLose') }}</div>
            <div v-if="item.status === 3" class="sub success">+{{ item.winningAmount }}</div>
            <div v-else-if="item.status === 2" class="sub fail">-{{ item.realBettingAmount }}</div>
            <div v-else class="sub">---</div>
          </div>
          <div v-if="item.createTime" class="li">
            <div class="lab">{{ $t('createTime') }}</div>
            <div class="sub">{{ item.createTime }}</div>
          </div>
          <div v-if="item.openingTime" class="li">
            <div class="lab">{{ $t('winTrxTime') }}</div>
            <div class="sub">{{ item.openingTime }}</div>
          </div>
        </div>
        <div v-if="item.issueNoStatus === 1 && item.status === 1 && gVSs == '1'">
          <div class="btn" @click.stop="throttleCope(item.id)">{{ $t('xosoTxt82') }}</div>
        </div>
        <!-- 开奖结果 -->
        <div v-if="item.openingResult" class="result">
          <div
            v-for="(citem, cindex) in newArr(item.openingResult)"
            :key="cindex"
            :class="cindex < 3 ? 'result-item jusb' : 'result-item'"
          >
            <div v-if="citem.resultType == 0" class="txt">{{ $t('GrandPrize') }}</div>
            <div v-if="citem.resultType == 1" class="txt">{{ $t('firstprize') }}</div>
            <div v-if="citem.resultType == 2" class="txt">{{ $t('secondprize') }}</div>
            <div v-if="citem.resultType == 3" class="txt">{{ $t('thirdprize') }}</div>
            <div v-if="citem.resultType == 4" class="txt">{{ $t('fourprize') }}</div>
            <div v-if="citem.resultType == 5" class="txt">{{ $t('fiveprize') }}</div>
            <div v-if="citem.resultType == 6" class="txt">{{ $t('sixprize') }}</div>
            <div v-if="citem.resultType == 7" class="txt">{{ $t('sevenprize') }}</div>
            <div v-if="citem.resultType == 8" class="txt">{{ $t('eightprize') }}</div>
            <div class="num">
              <span v-for="(vitem, vindex) in citem.result" :key="vindex">{{ vitem }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Dialog v-model:show="cancellationShow" :title="$t('xosoTxt99')" @confirm="throttleConfirm" />
  </div>
</template>

<script setup lang="ts">
import { showSuccessToast } from 'vant'
import Dialog from '@/components/common/Dialog.vue'
import { getIconsPublic, copy, AwaitApiResult, throttle, getIcons } from '@/utils'
import { CancelBetOrder } from '@/api'

import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()

const props = withDefaults(defineProps<{ mayrecord?: any[]; gVSs?: string }>(), {})
//  抛出其方法
const emits = defineEmits<{
  (e: 'click-cance'): void
}>()

// 展示详情
const showIndex = ref(-1)
const onOrder = (index: number) => {
  if (showIndex.value === index) {
    showIndex.value = -1
  } else {
    showIndex.value = index
  }
}
// 撤单
const cancellationShow = ref(false)
const orderNo = ref('')
const cancellation = async () => {
  const res = await AwaitApiResult(CancelBetOrder({ orderId: orderNo.value }))
  if (res) {
    cancellationShow.value = false
    showSuccessToast($t('xosoTxt96'))
    emits('click-cance')
  }
}
const throttleCope = (e: string) => {
  orderNo.value = e
  cancellationShow.value = true
}
const throttleConfirm = throttle(cancellation, 1000)

// 处理结果
const newArr = (list: any) => {
  const newArr = []
  for (var i = 0; i < list.length; i++) {
    const index = newArr.findIndex(function (item) {
      return item.resultType === list[i].resultType
    })
    if (index !== -1) {
      newArr[index].result.push('-' + list[i].result)
    } else {
      newArr.push({
        resultType: list[i].resultType,
        result: [list[i].result],
      })
    }
  }
  return newArr
}

// 拆解数据
const betBast = (cont: any) => {
  const bast = betList(cont) // 拆解数据
  const list = betCont(bast) // 组合复式数据
  return list
}

const betList = (cont: any) => {
  const list = []
  if (cont.includes(',')) {
    const arr = cont.split(',')
    let item = {}
    for (let i = 0; arr.length > i; i++) {
      item = arr[i].split('|')
      list.push(item)
    }
    return list
  }
  return cont
}

const betCont = (list: any): any => {
  const arr1 = list[0]
  const arr2 = list[1]
  const arr3 = []
  for (let i = 0; arr1.length > i; i++) {
    for (let j = 0; arr2.length > j; j++) {
      arr3.push(arr1[i] + arr2[j])
    }
  }
  const arr4 = list.slice(2)
  if (arr4.length > 0) {
    return betCont([arr3, ...arr4])
  } else {
    return arr3
  }
}
// 处理中奖标红数据
const winLottery = (cont: any) => {
  if (cont != null) {
    const list = cont.split(',')
    if (list.length > 0) {
      return list
    }
  }
  return []
}

// 字符替换 将| 替换成，
const getRep = (cont: any) => {
  const map: any = {
    大: $t('big'),
    小: $t('small'),
    单: $t('odd'),
    双: $t('xosoTxt70'),
  }
  if (map[cont]) return map[cont].replace(/\|/g, ',')
  return cont.replace(/\|/g, ',')
}

onMounted(() => {})
</script>
<style lang="scss" scoped>
.state,
.sub {
  color: var(--text_color_L2);
  &.state0 {
    color: var(--norm_bule-color);
  }
  &.state1 {
    color: var(--norm_secondary-color);
  }
  &.state2 {
    span {
      color: var(--bgcolor-22);
    }
  }
  &.state3 {
    color: var(--bgcolor-22);
  }
  &.state4 {
    color: var(--main-color);
  }
}
.MyGameRecordList__C {
  background-color: var(--darkBg, var(--bg_color_L2));
  .item {
    padding: 0 24px;
    border-bottom: 1px solid var(--gray-color-1);
    &.active {
      border-radius: 10px;
      border: 1px solid var(--bgDark-4, var(--borderColor-5));
      h4 {
        font-weight: 700;
        font-size: 30px;
      }
      .box {
        border-bottom: 1px solid var(--gray-color-1);
      }
    }
    .box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 26px 0;
      h4 {
        color: var(--darkTextW, var(--text_color_L1));
        font-size: 28px;
        margin-bottom: 5px;
      }
      .time {
        font-size: 24px;
        color: var(--text_color_L2);
      }

      .state {
        font-size: 26px;
        text-align: right;
        span {
          display: inline-block;
          margin-top: 5px;
        }
      }
    }
    .info {
      padding: 24px 0;
      .order,
      .bet {
        .li {
          display: flex;
          justify-content: space-between;
          min-height: 50px;
          line-height: 50px;
          padding-left: 40px;
          &.betNum {
            flex-direction: column;
            flex-wrap: wrap;
            .lab {
              color: var(--text_color_L1);
              font-size: 28px;
              .txt {
                font-size: 28px;
                color: var(--text_color_L2);
              }
              .betList {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                &.select {
                  max-height: 425px;
                  overflow-y: auto;
                }
                & > span {
                  display: inline-block;
                  text-align: center;
                  height: 48px;
                  line-height: 48px;
                  width: 48px;
                  color: var(--text_color_L1);
                  background-color: var(--bg_color_L3);
                  border-radius: 48px;
                  font-size: 24px;
                  margin-right: 15px;
                  margin-bottom: 15px;
                  &.active {
                    background-color: var(--main_gradient-color);
                    color: #fff;
                  }
                }
                & > span {
                  width: auto;
                  padding: 0 12px;
                  border-radius: 12px;
                }
              }
              width: 100%;
              &::after {
                top: 20px;
              }
              &::before {
                top: 38px;
                height: 97%;
              }
            }
          }
          .lab {
            color: var(--text_color_L2);
            position: relative;
            &::after {
              content: '';
              display: block;
              background: url(@icon/public/before_cire.png) no-repeat center center;
              background-size: cover;
              height: 20px;
              width: 20px;
              position: absolute;
              top: 50%;
              transform: translate(0, -50%);
              left: -40px;
              html:lang(ar) & {
                right: -40px;
                left: unset;
              }
            }
            &::before {
              content: '';
              display: block;
              height: 35%;
              border-left: 1px dashed var(--main-color);
              position: absolute;
              left: -31px;
              top: 42px;
              html:lang(ar) & {
                right: -31px;
                left: unset;
              }
            }
          }
          &:last-child {
            .lab {
              &::before {
                content: '';
                display: none;
              }
            }
          }
          .sub {
            color: var(--text_color_L1);
            font-size: 24px;
            & > img {
              width: 30px;
              vertical-align: -5px;
            }
            &.success {
              color: var(--bgcolor-22);
            }
            &.fail {
              color: var(--main-color);
            }
          }
        }
      }
      .line {
        margin: 0 -27px;
        background-color: var(--darkBg, var(--bg_color_L2));
        height: 43px;
        overflow: hidden;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        & > p {
          width: 80%;
          border-bottom: 1px dashed var(--bgDark-4, var(--gray-color-1));
        }
        &::after,
        &::before {
          content: '';
          display: block;
          width: 40px;
          height: 40px;
          border-radius: 40px;
          border: 1px solid var(--bgDark-4, var(--borderColor-5));
          position: absolute;
          top: 0;
        }
        &::after {
          left: -20px;
          html:lang(ar) & {
            right: -20px;
            left: unset;
          }
        }
        &::before {
          right: -20px;
          html:lang(ar) & {
            right: unset;
            left: -20px;
          }
        }
      }
      .btn {
        text-align: center;
        height: 70px;
        line-height: 70px;
        border-radius: 70px;
        font-size: 30px;
        color: #fff;
        background: var(--main_gradient-color2);
        margin: 30px 0;
      }
      .result {
        &-item {
          min-height: 80px;
          background-color: var(--bgDark-4, var(--walletBgColor-1));
          margin-top: 12px;
          border-radius: 10px;
          padding: 0 20px;
          color: var(--text_color_L1);
          font-size: 28px;
          padding: 20px 24px;
          .txt {
            color: var(--text_color_L2);
          }
          &.jusb {
            padding: 0 24px;
            line-height: 80px;
            display: flex;
            justify-content: space-between;
            .num,
            .txt {
              margin-top: 0;
              flex: 1;
              color: var(--darkTextW, var(--text_color_L1));
            }
            .num {
              text-align: center;
              position: relative;
              font-weight: 700;
              &::before {
                content: '';
                display: block;
                width: 2px;
                height: 50px;
                position: absolute;
                top: 15px;
                left: 0;
                background-color: var(--bgDark-2, --text_color_L2);
                html:lang(ar) & {
                  right: 0;
                  left: unset;
                }
              }
            }
            &:first-child {
              .num {
                color: var(--main-color);
              }
            }
          }
          .num {
            margin-top: 14px;
            font-size: 28px;
            color: var(--text_color_L1);
          }
        }
      }
    }
  }
}
</style>
