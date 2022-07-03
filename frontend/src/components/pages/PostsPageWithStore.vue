<template>
  <div>
    <h1>Страница работы со стором</h1>
    <div class="app__btns">
      <my-button @click="$router.back"> Обратно </my-button>
      <my-button @click="showPopup"> Добавить пост </my-button>
      <my-select model-value="selectedSort" @update:model-value="selectedSort" :options="sortOptions" />
    </div>
    <my-popup v-model:show="popupVisible">
      <post-form @add="addPost">Создание поста</post-form>
    </my-popup>
    <post-list :posts="posts" v-if="!isPostsLoading"></post-list>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: {
    PostForm,
    PostList
  },
  data() {
    return {
      popupVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPosts: 'post/setPosts'
    }),
    ...mapActions({
      fetchPosts: 'post/refreshPostsData',
      addPost: 'post/addPost'
    }),
    addPost(post) {
      this.posts.push(post);
      this.popupVisible = false;
    },
    showPopup() {
      this.popupVisible = true;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      sortOptions: state => state.post.sortOptions,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts'
    })
  }
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
