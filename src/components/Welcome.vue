<template>
  <div class="welcome container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text">Welcome</h2>
        <h5>{{ user ? user.alias : "" }}</h5>
        <button class="btn teal" v-if="current" @click="enterChat">
          Enter Chat!
        </button>
        <button class="btn teal" v-if="!current" @click="signIn">
          Sign In Now
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../firebase/init.js";

export default {
  name: "Welcome",
  data: () => ({
    user: null,
    current: null
  }),
  methods: {
    enterChat() {
      this.$router.push({ name: "Chat", params: { name: this.user.alias } });
    },
    signIn() {
      this.$router.push({ name: "Login" });
    }
  },
  created() {
    const current = firebase.auth().currentUser;
    this.current = current;
    if (current) {
      let ref = db.collection("users").where("user_id", "==", current.uid);
      ref.get().then(d => {
        this.user = d.docs[0].data();
      });
    }
  }
};
</script>

<style scoped>
.welcome {
  max-width: 400px;
  margin-top: 100px;
}
h2 {
  font-size: 3em;
}
.btn {
  margin: 30px auto;
}
</style>
