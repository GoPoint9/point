<!--倒计时和期号  -->
<template>
  <div class="TimeLeft__C">
    <div class="box">
      <div class="tit">
        <div class="citycon">
          <div class="citybg" />
          <div class="font30">{{ defaultcityname }}</div>
        </div>
        <div class="playmethod">{{ $t('code' + defaultplayname) }}</div>
        <div v-if="colorId != 8" class="odds">
          <div>{{ $t('odds') }}</div>
          <div class="line">|</div>
          <div class="odd">1:{{ odds }}</div>
        </div>
        <div v-if="colorId == 8" class="color8" />
        <div class="bettingcut">
          <div class="font22">{{ $t('xosoTxt91') }}</div>
          <div>{{ defaultexpiredate }}</div>
        </div>
      </div>
      <div class="info">
        <div class="playillustrate" @click="ToPlay">
          <div class="illustratebg" />
          <div class="font24">{{ $t('lotteryManual') }}</div>
        </div>
        <div class="issue">
          <div class="issuebg" />
          <div class="font26">{{ issue }}</div>
        </div>
        <div class="closure">
          <div class="closuretime">{{ $t('xosoTxt92') }}</div>
          <div class="closurtimes">
            <div v-for="(item, index) in time.split('')" :key="index" :class="item == ':' ? 'red' : 'redsqure'">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  defaultcityname: {
    type: String,
    default: '',
  },
  defaultplayname: {
    type: String,
    default: '',
  },
  defaultexpiredate: {
    type: String,
    default: '',
  },
  issue: {
    type: String,
    default: '',
  },
  time: {
    type: String,
    default: '',
  },
  odds: {
    type: Number,
    default: 0,
  },
  colorId: {
    type: Number,
    default: 0,
  },
  areId: {
    type: Number,
    default: 0,
  },
})

const ToPlay = () => {
  router.push({ name: 'AllLotteryGames-Play', query: { id: props.areId, gVSs: 1 } })
}
</script>
<style lang="scss" scoped>
.TimeLeft__C {
  padding: 20px 24px;

  .box {
    width: 100%;
    height: 270px;
    background: var(--darkBg, var(--bg_color_L2));
    border-radius: 12px;
    padding: 20px 14px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .tit {
      flex: 1;
      display: flex;
      flex-direction: column;
      .citycon {
        display: flex;
        flex-direction: row;
        .citybg {
          width: 6px;
          height: 30px;
          border-radius: 20px;
          background: var(--main-color);
          margin-top: 4px;
          margin-right: 14px;
        }
        .font30 {
          font-size: 30px;
          color: var(--darkTextW, var(--main-color));
          font-weight: 700;
        }
      }
      .playmethod {
        width: 310px;
        height: 40px;
        border-radius: 10px;
        background: var(--bgDark-2, var(--bg_color_L3));
        font-size: 26px;
        color: var(--text_color_L2);
        margin-top: 8px;
        padding-left: 16px;
        overflow: hidden;
      }
      .odds {
        width: 310px;
        height: 40px;
        line-height: 40px;
        background: var(--bgDark-2, var(--bg_color_L3));
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 12px;
        margin-bottom: 10px;
        padding: 0 16px;
        font-size: 24px;
        color: var(--text_color_L2);
        .line {
          //margin-left: 90px;
        }
        .odd {
          //margin-left: 25px;
        }
      }
      .color8 {
        width: 310px;
        height: 40px;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        margin-top: 12px;
        margin-bottom: 10px;
        padding-left: 16px;
        font-size: 24px;
      }
      .bettingcut {
        display: flex;
        flex-direction: column;
        width: 310px;
        height: 88px;
        background: var(--bgDark-2, var(--bg_color_L3));
        border-radius: 10px;
        padding-left: 20px;
        margin-top: 10px;
        .font22 {
          font-size: 22px;
          color: var(--text_color_L2);
          font-weight: 400;
          padding-top: 15px;
        }
        .font28 {
          font-size: 28px;
          color: var(--text_color_L2);
        }
      }
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .playillustrate {
        display: flex;
        flex-direction: row;
        width: 240px;
        height: 50px;
        border-radius: 40px;
        border: 1px solid var(--main-color);
        margin-left: 100px;
        .illustratebg {
          width: 42px;
          height: 42px;
          background: url('@icon/public/warning2.png');
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
          margin-left: 48px;
          margin-top: 2px;
        }
        .font24 {
          line-height: 50px;
          font-size: 24px;
          color: var(--main-color);
        }
      }
      .issue {
        margin-top: 16px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        .issuebg {
          width: 42px;
          height: 42px;
          background-image: url('@icon/public/ticketstar.png');
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
        }
        .font26 {
          font-size: 26px;
          color: var(--text_color_L2);
          font-weight: 400;
          margin-top: 6px;
          margin-left: 4px;
        }
      }
      .closure {
        margin-top: 13px;
        display: flex;
        flex-direction: column;
        .closuretime {
          font-size: 28px;
          color: var(--text_color_L2);
          text-align: right;
          margin-bottom: 12px;
        }
        .closurtimes {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          .red {
            color: var(--main-color);
            font-size: 40px;
            margin-right: 4px;
          }
          .redsqure {
            width: 40px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            background: var(--main-color);
            color: #fff;
            font-size: 36px;
            font-weight: 700;
            margin-right: 4px;
            position: relative;

            &:last-of-type::before {
              content: '';
              width: 0;
              height: 0;
              position: absolute;
              right: 0;
              bottom: 0;
              border: 5px solid var(--darkBg, var(--bg_color_L2));
              border-top-color: transparent;
              border-left-color: transparent;
            }
            &:first-of-type::before {
              content: '';
              width: 0;
              height: 0;
              position: absolute;
              left: 0;
              top: 0;
              border: 5px solid var(--darkBg, var(--bg_color_L2));
              border-bottom-color: transparent;
              border-right-color: transparent;
              html:lang(ar) & {
                left: unset;
                right: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
