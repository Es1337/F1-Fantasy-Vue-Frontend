import axios from 'axios';
import authHeader from './auth-header';
const API_DRIVER = 'https://f1-fantasy-spring-backend.herokuapp.com/api/driver'

class DriverService {
    getAllDrivers() {
        return axios.get(
            API_DRIVER, 
            { headers: authHeader() }
        );
    }

    getDriverById(id) {
        return axios.get(
            API_DRIVER + `/${id}`,
            { headers: authHeader() }
        );
    }

    getDriversFromTeam(teamId) {
        return axios.get(
            API_DRIVER + `/team/${teamId}`,
            { headers: authHeader() }
        );
    }

    getDriversFromSeason(seasonId) {
        return axios.get(
            API_DRIVER + `/season/${seasonId}`,
            { headers: authHeader() }
        );
    }

    addDriver(driver, teamId, seasonId) {
        return axios.post(
            API_DRIVER + `/${teamId}/${seasonId}`, 
            driver, 
            { headers: authHeader() }
        );
    }

    updateDriver(driver, id) {
        return axios.put(
            API_DRIVER + `/${id}`, 
            driver, 
            { headers: authHeader() }
        );
    }

    deleteDriver(id) {
        return axios.delete(
            API_DRIVER + `/${id}`, 
            { headers: authHeader() }
        );
    }
}

export default new DriverService();