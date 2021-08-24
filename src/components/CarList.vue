<template>
  <b-container>
    <!-- Search bar -->
    <b-nav-form @change.prevent="">
      <b-form-input v-model="searched" size="sm" class="mr-sm-2" placeholder="Search by model name"></b-form-input>
    </b-nav-form>
    <!-- List of posts -->
    <!-- FIXME using the whole objects for :key throws warnings -->
    <div class="row" v-for="posts in chunkedPosts" :key="posts">
      <div class="column" v-for="post in posts" :key="post.id">
        <router-link :to="`/posts/${post.id}`">
        <!-- FIXME doesn't show the card at all if no picture -->
          <div v-if="post.photos.length > 0">
            <b-card
              no-body
              style="max-width: 20rem;"
              :img-src="post.photos[0].src"
              img-alt="Image"
              img-top
            >
              <template #header>
                <h4 class="mb-0">{{ post.model.name }}</h4>
              </template>

              <b-card-body>
                <b-card-title>{{ post.price }} $</b-card-title>
                <b-card-sub-title class="mb-2">{{ post.published }}</b-card-sub-title>
                <b-card-text>
                  {{ post.description }}
                </b-card-text>
              </b-card-body>

              <b-list-group flush>
                <b-list-group-item>{{  post.phone_number }}</b-list-group-item>
              </b-list-group>
            </b-card>
          </div>
        </router-link>
      </div>
    </div>
  </b-container>
</template>

<script>
import chunk from 'chunk'
export default {
  data () {
    return {
      index: -1,
      numberOfColumns: 3,
      searched: ''
    }
  },
  computed: {
    posts () {
      return this.$store.getters.get_posts
    },
    rowCount () {
      return Math.floor((this.posts.length - 1) / this.numberOfColumns) + 1
    },
    chunkedPosts () {
      if (this.searched === '') {
        return chunk(this.posts, 3)
      } else {
        //  FIXME  Filtering in the FE instead of passing the params to BE is a bad practise
        // FIXME  Lets say BE has pagination it'll filter only the paginated results

        // FIXME  Also dispatching loadPosts in computed which makes a 100 requests a second
        this.$store.dispatch('loadPosts')
        let posts = this.posts
        posts = posts.filter(el => el.model.name.toLowerCase().includes(this.searched.toLowerCase()))
        return chunk(posts, 3)
      }
    }
  },
  methods: {
    layoutCount (rows, columns) {
      return (rows - 1) * this.numberOfColumns + columns
    }
  }
}
</script>

<style lang="sass" scoped>
@import url("https://fonts.googleapis.com/css?family=Raleway:300,400,600");

b-container
  font-family: "Raleway"
  font-size: 1.5rem
  font-weight: bold

.card
  margin: 20px
  cursor: pointer

a
  text-decoration: none
  color: inherit

a:hover
  text-decoration: none
  color: inherit
</style>
