<script setup>
import { getIconsPublic } from '@/utils'
import { $t } from '@/languages'

const emit = defineEmits(['update:showDialog'])
const props = defineProps({
  showDialog: {
    type: Boolean,
    required: true,
  },
})

const isShow = computed({
  get () { return props.showDialog },
  set (newValue) { emit('update:showDialog', newValue) },
})

const activityStore = useActivityStore()
const unMissionReceiveCount = computed(() => activityStore.unMissionReceiveCount)

const router = useRouter()
const goToDailyTasks = () => {
  // TODO: 跳轉到每日任務頁面
  router.push({ name: 'DailyTasks' })
}

</script>
<template>
  <van-dialog v-model:show="isShow" :show-confirm-button="false" class-name="ReceivedDialog noOverHidden">
    <div class="dialog-wrapper">
      <div class="dialog-close">
        <svg-icon name="ticket-popup-close" @click="isShow = false" />
      </div>
      <img v-lazy="getIconsPublic('activity/DailyTask', 'present')">
      <div class="dialog-title">{{ $t('activityTip5') }} <span>{{ unMissionReceiveCount }}</span></div>
      <div class="dialog-para">{{ $t('activityTip6') }}</div>
      <div class="dialog-btn active" @click="goToDailyTasks">{{ $t('activityTip7') }}</div>
    </div>
  </van-dialog>
</template>

<style lang="scss">
.van-dialog.ReceivedDialog {
  --van-dialog-width: 400px;
}
</style>
<style lang="scss" scoped>
.dialog-wrapper {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .dialog-close {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
    cursor: pointer;
    svg {
      width: 36px;
      height: 36px;
      color: #fff;
    }
  }
  img {
    position: relative;
    margin-top: -100px;
  }

  .dialog-title {
    color: var(--text_color_L1);
    margin-bottom: 10px;
    font-size: 16px;
    padding: 0 12px;
    span {
      color: var(--norm_red-color);
      font-weight: bold;
      font-size: 36px;
    }
  }
  .dialog-para {
    color: var(--text_color_L2);
    padding: 0 20px;
  }

  // 競品樣式
  // .gold-egg-wrapper .claim-button {
  .dialog-btn {
    margin-top: 40px;
    padding: 0 10px;
    cursor: pointer;
    display: flex;
    color: #b1b1b1;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    width: 210px;
    height: 40px;
    background: transparent linear-gradient(180deg,#9f9f9f 0%,#6c6c6c 50%,#383838 100%) 0% 0% no-repeat padding-box;
    border-radius: 30px;
    &.active {
      color: #d63000;
      background: transparent linear-gradient(180deg, #ffffff 0%, #f7c163 50%, #f2b03e 100%) 0% 0% no-repeat padding-box;
    }
  }
}

</style>
