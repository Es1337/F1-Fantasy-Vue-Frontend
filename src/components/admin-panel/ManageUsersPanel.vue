<template>
    <h1>Manage Users Panel</h1>
    <div class="container">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin Privileges</th>
                </tr>
            </thead>
            <tbody>
                <tr class="clickable-row" v-for="user in users" :key="user.id" @click="clickRow(user)">
                    <td>{{user.fname}} {{user.lname}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.adminPrivileges}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="user_clicked" class="container">
        <form @submit.prevent="onSubmit" class="add-season-form">
            <div class="form-field">
                <label for="email">Email:</label>
                <input placeholder="Email" v-model="email" type="text" id="email">
            </div>
            <div class="form-field">
                <label for="fname">Name:</label>
                <input placeholder="Name" v-model="fname" type="text" id="fname">
            </div>
            <div class="form-field">
                <label for="lname">Surname:</label>
                <input placeholder="Surname" v-model="lname" type="text" id="lname">
            </div>
            <div class="form-field">
                <label for="admin-priv">Is Admin?</label>
                <input v-model="admin_privileges" type="checkbox" id="admin-priv">
            </div>
            <div class="form-field">
                <input type="submit" class="btn" value="Update">
            </div>
        </form>
        <div>
            <button style="background: firebrick" class="btn" @click="deleteUser"> Delete </button>
        </div>
    </div>
</template>
<script>
import UserService from "@/services/user.service"

export default {
    data() {
        return {
            content: "",
            users: [],
            id: -1,
            email: '',
            pass: '',
            fname: '',
            lname: '',
            admin_privileges: false,
            user_clicked: false
        }
    },
    mounted() {
        UserService.getAllUsers().then(
            (response) => {
                this.users = response.data;
                // this.users = response.data;
                console.log(this.users);
            },
            (error) => {
                this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            }
        )
    },
    methods: {
        clickRow(user){
            this.user_clicked = true;
            this.id = user.id,
            this.email = user.email;
            this.pass = user.pass;
            this.fname = user.fname;
            this.lname = user.lname;
            this.admin_privileges = user.adminPrivileges;

            console.log(user.id);
            

            // this.user_clicked = false;
        },
        onSubmit() {
            UserService.updateUser({
                    email: this.email,
                    pass: this.pass,
                    fname: this.fname,
                    lname: this.lname,
                    adminPrivileges: this.admin_privileges
                },
                this.id
            ).then(
                (response) => {
                    let userObjectIdx = this.users.findIndex(u => u.id == this.id);
                    this.users[userObjectIdx].email = this.email;
                    this.users[userObjectIdx].fname = this.fname;
                    this.users[userObjectIdx].lname = this.lname;
                    this.users[userObjectIdx].adminPrivileges = this.admin_privileges;
                    // this.users = response.data;
                    console.log(response.data);
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                }
            )
        },
        deleteUser() {
            UserService.deleteUser(this.id)
            .then(
                (response) => {
                    let userObjectIdx = this.users.findIndex(u => u.id == this.id);
                    this.users.splice(userObjectIdx, 1);
                    // this.users = response.data;
                    console.log(response.data);
                },
                (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                }
            )
        }
    }
}
</script>
<style scoped>
    label{
        display: block;
        margin-top: 30px;
        font-size: 16px;
        font-weight: 500;
    }

    input{
        display: block;
        height: 30px;
        width: 80%;
        background-color: rgba(62, 62, 62, 0.216);
        border-radius: 3px;
        padding: 0 10px;
        margin-top: 8px;
        font-size: 14px;
        font-weight: 300;
    }

    .btn {
        background-color: firebrick;
        color: beige;
        font-weight: 500;
        font-size: 14px;
        height: 3rem;
        width: 8rem;
        margin: auto;
        margin-left: 0;
        margin-top: 1rem;
    }

    .clickable-row:hover {
        cursor: pointer
    }
    .clickable-row:nth-child(even) {
        background-color: rgb(196, 146, 146);
    }

    th {
        padding: 1em 2em;
    }

    td {
        text-align: left;
        padding: 1em 2em;
    }
</style>