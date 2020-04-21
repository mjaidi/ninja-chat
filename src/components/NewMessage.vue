<template>
  <div class="new-message">
    <form @submit.prevent="addMessage">
      <label for="new-message">New Message (enter to add):</label>
      <input type="text" name="new-message" v-model="message" />
    </form>
  </div>
</template>


<script>
import db from "../firebase/init";
export default {
  name: "NewMessage",
  props: ["name"],
  data: () => ({
    message: null
  }),
  methods: {
    addMessage() {
      if (this.message) {
        db.collection("messages")
          .add({
            name: this.name,
            content: this.message,
            timestamp: Date.now()
          })
          .then((this.message = null))
          .catch(err => console.log(err));
      }
    }
  }
};
</script>