<template>
  <div class="container" >
    <h2 v-if="loggedIn">Hello {{user.username}}</h2>
  </div>
</template>

<script>
  export default {
    name: 'HomeView',
    computed: {
      user() {
        return this.$store.state.auth.user;
      },
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      }
    },
    mounted() {
      if(!this.user) {
        this.$router.push("/login");
      }
    }
  }
</script>
