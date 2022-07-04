import axios from 'axios';
import authHeader from './auth-header';
const API_RACERESULT = 'https://f1-fantasy-spring-backend.herokuapp.com/api/race-result'

class RaceResultService {
    getAllRaceResults() {
        return axios.get(
            API_RACERESULT, 
            { headers: authHeader() }
        );
    }

    getRaceResultById(id) {
        return axios.get(
            API_RACERESULT + `/${id}`,
            { headers: authHeader() }
        );
    }

    getRaceResultsFromDriver(driverId) {
        return axios.get(
            API_RACERESULT + `/driver/${driverId}`,
            { headers: authHeader() }
        );
    }

    getRaceResultsFromRace(raceId) {
        return axios.get(
            API_RACERESULT + `/race/${raceId}`,
            { headers: authHeader() }
        );
    }

    addRaceResult(raceresult, driverId, raceId) {
        return axios.post(
            API_RACERESULT + `/${driverId}/${raceId}`, 
            raceresult, 
            { headers: authHeader() }
        );
    }

    updateRaceResult(raceresult, id) {
        return axios.put(
            API_RACERESULT + `/${id}`, 
            raceresult, 
            { headers: authHeader() }
        );
    }

    deleteRaceResult(id) {
        return axios.delete(
            API_RACERESULT + `/${id}`, 
            { headers: authHeader() }
        );
    }
}

export default new RaceResultService();