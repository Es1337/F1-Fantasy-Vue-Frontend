import axios from 'axios';
import authHeader from './auth-header';
const API_RACE = 'https://f1-fantasy-spring-backend.herokuapp.com/api/race'

class RaceService {
    getAllRaces() {
        return axios.get(
            API_RACE, 
            { headers: authHeader() }
        );
    }

    getRaceById(id) {
        return axios.get(
            API_RACE + `/${id}`,
            { headers: authHeader() }
        );
    }

    getRacesByName(name) {
        return axios.get(
            API_RACE + `/name/${name}`,
            { headers: authHeader() }
        );
    }

    getRacesByCity(city) {
        return axios.get(
            API_RACE + `/city/${city}`,
            { headers: authHeader() }
        );
    }

    getRacesByCountry(country) {
        return axios.get(
            API_RACE + `/country/${country}`,
            { headers: authHeader() }
        );
    }

    getRacesByTrack(track) {
        return axios.get(
            API_RACE + `/track/${track}`,
            { headers: authHeader() }
        );
    }

    getRacesFromSeason(seasonId) {
        return axios.get(
            API_RACE + `/season/${seasonId}`,
            { headers: authHeader() }
        );
    }

    addRace(race, seasonId) {
        return axios.post(
            API_RACE + `/${seasonId}`, 
            race, 
            { headers: authHeader() }
        );
    }

    updateRace(race, id) {
        return axios.put(
            API_RACE + `/${id}`, 
            race, 
            { headers: authHeader() }
        );
    }

    deleteRace(id) {
        return axios.delete(
            API_RACE + `/${id}`, 
            { headers: authHeader() }
        );
    }
}

export default new RaceService();