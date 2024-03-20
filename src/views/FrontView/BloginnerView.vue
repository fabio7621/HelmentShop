<template>
  <section class="section-main-banner">
    <img
      class="d-none d-md-block w-100"
      src="../../assets/image/productbanner0003.png"
      alt=""
    />
    <img
      class="d-block d-md-none w-100"
      src="../../assets/image/phone-banner/banner-p04.png"
      alt=""
    />
  </section>
  <section class="section-bread">
    <div class="section-bread-main">
      <ol class="bread-list d-flex align-items-center">
        <li class="bread-list-item">
          <div class="section-bread-pic">
            <img width="20" src="../../assets/image/icon/home.svg" alt="" />
          </div>
        </li>
        <li class="bread-list-item" aria-current="page">
          <a>Blog</a>
        </li>
        <li class="bread-list-item" aria-current="page">
          <span>/</span>
        </li>
        <li class="bread-list-item" aria-current="page">
          <a>內文標題</a>
        </li>
      </ol>
    </div>
  </section>
  <section class="section-product">
    <div class="section-product-main">
      <div class="section-product-title d-flex align-items-center">
        <div class="product-title-pic">
          <img src="../../assets/image/motohead.png" alt="" />
        </div>
        <h2>Blog</h2>
      </div>
      <div class="article-box row">
        <div class="col-12">
          <div class="article-item">
            <a class="article-item-pic d-block">
              <img :src="article.imageUrl" class="w-100" />
            </a>
            <div class="article-content">
              <h3>{{ article.title }}</h3>
              <p>
                {{ article.author
                }}<span>{{ $filters.date(article.create_at) }}</span>
              </p>
              <div v-html="article.content"></div>
            </div>
          </div>
        </div>
      </div>
      <router-link to="/blog" class="backBtn">回到上一頁</router-link>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      article: {},
      id: "",
    };
  },
  methods: {
    getArticle() {
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_APIPATH
      }/article/${this.id}`;

      this.$http
        .get(api)
        .then((response) => {
          this.article = response.data.article;
        })
        .catch((error) => {
          console.log("取得文章資訊失敗", error.response.data.message);
        });
    },
  },
  created() {
    this.id = this.$route.params.blogid;
    this.getArticle();
  },
};
</script>

<style></style>
