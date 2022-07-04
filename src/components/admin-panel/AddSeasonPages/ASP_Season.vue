<template>
    <!-- <h1>ASP Season</h1> -->
    <form @submit.prevent="onSubmit" class="add-season-form">
        <label for="year">Year:</label>
        <input placeholder="YYYY" v-model="year" type="text" id="year">
        <label for="wdc">WDC:</label>
        <input placeholder="Name Surname" v-model="wdc" type="text" id="wdc">
        <label for="wcc">WCC:</label>
        <input placeholder="Name Surname" v-model="wcc" type="text" id="wcc">
        <input type="submit" class="btn" value="Add Season">
    </form>
</template>
<script>
import SeasonService from "@/services/season.service"

export default {
    name: "AddSeason",
    data() {
        return {
            year: '',
            wdc: '',
            wcc: '',
            content: ""
        }
    },
    methods:{
        onSubmit() {
            SeasonService.addSeason({
                year: this.year,
                wdc: this.wdc,
                wcc: this.wcc
            }).then(
                (response) => {
                    console.log(response.data);
                    this.$router.push({
                        name: "add-teams",
                        params: { seasonId: response.data.id }
                    });
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                    console.error(this.content);
                }
            )
        }
    }
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