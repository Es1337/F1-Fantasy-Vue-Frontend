<template>
<div class="container" v-show="logged" >
    <PageHeader title="F1 Fantasy"/>
    <h2>Hello {{user}}</h2>
  </div>
    <h1>Schedule</h1>
</template>

<script>
  export default {
    name: 'ScheduleView',
    components: {
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