<template>
  <div class="start-page">
    <div>
      <!-- <div class="dice"></div> -->
      <!-- <p>{{ $t('fairAndSafe') }}</p> -->
      <!-- <img class="logo" src="./logo.png" /> -->
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.start-page {
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  // background: linear-gradient(180deg, #CE0204 0%, #F13F3A 100%);
  background-image: url('./start1.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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
      height: 750px;
      background-image: url('./start1.png');
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
