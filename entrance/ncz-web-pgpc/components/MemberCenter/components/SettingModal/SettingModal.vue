<script setup lang="ts">
import ModelCase from '@entrance/ncz-web-pgpc/components/MemberCenter/components/ModelCase'
import SettingNav from '@entrance/ncz-web-pgpc/components/MemberCenter/components/SettingNav'

const {
  isShow,
  menus,
  currentMenu,
  currentComponent,
  onTabClick,
} = inject('$SettingModal')

const onClose = () => {
  isShow.value = false
}
</script>
<template>
  <ModelCase :is-show="isShow" @close="onClose">
    <SettingNav v-model="currentMenu" :nav-items="menus" @tab-click="onTabClick" />
    <Component :is="currentComponent" />
  </ModelCase>
</template>

<style lang="scss">
#mc_container.security-center .setting-modal {
  position: relative;
  height: 100%;
  float: right;
  box-shadow: -18px 0 40px -18px rgba(0,0,0,.2)
}
#mc_container.security-center .setting-modal .setting-item {
  padding: 0 30px;
  float: right;
  background-color: #fff;
  height: 100%;
  position: relative
}
#mc_container.security-center .setting-modal .setting-item.bank-card-model {
  padding: 0 0
}
#mc_container.security-center .setting-modal .setting-item .setting-item-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: 30px;
  line-height: 44px;
  height: 47px;
  border-top: 1px solid #efefef;
  width: 100%
}
#mc_container.security-center .setting-modal .setting-item .setting-item-footer .btn-cancel {
  margin-left: 10px
}
#mc_container.security-center .setting-modal .setting-item#js_profile_from {
  padding: 0 0
}
#mc_container.security-center .setting-modal .setting-item#js_profile_from .caption-text {
  margin-left: 30px
}
#mc_container.security-center .setting-modal .setting-item#js_profile_from .wrap {
  padding: 38px 30px;
  height: 526px;
  overflow-y: scroll
}
#mc_container.security-center .setting-modal .setting-item#js_profile_from .wrap .morecountry .select-control {
  width: 100px;
  margin-right: 10px;
  min-width: 85px;
  vertical-align: middle
}
#mc_container.security-center .setting-modal .setting-item#js_profile_from .wrap .morecountry .select-control img {
  height: 22px;
  vertical-align: middle;
  margin-right: 8px
}
#mc_container.security-center .setting-modal .setting-item#js_profile_from .wrap .morecountry .input-control {
  width: 100%;
  min-width: 150px
}
#mc_container.security-center .setting-modal .setting-item#js_profile_from .wrap .morecountry .select-control .select-list {
  max-height: 200px;
  overflow: hidden
}
#mc_container.security-center .setting-modal .setting-item#js_profile_from .wrap .morecountry .select-control .select-list .item-options {
  vertical-align: middle
}
#mc_container.security-center .setting-modal .setting-item#js_profile_from .wrap .morecountry .select-control .select-list .item-options img {
  height: 22px;
  vertical-align: middle;
  margin-right: 8px
}
#mc_container.security-center .setting-modal .setting-item#js_mobileVerified_from .morecountry .select-control {
  width: 100px;
  margin-right: 10px;
  min-width: 85px;
  vertical-align: middle
}
#mc_container.security-center .setting-modal .setting-item#js_mobileVerified_from .morecountry .select-control img {
  height: 22px;
  vertical-align: middle;
  margin-right: 8px
}
#mc_container.security-center .setting-modal .setting-item#js_mobileVerified_from .morecountry .input-control {
  width: 140px!important
}
#mc_container.security-center .setting-modal .setting-item#js_mobileVerified_from .morecountry .select-control .select-list {
  overflow: hidden
}
#mc_container.security-center .setting-modal .setting-item#js_mobileVerified_from .morecountry .select-control .select-list .item-options {
  vertical-align: middle
}
#mc_container.security-center .setting-modal .setting-item#js_mobileVerified_from .morecountry .select-control .select-list .item-options img {
  height: 22px;
  vertical-align: middle;
  margin-right: 8px
}
#mc_container.security-center .setting-modal .setting-item#js_mobileVerified_from .morecountry+.form-group .input-control {
  width: 320px
}
#mc_container.security-center .setting-modal .setting-item#js_mobileVerified_from .bottom_tips.input-case-error .error-tips {
  top: 40px;
  z-index: 99;
  bottom: unset
}
#mc_container.security-center .setting-modal .setting-item#js_mobileVerified_from .bottom_tips.input-case-error .error-tips:after {
  top: -10px;
  border-bottom-color: #ed5650;
  bottom: unset;
  border-top-color: transparent
}
#mc_container.security-center .setting-modal .info-model .username {
  margin-bottom: 12px
}
#mc_container.security-center .setting-modal .google-model {
  padding: 0
}
#mc_container.security-center .setting-modal .google-model .google-leftarea {
  position: relative;
  float: left;
  padding: 0 30px;
  height: 100%;
  max-width: 430px
}
#mc_container.security-center .setting-modal .google-model .google-leftarea .google-title {
  font-size: 15px;
  font-weight: 700;
  color: #666;
  line-height: 18px
}
#mc_container.security-center .setting-modal .google-model .google-leftarea .google-title .serial-num {
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #959595;
  text-align: center;
  line-height: 18px;
  font-size: 12px;
  color: #fff;
  margin-right: 5px
}
#mc_container.security-center .setting-modal .google-model .google-leftarea .google-link {
  margin: 13px 0 26px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden
}
#mc_container.security-center .setting-modal .google-model .google-leftarea .google-link a {
  display: inline-block;
  width: 140px;
  height: 43px;
  float: left
}
#mc_container.security-center .setting-modal .google-model .google-leftarea .google-link a.goole-play {
  margin-left: 9px
}
#mc_container.security-center .setting-modal .google-model .google-leftarea .form-group {
  white-space: inherit
}
#mc_container.security-center .setting-modal .google-model .google-leftarea .form-group .form-warp {
  line-height: 34px
}
#mc_container.security-center .setting-modal .google-model .google-leftarea .form-group .form-warp .form-label {
  max-width: 150px;
  line-height: 20px;
  white-space: normal;
  word-wrap: break-word;
  word-break: normal
}
#mc_container.security-center .setting-modal .google-model .google-rightarea {
  padding-top: 58px;
  width: 270px;
  float: right;
  height: 100%;
  background-color: #f5f5f5
}
#mc_container.security-center .setting-modal .google-model .google-rightarea .platefrom-qrcode .qe-code-name {
  text-align: center;
  line-height: 24px
}
#mc_container.security-center .setting-modal .google-model .google-rightarea .platefrom-qrcode .qe-code-name label {
  font-size: 15px;
  font-weight: 700;
  margin-left: 8px;
  vertical-align: middle
}
#mc_container.security-center .setting-modal .google-model .google-rightarea .platefrom-qrcode .qr-code-img {
  background-color: #fff;
  border-radius: 10px;
  padding: 14px;
  margin: 11px auto 38px;
  height: 176px;
  width: 176px
}
#mc_container.security-center .setting-modal .google-model .google-rightarea .platefrom-qrcode .qr-code-img img {
  width: 148px;
  height: 148px;
  display: inline-block
}
#mc_container.security-center .setting-modal .google-model .fs-bold {
  color: #000;
  font-weight: 700;
  font-family: Arial,"Microsoft YaHei",serif
}
#mc_container.security-center .setting-modal .google-qrcode {
  text-align: center;
  padding-top: 22px;
  margin-bottom: 23px
}
#mc_container.security-center .setting-modal .google-qrcode .qecode-img,#mc_container.security-center .setting-modal .google-qrcode img {
  display: inline-block;
  height: 148px;
  width: 148px
}
#mc_container.security-center .setting-modal .google-qrcode .text-tip {
  color: red;
  font-size: 14px;
  margin-top: 12px;
  text-align: left
}

