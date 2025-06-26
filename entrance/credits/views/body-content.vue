<template>
  <div class="body-content">
    <div class="toast-polite">
      <div
        id="toast-container"
        class="toast-container"
        aria-live="polite"
        aria-atomic="true"
      />
    </div>
    <div
      id="toast-error"
      class="toast toast-danger hide"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="mr-auto">錯誤</strong>
        <button
          type="button"
          class="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="toast-body" />
    </div>
    <div
      id="toast-warning"
      class="toast toast-warning hide"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="mr-auto">警告</strong>
        <button
          type="button"
          class="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="toast-body" />
    </div>
    <div
      id="toast-success"
      class="toast toast-success hide"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="mr-auto">成功</strong>
        <button
          type="button"
          class="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="toast-body" />
    </div>
    <div class="container">
      <nav class="my-4 nav-scroll">
        <a
          class="btn mt-3"
          :class="{ active: activeTab === 'All' }"
          @click="selectProduct('All', All)"
        >顯示全部</a>
        <a
          class="btn mt-3"
          :class="{ active: activeTab === 'Steam' }"
          @click="selectProduct('Steam', Steam)"
        >Steam</a>
        <a
          class="btn mt-3"
          :class="{ active: activeTab === 'PlayStation' }"
          @click="selectProduct('PlayStation', PlayStation)"
        >PlayStation</a>
        <a
          class="btn mt-3"
          :class="{ active: activeTab === 'MyCard' }"
          @click="selectProduct('MyCard', MyCard)"
        >MyCard</a>
        <!-- <a
          class="btn mt-3"
          href="/Product/Category/d4c1f7ec-0844-40aa-849b-15ad73021e2c"
        >貝殼幣</a> -->
        <a
          class="btn mt-3"
          :class="{ active: activeTab === 'Gash' }"
          @click="selectProduct('Gash', Gash)"
        >Gash</a>
        <!-- <a
          class="btn mt-3"
          :class="{ active: activeTab === 'Line' }"
          @click="selectProduct('LINE', Line)"
        >LINE</a> -->
        <!-- <a
          class="btn mt-3"
          :class="{ active: activeTab === 'Xbox' }"
          @click="selectProduct('Xbox', Xbox)"
        >Xbox</a> -->
        <!-- <a
          class="btn mt-3"
          href="/Product/Category/8695812b-6d28-4f20-a665-6cd3b541b3b6"
        >PartyTu</a> -->
        <a
          class="btn mt-3"
          :class="{ active: activeTab === 'iTunes' }"
          @click="selectProduct('iTunes', iTunes)"
        >iTunes</a>
      </nav>

      <section v-for="(item, index) in productMap" :key="index" class="mb-3">
        <h2 class="header-line">{{ item.title }}</h2>
        <ul v-if="productMap" class="row list-unstyled">
          <li v-for="item in item.itemArr" class="col-6 col-md-4 col-lg-2_4">
            <div
              class="card product-card"
              data-trigger="cart"
              data-id="3dde91ff-0d53-4d7f-8fe2-fbe26ee6b37a"
              data-name="[美國]App Store &amp; iTunes 禮品卡 2 美金"
              data-price="70"
            >
              <a class="card-body" href="javascript:void(0)">
                <img
                  :src="
                    getIconsPublic(
                      'credits',
                      item.logo.split('.')[0],
                      item.logo.split('.')[1]
                    )
                  "
                  :alt="item.logo"
                  class="img-fluid"
                >
                <h3 class="card-title" title="[美國]App Store &amp; iTunes 禮品卡 2 美金">
                  {{ item.title }}
                </h3>
              </a>
              <div class="card-footer cart-action">
                <span class="d-inline-block mt-md-2">
                  ${{ item.price }}
                  <span class="count-container"> x <span class="count">0</span> </span>
                </span>
                <div class="float-md-right mt-2">
                  <button
                    class="rounded-circle btn btn-cart"
                    data-trigger="remove-cart"
                    disabled=""
                  >
                    <i class="fas fa-minus" />
                  </button>
                  <button class="rounded-circle btn btn-cart" data-trigger="add-cart">
                    <i class="fas fa-plus" />
                  </button>
                </div>
              </div>
            </div>
          </li>

          <!-- <li class="col-6 col-md-4 col-lg-2_4">
            <div
              class="card bg-dark product-card"
              data-trigger="cart"
              data-id="3dde91ff-0d53-4d7f-8fe2-fbe26ee6b37a"
              data-name="[美國]App Store &amp; iTunes 禮品卡 2 美金"
              data-price="70"
            >
              <a class="card-body" href="/Product/3dde91ff-0d53-4d7f-8fe2-fbe26ee6b37a">
                <img
                  src="https://eppcdn.tecyt.com/Product/2260d5167bb842a689c8c8787ec58c36.jpg?UVcwovVbdwSknRES6wfQEP2rw8vWS-cN7SRmL1zIRQyREdXKURXmwGkEmR4R_fk5Ob1tzBK8WsumGYN3ZDO5cQXs_3Em7uW9dqT5"
                  alt="2260d5167bb842a689c8c8787ec58c36.jpg"
                  class="img-fluid"
                >
                <h3 class="card-title" title="[美國]App Store &amp; iTunes 禮品卡 2 美金">
                  [美國]App Store &amp; iTunes 禮品卡 2 美金
                </h3>
              </a>
              <div class="card-footer cart-action">
                <span class="d-inline-block mt-md-2">
                  $70
                  <span class="count-container"> x <span class="count">0</span> </span>
                </span>
                <div class="float-md-right mt-2">
                  <button
                    class="rounded-circle btn btn-cart"
                    data-trigger="remove-cart"
                    disabled=""
                  >
                    <i class="fas fa-minus" />
                  </button>
                  <button class="rounded-circle btn btn-cart" data-trigger="add-cart">
                    <i class="fas fa-plus" />
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li class="col-6 col-md-4 col-lg-2_4">
            <div
              class="card bg-dark product-card"
              data-trigger="cart"
              data-id="6e7b92a6-bb73-4393-af26-5b63c9c99deb"
              data-name="[美國]App Store &amp; iTunes 禮品卡 3 美金"
              data-price="105"
            >
              <a class="card-body" href="/Product/6e7b92a6-bb73-4393-af26-5b63c9c99deb">
                <img
                  src="https://eppcdn.tecyt.com/Product/63fab26ea04842ef98a3019aa5297ba9.jpg?UVcwovVbdwSknRES6wfQEP2rw8vWS-cN7SRmL1zIRQyREdXKURXmwGkEmR4R_fk5Ob1tzBK8WsumGYN3ZDO5cQXs_3Em7uW9dqT5"
                  alt="63fab26ea04842ef98a3019aa5297ba9.jpg"
                  class="img-fluid"
                >
                <h3 class="card-title" title="[美國]App Store &amp; iTunes 禮品卡 3 美金">
                  [美國]App Store &amp; iTunes 禮品卡 3 美金
                </h3>
              </a>
              <div class="card-footer cart-action">
                <span class="d-inline-block mt-md-2">
                  $105
                  <span class="count-container"> x <span class="count">0</span> </span>
                </span>
                <div class="float-md-right mt-2">
                  <button
                    class="rounded-circle btn btn-cart"
                    data-trigger="remove-cart"
                    disabled=""
                  >
                    <i class="fas fa-minus" />
                  </button>
                  <button class="rounded-circle btn btn-cart" data-trigger="add-cart">
                    <i class="fas fa-plus" />
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li class="col-6 col-md-4 col-lg-2_4">
            <div
              class="card bg-dark product-card"
              data-trigger="cart"
              data-id="1711f949-4254-4db6-a2cc-9cb6a4241b77"
              data-name="[美國]App Store &amp; iTunes 禮品卡 4 美金"
              data-price="140"
            >
              <a class="card-body" href="/Product/1711f949-4254-4db6-a2cc-9cb6a4241b77">
                <img
                  src="https://eppcdn.tecyt.com/Product/2a36c21344fb4483a0695a5a8633f136.jpg?UVcwovVbdwSknRES6wfQEP2rw8vWS-cN7SRmL1zIRQyREdXKURXmwGkEmR4R_fk5Ob1tzBK8WsumGYN3ZDO5cQXs_3Em7uW9dqT5"
                  alt="2a36c21344fb4483a0695a5a8633f136.jpg"
                  class="img-fluid"
                >
                <h3 class="card-title" title="[美國]App Store &amp; iTunes 禮品卡 4 美金">
                  [美國]App Store &amp; iTunes 禮品卡 4 美金
                </h3>
              </a>
              <div class="card-footer cart-action">
                <span class="d-inline-block mt-md-2">
                  $140
                  <span class="count-container"> x <span class="count">0</span> </span>
                </span>
                <div class="float-md-right mt-2">
                  <button
                    class="rounded-circle btn btn-cart"
                    data-trigger="remove-cart"
                    disabled=""
                  >
                    <i class="fas fa-minus" />
                  </button>
                  <button class="rounded-circle btn btn-cart" data-trigger="add-cart">
                    <i class="fas fa-plus" />
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li class="col-6 col-md-4 col-lg-2_4">
            <div
              class="card bg-dark product-card"
              data-trigger="cart"
              data-id="fae57a6f-109c-4e5f-a31e-17023ab1936e"
              data-name="[美國]App Store &amp; iTunes 禮品卡 5 美金"
              data-price="170"
            >
              <a class="card-body" href="/Product/fae57a6f-109c-4e5f-a31e-17023ab1936e">
                <img
                  src="https://eppcdn.tecyt.com/Product/74344a4188ef478d88a22384804cb4f6.jpg?UVcwovVbdwSknRES6wfQEP2rw8vWS-cN7SRmL1zIRQyREdXKURXmwGkEmR4R_fk5Ob1tzBK8WsumGYN3ZDO5cQXs_3Em7uW9dqT5"
                  alt="74344a4188ef478d88a22384804cb4f6.jpg"
                  class="img-fluid"
                >
                <h3 class="card-title" title="[美國]App Store &amp; iTunes 禮品卡 5 美金">
                  [美國]App Store &amp; iTunes 禮品卡 5 美金
                </h3>
              </a>
              <div class="card-footer cart-action">
                <span class="d-inline-block mt-md-2">
                  $170
                  <span class="count-container"> x <span class="count">0</span> </span>
                </span>
                <div class="float-md-right mt-2">
                  <button
                    class="rounded-circle btn btn-cart"
                    data-trigger="remove-cart"
                    disabled=""
                  >
                    <i class="fas fa-minus" />
                  </button>
                  <button class="rounded-circle btn btn-cart" data-trigger="add-cart">
                    <i class="fas fa-plus" />
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li class="col-6 col-md-4 col-lg-2_4">
            <div
              class="card bg-dark product-card"
              data-trigger="cart"
              data-id="a6cd72c6-61a9-4772-ba11-4bc86c1d290b"
              data-name="[美國]App Store &amp; iTunes 禮品卡 10 美金"
              data-price="340"
            >
              <a class="card-body" href="/Product/a6cd72c6-61a9-4772-ba11-4bc86c1d290b">
                <img
                  src="https://eppcdn.tecyt.com/Product/8a737cb3162343a8b6c99623fa25335d.jpg?UVcwovVbdwSknRES6wfQEP2rw8vWS-cN7SRmL1zIRQyREdXKURXmwGkEmR4R_fk5Ob1tzBK8WsumGYN3ZDO5cQXs_3Em7uW9dqT5"
                  alt="8a737cb3162343a8b6c99623fa25335d.jpg"
                  class="img-fluid"
                >
                <h3
                  class="card-title"
                  title="[美國]App Store &amp; iTunes 禮品卡 10 美金"
                >
                  [美國]App Store &amp; iTunes 禮品卡 10 美金
                </h3>
              </a>
              <div class="card-footer cart-action">
                <span class="d-inline-block mt-md-2">
                  $340
                  <span class="count-container"> x <span class="count">0</span> </span>
                </span>
                <div class="float-md-right mt-2">
                  <button
                    class="rounded-circle btn btn-cart"
                    data-trigger="remove-cart"
                    disabled=""
                  >
                    <i class="fas fa-minus" />
                  </button>
                  <button class="rounded-circle btn btn-cart" data-trigger="add-cart">
                    <i class="fas fa-plus" />
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li class="col-6 col-md-4 col-lg-2_4">
            <div
              class="card bg-dark product-card"
              data-trigger="cart"
              data-id="9d7dd6af-c287-48d3-9aac-2c4ee6f4e11b"
              data-name="[美國]App Store &amp; iTunes 禮品卡 15 美金"
              data-price="500"
            >
              <a class="card-body" href="/Product/9d7dd6af-c287-48d3-9aac-2c4ee6f4e11b">
                <img
                  src="https://eppcdn.tecyt.com/Product/6cc65d0f80dc4785b784fc9c26e5c928.jpg?UVcwovVbdwSknRES6wfQEP2rw8vWS-cN7SRmL1zIRQyREdXKURXmwGkEmR4R_fk5Ob1tzBK8WsumGYN3ZDO5cQXs_3Em7uW9dqT5"
                  alt="6cc65d0f80dc4785b784fc9c26e5c928.jpg"
                  class="img-fluid"
                >
                <h3
                  class="card-title"
                  title="[美國]App Store &amp; iTunes 禮品卡 15 美金"
                >
                  [美國]App Store &amp; iTunes 禮品卡 15 美金
                </h3>
              </a>
              <div class="card-footer cart-action">
                <span class="d-inline-block mt-md-2">
                  $500
                  <span class="count-container"> x <span class="count">0</span> </span>
                </span>
                <div class="float-md-right mt-2">
                  <button
                    class="rounded-circle btn btn-cart"
                    data-trigger="remove-cart"
                    disabled=""
                  >
                    <i class="fas fa-minus" />
                  </button>
                  <button class="rounded-circle btn btn-cart" data-trigger="add-cart">
                    <i class="fas fa-plus" />
                  </button>
                </div>
              </div>
            </div>
          </li> -->
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getIconsPublic, AwaitApiResult } from '@/utils'

