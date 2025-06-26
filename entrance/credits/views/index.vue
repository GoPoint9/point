<template>
  <StickyTop />
  <Container />
  <BodyContent />
  <Footer />
</template>

<script setup lang="ts">
import BodyContent from "./body-content.vue";
import StickyTop from "./sticky-top.vue";
import Container from "./container.vue";
import Footer from "./footer.vue";

import { useRouter } from "vue-router";
import { useLoading } from "@/components/common/use";
// import { showDialog } from 'vant'
import { onMounted, ref } from "vue";
import { isHybridApp, openBrowser } from "@/utils/jsBridge";
import { useGame } from "@/hooks";
const { goGame } = useGame();
const router = useRouter();
const { start, end, flag } = useLoading();


onMounted(() => {});
</script>
