<template>
  <div class="Xoso">
    <NavBar
      class="main"
      left-arrow
      background-color="linear-gradient(90deg, #F95959 0%, #FF9A8E 100%)"
      :title="title"
      @click-left="backGo"
    >
      <!-- <template #right>
				<div class="WinGo__C-head-more">
					<div @click="goPath('AllLotteryGames-XoSoRecord')">投注记录</div>
				</div>
			</template> -->
    </NavBar>

    <van-sticky
      v-if="id == '5'"
      :offset-top="46"
      :container="containerRef"
      class="bet-container-sticky"
    >
      <div style="background-color: #f7f8ff">
        <NavTab
          v-slot="{ item, index }"
          ref="tabRefs"
          v-model:active="active"
          :list="xosoList"
          tab-class-name="tabs"
          active-class-name="tab_active"
          tab-item-class-name="funtab_item"
          @on-click-tab="onClickTab"
        >
          <div class="tab_item" :class="{ tab_active: index === active }">
            <span> {{ $t(item.week) }} </span>
            <p>{{ item.day }}</p>
          </div>
        </NavTab>
      </div>
    </van-sticky>

    <div v-if="xosoList[active]" class="Xoso-page">
      <div v-for="(item, index) in xosoList[active].areInfos" :key="index" class="Xoso-page-box">
        <div class="title">{{ $t('code' + item.areNameCode) }}</div>
        <div class="list">
          <div
            v-for="(citem, index) in item.areIssueNos"
            :key="index"
            class="item"
            @click="goPath('AllLotteryGames-NewVietnam', citem, xosoList[active].day, item.areId)"
          >
            <h4 v-if="citem.status == 1 || citem.status == 2 || citem.status == 3">
              {{ $t('code' + citem.nameCode) }}
              <img class="img" :src="getIcons('public', 'xosoCity')" alt="">
            </h4>
            <div v-if="citem.status == 1 || citem.status == 2 || citem.status == 3" class="info">
              <div class="issue"><img class="img" :src="getIcons('public', 'ticketstar')" alt="">{{ citem.issueNo }}</div>
              <p>{{ $t('xosoTxt72') }}</p>
              <div class="time">
                <div v-for="(item, index) in xosoList[active].day.split('-')" :key="index">{{ item }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import NavTab from '@/components/FunTab/NavBar.vue'
import { useCommonStore } from '@/stores'
import { getIcons, AwaitApiResult } from '@/utils'
import { xosoGetDayIssueNoList, GetFXosoIssueNoList } from '@/api'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const id = router.currentRoute.value.query.id
const title = computed(() => {
  if (id == '5') return 'XOSO'
  if (id == '6') return t('fXosoTitle')
  return 'XOSO'
})

const { setLoading } = useCommonStore()
// 返回上一页
const backGo = () => {
  router.go(-1)
}

// 跳转路由
const goPath = (name: string, data: any, day: string, areId: number) => {
  data.day = day
  data.id = id
  data.areId = areId
  router.push({ name, query: data })
}

const containerRef = ref<HTMLElement>(null as any)
const active = ref(0)
const onClickTab = (val: any) => {
  sessionStorage.setItem('xosoList', JSON.stringify(xosoList.value[val.index]))
}

const xosoList = ref<any>([])
const Gamelist = async () => {
  setLoading(true)
  let res
  if (id == '5') {
    res = await AwaitApiResult<any>(xosoGetDayIssueNoList())
  } else if (id == '6') {
    res = await AwaitApiResult<any>(GetFXosoIssueNoList())
  }
  if (res) {
    xosoList.value = res.data
    sessionStorage.setItem('xosoList', JSON.stringify(res.data[0]))
  }
  setLoading(false)
}

Gamelist()
</script>

<style scoped lang="scss">
.Xoso {
  padding: 0 24px;
  :deep(.van-sticky) {
    padding-top: 20px;
    background-color: var(--bg_color_L2);
    .tabs {
      background-color: var(--bg_color_L2);
      height: 130px;
      .fun-tab-item {
        min-width: 220px;
        height: 110px;
        padding: 0 40px;
        color: var(--bgDark, var(--text_color_L2));
        background-size: 100%;
        border-radius: 12px;
        background: var(--darkBg, var(--bg_color_L2));
        font-size: 26px;
        margin-right: 12px;
        p {
          margin-top: 5px;
        }
        &.activeClassName {
          background: var(--linerGradien-94, var(--main_gradient-color2));
          color: #fff !important;
          background-size: 100%;
          z-index: 2;
        }
      }
    }
  }
  &-page {
    margin-top: 20px;
    &-box {
      .title {
        height: 30px;
        line-height: 30px;
        position: relative;
        padding-left: 26px;
        font-size: 30px;
        color: var(--darkTextW, var(--text_color_L1));
        font-weight: 700;
        margin-bottom: 20px;
        &::after {
          content: '';
          display: block;
          width: 6px;
          height: 100%;
          background-color: var(--darkLight, var(--main-color));
          position: absolute;
          left: 0;
          top: 0;
        }
      }
      .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item {
          width: calc(50% - 22px);
          margin-bottom: 20px;
          & > h4 {
            height: 100px;
            border-radius: 10px 10px 0 0;
            padding: 0 14px;
            background: var(--main_gradient-color);
            font-size: 32px;
            color: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .img {
              width: 48px;
              display: block;
            }
          }
          .info {
            padding: 14px;
            background-color: var(--darkBg, var(--bg_color_L2));

            border-radius: 0 0 10px 10px;
            .issue {
              display: flex;
              align-items: center;
              color: var(--darkTextW, var(--main-color));
              font-size: 28px;
              border-bottom: 1px solid var(--gray-color-1);
              padding: 10px 0;
              img {
                width: 48px;
                display: block;
                margin-right: 5px;
              }
            }
            p {
              color: var(--bgDark, var(--text_color_L2));
              font-size: 22px;
              text-align: center;
              height: 60px;
              line-height: 50px;
            }
            .time {
              display: flex;
              color: var(--textM3, var(--text_color_L2));
              background-color: var(--bgDark-2, var(--LotteryXosoTimeBg));
              border-top: 10px solid var(--darkLight, var(--LotteryXosoTimeColor));
              border-radius: 10px;
              text-align: center;
              line-height: 52px;
              position: relative;
              &::after,
              &::before {
                content: '';
                display: block;
                height: 18px;
                width: 10px;
                background-color: var(--darkLight, var(--LotteryXosoTimeColor));
                border: 2px solid var(--darkBg, var(--bg_color_L2));
                border-radius: 14px;
                position: absolute;
                top: -20px;
              }
              &::after {
                left: 35%;
              }
              &::before {
                right: 35%;
              }

              & > div {
                flex: 1;
                height: 52px;
                font-size: 28px;
                font-weight: 500;
                position: relative;
                &::after {
                  content: '';
                  display: block;
                  width: 1px;
                  height: 30px;
                  background-color: #d2d2d2;
                  position: absolute;
                  right: 0;
                  top: 50%;
                  margin-top: -15px;
                }
                &:last-child {
                  &::after {
                    display: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
