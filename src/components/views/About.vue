<template lang="pug">
  .p-about
    Title(
      text = 'このサイトについて'
      )
    SubTitle(
      text = 'concept'
      )
    Paragraph(
      text = '何も考えたくないけど、近場で美味しいご飯が食べたい。今すぐ'
      )
    SubTitle(
      text = 'How use'
    )
    ol
      li ボタンをタップする
      li 立てられたピンをタップして、情報を確認する
    router-link(to="/") Home
</template>
<script>
import Title from '@/components/atoms/Title';
import SubTitle from '@/components/atoms/SubTitle';
import Paragraph from '@/components/atoms/Paragraph';
export default {
  components: {
    Title,
    SubTitle,
    Paragraph,
  },
}
</script>
<style>
  ol {
    margin: auto;
    width: 80%;
    text-align: left;
  }
</style>
