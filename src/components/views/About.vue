<template lang="pug">
  .p-about
    Title(
      text = 'このサイトについて'
      )
    h2 concept
    p 何も考えたくないけど、近場で美味しいご飯が食べたい。
      span 今すぐ
    h2 How use
    ol
      li ボタンをクリック or タップすると、現在地の周辺の店舗にピンを立てる。
    router-link(to="/") Home
</template>
<script>
import Title from '@/components/atoms/Title';
export default {
  components: {
    Title,
  },
}
</script>
<style>
</style>
