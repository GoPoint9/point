<template>
  <div class="start-page">
    <div>
      <div class="dice" />
      <p>{{ $t('fairAndSafe') }}</p>
      <img class="logo" src="./logo.png">
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.start-page {
  position: fixed;
  z-index: 9999;
  width: 750px;
  height: 100%;
  background: linear-gradient(191deg, #317bfb 21.75%, #4f90ff 39.66%, #a7d9fb 62.25%, #bac1f9 85.21%, #f6bfd0 99.4%);
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .dice {
      width: 750px;
      height: 810px;
      background-image: url('./start.png');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
    .logo {
      background-repeat: no-repeat;
      background-size: contain;
      margin-top: 160px;
      width: 338px;
    }
    p {
      font-weight: bold;
      font-size: 38px;
      color: var(--text_color_L4);
      margin-top: 30px;
      padding: 0 10px;
      text-align: center;
    }
  }
}
</style>
