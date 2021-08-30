<template>
  <b-container class="bv-example-row">
    <div>
      <h2 ><b-badge>{{ post.model.brand.name }} - {{ post.model.name }}</b-badge> Price: {{ post.price}}$ </h2>
    </div>
    <b-row class="first-row">
    <b-col class="full-size-image" cols="8">
      <div class="image-box">
        <!-- What if photos is not '' but it is an empty list or null? -->
        <img
        v-if="currentImageSrc === ''"
        :src="post.photos[0].src" />
        <img
        v-else
        :src="currentImageSrc" />

        <div v-if="post.photos" class="image-choices">
          <img
            v-for="(image, index) in post.photos"
            :key="index"
            :src="image.src"
            @click="selectedSrc(image.src)"
            :class="[currentImageSrc === image.src ? 'selected' : '']" />
        </div>
        <b-nav-item @click="deletePost()" :href="`/`" v-if="post.owner == currentUser.username" id="delete-button" type="button" >Delete Post</b-nav-item>
      </div>
    </b-col>
    <b-col cols="4">
      <div class="about-car">
      <h2 :title="postId"><b-badge></b-badge></h2>
      {{ postDescription }}
      </div>

      <div class="car-addons">
        <h5>Features</h5>
        <!-- Object used as key throws warnings -->
        <!-- Checked -->
        <h5  v-for="type in types"
        :key="type.name">
         <b>{{ type.name }}</b>

          <h6
          v-for="(specification, index) in post.specifications"
          :key="index"
          >
          <p
          v-if="specification.type.name === type.name">
            {{ specification.name }}
          </p>
          </h6>

        </h5>
      </div>

      <div class="about-user">
        <h6 class="user-name">
          <!-- FIXME Setting text inside the html tag instead of between brackets -->
          <!-- Checked -->
          <b>Individual features</b>
        </h6>
        <h6 class="user-city">
          <b>Sofia</b>
        </h6>
      </div>
      <b-list-group class="number-section">
        <b-list-group-item class="d-flex justify-content-between align-items-center">
          <b-icon icon="telephone-outbound-fill" scale="2" variant="dark"></b-icon>
          {{ post.phone_number }}
        </b-list-group-item>
      </b-list-group>
    </b-col>
    </b-row>
    <b-row>
      <b-col  cols="8">
      </b-col>
      <b-col cols="4">
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: {
    postId: Number
  },
  data () {
    return {
      currentImageSrc: '',
      currentTypes: []
    }
  },
  mounted () {
    this.$store.dispatch('loadSpecificationTypes')
  },
  computed: {
    types () {
      return this.$store.getters.get_types
    },
    currentUser () {
      return this.$store.getters.current_user
    },
    // FIXME Passing id to get a current post from all of the posts in the state is a bad practise
    // FIXME  Better to make a get request on a specific post and get only that object.
    post () {
      return this.$store.getters.get_post_by_id(parseInt(this.postId))[0]
    },
    links () {
      return this.$store.getters.get_image_links_by_id(parseInt(this.postId))
    },
    postsfeatures () {
      return this.$store.getters.get_features_by_id(parseInt(this.postId))
    },
    postDescription () {
      // FIXME Could be used string interpolation
      // Checked
      return `Description - ${this.post.description}`
    }
  },
  methods: {
    selectedSrc (image) {
      this.currentImageSrc = image
    },
    deletePost () {
      this.$store.dispatch('deletePost', this.post.id)
    }
  },
  watch: {
    setDefaultSrc: {
      immediate: true,
      handler () {
        try {
          this.currentImageSrc = this.links[0].src
        } catch (error) {
          //  FIXME no error handling
          // Checked, somewhat

          // Set default image
          this.currentImageSrc = 'http://www.aof-clan.com/AoFWiki/images/6/60/No_Image_Available.png'
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import url("https://fonts.googleapis.com/css?family=Raleway:300,400,600");

.first-row
  margin-top: 1rem

.container
  font-family: "Raleway"
  font-weight: bold

.col-8
  border: 2px solid #ADFF2F

.col-4
  border: 2px solid #00FFFF

.full-size-image img
  -webkit-user-drag: none
  -moz-user-select: none
  margin: 20px
  max-height: 30rem
  max-width: 40rem
.about-car
  margin-top: 20px
  margin-bottom: 15px

.car-addons
  margin-top: 20px
  margin-bottom: 20px

.number-section
  margin: 20px

.image-choices img
  margin: 3px
  max-width: 110px
  max-height: 60px
  -webkit-user-drag: none
  -moz-user-select: none

.image-choices img:hover
  cursor: pointer
  -webkit-filter: brightness(70%)
  -webkit-transition: all 1s ease
  -moz-transition: all 1s ease
  -o-transition: all 1s ease
  -ms-transition: all 1s ease
  transition: all 1s ease

.selected
  border: 1px solid #000000
  -webkit-filter: brightness(70%)
</style>
