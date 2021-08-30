<template>
  <div class="home">
    <b-container>
      <CarList
          />
    </b-container>
  </div>
</template>

<script>
import CarList from '@/components/CarList'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    CarList
  },
  computed: {
    ...mapGetters([
      'user_id'
    ])
  },
  mounted () {
    // FIXME multiple loading posts for no reason
    // Checked
    this.$store.dispatch('loadPosts')
    this.$store.dispatch('loadCurrentUser', { userId: this.user_id })
  }
}
</script>
