<template>
    <h1>Manage Drivers Panel</h1>
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
                    <th>Team</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                <tr class="clickable-row" v-for="driver in drivers" :key="driver.id" @click="clickRow(driver)">
                    <td>{{driver.fname}} {{driver.lname}}</td>
                    <td>{{driver.team.name}}</td>
                    <td>{{driver.points}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div>
        <button v-if="!add_clicked" style="background: firebrick" class="btn" @click="toggleAdd"> Add </button>
    </div>
    <div v-if="driver_clicked" class="container">
        <form @submit.prevent="onSubmitUpdate" class="add-driver-form">
            <div class="form-field">
                <label for="fname">First Name:</label>
                <input placeholder="Name" v-model="fname" type="text" id="fname">
            </div>
            <div class="form-field">
                <label for="lname">Last Name:</label>
                <input placeholder="Name" v-model="lname" type="text" id="lname">
            </div>
            <!-- <div class="form-field">
                <label for="team-select">Team:</label>
                <select name="team-select" id="team-select" v-model="teamId">
                    <option v-for="team in teams" :value="team.id" :key="team.id">
                        {{ team.name }}
                    </option>
                </select>
            </div> -->
            <div class="form-field">
                <label for="points">Points:</label>
                <input placeholder="0" v-model="points" type="text" id="pointse">
            </div>
            <div class="form-field">
                <input type="submit" class="btn" value="Update">
            </div>
        </form>
        <div>
            <button style="background: firebrick" class="btn" @click="deleteDriver"> Delete </button>
        </div>
    </div>
    <div v-if="add_clicked" class="container">
        <form @submit.prevent="onSubmitAdd" class="add-driver-form">
            <div class="form-field">
                <label for="fname">First Name:</label>
                <input placeholder="Name" v-model="fname" type="text" id="fname">
            </div>
            <div class="form-field">
                <label for="lname">Last Name:</label>
                <input placeholder="Name" v-model="lname" type="text" id="lname">
            </div>
            <div class="form-field">
                <label for="team-select">Team:</label>
                <select name="team-select" id="team-select" v-model="teamId">
                    <option v-for="team in teams" :value="team.id" :key="team.id">
                        {{ team.name }}
                    </option>
                </select>
            </div>
            <div class="form-field">
                <label for="points">Points:</label>
                <input placeholder="0" v-model="points" type="text" id="pointse">
            </div>
            <div class="form-field">
                <input type="submit" class="btn" value="Add">
            </div>
        </form>
    </div>
</template>
<script>
import DriverService from "@/services/driver.service"
import TeamService from "@/services/team.service"
import SeasonService from "@/services/season.service"

export default {
    data() {
        return {
            content: "",
            currentSeasonYear: 1900,
            seasonId: -1,
            teamId: -1,
            seasons: [],
            teams: [],
            drivers: [],
            id: -1,
            fname: '',
            lname: '',
            points: 0,
            driver_clicked: false,
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
            this.driver_clicked = false;
        },
        clickRow(driver){
            this.driver_clicked = true;
            this.add_clicked = false;

            this.id = driver.id,
            this.fname = driver.fname;
            this.lname = driver.lname;
            this.teamId = driver.team.id;
            this.points = driver.points;

            console.log(driver.id);
        },
        onSubmitAdd() {
            DriverService.addDriver({
                    fname: this.fname,
                    lname: this.lname,
                    points: this.points
                },
                this.teamId,
                this.seasonId
            ).then(
                (response) => {
                    var newDriver = {
                        fname: response.data.fname,
                        lname: response.data.lname,
                        team: response.data.team,
                        points: response.data.points
                    }

                    this.drivers.push(newDriver);
                    // this.drivers = response.data;
                    console.log(response.data);

                    this.add_clicked = !this.add_clicked;
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                }
            )
        },
        onSubmitUpdate() {
            DriverService.updateDriver({
                    fname: this.fname,
                    lname: this.lname,
                    points: this.points
                },
                this.id
            ).then(
                (response) => {
                    let driverObjectIdx = this.drivers.findIndex(d => d.id == this.id);
                    this.drivers[driverObjectIdx].fname = this.fname;
                    this.drivers[driverObjectIdx].lname = this.lname;
                    this.drivers[driverObjectIdx].points = this.points;
                    // this.drivers = response.data;
                    console.log(response.data);

                    this.driver_clicked = !this.driver_clicked;
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                }
            )
        },
        onSeasonChange() {
            DriverService.getDriversFromSeason(this.seasonId).then(
                (response) => {
                    this.drivers = response.data;
                    console.log(this.drivers);
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                }
            );

            TeamService.getTeamsFromSeason(this.seasonId).then(
                (response) => {
                    this.teams = response.data;
                    console.log(this.teams);
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                }
            );
        },
        deleteDriver() {
            DriverService.deleteDriver(this.id)
            .then(
                (response) => {
                    let driverObjectIdx = this.drivers.findIndex(d => d.id == this.id);
                    this.drivers.splice(driverObjectIdx, 1);
                    // this.drivers = response.data;
                    console.log(response.data);
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