import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import 'lib-flexible'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from '@/router'
import tools from '@/plugins/tools'

import ElementPlus from 'element-plus'
// import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar'
// import 'vue3-perfect-scrollbar/style.css'

// import 'element-plus/dist/index.css'

import { useSkinStore } from '@/stores'
import VueJsModal from '@entrance/ncz-web-pgpc/plugins/VueJsModal'
import WebCover from '@entrance/ncz-web-pgpc/plugins/WebCover'
import { VeeValidate } from '@entrance/ncz-web-pgpc/plugins/VeeValidate/index.ts'

import '@/plugins/potoptypeUtils.ts'

import 'virtual:uno.css'

// import pointObj from '@/utils/point'

import './index.css'
import './chunk-web-view.scss' // TODO: 競品 CSS。需優化。
import './web-pgpc.scss'
import '@entrance/ncz-web-pgpc/utils.scss'

const SetupApp = {
  install () {
    const App = document.getElementById('app')
    App.classList.add(import.meta.env.VITE_APP_TYPE)
  },
}

// import {useDialog} from "@/hooks";
initializeApp()
async function initializeApp () {
  // pointObj.fb({ '7461510735802': "1580082875871803" })
  // console.log(' [initializeApp] ')

  window.IS_WEB_PGPC = import.meta.env.VITE_APP_IS_WEB_PGPC
  const app = createApp(App)

  // window.cover = cover
  // app.config.globalProperties.$cover = cover

  app.config.errorHandler = (err, vm, info) => {
    console.error(err, vm, info, vm.$route)
  }

  tools(app)
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app
    .use(router)
    .use(pinia)
    .use(VueJsModal, { dialog: true })
    .use(WebCover)
    .use(SetupApp)
    .use(VeeValidate)
    .use(ElementPlus)
    // .use(PerfectScrollbarPlugin)

  const skin = useSkinStore()
  // await skin.frontSkinSetting()
  skin.frontSkinSetting()

  app.mount('#app')
  console.warn(' [app] ', app)
}

/**
const app = createApp(App)
const pinia = createPinia()
tools(app)
pinia.use(piniaPluginPersistedstate)

app.use(router).use(pinia)
app.mount('#app')

import { A as createComponent } from 'lodash';
import { Ay as Vue } from 'vue';
import { loadACMC } from 'utils';
import { loadAnalytics } from 'ga';

const svgIconComponent = 'svg-icon';
const Mo = `${n.p}img/img-loading.cf8e36f5.gif`;

Vue.component(svgIconComponent, Da);

const loadModule = (modules) => modules.keys().map(mod => mod);
loadModule(ko);

loadACMC(Wi); 載入外部資源
Vue.config.productionTip = false;
window.$i18n = Aa.A;

Vue.component("paginate", uo());

Vue.use(no(), { dynamic: true });
Vue.use(VueJsModal, { dynamic: true });

Vue.use(ne.Ay);
Vue.use(io());
Vue.use(so());
Vue.use(co());
Vue.use(u.ZR, {
	router: ai,
	store: Wi,
	i18n: Aa.A,
});

const loadErrorHandling = () => {
	Vue.use(eo.Ay, {
		error: `${Wi.state.Public.imgUrl}/TCG_GAME_ICONS/default.png`,
		loading: Mo,
		attempt: 1,
		lazyComponent: true,
		observer: true,
		listenEvents: ["scroll"],
		observerOptions: {
			rootMargin: "0px",
			threshold: 0.1
		}
	});
};

const initializeApp = async () => {
	const permission = await Wi.dispatch("getPermission");
	loadAnalytics(permission.info.analytics);
	loadErrorHandling();

	return new Vue({
		el: "#app",
		router: ai,
		store: Wi,
		popup: Xi,
		i18n: Aa.A,
		render(h) {
			const systemStatus = Wi.state.Login.systemStatus;
			if (systemStatus === 0) {
				$i();
				return h(et);
			} else if (systemStatus === 1) {
				return h(ho);
			} else if (systemStatus === 2) {
				return h(yo);
			} else {
				return null;
			}
		}
	});
};

initializeApp();

window.shellAPI.helpCenterUrl = "/helpmc";

 */
