<template>
  <section class="index-coupon">
    <div class="index-coupon-main">
      <h3>優惠卷宝くじ<br /><span>結帳前來點選玩玩喔~</span></h3>
      <button type="button" @click="generateRandomNumber" class="btn mx-auto">試試手氣吧～</button>
      <div class="ticket-box row" v-if="randomNumber !== null">
        <div class="col-12 col-md-6 mx-auto" v-if="randomNumber === 0">
          <router-link to="/checkout/DFW444" class="ticket-item d-block">
            <img class="w-100" src="../../src/assets/image/ticker01.png" alt="優惠卷" />
          </router-link>
        </div>
        <router-link to="/checkout/74497" class="d-block col-12 col-md-6 mx-auto text-decoration-none" v-else>
          <div class="ticket-item">
            <img class="w-100" src="../../src/assets/image/ticket02.png" alt="優惠卷" />
          </div>
          <p>點選後直接進結帳畫面喔~</p>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      randomNumber: null,
    };
  },
  methods: {
    generateRandomNumber() {
      this.randomNumber = Math.floor(Math.random() * 2);
    },
  },
};
</script>
<style>
.ticket-box > a > p {
  font-size: 16px;
  color: #333333;
  letter-spacing: 0.05em;
  font-weight: 500;
  margin-top: 0.5rem;
}
</style>
