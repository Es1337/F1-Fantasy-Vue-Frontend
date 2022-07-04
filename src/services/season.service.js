import axios from 'axios';
import authHeader from './auth-header';
const API_SEASON = 'https://f1-fantasy-spring-backend.herokuapp.com/api/season'

class SeasonService {
    getAllSeasons() {
        return axios.get(
            API_SEASON, 
            { headers: authHeader() }
        );
    }

    getSeasonById(id) {
        return axios.get(
            API_SEASON + `/${id}`, 
            { headers: authHeader() }
        );
    }

    getSeasonByYear(year) {
        return axios.get(
            API_SEASON + `/year/${year}`, 
            { headers: authHeader() }
        );
    }

    addSeason(season) {
        return axios.post(
            API_SEASON, 
            season,
            { headers: authHeader() }
        );
    }

    updateSeason(season, id) {
        return axios.put(
            API_SEASON + `/${id}`, 
            season, 
            { headers: authHeader() }
        );
    }

    deleteSeason(id) {
        return axios.delete(
            API_SEASON + `/${id}`, 
            { headers: authHeader() }
        );
    }
}

export default new SeasonService();