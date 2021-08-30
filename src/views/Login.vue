<template>
  <b-container class="login">
    <div class="row offset-4">
      <div class="col-md-6">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Please sign in</h3>
          </div>
            <div class="panel-body">
          <!-- FIXME Setting text inside the html tag instead of between brackets -->
          <!-- Checked -->
              <p v-if="incorrectAuth">Incorrect username or password</p>
              <form @submit.prevent="login" accept-charset="UTF-8" role="form">
                      <fieldset>
                  <div class="form-group">
                    <input class="form-control" placeholder="Username" v-model="username" name="username" type="text">
                </div>
                <div class="form-group">
                  <input class="form-control" placeholder="Password" v-model="password" name="password" type="password" value="">
                </div>
                <div class="checkbox">
                    <label>
                      <input name="remember" type="checkbox" value="Remember Me"> Remember Me
                    </label>
                  </div>
                <input class="btn btn-lg btn-success btn-block" :to="`/`" type="submit" value="Login">
              </fieldset>
                </form>
            </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      incorrectAuth: false
    }
  },
  methods: {
    // FIXME  Trying to catch an error on action,
    // FIXME  .catch never will never be invoked because in userLogin action
    // FIXME  error doesn't get handled as well
    // Checked
    login () {
      try {
        this.$store.dispatch('userLogin', {
          username: this.username,
          password: this.password
        })
          .then(() => {
            this.$router.push({ name: 'Home' })
          })
      } catch (error) {
        this.incorrectAuth = true
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