// #mc_container.security-center .setting-modal .setting-nav {
//   position: absolute;
//   top: 85px;
//   left: -52px
// }
// #mc_container.security-center .setting-modal .setting-nav .nav-item {
//   position: relative;
//   margin-bottom: 14px
// }
// #mc_container.security-center .setting-modal .setting-nav .nav-item:hover .item-tips {
//   display: block
// }
// #mc_container.security-center .setting-modal .setting-nav .nav-item.active .item-tips {
//   display: block
// }
// #mc_container.security-center .setting-modal .setting-nav .nav-item .item-tips {
//   display: none;
//   position: absolute;
//   padding: 0 10px;
//   line-height: 30px;
//   transform: translateX(-100%);
//   margin-left: -12px;
//   top: 50%;
//   margin-top: -15px;
//   white-space: nowrap;
//   color: #fff;
//   font-size: 13px;
//   background: linear-gradient(to top,rgba(46,42,66,.92),rgba(81,78,98,.92));
//   border-radius: 5px;
//   box-shadow: 0 8px 21px rgba(0,0,0,.39)
// }
// #mc_container.security-center .setting-modal .setting-nav .nav-item .item-tips::after {
//   content: "";
//   position: absolute;
//   right: -11px;
//   top: 50%;
//   margin-top: -6px;
//   width: 0;
//   height: 0;
//   border: 6px solid transparent;
//   border-left-color: #4c4a5e
// }

