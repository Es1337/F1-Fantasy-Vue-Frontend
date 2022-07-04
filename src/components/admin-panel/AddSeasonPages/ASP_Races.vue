<template>
    <!-- <h1>ASP Races</h1> -->
    <div class="container">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Track</th>
                    <th>FP1</th>
                    <th>FP2</th>
                    <th>FP3</th>
                    <th>Quali</th>
                    <th>Sprint</th>
                    <th>Race</th>
                </tr>
            </thead>
            <tbody>
                <tr class="clickable-row" v-for="race in races" :key="race.id">
                    <td>{{race.name}}</td>
                    <td>{{race.country}}</td>
                    <td>{{race.city}}</td>
                    <td>{{race.track}}</td>
                    <td>{{race.fp1}}</td>
                    <td>{{race.fp2}}</td>
                    <td>{{race.fp3}}</td>
                    <td>{{race.quali}}</td>
                    <td>{{race.sprint}}</td>
                    <td>{{race.race}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="race_clicked" class="container">
        <form @submit.prevent="onSubmit" class="add-races-form">
            <label for="name">Name:</label>
            <input placeholder="GP Name" v-model="name" type="text" id="name">
            <label for="country">Country:</label>
            <input placeholder="Country" v-model="country" type="text" id="country">
            <label for="city">City:</label>
            <input placeholder="City" v-model="city" type="text" id="city">
            <label for="track">Track:</label>
            <input placeholder="Track" v-model="track" type="text" id="track">
            <label for="fp1">FP1 Date &amp; Time:</label>
            <input placeholder="yyyy-MM-dd HH:mm:ss" v-model="fp1" type="text" id="fp1">
            <label for="fp2">FP2 Date &amp; Time:</label>
            <input placeholder="yyyy-MM-dd HH:mm:ss" v-model="fp2" type="text" id="fp2">
            <label for="fp3">FP3 Date &amp; Time:</label>
            <input placeholder="yyyy-MM-dd HH:mm:ss" v-model="fp3" type="text" id="fp3">
            <label for="quali">Quali Date &amp; Time:</label>
            <input placeholder="yyyy-MM-dd HH:mm:ss" v-model="quali" type="text" id="quali">
            <label for="sprint">Sprint Date &amp; Time:</label>
            <input placeholder="yyyy-MM-dd HH:mm:ss" v-model="sprint" type="text" id="sprint">
            <label for="race">Race Date &amp; Time:</label>
            <input placeholder="yyyy-MM-dd HH:mm:ss" v-model="race" type="text" id="race">
            <input type="submit" class="btn" value="Add Race">
        </form>
    </div>
    <div>
        <button style="background: firebrick" class="btn" @click="goNext">Finish</button>
    </div>
</template>
<script>
import RaceService from "@/services/race.service"

export default {
    data() {
        return {
            seasonId: -1,
            races: [],
            name: "",
            country: "",
            city: "",
            track: "",
            fp1: "",
            fp2: "",
            fp3: "",
            quali: "",
            sprint: "",
            race: "",
            race_clicked: true,
            content: ""
        }
    },
    mounted() {
        this.seasonId = this.$route.params.seasonId;
        console.log(this.seasonId);
    },
    methods: {
        onSubmit() {
            RaceService.addRace({
                    name: this.name,
                    country: this.country,
                    city: this.city,
                    track: this.track,
                    fp1: this.fp1,
                    fp2: this.fp2,
                    fp3: this.fp3,
                    quali: this.quali,
                    sprint: this.sprint,
                    race: this.race
                },
                this.seasonId
            ).then(
                (response) => {
                    console.log(response.data);
                    var newRace = {
                        name: response.data.name,
                        country: response.data.country,
                        city: response.data.city,
                        track: response.data.track,
                        fp1: response.data.fp1,
                        fp2: response.data.fp2,
                        fp3: response.data.fp3,
                        quali: response.data.quali,
                        sprint: response.data.sprint,
                        race: response.data.race
                    };

                    this.races.push(newRace);
                    // this.$router.push("/admin/add-season/races");
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                    console.error(this.content);
                }
            )
        },
        goNext() {
            this.$router.push("/");
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

    .clickable-row:hover {
        cursor: pointer
    }
    .clickable-row:nth-child(even) {
        background-color: rgb(196, 146, 146);
    }

    th {
        padding: 1em 2em;
    }

    td {
        text-align: left;
        padding: 1em 2em;
    }
</style>