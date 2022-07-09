<template>
<div class="container">
    <h1>Schedule</h1>
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
          <th>Name</th>
          <th>Track</th>
          <th>Country</th>
          <th>City</th>
          <th>Date</th>
        </tr>
        <template v-for="race in races" :key="race.id">
          <tr class="clickable-row" @click="clickRow(race)">
            <td>{{race.name}}</td>  
            <td>{{race.track}}</td>  
            <td>{{race.country}}</td>
            <td>{{race.city}}</td>
            <td>{{race.fp1.day}}.{{race.fp1.month}} - {{race.race.day}}.{{race.race.month}}.{{race.race.year}}</td>  
          </tr>
          <tr  v-if="race.showDetails" class="expanded-row">
            <td></td><td>FP1</td><td>{{race.fp1.day}}.{{race.fp1.month}}.{{race.fp1.year}}</td><td>{{race.fp1.hour}}:{{race.fp1.minutes}}</td><td></td>
          </tr>
          <tr  v-if="race.showDetails" class="expanded-row">
            <td></td><td>FP2</td><td>{{race.fp2.day}}.{{race.fp2.month}}.{{race.fp2.year}}</td><td>{{race.fp2.hour}}:{{race.fp2.minutes}}</td><td></td>
          </tr>
          <tr  v-if="race.showDetails && race.fp3.year" class="expanded-row">
            <td></td><td>FP3</td><td>{{race.fp3.day}}.{{race.fp3.month}}.{{race.fp3.year}}</td><td>{{race.fp3.hour}}:{{race.fp3.minutes}}</td><td></td>
          </tr>
          <tr  v-if="race.showDetails" class="expanded-row">
            <td></td><td>Qualifying</td><td>{{race.quali.day}}.{{race.quali.month}}.{{race.quali.year}}</td><td>{{race.quali.hour}}:{{race.quali.minutes}}</td><td></td>
          </tr>
          <tr  v-if="race.showDetails && race.sprint.year" class="expanded-row">
            <td></td><td>Sprint</td><td>{{race.sprint.day}}.{{race.sprint.month}}.{{race.sprint.year}}</td><td>{{race.sprint.hour}}:{{race.sprint.minutes}}</td><td></td>
          </tr>
          <tr  v-if="race.showDetails" class="expanded-row">
            <td></td><td>Race</td><td>{{race.race.day}}.{{race.race.month}}.{{race.race.year}}</td><td>{{race.race.hour}}:{{race.race.minutes}}</td><td></td>
          </tr>
        </template>
      </table>
    </div>
</div>
</template>

