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
  background: linear-gradient(180deg, #ce0204 0%, #f13f3a 100%);
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
      background-repeat: no-repeat;
      background-position: center;
      background-image: url('./start.png');
      width: 584px;
      height: 584px;
      background-size: contain;
    }
    .logo {
      background-repeat: no-repeat;
      background-size: contain;
      margin-top: 160px;
      max-width: 50%;
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
