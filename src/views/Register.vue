<template>
    <section class="register-block text-light">
        <div class="container">
            <div class="row">    
                <div class="col-md-4 banner-sec">   
                    <div class="signup__overlay"></div>          
                    <div class="banner">
                        <div id="demo" class="carousel slide carousel-fade" data-ride="carousel">
                        </div>
                    </div>
                </div>
                <div class="col-md-8 register-sec">
                    <h2 class="text-center">Register</h2>
                    <form class="register-form validate-form" @submit.prevent="register">
                        <div class="wrap-input100 validate-input">
                            <span class="label-input100 text-light">Username</span>
                            <input class="input" type="text" name="username" v-model="username">
                            <!-- <span class="focus-input100"></span> -->
                        </div>
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
                        <div class="container-register-form-btn">
                            <div class="wrap-register-form-btn">
                                <button class="btn btn-primary mr-2" @click="changeState(false)">
                                    Login
                                </button>
                                <button class="btn btn-primary mr-2" type="button" @click.prevent="register">
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            username: "",
            email: "",
            password: ""
        }
    },
    methods: {
        changeState(value) {
            this.$emit('changeStatus', value)
        },
        register(data) {
            this.$emit('register', {
                username: this.username,
                email: this.email,
                password: this.password
            })
            this.username = ""
            this.email = ""
            this.password = ""
        }
    }
}
</script>

<style>

</style>