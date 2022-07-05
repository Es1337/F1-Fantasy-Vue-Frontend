<template>
    <h1>Manage Races Panel</h1>
    <div>
        <select name="season-select" id="season-select" v-model="seasonId" @change="onSeasonChange()">
            <option v-for="season in seasons" :value="season.id" :key="season.id" :selected="season.year == currentSeasonYear">
                {{ season.year }}
            </option>
        </select>
    </div>
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
                <tr class="clickable-row" v-for="race in races" :key="race.id" @click="clickRow(race)">
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
    <div>
        <button v-if="!add_clicked" style="background: firebrick" class="btn" @click="toggleAdd"> Add </button>
    </div>
    <div v-if="race_clicked" class="container">
        <form @submit.prevent="onSubmitUpdate" class="add-race-form">
            <div class="form-field">
                <label for="name">Name:</label>
                <input placeholder="GP Name" v-model="name" type="text" id="name">
            </div>
            <div class="form-field">
                <label for="country">Country:</label>
                <input placeholder="Country" v-model="country" type="text" id="country">
            </div>
            <div class="form-field">
                <label for="city">City:</label>
                <input placeholder="City" v-model="city" type="text" id="city">
            </div>
            <div class="form-field">
                <label for="track">Track:</label>
                <input placeholder="Track" v-model="track" type="text" id="track">
            </div>
            <div class="form-field">
                <label for="fp1">FP1 Date &amp; Time:</label>
                <input placeholder="yyyy-MM-dd HH:mm:ss" v-model="fp1" type="text" id="fp1">
            </div>
            <div class="form-field">
                <label for="fp2">FP2 Date &amp; Time:</label>
                <input placeholder="yyyy-MM-dd HH:mm:ss" v-model="fp2" type="text" id="fp2">
            </div>
            <div class="form-field">
                <label for="fp3">FP3 Date &amp; Time:</label>
                <input placeholder="yyyy-MM-dd HH:mm:ss" v-model="fp3" type="text" id="fp3">
            </div>
            <div class="form-field">
                <label for="quali">Quali Date &amp; Time:</label>
                <input placeholder="yyyy-MM-dd HH:mm:ss" v-model="quali" type="text" id="quali">
            </div>
            <div class="form-field">
                <label for="sprint">Sprint Date &amp; Time:</label>
                <input placeholder="yyyy-MM-dd HH:mm:ss" v-model="sprint" type="text" id="sprint">
            </div>
            <div class="form-field">
                <label for="race">Race Date &amp; Time:</label>
                <input placeholder="yyyy-MM-dd HH:mm:ss" v-model="race" type="text" id="race">
            </div>
            <div class="form-field">
                <input type="submit" class="btn" value="Update">
            </div>
        </form>
        <div>
            <button style="background: firebrick" class="btn" @click="deleteRace"> Delete </button>
        </div>
    </div>
    <div v-if="add_clicked" class="container">
        <form @submit.prevent="onSubmitAdd" class="add-race-form">
            <div class="form-field">
                <label for="name">Name:</label>
                <input placeholder="GP Name" v-model="name" type="text" id="name">
            </div>
            <div class="form-field">
                <label for="country">Country:</label>
                <input placeholder="Country" v-model="country" type="text" id="country">
            </div>
            <div class="form-field">
                <label for="city">City:</label>
                <input placeholder="City" v-model="city" type="text" id="city">
            </div>
            <div class="form-field">
                <label for="track">Track:</label>
                <input placeholder="Track" v-model="track" type="text" id="track">
            </div>
            <div class="form-field">
                <label for="fp1">FP1 Date &amp; Time:</label>
                <input placeholder="yyyy-MM-dd HH:mm:ss" v-model="fp1" type="text" id="fp1">
            </div>
            <div class="form-field">
                <label for="fp2">FP2 Date &amp; Time:</label>
                <input placeholder="yyyy-MM-dd HH:mm:ss" v-model="fp2" type="text" id="fp2">
            </div>
            <div class="form-field">
                <label for="fp3">FP3 Date &amp; Time:</label>
                <input placeholder="yyyy-MM-dd HH:mm:ss" v-model="fp3" type="text" id="fp3">
            </div>
            <div class="form-field">
                <label for="quali">Quali Date &amp; Time:</label>
                <input placeholder="yyyy-MM-dd HH:mm:ss" v-model="quali" type="text" id="quali">
            </div>
            <div class="form-field">
                <label for="sprint">Sprint Date &amp; Time:</label>
                <input placeholder="yyyy-MM-dd HH:mm:ss" v-model="sprint" type="text" id="sprint">
            </div>
            <div class="form-field">
                <label for="race">Race Date &amp; Time:</label>
                <input placeholder="yyyy-MM-dd HH:mm:ss" v-model="race" type="text" id="race">
            </div>
            <div class="form-field">
                <input type="submit" class="btn" value="Add">
            </div>
        </form>
    </div>
