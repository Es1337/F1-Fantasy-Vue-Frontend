<template>
  <div class="container">
    <PageHeader v-show="logged" title="F1 Fantasy"/>
    <LoginPanel v-show="toggleLoginRegister && !logged"/>
    <RegisterPanel v-show="!toggleLoginRegister && !logged"/>
  </div>
</template>

<script>
import RegisterPanel from '../components/RegisterPanel.vue';
import LoginPanel from '../components/LoginPanel.vue';
import PageHeader from '../components/PageHeader.vue';
  export default {
    name: 'HomeView',
    components: {
      PageHeader,
      LoginPanel,
      RegisterPanel,
    },
    data () {
      return {
        logged: false,
        toggleLoginRegister: false,
      }
    }
  }
</script>
