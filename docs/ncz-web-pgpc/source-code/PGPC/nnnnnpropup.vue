<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { chunk } from 'lodash';

const store = useStore();
const list = ref([]);
const page = ref(1);
const select = ref(1);
const h = 9;

const noticeProps = {
  name: 'notice',
  setup() {
    const select = ref(1);
    const page = ref(1);
    const list = ref([]);
    const store = useStore();
    const noticeIndex = computed(() => store.state.home.noticeIndex);
    const publicNotice = computed(() => store.state.Public.notice);

    const s = (t) => {
      select.value = select.value === t ? .5 : t;
    };

    const r = (e) => {
      const date = new Date(+e);
      return date.format('yyyy-MM-dd hh:mm:ss');
    };

    const c = () => {
      const n = chunk(publicNotice.value, h);
      const i = Math.ceil((select.value + 1) / h);
      const o = select.value - (i - 1) * h;
      list.value = n;
      page.value = i;
      select.value = o;
    };

    const l = (t) => {
      page.value = t;
      select.value = 1;
    };

    const u = (t) => {
      select.value = t;
    };

    watch(noticeIndex, (t) => {
      if (t || 0 === t) {
        select.value = t;
        c();
      }
    }, { immediate: true });

    return {
      notice: publicNotice,
      unfold: s,
      formatTime: r,
      changePage: l,
      tabChange: u
    };
  }
};

const NoticePopup = defineProps({
  ...noticeProps
});

const render = () => {
  return (
    <div className="announce-popup-container">
      <div className="popup-bg">
        <div className="popup-content">
          <div className="popup-main">
            <div className="left-wrap">
              <ul className="content-nav">
                {list.value[page.value - 1].map((n, i) => (
                  <li key={i} className={select.value === i ? 'active' : ''} onClick={() => u(i)}>
                    <i className="icon icon_notice"></i>
                    <div className="nav-title">{n.title}</div>
                    <span className="item-arrow">
                      <svg-icon iconClass="common-arrow"></svg-icon>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="paginate-wrapper">
              <paginate
                :page-count="list.value.length"
                :page-range="1"
                :click-handler="l"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'pagination-container'"
                :page-class="'page-item'"
                :page-link-class="'page-link-item'"
                :prev-class="'prev-item'"
                :prev-link-class="'prev-link-item'"
                :next-class="'next-item'"
                :next-link-class="'next-link-item'"
                :break-view-class="'break-view'"
                :break-view-link-class="'break-view-link'"
                v-model="page"
              ></paginate>
            </div>
            <div className="content-detail">
              <div className="content-title">
                {list.value[page.value - 1][select.value].title || ''}
              </div>
              <div className="detail-box">
                <div className="detail-text vhtml" v-html="list.value[page.value - 1][select.value].content || ''"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

defineProps({
  render
});
</script>

<template>
  <render />
</template>