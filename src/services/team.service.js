import axios from 'axios';
import authHeader from './auth-header';
const API_TEAM = 'https://f1-fantasy-spring-backend.herokuapp.com/api/team'

class TeamService {
    getAllTeams() {
        return axios.get(
            API_TEAM, 
            { headers: authHeader() }
        );
    }

    getTeamById(id) {
        return axios.get(
            API_TEAM + `/${id}`,
            { headers: authHeader() }
        );
    }

    getTeamByName(name) {
        return axios.get(
            API_TEAM + `/name/${name}`,
            { headers: authHeader() }
        );
    }

    getTeamsFromSeason(seasonId) {
        return axios.get(
            API_TEAM + `/season/${seasonId}`,
            { headers: authHeader() }
        );
    }

    addTeam(team, seasonId) {
        return axios.post(
            API_TEAM + `/${seasonId}`, 
            team, 
            { headers: authHeader() }
        );
    }

    updateTeam(team, id) {
        return axios.put(
            API_TEAM + `/${id}`, 
            team, 
            { headers: authHeader() }
        );
    }

    deleteTeam(id) {
        return axios.delete(
            API_TEAM + `/${id}`, 
            { headers: authHeader() }
        );
    }
}

export default new TeamService();