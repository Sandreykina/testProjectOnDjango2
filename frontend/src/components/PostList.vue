<template>
<div v-if="posts.length > 0">
  <h2>Список постов</h2>
    <post-item 
      v-for="post in posts" 
      :post="post" 
      :key="post.id"
    />
</div>
  <h2 v-else>
    Список постов пуст
  </h2>
</template>

<script>
import PostItem from './PostItem.vue';
export default {
  components: {
    PostItem
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  margin-top: 10px;
}
</style>
