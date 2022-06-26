<template>
  <div>
    <form @submit.prevent>
      <h3>Редактирование поста</h3>
      <my-input v-model="newpost.title" placeholder="Название" />
      <my-input v-model="newpost.text" placeholder="Описание" />
      <my-button @click="editPostForm"> Отредачить </my-button>
    </form>
  </div>
</template>

<script>
export default {
  name: "edit-post-form",
  data() {
    return {
      newpost: {
        author: 1,
        title: "",
        text: "",
        created_date: "",
        published_date: "",
      },
    };
  },
  methods: {
    editPostForm() {
      this.$emit("edit", this.newpost);
      console.log(this.newpost.title)
    }
  }
};
</script>

<style>
form {
  display: flex;
  flex-direction: column;
}
</style>
