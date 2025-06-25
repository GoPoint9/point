<template>
  <div class="container">
    <div v-for="index in 5" :key="index" class="container__card">
      <div class="container__card__head">
        <div class="container__card__head-left">
          <img v-if="index < 4" :src="getIcons('promotion', `rank-${index}`)">
          <span :data-index="index < 4 ? index : ''">NO.{{ index }}</span>
        </div>
        <span class="container__card__head-right"> ACESS****{{ index }}@gmail.com </span>
      </div>

      <div v-for="(bodyItem, bodyIndex) in bodyDetail" :key="bodyIndex" class="container__card__body">
        <div class="container__card__body-left">
          {{ bodyItem.title }}
        </div>
        <div class="container__card__body-right">
          <span :data-body-index="bodyIndex < 2 ? bodyIndex + 1 : ''">
            {{ bodyItem.value }}
          </span>
          <img v-lazy="getIcons('promotion', `${bodyItem.icon}`)">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getIcons } from '@/utils'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const bodyDetail = [
  {
    title: t('commission'),
    value: 888_888_888_88,
    icon: 'wallet',
  },
  {
    title: t('extraBonus'),
    value: 888_88,
    icon: 'extraBonus',
  },
  {
    title: t('directSubLeval'),
    value: 888_88,
    icon: 'directSubordinate',
  },
  {
    title: t('teamSub'),
    value: 888_88,
    icon: 'groupSubordinate',
  },
]
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 38px 20px;
  font-family: 'Inter', sans-serif;
  border-radius: 10px;
  background-color: var(--textW);
  box-shadow: var(--BoxShadowColor-9);

  &__card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-bottom: 40px;
    border-bottom: 1px solid var(--Dividing-line_color);

    &__head {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-left {
        display: flex;
        align-items: center;
        gap: 7px;

        img {
          width: 80px;
          height: 60px;
        }

        span {
          font-size: 36px;
          color: var(--text_color_L1);

          &[data-index='1'] {
            color: var(--norm_secondary-color);
          }

          &[data-index='2'] {
            color: var(--text_color_L3);
          }

          &[data-index='3'] {
            color: var(--colorText-50);
          }
        }
      }

      &-right {
        font-size: 28px;
        color: var(--text_color_L1);
      }
    }

    &__body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      background-color: #f6f6f6;

      &-left {
        flex: 1;
        height: 100%;
        padding: 12px 20px;
        color: var(--text_color_L1);
        font-size: 26px;
        background: var(--bgColor-6);
        clip-path: polygon(0 0, 100% 0%, 90% 100%, 0% 100%);
      }

      &-right {
        flex: 1;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        gap: 8px;
        padding: 5px 10px 5px 0px;

        span {
          color: var(--text_color_L2);
          font-size: 30px;

          &[data-body-index='1'] {
            color: var(--norm_red-color);
          }

          &[data-body-index='2'] {
            color: var(--main-color);
          }
        }

        img {
          width: 42px;
          height: 42px;
        }
      }
    }
  }
}
</style>
