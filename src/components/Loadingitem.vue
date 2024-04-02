<template>
  <div class="loading-wrap">
    <div class="loading-pic">
      <img class="w-100" src="../assets/image/loading-pic.gif" alt="loading" />
    </div>
  </div>
</template>
<style scoped>
.loading-wrap {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 1900px;
  z-index: 998;
  background-color: #ffffff78;
}
.loading-pic {
  width: 200px;
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
