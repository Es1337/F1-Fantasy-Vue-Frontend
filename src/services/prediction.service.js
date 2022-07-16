import axios from 'axios';
import authHeader from './auth-header';
const API_USER_PRED = 'https://f1-fantasy-spring-backend.herokuapp.com/api/user-prediction'
const API_AV_PRED = 'https://f1-fantasy-spring-backend.herokuapp.com/api/available-prediction'

class PredictionService {
    getPredictionsFromUserFromRace(userId, raceId) {
        return axios.get(
            API_USER_PRED + `/${raceId}/${userId}`,
            { headers: authHeader() }
        );
    }

    getPredictionsFromUserFromSeason(userId, seasonId) {
        return axios.get(
            API_USER_PRED + `/season/${seasonId}/${userId}`,
            { headers: authHeader() }
        );
    }

    addPrediction(prediction, raceId, userId, avPredictionId) {
        return axios.post(
            API_USER_PRED + `/${raceId}/${userId}/${avPredictionId}`,
            prediction,
            { headers: authHeader() }
        );
    }

    getAvailablePredictionsFromSeason(seasonId) {
        return axios.get(
            API_AV_PRED + `/season/${seasonId}`,
            { headers: authHeader() }
        );
    }

    addAvailablePrediction(avPrediction, seasonId) {
        return axios.post(
            API_AV_PRED + `/${seasonId}`,
            avPrediction,
            { headers: authHeader() }
        );
    }

    deleteAvailablePrediction(id) {
        return axios.delete(
            API_AV_PRED + `/${id}`,
            { headers: authHeader() }
        );
    }
}

export default new PredictionService();