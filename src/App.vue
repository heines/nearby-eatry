<template lang="pug">
  #app
    #nav
    transition(mode="out-in")
      router-view
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP&display=swap');
@import '@/assets/css/foundation/ress.scss';
@import '@/assets/css/foundation/base.scss';
@import '@/assets/css/foundation/variables.scss';

body {
  background: $base-color;
}

#app {
  // font-family: 'Noto Sans JP', Helvetica, sans-serif;
  font-family: serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2B2D42;
  a {
    color: #8D99AE;
    text-decoration: none;
    cursor: pointer;
    display: block;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #cccccc;

    &.router-link-exact-active {
      color: #ffd700;
    }
  }
}

.v-enter-active, .v-leave-active {
  transition: opacity .5s;
}
.v-enter, .v-leave-to {
  opacity: 0;
}
</style>
