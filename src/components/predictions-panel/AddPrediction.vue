<template>
    <div class="form-field">
        <router-link to="/predictions" custom v-slot="{ navigate }">
            <button style="background: firebrick" class="btn" @click="navigate" role="link"> View </button>
        </router-link>
    </div>
    <div class="container">
        <form @submit.prevent="onSubmit" class="add-season-form">
            <div>
                <div class="form-field">
                    <label class="radio-label" for="T">Team</label>
                    <input class="radio" type="radio" id="T" value="T" v-model="target" @click="onTargetChange"/>
                </div>
                <div class="form-field">
                    <label class="radio-label" for="D">Driver</label>
                    <input class="radio" type="radio" id="D" value="D" v-model="target" @click="onTargetChange"/>
                </div>
            </div>
            <div class="form-field">
                <select name="race-select" id="race-select" v-model="raceId">
                    <option value=-1 disabled>Pick Race</option>
                    <option v-for="race in races" :value="race.id" :key="race.id">
                        {{ race.name }}
                    </option>
                </select>
            </div>
            <div class="form-field">
                <select v-if="target === 'T'" name="team-select" id="team-select" v-model="title">
                    <option value="" disabled>Pick Title</option>
                    <option v-for="team in teams" :value="team.name" :key="team.id">
                        {{ team.name }}
                    </option>
                </select>
                <select v-if="target === 'D'" name="driver-select" id="driver-select" v-model="title">
                    <option value="" disabled>Pick Title</option>
                    <option v-for="driver in drivers" :value="driver.fname + ' ' + driver.lname" :key="driver.id">
                        {{ driver.fname }} {{ driver.lname }}
                    </option>
                </select>
            </div>
            <div class="form-field">
                <select v-if="target === 'T'" name="team-code-select" id="team-code-select" v-model="avPredId">
                    <option value=-1 disabled>Pick Code</option>
                    <option v-for="pred in availableTeamPredictions" :value="pred.id" :key="pred.id">
                        {{ pred.typeCode }}
                    </option>
                </select>
                <select v-if="target === 'D'" name="driver-code-select" id="driver-code-select" v-model="avPredId">
                    <option value=-1 disabled>Pick Code</option>
                    <option v-for="pred in availableDriverPredictions" :value="pred.id" :key="pred.id">
                        {{ pred.typeCode }}
                    </option>
                </select>
            </div>
            <div class="form-field">
                <input type="submit" class="btn" value="Add">
            </div>
        </form>
    </div>
</template>

<script>
import RaceService from "@/services/race.service"
import DriverService from "@/services/driver.service"
import TeamService from "@/services/team.service"
import PredictionService from "@/services/prediction.service"
import UserService from "@/services/user.service"

export default {
    data() {
        return {
            races: [],
            teams: [],
            drivers: [],
            availableTeamPredictions: [],
            availableDriverPredictions: [],
            seasonId: -1,
            raceId: -1,
            userId: -1,
            avPredId: -1,
            target: "T",
            teamName: "",
            driverName: "",
            title: "",
            code: "",
            content: ""
        }
    },
    mounted() {
        this.seasonId = this.$route.params.seasonId;
        UserService.getUserByEmail(this.$store.state.auth.user.username).then(
            (response) => {
                this.userId = response.data[0].id;
            },
            (error) => {
                this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            }
        )
        

        PredictionService.getAvailablePredictionsFromSeason(this.seasonId).then(
            (response) => {
                response.data.forEach(avPred => {
                    if(avPred.target === 'T') {
                        this.availableTeamPredictions.push(avPred);
                    }
                    else if(avPred.target === 'D') {
                        this.availableDriverPredictions.push(avPred);
                    }
                })
            },
            (error) => {
                this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            }
        )

        RaceService.getRacesFromSeason(this.seasonId).then(
            (response) => {
                this.races = response.data;

                this.onRaceChange();
            },
            (error) => {
                this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            }
        )
    },
    methods: {
        onTargetChange() {
            console.log("Changed target");
        },
        onRaceChange() {
            DriverService.getDriversFromSeason(this.seasonId).then(
                (response) => {
                    console.log(response.data);
                    this.drivers = response.data;
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                }
            );

            TeamService.getTeamsFromSeason(this.seasonId).then(
                (response) => {
                    this.teams = response.data;
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                }
            );
        },
        onSubmit() {
            PredictionService.addPrediction({
                    title: this.title
                },
                this.raceId,
                this.userId,
                this.avPredId
            ).then(
                (response) => {
                    console.log(response.data);
                    this.$router.push("/predictions");
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
    label {
        display: block;
        margin-top: 30px;
        font-size: 16px;
        font-weight: 500;
    }

    .radio-label {
        display: inline;
        margin-top: 10px;
        font-size: 16px;
        font-weight: 500;
    }

    input{
        /* display: block; */
        height: 30px;
        width: 50%;
        background-color: rgba(62, 62, 62, 0.216);
        border-radius: 3px;
        padding: 0 10px;
        margin-top: 8px;
        font-size: 14px;
        font-weight: 300;
    }

    .radio {
        height: 13px;
        width: 10%;
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

    .form-field {
        width: 50%;
    }
</style>