import { useRouter } from 'vue-router'
import { useLoading } from '@/components/common/use'
// import { showDialog } from 'vant'
import { getAllGameList } from '@/api'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { isHybridApp, openBrowser } from '@/utils/jsBridge'
import { getGameUrl } from '@/api'
import { useGame } from '@/hooks'
const { goGame } = useGame()
const { t } = useI18n()
const router = useRouter()
const { start, end, flag } = useLoading()
const hotData = ref([])
const getGameList = async () => {
  const res = await AwaitApiResult(getAllGameList())
  if (res) {
    const { clicksVideoTopList, clicksTopList, platformList } = res.data.popular
    hotData.value = [...platformList, ...clicksTopList, ...clicksVideoTopList]
  }
}

const Gash = [
  {
    tab: 'Gash',
    title: 'Gash Point 點數卡',
    itemArr: [
      {
        title: 'Gash Point 點數 50 元',
        logo: 'gash_50.png',
        price: 50,
      },
      {
        title: 'Gash Point 點數 100 元',
        logo: 'gash_100.png',
        price: 100,
      },
      {
        title: 'Gash Point 點數 150 元',
        logo: 'gash_150.png',
        price: 150,
      },
      {
        title: 'Gash Point 點數 300 元',
        logo: 'gash_300.png',
        price: 300,
      },
      {
        title: 'Gash Point 點數 500 元',
        logo: 'gash_500.png',
        price: 500,
      },
    ],
  },
]

