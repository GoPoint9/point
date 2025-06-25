<script setup>
import { AwaitApiResult } from '@/utils'
import { getAnnouncements } from '@/NCZ/api'
import { useNotice } from '@/hooks'
// import { ref, computed, onMounted, watch } from 'vue'
// import { useStore, useDispatch } from 'vuex'
// import qs from 'qs'
// entrance/ncz-web-pgpc/components/CommonLogic/components/TCModal.vue
import TCModal from './components/TCModal.vue'
import LoginPopup from './components/LoginPopup.vue'
import ForgotPasswordPopup from './components/ForgotPasswordPopup.vue'

import AnnouncePopup from '@entrance/ncz-web-pgpc/components/CommonLogic/components/AnnouncePopup'
import MemberCenter from '@entrance/ncz-web-pgpc/components/MemberCenter'
import HelpCenter from './components/HelpCenter.vue'

// import AnnouncePopup from './components/AnnouncePopup.vue'
// import NoticePopup from './components/NoticePopup.vue'
// import RegisterPopup from './components/RegisterPopup.vue'
// import ChangePassword from './components/ChangePassword.vue'
// import ForgotPassword from './components/ForgotPassword.vue'
// import GamePopup from './components/GamePopup.vue'
// import DfChatRoom from './components/DfChatRoom.vue'
// import SocketEvent from './components/SocketEvent.vue'
// import Contract from './components/Contract.vue'
// import Agent from './components/Agent.vue'
// import Member from './components/Member.vue'

// const store = useStore()
// const dispatch = useDispatch()

// ...(globalStore.isLogin ? [
// <MemberInfo v-if="globalStore.isLogin" /

// const isLogin = ref(false)
// const customerId = computed(() => store.state.Login?.memberInfo?.id)
// const account = computed(() => store.state.Login?.memberInfo?.account)
// const agentPolicy = computed(() => store.state.Login?.whitelabelVal?.AGENTPOLICY3)

const $modal = inject('$modal')
const globalStore = GlobalStore()
const popupKey = computed(() => (globalStore.isLogin ? 'USER_POPUP' : 'ANONYMOUS_POPUP'))

// [公告彈窗] 關閉後儲存「已關閉」狀態
const onPopupClose = () => sessionStorage.setItem(popupKey.value, 'closed')
const popupList = ref([])
// 取得 [公告彈窗] 資料
const fetchAnnouncements = async () => {
  const res = await AwaitApiResult(getAnnouncements())
  if (!res) return
  if (res.data?.length) {
    popupList.value = res.data.reverse()
  }
}
// 判斷是否需要打開 [公告彈窗]
const onCheckAnnouncementsOpen = () => {
  const popupState = sessionStorage.getItem(popupKey.value)
  if (popupState === 'closed') return
  if (popupList.value.length) $modal.show('publicModal') // NOTE: 打開 [公告彈窗]
}
watch(
  () => globalStore.isLogin,
  newLoginState => {
    if (newLoginState) {
      // dispatch('getFavGames')
    }
    // isTrial: 試玩
    // if (!store.state.Login?.isTrial && agentPolicy.value) {
    //   dispatch('getConsolidated')
    // }
    fetchAnnouncements().then(() => {
      onCheckAnnouncementsOpen()
    })
  },
  { immediate: true }
)

// [跑馬燈彈窗]
const { noticeList } = useNotice(false)
</script>

<template>
  <span>
    <TCModal name="publicModal" @before-close="onPopupClose">
      <AnnouncePopup name="publicModal" :popup-list="popupList" />
    </TCModal>
    <TCModal name="noticeModal">
      <AnnouncePopup name="noticeModal" :popup-list="noticeList" />
    </TCModal>
    <!--
    <TCModal name="publicModal" @before-close="onPopupClose">
      <AnnouncePopup :popupList="popupList" />
    </TCModal>
    <TCModal name="noticeModal">
      <NoticePopup />
    </TCModal> -->
    <TCModal name="loginPopupModal">
      <LoginPopup />
      <!-- <div>Login</div> -->
    </TCModal>
    <TCModal name="forgetPassModal">
      <ForgotPasswordPopup />
    </TCModal>

    <!-- <TCModal name="registerModal">
      <RegisterPopup />
    </TCModal>
    <TCModal name="changePassModal">
      <ChangePassword />
    </TCModal>
    <TCModal name="forgetPassModal">
      <ForgotPassword />
    </TCModal>
    -->
    <TCModal name="helpModal">
      <HelpCenter />
    </TCModal>

    <MemberCenter v-if="globalStore.mcShow" />
    <!--
    <GamePopup :iframe="true" />
    <DfChatRoom headerColor="#e6601b" />
    <template v-if="isLogin">
      <Contract />
      <SocketEvent :customerId="customerId" :account="account" :showMcPage="store.dispatch('setMcPage')" />
    </template>
    <template v-if="store.state.acmc.mcShow">
      <Member />
    </template>
    <template v-if="store.state.acmc.acShow">
      <Agent />
    </template> -->
  </span>
</template>

<!--

b.A)(He, Ue, Ge, !1, null, null, null)
, _e = ze.exports
, je = n(55373)
, Fe = n.n(je)
, Qe = "USER_POPUP"
, qe = "ANONYMOUS_POPUP"
, We = {
  components: {
    Agent: Ee,
    Member: Ie,
    AnnouncePopup: T,
    NoticePopup: P,
    LoginPopup: K,
    RegisterPopup: de,
    ChangePassword: ve,
    ForgotPassword: Pe,
    TcgModal: L.A,
    GamePopup: u.N9,
    DfChatRoom: u.kO,
    SocketEvent: u.yg,
    Contract: u.NZ,
    HelpCenter: _e
  },
  setup: function() {
    var e = (0,
    v.Pj)()
      , t = e.store
      , n = e.dispatch
      , i = (0,
    v.As)()
      , a = i.setMcPage
      , s = i.isLogin
      , r = i.isTrial
      , c = i.firstTimeLogin
      , l = (0,
    v.ok)()
      , u = l.currentLanguage
      , d = (0,
    v.hS)()
      , m = (0,
    o.KR)([])
      , p = (0,
    o.EW)((function() {
        return s.value ? Qe : qe
    }
    ))

e => {
    "acLoaded": true,
    "mcLoaded": true,
    "acShow": false,
    "mcShow": false,
    "mcPage": "depositv2",
    "acPage": "agentTeamOverview",
    "rewardMcPageData": null,
    "prizeDetail": null
}
// t => "depositv2"
setMcPage: function(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "securityCenter";
  e.mcPage = t
},

setMcShow: function(e, t) {
  t || (window["pointMall"] = null),
  e.mcShow = t // true
},

ac-control-shanshan.37cf7b84.js
-->