//
//
//
//
//
//
//
//
//
//
//
//

#mc_container.reward-center .setting-modal {
  position: relative;
  height: 100%;
  float: right
}
#mc_container.reward-center .setting-modal.processing:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
  background: rgba(255,255,255,.7) url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KICAgICB3aWR0aD0iMjRweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMjQgMzAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUwIDUwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQogICAgPHJlY3QgeD0iMCIgeT0iMTAiIHdpZHRoPSI0IiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmQyZjJmIiBvcGFjaXR5PSIwLjIiPg0KICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgYXR0cmlidXRlVHlwZT0iWE1MIiB2YWx1ZXM9IjAuMjsgMTsgLjIiIGJlZ2luPSIwcyIgZHVyPSIwLjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4NCiAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImhlaWdodCIgYXR0cmlidXRlVHlwZT0iWE1MIiB2YWx1ZXM9IjEwOyAyMDsgMTAiIGJlZ2luPSIwcyIgZHVyPSIwLjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4NCiAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InkiIGF0dHJpYnV0ZVR5cGU9IlhNTCIgdmFsdWVzPSIxMDsgNTsgMTAiIGJlZ2luPSIwcyIgZHVyPSIwLjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4NCiAgICA8L3JlY3Q+DQogICAgPHJlY3QgeD0iOCIgeT0iMTAiIHdpZHRoPSI0IiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmQyZjJmIiAgb3BhY2l0eT0iMC4yIj4NCiAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGF0dHJpYnV0ZVR5cGU9IlhNTCIgdmFsdWVzPSIwLjI7IDE7IC4yIiBiZWdpbj0iMC4xNXMiIGR1cj0iMC42cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+DQogICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJoZWlnaHQiIGF0dHJpYnV0ZVR5cGU9IlhNTCIgdmFsdWVzPSIxMDsgMjA7IDEwIiBiZWdpbj0iMC4xNXMiIGR1cj0iMC42cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+DQogICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJ5IiBhdHRyaWJ1dGVUeXBlPSJYTUwiIHZhbHVlcz0iMTA7IDU7IDEwIiBiZWdpbj0iMC4xNXMiIGR1cj0iMC42cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+DQogICAgPC9yZWN0Pg0KICAgIDxyZWN0IHg9IjE2IiB5PSIxMCIgd2lkdGg9IjQiIGhlaWdodD0iMTAiIGZpbGw9IiNmZDJmMmYiICBvcGFjaXR5PSIwLjIiPg0KICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgYXR0cmlidXRlVHlwZT0iWE1MIiB2YWx1ZXM9IjAuMjsgMTsgLjIiIGJlZ2luPSIwLjNzIiBkdXI9IjAuNnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPg0KICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iaGVpZ2h0IiBhdHRyaWJ1dGVUeXBlPSJYTUwiIHZhbHVlcz0iMTA7IDIwOyAxMCIgYmVnaW49IjAuM3MiIGR1cj0iMC42cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+DQogICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJ5IiBhdHRyaWJ1dGVUeXBlPSJYTUwiIHZhbHVlcz0iMTA7IDU7IDEwIiBiZWdpbj0iMC4zcyIgZHVyPSIwLjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4NCiAgICA8L3JlY3Q+DQogIDwvc3ZnPg==) no-repeat center
}
#mc_container.reward-center .setting-modal:before {
  content: "";
  position: absolute;
  bottom: -60px;
  left: 0;
  height: 60px;
  width: 100%;
  z-index: 1;
  box-shadow: 0 -50px 50px rgba(255,255,255,.6)
}
#mc_container.reward-center .setting-modal .setting-nav {
  position: absolute;
  top: 85px;
  left: -52px
}
#mc_container.reward-center .setting-modal .setting-nav .nav-item {
  position: relative;
  margin-bottom: 14px;
  cursor: pointer
}
#mc_container.reward-center .setting-modal .setting-nav .nav-item:hover .item-tips {
  display: block
}
#mc_container.reward-center .setting-modal .setting-nav .nav-item.active .item-tips {
  display: block
}
#mc_container.reward-center .setting-modal .setting-nav .nav-item .sign-icon {
  font-style: normal;
  line-height: 41px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: #fff
}
#mc_container.reward-center .setting-modal .setting-nav .nav-item .item-tips {
  display: none;
  position: absolute;
  transform: translateX(-100%);
  margin-left: -12px;
  top: 50%;
  margin-top: -15px;
  white-space: nowrap;
  color: #000;
  font-size: 13px;
  background: linear-gradient(to top,#badfff,#fff);
  border-radius: 5px;
  box-shadow: 0 8px 21px rgba(0,0,0,.39)
}
#mc_container.reward-center .setting-modal .setting-nav .nav-item .item-tips::after {
  content: "";
  position: absolute;
  right: -11px;
  top: 50%;
  margin-top: -6px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-left-color: rgba(219,240,255)
}
#mc_container.reward-center .setting-modal .setting-nav .nav-item .item-tips .item-text {
  display: inline-block;
  max-width: 190px;
  padding: 0 10px;
  line-height: 30px
}
#mc_container.reward-center .setting-modal.newbie-setting-modal:before {
  box-shadow: none
}