const MyCard = [
  {
    tab: 'MyCard',
    title: 'MyCard 點數卡',
    itemArr: [
      {
        title: 'MyCard 點數 30 元',
        logo: 'mycard_30.png',
        price: 30,
      },
      {
        title: 'MyCard 點數 50 元',
        logo: 'mycard_50.png',
        price: 50,
      },
      {
        title: 'MyCard 點數 90 元',
        logo: 'mycard_90.png',
        price: 90,
      },
      {
        title: 'MyCard 點數 150 元',
        logo: 'mycard_150.png',
        price: 150,
      },
      {
        title: 'MyCard 點數 170 元',
        logo: 'mycard_170.png',
        price: 170,
      },
    ],
  },
]

const Line = [
  {
    tab: 'LINE',
    title: 'MyCard LINE 指定卡',
    itemArr: [
      {
        title: 'MyCard LINE 指定卡 30 元',
        logo: 'mycard_30',
        price: 30,
      },
      {
        title: 'MyCard LINE 指定卡 50 元',
        logo: 'mycard_30',
        price: 50,
      },
      {
        title: 'MyCard LINE 指定卡 90 元',
        logo: 'mycard_30',
        price: 90,
      },
      {
        title: 'MyCard LINE 指定卡 150 元',
        logo: 'mycard_30',
        price: 150,
      },
      {
        title: 'MyCard LINE 指定卡 170 元',
        logo: 'mycard_30',
        price: 170,
      },
    ],
  },
]

