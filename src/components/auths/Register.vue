<template>
  <div>

    <div class="register-page">
      <div class="header">
        <h2>Register</h2>
      </div>
      <div class="register-form">
        <form @submit.prevent="onSubmit">
          <div class="container">
            <label for="email"><b>Email</b></label>
            <input
              @blur="$v.user.email.$touch()"
              v-model="user.email"
              type="text"
              placeholder="Enter Email"
              name="email" id="email" required>

            <label for="psw"><b>Password</b></label>
            <input
              @blur="$v.user.password.$touch()"
              v-model="user.password"
              type="password"
              placeholder="Enter Password"
              name="psw" id="psw" required>

            <label for="psw-repeat"><b>Repeat Password</b></label>
            <input
              @blur="$v.user.passwordConfirm.$touch()"
              v-model="user.passwordConfirm"
              type="password"
              placeholder="Repeat Password"
              name="psw-repeat"
              id="psw-repeat" required>
            <small v-if="$v.user.email.$error" class="text-danger">Please enter a valid e-mail!</small><br>
            <small v-if="$v.user.passwordConfirm.$error" class="text-danger">Passwords do not match!</small><br>
            <small v-if="$v.user.password.$error" class="text-danger">Password is too short (minimum is 8 characters),
              needs at least 1 number, and is in a list of passwords commonly used on other websites.</small>
            <hr>

            <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
            <button type="submit" class="register-btn" :title="$v.$invalid? 'Someting went wrong': null"
                    :disabled="$v.$invalid">Register
            </button>
          </div>

          <div class="container sign-in">
            <p>Already have an account?
              <router-link to="/login">Sign in</router-link>

            </p>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script>

import {required, email, sameAs, minLength} from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      user: {
        email: null,
        password: null,
        passwordConfirm: null
      },
      isUser: false
    }
  },
  validations: {
    user: {
      email: {
        email,
        required
      },
      password: {
        required,
        minLength: minLength(8),

      },
      passwordConfirm: {
        sameAs: sameAs('password'),
        required

      }
    }
  },
  methods: {
    onSubmit() {
      if (this.user.password !== this.user.passwordConfirm) {
        alert('Something is wrong');
      } else {
        this.$store.dispatch("register", {...this.user, isUser: this.isUser})
          .then(response => {
            this.$router.push("/");
          }).catch(er => {
          alert('Email ' + this.user.email + ' is not available.');
        })
      }

    }
  }
}
</script>

<style scoped>


* {
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

.register-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.register-btn:disabled {
  background-color: #20232a;
  color: whitesmoke;
  cursor: auto;
}


.register-page .header {
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 900;
  color: #313131;
}

.register-page .header h2 {
  font-size: 48px;
  font-weight: 900;
  color: #313131;
}

.register-page .register-form {
  height: 70vh;
}

.container {
  padding: 16px;
  background-color: white;
}


input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;


}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

.register-btn {
  background-color: #FFCE00;
  color: #313131;
  padding: 16px 20px;
  margin: 8px 0;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
  border: 1px solid #313131;
  border-radius: 3px;
}

.register-btn:hover:not([disabled]) {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.sign-in {
  background-color: #f1f1f1;
  text-align: center;
}


</style>
