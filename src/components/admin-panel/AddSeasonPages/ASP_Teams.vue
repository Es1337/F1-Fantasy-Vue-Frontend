<template>
    <!-- <h1>ASP Teams</h1> -->
    <div class="container">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                <tr class="clickable-row" v-for="team in teams" :key="team.id">
                    <td>{{team.name}}</td>
                    <td>{{team.points}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="team_clicked" class="container">
        <form @submit.prevent="onSubmit" class="add-teams-form">
            <label for="name">Team Name:</label>
            <input placeholder="Team Name" v-model="name" type="text" id="name">
            <label for="points">Points:</label>
            <input placeholder="0" v-model="points" type="text" id="points">
            <input type="submit" class="btn" value="Add Team">
        </form>
    </div>
    <div>
        <button style="background: firebrick" class="btn" @click="goNext">Go To Drivers</button>
    </div>
</template>
<script>
import TeamService from "@/services/team.service"
export default {
    data() {
        return {
            seasonId: -1,
            teams: [],
            name: "",
            points: -1,
            team_clicked: true
        }
    },
    mounted() {
        this.seasonId = this.$route.params.seasonId;
        console.log(this.seasonId);
    },
    methods: {
        onSubmit() {
            TeamService.addTeam({
                    name: this.name,
                    points: this.points
                },
                this.seasonId
            ).then(
                (response) => {
                    console.log(response.data);
                    var newTeam = {
                        name: response.data.name,
                        points: response.data.points
                    };

                    this.teams.push(newTeam);
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
                name: "add-drivers",
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