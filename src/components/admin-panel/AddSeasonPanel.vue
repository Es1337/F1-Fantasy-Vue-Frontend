<template>
    <h1>Add Season Panel</h1>
    
    <div class="column">
      <router-view/>
    </div>
</template>
<script>
export default {
    name: "AddSeasonPanel",
    
}
</script>
<style scoped>
label{
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
}

input{
    display: block;
    height: 30px;
    width: 80%;
    background-color: rgba(62, 62, 62, 0.216);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
}

.btn {
    background-color: rgba(190, 0, 0, 0.788);
    color: white;
    font-weight: 500;
    margin: auto;
    margin-left: 0;
    margin-top: 3rem;
}
</style>