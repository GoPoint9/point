<template>
  <div class="GameRecord__C">
    <div class="GameRecord__C-head">
      <van-row>
        <van-col span="8">{{ $t('FDNumber') }}</van-col>
        <van-col span="12">{{ $t('FDResult') }}</van-col>
        <van-col span="4">{{ $t('FDTotal') }}</van-col>
      </van-row>
    </div>
    <div class="GameRecord__C-body">
      <template v-if="NoaverageEmerdList.length">
        <van-row v-for="(item, index) in NoaverageEmerdList" :key="index">
          <van-col span="8">{{ item.issueNumber }}</van-col>
          <van-col span="12">
            <div class="numList">
              <div v-for="(num, index) in [...item.premium]" class="numItem">{{ num }}</div>
            </div>
          </van-col>
          <van-col span="4">
            <span class="redNumItem">{{ item.sumCount }}</span>
          </van-col>
        </van-row>
      </template>
      <div v-else class="GameRecord__C-body-empty">
        <Empty />
      </div>
    </div>
    <div v-if="NoaverageEmerdList.length" class="GameRecord__C-foot">
      <div class="GameRecord__C-foot-previous" :class="{ disabled: pageNo <= 1 }" @click="pPage">
        <van-icon name="arrow-left" class="GameRecord__C-icon" size="20" />
      </div>
      <div class="GameRecord__C-foot-page">{{ pageNo }}/{{ totalPage }}</div>
      <div class="GameRecord__C-foot-next" :class="{ disabled: pageNo >= totalPage }" @click="nPage">
        <van-icon name="arrow" class="GameRecord__C-icon" size="20" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onActivated } from 'vue'
import Empty from '@/components/Empty/index.vue'
import { getNoaverage5DEmerdList } from '@/api'
import { AwaitApiResult } from '@/utils'
import type { FD } from '@/types/api'

const NoaverageEmerdList = ref<FD.resGetNoaverage5DEmerdList[]>([]) // 游戏记录列表
const props = withDefaults(defineProps<{ typeid: number }>(), {})
const totalPage = ref(4) // 总页数
const pageSize = ref(10) // 页面条数
const pageNo = ref(1) // 页数

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
/**
 * 获取数据
 * @param claarNo 是否需要清理数据
 */
const getData = async (claarNo: Boolean = false) => {
  if (props.typeid == null) return
  if (claarNo) {
    pageNo.value = 1
  }
  const res = await AwaitApiResult<ObjResNull<MessageData<FD.resGetNoaverage5DEmerdList>>>(
    getNoaverage5DEmerdList({
      pageSize: pageSize.value,
      pageNo: pageNo.value,
      typeId: props.typeid,
    })
  )
  NoaverageEmerdList.value = res?.data.list || []
  totalPage.value = res?.data.totalPage || 0
}
defineExpose({
  getData,
})

onActivated(() => {
  getData()
})
</script>
<style lang="scss" scoped>
.GameRecord__C {
  width: calc(100% - 52px);
  margin: 36px auto 0;
  text-align: center;
  font-size: 24px;

  &-head {
    height: 80px;
    line-height: 80px;
    background: var(--sheet_nva_color);
    border-radius: 10px 10px 0px 0px;
    font-weight: 700;
    font-size: 26px;
    color: #fff;
  }

  &-body {
    line-height: 80px;
    color: var(--darkTextW, var(--text_color_L1));

    &-empty {
      height: 400px;
    }

    & > div {
      background: var(--darkBg, var(--bg_color_L2));
      color: var(--text_color_L1);

      & + div {
        border-top: 1px solid var(--bgDark-2, var(--gray-color-1));
      }
    }

    &-premium {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: space-between;

      & > div {
        width: 40px;
        height: 40px;
        background-repeat: no-repeat;
        background-size: 40px;
        background-position: center;
      }

      $list: 1 2 3 4 5 6;

      @each $i in $list {
        .n#{$i} {
          background-image: url('@icon/AllGames/n#{$i}.png');
        }
      }
    }

    .numList {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      & > .numItem {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid var(--darkLight, var(--text_color_L2));
        text-align: center;
        line-height: 40px;
        font-size: 24px;
        color: var(--darkLight, var(--text_color_L1));

        & + .numItem {
          margin-left: 8px;
        }
      }
    }

    .redNumItem {
      border-radius: 50%;
      color: var(--text_color_L4);
      font-size: 22px;
      text-align: center;
      line-height: 40px;
      background: var(--main-color);
      padding: 9px;
    }
  }

  &-foot {
    height: 140px;
    background: var(--darkBg, var(--bg_color_L2));
    color: var(--text_color_L2);
    padding: 35px 178px;
    margin-top: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-previous,
    &-next {
      width: 70px;
      height: 70px;
      border-radius: 10px;
      background: var(--main-color);
      display: flex;
      align-items: center;
      justify-content: center;

      &.disabled {
        background: var(--bg_color_L3);
        pointer-events: none;

        .GameRecord__C-icon {
          color: var(--text_color_L3);
        }
      }
      .GameRecord__C-icon {
        color: var(--text_color_L4);
      }
    }
  }
}
</style>
