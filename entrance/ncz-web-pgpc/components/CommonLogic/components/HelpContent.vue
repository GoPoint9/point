<script setup>
import Collpase from './Collpase.vue'
import CollpaseItem from './CollpaseItem.vue'

// import { helpData } from './helpData.js'
import { useHelp } from '@/NCZ/hooks'
const { helpList } = useHelp()

const route = useRoute()

const helpContent = ref({})
const showTitle = ref(false)
const activeIndex = ref('')
const animation = ref(true)

// const helpList = computed(() => {
//   const hash = location.hash || ''
//   const hashParts = hash.split('#')

//   if (window.opener && hashParts[1] === 'deposit') {
//     return helpData.filter(item => item.tag === 'deposit')
//   }
//   return helpData
// })

const removeAnimation = () => {
  animation.value = false
}

const findIndex = (list, tag, parentIndex) => {
  let result = ''

  function traverse (items, searchTag, parentIdx) {
    let currentIndex = ''
    items.forEach((item, index) => {
      currentIndex = parentIdx ? `${parentIdx},${index}` : `${index}`
      if (item.tag === searchTag) {
        result = currentIndex
      } else if (Array.isArray(item.children)) {
        currentIndex = traverse(item.children, searchTag, currentIndex)
      }
    })
  }

  traverse(list, tag, parentIndex)
  return `${result}`
}

const changeTab = (index, shouldAnimate = true) => {
  // console.log('index ', index)
  document.querySelector('body').scrollTop = 0
  if (shouldAnimate) {
    animation.value = true
  }

  const indexes = index.split(',').map(i => Number(i))

  if (indexes.length > 1) {
    activeIndex.value = `${indexes[0]},${indexes[1]}`
    showTitle.value = true
    helpContent.value = helpList.value[indexes[0]].children[indexes[1]]
  } else {
    activeIndex.value = `${indexes[0]}`
    showTitle.value = false
    helpContent.value = helpList.value[indexes[0]]
  }
}

const initData = () => {
  if (helpList.value.length === 0) return

  let hash = location.hash
  if (hash) {
    const hashParts = hash.split('#')
    hash = hashParts.length > 2 ? hashParts[hashParts.length - 1] : hashParts[1]
    const index = findIndex(helpList.value, decodeURIComponent(hash))

    if (index) {
      activeIndex.value = index
      nextTick(() => {
        if (document.querySelector('.mcHelp-menu').closest('.tcg_modal_body')) {
          document.querySelector(`#help-${index}`).scrollIntoView({ behavior: 'smooth' })
        }
      })
    } else {
      activeIndex.value = '0'
    }
    changeTab(activeIndex.value, false)
  } else {
    changeTab('0', false)
  }
}

onMounted(() => {
  initData()
})

watch(
  helpList,
  () => {
    initData()
  },
  { deep: true }
)

watch(route, () => {
  window.scrollTo(0, 0)
  initData()
})
</script>

<template>
  <div v-if="helpList.length" class="mcHelp-wrap">
    <div class="mcHelp-menu">
      <Collpase>
        <CollpaseItem
          v-for="(item, index) in helpList"
          :id="`help-${index}`"
          :key="index"
          :title="item.title"
          :select="activeIndex.split(',')[0] === `${index}`"
          :tag="item.tag"
          @select-tag="changeTab(`${index}`)"
        >
          <ul v-if="item.children" class="children-list">
            <li
              v-for="(child, childIndex) in item.children"
              :key="child.tag"
              :class="['children-item', { active: activeIndex === `${index},${childIndex}` }]"
              @click="changeTab(`${index},${childIndex}`)"
            >
              <span>{{ child.title }}</span>
            </li>
          </ul>
        </CollpaseItem>
      </Collpase>
      <slot name="other_menu" />
    </div>

    <div class="mcHelp-content" :class="{ 'help-slide-in': animation }" @animationend="removeAnimation">
      <div v-if="showTitle" class="content-title">
        {{ helpContent.title }}
      </div>
      <div class="content vhtml" :style="{ backgroundColor: helpContent.bgColor || '#fff' }" v-html="helpContent.content" />
    </div>
  </div>
</template>

<style lang="scss">
.vhtml pre {
  display: block;
  font-family: monospace;
  // white-space: pre;
  margin: 1em 0px;
  white-space: normal;
}
</style>
