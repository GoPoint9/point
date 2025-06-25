<template>
  <van-dialog v-model:show="show" class-name="firstSaveDialog">
    <template #title>
      <div class="header">
        <div class="title">{{ $t('firstDialogH') }}</div>
        <div class="tip">{{ $t('firstDialogTip') }}</div>
      </div>
    </template>
    <div class="container">
      <firstItem :list="ActiveSotre.FirstRechargeList" @gorecharge="gorecharge" />
    </div>
    <template #footer>
      <div class="footer">
        <div class="active" :class="{ a: isActive }" @click="changeActive"><svg-icon name="active" />{{ $t('noTipToday') }}</div>
        <div class="btn" @click="goDetail">{{ $t('activity') }}</div>
      </div>
    </template>
    <div class="close" @click="closeDialog" />
  </van-dialog>
</template>

<script setup lang="ts">
import firstItem from '@/components/Activity/FirstRecharge/listItem.vue'
import { useLocalStorage } from '@vueuse/core'
import dayjs from 'dayjs'
import { onMounted, watch, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useActive } from '@/components/common/use'
import { useDialog } from '@/hooks'

const router = useRouter()
const route = useRoute()
const show = ref(false)
const { closeFirstSave } = useDialog()
const { ActiveSotre, getFirstRechargeList } = useActive()
const thisDay = dayjs(new Date()).format('YYYY-MM-DD')
const sData = useLocalStorage('firstSave', null)
const isActive = computed(() => {
  return Boolean(sData.value == thisDay)
})
const changeActive = () => {
  if (!isActive.value) {
    sData.value = thisDay
  } else {
    sData.value = ''
    localStorage.removeItem('firstSave')
  }
}
const closeDialog = () => {
  show.value = false
  closeFirstSave()
}
const RouteNameList = ['activity', 'home', 'main', 'wallet', 'promotion']
watch(
  () => route.name,
  (value) => {
    RouteNameList.includes(route.name) && getList()
  }
)
const getList = () => {
  if (sData.value == thisDay) return
  getFirstRechargeList().then((list: any) => {
    if (!list.length) {
      show.value = false
      closeFirstSave()
      return
    }
    const d = list.find((item: any) => item.isFinshed)
    if (d) ActiveSotre.value.isShowFirstSaveDialog = false
    if (!d) show.value = true
  })
}
const goDetail = () => {
  show.value = false
  closeFirstSave(true)
  router.push({ name: 'FirstRecharge' })
}
const gorecharge = () => {
  show.value = false
  closeFirstSave(true)
  router.push({ name: 'Recharge' })
}
onMounted(() => {
  console.log('231442')
  RouteNameList.includes(route.name) && getList()
})
</script>

<style lang="scss" scoped>
.header {
  min-height: 140px;
  background-color: var(--bg_color_L3);
  color: var(--text_color_L1);
  padding-top: 25px;
  border-radius: 20px 20px 0 0;
  .title {
    font-size: 28px;
  }
  .tip {
    font-size: 22px;
    font-weight: normal;
    margin-top: 20px;
  }
}
.container {
  padding: 20px 10px;
  background-color: var(--bg_color_L2);
  max-height: calc(100vh - 630px);
  overflow: auto;
  :deep(.first_list-item) {
    box-shadow: none;
  }
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 100px;
  background-color: var(--bg_color_L3);
  padding: 0 20px;
  border-radius: 0 0 20px 20px;
  .btn {
    background: var(--main_gradient-color);
    width: 200px;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    text-align: center;
    color: var(--text_color_L4);
    font-size: 28px;
    font-weight: 700;
  }
  .active {
    padding-left: 45px;
    color: var(--text_color_L2);
    font-size: 24px;
    background-repeat: no-repeat;
    background-size: 36px;
    background-position: left;
    background-image: url('@/assets/icons/activity/active.svg');
    &.a {
      background-image: url('@icon/activity/active_b.svg');
    }
  }
}
:deep(.first_list-item) {
  background: var(--bg_color_L3);
}
.close {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  left: 50%;
  transform: translateX(-50%);
  bottom: -70px;
  background-image: url('@/assets/icons/activity/PointMall/close.png');
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
