<template lang="pug">
  .p-home
    Title(
      text = '近場のごはん'
      )
    .p-lunch
      .p-lunch__left
        router-link(
          to = "/result"
          )
          Loading(
            width = "100px"
            :isAnime = 'false'
            title = "TAP!!"
            :isInversion = 'true'
            )
      .p-lunch__right
        Input(
          v-model = "inputs"
          )
        router-link(
          :disabled = "!inputs"
          :event = "inputs ? 'click' : '' "
          :to = "{ path: `/result/${inputs}` }"
          ) 検索
    router-link(
      to = "/about"
      ) About
</template>

<script>
import Title from '@/components/atoms/Title';
import Loading from '@/components/atoms/Loading';
import Input from '@/components/atoms/Input';
export default {
  name: 'home',
  data() {
    return {
      inputs: '',
    }
  },
  components: {
    Loading,
    Title,
    Input,
  },
}
</script>

<style lang="scss">
  .p-lunch{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 15px;
    &__left, &__right {
      width: 180px;
      height: 120px;
      margin-bottom: 15px;
    }
    &__left {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      background: #ffd817;
      border-radius: 3px;
    }
    &__right {
      padding: 20px;
      box-sizing: border-box;
      border: 3px solid #ffd817;
      border-radius: 3px;
    }
  }
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
