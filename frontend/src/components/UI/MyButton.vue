<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button'
};
</script>

<style scoped>
.btn {
  align-self: end;
  padding: 10px 15px;
  background: none;
  color: rgb(0, 70, 128);
  border: 2px solid rgb(0, 70, 128);;
}
</style>
