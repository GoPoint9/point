<template>
  <div class="avatar-container">
    <NavBar :title="$t('changeAvatar')" left-arrow @click-left="router.go(-1)" />
    <div class="avatar-container-content">
      <van-grid :border="false" :column-num="3" :gutter="10">
        <van-grid-item v-for="index in 20" :key="index" @click="onSelectAvatar(index)">
          <img :class="checked === index.toString() ? 'active' : ''" :src="getIconsPublic('main/Avatar', `${index}`)">
          <div v-show="checked === index.toString()">
            <van-checkbox v-model="always" icon-size="20px" />
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getIconsPublic, AwaitApiResult } from '@/utils'
import { EditUserPhoto } from '@/api'
import { showFailToast } from 'vant'
import { GlobalStore } from '@/stores'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const globalStore = GlobalStore()
const userInfo = globalStore.getUserInfo

const router = useRouter()
const always = true
const checked = ref(userInfo.userPhoto)

// 点击图片之后修改图像
async function onSelectAvatar (val: number) {
  checked.value = val.toString()
  if (val < 0) {
    showFailToast({
      message: t('tipSelectPls'),
    })
    return false
  }
  const res = await AwaitApiResult(
    EditUserPhoto({
      userPhoto: val.toString(),
    })
  )
  if (res) {
    userInfo.userPhoto = val.toString()
    globalStore.setUserInfo({
      ...userInfo,
    })
    router.go(-1)
  }
}
</script>

<style lang="scss" scoped>
.avatar-container {
  padding: 24px 30px;

  &-content {
    :deep(.van-grid-item) {
      width: 200px;
      height: 180px;
    }

    > div {
      img {
        width: 200px;
        height: 180px;
        border-radius: 20px;

        &.active {
          border-color: var(--main-color);
          border-width: 6px;
          border-style: solid;
        }
      }

      :deep(.van-checkbox) {
        position: absolute;
        bottom: 20px;
        right: 20px;
      }
    }
  }
}
</style>
