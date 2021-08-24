<template>
  <div class="posts">
    <CarDetail
    :postId="parseInt($route.params.id)"/>
  </div>
</template>

<script>
import CarDetail from '@/components/CarDetail'

export default {
  data () {
    return {
    }
  },
  components: {
    CarDetail
  }
}
</script>

<style lang="sass">
html
  scroll-behavior: smooth
</style>
