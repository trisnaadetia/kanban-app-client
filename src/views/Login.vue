<template>
    <section class="login-block text-light">
        <div class="container">
            <div class="row">    
                <div class="col-md-4 banner-sec">   
                    <div class="signup__overlay"></div>          
                    <div class="banner">
                        <div id="demo" class="carousel slide carousel-fade" data-ride="carousel">
                        </div>
                    </div>
                </div>
                <div class="col-md-8 login-sec">
                    <h2 class="text-center">Login</h2>
                    <form class="login-form validate-form" @submit.prevent="login">
                        <div class="wrap-input100 validate-input">
                            <span class="label-input100 text-light">Email</span>
                            <input class="input" type="text" name="email" v-model="email">
                            <!-- <span class="focus-input100"></span> -->
                        </div>
                        <div class="wrap-input100 validate-input">
                            <span class="label-input100 text-light">Password</span>
                            <input class="input" type="password" name="password" v-model="password">
                            <!-- <span class="focus-input100 password"></span> -->
                        </div>
                        <div class="container-login-form-btn">
                            <div class="wrap-login-form-btn">
                                <button class="btn btn-primary mr-2" type="submit" @click.prevent="login">
                                    Login
                                </button>
                                <button class="btn btn-primary mr-2" @click="changeState(true)">
                                    Register
                                </button>
                            </div>
                        </div>
                        <div class="txt1 text-center p-t-54 p-b-20 mt-3">
                            <span>
                                Or login with google here:
                            </span>
                            <div class="d-flex justify-content-center mt-3">
                                <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import GoogleLogin from 'vue-google-login';
export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            params: {
                client_id: "493830140157-o9ru1hs84lkscmupamj6u5r9tqdbv9qu.apps.googleusercontent.com"
            },
            renderParams: {
                width: 150,
                height: 50,
                longtitle: false,
            }
        }
    },
    props: ["dataIsLogin"],
    methods: {
        changeState(value) {
            this.$emit('changeStatus', value)
        },
        login(data) {
            this.$emit('login', {
                email: this.email,
                password: this.password
            })
            this.email = ""
            this.password = ""
        },
        onSuccess(googleUser) {
            const id_token = googleUser.tc.id_token
            this.$emit("id_token", id_token)
        }
    },
    components: {
        GoogleLogin
    }

}
</script>

<style>

</style>