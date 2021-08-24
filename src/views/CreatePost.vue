<template>
  <div class="home">
    <b-container>
      <FormPost
          />
    </b-container>
  </div>
</template>

<script>
import FormPost from '@/components/CreatePost'

export default {
  name: 'CreatePost',
  components: {
    FormPost
  }
}
</script>
