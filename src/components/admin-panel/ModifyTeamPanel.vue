<template>
    <h1>Manage Teams Panel</h1>
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
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                <tr class="clickable-row" v-for="team in teams" :key="team.id" @click="clickRow(team)">
                    <td>{{team.name}}</td>
                    <td>{{team.points}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="team_clicked" class="container">
        <form @submit.prevent="onSubmit" class="add-team-form">
            <div class="form-field">
                <label for="name">Name:</label>
                <input placeholder="Name" v-model="name" type="text" id="name">
            </div>
            <div class="form-field">
                <label for="points">Points:</label>
                <input placeholder="0" v-model="points" type="text" id="pointse">
            </div>
            <div class="form-field">
                <input type="submit" class="btn" value="Update">
            </div>
        </form>
        <div>
            <button style="background: firebrick" class="btn" @click="deleteTeam"> Delete </button>
        </div>
    </div>
</template>
<script>
import TeamService from "@/services/team.service"
import SeasonService from "@/services/season.service"

export default {
    data() {
        return {
            content: "",
            currentSeasonYear: 1900,
            seasonId: -1,
            seasons: [],
            teams: [],
            id: -1,
            name: '',
            points: 0,
            team_clicked: false
        }
    },
    mounted() {
        SeasonService.getAllSeasons().then(
            (response) => {
                console.log(response.data);

                this.seasons = response.data;
                this.currentSeasonYear = Math.max(...this.seasons.map(s => s.year));
                this.seasonId = this.seasons.find(s => s.year == this.currentSeasonYear);

                this.onSeasonChange();
            },
            (error) => {
                this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            }
        );
    },
    methods: {
        clickRow(team){
            this.team_clicked = true;
            this.id = team.id,
            this.name = team.name;
            this.points = team.points;

            console.log(team.id);
            

            // this.team_clicked = false;
        },
        onSubmit() {
            TeamService.updateTeam({
                    name: this.name,
                    points: this.points
                },
                this.id
            ).then(
                (response) => {
                    let teamObjectIdx = this.teams.findIndex(t => t.id == this.id);
                    this.teams[teamObjectIdx].name = this.name;
                    this.teams[teamObjectIdx].points = this.points;
                    // this.teams = response.data;
                    console.log(response.data);
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                }
            )
        },
        onSeasonChange() {
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
        deleteTeam() {
            TeamService.deleteTeam(this.id)
            .then(
                (response) => {
                    let teamObjectIdx = this.teams.findIndex(u => u.id == this.id);
                    this.teams.splice(teamObjectIdx, 1);
                    // this.teams = response.data;
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