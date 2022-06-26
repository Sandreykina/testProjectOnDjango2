<template>
  <div>
    <div class="app__btns">
      <my-button @click="$router.back">Назад</my-button>
      <my-button @click="showPopup">  Отредактировать пост </my-button>
      <my-popup v-model:show="popupVisible">
        <edit-post-form @edit="editPost"></edit-post-form>
      </my-popup>

      <my-button @click="removePost">
        Удалить
      </my-button>
    </div>
    <div>
      <h1>{{post.title}}</h1>
      <div> {{post.text}} </div>
      <div> {{post.created_date}} </div>
      <div> {{post.published_date}} </div>
    </div>
  </div>
</template>

<script>
import getApi from "@/axios-api";
import EditPostForm from "../EditPostForm.vue";

export default {
  name: 'post-detail',
  components: {
    EditPostForm
  },
  data() {
    return {
      popupVisible: false,
      post: {}
    };
  },
  methods: {
    getPostById() {
      this.isPostLoading = true;
      getApi
        .get(`?id=${this.$route.params.id}`)
        .then((response) => {
          console.log(response.data)
          this.post = response.data
        })
        .catch((error) => console.log(error))
        .finally((this.isPostLoading = false));
    },

    editPost(newpost) {
      console.log(newpost)
      getApi
        .put(`?id=${this.$route.params.id}`, {
          author: 1,
          title: newpost.title,
          text: newpost.text,
          created_date: this.post.created_date,
          published_date: "",
        })
        .then((response) => {
          this.post = response.data;
        })
        .catch((error) => console.log(error));
      this.popupVisible = false;
      this.getPostById();
    },

    removePost() {
      getApi
        .delete(`?id=${this.$route.params.id}`)
        .then(() => {
          console.log("successful delete");
        })
        .catch((error) => console.log(error));
    },

    showPopup() {
      this.popupVisible = true;
    }
  },
  
  mounted() {
    this.getPostById();
  },
};
</script>

<style scoped>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>
