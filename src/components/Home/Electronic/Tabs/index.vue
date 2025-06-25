<template>
  <NavTab
    v-slot="{ item, index }"
    ref="tabRefs"
    v-model:active="currentTab"
    :list="tabLists"
    tab-class-name="tabs"
    active-class-name="tab_active"
    tab-item-class-name="funtab_item"
    @on-click-tab="handleClickTab"
  >
    <div class="tab_item" :class="{ tab_active: index === currentTab, allGame: !isShowIcon }">
      <img v-if="item.img" v-lazy="getImg(item)" alt="">
      <span>{{ item.title }}</span>
    </div>
  </NavTab>
  <!-- <van-tabs
		class="gameTabBar"
		v-model:active="currentTab"
		@click-tab="handleClickTab"
		type="card"
		color="transparent"
		background="transparent"
		ref="tabRef"
		:class="{ noBg: !props.isBg }"
	>
		<van-tab v-for="(item, index) in tabLists" :name="index" :key="index">
			<template #title>
				<div v-if="item?.isShow" class="tab_item">
					<img v-if="isShowIcon" :src="getIcons('home/tab', item.img, 'png', 'Icons')" alt="" />
					<span>{{ item.title }}</span>
				</div>
			</template>
		</van-tab>
	</van-tabs> -->
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import NavTab from '@/components/FunTab/NavBar.vue'
// import { gameList } from '@/components/Home/GameList/GameList'
import { deepCopy, getIcons, getIconsPublic } from '@/utils'
const emit = defineEmits(['tabChange', 'update:currentMenu'])
const tabRef = ref()

type AllGame = {
  isAll: boolean
  img: string
  isShow: boolean
  gameList: any[]
  gameType: string
  title: string
}

const props = withDefaults(
  defineProps<{
    tabList: Partial<AllGame[]>
    visibileAll?: boolean
    currentMenu: number
    isShowIcon?: boolean
    isBg?: boolean
  }>(),
  {
    visibileAll: true,
    isShowIcon: true,
    isBg: true,
  }
)

const getImg = (item: AllGame) => {
  if (item.img.includes('http')) {
    return item.img
  }
  return getIcons('home', item.img, 'png')
}

const currentTab = ref(0)

const tabLists = computed(() => {
  const tabList = deepCopy(props.tabList)
  // props?.visibileAll && tabList.unshift(staticTab)
  if (tabList.length === 1) {
    return []
  }
  return tabList
})

const handleClickTab = (val: any) => {
  const { item, index } = val
  emit('tabChange', { item, index })
  emit('update:currentMenu', currentTab.value)
}

const currentMenu = computed(() => {
  return props.tabList[currentTab.value]
})

watch(
  () => props.currentMenu,
  (val) => {
    currentTab.value = val
  },
  {
    immediate: true,
  }
)

defineExpose({
  currentTab,
  currentMenu,
  tabRef,
})
</script>
<style lang="scss" scoped>
.tabs {
  background: none;
  margin-top: 36px;
  margin-bottom: 30px;
}
.tab_item {
  min-width: 96px;
  height: 119px;
  margin-inline: 5px;
  padding: 0;
  color: #80849c;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  img {
    max-width: 42px;
    height: 42px;
    margin-bottom: 8px;
  }
  svg {
    width: 42px;
    height: 42px;
    margin-bottom: 8px;
  }
  span {
    font-size: 24px;
  }
}
.allGame {
  height: 70px;
  min-width: 140px;
  flex-direction: row;
}
.tab_active {
  color: var(--textW);
  background: var(--main_gradient-color);
}

::v-deep(.fun-tabs .fun-tab-item) {
  padding: 14px 0;
}

.noBg {
  background: none !important;
  :deep(.van-tabs__nav--card) {
    .van-tab--card {
      background: rgba(21, 30, 43, 0.81) !important;
    }
  }
}
</style>
