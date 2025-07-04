<script setup lang="ts">
import Title from './Title.vue'
import GameList from './Game.vue'
import ElectronicWinRate from './ElectronicWinRate.vue'
import { PropType, onMounted } from 'vue'
import { useGameContext } from '@/hooks'
import { useRouter } from 'vue-router'
defineProps({
  title: {
    type: String as PropType<string>,
    default: '',
  },
})
const router = useRouter()
const { getElectronChildGame, electronList, allGame } = useGameContext()
onMounted(async () => {
  await getElectronChildGame()
})
const goElectron = async (item: any) => {
  const data = { slotsName: item.vendorCode, slotsTypeID: item.childList[0]?.vendorId }
  sessionStorage.setItem('slotGamesList', JSON.stringify(allGame.value.slot))
  sessionStorage.setItem('clickedItem', JSON.stringify(data))
  sessionStorage.setItem('gameType', JSON.stringify('slot'))
  await router.push({
    name: 'AllOnlineGames',
  })
}
</script>

<template>
  <ElectronicWinRate />
  <div v-for="item of electronList" class="electron">
    <Title :icon="true" :title="item.vendorCode" />
    <GameList :enter-game="true" :is-all="true" :platform-list="item.childList.slice(0, 6)" />
    <div class="electron-btn" @click="goElectron(item)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M21.1309 8.86956C21.1309 7.28475 22.4156 6 24.0004 6C25.5852 6 26.87 7.28474 26.87 8.86956V9.82607H28.8124C38.3048 9.82607 45.9999 17.1078 45.9999 26.0904C45.9999 34.255 39.6423 41.0145 31.3562 42.1778C30.3848 42.3142 29.5046 41.5102 29.3905 40.5359C29.0926 37.9913 26.82 36.0658 24.1145 36.0658C21.409 36.0658 19.1364 37.9913 18.8385 40.5359C18.696 41.5143 17.8438 42.3327 16.863 42.2072C8.47001 41.1335 2 34.3269 2 26.0904C2 17.1078 9.69507 9.82607 19.1874 9.82607H21.1309V8.86956ZM18.144 19.5136C17.9414 19.4328 17.7242 19.3913 17.5049 19.3913C17.0619 19.3913 16.6361 19.5606 16.3229 19.862C16.0097 20.1633 15.8337 20.5721 15.8337 20.9983V23.5235H13.2351C12.7922 23.5235 12.3675 23.6929 12.0544 23.9943C11.7412 24.2956 11.5653 24.7043 11.5653 25.1305C11.5653 25.5567 11.7412 25.9654 12.0544 26.2668C12.3675 26.5681 12.7922 26.7375 13.2351 26.7375H15.8359V29.2627C15.836 29.6889 16.012 30.0976 16.3252 30.3989C16.6384 30.7002 17.0631 30.8695 17.506 30.8695C17.9489 30.8695 18.3736 30.7002 18.6868 30.3989C19 30.0976 19.176 29.6889 19.176 29.2627V26.7375H21.7724C22.2153 26.7375 22.64 26.5681 22.9531 26.2668C23.2663 25.9654 23.4422 25.5567 23.4422 25.1305C23.4422 24.7043 23.2663 24.2956 22.9531 23.9943C22.64 23.6929 22.2153 23.5235 21.7724 23.5235H19.1749V20.9983C19.1749 20.7873 19.1317 20.5783 19.0478 20.3833C18.9639 20.1883 18.8409 20.0112 18.6858 19.862C18.5307 19.7127 18.3466 19.5944 18.144 19.5136ZM34.0326 19.862C33.7194 19.5606 33.2946 19.3913 32.8517 19.3913C32.6324 19.3913 32.4152 19.4328 32.2126 19.5136C32.01 19.5944 31.8259 19.7127 31.6708 19.862C31.5157 20.0112 31.3927 20.1883 31.3088 20.3833C31.2249 20.5783 31.1817 20.7873 31.1817 20.9983V21.9164C31.1817 22.3426 31.3577 22.7513 31.6709 23.0526C31.9841 23.354 32.4088 23.5232 32.8517 23.5232C33.2946 23.5232 33.7193 23.354 34.0325 23.0526C34.3457 22.7513 34.5217 22.3426 34.5218 21.9164V20.9983C34.5218 20.5721 34.3458 20.1633 34.0326 19.862ZM34.0326 27.2082C33.7194 26.9068 33.2946 26.7375 32.8517 26.7375C32.4088 26.7375 31.984 26.9068 31.6708 27.2082C31.3576 27.5096 31.1817 27.9184 31.1817 28.3446V29.2627C31.1817 29.6889 31.3577 30.0976 31.6709 30.3989C31.9841 30.7002 32.4088 30.8695 32.8517 30.8695C33.2946 30.8695 33.7193 30.7002 34.0325 30.3989C34.3457 30.0976 34.5217 29.6889 34.5218 29.2627V28.3446C34.5218 27.9184 34.3458 27.5096 34.0326 27.2082Z"
          fill="currentColor"
        />
      </svg>

      <span>
        {{ $t('allGame') }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.electron {
  margin-bottom: 24px;
  &:last-child {
    margin-bottom: 0;
  }
  &-btn {
    width: 522px;
    height: 80px;
    border-radius: 100px;
    border: 1px solid var(--darkLight, var(--main-color));
    color: var(--darkLight, var(--main-color));
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 26px;
    font-style: normal;
    font-weight: 500;
    margin: 0 auto;
    svg {
      display: inline-block;
      width: 48px;
      height: 48px;
    }
    span {
      display: inline-block;
      margin-left: 4px;
    }
  }
}
</style>
