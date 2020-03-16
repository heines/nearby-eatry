<template lang="pug">
  input(
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
    )
</template>
<script>
export default {
  props: {
    value: {
      type: String,
    }
  }
}
</script>
<style lang="scss" scoped>
  input {
    max-width: 100%;
    border: 1px solid #CCC;
    box-sizing: border-box;
  }
</style>
