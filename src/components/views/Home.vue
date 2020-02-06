<template lang="pug">
  .p-home
    .p-menu
      .p-menu__title
        h1 近場のごはん
      .p-menu__contents
        .p-menu__contents-icon
          router-link(
            to="/result"
            )
            Loading
        //- .p-menu__contents-input
        //-   div 場所を入力する
        //-   input
      router-link.p-menu__about(to="/about") About
</template>

<script>
import Loading from '@/components/atoms/Loading.vue';
export default {
  name: 'home',
  components: {
    Loading
  }
}
</script>

<style lang="scss">
  .p-menu {
    width: 80%;
    height: 80vh;
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
