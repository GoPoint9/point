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
  background: linear-gradient(171deg, #3baf4c 7.46%, #00d08a 92.59%);
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
      height: 614px;
      background-image: url('./start.png');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
    .logo {
      background-repeat: no-repeat;
      background-size: contain;
      margin-top: 160px;
      width: 350px;
      &.vxth {
        margin-top: 40%;
      }
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
