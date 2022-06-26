<template>
  <div class = "popup" v-if = "show === true" @click="hidePopup">
    <div @click.stop class = "popup-content">
        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-popup',
  props: {
      show: {
          type: Boolean,
          default: false
      }
  },
  methods: {
    hidePopup() {
      this.$emit('update:show', false)
    }
  }
};
</script>

<style scoped>
.popup {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}
.popup-content {
    margin: auto;
    background: white;
    border-radius: 12px;
    min-height: 100px;
    min-width: 300px;
    padding: 30px;
}
</style>
