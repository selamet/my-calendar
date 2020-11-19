<template>
  <div>

    <div class="register-page">
      <div class="header">
        <h2>Login</h2>
      </div>
      <div class="register-form">
        <form @submit.prevent="onSubmit">
          <div class="container">


            <label for="email"><b>Email</b></label>
            <input v-model="user.email" type="text" placeholder="Enter Email" name="email" id="email" required>

            <label for="psw"><b>Password</b></label>
            <input v-model="user.password" type="password" placeholder="Enter Password" name="psw" id="psw" required>


            <hr>
            <p><a class="forgot-password" href="#">Forgot Password?</a></p>

            <button type="submit" class="register-btn">Sign in</button>
          </div>

          <div class="container sign-in">
            <p>If you don't have an account,
              <router-link to="/register">Create One</router-link>
              .
            </p>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          email: null,
          password: null,
        },
        isUser: true
      }
    },
    methods: {
      onSubmit() {
        this.$store.dispatch("login", {...this.user, isUser: this.isUser})
          .then(response => {
            this.$router.push("/");
          }).catch(er=>{
            alert('Something is wrong');
        })
      }
    }
  }
</script>

<style scoped>


  * {
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;

  }

  h2 {
    margin-bottom: 100px;
    color: #313131;
    font-size: 48px;
    font-weight: 900;
  }


  .forgot-password {
    color: #313131;
    text-decoration: underline;
  }

  .register-page {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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

  .register-btn:hover {
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
