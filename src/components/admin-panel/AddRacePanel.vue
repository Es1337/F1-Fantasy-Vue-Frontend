<template>
    <h1>Add Race Result Panel</h1>
    <div class="container">
        <table>
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Driver</th>
                    <th>DNF</th>
                    <th>Fastest Lap</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                <tr class="clickable-row" v-for="result in results" :key="result.position">
                    <td>{{ result.position }}</td>
                    <td>{{ result.driver.fname + ' ' + result.driver.lname }}</td>
                    <td>{{ result.dnf }}</td>
                    <td>{{ result.fastestLap }}</td>
                    <td>{{ result.points }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="result_clicked" class="container">
        <form @submit.prevent="onSubmit" class="add-results-form">
            <label for="position">Position:</label>
            <input placeholder="0" v-model="position" type="text" id="position">
            <label for="season-select">Season:</label>
            <select name="season-select" id="season-select" v-model="seasonId" @change="onSeasonChange()">
                <option v-for="season in seasons" :value="season.id" :key="season.id" :selected="season.year == currentSeasonYear">
                    {{ season.year }}
                </option>
            </select>
            <label for="race-select">Race:</label>
            <select name="race-select" id="race-select" v-model="raceId" @change="onRaceChange()">
                <option v-for="race in races" :value="race.id" :key="race.id" :selected="race.id == raceId">
                    {{ race.name }}
                </option>
            </select>
            <label for="driver-select">Driver:</label>
            <select name="driver-select" id="driver-select" v-model="driverId">
                <option v-for="driver in drivers" :value="driver.id" :key="driver.id" :selected="driver.id == driverId">
                    {{ driver.fname + ' ' + driver.lname }}
                </option>
            </select>
            <label for="dnf">DNF:</label>
            <input v-model="dnf" type="checkbox" id="dnf">
            <label for="fastestLap">Fastest Lap:</label>
            <input placeholder="0" v-model="fastestLap" type="text" id="fastestLap">
            <label for="points">Points:</label>
            <input placeholder="0" v-model="points" type="text" id="points">
            <input type="submit" class="btn" value="Add Result">
        </form>
    </div>
</template>
<script>
import RaceResultService from "@/services/race-result.service"
import DriverService from "@/services/driver.service"
import SeasonService from "@/services/season.service"
import RaceService from "@/services/race.service"

export default {
    data() {
        return {
            currentSeasonYear: 1900,
            position: 0,
            seasonId: -1,
            raceId: -1,
            driverId: -1,
            seasons: [],
            races: [],
            drivers: [],
            results: [],
            fastestLap: 0,
            dnf: false,
            points: -1,
            result_clicked: true,
            content: ""
        }
    },
    mounted() {
        SeasonService.getAllSeasons().then(
            (response) => {
                console.log(response.data);

                this.seasons = response.data;
                this.currentSeasonYear = Math.max(...this.seasons.map(s => s.year));
                this.seasonId = this.seasons.find(s => s.year == this.currentSeasonYear);

                RaceService.getRacesFromSeason(this.seasonId).then(
                    (response) => {
                        console.log(response.data);
        
                        this.races = response.data;
                        this.raceId = this.races[0].id;
                    },
                    (error) => {
                        this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                        console.error(this.content);
                    }
                );

                DriverService.getDriversFromSeason(this.seasonId).then(
                    (response) => {
                        console.log(response.data);
        
                        this.drivers = response.data;
                        this.driverId = this.drivers[0].id;
                    },
                    (error) => {
                        this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                        console.error(this.content);
                    }
                );
            },
            (error) => {
                this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                console.error(this.content);
            }
        );


    },
    methods: {
        onSubmit() {
            RaceResultService.addRaceResult({
                    position: this.position,
                    dnf: this.dnf,
                    fastestLap: this.fastestLap,
                    points: this.points,
                },
                this.driverId,
                this.raceId
            ).then(
                (response) => {
                    console.log(response.data);
                    var newResult = {
                        position: response.data.position,
                        dnf: response.data.dnf,
                        fastestLap: response.data.fastestLap,
                        driver: response.data.driver,
                        points: response.data.points,
                    };

                    this.results.push(newResult);
                    // this.$router.push("/admin/add-season/drivers");
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                    console.error(this.content);
                }
            )
        },
        onSeasonChange() {
            RaceService.getRacesFromSeason(this.seasonId).then(
                (response) => {
                    console.log(response.data);

                    this.races = response.data;
                    this.raceId = this.races[0].id;

                    this.onRaceChange();
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                    console.error(this.content);
                }
            );

            DriverService.getDriversFromSeason(this.seasonId).then(
                (response) => {
                    console.log(response.data);

                    this.drivers = response.data;
                    this.driverId = this.drivers[0].id;
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                    console.error(this.content);
                }
            );
        },
        onRaceChange() {
            RaceResultService.getRaceResultsFromRace(this.raceId).then(
                (response) => {
                    console.log(response.data);

                    this.results = response.data;
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