<template>
  <div class="regiona-wrap">
    <div class="content-wrap">
      <div class="right-wrap">
        <div class="logo-wrap">
          <CommonLogo :src="logoSrc" />
        </div>
        <h2>{{ $t('blockip') }}</h2>
        <div class="ip_address">
          <span>IP：</span>
          <span>{{ locationInfo.ip }}</span>
        </div>
        <div class="error-info">
          <p>{{ $t('info_ip_block') }}</p>
        </div>
        <a class="service-btn" href="javascript:void(0)" @click="getService">
          <i />
          <span>{{ $t('in_customer_service') }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useService, useStore } from 'some-module' // Replace with actual module imports.

export default {
  name: 'Regiona',
  components: {
    CommonLogo: /* Resolve component here, e.g., import */ null,
  },
  setup () {
    const { getService } = useService()
    const store = useStore()
    const locationInfo = computed(() => store.Login.location)
    const logoSrc = require('path/to/logo') // Replace with actual path.

    return {
      getService,
      locationInfo,
      logoSrc,
    }
  },
}
</script>

<style scoped>
/* Add relevant styles here */
</style>
