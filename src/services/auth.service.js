import axios from "axios";
const API = 'https://f1-fantasy-spring-backend.herokuapp.com/'

class AuthService {
    login(user) {
        const params = new URLSearchParams();
        params.append('username', user.username);
        params.append('password', user.password);
        return axios.post(
            API + 'login',
            params
        )
        .then(response => {
            var newUser = {}
            if(response.data.access_token) {
                newUser = {
                    access_token: response.data.access_token,
                    refresh_token: response.data.refresh_token,
                    username: user.username
                };

                localStorage.setItem('user', JSON.stringify(newUser));
            }
            return newUser;
        });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(
            API + 'api/user/register',
            {
                email: user.username,
                pass: user.password,
                admin_privilges: false
            }
        );
    }
}

export default new AuthService();