<script>
import SeasonService from "@/services/season.service"
import RaceService from "@/services/race.service"

  export default {
    name: 'ScheduleView',
    components: {
    },
    data () {
      return {
        seasonId: -1,
        rowClickedId: -1,
        currentSeasonYear: 1900,
        races: [],
        seasons: [],
        content: ""
      }
    },
    methods: {
      clickRow(race){
            race.showDetails = !race.showDetails;
        },
      onSeasonChange(){
        RaceService.getRacesFromSeason(this.seasonId).then(
          (response) => {
            var data = response.data;
            console.log(data);
            response.data.forEach(race => {
              var fp1Date = new Date(Date.parse(race.fp1));
              var fp2Date = new Date(Date.parse(race.fp2));
              var fp3Date = new Date(Date.parse(race.fp3));
              var qualiDate = new Date(Date.parse(race.quali));
              var sprintDate = new Date(Date.parse(race.sprint));
              var raceDate = new Date(Date.parse(race.race));

              this.races.push({
                name: race.name,
                country: race.country,
                city: race.city,
                track: race.track,
                fp1: {
                  hour: fp1Date.getHours() < 10 ? "0" + fp1Date.getHours() : fp1Date.getHours(),
                  minutes:fp1Date.getMinutes() < 10 ? "0" + fp1Date.getMinutes() : fp1Date.getMinutes(),
                  day: fp1Date.getDate() < 10 ? "0" + fp1Date.getDate() : fp1Date.getDate(),
                  month:fp1Date.getMonth() < 10 ? "0" + fp1Date.getMonth() : fp1Date.getMonth(),
                  year: fp1Date.getFullYear(),
                },
                fp2: {
                  hour: fp2Date.getHours() < 10 ? "0" + fp2Date.getHours() : fp2Date.getHours(),
                  minutes: fp2Date.getMinutes() < 10 ? "0" + fp2Date.getMinutes() : fp2Date.getMinutes(),
                  day: fp2Date.getDate() < 10 ? "0" + fp2Date.getDate() : fp2Date.getDate(),
                  month: fp2Date.getMonth() < 10 ? "0" + fp2Date.getMonth() : fp2Date.getMonth(),
                  year: fp2Date.getFullYear(),
                },
                fp3: {
                  hour: fp3Date.getHours() < 10 ? "0" + fp3Date.getHours() : fp3Date.getHours(),
                  minutes: fp3Date.getMinutes() < 10 ? "0" + fp3Date.getMinutes() : fp3Date.getMinutes(),
                  day: fp3Date.getDate() < 10 ? "0" + fp3Date.getDate() : fp3Date.getDate(),
                  month: fp3Date.getMonth() < 10 ? "0" + fp3Date.getMonth() : fp3Date.getMonth(),
                  year: fp3Date.getFullYear(),
                },
                quali: {
                  hour: qualiDate.getHours() < 10 ? "0" + qualiDate.getHours() : qualiDate.getHours(),
                  minutes: qualiDate.getMinutes() < 10 ? "0" + qualiDate.getMinutes() : qualiDate.getMinutes(),
                  day: qualiDate.getDate() < 10 ? "0" + qualiDate.getDate() : qualiDate.getDate(),
                  month: qualiDate.getMonth() < 10 ? "0" + qualiDate.getMonth() : qualiDate.getMonth(),
                  year: qualiDate.getFullYear(),
                },
                sprint: {
                  hour: sprintDate.getHours() < 10 ? "0" + sprintDate.getHours() : sprintDate.getHours(),
                  minutes: sprintDate.getMinutes() < 10 ? "0" + sprintDate.getMinutes() : sprintDate.getMinutes(),
                  day: sprintDate.getDate() < 10 ? "0" + sprintDate.getDate() : sprintDate.getDate(),
                  month: sprintDate.getMonth() < 10 ? "0" + sprintDate.getMonth() : sprintDate.getMonth(),
                  year: sprintDate.getFullYear(),
                },
                race: {
                  hour: raceDate.getHours() < 10 ? "0" + raceDate.getHours() : raceDate.getHours(),
                  minutes: raceDate.getMinutes() < 10 ? "0" + raceDate.getMinutes() : raceDate.getMinutes(),
                  day: raceDate.getDate() < 10 ? "0" + raceDate.getDate() : raceDate.getDate(),
                  month: raceDate.getMonth() < 10 ? "0" + raceDate.getMonth() : raceDate.getMonth(),
                  year: raceDate.getFullYear(),
                },
                showDetails: false
              })
            })

            this.races.sort((raceA, raceB) => {
              if(raceA.fp1.month > raceB.fp1.month){
                return 1;
              }
              if(raceA.fp1.month < raceB.fp1.month){
                return -1;
              }
              if(raceA.fp1.day > raceB.fp1.day){
                return 1;
              }
              if(raceA.fp1.day < raceB.fp1.day){
                return -1;
              }

              return 0;
            })

          },
          (error) => {
            this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          }
        )
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

    .expanded-row:nth-child(even) {
      background-color: grey;
    }
    .expanded-row:nth-child(odd) {
      background-color: rgb(169, 169, 169);
    }

    th {
        padding: 1em 2em;
    }

    td {
        text-align: left;
        padding: 1em 2em;
    }

</style>