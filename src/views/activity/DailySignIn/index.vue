<template>
  <div class="dailySignIn__container">
    <NavBar
      class="activity"
      :title="$t('checkIn')"
      :background-color="'#f95959'"
      :placeholder="false"
      left-arrow
      @click-left="onClick"
    />

    <div class="dailySignIn__container-hero">
      <div class="dailySignIn__container-hero__header">
        <h1>{{ $t('code9007') }}</h1>
        <p>{{ $t('descRewordsBasedOnConsecutiveDays') }}</p>

        <div>
          {{ $t('checkedInConsecutively') }}<span>{{ signModel.signCount || 0 }}</span>{{ $t('days') }}
        </div>
        <p>{{ $t('comulativelyObtained') }}</p>
        <h1>{{ currency(signModel.signInSum) || currency(0) }}</h1>
      </div>
      <div class="dailySignIn__container-hero__footer">
        <button @click="onButtonClick('rules')">{{ $t('playRules') }}</button>
        <button @click="onButtonClick('record')">{{ $t('checkInRecord') }}</button>
      </div>
    </div>

    <div class="dailySignIn__container-content">
      <div class="dailySignIn__container-content__wrapper">
        <div
          v-for="(item, index) in signInList.slice(0, 6)"
          :key="index"
          class="dailySignIn__container-content__wrapper-block"
          :class="{ signed: index < signModel.signCount }"
        >
          <div class="dailySignIn__container-content__wrapper-block__header">
            <img v-lazy="getIconsPublic('activity/DailySignIn', 'SignInTop')">
            <span>{{ currency(item.bouns) }}</span>
          </div>
          <img v-lazy="getIconsPublic('activity/DailySignIn', 'coin')">
          <!-- {{ $t('continuous') }} -->
          <span>{{ item.day }} {{ $t('days') }}</span>
        </div>
        <div
          v-for="item in signInList.slice(6, 7)"
          class="dailySignIn__container-content__wrapper-block"
          :class="{ signed: signModel.signCount >= 7 }"
        >
          <span class="lastImage"><img v-lazy="getIconsPublic('activity/DailySignIn', 'day7Bg')"></span>
          <div>
            <span>
              {{ currency(item.bouns) }}
            </span>
            <!-- {{ $t('continuous') }} -->
            <span> {{ item.day }} {{ $t('days') }} </span>
          </div>
        </div>
      </div>
      <div class="dailySignIn__container-content__footer">
        <button
          :disabled="isSignedToday"
          :class="{ greyBtn: isSignedToday }"
          @click="($event: Event) => { $event.stopPropagation(); submitCheckIn() }"
        >
          {{ $t('checkIn') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GetDailySignIn, SetContinuousSinIn } from '@/api'
import { GlobalStore } from '@/stores'
import type { UserInfo, DailySignInData } from '@/types/api'
import { AwaitApiResult, getIcons, currency, getIconsPublic } from '@/utils'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const router = useRouter()
const globalStore = GlobalStore()
const userInfo = globalStore.getUserInfo as UserInfo

const signModel = ref<DailySignInData['data']['signModel']>({} as any)
const signInList = ref<DailySignInData['data']['signInlist']>([] as any)

let isSignedToday = false

function onClick () {
  router.go(-1)
}

function onButtonClick (type: 'rules' | 'record') {
  router.push({
    name:
      type === 'rules' ? `${String(router.currentRoute.value.name)}-Rules` : `${String(router.currentRoute.value.name)}-Record`,
  })
}
async function submitCheckIn () {
  const res: any = await AwaitApiResult(
    SetContinuousSinIn({
      // uid: userInfo.userId,
      // sign: userInfo.sign
    })
  )
  if (res) {
    localStorage.setItem('signedFlag', '1')
  }
  initList()
}
const initList = async () => {
  const res: any = await AwaitApiResult(
    GetDailySignIn({
      uid: userInfo.userId,
      sign: userInfo.sign,
    })
  )
  if (localStorage.getItem('signedFlag') === '1') {
    isSignedToday = true
  }
  signInList.value = res.data.signInRechargesList
  signModel.value = res.data.signIn
}
onMounted(async () => {
  localStorage.setItem('signedFlag', '0')
  initList()
})
</script>

<style lang="scss" scoped>
.dailySignIn__container {
  font-family: 'Inter', sans-serif;
  padding-bottom: 96px;
  background: var(--bgColor-67);
  :deep(.navbar) {
    .navbar__content {
      background: var(--bg_color_L2);
      .navbar__content-left {
        .van-icon {
          color: var(--textW);
        }
      }

      .navbar__content-title {
        color: var(--textW);
      }
    }
  }

  .greyBtn {
    filter: grayscale(1) !important;
  }

  &-hero {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 490px;
    margin-bottom: 32px;
    padding: 0 30px 20px;
    // background: url('@icon/activity/headerBg.png') no-repeat center/cover, #f54545 no-repeat center/cover;

    &__header {
      color: #fff;

      h1 {
        font-size: 40px;

        &:last-of-type {
          margin-bottom: 0;
          font-size: 38px;
          font-weight: 700;
        }
      }

      p {
        font-size: 24px;
        margin-bottom: 28px;

        &:first-of-type {
          width: 400px;
          word-wrap: break-word;
          display: -webkit-box;
          // -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          // text-overflow: ellipsis;
        }

        &:last-of-type {
          margin-bottom: 6px;
        }
      }

      div {
        display: inline-block;
        width: 330px;
        // height: 60px;
        margin-bottom: 16px;
        padding: 16px 31px 16px 11px;
        color: #f95959;
        font-size: 28px;
        line-height: 24px;
        background: #fff;
        clip-path: polygon(100% 0, 90% 50%, 100% 100%, 0 100%, 0 0);
        word-break: break-all;

        span {
          margin-inline: 10px;
          font-size: 40px;
          font-weight: 600;
          line-height: 1;
        }
      }
    }

    &__footer {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;

      button {
        width: 265px;
        height: 60px;
        padding: 14px 0;
        color: #fff;
        font-size: 26px;
        line-height: 24px;
        border: none;
        border-radius: 9rem;
        background: linear-gradient(180deg, #ffbd40 0%, #ff7f3d 100%);
        cursor: pointer;
      }
    }
  }

  &-content {
    padding-inline: 24px;

    &__wrapper {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      justify-items: center;
      gap: 15px;

      &-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 224px;
        height: 220px;
        background: var(--bg_color_L2);
        border-radius: 10px;
        &__header {
          position: relative;
          display: flex;

          img {
            width: 224px;
            height: 54px;
            visibility: hidden;
          }

          span {
            position: absolute;
            top: calc(50% - 2px);
            left: 50%;
            transform: translate(-50%, -50%);
            color: var(--text_color_L1);
            font-size: 32px;
            line-height: 1;
          }
        }

        & > img {
          width: 80px;
          height: 80px;
          margin-block: 14px 20.83px;
        }

        & > span {
          color: var(--text_color_L2);
          font-size: 26px;
        }

        img {
          max-width: 100%;
        }

        &:last-of-type {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: space-between;
          grid-column: 1 / -1;
          background: var(--bg_color_L2);

          .lastImage {
            display: flex;
            align-items: center;
            width: 650px;
            background-color: transparent;
            height: 220px;

            img {
              width: 268px;
              height: 184px;
            }
          }

          & > div {
            position: absolute;
            top: 50%;
            right: 135px;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 27px;

            & > span {
              &:first-of-type {
                position: relative;
                color: var(--text_color_L1);
                font-size: 32px;

                &::before {
                  content: '';
                  position: absolute;
                  top: 50%;
                  left: -40px;
                  transform: translate(-100%, -50%);
                  display: block;
                  width: 24px;
                  height: 2px;
                  background: linear-gradient(270deg, #c0c4dc 0%, rgba(192, 196, 220, 0) 100%);
                }

                &::after {
                  content: '';
                  position: absolute;
                  top: 50%;
                  right: -40px;
                  transform: translate(100%, -50%);
                  display: block;
                  width: 24px;
                  height: 2px;
                  background: linear-gradient(270deg, #c0c4dc 0%, rgba(192, 196, 220, 0) 100%);
                }
              }

              &:last-of-type {
                color: var(--text_color_L2);
                font-size: 30px;
              }
            }
          }
        }
      }

      &-block.signed {
        background: url('../../../assets/icons/activity/DailySignIn/Signed.png') no-repeat;
        background-position: center;
        background-size: 96% 100%;

        img {
          visibility: visible;
        }

        span {
          color: #fff !important;
        }

        &:last-of-type {
          background: url('../../../assets/icons/activity/DailySignIn/day7BgActive.png') no-repeat;
          background-position: center;
          background-size: 100% 100%;
        }
      }
    }

    &__footer {
      width: 100%;
      height: 80px;
      margin-top: 109px;
      padding: 0 85px;
      text-align: center;

      button {
        width: 100%;
        height: 100%;
        padding-block: 8px;
        color: var(--text_color_L4);
        font-size: 36px;
        border: none;
        border-radius: 9rem;
        background: var(--main_gradient-color);
        &:active {
          background: var(--main_gradient-color);
        }
      }
    }
  }
}
</style>
