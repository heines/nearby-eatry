<template lang="pug">
.v-paragraph
  p {{ text }}
</template>
<script>
export default {
  props: {
    text: {
      type: String
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
