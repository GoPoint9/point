<template>
  <div class="task-record-container">
    <NavBar
      :title="$t('titlePickUpRecord')"
      :placeholder="false"
      left-arrow
      @click-left="onClick"
    />
    <van-sticky :offset-top="49">
      <div class="head">
        <button :class="{ active: activeIndex == 1 }" @click="onSwitch(1)">{{ $t('actTip7') }}</button>
        <button :class="{ active: activeIndex == 2 }" @click="onSwitch(2)">{{ $t('actTip8') }}</button>
      </div>
    </van-sticky>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      :finished-text="finishedText"
      @load="onLoad"
    >
      <div class="record-panel van-clearfix">
        <div v-for="item in recordList" :key="item.status" class="record-panel-item">
          <h1>{{ activeIndex == 1 ? $t('actTip5') : $t('actTip6') }}</h1>
          <h2>
            <span>{{ item.taskTitle }}</span>
            <span class="markRed">{{ item.taskTarget + '/' + item.taskTarget }}</span>
          </h2>
          <div>
            <span>{{ item.createDate }}</span>
            <h3>
              <svg-icon name="activityWallet" />
              <span>{{ currency(item.awardAmount) }}</span>
            </h3>
          </div>
        </div>
      </div>
    </van-list>
    <Empty v-if="isShowEmpty" />
  </div>
</template>

<script setup lang="ts">
import { GetWeeklyAwardRecordList, GetDailyAwardRecordList } from '@/api'
import { AwaitApiResult, currency } from '@/utils'
import Empty from '@/components/Empty/index.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const recordList = ref<any[]>([])
const loading = ref(false)
const finished = ref(false)
const pageNo = ref(1)
const isShowEmpty = ref(false)
const activeIndex = ref(1)
const finishedText = computed(() => {
  return isShowEmpty.value ? '' : t('noMoreThere')
})
const onLoad = async () => {
  let res: any
  if (activeIndex.value == 1) {
    res = await AwaitApiResult(GetWeeklyAwardRecordList({ pageNo: pageNo.value, pageSize: 20 }))
  } else {
    res = await AwaitApiResult(GetDailyAwardRecordList({ pageNo: pageNo.value, pageSize: 20 }))
  }
  if (res) {
    isShowEmpty.value = res.data.totalCount == 0
    if (res.data.totalPage <= pageNo.value) finished.value = true
    else finished.value = false
    if (res.data.list) {
      recordList.value.push(...res.data.list)
      recordList.value.sort((a, b) => b.createDate - a.createDate)
    }
    pageNo.value++
  } else {
    finished.value = true
  }
  loading.value = false
}
const onClick = () => {
  router.push({ name: 'DailyTasks' })
}
function onSwitch (index: number) {
  activeIndex.value = index
  pageNo.value = 1
  recordList.value.length = 0
  onLoad()
}
</script>

<style lang="scss" scoped>
.task-record-container {
  font-family: 'Inter', sans-serif;

  .head {
    height: 88px;
    color: var(--text_color_L2);
    font-size: 32px;
    line-height: 88px;
    font-weight: 400;
    margin: 0 24px;
    border-radius: 16px;
    overflow: hidden;
    margin-top: 20px;
    background: var(--light-bg_white, var(--bg_color_L2));
    > button {
      border: none;
      width: 50%;
      background: var(--light-bg_white, var(--bg_color_L3));
    }
    > button.active {
      background: var(--main_gradient-color);
      color: var(--text_color_L4);
      border-radius: 16px;
    }
  }
  .record-panel {
    padding: 20px 24px;

    svg {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    &-item {
      padding: 30px 20px;
      background: var(--bg_color_L2);
      border-radius: 10px;
      margin-bottom: 20px;
      h1 {
        color: var(--text_color_L1);
        font-size: 30px;
        margin-bottom: 10px;
      }
      h2 {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        span {
          color: var(--text_color_L2);
        }
        .markRed {
          color: var(--norm_red-color);
          margin-left: 20px;
        }
      }
      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--text_color_L3);
        h3 {
          display: flex;
          align-items: center;
          font-size: 28px;
          color: var(--norm_secondary-color);
        }
      }
    }
  }
}
</style>
