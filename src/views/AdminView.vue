<template>
<h1>Admin</h1>
<div class="container">
  <div class="column">
      <!-- <h1>Admin</h1> -->
      <NavButton value="Add New Season" color="firebrick" url="/admin/add-season"/><br>
      <NavButton value="Add New Race Result" color="firebrick" url="/admin/add-result"/><br>
      <NavButton value="Manage Users" color="firebrick" url="/admin/manage-users"/><br>
      <!-- <NavButton value="Delete User" color="firebrick" url="/admin/delete-user"/><br> -->
      <NavButton value="Modify Team" color="firebrick" url="/admin/modify-team"/><br>
      <NavButton value="Modify Driver" color="firebrick" url="/admin/modify-driver"/><br>
      <NavButton value="Modify Race" color="firebrick" url="/admin/modify-race"/>
  </div>
  <div class="column">
      <router-view/>
  </div>
</div>
</template>

<script>
import NavButton from '../components/NavButton.vue'
  export default {
    name: 'AdminView',
    components:{
        NavButton
    },
    data () {
      return {
      }
    },
    methods: {
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .column {
    float: left;
    width: 50%;
  }
</style>