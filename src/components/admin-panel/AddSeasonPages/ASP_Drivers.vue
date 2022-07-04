<template>
    <!-- <h1>ASP Drivers</h1> -->
    <div class="container">
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Team Name</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                <tr class="clickable-row" v-for="driver in drivers" :key="driver.id">
                    <td>{{driver.fname}}</td>
                    <td>{{driver.lname}}</td>
                    <td>{{driver.team.name}}</td>
                    <td>{{driver.points}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="driver_clicked" class="container">
        <form @submit.prevent="onSubmit" class="add-drivers-form">
            <label for="fname">First Name:</label>
            <input placeholder="First Name" v-model="fname" type="text" id="fname">
            <label for="lname">Last Name:</label>
            <input placeholder="Last Name" v-model="lname" type="text" id="lname">
            <label for="team-select">Team:</label>
            <!-- <input placeholder="Team" v-model="teamName" type="text" id="teamName"> -->
            <select name="team-select" id="team-select" v-model="teamId">
                <option v-for="team in teams" :value="team.id" :key="team.id">
                    {{ team.name }}
                </option>
            </select>
            <label for="points">Points:</label>
            <input placeholder="0" v-model="points" type="text" id="points">
            <input type="submit" class="btn" value="Add Driver">
        </form>
    </div>
    <div>
        <button style="background: firebrick" class="btn" @click="goNext">Go To Races</button>
    </div>
</template>
<script>
import DriverService from "@/services/driver.service"
import TeamService from "@/services/team.service"
export default {
    data() {
        return {
            seasonId: -1,
            teams: [],
            drivers: [],
            fname: "",
            lname: "",
            teamName: "",
            teamId: -1,
            points: -1,
            driver_clicked: true,
            content: ""
        }
    },
    mounted() {
        this.seasonId = this.$route.params.seasonId;
        console.log(this.seasonId);

        TeamService.getTeamsFromSeason(this.seasonId).then(
            (response) => {
                console.log(response.data);

                this.teams = response.data;
            },
            (error) => {
                this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                console.error(this.content);
            }
        )
    },
    methods: {
        onSubmit() {
            DriverService.addDriver({
                    fname: this.fname,
                    lname: this.lname,
                    points: this.points
                },
                this.teamId,
                this.seasonId
            ).then(
                (response) => {
                    console.log(response.data);
                    var newDriver = {
                        fname: response.data.fname,
                        lname: response.data.lname,
                        team: response.data.team,
                        points: response.data.points
                    };

                    this.drivers.push(newDriver);
                    // this.$router.push("/admin/add-season/drivers");
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                    console.error(this.content);
                }
            )
        },
        goNext() {
            this.$router.push({
                name: "add-races",
                params: { seasonId: this.seasonId }
            });
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