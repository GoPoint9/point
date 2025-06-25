<script setup>
// import { useSlots, getCurrentInstance } from 'vue'
// import { getCurrentInstance } from 'vue'

// // const slots = useSlots()
// const instance = getCurrentInstance()

// const cut = uid => {
//   console.warn(' instance.parent.$children ', instance.parent.$children)
//   instance.parent.$children.forEach(child => {
//     child.show = false
//     // if (child._uid !== uid) {
//     // }
//   })
// }

// defineExpose({
//   cut
// })
</script>

<template>
  <div class="menu_wrap">
    <!-- <slot @cut="cut" /> -->
    <slot />
  </div>
</template>
