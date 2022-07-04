<template>
<div class="container">
    <h1>Results</h1>
    <div>
      <div>
        <label for="season-select">Year:</label>
        <select name="seasons" id="season-select">
          <option v-for="season in seasons" :key="season.year" :value="season.year"> {{ season.year }} </option>
        </select>
      </div>
      <div>
        <select name="tables" id="table-select">
          <option value="drivers"> Drivers </option>
          <option value="teams"> Teams </option>
        </select>
      </div>
    </div>
    <div v-if="results.year == 2022">
      <table v-for="season in results"  :key="season.year">
        <tr>
          <th>Position</th>
          <th>Name</th>
          <th>Points</th>
        </tr>
        <tr v-for="team in season.teams"  :key="team.name">
          <td>1</td>  
          <td>{{team.name}}</td>  
          <td>{{team.points}}</td>  
        </tr>
      </table>
    </div>
</div>
</template>

<script>
  export default {
    name: 'ResultsView',
    components: {
    },
    data () {
      return {
        seasons: [
            {year: '2020'},
            {year: '2021'},
            {year: '2022'}
          ],
        results: [
          {
            year: 2022,
            teams: [
              {name: "Ferrari", points: 107},
              {name: "RedBull", points: 85},
            ]
          }
        ]
      }
    },
    methods: {
    },
    mounted() {
    }
  }
</script>
