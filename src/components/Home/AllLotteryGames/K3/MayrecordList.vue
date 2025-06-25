<template>
  <div class="MyGameRecordList__C">
    <template v-for="(item, index) in mayrecord" :key="index">
      <div class="MyGameRecordList__C-item" @click.stop.prevent="Emerd(index)">
        <div class="MyGameRecordList__C-item-l" :class="['MyGameRecordList__C-item-l-' + changeType(item)]">
          {{ changeText(item) }}
        </div>
        <div class="MyGameRecordList__C-item-m">
          <div class="MyGameRecordList__C-item-m-top">
            {{ item.issueNumber }}
          </div>
          <div class="MyGameRecordList__C-item-m-bottom">{{ item.addTime }}</div>
        </div>
        <div v-if="item.profitAmount" class="MyGameRecordList__C-item-r" :class="{ success: item.state }">
          <div v-if="item.profitAmount" :class="{ success: item.state }">
            {{ item.state ? $t('success') : $t('fail') }}
          </div>
          <span>{{ `${item.state ? '+' : '-'}${currency(item.profitAmount)}` }}</span>
        </div>
      </div>
      <div v-if="index == showIndexRe" class="MyGameRecordList__C-detail">
        <div class="MyGameRecordList__C-detail-text">{{ $t('detailMay') }}</div>
        <div v-if="item.orderNumber" class="MyGameRecordList__C-detail-line">
          {{ $t('orderNoMay') }}
          <div @click="copy(item.orderNumber)">
            {{ item.orderNumber }}
            <svg-icon name="copy" />
          </div>
        </div>
        <div class="MyGameRecordList__C-detail-line">
          {{ $t('issueMay') }}
          <div>{{ item.issueNumber }}</div>
        </div>
        <div class="MyGameRecordList__C-detail-line">
          {{ $t('amountMay') }}
          <div>{{ currency(item.amount) }}</div>
        </div>
        <div class="MyGameRecordList__C-detail-line">
          {{ $t('numMay') }}
          <div>{{ item.betCount }}</div>
        </div>
        <div class="MyGameRecordList__C-detail-line">
          {{ $t('afterTaxAmount') }}
          <div class="red">{{ currency(item.realAmount) }}</div>
        </div>
        <div class="MyGameRecordList__C-detail-line">
          {{ $t('tax') }}
          <div>{{ currency(item.fee) }}</div>
        </div>
        <div class="MyGameRecordList__C-detail-line">
          {{ $t('resultMay') }}
          <div v-if="item.premium" class="numList">
            <div v-for="(num, index) in item.premium" :key="index" :class="['n' + num]" />
          </div>
          <div v-else>--</div>
        </div>
        <div class="MyGameRecordList__C-detail-line noLine">
          {{ $t('selectMay') }}
          <div v-if="item.gameType == 1" class="line1">
            <template v-if="item.oneList.length > 0">
              <span>{{ $t('k3RecordDesc1') }}</span>
              <span v-for="(li, index) in item.oneList" :key="index + '1'" class="btn">
                {{ betnumName(li) }}
              </span>
            </template>
          </div>
          <!-- 2个相同的数字 -->
          <div v-if="item.gameType == 2" class="line1">
            <template v-if="item.oneList.length > 0">
              <span class="">{{ $t('k3RecordDesc2') }}</span>
              <span v-for="(li, index) in item.oneList" :key="index + '1'" class="btn actionViolet">{{ li }}</span>
            </template>
            <template v-if="item.towList.length > 0">
              <span class="">{{ $t('k3RecordDesc3') }}</span>
              <span v-for="(li, index) in item.towList" :key="index + '1'" class="btn actionRedGreen">{{ li }}</span>
            </template>
          </div>
          <div v-if="item.gameType == 3" class="line1">
            <template v-if="item.oneList.length > 0">
              <span class="">{{ $t('k3RecordDesc4') }}</span>
              <span v-for="(li, index) in item.oneList" :key="index + '1'" class="btn actionViolet">{{ li }} </span>
            </template>
            <div v-if="item.towList" class="btn actionBtn">{{ $t('k3RecordDesc5') }}</div>
          </div>
          <!-- 不同的号码 -->
          <div v-if="item.gameType == 4" class="line1">
            <template v-if="item.oneList.length > 0">
              <span class="">{{ $t('k3RecordDesc6') }}</span>
              <span v-for="(li, index) in item.oneList" :key="index + '1'" class="actionViolet">{{ li }}</span>
            </template>
            <div v-if="item.towList" class="actionBtn">{{ $t('k3RecordDesc7') }}</div>
            <template v-if="item.threeList.length > 0">
              <span class="">{{ $t('k3RecordDesc8') }}</span>
              <span v-for="(li, index) in item.threeList" :key="index + '1'" class="actionViolet">{{ li }}</span>
            </template>
          </div>
        </div>
        <div class="MyGameRecordList__C-detail-line">
          {{ $t('statusMay') }}
          <div v-if="item.state != 2" :class="[item.state ? 'green' : 'red']">
            {{ item.state ? $t('success') : $t('fail') }}
          </div>
          <div v-else>{{ $t('k3RecordDesc9') }}</div>
        </div>
        <div class="MyGameRecordList__C-detail-line">
          {{ $t('winOrLose') }}
          <div v-if="item.state != 2" :class="[item.state ? 'green' : 'red']">
            {{ `${item.state ? '+' : '-'} ${currency(item.profitAmount)}` }}
          </div>
          <div v-else>--</div>
        </div>
        <div class="MyGameRecordList__C-detail-line">
          {{ $t('createTime') }}
          <div>{{ item.addTime }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { currency, copy } from '@/utils'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = withDefaults(defineProps<{ mayrecord: any[] }>(), {})

const showIndexRe = ref(-1)

/**
 * 映射縂投注名稱
 * @param name 映射的名称
 */
const betnumName = (name: string) => {
  switch (name) {
    case 'H':
      return t('k3Big')
    case 'L':
      return t('k3Small')
    case 'O':
      return t('k3Odd')
    case 'E':
      return t('k3Even')
    default:
      return name
  }
}
/**
 * 点击展示详情
 * @param index 展示详情
 */
const Emerd = (index: number) => {
  if (showIndexRe.value == index) {
    showIndexRe.value = -1
  } else {
    showIndexRe.value = index
  }
}
// 转换文字
const changeText = (item: any) => {
  if (item.gameType == '3') {
    if (item.selectType == '|AAA|') return '3='
    if (item.oneList.length) return item.oneList[0]
  }
  if (item.gameType == '4') {
    if (item.selectType == '|ABC|') return '3≠'
    if (item.threeList.length) return `${item.threeList.join('')}`
    return `${item.oneList.join('')}`
  }
  if (item.towList?.length) {
    return item.towList[0]
  }
  if (item.towListArr?.length) {
    return item.towListArr[0]
  }
  if (item.oneList?.length) {
    switch (item.oneList[0]) {
      case 'H':
        return 'Big'
      case 'L':
        return 'Small'
      case 'O':
        return 'Odd'
      case 'E':
        return 'Even'
      default:
        return item.oneList[0]
    }
  }
}

// 转换文字
const changeType = (item: any) => {
  if (item.towList?.length) {
    return 'num'
  }
  if (item.oneList?.length) {
    if (item.oneList[0].length > 2) return 'num'
    return item.oneList[0]
  }
}
</script>
<style lang="scss" scoped>
@import '../MyGameRecord.scss';

.MyGameRecordList__C {
  &-detail {
    &-line {
      .numList {
        display: flex;
        align-items: center;
        height: 100%;

        & > div {
          height: 36px;
          width: 36px;
          background-repeat: no-repeat;
          background-size: 36px;
          background-position: center;
          border-radius: 0;
          border: 0;
          $list: 1 2 3 4 5 6;

          @each $i in $list {
            &.n#{$i} {
              background-image: url('@icon/AllGames/n#{$i}.png');
            }
          }

          & + div {
            margin-left: 8px;
          }
        }
      }
    }
  }
  &-item {
    &-l {
      height: 72px;
      width: 72px;
      line-height: normal;
      text-align: center;
      border-radius: 20px;
      color: #fff;
      font-size: 48px;
      margin-right: 22px;
      flex: none;
      background-color: var(--main-color);
      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      word-wrap: break-word;
      word-break: break-all;

      &-H {
        background-color: var(--norm_secondary-color);
      }

      &-L {
        background-color: var(--norm_bule-color);
      }

      &-O {
        background: var(--norm_red-color);
      }

      &-E {
        background: var(--norm_Purple-color);
      }
      &-num {
        font-size: 24px;
      }
    }
  }
}
</style>
