<template>
    <div>
        <NavButton v-if="isLogged" value="Home" color="firebrick" url="/"/>
        <NavButton v-if="isLogged" value="Results" color="firebrick" url="/results"/>
        <NavButton v-if="isLogged" value="Schedule" color="firebrick" url="/schedule"/>
        <NavButton v-if="isLogged" value="Predictions" color="firebrick" url="/predictions"/>
        <NavButton v-if="isAdmin" value="Admin" color="firebrick" url="/admin"/>
        <NavButton v-if="!isLogged" value="Log In" color="firebrick" url="/login"/>
        <NavButton v-if="!isLogged" value="Register" color="firebrick" url="/register"/>
        <a v-if="isLogged" class="btn" @click.prevent="logout">Logout</a>
    </div>
</template>

<script>
import NavButton from './NavButton.vue'
export default {
    name: "NavBar",
    data() {
        return {
            isAdmin: false,
            isLogged: false
        };
    },
    created(){
        if(this.$store.state.auth.user) {
            this.isAdmin = this.$store.state.auth.user.admin_privileges;
        }
        this.isLogged = this.$store.state.auth.status.loggedIn;
    },
    components:{
        NavButton
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>
    .btn {
        background-color: firebrick;
        color: beige;
        font-weight: 400;
        /* margin: auto; */
        margin-left: 10;
        /* margin-top: 3rem; */
    }    
</style>