<template>
    <div>
        <NavButton value="Home" color="firebrick" url="/"/>
        <NavButton value="Results" color="firebrick" url="/results"/>
        <NavButton value="Schedule" color="firebrick" url="/schedule"/>
        <NavButton value="Predictions" color="firebrick" url="/predictions"/>
        <NavButton v-show="isAdmin" value="Admin" color="firebrick" url="/admin"/>
        <NavButton value="Log In" color="firebrick" url="/login"/>
        <NavButton value="Register" color="firebrick" url="/register"/>
        <a @click.prevent="logout">Logout</a>
    </div>
</template>

<script>
import NavButton from './NavButton.vue'
export default {
    name: "NavBar",
    data() {
        return {
            isAdmin: false
        };
    },
    mounted(){
        this.isAdmin = this.$store.getters.getAdminPrivileges;
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