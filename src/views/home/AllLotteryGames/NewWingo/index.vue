<template>
  <div class="head">
    <svg
      class="i"
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="34"
      viewBox="0 0 21 34"
      fill="none"
    >
      <path
        d="M19 2L2 17L19 32"
        stroke="#323536"
        stroke-width="4"
        stroke-linejoin="round"
      />
    </svg>
    <span
      class="t"
      @click="showGameType = true"
    >wingo {{ currentGame.typeName }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="8"
        viewBox="0 0 9 8"
        fill="none"
      >
        <path
          d="M5.21907 7.57895C4.89494 8.14035 4.08463 8.14035 3.7605 7.57895L0.114077 1.26316C-0.210049 0.701754 0.195109 -5.66721e-08 0.843362 0L8.13621 6.37561e-07C8.78446 6.94233e-07 9.18962 0.701755 8.86549 1.26316L5.21907 7.57895Z"
          fill="#323536"
        />
      </svg>
    </span>
    <div />
  </div>
  <div id="wingo">
    <div class="wallet">
      <div class="l">
        <div class="t">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M3 9.77734C3 8.67277 3.89543 7.77734 5 7.77734H23C24.1046 7.77734 25 8.67277 25 9.77734V21.4916C25 22.5962 24.1046 23.4916 23 23.4916H5C3.89543 23.4916 3 22.5962 3 21.4916V9.77734Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.07422 6.20673H20.1771L18.5492 2.58938C18.3225 2.08574 17.7305 1.8612 17.2269 2.08784L8.07422 6.20673Z"
              fill="#FFADB3"
            />
            <path d="M26 12H21C19.8954 12 19 12.8954 19 14V17C19 18.1046 19.8954 19 21 19H26V12Z" fill="#FFADB3" />
            <ellipse
              cx="21.8566"
              cy="15.5714"
              rx="1.57143"
              ry="1.57143"
              fill="white"
            />
          </svg>
          {{ $t('walletBalance') }}
        </div>
        <div class="a">
          <span>{{ dollarSign }}</span>{{ amount }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            :class="{ rotate: isRefreshing }"
            @click="getA"
          >
            <g opacity="0.7" clip-path="url(#clip0_5037_38697)">
              <path
                d="M5.13867 22.0156C6.26411 30.2231 13.8299 35.9642 22.0374 34.8388C28.9245 33.8944 34.0749 28.4151 34.8889 21.8272"
                stroke="white"
                stroke-width="2"
              />
              <path d="M30.5234 15.2949L34.9064 17.6034L37.2149 13.2205" stroke="white" stroke-width="2" />
              <path
                d="M34.9061 17.6032C33.7807 9.39577 26.2148 3.65465 18.0074 4.78009C11.1723 5.71735 6.04768 11.1213 5.17505 17.6426"
                stroke="white"
                stroke-width="2"
              />
              <path d="M9.26758 25.0122L5.29121 21.9948L2.27384 25.9712" stroke="white" stroke-width="2" />
            </g>
            <defs>
              <clipPath id="clip0_5037_38697">
                <rect width="40" height="40" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div class="r" @click="goPath('Recharge')">{{ $t('recharge') }}</div>
    </div>
    <div class="history10">
      <div class="l1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <circle
            cx="6"
            cy="20"
            r="6"
            fill="#44D486"
          />
          <circle
            cx="20"
            cy="20"
            r="6"
            fill="#FD717F"
          />
          <circle
            cx="34"
            cy="20"
            r="6"
            fill="#B97DFF"
          />
        </svg>
        {{ nw2 }}
      </div>
      <div class="l2">
        <div class="num" :class="['b' + history1]" />
        <div class="l" />
        <div v-for="(numI, index) in history2" :key="index" :class="['num', 'b' + numI]" />
      </div>
      <div v-show="opMiss || lastTime" class="zhongjiang">
        <div ref="a1" class="c" :class="{ opMiss }">
          <div
            v-for="(item, index) in list"
            v-show="item != history1"
            :key="index"
            :class="['n' + item]"
          />
        </div>
        <div v-show="opMiss" :class="['n' + history1, 'winN']" />
      </div>
    </div>
    <div class="bet">
      <div class="l1">
        {{ $t('nw3') }}<span>{{ issue }}</span>
      </div>
      <div v-if="!banBet" class="l2" :class="{ ban: pTime < 12 }">
        {{ $t('nw1') }}<span>{{ countdown }}</span>
      </div>
      <div v-else class="l2 ban">{{ $t('nw4') }}</div>
      <div class="l3">
        <div class="betNum">
          <div
            v-for="(item, index) in 10"
            :key="index"
            :class="[randomNum == item ? 'active' : '', 'b' + index]"
            @click="betting(index, 1)"
          >
            x0.0
          </div>
        </div>
        <div class="betcolor">
          <div class="g" @click="betting(11, 0)">{{ $t('green') }}<span>x0.0</span></div>
          <div class="p" @click="betting(12, 0)">{{ $t('purpleColor') }}<span>x0.0</span></div>
          <div class="r" @click="betting(10, 0)">{{ $t('redColor') }}<span>x0.0</span></div>
          <div class="size">
            <div class="s" @click="betting(14, 2)">{{ $t('small') }}<span>x0.0</span></div>
            <div class="b" @click="betting(13, 2)">{{ $t('big') }}<span>x0.0</span></div>
          </div>
        </div>
        <div class="ramd">
          <div @click="random">{{ $t('randomBet') }}</div>
          <div
            v-for="(item, i) in multipleList"
            :key="i"
            :class="{ active: item == betInfo.count }"
            @click="TaskCount(item)"
          >
            x{{ item }}
          </div>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="line"
        viewBox="0 0 690 2"
        fill="none"
      >
        <path
          d="M0 1H690"
          stroke="#E4E5EB"
          stroke-width="2"
          stroke-dasharray="8 8"
        />
      </svg>
      <div class="l4">
        <div class="t">{{ $t('nw5') }}</div>
        <div class="c">
          <div v-if="!nowBet.length" class="n">
            {{ $t('nw8') }}
          </div>
          <div v-for="(item, key) in nowBet" :key="key" :class="['n' + item.selecttype, item.selecttype < 10 && 'num']">
            <div class="f">{{ tipColorTextMap(item.selecttype) }}</div>
            <div>{{ currency(item.amount) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="history">
      <div class="nav">
        <div :class="{ active: gameComponent == 'trend' }" @click="gameComponent = 'trend'">{{ $t('chartTrends') }}</div>
        <div :class="{ active: gameComponent == 'record' }" @click="gameComponent = 'record'">{{ $t('nw6') }}</div>
        <div :class="{ active: gameComponent == 'myr' }" @click="gameComponent = 'myr'">{{ $t('nw7') }}</div>
      </div>
      <KeepAlive>
        <component :is="GameRecordList[gameComponent]" ref="RecordComponent" :typeid="typeid" />
      </KeepAlive>
    </div>
  </div>
  <van-popup
    v-model:show="showGameType"
    round
    position="top"
    :style="{ height: 'fit-content' }"
  >
    <div class="head">
      <svg
        class="i"
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="34"
        viewBox="0 0 21 34"
        fill="none"
      >
        <path
          d="M19 2L2 17L19 32"
          stroke="#323536"
          stroke-width="4"
          stroke-linejoin="round"
        />
      </svg>
      <span class="t" @click="showGameType = true">wingo {{ currentGame.typeName }}</span>
      <div />
    </div>
    <div class="typeList">
      <div v-for="(item,index) in typeList.filter((i:any)=>i.typeID != typeid)" :key="index" @click="cg(item.typeID)">
        {{ item.typeName }}
      </div>
    </div>
  </van-popup>
  <bet />
  <tip />
</template>

<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import record from './components/record.vue'
import trend from './components/trend.vue'
import myr from './components/myRecord.vue'
import bet from './components/bet.vue'
import tip from './components/tip.vue'
import { wingoHook } from './wingo.hook'
import { currency } from '@/utils'
import animationData from './win.json'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const dollarSign = sessionStorage.getItem('dollarSign')
const a1 = ref()
const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const isRefreshing = ref(false)
const showGameType = ref(false)
// 动态组件ref
const RecordComponent = ref()
// 动态组件
const GameRecordList: any = {
  record,
  trend,
  myr,
}
// 动态组件展示
const gameComponent = ref('trend')
const winHook = wingoHook()
const {
  amount,
  history1,
  history2,
  issue,
  multipleList,
  typeid,
  randomNum,
  typeList,
  currentGame,
  countdown,
  lastTime,
  banBet,
  betInfo,
  opMiss,
  pTime,
  nowBet,
  initA1,
  betting,
  getWinsUserAmount,
  goPath,
  changeGame,
  getType,
  getGameIssue,
  getHistory10,
  random,
  TaskCount,
} = winHook
provide('winHook', winHook)
// 切换游戏类型
const cg = (typeID: any) => {
  showGameType.value = false
  changeGame(typeID)
}
const getA = () => {
  getWinsUserAmount()
  isRefreshing.value = true
  setTimeout(() => {
    isRefreshing.value = false
  }, 1000) // 旋转动画时间
}

const tipColorTextMap = (type: any) => {
  const map = {
    10: t('redColor'),
    11: t('green'),
    12: t('purpleColor'),
    13: t('big'),
    14: t('small'),
  }
  return map[type] || type
}
onMounted(async () => {
  await getType()
  await getGameIssue()
  getWinsUserAmount()
  getHistory10()
  initA1({
    container: a1.value, // the dom element
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData,
  })
})
</script>
<style lang="scss" scoped>
.head {
  height: 88px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  background-color: #fff;
  position: relative;
  box-shadow: 0px 1px 0px 0px #dfe1ef;
  .i {
    width: 17px;
    height: 30px;
  }
  .t {
    font-size: 36px;
    color: #323536;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
    svg {
      width: 14px;
      height: 14px;
    }
  }
}
.rotate {
  animation: rotate 1s ease-in-out;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
#wingo {
  height: fit-content;
  background-image: url('./img/bg.png'), linear-gradient(180deg, #f73a47 8.82%, #eeeff5 83.31%);
  background-position: top, top;
  background-repeat: no-repeat, no-repeat;
  background-size: contain, contain;
  padding: 24px 30px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  .wallet {
    height: 94px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .l {
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      padding: 6px 0;
      .t {
        display: flex;
        gap: 10px;
        svg {
          width: 28px;
          height: 28px;
        }
      }
      .a {
        color: #fff;
        text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
        font-size: 40px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 10px;
        svg {
          width: 40px;
          height: 40px;
        }
        span {
          margin-right: 8px;
        }
      }
    }
    .r {
      background: #fff;
      color: #323536;
      border-radius: 16px;
      height: 84px;
      width: fit-content;
      padding: 0 29px;
      display: flex;
      align-items: center;
      font-size: 28px;
    }
  }
  .history10 {
    background-color: #fff;
    height: 155px;
    padding: 20px 24px 28px 20px;
    border-radius: 32px;
    position: relative;
    z-index: 10;
    .l1 {
      height: 40px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 28px;
      color: #323536;
      svg {
        width: 40px;
        height: 40px;
      }
    }
    .l2 {
      height: 48px;
      display: flex;
      gap: 16px;
      & > div:not(.l) {
        width: 48px;
        height: 48px;
        background-size: 48px;
        background-repeat: no-repeat;
      }

      $list: 0 1 2 3 4 5 6 7 8 9;
      @each $i in $list {
        .b#{$i} {
          background-image: url('./img/b#{$i}.png');
        }
      }
      .l {
        width: 2px;
        height: 48px;
        background: linear-gradient(180deg, rgba(255, 92, 92, 0) 0%, rgba(255, 92, 92, 0.4) 49.5%, rgba(255, 92, 92, 0) 100%);
      }
    }

    .zhongjiang {
      position: absolute;
      width: 100%;
      height: 969px;
      top: 0;
      left: 0;
      .c {
        position: absolute;
        top: 343px;
        width: 100%;
        height: 626px;
        z-index: 1;
        border-radius: 20px;
        opacity: 1;
        background-image: url('./img/w1.png');
        background-size: 0;
        &.opMiss {
          background-size: 100%;
          background-repeat: no-repeat;
          animation: fadeOut 2s ease-out;
          & > div {
            display: block;
            z-index: 10;
            animation: fadeOut1 2s ease-out;
          }
        }
        & > div {
          position: absolute;
          $list: 0 1 2 3 4 9 8 7 6 5;
          width: 104px;
          height: 104px;
          display: none;
          z-index: 10;
          opacity: 1;
          @each $i in $list {
            &.n#{$i} {
              background-image: url('./img/b#{$i}.png');
              background-repeat: no-repeat;
              background-size: 104px;
            }
          }
          &.n0 {
            left: 36px;
            top: 188px;
          }
          &.n1 {
            left: 154px;
            top: 100px;
          }
          &.n2 {
            left: 290px;
            top: 48px;
          }
          &.n3 {
            left: 428px;
            top: 98px;
          }
          &.n4 {
            left: 546px;
            top: 188px;
          }
          &.n9 {
            left: 36px;
            top: 322px;
          }
          &.n8 {
            left: 154px;
            top: 416px;
          }
          &.n7 {
            left: 290px;
            top: 466px;
          }
          &.n6 {
            left: 428px;
            top: 416px;
          }
          &.n5 {
            left: 542px;
            top: 326px;
          }
        }
      }
      .winN {
        position: absolute;
        top: 8px;
        left: 20px;
        width: 50px;
        height: 50px;
        background-repeat: no-repeat;
        background-size: 50px;
        $list: 0 1 2 3 4 5 6 7 8 9;
        z-index: 100;
        opacity: 1;
        @each $i in $list {
          &.n#{$i} {
            background-image: url('@/assets/icons/home/AllLotteryGames/WinGo/n#{$i}.png');
            animation: moveAndResize#{$i} 2s infinite;
          }
        }
      }
    }
  }
  .bet {
    background-color: #fff;
    border-radius: 32px;
    padding: 21px 24px 27px 24px;
    display: flex;
    flex-direction: column;
    gap: 0;
    .l1 {
      height: 42px;
      margin-bottom: 27px;
      display: flex;
      font-size: 28px;
      align-items: center;
      color: #929292;
      span {
        color: #323536;
        font-weight: 500;
      }
    }
    .l2 {
      height: 50px;
      border-radius: 8px;
      line-height: 50px;
      text-align: center;
      border: 2px solid #cbebd6;
      background: #e6f2ea;
      color: #07962f;
      font-size: 28px;
      margin-bottom: 24px;
      span {
        font-weight: 500;
        margin-left: 8px;
      }
      &.ban {
        border-color: #ffd2d2;
        background: #ffeaea;
        color: #ff4a59;
      }
    }
    .l3 {
      margin-bottom: 32px;
      .betNum {
        width: calc(104px * 5 + 22px * 4);
        height: 316px;
        display: flex;
        flex-wrap: wrap;
        gap: 16px 22px;
        margin: auto;
        margin-bottom: 16px;
        & > div {
          width: 104px;
          height: 150px;
          padding-top: 108px;
          color: #cacaca;
          font-size: 28px;
          text-align: center;
          background-size: 104px;
          background-repeat: no-repeat;
          &.active {
            transform: scale(0.9);
          }
        }
        $list: 0 1 2 3 4 5 6 7 8 9;
        @each $i in $list {
          .b#{$i} {
            background-image: url('./img/b_#{$i}.png');
          }
        }
      }
      .betcolor {
        display: flex;
        height: 172px;
        gap: 10px;
        margin-bottom: 16px;
        & > div {
          width: 154px;
          height: 172px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          &:not(.size) {
            line-height: 48px;
            font-size: 32px;
            font-weight: 500;
            color: #fff;
            span {
              line-height: 42px;
              font-size: 28px;
              font-weight: 500;
              color: rgba(255, 255, 255, 0.5);
            }
          }
          &.g {
            background: #13c164;
            box-shadow: 0px 4px 0px 0px #08aa61;
          }
          &.p {
            background: #b76bf2;
            box-shadow: 0px 4px 0px 0px #a043e8;
          }
          &.r {
            background: #f0484b;
            box-shadow: 0px 4px 0px 0px #d5191d;
          }
          &.size {
            display: flex;
            flex-direction: column;
            gap: 10px;
            & > div {
              height: 81px;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 32px;
              font-weight: 500;
              color: #fff;
              gap: 6px;
              span {
                font-size: 28px;
                font-weight: 500;
                color: rgba(255, 255, 255, 0.5);
              }
            }
            .s {
              border-radius: 8px;
              background: #609dec;
              box-shadow: 0px 4px 0px 0px #2d7fe9;
            }
            .b {
              border-radius: 8px;
              background: #f8b460;
              box-shadow: 0px 4px 0px 0px #f49c30;
            }
          }
        }
      }
      .ramd {
        display: flex;
        gap: 10px;
        & > div {
          border-radius: 8px;
          border: solid 2px #e1e3f2;
          background: #fff;
          color: #323536;
          font-size: 24px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 72px;
          height: 72px;
          &:first-of-type {
            width: 154px;
            font-weight: 400;
          }
          &.active {
            background: #fd565c;
            color: #fff;
            border-color: #fd565c;
          }
        }
      }
      .line {
        width: 100%;
        height: 2px;
      }
    }
    .l4 {
      padding: 24px 0 0 0;
      display: flex;
      .t {
        min-height: 100px;
        display: flex;
        align-items: center;
        line-height: 36px;
      }
      .c {
        width: 475px;
        flex: none;
        height: fit-content;
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        font-size: 28px;
        text-align: center;
        color: #929292;
        .n {
          width: 100%;
          text-align: center;
          height: 100px;
          color: #929292;
        }
        & > div {
          height: 100px;
          width: fit-content;
          min-width: 135px;
          color: #fff;
          font-size: 24px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;

          &.num {
            border: 2px solid #e1e3f2;
            // background-size: 42px;
            // background-repeat: no-repeat;
            // background-position: top 10px center;
            // $list: 0 1 2 3 4 5 6 7 8 9;
            // padding-top: 52px;
            // @each $i in $list {
            // 	&.n#{$i} {
            // 		background-image: url('./img/b_#{$i}.png');
            // 	}
            // }
            & > div:last-child {
              color: #323536;
            }
            &.n0 {
              .f {
                background: linear-gradient(146deg, #f23f3f 52.95%, #a247f6 53.93%);
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
            &.n5 {
              .f {
                background: linear-gradient(146deg, #18af5e 52.95%, #a247f6 53.93%);
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
            &.n1,
            &.n3,
            &.n7,
            &.n9 {
              .f {
                color: #18af5e;
              }
            }
            &.n2,
            &.n4,
            &.n6,
            &.n8 {
              .f {
                color: #f23f3f;
              }
            }
            .f {
              text-shadow: -1px -1px 0px rgba(255, 243, 230, 0.5);
              font-family: Inter;
              font-size: 48px;
              font-style: normal;
              font-weight: 900;
            }
          }
          .f {
            font-size: 32px;
            font-weight: 500;
          }

          &.n10 {
            background: #f0484b;
            box-shadow: 0px -4px 0px 0px #d5191d;
          }
          &.n11 {
            background: #13c164;
            box-shadow: 0px -4px 0px 0px #08aa61;
          }
          &.n12 {
            background: #b76bf2;
            box-shadow: 0px -4px 0px 0px #a043e8;
          }
          &.n13 {
            background: #f8b460;
            box-shadow: 0px 4px 0px 0px #f49c30;
          }
          &.n14 {
            background: #609dec;
            box-shadow: 0px 4px 0px 0px #2d7fe9;
          }
        }
      }
    }
  }
  .history {
    background: #fff;
    border-radius: 32px;
    .nav {
      border-bottom: 1px solid #e1e1e1;
      display: flex;
      padding: 0 20px;
      & > div {
        width: 50%;
        min-height: 88px;
        line-height: 36px;
        text-align: center;
        font-size: 32px;
        color: #929292;
        display: flex;
        align-items: center;
        justify-content: center;
        &.active {
          color: #323536;
          font-weight: 500;
          position: relative;
          &::after {
            content: '';
            display: block;
            width: 56px;
            height: 4px;
            border-radius: 1px;
            background: #fd565c;
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
          }
        }
      }
    }
  }
}
.typeList {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  gap: 40px;
  & > div {
    width: 178px;
    height: 120px;
    color: #323536;
    font-size: 36px;
    font-weight: 600;
    border-radius: 8px;
    border: 2px solid #e1e3f2;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fadeOut1 {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
@keyframes moveAndResize0 {
  0% {
    top: 260px;
    left: 42px;
    width: 104px;
    height: 104px;
    background-size: 104px;
  }
  50% {
    top: 566px;
    left: 260px;
    width: 200px;
    height: 200px;
    background-size: 200px;
  }
  100% {
    top: 76px;
    left: 20px;
    width: 50px;
    height: 50px;
  }
}
@keyframes moveAndResize1 {
  0% {
    left: 162px;
    top: 164px;
    width: 104px;
    height: 104px;
    background-size: 104px;
  }
  50% {
    top: 566px;
    left: 260px;
    width: 200px;
    height: 200px;
    background-size: 200px;
  }
  100% {
    top: 76px;
    left: 20px;
    width: 50px;
    height: 50px;
  }
}
@keyframes moveAndResize2 {
  0% {
    left: 298px;
    top: 114px;
    width: 104px;
    height: 104px;
    background-size: 104px;
  }
  50% {
    top: 566px;
    left: 260px;
    width: 200px;
    height: 200px;
    background-size: 200px;
  }
  100% {
    top: 76px;
    left: 20px;
    width: 50px;
    height: 50px;
  }
}
@keyframes moveAndResize3 {
  0% {
    left: 427px;
    top: 170px;
    width: 104px;
    height: 104px;
    background-size: 104px;
  }
  50% {
    top: 566px;
    left: 260px;
    width: 200px;
    height: 200px;
    background-size: 200px;
  }
  100% {
    top: 76px;
    left: 20px;
    width: 50px;
    height: 50px;
  }
}
@keyframes moveAndResize4 {
  0% {
    left: 550px;
    top: 260px;
    width: 104px;
    height: 104px;
    background-size: 104px;
  }
  50% {
    top: 566px;
    left: 260px;
    width: 200px;
    height: 200px;
    background-size: 200px;
  }
  100% {
    top: 76px;
    left: 20px;
    width: 50px;
    height: 50px;
  }
}
@keyframes moveAndResize5 {
  0% {
    left: 550px;
    top: 390px;
    width: 104px;
    height: 104px;
    background-size: 104px;
  }
  50% {
    top: 566px;
    left: 260px;
    width: 200px;
    height: 200px;
    background-size: 200px;
  }
  100% {
    top: 76px;
    left: 20px;
    width: 50px;
    height: 50px;
  }
}
@keyframes moveAndResize6 {
  0% {
    left: 432px;
    top: 462px;
    width: 104px;
    height: 104px;
    background-size: 104px;
  }
  50% {
    top: 566px;
    left: 260px;
    width: 200px;
    height: 200px;
    background-size: 200px;
  }
  100% {
    top: 76px;
    left: 20px;
    width: 50px;
    height: 50px;
  }
}
@keyframes moveAndResize7 {
  0% {
    left: 296px;
    top: 518px;
    width: 104px;
    height: 104px;
    background-size: 104px;
  }
  50% {
    top: 566px;
    left: 260px;
    width: 200px;
    height: 200px;
    background-size: 200px;
  }
  100% {
    top: 76px;
    left: 20px;
    width: 50px;
    height: 50px;
  }
}
@keyframes moveAndResize8 {
  0% {
    left: 161px;
    top: 460px;
    width: 104px;
    height: 104px;
    background-size: 104px;
  }
  50% {
    top: 566px;
    left: 260px;
    width: 200px;
    height: 200px;
    background-size: 200px;
  }
  100% {
    top: 76px;
    left: 20px;
    width: 50px;
    height: 50px;
  }
}
@keyframes moveAndResize9 {
  0% {
    left: 40px;
    top: 390px;
    width: 104px;
    height: 104px;
    background-size: 104px;
  }
  50% {
    top: 566px;
    left: 260px;
    width: 200px;
    height: 200px;
    background-size: 200px;
  }
  100% {
    top: 76px;
    left: 20px;
    width: 50px;
    height: 50px;
  }
}
</style>
