<template>
  <div>
    <h1>Основная страница</h1>
    <div class="app__btns">
      <my-button @click="$router.push('/store')"> Посты со стора </my-button>
      <my-button @click="showPopup"> Добавить пост </my-button>
      <my-select :value="selectedSort" :options="sortOptions" />
    </div>
    <my-popup v-model:show="popupVisible">
      <post-form @add="addPost">Создание поста</post-form>
    </my-popup>
    <post-list :posts="posts" v-if="!isPostLoading"></post-list>/>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import getApi from "@/axios-api";


export default {
  components: {
    PostForm,
    PostList
  },
  data() {
    return {
      popupVisible: false,
      posts: [],
      isPostLoading: false,
      selectedSort: "",
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "text", name: "По описанию" },
      ],
    };
  },
  methods: {
    refreshPostsData() {
      this.isPostLoading = true;
      getApi
        .get("")
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => console.log(error))
        .finally((this.isPostLoading = false));
      console.log(this.selectedSort);
    },
    addPost(post) {
      getApi
        .post("", {
          title: post.title,
          text: post.text,
          author: 1,
          created_date: "",
          published_date: "",
        })
        .then((response) => {
          this.posts.push(response.data);
          this.refreshPostsData();
        })
        .catch((error) => console.log(error));
      this.popupVisible = false;
    },
    sortedPosts() {
        return [...this.posts].sort((post1, post2) => {
          return post1[this.selectedSort]?.localCompare(post2[this.selectedSort])
        })
      },
    showPopup() {
      this.popupVisible = true;
    },
  },
    mounted() {
      this.refreshPostsData();
  },
};
</script>

<style>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: flex-start;
  padding: 10px;
}
</style>
