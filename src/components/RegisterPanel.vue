<template>
    <form @submit.prevent="onSubmit" class="login-form">
        <label for="username">Username: </label>
        <input placeholder="test" v-model="username" id="username" class="text-input"/>
        <label for="password">Password: </label>
        <input placeholder="test" v-model="password" id="password" class="text-input" type="password"/>
        <input type="submit" class="btn" value="Register">
        <div class="other">
            <a class="link" @click="togglePanel">Login</a>
        </div>
    </form>
</template>

<script>
export default {
    name: "LoginPanel",
    data() {
        return {
            username: '',
            password: '',
            loading: false
        }
    },
    methods:{
        onSubmit(submitEvent) {
            this.loading = true;
            this.$store.dispatch("auth/register", {
                username: submitEvent.target.elements.username.value,
                password: submitEvent.target.elements.password.value
            }).then(
                () => {
                    this.$router.push("/");
                },
                (error) => {
                    this.loading = false;
                    this.errorMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                }
            );
        },
        togglePanel(){
           this.$router.push("/login");
        }
    }
}
</script>

<style scoped>
*:before,
*:after{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

form{
    height: 520px;
    width: 400px;
    background-color: rgba(255,255,255,0.13);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);
    padding: 50px 35px;
}

form *{
    font-family: 'Poppins',sans-serif;
    color: #080808;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
}

label{
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
}

input{
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(62, 62, 62, 0.216);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
}

.btn {
    background-color: rgba(190, 0, 0, 0.788);
    color: white;
    font-weight: 500;
    margin: auto;
    margin-top: 3rem;
}

.other {
    margin-top: 1rem;
    text-align: center;
}

a {
    /* text-decoration: underline; */
    cursor: pointer;
    position:relative;
}

a::before{
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background-color: #18272F;
    bottom: 0;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform .3s ease-in-out;
}

a:hover::before {
        transform-origin: left;
        transform: scaleX(1);
    }
</style>