//
//
//
//
//

#mc_container .info-model {
  display: flex
}
#mc_container .info-model .info-model-left {
  position: relative
}
#mc_container .info-model .info-model-left .wrap .form-group {
  display: flex;
  justify-content: space-between;
  align-items: center
}
#mc_container .info-model .info-model-left .wrap .form-group .group-city {
  display: flex;
  flex-direction: column;
  gap: 10px
}
#mc_container .info-model .info-model-left .wrap .form-group .form-label {
  min-width: 84px
}
#mc_container .info-model .info-model-left .wrap .form-group>.input-case {
  flex-grow: 2
}
#mc_container .info-model .info-model-left .wrap .form-group .input-control {
  width: 100%
}
#mc_container .info-model .info-model-left .wrap .form-group .phone-wrap {
  display: flex;
  justify-content: space-between
}
#mc_container .info-model .info-model-left .wrap .form-group .phone-wrap .input-case {
  flex-grow: 2
}
#mc_container .info-model .info-model-left .wrap .form-group .payeeName-input {
  display: flex;
  flex-direction: column
}
#mc_container .info-model .info-model-left .wrap .form-group .payeeName-input .payee-tips {
  margin-top: 5px;
  position: relative;
  font-weight: 600;
  color: #fd2f2f;
  max-width: 340px;
  word-wrap: break-word;
  white-space: break-spaces
}
#mc_container .info-model .info-model-left .wrap .username {
  display: flex;
  align-items: center;
  justify-content: space-between
}
#mc_container .info-model .info-model-left .wrap .username .my-icon {
  width: 84px;
  height: 65px;
  position: relative;
  overflow: hidden;
  cursor: pointer
}
#mc_container .info-model .info-model-left .wrap .username .my-icon img {
  width: 65px;
  height: 65px;
  border-radius: 50%
}
#mc_container .info-model .info-model-left .wrap .username .my-icon .mask {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0,0,0,.4);
  display: none
}
#mc_container .info-model .info-model-left .wrap .username .my-icon .mask .edit-icon {
  display: block;
  position: absolute;
  width: 28px;
  height: 27px;
  left: 50%;
  top: 50%;
  margin-top: -14px;
  margin-left: -13.5px;
  background: url(@/assets/web_pgpc/edit-icon.png) no-repeat;
  background-size: 100% 100%
}
#mc_container .info-model .info-model-left .wrap .username .my-icon:hover .mask {
  display: block
}
#mc_container .info-model .info-model-left .wrap .username .my-icon.active .mask {
  display: block
}
#mc_container .info-model .info-model-left .wrap .username .account {
  flex-grow: 2;
  line-height: 65px
}
#mc_container .info-model .info-model-left .wrap .js_data .select-control {
  width: 83px;
  min-width: 83px;
  margin-right: 8px
}
#mc_container .info-model .info-model-left .wrap .js_data .select-control:nth-child(3) {
  margin-right: 0
}
#mc_container .info-model .info-model-left .wrap .js_data .select-control .select-val {
  width: 100%
}
#mc_container .info-model .info-model-left .wrap .js_data .select-control .select-list {
  max-height: 290px
}
#mc_container .info-model .info-model-left .wrap .js_data .select-control.disabled {
  cursor: not-allowed
}
#mc_container .info-model .info-model-left .wrap .js_data .select-control.disabled * {
  cursor: not-allowed
}
#mc_container .info-model .info-model-left .wrap .js_nationality .select-val,
#mc_container .info-model .info-model-left .wrap .js_region .select-val {
  white-space: initial
}

