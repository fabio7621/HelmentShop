<template>
  <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row mb-3">
            <div class="col-sm-4">
              <div class="form-group mb-3">
                <label for="imageUrl" class="form-label">主要圖片</label>
                <input
                  id="imageUrl"
                  v-model="product.imageUrl"
                  type="text"
                  class="form-control"
                  placeholder="請輸入圖片連結"
                />
                <img
                  class="img-fluid"
                  :src="product.imageUrl"
                  alt="product pic"
                />
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label"
                  >或 上傳圖片
                  <div
                    class="spinner-border m-5"
                    role="status"
                    v-if="status.fileUploading"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  ref="fileInput"
                  @change="uploadFile"
                />
              </div>
              <div v-if="Array.isArray(product.imagesUrl)">
                <div
                  class="mb-1"
                  v-for="(image, key) in product.imagesUrl"
                  :key="key"
                >
                  <div class="form-group">
                    <label :for="`imagesUrl${key}`" class="form-label"
                      >圖片網址</label
                    >
                    <input
                      :id="`imagesUrl${key}`"
                      v-model="product.imagesUrl[key]"
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <img class="img-fluid" :src="image" alt="pic" />
                </div>
                <div
                  v-if="
                    !product.imagesUrl.length ||
                    product.imagesUrl[product.imagesUrl.length - 1]
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="product.imagesUrl.push('')"
                    type="button"
                  >
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <button
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="product.imagesUrl.pop()"
                    type="button"
                  >
                    刪除圖片
                  </button>
                </div>
              </div>
             
            </div>
            <div class="col-sm-8">
              <div class="form-group mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  v-model="product.title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                />
              </div>

              <div class="row mb-3">
                <div class="form-group col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    v-model="product.category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="unit" class="form-label">單位</label>
                  <input
                    id="unit"
                    v-model="product.unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>

              <div class="row mb-3">
                <div class="form-group col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    v-model.number="product.origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    v-model.number="product.price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />

              <div class="form-group mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  v-model="product.description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                >
                </textarea>
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="content"
                  v-model="product.content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                >
                </textarea>
              </div>
              <div class="form-group mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    v-model="product.is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateProduct">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import { mapActions } from "pinia";
import { useToastMessageStore } from "@/stores/toastMessage";
export default {
  data() {
    return {
      pModal: null,
      isLoading: false,
      tempProduct: {},
      status: {
        fileUploading: false,
      },
    };
  },
  props: ["product", "isNew"], //註記不要再data裡面放跟props一樣的名子
  methods: {
    ...mapActions(useToastMessageStore, ["pushMessage"]),
    openM() {
      this.pModal.show();
    },
    closeM() {
      this.pModal.hide();
    },
    updateProduct() {
      const url = this.isNew
        ? `${import.meta.env.VITE_API}/api/${
            import.meta.env.VITE_APIPATH
          }/admin/product`
        : `${import.meta.env.VITE_API}/api/${
            import.meta.env.VITE_APIPATH
          }/admin/product/${this.product.id}`;

      const httpMethod = this.isNew ? "post" : "put";
      this.isLoading = true;
      this.$http[httpMethod](url, { data: this.product })
        .then((res) => {
          alert(res.data.message);
          this.isLoading = false;
          this.closeM();
          this.$emit("update");
        })
        .catch((error) => {
          alert(error.res.data.message);
          this.isLoading = false;
        });
    },
    newImages() {
      this.product.imagesUrl = [];
      this.product.imagesUrl.push("");
    },
    uploadFile() {
      const uploadedFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append("file-to-upload", uploadedFile);
      const url = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_APIPATH
      }/admin/upload`;
      this.status.fileUploading = true;
      this.$http
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.status.fileUploading = false;
          this.tempProduct.imageUrl = response.data.imageUrl;
          this.$refs.fileInput.value = "";
          this.pushMessage({
            style: "success",
            title: "圖片上傳結果",
            content: response.data.message,
          });
        })
        .catch((error) => {
          this.status.fileUploading = false;
          this.pushMessage({
            style: "danger",
            title: "圖片上傳結果",
            content: error.response.data.message,
          });
        });
    },
  },
  mounted() {
    this.pModal = new Modal(this.$refs.productModal);
  },
};
</script>
