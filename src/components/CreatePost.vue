<template>
  <div>
    <b-container fluid="sm">
    <b-form @submit.prevent="createPost">
      <b-form-group id="input-group-5" label="Brand:" label-for="input-5">
        <b-form-select
          id="input-5"
          v-model="brandId"
          required
        >
        <option :value="brand.id" v-for="(brand, index) in get_brands" :key="index"> {{ brand.name }} </option>
        </b-form-select>
      </b-form-group>

      <b-form-group id="input-group-5" label="Model:" label-for="input-7">
        <b-form-select
          id="input-7"
          required
          v-if="brandId !== undefined"
          v-model="form.model"
        >
        <option v-for="(model, index) in selectedBrandModels" :key="index" :value="model.id"> {{ model.name }} </option>
        </b-form-select>
        <b-form-select
          id="input-7"
          required
          v-if="brandId === undefined"
          v-model="form.model"
        >
        <option v-for="(model, index) in models" :key="index"> {{ model.name }} </option>
        </b-form-select>
      </b-form-group>

      <b-form-group id="input-group-3" label="Description:" label-for="input-3">
        <b-form-input
          id="input-3"
          placeholder="Description"
          required
          v-model="form.description"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Phone number:" label-for="input-4">
        <b-form-input
          id="input-4"
          placeholder="+359 5555555555"
          required
          v-model="form.phoneNumber"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-11" label="Price:" label-for="input-11">
        <b-form-input
          id="input-11"
          placeholder="5000"
          required
          v-model="form.price"
        ></b-form-input>
      </b-form-group>

      <b-form-group
      id="input-group-15"
      label="Specifications:"
      label-for="input-15"
      >
        <b-form-select
          id="input-15"
          required
          multiple
          v-model="form.specifications"
        >
        <option
        v-for="specification in specifications"
        :key="specification.id"
        :value="specification.id"
        > {{ specification.name }} </option>
        </b-form-select>
      </b-form-group>

      <!-- FIXME Maybe give a better idea of uploading photos -->
      <b-form-group
      id="form-images"
      label="Images"
      description="Paste image links separated by new line or comma"
      >
        <textarea
        v-model="form.images"
        class="form-control"
        rows="5"
        id="boomer"></textarea>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import $ from 'jquery'

export default {
  data () {
    return {
      // FIXME Better to store it as null
      brandId: undefined,
      form: {
        model: -1,
        description: '',
        phoneNumber: '',
        specifications: [],
        images: [],
        price: 0
      }
    }
  },
  computed: {
    // FIXME data has defined specifications and getter has specifications, this.specifications may give undesired results
    ...mapGetters([
      'get_brands',
      'models',
      'specifications'
    ]),
    selectedBrandModels () {
      return this.models.filter(model => model.brand.id === this.brandId)
    }
  },
  methods: {
    // FIXME Useless use of jQuery in VueJS when can be used description property of element
    changeCursor () {
      $('#input-group-15').hover(function () {
        $(this).css('cursor', 'pointer').attr('title', 'Use Ctrl to select multiple')
      }, function () {
        $(this).css('cursor', 'auto')
      })
    },
    createPost () {
      // FIXME createPost takes only one argument, the formData
      if (this.form.images.length === 0) {
        this.$store.dispatch('createPost', { formData: this.form, withDefaultPicture: true })
      } else {
        this.form.images = this.form.images.replace(/\n/g, ',').split(',')
        this.$store.dispatch('createPost', { formData: this.form, withDefaultPicture: false })
      }
      this.$router.push({ name: 'Home' })
    }
  },
  mounted () {
    this.changeCursor()
  }
}
</script>

<style lang="sass" scoped>
.container-sm
  // border: 2px solid #189131
  margin-top: 100px
  width: 500px

#boomer
  position: absoute
  width: 700px
</style>
