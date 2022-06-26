<template>
  <div class="post">
    <h3 @click="$router.push(`/post/${post.id}`)">{{ post.title }}</h3>
    <div><strong>Описание:</strong>{{ post.text }}</div>
  </div>
</template>
<script>

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
  },
};
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid rgb(0, 70, 128);;
}
</style>
