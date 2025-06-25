<template>
  <div class="MyGameRecordList__C">
    <template v-for="(item, index) in mayrecord" :key="index">
      <div class="MyGameRecordList__C-item" @click.stop.prevent="Emerd(index)">
        <div class="MyGameRecordList__C-item-l" :class="['MyGameRecordList__C-item-l-' + item.selectType]">
          {{ changeText(item.selectType) }}
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
            <div v-for="(num, index) in item.premium" :key="index">{{ num }}</div>
          </div>
          <div v-else>--</div>
        </div>
        <div class="MyGameRecordList__C-detail-line">
          {{ $t('selectMay') }}
          <div class="line1">
            <div>{{ gameText(item.gameType) }}</div>
            <div v-for="(selectItem, index) in item.selectType.split('|')" :key="index" class="num">
              {{ SelectText(selectItem) }}
            </div>
          </div>
        </div>
        <div class="MyGameRecordList__C-detail-line">
          {{ $t('statusMay') }}
          <div v-if="item.state != 2" :class="[item.state ? 'green' : 'red']">
            {{ item.state ? $t('success') : $t('fail') }}
          </div>
          <div v-else>{{ $t('unsettled') }}</div>
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
// 详情展开index
const showIndexRe = ref(-1)
/**
 * 游戏名字映射
 * @param index 映射参数
 */
const gameText = (index: number) => {
  return ['', 'A', 'B', 'C', 'D', 'E'][index]
}
/**
 * 映射縂投注名稱
 * @param name 映射名称
 */
const SelectText = (name: any) => {
  switch (name) {
    case 'L':
      return t('k3Small')
    case 'O':
      return t('k3Odd')
    case 'E':
      return t('k3Even')
    case 'H':
      return t('k3Big')
    default:
      return name
  }
}
/**
 * 展开详情时间
 * @param index 展示哪一行
 */
const Emerd = (index: number) => {
  if (showIndexRe.value == index) {
    showIndexRe.value = -1
  } else {
    showIndexRe.value = index
  }
}
// 转换文字
const changeText = (SelectType: String) => {
  switch (SelectType) {
    case 'E':
      return 'Even'
    case 'O':
      return 'Odd'
    case 'H':
      return 'Big'
    case 'L':
      return 'Small'
    default:
      return SelectType
  }
}
</script>
<style lang="scss" scoped>
@import '../MyGameRecord.scss';
.MyGameRecordList__C-item-l {
  background-color: var(--main-color);
  &-O,
  &-E,
  &-H,
  &-L {
    font-size: 24px;
  }
  &-O {
    background-color: var(--norm_red-color);
  }
  &-E {
    background-color: var(--norm_Purple-color);
  }
  &-H {
    background-color: var(--norm_secondary-color);
  }
  &-L {
    background-color: var(--norm_bule-color);
  }
  &-0 {
    background: var(--main-color) !important;
  }
}

.MyGameRecordList__C-detail-line .line1 {
  width: auto;
}
</style>
