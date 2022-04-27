<template>
  <div>
    <LoginPanel v-show="toggleLoginRegister && !logged"/>
    <RegisterPanel v-show="!toggleLoginRegister && !logged"/>
      <div class="container" v-show="logged" >
        <PageHeader title="F1 Fantasy"/>
        <router-view/>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import RegisterPanel from './components/RegisterPanel.vue';
import LoginPanel from './components/LoginPanel.vue';
import PageHeader from './components/PageHeader.vue';
export default {
  components: {
      PageHeader,
      LoginPanel,
      RegisterPanel,
  },
  data() {
    return {
        logged: true,
        toggleLoginRegister: false,
    }
  },
  methods: {
    ...mapActions(["setLoggedStatus", "setAdminPrivileges"])
  },
  computed: {
    ...mapGetters(['getLoggedStatus', "getAdminPrivileges"])
  },
  mounted() {
    this.logged = this.$store.getters.getLoggedStatus; 
}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Poppins', sans-serif;
}
.container {
  max-width: 900px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