</template>
<script>
import RaceService from "@/services/race.service"
import SeasonService from "@/services/season.service"

export default {
    data() {
        return {
            content: "",
            currentSeasonYear: 1900,
            seasonId: -1,
            seasons: [],
            races: [],
            id: -1,
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
            race_clicked: false,
            add_clicked: false
        }
    },
    mounted() {
        SeasonService.getAllSeasons().then(
            (response) => {
                console.log(response.data);

                this.seasons = response.data;
                this.currentSeasonYear = Math.max(...this.seasons.map(s => s.year));
                this.seasonId = this.seasons.find(s => s.year == this.currentSeasonYear).id;

                this.onSeasonChange();
            },
            (error) => {
                this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            }
        );
    },
    methods: {
        toggleAdd() {
            this.add_clicked = !this.add_clicked;
            this.race_clicked = false;
        },
        clickRow(race){
            this.race_clicked = true;
            this.add_clicked = false;
            this.id = race.id;
            this.name = race.name;
            this.country = race.country;
            this.city = race.city;
            this.track = race.track;
            this.fp1 = race.fp1;
            this.fp2 = race.fp2;
            this.fp3 = race.fp3;
            this.quali = race.quali;
            this.sprint = race.sprint;
            this.race = race.race ;

            console.log(race.id);
            

            // this.race_clicked = false;
        },
        onSubmitAdd() {
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
                    race: this.race,
                },
                this.seasonId
            ).then(
                (response) => {
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
                        race: response.data.race,
                    }

                    this.races.push(newRace);
                    // this.races = response.data;
                    console.log(response.data);

                    this.add_clicked = !this.add_clicked;
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                }
            )
        },
        onSubmitUpdate() {
            RaceService.updateRace({
                    name: this.name,
                    country: this.country,
                    city: this.city,
                    track: this.track,
                    fp1: this.fp1,
                    fp2: this.fp2,
                    fp3: this.fp3,
                    quali: this.quali,
                    sprint: this.sprint,
                    race: this.race,
                },
                this.id
            ).then(
                (response) => {
                    let raceObjectIdx = this.races.findIndex(r => r.id == this.id);
                    this.races[raceObjectIdx].name = this.name;
                    this.races[raceObjectIdx].country = this.country;
                    this.races[raceObjectIdx].city = this.city;
                    this.races[raceObjectIdx].track = this.track;
                    this.races[raceObjectIdx].fp1 = this.fp1;
                    this.races[raceObjectIdx].fp2 = this.fp2;
                    this.races[raceObjectIdx].fp3 = this.fp3;
                    this.races[raceObjectIdx].quali = this.quali;
                    this.races[raceObjectIdx].sprint = this.sprint;
                    this.races[raceObjectIdx].race = this.race;

                    // this.races = response.data;
                    console.log(response.data);

                    this.race_clicked = !this.race_clicked;
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                }
            )
        },
        onSeasonChange() {
            RaceService.getRacesFromSeason(this.seasonId).then(
                (response) => {
                    this.races = response.data;
                    console.log(this.races);
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                }
            );
        },
        deleteRace() {
            RaceService.deleteRace(this.id)
            .then(
                (response) => {
                    let raceObjectIdx = this.races.findIndex(r => r.id == this.id);
                    this.races.splice(raceObjectIdx, 1);
                    // this.races = response.data;
                    console.log(response.data);

                    this.race_clicked = !this.race_clicked;
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
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
        background-color: firebrick;
        color: beige;
        font-weight: 500;
        font-size: 14px;
        height: 3rem;
        width: 8rem;
        margin: auto;
        margin-left: 0;
        margin-top: 1rem;
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