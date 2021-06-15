<template>
    <nav class="mb-4 navbar navbar-expand-lg navbar-dark bg-unique">
        <a class="navbar-brand" href="#">
            <img src="../img/fox.png" alt="" width="30" height="25" class="d-inline-block align-text-top">
                Kanban App
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-3" aria-controls="navbarSupportedContent-3" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent-3">
            <ul class="navbar-nav ml-auto nav-flex-icons">
                <li class="nav-item">
                    <a class="nav-link waves-effect waves-light" href="https://twitter.com/lawlietoooo"><i class="fa fa-twitter"></i></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link waves-effect waves-light" href="https://www.instagram.com/trisnaadetia"><i class="fa fa-instagram"></i></a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-user"></i> 
                        </a>
                    <div class="dropdown-menu dropdown-menu-right dropdown-unique" aria-labelledby="navbarDropdownMenuLink">
                        <span class="dropdown-item">{{dataUserLogin}}</span>
                        <div @click.prevent="logout" class="text-center">
                            <GoogleLogin :params="params" :logoutButton=true>Logout</GoogleLogin>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import GoogleLogin from 'vue-google-login';
export default {
    name: "Navbar",
    data() {
        return{
            params: {
                client_id: "493830140157-o9ru1hs84lkscmupamj6u5r9tqdbv9qu.apps.googleusercontent.com"
            }
        }
    },
    methods: {
        logout() {
            localStorage.clear()
            this.$emit("logout", true)
        }
    },
    props: ["dataUserLogin"],
    components: {
        GoogleLogin
    }
}
</script>

<style>

</style>