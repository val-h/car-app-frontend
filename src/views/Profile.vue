<template>
  <div class="home">
    <b-container>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters([
      'user_id'
    ])
  },
  mounted () {
    this.$store.dispatch('loadCurrentUser', { userId: this.user_id })
  }
}
</script>
