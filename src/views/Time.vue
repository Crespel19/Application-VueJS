<template>
    <div class="flex">
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
                temps: 0
            }
        },
        methods: {
            connection(){
                var cookie = this.getCookie("accessToken");
                var config = {
                    headers: { Authorization: `Bearer ${cookie}` }
                };
                axios.get("https://teststag.azurewebsites.net/Time",config).then(response => {
                    if (response.status === 200){
                        this.date = response.data.dateEtHeure;
                        this.temps = response.data.temps;
                    }
                });
            },
            getCookie(cname) {
                var name = cname + "=";
                var decodedCookie = decodeURIComponent(document.cookie);
                var ca = decodedCookie.split(';');
                for(var i = 0; i <ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
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