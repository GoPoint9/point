<template>
  <div class="customer-container">
    <div class="customer-container-header">
      <NavBar
        :title="`${$t('customerServiceTitle')}`"
        class="main"
        left-arrow
        @click-left="goBack"
      />
      <div class="customer-container-header-belly">
        <img v-lazy="getIconsPublic('main', 'customerBg')" alt="">
      </div>
    </div>
    <List :list="CollectionList" @on-click="onClickUrl" />
  </div>
</template>

<script setup lang="ts">
import { useServer } from '@/hooks/useServe.hook'
import type { ReqService } from '@/types/api'
import { getIconsPublic } from '@/utils'
import { onMounted, reactive } from 'vue'
const { goBack, onClickUrl, CollectionList, getServiceList, List } = useServer({ ServerType: 2 })

const typeId = history.state.itemId
const servType = reactive<ReqService>({
  typeId,
})

onMounted(async () => {
  getServiceList(servType)
})
</script>

<style lang="scss" scoped>
.customer-container {
  &-header {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: fit-content;
    background: var(--main_gradient-color);

    &-belly {
      img {
        width: 100%;
        margin: auto;
      }

      display: flex;
    }
  }
}
</style>
