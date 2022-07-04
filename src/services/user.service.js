import axios from 'axios';
import authHeader from './auth-header';
const API_USER = 'https://f1-fantasy-spring-backend.herokuapp.com/api/user'

class UserService {
    getAllUsers() {
        return axios.get(
            API_USER, 
            { headers: authHeader() }
        );
    }

    getUserById(id) {
        return axios.get(
            API_USER + `/${id}`,
            { headers: authHeader() }
        );
    }

    getUserByEmail(email) {
        return axios.get(
            API_USER + `/email`,
            null,
            { 
                headers: authHeader(),
                params: {
                    email
                }
            }
        );
    }

    updateUser(user, id) {
        return axios.put(
            API_USER + `/${id}`, 
            user, 
            { headers: authHeader() }
        );
    }

    deleteUser(id) {
        return axios.delete(
            API_USER + `/${id}`, 
            { headers: authHeader() }
        );
    }
}

export default new UserService();