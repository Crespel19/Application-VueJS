<template>
    <div class="flex">
        <span class="error" v-if="!hidden">Connection failed</span>
        <button @click="connection">Connection to Time API</button>
        <p>Date and time : {{date}} </p>
        <p>Time : {{temps}} </p>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Time",
        data: () =>{
            return {
                date: 0,
                temps: 0,
                hidden: true
            }
        },
        methods: {
            connection(){
                var accessToken = this.$store.state.token.accessToken;
                var config = {
                    headers: { Authorization: `Bearer ${accessToken}` }
                };
                axios.get("https://teststag.azurewebsites.net/Time",config)
                    .then(response => {
                        if (response.status === 200){
                            this.date = response.data.dateEtHeure;
                            this.temps = new Date(response.data.temps);
                            console.log(this.temps.getHours());
                            this.temps = this.temps.getHours() + ":" + this.temps.getMinutes() + ":" + this.temps.getSeconds();
                            this.hidden = true;
                        }
                    })
                    .catch(() => {
                        this.hidden = false;
                    });
            }
        }
    }
</script>

<style scoped>
    .flex{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>