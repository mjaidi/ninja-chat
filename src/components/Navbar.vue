<template>
  <div class="navbar">
    <nav class="teal darken-2">
      <div class="container">
        <a href class="brand-logo left"
          ><router-link :to="{ name: 'Welcome' }">Chat</router-link>
        </a>
        <ul class="right">
          <li>
            <router-link :to="{ name: 'Signup' }">Sign Up</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Login' }">Sign In</router-link>
          </li>
          <li>
            <a href @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Navbar",
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    }
  }
};
</script>
