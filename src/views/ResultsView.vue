<template>
<div class="container">
    <h1>Results</h1>
    <div class="form-field">
      <label for="season-select">Year:</label>
      <select name="season-select" id="season-select" v-model="seasonId" @change="onSeasonChange()">
          <option v-for="season in seasons" :value="season.id" :key="season.id" :selected="season.year == currentSeasonYear">
              {{ season.year }}
          </option>
      </select>
    </div>
    <div class="form-field">
      <select name="tables" id="table-select" v-model="tableType">
        <option value="d" selected> Drivers </option>
        <option value="t"> Teams </option>
      </select>
    </div>
    <div class="container">
      <table v-if="tableType == 't'">
        <tr>
          <th>Position</th>
          <th>Name</th>
          <th>Points</th>
        </tr>
        <tr v-for="team in teams" :key="team.id">
          <td>{{team.position}}</td>  
          <td>{{team.name}}</td>  
          <td>{{team.points}}</td>  
        </tr>
      </table>
      <table v-if="tableType == 'd'">
        <tr>
          <th>Position</th>
          <th>Name</th>
          <th>Team</th>
          <th>Points</th>
        </tr>
        <tr v-for="driver in drivers" :key="driver.id">
          <td>{{driver.position}}</td>  
          <td>{{driver.fname}} {{driver.lname}}</td>  
          <td>{{driver.team.name}}</td>  
          <td>{{driver.points}}</td>  
        </tr>
      </table>
    </div>
</div>
</template>

<script>
import SeasonService from "@/services/season.service"
import DriverService from "@/services/driver.service"
import TeamService from "@/services/team.service"

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
        tableType: "d",
        seasons: [],
        drivers: [],
        teams: [],
        seasonId: -1
      }
    },
    methods: {
      onSeasonChange() {
        DriverService.getDriversFromSeason(this.seasonId).then(
          (response) => {
            this.drivers = response.data;
            console.log(this.drivers);
            this.drivers.sort(compareRows);
            
            var position = 1;
            this.drivers.forEach(d => {
              d.position = position;
              position = position + 1;
            });
          },
          (error) => {
            this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          }
        );

        TeamService.getTeamsFromSeason(this.seasonId).then(
          (response) => {
            this.teams = response.data;
            console.log(this.teams);
            this.teams.sort(compareRows);

            var position = 1;
            this.teams.forEach(t => {
              t.position = position;
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