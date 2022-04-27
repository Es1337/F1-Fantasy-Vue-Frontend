<template>
  <div class="container" v-show="this.$store.getters.getLoggedStatus" >
    <h2>Hello {{user}}</h2>
  </div>
</template>

<script>
  export default {
    name: 'HomeView',
    components: {
    },
    data () {
      return {
        user: 'Default'
      }
    },
    methods: {
    },
    mounted() {
      if(this.$store.getters.getLoggedStatus) {
        this.user = this.$store.getters.getUser;
      }
    }
  }
</script>
