<template>
  <div>
    <form @submit.prevent>
      <h2>Добавление поста</h2>
      <my-input v-model="post.title" placeholder="Название" />
      <my-input v-model="post.text" placeholder="Описание" />
      <my-button @click="addPostForm"> Добавить </my-button>
    </form>
  </div>
</template>

<script>
export default {
  name: "post-form",
  data() {
    return {
      post: {
        author: 1,
        title: "",
        text: "",
        created_date: "",
        published_date: "",
      },
    };
  },
  methods: {
    addPostForm() {
      this.post.id = Date.now();
      this.$emit("add", this.post);
    },
  }
};
</script>

<style>
form {
  display: flex;
  flex-direction: column;
}
</style>
