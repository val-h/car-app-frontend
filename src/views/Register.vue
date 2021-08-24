<template>
  <b-container class="login">
    <div class="row offset-4">
      <div class="col-md-6">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Register</h3>
          </div>
            <div class="panel-body">
              <form @submit.prevent="register" accept-charset="UTF-8" role="form">
                      <fieldset>
                  <div class="form-group">
                    <input class="form-control" placeholder="Username" v-model="username" name="username" type="text">
                </div>
                <p v-if="!checkPasswordStrength && password.length > 0">Your password must contain at least 8 characters, 1 capital, 1 small letter and a special symbol</p>
                <div class="form-group">
                  <input class="form-control" placeholder="Password" v-model="password" name="password" type="password" value="">
                </div>
                <p v-if="!checkPasswordsIfSame">Passwords should match</p>
                <div class="form-group">
                  <input class="form-control" placeholder="Password" v-model="passwordCheck" name="Password-Check" type="password" value="">
                </div>
                <input class="btn btn-lg btn-success btn-block" :disabled="!checkPasswordsIfSame || !checkPasswordStrength" type="submit" value="Register">
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
  data () {
    return {
      username: '',
      password: '',
      passwordCheck: ''
    }
  },
  computed: {
    // FIXME  password validation should be handled in BE
    checkPasswordsIfSame () {
      return this.password === this.passwordCheck
    },
    checkPasswordStrength () {
      const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
      return this.password.match(strongRegex)
    }
  },
  methods: {
    register () {
      this.$store.dispatch('userRegister', {
        username: this.username,
        password: this.password
      })
        .then(() => {
          this.$router.push({ name: 'Login' })
        })
        .catch(err => {
          console.log(err)
          console.log('username ' + this.username)
          console.log(this.password)
          this.incorrectAuth = true
        })
    }
  }
}
</script>
