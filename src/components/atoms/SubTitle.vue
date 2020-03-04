<template lang="pug">
  h2 {{ text }}
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
  h2 {
    margin: 0;
  }
</style>
