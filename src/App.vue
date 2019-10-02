<template>
  <div id="app">
    <div class="phone">
      <div class="phone__print">
        {{ number | phoneNumber }}
      </div>

      <SwPhone v-model="number" />
    </div>
  </div>
</template>

<script>
import SwPhone from './components/sw-phone/index.vue'

export default {
  name: 'app',
  components: {
    SwPhone
  },
  data: () => ({
    number: '',
  }),
}
</script>

<style lang="stylus">
html
body
  width 100%
  height 100%
  margin 0
  padding 0
  font-family 'PT Sans', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  font-size 16px
  line-height 1.6

input
  margin 0
  padding 0
  box-sizing border-box
  font-size 16px
  line-height 1.6

.phone
  position absolute
  left 50%
  top 50%
  transform translateX(-50%) translateY(-50%)

  &__print
    margin-bottom 20px
    padding 15px 25px
    border 1px solid #ddd
    border-radius 5px
    font-size 20px
</style>
