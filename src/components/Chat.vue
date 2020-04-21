<template>
  <div class="chat container">
    <h2 class="center teal-text">Ninja chat</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li v-for="message in messages" :key="message.id">
            <span class="grey-text time"
              >{{ new Date(message.timestamp).toLocaleString() }} -</span
            >
            <span class="teal-text">{{ message.name }}</span>
            <span class="grey-text text-darken-3 message">{{
              message.content
            }}</span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage :name="name" />
      </div>
    </div>
  </div>
</template>

<script>
import NewMessage from "./NewMessage";
import db from "../firebase/init";

export default {
  name: "Chat",
  props: ["name"],
  components: {
    NewMessage
  },
  data: () => ({
    messages: []
  }),
  created() {
    let ref = db.collection("messages").orderBy("timestamp");
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          let doc = change.doc;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            timestamp: doc.data().timestamp
          });
        }
      });
    });
  }
};
</script>

<style scoped>
h2 {
  font-size: 2.6em;
  margin-bottom: 40px;
}
li span {
  font-size: 1.2em;
}
.time {
  font-size: 0.8em;
}
.messages {
  max-height: 60vh;
  overflow: scroll;
}
.message {
  font-size: 1.4em;
  display: block;
}
</style>
