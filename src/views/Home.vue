<template>
    <div class="home">
        <span class="error" v-if="!hidden">Your login or your password is wrong</span>
        <input type="text" value="login" v-model="login" placeholder="Username">
        <input type="password" value="mdp" v-model="mdp" placeholder="Password">
        <button @click="connection" class="btnConnection">Connection</button>
    </div>
</template>

<script>
    // @ is an alias to /src

    import axios from 'axios';

    export default {
        name: 'Home',
        data: () => {
            return {
                login: "",
                mdp: "",
                hidden: true
            }
        },
        methods: {
            connection(){
                axios.post("https://teststag.azurewebsites.net/api/Auth",{username: this.login,password: this.mdp})
                    .then(response => {
                        if (response.status === 200){
                            this.$store.commit("setToken",response.data);
                            this.$router.push("/time");
                        }
                    })
                    .catch(() => {
                        this.hidden = false;
                    })
            }
        }
    }
</script>

<style scoped>
    .btnConnection{
        margin: 5px;
        background: dodgerblue;
        color: white;
        font-size: medium;
    }
    input{
        margin: 5px;
        border-color: black;
        border-radius: 5px;
        border-width: thin;
    }
    .home{
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-basis: auto;
    }
</style>
