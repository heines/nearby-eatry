<template lang="pug">
  svg(
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 -10 91.06 90'
    :width="width"
    :class="{ on: isAnime }"
    )
    title {{ title }}
    g(
      id='all', data-name='icon')
      g#icon
        g#dish
          path.cls-1(d='M46.06,14a23,23,0,1,1-23,23,23,23,0,0,1,23-23m0-2a25,25,0,1,0,25,25,25,25,0,0,0-25-25Z')
        path#fork.cls-2(d='M1.06,18c.91,3.88,3.37,7,5,7V65a4,4,0,0,0,8,0V25c1.64,0,4.09-3.12,5-7,.14-1.47,0-3.38,0-5V3a2,2,0,0,0-4,0V13a1.5,1.5,0,0,1-3,0V3a2,2,0,0,0-4,0V13a1.5,1.5,0,0,1-3,0V3a2,2,0,1,0-4,0V13C1.06,14.62.92,16.53,1.06,18Z')
        path#spoon.cls-2(d='M86.06,64.74a4,4,0,1,1-8,0h0V24.33c-2.39-2.17-4-6.2-4-10.83,0-6.9,3.58-12.5,8-12.5s8,5.6,8,12.5c0,4.63-1.61,8.67-4,10.83Z')
        g#reflection
          path.cls-3(d='M46.06,56a19,19,0,0,1-19-19')
          path.cls-3(d='M46.06,18a19,19,0,0,1,19,19')
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '80px',
    },
    isAnime: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    }
  }
}
</script>

<style lang="scss">
  .cls-1 {
    fill:#ffd817;
  }
  .cls-2, .cls-3{
    fill:none;
    stroke:#ffd817;
    stroke-miterlimit:10;
    stroke-width:2px;
  }
  .cls-3{
    stroke-linecap:round;
  }
  .on {
    #reflection {
      transform-origin: 46px 37px;
      animation-name: reflect;
      animation-delay: .2s;
      animation-duration: 1.5s;
      animation-fill-mode: both;
      animation-iteration-count: infinite;
      animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
    }
    #fork, #spoon {
    transform: translateY(-10px);
    animation-name: knock;
    animation-delay: .2s;
    animation-duration: 1.5s;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  }
  @keyframes reflect {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes knock {
    0% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-10px);
    }
    70% {
      transform: translateY(0px);
    }
    80% {
      transform: translateY(-10px);
    }
    90% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(-10px);
    }
  }
</style>