const Xbox = [
  {
    tab: 'Xbox',
    title: 'Xbox 點數卡',
    itemArr: [
      {
        title: 'Xbox 點數 30 元',
        logo: 'mycard_30',
        price: 30,
      },
      {
        title: 'Xbox 點數 50 元',
        logo: 'mycard_30',
        price: 50,
      },
      {
        title: 'Xbox 點數 90 元',
        logo: 'mycard_30',
        price: 90,
      },
      {
        title: 'Xbox 點數 150 元',
        logo: 'mycard_30',
        price: 150,
      },
      {
        title: 'Xbox 點數 170 元',
        logo: 'mycard_30',
        price: 170,
      },
    ],
  },
]

const Steam = [
  {
    tab: 'Steam',
    title: 'Steam 錢包儲值碼',
    itemArr: [
      {
        title: 'Steam 100 元',
        logo: 'steam_100.jpg',
        price: 100,
      },
      {
        title: 'Steam 150 元',
        logo: 'steam_150.jpg',
        price: 150,
      },
      {
        title: 'Steam 200 元',
        logo: 'steam_200.jpg',
        price: 200,
      },
      {
        title: 'Steam 300 元',
        logo: 'steam_300.jpg',
        price: 300,
      },
      {
        title: 'Steam 350 元',
        logo: 'steam_350.jpg',
        price: 350,
      },
    ],
  },
]

