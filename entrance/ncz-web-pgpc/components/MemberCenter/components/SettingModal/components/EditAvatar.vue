<script setup lang="ts">
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const emit = defineEmits(['update:modelValue', 'update'])
const props = defineProps<{ modelValue: boolean }>()
const isShow = useVModel(props, 'modelValue', emit)

const userStore = useUserStore()
const currentAvator = ref(userStore.userInfo.imgName)
const userImgsLength = computed(() => Object.keys(userStore.userImgs ?? {})?.length || 0)

const onSelectPersonalImg = (index) => {
  currentAvator.value = `${index}.png`
  emit('update', currentAvator.value)
}
// 更新頭像、關閉編輯彈窗
const onSubmitPersonalImg = async () => {
  await userStore.SavePersonalImg(unref(currentAvator))
  isShow.value = false
}

</script>
<template>
  <Transition name="modal-width">
    <PerfectScrollbar v-if="isShow" class="EditAvatar info-model-right">
      <div class="info-model-right-wrap">
        <div class="title">{{ $t('current_avatar') }}</div>
        <div class="avatar-wrap">
          <div class="my-icon">
            <img class="w-full" :src="userStore.userImgs[currentAvator]">
          </div>
        </div>
        <div class="crop">
          <div id="upload-demo" />
        </div>
        <div class="range-wrap">
          <div id="js_cut" class="cut" />
          <div class="slider-wrap"><input id="sli" type="range" data-orientation="vertical"></div>
          <div id="js_add" class="add" />
        </div>
        <!-- <div class="upload-local">
          <div class="upload-button js_upload_button"><span>{{ $t('upload_local_photo') }}</span></div>
          <input id="upload" type="file" accept="image/jpeg,image/jpg,image/png">
        </div>
        <div class="tips-wrap">
          <div class="upload-tips">{{ $t('upload_tips') }}</div>
        </div> -->
        <div class="classic-system-avatar">{{ $t('classic_system_avatar') }}</div>
        <div class="container">
          <div class="type-select-wrap hide" />
          <div class="icon-select-wrap hide_XXXX">
            <div
              v-for="index in userImgsLength"
              :key="index"
              :class="['img-wrap', { 'active': currentAvator === `${index}.png` }]"
              @click="onSelectPersonalImg(index)"
            >
              <img :src="userStore.userImgs[`${index}.png`]">
            </div>
          </div>
        </div>
        <div class="btn-group">
          <div class="cancel">{{ $t('button_cancel') }}</div>
          <!-- <div class="previous">{{ $t('label_previous') }}</div> -->
          <div
            :class="['confirm', { 'disabled': currentAvator === userStore.userInfo.imgName }]"
            @click="onSubmitPersonalImg"
          >
            {{ $t('button_confirm') }}
          </div>
        </div>
      </div>
    </PerfectScrollbar>
  </Transition>
</template>
<style lang="scss" scoped>
.info-model-right {
  width: 320px;
  height: 100%;
  overflow: hidden;
  background-color: #f5f5f5;
  padding-bottom: 30px;
  position: relative
}

