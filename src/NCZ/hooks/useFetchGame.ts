import { AwaitApiResult, getGameTitle } from '@/utils'
import { getGameCategoryList } from '@/NCZ/api'

const transformIDMap = {
  hot: 'Popular', // 热门
  by: 'Fish', // 捕鱼
  dz: 'Slot', // 电子
  cp: 'Lottery', // 彩票
  ty: 'Sport', // 体育
  qp: 'Chess', // 棋牌
  mi: 'Flash', // 小游戏
  sx: 'Video', // 视讯
}

// 主換 NCZ 的遊戲資料，盡量符合 BDG 減少元件更改。
const transformGameDataToBDG = nczGameList => {
  const result = nczGameList.map(game => {
    const { id } = game
    const categoryCode = transformIDMap[id]
    const title = getGameTitle(categoryCode)
    const categoryImg = game.logoPath
    // pubExtGameVolist
    return {
      ...game,
      title,
      categoryCode,
      categoryImg,
    }
  })

  return result || []
}

export function useFetchGame () {
  const gameSections = ref([])
  const allGameList = ref([])

  const fetchGameCategoryList = async () => {
    const res = await AwaitApiResult(getGameCategoryList())
    if (!res) return
    gameSections.value = res.data.gameSections
    allGameList.value = transformGameDataToBDG(res.data.gameSections)
  }

  return { gameSections, allGameList, fetchGameCategoryList }
}

// 原本 BDG hook 內部邏輯
// if (res && res.msg) {
//   Dialog.alert({
//     title: i18n.$t('Common.prompt_tips'),
//     message: res.msg,
//     theme: 'round-button',
//     className: 'dialog_warn',
//     confirmButtonColor: '#f89404',
//   }).then(() => Promise.reject(res.data))
// } else {
//   Promise.reject(res.data)
// }

// const { locale } = useI18n()
// const route = useRoute()
// const home = useHomeStore()
// const thirdGame = useThirdGameStore()
// const { navbarMap } = useNavbarList()

// // 監聽路由名稱、路由的 type 及 locale，改變後重打 api
// watch(
//   [
//     () => route.name,
//     () => route.params.type, // 監控 type，改變後 call QueryGameModelList
//     locale
//   ],
//   ([name], [oldName]) => {
//     if (!route.path.startsWith('/games')) return

//     const gameListType = getGameListType(name)

//     switch (gameListType) {
//       case 'GetGameList':
//         // route.params.type 會觸發 watch，但二級導覽列與三級(遊戲內頁)一模一樣，不需打 api，所以排除
//         if (name === oldName) return
//         onGetGameList(name)
//         break
//       case 'QueryGameModelList':
//         onQueryGameModelList(name)
//         break
//       case null:
//       default:
//         console.warn('[check] games router 是否設定錯誤')
//         break
//     }
//   },
//   { immediate: true }
// )

// function onGetGameList(name) {
//   let currentGame = navbarMap[name]
//   if (!currentGame) return

//   // 鬥雞頁面改抓電子競技打 api
//   if (name === 'FightChicken') {
//     currentGame = navbarMap['MachineSports']
//   }

//   const { categoryCode: platformCode, id } = currentGame
//   thirdGame.GetGameList({ platformCode, parentIds: [id] })
// }

// function onQueryGameModelList(name) {
//   // #1. 先確認哪個種類的遊戲
//   const currentGame = navbarMap[name]

//   // 如果沒有 childCategoryList，返回空陣列
//   if (!currentGame?.childCategoryList?.length) return []

//   let childCategoryItem = []
//   // #2. 判斷 route.type
//   const { type } = route.params
//   if (!type) {
//     childCategoryItem = currentGame.childCategoryList[0]
//   } else {
//     childCategoryItem = currentGame.childCategoryList.find(i => type === i.categoryCode)
//   }

//   // #3. 打 api
//   const { id: parentId, categoryCode: platformCode } = childCategoryItem
//   home.QueryGameModelList({ parentId, platformCode })
// }
