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
                </tr>
            </thead>
            <tbody>
                <tr class="clickable-row" v-for="race in races" :key="race.id" @click="clickRow(race)">
                    <td>{{race.name}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="race_clicked" class="container">
        <div>
            <button style="background: firebrick" class="btn" @click="resolvePredictionsForRace"> Resolve User Predictions </button>
        </div>
    </div>
</template>
<script>
import RaceService from "@/services/race.service"
import SeasonService from "@/services/season.service"
import RewardService from "@/services/reward.service"

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
            race_clicked: false
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
        clickRow(race){
            this.race_clicked = true;
            this.id = race.id;

            console.log(race.id);
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

        resolvePredictionsForRace() {
            RewardService.resolvePredictionsForRace(this.id)
            .then(
                (response) => {
                    console.log(response.data);
                    this.$router.push('/admin');
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