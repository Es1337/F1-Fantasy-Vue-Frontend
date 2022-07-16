<template>
    <h1>Manage Predictions Panel</h1>
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
            <thead>
                <tr>
                    <th>Target</th>
                    <th>Code</th>
                </tr>
            </thead>
            <tbody>
                <tr class="clickable-row" v-for="prediction in predictions" :key="prediction.id" @click="clickRow(prediction)">
                    <td>{{prediction.target}}</td>
                    <td>{{prediction.typeCode}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="prediction_clicked" class="container">
        <div>
            <button style="background: firebrick" class="btn" @click="deletePrediction"> Delete </button>
        </div>
    </div>
    <div v-if="add_clicked" class="container">
        <form @submit.prevent="onSubmitAdd" class="add-season-form">
            <div class="form-field">
                <label for="target">Target:</label>
                <input placeholder="T/D" v-model="target" type="text" id="target">
            </div>
            <div class="form-field">
                <label for="code">Code:</label>
                <input placeholder="CODE" v-model="code" type="text" id="code">
            </div>
            <div class="form-field">
                <input type="submit" class="btn" value="Add">
            </div>
        </form>
    </div>
    <div>
        <button v-if="!add_clicked" style="background: firebrick" class="btn" @click="toggleAdd"> Add </button>
    </div>
</template>
<script>
import PredictionService from "@/services/prediction.service"
import SeasonService from "@/services/season.service"

export default {
    data() {
        return {
            content: "",
            predictions: [],
            seasons: [],
            id: -1,
            seasonId: -1,
            target: '',
            code: '',
            currentSeasonYear: 1900,
            prediction_clicked: false,
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
      )

    },
    methods: {
        toggleAdd() {
            this.add_clicked = !this.add_clicked;
            this.prediction_clicked = false;
        },
        onSeasonChange() {
            PredictionService.getAvailablePredictionsFromSeason(this.seasonId).then(
                (response) => {
                    this.predictions = response.data;
                    // this.predictions = response.data;
                    console.log(this.predictions);
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                }
            )
        },
        clickRow(prediction){
            this.prediction_clicked = true;
            this.add_clicked = false;
            this.id = prediction.id;
            this.target = prediction.target;
            this.code = prediction.typeCode;

            console.log(prediction.id);
            

            // this.prediction_clicked = false;
        },
        onSubmitAdd() {
            PredictionService.addAvailablePrediction({
                    target: this.target,
                    typeCode: this.code
                },
                this.seasonId
            ).then(
                (response) => {
                    var newAvPred = {
                        target: response.data.target,
                        typeCode: response.data.typeCode
                    }
                    this.predictions.push(newAvPred);
                    console.log(response.data);
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                }
            )
        },
        deletePrediction() {
            PredictionService.deleteAvailablePrediction(this.id)
            .then(
                (response) => {
                    let predictionObjectIdx = this.predictions.findIndex(p => p.id == this.id);
                    this.predictions.splice(predictionObjectIdx, 1);
                    // this.predictions = response.data;
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