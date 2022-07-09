import axios from "axios";
// import userService from "./user.service";
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
            console.log(response.data);
            var newUser = {}
            if(response.data.access_token) {
                newUser = {
                    access_token: response.data.access_token,
                    refresh_token: response.data.refresh_token,
                    username: user.username,
                    admin_privileges: (response.data.admin_privileges === 'true')
                };
                
                
                localStorage.setItem('user', JSON.stringify(newUser));
                // console.log(user.username);
                // userService.getUserByEmail(user.username).then(
                //     (response) => {
                //         newUser.admin_privileges = response.data.adminPrivileges
                //     }
                // );
                // localStorage.setItem('user', JSON.stringify(newUser));
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
                adminPrivileges: false
            }
        );
    }
}

export default new AuthService();