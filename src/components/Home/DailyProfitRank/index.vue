<template>
  <div class="dailyProfitRank">
    <div class="title"><b />{{ $t('earningsRankingToday') }}</div>
    <div class="dailyProfitRank__content">
      <div class="dailyProfitRank__content-topThree">
        <div
          v-for="(item, index) in getTopThree"
          :key="index"
          class="dailyProfitRank__content-topThree__item"
          :style="{
            order: index === 0 ? 2 : index === 2 ? 3 : 1,
            top: index === 0 ? '-45px' : '-30px'
          }"
        >
          <div
            :style="{
              background: `url(${getIconsPublic(
                'images/DailyProfitRank',
                `border${index + 1}`
              )}) no-repeat center center / 100% 100%`
            }"
          >
            <template v-if="item.userPhoto.length > 2">
              <img v-lazy="item.userPhoto" :data-img="getIconsPublic('home', 'avatar')">
            </template>
            <template v-else>
              <img v-lazy="getIconsPublic('main/Avatar', item.userPhoto)" :data-img="getIconsPublic('home', 'avatar')">
            </template>
          </div>
          <div>
            <img v-lazy="getIconsPublic('images/DailyProfitRank', `crown${index + 1}`)">
            <img v-lazy="getIconsPublic('images/DailyProfitRank', `place${index + 1}`)">
          </div>
          <span>
            {{ desensitizeString(item.nickName) }}
          </span>
          <span>
            {{ currency(item.price) }}
          </span>
        </div>
      </div>
      <div class="dailyProfitRank__content-list">
        <div v-for="(item, index) in theRest" :key="index" class="dailyProfitRank__content-list__item">
          <span class="left-rank">{{ index + 4 }}</span>
          <template v-if="item.userPhoto.length > 2">
            <img v-lazy="item.userPhoto" :data-img="getIconsPublic('home', 'avatar')">
          </template>
          <template v-else>
            <img v-lazy="getIconsPublic('main/Avatar', item.userPhoto)" :data-img="getIconsPublic('home', 'avatar')">
          </template>
          <span class="middle-name">{{ desensitizeString(item.nickName) }}</span>
          <!-- <span class="middle-name">{{ formatString(item.nickName, 10) }}</span> -->
          <span class="right-box">{{ currency(item.price) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHome } from '@/hooks'
import type { Home } from '@/types/api'
import { currency, getIconsPublic, desensitizeString } from '@/utils'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { homeState } = useHome()

const EmptyData = {
  nickName: t('noData'),
  userPhoto: '',
  price: 0,
  time: '',
  typeName: '',
} as const

// 中奖信息处理
watch(
  () => homeState.rankList,
  (newVal) => {
    getTopThree.value.splice(0, newVal.length, ...newVal.sort((a, b) => b.price - a.price).slice(0, 3))
    theRest.value.splice(0, newVal.length, ...newVal.sort((a, b) => b.price - a.price).slice(3, 10))
  }
)

const getTopThree = ref([EmptyData, EmptyData, EmptyData] as Home.DailyProfitRankProps[])

const theRest = ref([] as Home.DailyProfitRankProps[])
</script>

<style lang="scss" scoped>
.dailyProfitRank {
  color: var(--text_color_L1);
  margin-top: 40px;
  .title {
    height: 84px;
    display: flex;
    align-items: center;
    font-size: 36px;
    font-weight: 500;
    margin-bottom: 120px;
    b {
      display: block;
      height: 26px;
      width: 8px;
      border-radius: 4px;
      background-color: var(--main-color);
      margin-inline-end: 10px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;

    &-topThree {
      position: relative;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      justify-items: center;
      width: 100%;
      height: 250px;
      z-index: 1;
      background: url('@/assets/icons/home/DailyProfitRankStage.png') no-repeat center center / 100% 100%;

      &__item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 225px;
        height: 260px;

        &:nth-child(2) {
          right: 8px;
        }

        &:nth-child(3) {
          left: 12px;
        }

        & > div {
          &:first-of-type {
            position: relative;
            display: grid;
            place-items: center;
            width: 120px;
            min-width: 120px;
            height: 120px;
            min-height: 120px;
            border-radius: 50%;
            overflow: hidden;

            & > img {
              width: calc(100% - 5px);
              height: calc(100% - 5px);
            }
          }

          &:last-of-type {
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 134px;
            height: 137px;

            img {
              &:first-of-type {
                position: relative;
                top: -25px;
                left: -19px;
                width: 86px;
              }

              &:last-of-type {
                width: 134px;
                height: 32px;
              }
            }
          }
        }

        & > span {
          color: #fff;
          padding: 0 10px;
          text-align: center;

          &:first-of-type {
            margin-block: 18% 8%;
            font-size: 24px;
            width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          &:last-of-type {
            width: 200px;
            height: 50px;
            padding: 13px 14px;
            font-size: 24px;
            line-height: 24px;
            text-align: center;
            border-radius: 9rem;
            background: var(--bgDark, rgba(255, 255, 255, 0.3));
          }
        }
      }
    }

    &-list {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      width: 100%;

      &__item {
        display: flex;
        align-items: center;
        width: 100%;
        height: 102px;
        padding: 11px 19px 11px 33px;
        background: var(--darkBg, var(--bg_color_L2));
        border-radius: 10px;

        span {
          &.left-rank {
            margin-right: 31px;
            color: var(--text_color_L2);
            font-size: 36px;
            font-weight: 500;
          }

          &.middle-name {
            color: var(--text_color_L2);
            font-size: 24px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 200px;
          }

          &.right-box {
            line-height: 50px;
            width: 260px;
            height: 50px;
            margin-left: auto;
            color: #fff;
            font-size: 30px;
            text-align: center;
            border-radius: 9rem;
            background: var(--main_gradient-color);
          }
        }

        img {
          width: 80px;
          height: 80px;
          margin-right: 13px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
