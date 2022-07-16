import axios from 'axios';
import authHeader from './auth-header';
const API_REWARD = 'https://f1-fantasy-spring-backend.herokuapp.com/api/reward'

class RewardService {
    resolvePredictionsForRace(raceId) {
        return axios.post(
            API_REWARD + `/${raceId}`,
            null,
            { headers: authHeader() }
        );
    }
}

export default new RewardService();