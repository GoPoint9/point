<template>
  <div class="record">
    <div class="record-head">
      <van-row>
        <van-col span="8">{{ $t('betSerial') }}</van-col>
        <van-col span="5">{{ $t('num') }}</van-col>
        <van-col span="5">{{ $t('bigOrSmall') }}</van-col>
        <van-col span="6">{{ $t('color') }}</van-col>
      </van-row>
    </div>
    <div class="record-body">
      <template v-if="NoaverageEmerdList.length">
        <van-row v-for="(item, index) in NoaverageEmerdList" :key="index">
          <van-col span="8">{{ item.issueNumber }}</van-col>
          <van-col span="5" class="numcenter">
            <div class="record-body-num" :class="setColor(item.number)">{{ item.number }}</div>
          </van-col>
          <van-col span="5">
            <span v-if="Number(item.number) > 4">{{ $t('big') }}</span>
            <span v-else>{{ $t('small') }}</span>
          </van-col>
          <van-col span="6">
            <div class="record-origin">
              <template v-if="item.number == '0'">
                <div class="record-origin-I red" />
                <div class="record-origin-I violet" />
              </template>
              <template v-if="item.number == '1' || item.number == '3' || item.number == '7' || item.number == '9'">
                <div class="record-origin-I green" />
              </template>
              <template v-if="item.number == '2' || item.number == '4' || item.number == '6' || item.number == '8'">
                <div class="record-origin-I red" />
              </template>
              <template v-if="item.number == '5'">
                <div class="record-origin-I green" />
                <div class="record-origin-I violet" />
              </template>
            </div>
          </van-col>
        </van-row>
      </template>
      <div v-else class="record-body-empty">
        <Empty />
      </div>
    </div>
    <div v-if="NoaverageEmerdList.length" class="record-foot">
      <div class="record-foot-previous" :class="{ disabled: pageNo <= 1 }" @click="pPage">
        <van-icon name="arrow-left" class="record-icon" size="20" />
      </div>
      <div class="record-foot-page">{{ pageNo }}/{{ totalPage }}</div>
      <div class="record-foot-next" :class="{ disabled: pageNo >= totalPage }" @click="nPage">
        <van-icon name="arrow" class="record-icon" size="20" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onActivated, watch, onDeactivated, inject } from 'vue'
import Empty from '@/components/Empty/index.vue'
import { winGoGetNoaverageEmerdList } from '@/api'
import { AwaitApiResult } from '@/utils'
import type { WinGo } from '@/types/api'

const NoaverageEmerdList = ref<WinGo.GetNoaverageEmerdList[]>([])
// 使用 inject 接收父组件传递的实例
const winHook = inject('winHook')
const { typeid, getComponentNum } = winHook
const totalPage = ref(4)
const pageSize = ref(10)
const pageNo = ref(1)
// 上一页
const pPage = () => {
  pageNo.value--
  getData()
}

const emits = defineEmits<{
  (e: 'changefive', val: any): void
}>()
// 下一页
const nPage = () => {
  pageNo.value++
  getData()
}
// 获取记录
const getData = async (claarNo: Boolean = false) => {
  if (typeid == null) return
  const res = await AwaitApiResult<any>(
    winGoGetNoaverageEmerdList({
      pageSize: pageSize.value,
      pageNo: pageNo.value,
      typeId: typeid.value,
    })
  )
  NoaverageEmerdList.value = res.data.list || []
  totalPage.value = res.data.totalPage
}
const isOddNumber = (str: string) => {
  const num = parseInt(str, 10)
  return num % 2 !== 0
}

const setColor = (num: any): any => {
  let className = ''
  if (isOddNumber(num)) {
    className = 'greenColor'
  } else {
    className = 'defaultColor'
  }
  switch (num) {
    case '0':
      className = 'mixedColor0'
      break
    case '5':
      className = 'mixedColor5'
      break
  }
  return className
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
.record {
  text-align: center;
  font-size: 24px;
  padding-bottom: 20px;
  &-head {
    height: 80px;
    line-height: 80px;
    border-radius: 10px 10px 0px 0px;
    font-weight: 700;
    font-size: 26px;
    color: #323536;
    .van-col {
      height: 80px;
      overflow: hidden;
    }
  }

  &-body {
    border-top: 1px solid #e1e1e1;
    line-height: 80px;
    padding: 0 20px 6px 20px;
    .numcenter {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-num {
      height: 60px;
      line-height: 60px;
      width: 60px;
      font-size: 40px;
      font-weight: bold;
      font-size: 50px;
    }
    .mixedColor0 {
      background: linear-gradient(180deg, #f23f3f 50.96%, rgb(182, 89, 254) 50.97%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .mixedColor5 {
      background: linear-gradient(180deg, #18AF5E51.48%, rgb(182, 89, 254) 51.49%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .greenColor {
      color: #47ba7c;
    }
    .defaultColor {
      color: #f23f3f;
    }

    &-empty {
      height: 400px;
    }

    & > div {
      color: #323536;
      border-bottom: 1px solid #e1e1e1;
    }
  }

  &-origin {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    & > div {
      & + div {
        margin-left: 20px;
      }
    }

    &-I {
      width: 20px;
      height: 20px;
      border-radius: 50%;

      &.violet {
        background-color: #ec4cdf;
      }

      &.red {
        background: #f23f3f;
      }

      &.green {
        background: #47ba7c;
      }
    }
  }

  &-foot {
    height: 70px;
    color: #323536;
    padding: 0 178px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-previous,
    &-next {
      width: 70px;
      height: 70px;
      border-radius: 10px;
      background: #fd565c;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;

      &.disabled {
        background: #f0f0f0;
        pointer-events: none;
        color: #d3d3d3;
      }
    }
  }
}
</style>