.info-model-right-wrap {
  width: 320px;
  padding-top: 15px;
  .title {
    font-size: 16px;
    margin-bottom: 15px;
    font-weight: 700;
    letter-spacing: 1px;
    color: #676767;
    text-align: center
  }
  .avatar-wrap {
    text-align: center;
    width: 200px;
    height: 200px;
    margin: 0 auto;
    .my-icon {
      overflow: hidden;
      display: inline-flex;
      width: 200px;
      height: 200px;
      justify-content: center;
      align-items: center;
      background-color: #ececec;
      img {
        width: 180px;
        height: 180px;
        border-radius: 50%
      }
    }
  }
  .crop {
    display: none
  }
  .range-wrap {
    justify-content: space-between;
    align-items: center;
    padding: 0 45px;
    margin-top: 12px;
    display: none;
    .cut {
      width: 18px;
      height: 16px;
      background: url(@/assets/web_pgpc/cut.png) no-repeat;
      background-size: 100% 100%;
      cursor: pointer
    }
    .add {
      width: 18px;
      height: 16px;
      background: url(@/assets/web_pgpc/add.png) no-repeat;
      background-size: 100% 100%;
      cursor: pointer
    }
  }
  .slider-wrap {
    width: 174px
  }
  .upload-local {
    text-align: center;
    .upload-button {
      min-width: 130px;
      letter-spacing: 1px;
      display: inline-block;
      position: relative;
      text-align: left;
      height: 32px;
      font-weight: 700;
      line-height: 30px;
      padding-left: 32px;
      padding-right: 6px;
      margin: 14px auto 0;
      background-color: #fff;
      background-image: url(@/assets/web_pgpc/upload.png);
      background-repeat: no-repeat;
      background-position: 9px center;
      border-radius: 4px;
      border: solid 1px #c3c8cc;
      cursor: pointer
    }
  }
  .upload-local #upload {
    display: none;
    opacity: 0
  }
  .tips-wrap {
    text-align: center;
    padding: 0 27px;
    margin: 14px auto 14px;
    .upload-tips {
      text-align: left;
      display: inline-block;
      font-size: 12px;
      line-height: 14px;
      letter-spacing: 1px;
      color: #fd2f2f
    }
  }
  .classic-system-avatar {
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1px;
    color: #676767;
    padding-left: 27px;
    margin: 14px 0
  }
  .container .icon-select-wrap,
  .container .type-select-wrap {
    display: flex;
    flex-wrap: wrap;
    padding: 0 29px
  }
  .container .img-wrap {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 12px;
    margin-bottom: 13px;
    position: relative;
    cursor: pointer
  }
  .container .img-wrap:nth-child(4n) {
    margin-right: 0
  }
  .container .img-wrap img {
    width: 100%;
    height: 100%;
    border-radius: 50%
  }
  .container .img-wrap::after {
    content: "";
    display: none;
    position: absolute;
    width: 50px;
    height: 50px;
    left: 0;
    top: 0;
    border-radius: 50%;
    border: solid 2px #ff2f34;
    box-sizing: border-box;
    z-index: 9
  }

  .container {
    .img-wrap.active::after,
    .img-wrap:hover::after {
      display: block
    }
    .icon-select-wrap .img-wrap::before {
      content: "";
      display: none;
      position: absolute;
      width: 0;
      height: 0;
      border: 4px solid transparent;
      border-top: 6px;
      border-bottom: 6px solid #ff2f34;
      top: calc(100% + 2px);
      left: 50%;
      transform: translateX(-50%)
    }
    .icon-select-wrap .img-wrap:hover::before {
      display: block
    }
    .icon-select-wrap .img-wrap.active::before {
      display: block
    }
  }

  .btn-group {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    > div {
      min-width: 82px;
      height: 35px;
      border-radius: 17px;
      font-size: 14px;
      font-weight: 700;
      font-stretch: normal;
      letter-spacing: 1px;
      cursor: pointer;
      display: inline-block;
      text-align: center;
      padding: 0 15px;
      margin-right: 6px
    }
    .processing {
      opacity: .5;
      pointer-events: none;
      transition: none;
      position: relative;
      color: transparent!important
    }
    .processing::after {
      position: absolute!important;
      display: block;
      height: 20px;
      width: 20px;
      top: 50%;
      left: 50%;
      margin-left: -10px;
      margin-top: -12px;
      border: 2px solid #fff;
      border-radius: 50%;
      border-right-color: transparent;
      border-top-color: transparent;
      animation: rotate-full .5s infinite linear;
      content: ""
    }
    .previous {
      border: solid 1px #676767;
      line-height: 33px
    }
    .confirm {
      background-color: #fd2f2f;
      line-height: 35px;
      color: #fffefe
    }
    .confirm:hover {
      background-color: #f25252
    }
    .confirm:active {
      background-color: #e42a2a!important
    }
    .confirm.disabled {
      background: #d5d5d5!important;
      cursor: not-allowed;
      box-shadow: 0 0 10px #d5d5d5
    }
    .cancel {
      color: #fffefe;
      line-height: 35px;
      background-color: #676767
    }
  }
}
.info-model-right-wrap.hasUpload {
  .avatar-wrap {
    display: none
  }
  .crop {
    display: block
  }
  .range-wrap {
    display: flex
  }
}

// 動畫
.modal-width-enter-active, .modal-width-leave-active {
  transition: width .5s ease;
  overflow: hidden;
}
.modal-width-enter-from, .modal-width-leave-to {
  width: 0;
}
.modal-width-enter-to, .modal-width-leave-from {
  width: 320px;
}
</style>
