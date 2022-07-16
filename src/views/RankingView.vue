<template>
    <div class="container">
        <h1>Ranking</h1>
        <div class="form-field">
            <label for="season-select">Year:</label>
            <select name="season-select" id="season-select" v-model="seasonId" @change="onSeasonChange()">
                <option v-for="season in seasons" :value="season.id" :key="season.id" :selected="season.year == currentSeasonYear">
                    {{ season.year }}
                </option>
            </select>
        </div>
        <div class="container">
            <table>
                <tr>
                    <th>Position</th>
                    <th>Username</th>
                    <th>Points</th>
                </tr>
                <tr v-for="rank in rankings" :key="rank.user.id">
                    <td>{{rank.position}}</td>  
                    <td>{{rank.user.email}}</td>  
                    <td>{{rank.points}}</td>  
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import SeasonService from "@/services/season.service"
// import UserService from "@/services/user.service"
import RankingService from "@/services/ranking.service"

function compareRows( a, b ) {
    if ( a.points < b.points ){
        return 1;
    }
    if ( a.points > b.points ){
        return -1;
    }
    return 0;
}

export default {
    name: 'ResultsView',
    components: {
    },
    data () {
        return {
            seasons: [],
            users: [],
            rankings: [],
            seasonId: -1
        }
    },
    methods: {
        onSeasonChange() {
            RankingService.getRankingsFromSeason(this.seasonId).then(
                (response) => {
                    this.rankings = response.data;
                    console.log(this.rankings);
                    this.rankings.sort(compareRows);

                    var position = 1;
                    this.rankings.forEach(r => {
                        r.position = position;
                        position = position + 1;
                    })
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
        /* display: block; */
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

    .css-serial {
        counter-reset: serial-number; /* Set the serial number counter to 0 */
    }

    .css-serial td:first-child:before {
        counter-increment: serial-number; /* Increment the serial number counter */
        content: counter(serial-number); /* Display the counter */
    }

</style>