<template>
    <header>
      <div>
        <div>
          <h1>{{ title }}</h1>
        </div>
          <NavBar />
      </div>
    </header>
</template>

<script>
import NavBar from './NavBar.vue'
  export default {
    name: 'PageHeader',
    props: {
      title: {
        type: String,
        default: 'Page Title'
      }
    },
    components:{
        NavBar
    }
  }
</script>

<style scoped>
  header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
</style>