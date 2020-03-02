<template lang="pug">
  h1 {{ text }}
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
  }
}
</script>
<style lang="scss">
  h1 {
    margin: 0;
  }
</style>
