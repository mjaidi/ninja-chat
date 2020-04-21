<template>
  <div class="signup container">
    <form class="card-panel" @submit.prevent="signup">
      <h2 class="center teal-text">Sign Up</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <div class="field">
        <label for="alias">Alias:</label>
        <input type="text" name="alias" v-model="alias" />
      </div>
      <p class="red-text" v-if="feedback">{{ this.feedback }}</p>
      <div class="field center">
        <button class="btn teal">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../../firebase/init";
import firebase from "firebase";
import slugify from "slugify";
import functions from "firebase/functions";

export default {
  name: "Signup",
  data: () => ({
    email: null,
    password: null,
    alias: null,
    feedback: null,
    slug: null
  }),
  methods: {
    signup() {
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        let checkAlias = firebase.functions().httpsCallable("checkAlias");
        checkAlias({ slug: this.slug }).then(res => {
          if (!res.data.unique) {
            this.feedback = "this alias already exists";
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                ref
                  .set({
                    alias: this.alias,
                    user_id: cred.user.uid
                  })
                  .then(this.$router.push({ name: "Welcome" }));
              })
              .catch(err => {
                this.feedback = err.message;
                console.log(err);
              });
          }
        });
      } else {
        this.feedback = "Please enter an email, password and alias";
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
