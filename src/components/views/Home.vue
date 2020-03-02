<template lang="pug">
  .p-home
    Title(
      text = '近場のごはん'
      )
    router-link(
      to = "/result"
      )
      Loading(
        width = "100px"
        :isAnime = 'false'
        title = "TAP!!"
        )
    router-link(
      to = "/about"
      ) About
</template>

<script>
import Title from '@/components/atoms/Title';
import Loading from '@/components/atoms/Loading';
export default {
  name: 'home',
  components: {
    Loading,
    Title,
  },
}
</script>

<style lang="scss">
  .p-menu {
    width: 80%;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    padding: 3em;
    box-sizing: border-box;
    box-shadow: 0px 3px 10px rgba(0,0,0,.1);
    @media screen and (max-width:768px) {
      width: auto;
    }
    &__contents {
      display: flex;
      justify-content: center;
      &-icon, &-input {
        width: 50%;
      }
      &-input {
      }
    }
    &__about {
      display: inline-block;
      margin-top: 10em;
    }
  }
</style>
