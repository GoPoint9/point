<template>
  <div
    id="customerId"
    class="customer"
    @click="onToCustomer"
    @mousedown="down"
    @touchstart="down"
    @mousemove="move"
    @touchmove="move"
    @mouseup="end"
  >
    <img v-lazy="getIcons('home', 'icon_sevice')">
  </div>
</template>

<script setup lang="ts">
import { getIcons } from '@/utils'
import { ref, onMounted } from 'vue'
import { useServer } from '@/hooks/useServe.hook'

const flags = ref(false)
const position = ref({
  x: 0,
  y: 0,
})
const dx = ref(0)
const dy = ref(0)

const nx = ref(0)
const ny = ref(0)

const xPum = ref(0)
const yPum = ref(0)
const customerId = ref()

let beforeX: number, beforeY: number, afterX: number, afterY: number
const { getSelfCustomerServiceLink } = useServer({ ServerType: 2 })
function onToCustomer () {
  if (!isdrag(beforeX, beforeY, afterX, afterY)) {
    getSelfCustomerServiceLink()
  }
}

onMounted(() => {
  customerId.value = document.getElementById('customerId') as HTMLElement
})
// 实现移动端拖拽
function down (event: any) {
  flags.value = true
  let touch
  if (event.touches) {
    touch = event.touches[0]
  } else {
    touch = event
  }
  position.value.x = touch.clientX
  position.value.y = touch.clientY

  dx.value = customerId.value.offsetLeft
  dy.value = customerId.value.offsetTop

  beforeX = event.clientX
  beforeY = event.clientY
}

function move (event: any) {
  if (flags.value) {
    let touch
    const div = document.getElementById('customerId') as HTMLElement
    const divwidth = div.clientWidth
    const divheight = div.clientHeight
    const winHeight = document.documentElement.clientHeight
    const winWidth = document.documentElement.clientWidth
    if (event.touches) {
      touch = event.touches[0]
    } else {
      touch = event
    }
    nx.value = touch.clientX - position.value.x
    ny.value = touch.clientY - position.value.y
    xPum.value = dx.value + nx.value
    yPum.value = dy.value + ny.value
    if (xPum.value <= 0) {
      xPum.value = 0
    }
    if (yPum.value <= 0) {
      yPum.value = 0
    }
    if (xPum.value >= winWidth - divwidth) {
      xPum.value = winWidth - divwidth
    }
    if (yPum.value >= winHeight - divheight) {
      yPum.value = winHeight - divheight
    }
    customerId.value.style.left = xPum.value + 'px'
    customerId.value.style.top = yPum.value + 'px'
    // 阻止页面的滑动默认事件
    document.addEventListener(
      'touchmove',
      function () {
        event.preventDefault()
      },
      false
    )
  }
  // 阻止冒泡
  event.stopPropagation()
  // 阻止默认事件
  event.preventDefault()
}
// 鼠标释放时候的函数
function end (event: any) {
  flags.value = false

  afterX = event.clientX
  afterY = event.clientY
}

function isdrag (x1: number, y1: number, x2: number, y2: number) {
  if (Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) <= 1) {
    return false
  }
  return true
}

// 根据语言动态设置字体类型
const langFamilys = [
  { title: 'vi', bgColor: 'bahnschrift' },
  { title: 'else', bgColor: '\'Roboto\', \'Inter\', sans-serif' },
]

const currentFontFamily = ref('bahnschrift')
// const onBtnClick = (bgColor: string) => {
// 	currentFontFamily.value = bgColor
// }
</script>
<style lang="scss">
// $font-family: 'bahnschrift';
// $font-family: 'Roboto', 'Inter', sans-serif;
$font-family: v-bind(currentFontFamily);

// .demo {
// 	font-family: $font-family;
// 	position: fixed;
// 	bottom: 500px;
// 	z-index: 999;
// }

.customer {
  position: fixed;
  bottom: 180px;
  right: 30px;
  width: 112px;
  height: 112px;
  border-radius: 50%;
  z-index: 100; //层级需要高于头部导航栏

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>
