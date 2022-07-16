<template>
    <div class="form-field">
        <button style="background: firebrick" class="btn" @click="navigateToAdd" role="link"> Add </button>
    </div>
    <div class="form-field">
        <label for="season-select">Year:</label>
        <select name="season-select" id="season-select" v-model="seasonId" @change="onSeasonChange()">
            <option v-for="season in seasons" :value="season.id" :key="season.id" :selected="season.year == currentSeasonYear">
                {{ season.year }}
            </option>
        </select>
    </div>
    <div class="form-field">
        <label for="race-select">Race:</label>
        <select name="race-select" id="race-select" v-model="raceId" @change="onRaceChange()">
            <option value=-1 selected> All </option>
            <option v-for="race in races" :value="race.id" :key="race.id">
                {{ race.name }}
            </option>
        </select>
    </div>
    <div class="container">
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Code</th>
                    <th>Race</th>
                </tr>
            </thead>
            <tbody>
                <tr class="clickable-row" v-for="pred in predictions" :key="pred.id">
                    <td>{{ pred.title }}</td>
                    <td>{{ pred.availablePrediction.typeCode }}</td>
                    <td>{{ pred.race.name }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import SeasonService from "@/services/season.service"
import RaceService from "@/services/race.service"
import PredictionService from "@/services/prediction.service"
import UserService from "@/services/user.service"

export default {
    name: 'PredictionsView',
    components: {
    },
    data () {
    return {
        predictions: [],
        seasons: [],
        races: [],
        seasonId: -1,
        raceId: -1,
        userId: -1,
        currentSeasonYear: 1900,
        content: ""
    }
    },
    methods: {
        navigateToAdd() {
            this.$router.push({
                name: 'add-prediction',
                params: {
                    seasonId: this.seasonId
                }
            })
        },

        onLoadRaces() {
            console.log(this.$store.state.auth.user.username);
            UserService.getUserByEmail(this.$store.state.auth.user.username).then(
                (response) => {
                    this.userId = response.data[0].id;
                    console.log(this.races);
                    
                    PredictionService.getPredictionsFromUserFromSeason(this.userId, this.seasonId).then(
                        (response) => {
                            console.log(response.data);
                            this.predictions = response.data;
                        },
                        (error) => {
                            this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                        }
                    );
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                }
            );
        },

        onRaceChange() {
            PredictionService.getPredictionsFromUserFromSeason(this.userId, this.seasonId).then(
                (response) => {
                    console.log(response.data);
                    this.predictions = response.data;
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                }
            ).then(
                (response) => {
                    if(this.raceId !== '-1') {
                        response;
                        console.log(this.raceId);
                        
                        const filtered = this.predictions.filter(pred => {
                            console.log(pred.race.id);
                            return pred.race.id === this.raceId;
                        });

                        this.predictions = filtered;
                    }
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                }
            );
        },

        onSeasonChange() {
            RaceService.getRacesFromSeason(this.seasonId).then(
            (response) => {
                this.races = response.data;

                this.onLoadRaces();
            },
            (error) => {
                this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            }
            );
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
        )
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