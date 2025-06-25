<script setup lang="tsx">
import useDialog from '@/components/Dialog'
import { useModal } from '@/components/Modal'
import SecurityDialog from '@/components/SecurityDialog/index.vue'
import { defineComponent, reactive, ref } from 'vue'
import { AwaitApiResult } from '../../utils/util'
import { UploadImages } from '@/api'

const Bar = defineComponent({
  render () {
    return <div>Test</div>
  },
})
const { open } = useDialog({
  title: '未绑定银行卡或支付宝地址',
  desc: '您还未绑定银行卡或支付宝地址，请先绑定',
  confirmText: '绑定',
})
const store = reactive({
  phone: '111111',
  code: '',
})

const fileList = ref()

const modal = useModal({
  content: () => <SecurityDialog showType="phone" v-model:code={store.code} v-model:phone={store.phone} />,
})

const test = () => {
  open()
}
const test1 = () => {
  modal.open()
}

const uploadFile = async (file: any) => {
  const formData = new FormData()
  formData.append('files', file.file)
  console.log(formData)
  const result = await AwaitApiResult(UploadImages(formData))
  console.log(result)
  // 在这里使用 XMLHttpRequest 或其他方法将 formData 发送到服务器
  // 可以使用 axios 或 fetch 等库发送请求
}
</script>

<template>
  <Bar />
  <van-button @click="test">测试</van-button>
  <van-button @click="test1">测试2</van-button>
  <van-uploader
    v-model="fileList"
    accept="image/*"
    :max-count="1"
    :after-read="uploadFile"
  />
</template>

<style scoped lang="scss"></style>
