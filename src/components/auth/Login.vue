<template>
  <div class="signup container">
    <form class="card-panel" @submit.prevent="login">
      <h2 class="center teal-text">Log In</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>

      <p class="red-text" v-if="feedback">{{ this.feedback }}</p>
      <div class="field center">
        <button class="btn teal">Log In</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../../firebase/init";
import firebase from "firebase";

export default {
  name: "Login",
  data: () => ({
    email: null,
    password: null,
    feedback: null
  }),
  methods: {
    login() {
      if (this.email && this.password) {
        this.feedback = null;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            this.$router.push({ name: "Chat" });
          })
          .catch(err => {
            this.feedback = err.message;
            console.log(err);
          });
      } else {
        this.feedback = "Please enter an email, and a password";
      }
    }
  }
};
</script>

<style scoped>
.signup {
  max-width: 400px;
  margin-top: 40px;
}
h2 {
  font-size: 3em;
}
.btn {
  margin: 30px auto;
}
.field {
  margin-bottom: 16px;
}
</style>