//
//
//
//
//
//

#mc_container .setting-item#js_mobileVerified_from .forget-password {
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  white-space: break-spaces;
  justify-content: flex-end
}
#mc_container .setting-item#js_mobileVerified_from .forget-password a {
  cursor: pointer;
  color: #00f
}
#mc_container .setting-item#js_mobileVerified_from .verify-tip {
  color: #fd2f2f;
  font-size: 14px;
  word-break: break-word;
  white-space: normal;
  line-height: normal;
  max-width: 430px
}
#mc_container .setting-item#js_mobileVerified_from #mobileVerified {
  display: flex;
  justify-content: space-between;
  margin-top: 35px
}
#mc_container .setting-item#js_mobileVerified_from #mobileVerified .form-label {
  min-width: 70px
}
#mc_container .setting-item#js_mobileVerified_from #mobileVerified .input-group {
  display: flex;
  height: 100%;
  position: relative
}
#mc_container .setting-item#js_mobileVerified_from #mobileVerified .input-group .mobile-tip {
  bottom: 35px;
  position: absolute;
  white-space: normal;
  color: red;
  line-height: 1.2;
  word-break: break-word;
  margin-top: 5px
}
#mc_container .setting-item#js_mobileVerified_from #mobileVerified .input-group .select-control {
  order: -1
}
#mc_container .setting-item#js_mobileVerified_from #mobileVerified .input-group .button {
  order: 1
}
#mc_container .setting-item#js_mobileVerified_from #mobileVerified .input-group .bottom_tips {
  flex: 1
}
#mc_container .setting-item#js_mobileVerified_from #mobileVerified .input-group .bottom_tips .input-control {
  width: 100%!important
}
#mc_container .setting-item#js_mobileVerified_from #mobileVerified+.form-group {
  display: flex
}
#mc_container .setting-item#js_mobileVerified_from #mobileVerified+.form-group .form-label {
  min-width: 70px
}
#mc_container .setting-item#js_mobileVerified_from #mobileVerified+.form-group .bottom_tips {
  flex: 1
}
#mc_container .setting-item#js_mobileVerified_from #mobileVerified+.form-group .bottom_tips .input-control {
  width: 100%
}
</style>
