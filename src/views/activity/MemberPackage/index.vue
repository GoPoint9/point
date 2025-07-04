<script setup lang="ts">
import ruleContainer from '@/components/common/Rule.vue'
import { useRouter } from 'vue-router'
import { usePackage } from '@/hooks'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { currency } from '@/utils'

const { t } = useI18n()
const router = useRouter()
const { getConfig, onApply, onReceive, store, time, bonusLimit, firstDeposiSendBonust, rewardRecordList } = usePackage()
const onClick = () => {
  router.go(-1)
}
const onRule = () => {
  router.push({
    name: 'MemberPackage-Rules',
  })
}
const states = {
  0: t('witeApply'),
  1: t('c2cState0'),
  2: t('rejected'),
  3: t('unaccalimed'),
  4: t('received'),
}
onMounted(() => {
  getConfig()
})
</script>

<template>
  <div class="package">
    <NavBar
      :title="$t('activityDestitle')"
      :placeholder="false"
      left-arrow
      @click-left="onClick"
    />
    <div class="package-banner">
      <div class="package-banner-text">
        <h3>{{ $t('newMenberPackage') }}</h3>
        <h4>{{ $t('newMenberTip') }}：</h4>
        <p><span>1</span>{{ $t('newMenberRule') }}</p>
        <p><span>2</span>{{ $t('newMenberRule2') }}</p>
        <div>
          <div class="package-desc" @click="onRule">{{ $t('activityDestitle') }}</div>
        </div>
      </div>
    </div>
    <ruleContainer v-if="store.firstDepositConfig" :name="$t('activityTime')" :tiplist="[]">
      <h2 class="package-time">
        {{ time || $t('lotteryActivityUnstarted') }}
      </h2>
    </ruleContainer>
    <div v-if="store.firstDepositConfig" class="package-rule">
      <div class="package-rule-titlebox">
        <div class="package-rule-title">{{ $t('conditionsRule') }}</div>
        <div class="package-rule-title">{{ $t('afterDayBonus') }}</div>
        <div class="package-rule-title">{{ $t('bonusLimit') }}</div>
      </div>
      <ul>
        <li>
          <div>
            {{ $t('newMemberDeposit') }}
          </div>
          <div class="rotateNum">
            <p>{{ $t('todayBonus') }}</p>
            <p>
              <span>{{ firstDeposiSendBonust }}%</span>
            </p>
          </div>
          <div>
            <span>{{ currency(bonusLimit) }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="store.firstDepositConfig" class="package-tips">
      <svg-icon name="activityNote" />

      {{ $t('receiveTips') }}
    </div>
    <ul class="package-list">
      <li v-for="item of rewardRecordList" :key="item.id" class="package-item">
        <div class="package-item-head">
          <p>{{ $t('registrationFull', [item.registerDays]) }}</p>
        </div>
        <div class="package-item-box">
          <div class="package-item-top">
            <ul>
              <li class="moeny">
                <h3>{{ currency(item.actualGrandTotalDeposit) }}</h3>
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <path
                      d="M32.298 18.6091C38.8283 18.6091 44.3643 21.4959 44.5609 25.7142L44.5643 25.9451V33.0765C44.5643 37.4194 38.9472 40.4114 32.2969 40.4114C31.4146 40.4114 30.5506 40.3588 29.714 40.2571V36.7965C30.5255 36.9165 31.3929 36.9828 32.2969 36.9828C37.3037 36.9828 41.1369 34.9416 41.1369 33.0754V31.1142C39.7346 31.9656 37.9769 32.5976 36.0032 32.9554C34.8157 33.1702 33.5689 33.2811 32.2969 33.2811C31.4203 33.2811 30.5552 33.2285 29.714 33.1256V29.6662C30.5437 29.7896 31.4123 29.8525 32.2969 29.8525C33.3655 29.8525 34.4077 29.7611 35.3917 29.5816C38.9186 28.9428 41.1369 27.3199 41.1369 25.9451C41.1369 24.0799 37.3037 22.0376 32.2969 22.0376C31.3929 22.0376 30.5255 22.1051 29.714 22.2251V18.7634C30.5711 18.6599 31.4336 18.6084 32.2969 18.6091H32.298ZM15.6123 6.28564C22.1426 6.28564 27.6786 9.1725 27.8752 13.3896L27.8786 13.6216V35.1074C27.8786 39.4502 22.2615 42.4434 15.6112 42.4434C8.96204 42.4434 3.34375 39.4502 3.34375 35.1074V20.7759V13.6205C3.34375 9.27764 8.96204 6.28564 15.6112 6.28564H15.6123ZM24.4523 33.1462C23.0489 33.9976 21.2912 34.6296 19.3175 34.9874C18.13 35.2022 16.8832 35.3131 15.6112 35.3131C14.3689 35.3151 13.1289 35.2061 11.906 34.9874C9.93232 34.6296 8.17461 33.9976 6.77232 33.1474V35.1074L6.77804 35.2354C6.94718 37.0651 10.7186 39.0148 15.6123 39.0148C20.618 39.0148 24.4512 36.9736 24.4512 35.1074V33.1462H24.4523ZM24.4523 25.9691C23.0489 26.8194 21.2912 27.4525 19.3175 27.8091C18.13 28.0251 16.8832 28.1348 15.6112 28.1348C14.3689 28.1368 13.1289 28.0278 11.906 27.8091C9.93232 27.4525 8.17461 26.8194 6.77232 25.9691V27.9771L6.77918 28.1108C6.91632 29.4559 9.10375 30.9954 12.5163 31.6136C13.5003 31.7919 14.5437 31.8845 15.6112 31.8845C16.6797 31.8845 17.722 31.7931 18.706 31.6136C22.2329 30.9736 24.4512 29.3519 24.4512 27.9771V25.9679L24.4523 25.9691ZM24.4523 18.7908C23.0489 19.6411 21.2912 20.2742 19.3175 20.6308C18.13 20.8479 16.8832 20.9576 15.6112 20.9576C14.3689 20.9597 13.1289 20.8507 11.906 20.6319C9.93232 20.2742 8.17461 19.6422 6.77232 18.7908V20.7999L6.77918 20.9336C6.91632 22.2788 9.10375 23.8171 12.5163 24.4365C13.5003 24.6148 14.5437 24.7062 15.6112 24.7062C16.6797 24.7062 17.722 24.6148 18.706 24.4365C22.2329 23.7965 24.4512 22.1736 24.4512 20.7999V20.7771V18.7908H24.4523ZM15.6112 9.71422C10.6055 9.71422 6.77232 11.7554 6.77232 13.6216C6.77232 14.9965 8.98946 16.6194 12.5175 17.2582C13.5003 17.4365 14.5437 17.5291 15.6112 17.5291C16.6797 17.5291 17.722 17.4365 18.706 17.2582C22.2329 16.6182 24.4512 14.9965 24.4512 13.6216C24.4512 11.7554 20.618 9.71422 15.6112 9.71422Z"
                      fill="#F95959"
                    />
                  </svg>
                </p>
                <p>{{ $t('grandTotalDeposit') }}</p>
              </li>
              <li class="moeny">
                <h3>{{ currency(item.actualTotalValidBet) }}</h3>
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <path
                      d="M6.64044 22.4187V24.1173H9.50881C10.5045 24.1173 11.4001 24.2346 12.1857 24.4335C12.6452 24.5496 13.001 24.6756 13.2468 24.7856L19.1232 27.1091H26.3929L26.6202 27.1227C27.1428 27.1845 27.7938 27.3722 28.4707 27.796C28.9744 28.1045 29.4046 28.5193 29.7315 29.0113C30.0584 29.5033 30.2739 30.0606 30.3632 30.6445L37.8504 27.4612C38.053 27.3377 38.3136 27.1981 38.6224 27.061C39.4439 26.6965 40.2988 26.4927 41.1894 26.557C42.4111 26.6447 43.4932 27.2512 44.2258 28.3654C45.4166 30.1776 45.1424 32.0256 44.0244 33.4672C43.6909 33.8983 43.3549 34.2083 43.0807 34.4072C42.9985 34.4675 42.9118 34.5212 42.8212 34.5678L33.2896 39.4534L23.9409 44.2302L23.5456 44.4192C22.2655 44.9889 20.8394 45.1444 19.4666 44.8639C19.2675 44.8265 19.0711 44.7761 18.8786 44.7132L8.11045 41.1457L6.64044 41.1445V43.0505H3V22.4187H6.64044ZM9.50881 28.0022L6.64044 28.001V37.262H8.42298C8.56134 37.262 8.69845 37.2768 8.83434 37.3064L9.03322 37.3608L20.1287 41.0358L20.424 41.0889C20.9527 41.1568 21.5468 41.0877 22.1287 40.7949L40.8448 31.2165C40.8756 31.1844 40.9152 31.1411 40.9559 31.0892C41.1412 30.8496 41.1536 30.7619 40.9806 30.4988L40.9423 30.437C40.9362 30.4296 40.9312 30.4321 40.909 30.4308H40.8225C40.6644 30.4432 40.4396 30.5049 40.1962 30.6124C40.1622 30.6275 40.1284 30.6432 40.0949 30.6594L39.9343 30.7409L39.6848 30.8916L39.5168 30.9731L27.396 36.1267C27.1557 36.2288 26.8973 36.2813 26.6363 36.2812H16.8552V32.3974H26.241L26.5412 32.2689V31.4289C26.5412 31.1967 26.5165 31.1547 26.4053 31.0855C26.3428 31.0481 26.2766 31.0175 26.2076 30.9941H18.7514C18.5068 30.9941 18.2646 30.9472 18.0373 30.8582L11.7707 28.379L11.6286 28.3172L11.447 28.258L11.2321 28.1987C10.6675 28.0621 10.0883 27.9957 9.50758 28.001L9.50881 28.0022ZM23.6283 3C32.3434 3 39.4056 10.0646 39.4056 18.7783C39.4056 20.609 39.0943 22.3669 38.5199 24.0036L33.5762 25.733C35.0046 23.6955 35.7691 21.2667 35.7652 18.7783C35.7652 12.0744 30.3323 6.64163 23.6308 6.64163C16.928 6.64163 11.4952 12.0744 11.4952 18.7783C11.4952 19.7357 11.6064 20.6683 11.8164 21.5627L7.99927 20.9203C7.90296 20.2104 7.85468 19.4948 7.85474 18.7783C7.85351 10.0646 14.917 3 23.6283 3ZM25.7605 9.79409L25.7592 10.9676C26.6444 11.114 27.5065 11.3756 28.3237 11.7458L27.3021 14.3214L26.9229 14.1547C25.9285 13.7371 25.0576 13.5271 24.3127 13.5271C23.8791 13.5271 23.5641 13.6037 23.3664 13.7557C23.2751 13.819 23.2003 13.9036 23.1487 14.0021C23.0971 14.1006 23.0701 14.2102 23.07 14.3214C23.07 14.5635 23.196 14.7797 23.4467 14.9712C23.6975 15.1627 24.3769 15.5122 25.485 16.0187C26.5498 16.4968 27.2885 17.0106 27.7024 17.5604C28.1162 18.1088 28.3237 18.7993 28.3237 19.6332C28.3237 20.399 28.1298 21.0785 27.7407 21.6714C27.3528 22.2668 26.7919 22.7276 26.0606 23.0574C25.962 23.1019 25.8619 23.1431 25.7605 23.1809V24.6176H22.0546L22.0508 23.4786C21.8378 23.4547 21.626 23.4213 21.4159 23.3786C20.814 23.2473 20.23 23.0441 19.6766 22.7733V19.8024L20.0608 19.9889C20.5784 20.2273 21.1108 20.42 21.6605 20.5658C22.2764 20.7386 22.9121 20.8308 23.5517 20.84C24.0483 20.84 24.4103 20.7536 24.6413 20.5831C24.7491 20.5096 24.8372 20.4106 24.8975 20.2949C24.9578 20.1791 24.9887 20.0503 24.9872 19.9198C24.9907 19.7608 24.9421 19.6051 24.8488 19.4763C24.724 19.3223 24.572 19.1925 24.4004 19.0933C24.1953 18.9636 23.6481 18.6981 22.7574 18.2991C21.9545 17.9334 21.3492 17.5776 20.9477 17.2342C20.5625 16.9141 20.2561 16.5096 20.0521 16.0521C19.8582 15.6074 19.7606 15.0811 19.7606 14.4734C19.7606 13.3369 20.1744 12.45 21.0021 11.8138C21.3218 11.5708 21.6756 11.3764 22.0521 11.2369L22.0546 9.79409H25.7605Z"
                      fill="#F95959"
                    />
                  </svg>
                </p>
                <p>{{ $t('totalValidBet') }}</p>
              </li>
            </ul>
            <div class="package-item-tip">
              <span>{{ $t('giftBonus') }}</span>
              <span>{{ currency(item.giveAwayBonus) }}</span>
            </div>
          </div>
          <div class="package-item-bottom">
            {{ states[item.state] }}
          </div>
        </div>
        <div v-if="item.state === 3" class="package-item-btn" @click="onReceive(item.id)">{{ $t('receive') }}</div>
        <div v-if="item.state === 0 && item.operateState === 2" class="package-item-btn apply" @click="onApply(item.id)">
          {{ $t('activityApply') }}
        </div>
        <div v-if="item.state === 0 && [0, 1].includes(item.operateState)" class="package-item-btn done">{{ states[0] }}</div>
        <div v-if="![0, 3].includes(item.state)" class="package-item-btn done">{{ states[item.state] }}</div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.package {
  &-desc {
    border-radius: 40px;
    border: 1px solid #fff;
    min-width: 180px;
    max-width: 300px;
    height: 50px;
    color: #fff;
    line-height: 50px;
    font-size: 24px;
    text-align: center;
    padding: 0 10px;
  }
  &-banner {
    display: flex;
    align-items: center;
    min-height: 290px;
    margin-bottom: 20px;
    padding: 26px 0;
    background: url('@/assets/icons/activity/MemberPackage/box.png'), linear-gradient(103deg, #faac48 4.77%, #f7602b 96.1%);
    background-size: 100% 354px;
    img {
      display: block;
      width: 202px;
      height: 240px;
    }
    &-text {
      color: #fff;
      margin-left: 34px;
      width: 100%;
      & > div {
        display: flex;
        justify-content: start;
      }
      h3 {
        font-size: 36px;
        font-style: normal;
        font-weight: 700;
        line-height: 36px;
        margin-bottom: 30px;
      }
      h4 {
        font-size: 26px;
        font-style: normal;
        font-weight: 500;
        line-height: 26px;
        margin-bottom: 24px;
      }
      p {
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        margin-bottom: 14px;
      }
      span {
        width: 28px;
        height: 28px;
        display: inline-block;
        border-radius: 50%;
        background: #fff;
        color: var(--norm_secondary-color);
        text-align: center;
        font-size: 22px;
        font-style: normal;
        font-weight: 500;
        line-height: 28px;
        margin-right: 10px;
      }
    }
  }
  &-time {
    color: var(--norm_red-color);
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
    text-align: center;
  }
  &-rule {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 20px 24px 0 24px;
    border-radius: 20px;
    overflow: hidden;
    background: var(--darkBg, var(--bg_color_L2));
    &-titlebox {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      width: 100%;
      color: #fff;
      background: var(--sheet_nva_color);
    }
    ul {
      width: 100%;
      height: 100%;
      padding: 10px 0;
      li {
        display: flex;
        justify-content: center;
        width: 100%;
        font-size: 28px;
        font-weight: 400;
        color: var(--text_color_L1);

        div {
          font-size: 28px;
          padding: 20px 10px;
          text-align: center;
          border-right: 1px solid var(--Dividing-line_color);
          min-height: 120px;
          width: 295px;
          &:first-child {
            width: 200px;
          }
          &:last-child {
            border-right: none;
            width: 200px;
          }
        }
        span {
          color: var(--norm_red-color);
          font-size: 28px;
        }
      }
    }
    &-title {
      width: 100%;
      min-height: 80px;
      padding-block: 26px;
      font-size: 32px;
      line-height: 24px;
      text-align: center;
      color: var(--text_white, var(--text_color_L1));
    }

    &-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 100%;

      & > div {
        width: 100%;
        padding: 26px 0;
        font-size: 28px;
        line-height: 28px;
        text-align: center;
        border-bottom: 1px solid var(--norm_red-color);

        &:last-of-type {
          border-bottom: none;
        }
      }
    }
  }
  &-tips {
    background: var(--bg_color_L2);
    padding: 20px;
    color: var(--norm_red-color);
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 36px;
    border-radius: 50px;
    margin: 20px 20px 0;

    svg {
      width: 36px;
      height: 36px;
      vertical-align: middle;
    }
  }
  &-list {
    padding: 0 24px;
    margin-top: 20px;
  }
  &-item {
    margin-bottom: 40px;
    &-head {
      background: url('@/assets/icons/activity/MemberPackage/head.png') no-repeat center/cover;
      height: 100px;
      font-size: 28px;
      font-style: normal;
      font-weight: 700;
      text-align: center;
      line-height: 40px;
      color: var(--text_white, var(--text_color_L1));
      padding-left: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &-top {
      background: linear-gradient(90deg, #e52c2f 0%, #dc3d1b 95%);
      padding: 20px 30px;
      text-align: center;
      ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .moeny {
        width: 310px;
        height: 180px;
        border-radius: 20px;
        background: url('@/assets/icons/activity/MemberPackage/bg.png') no-repeat;
        background-size: 310px, 180px;
      }
      h3 {
        color: var(--text_color_L1);
        text-align: center;
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: 80px;
      }
      p {
        color: var(--text_color_L2);

        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
      }
      svg {
        width: 48px;
        height: 48px;
      }
    }
    &-box {
      background: linear-gradient(270deg, #ff8a86 0%, #ffae9a 100%);
      border-radius: 0 0 20px 20px;
    }
    &-tip {
      background: #f5f5f5;
      border-radius: 10px;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      color: var(--text_color_L3);
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: 32px;
      margin-top: 20px;
      span:last-child {
        color: var(--norm_secondary-color);
        font-family: Inter;
        font-size: 28px;
        font-style: normal;
        font-weight: 500;
        line-height: 32px;
      }
    }
    &-bottom {
      height: 70px;
      color: var(--text_white, var(--text_color_L1));
      text-align: center;
      line-height: 70px;
      &.done {
        background: linear-gradient(90deg, #f05756 0%, #f38164 101%);
      }
      &.p {
        background: linear-gradient(270deg, #a4b1de 0%, #bdc9ee 100.85%);
      }
    }
    &-btn {
      margin-top: 20px;
      background: var(--main_gradient-color);
      height: 70px;
      text-align: center;
      line-height: 70px;
      color: var(--text_color_L4);
      border-radius: 50px;
      font-size: 32px;
      font-weight: 700;
      &.done {
        background: var(--button_dis_color);
        color: var(--text_color_L3);
      }
      &.apply {
        background: linear-gradient(180deg, #ff9c41 0%, #ff7c1d 100%);
      }
      &.receive {
        background: var(--main_gradient-color);
      }
    }
  }
}
</style>