const PlayStation = [
  {
    tab: 'PlayStation',
    title: 'PSN 點數卡',
    itemArr: [
      {
        title: 'PSN 點數 300 元',
        logo: 'psn_300.jpg',
        price: 300,
      },
      {
        title: 'PSN 點數 500 元',
        logo: 'psn_500.jpg',
        price: 500,
      },
      {
        title: 'PSN 點數 800 元',
        logo: 'psn_800.jpg',
        price: 800,
      },
      {
        title: 'PSN 點數 1000 元',
        logo: 'psn_1000.jpg',
        price: 1000,
      },
    ],
  },
]

const iTunes = [
  {
    tab: 'iTunes',
    title: '[美國]iTunes 禮品卡',
    itemArr: [
      {
        title: '[美國]App Store & iTunes 禮品卡 2 美金',
        logo: 'itunes_70.jpg',
        price: 70,
      },
      {
        title: '[美國]App Store & iTunes 禮品卡 3 美金',
        logo: 'itunes_105.jpg',
        price: 105,
      },
      {
        title: '[美國]App Store & iTunes 禮品卡 4 美金',
        logo: 'itunes_140.jpg',
        price: 140,
      },
      {
        title: '[美國]App Store & iTunes 禮品卡 5 美金',
        logo: 'itunes_170.jpg',
        price: 170,
      },
    ],
  },
]

const All = [...Steam, ...PlayStation, ...MyCard, ...Gash, ...iTunes]

const activeTab = ref('')
const productMap = ref([])

const selectProduct = (tabKey: string, data: any) => {
  activeTab.value = tabKey
  productMap.value = data
}

onMounted(() => {
  selectProduct('All', All)
})
</script>

<style lang="scss" scoped></style>
