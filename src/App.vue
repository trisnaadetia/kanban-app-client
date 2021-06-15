<template>
    <div>
        <Login @changeStatus="changeStatusRegisterForm" 
            v-if="isLoginForm && !isRegisterForm && !isLogin"
            :dataIsLogin="isLogin"
            @changeIsLogin="changeIsLogin"
            @login="login"
            @id_token="googleSignIn">
        </Login>
        <Register @changeStatus="changeStatusRegisterForm" 
            v-if="isRegisterForm && !isLoginForm && !isLogin"
            @register="register">
        </Register>
        <Home @changeStatus="changeStatusRegisterForm" 
            v-if="!isLoginForm && !isRegisterForm && isLogin && page === 'home'"
            @logout="logout"
            :dataUserLogin="dataUserLogin"
            :taskList="taskList"
            :categoryList="categoryList"
            :filterBacklog="filterBacklog"
            :filterTodo="filterTodo"
            :filterDoing="filterDoing"
            :filterDone="filterDone"
            @addKanban="addKanban"
            @edit="fetchTaskDetail"
            @deleteTask="deleteTask"
            @next="next"
            @prev="prev"
            :detailTask="detailTask"
            @editKanban="editKanban">
        </Home>
    </div>
</template>

<script>
import axios from 'axios'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'

const baseUrl = "https://fancy-kanban-serv.herokuapp.com"

export default {
    name: "App",
    data() {
        return {
            isLoginForm: true,
            isRegisterForm: false,
            isLogin: false,
            dataUserLogin: "",
            taskList: null,
            categoryList: "",
            detailTask: {
                title: "",
                description: "",
                due_date: ""
            },
            page: 'login'
        }
    },
    components: {
        Home,
        Login,
        Register,
    },
    methods: {
        changeStatusRegisterForm(value) {
            this.isRegisterForm = value
            this.isLoginForm = !value
        },
        logout(value) {
            this.isLoginForm = value
            this.isRegisterForm = !value
            this.isLogin = !value
        },
        changeIsLogin(value) {
            this.isLogin = value
            this.isLoginForm = !value
        },
        changePage(value) {
            this.page = value
        },
        login(data) {
            axios({
                method: 'POST',
                url: baseUrl + "/login",
                data: {
                    email: data.email,
                    password: data.password
                }
            })
            .then(({data}) => {
                localStorage.setItem("access_token", data.access_token)
                localStorage.setItem("email", data.email)
                this.dataUserLogin = data.email
                this.changeIsLogin(true)
                this.changePage('home')
                this.getCategory()
                this.fetchData()
                this.$vToastify.success("you are logged in")
            })
            .catch(error => {
                this.$vToastify.error(error.response.data.message)
            })
        },
        googleSignIn(id_token) {
            axios({
                method: 'POST',
                url: baseUrl + "/googleLogin",
                data: {
                    id_token: id_token
                }
            })
            .then(({data}) => {
                localStorage.setItem("access_token", data.access_token)
                localStorage.setItem("email", data.email)
                this.dataUserLogin = data.email
                this.changeIsLogin(true)
                this.changePage('home')
                this.getCategory()
                this.fetchData()
                this.$vToastify.success("you are logged in")
            })
            .catch(error => {
                this.$vToastify.error(error.response.data.message)
            })
        },
        register(data) {
            axios({
                method: 'POST',
                url: baseUrl + "/register",
                data: {
                    username: data.username,
                    email: data.email,
                    password: data.password
                }
            })
            .then(response => {
                this.isLogin = false
                this.isRegisterForm = false
                this.isLoginForm = true
                this.$vToastify.success("succes register you can login now")
            })
            .catch(error => {
                this.$vToastify.error(error.response.data.message.join(", "))
            })
        },
        fetchData() {
            axios({
                method: 'GET',
                url: baseUrl + "/tasks",
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(({data}) => {
                this.taskList = data
            })
            .catch(error => {
                console.log(error.response.data)
            }) 
        },
        fetchTaskDetail(id) {
            axios({
                method: 'GET',
                url: baseUrl + "/tasks/" + id,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(({data}) => {
                this.detailTask = data
            })
            .catch(error => {
                console.log(error.response.data)
            }) 
        },
        deleteTask(id){
            axios({
                method: 'DELETE',
                url: baseUrl + "/tasks/" + id,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(({data}) => {
                this.fetchData()
                this.changePage('home')
                this.$vToastify.success("succes delete task")
            })
            .catch(error => {
                this.$vToastify.error(error.response.data.message)
            })
        },
        next(id) {
            axios({
                method: 'GET',
                url: baseUrl + "/tasks/" + id,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(({data}) => {
                axios({
                    method: 'PATCH',
                    url: baseUrl + "/tasks/" + id,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                    data: {
                        CategoryId: data.CategoryId += 1
                    }
                })
                .then(({data}) => {
                    this.fetchData()
                    this.changePage('home')
                })
                .catch(error => {
                    console.log(error.response.data)
                })
            })
            .catch(error => {
                this.$vToastify.error(error.response.data.message)
            })
        },
        prev(id) {
            axios({
                method: 'GET',
                url: baseUrl + "/tasks/" + id,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(({data}) => {
                axios({
                    method: 'PATCH',
                    url: baseUrl + "/tasks/" + id,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                    data: {
                        CategoryId: data.CategoryId -= 1
                    }
                })
                .then(({data}) => {
                    this.fetchData()
                    this.changePage('home')
                })
                .catch(error => {
                    console.log(error.response.data)
                })
                
            })
            .catch(error => {
                this.$vToastify.error(error.response.data.message)
            })
            
        },
        getCategory() {
            axios({
                method: 'GET',
                url: baseUrl + "/category",
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(({data}) => {
                this.categoryList = data
            })
            .catch(error => {
                console.log(error.response.data)
            }) 
        },
        addKanban(data) {
            axios({
                method: 'POST',
                url: baseUrl + "/tasks",
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: {
                    title: data.title,
                    description: data.description,
                    due_date: data.due_date
                }
            })
            .then(({data}) => {
                this.taskList = data
                this.fetchData()
                this.changePage('home')
                this.$vToastify.success("success add task")
            })
            .catch(error => {
                this.$vToastify.error(error.response.data.message.join(', '))
            }) 
        },
        editKanban() {
            axios({
                method: 'PUT',
                url: baseUrl + "/tasks/" + this.detailTask.id,
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: {
                    title: this.detailTask.title,
                    description: this.detailTask.description,
                    due_date: this.detailTask.due_date
                }
            })
            .then(({data}) => {
                this.fetchData()
                this.changePage('home')
                this.$vToastify.success("success edit task")
            })
            .catch(error => {
                this.$vToastify.error(error.response.data.message.join(', '))
            })
        }
    },
    created() {
        if (localStorage.access_token || localStorage.email) {
            this.changeIsLogin(true)
            this.changePage('home')
            this.getCategory()
            this.fetchData()
            this.dataUserLogin = localStorage.email
        } else {
            this.changeIsLogin(false)
        }
    },
    computed: {
        filterBacklog :function() {
            return this.taskList ? this.taskList.filter(i => i.Category.name === 'Backlog') : []
        },
        filterTodo :function() {
            return this.taskList ? this.taskList.filter(i => i.Category.name === 'Todo') : []
        },
        filterDoing :function() {
            return this.taskList ? this.taskList.filter(i => i.Category.name === 'Doing') : []
        },
        filterDone :function() {
            return this.taskList ? this.taskList.filter(i => i.Category.name === 'Done') : []
        }
    }
}

</script>

<style>
    @import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css);
    @import url(https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.4.3/css/mdb.min.css);

    *{
        margin: 0;
        padding: 0;
    }

    .card-body:hover {
        box-shadow: 0 0 11px rgba(33,33,33,.2);
    }

    #google-button{
        margin: 0.8em;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    #edit-button{
        margin: 0.8em;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;
    }

    .container1{
        display: flex;
        flex-direction: flex;
        justify-content: space-evenly;
        align-items: flex-start;

    }

    input{
        color: #fff;
    }

    .rounded1{
        border-radius: 0.8rem;
    }

    .hm-gradient {
        background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
    }

    .darken-grey-text {
        color: #2E2E2E;
    }

    .navbar .dropdown-menu a:hover {
        color: #616161 !important;
    }

    .darken-grey-text {
        color: #2E2E2E;
    }

    .carousel-item h1 
    {
    color:#fff;
    font-size: 20px;
        margin: 75px auto;
        text-align: center;
    }
    .login-block 
    {

        width: 50%;
        margin: 0 auto;

    }
    .signup__overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.76); 
        background-color: rgba(0, 0, 0, 0.33);
    }
    .login_sec {

        padding: 0px;
        background-color: #f8fafb;

    }
    .login_sec img {

        margin: 24px auto;

    }
    .banner-sec {
        background: url(./img/fox.png) no-repeat center;
        background-size: cover;
        min-height: 500px;
        border-radius: 0 10px 10px 0;
        padding: 0;
    }

    .carousel-fade .carousel-item {
        opacity: 0;
        transition-duration: .6s;
        transition-property: opacity;
    }

    .carousel-indicators {

        bottom: -41px;
    }

    .carousel-indicators .active {
        background-color: #fff;
    }

    .carousel-fade .carousel-item.active,
    .carousel-fade .carousel-item-next.carousel-item-left,
    .carousel-fade .carousel-item-prev.carousel-item-right {
        opacity: 1;
    }

    .carousel-fade .active.carousel-item-left,
    .carousel-fade .active.carousel-item-right {
        opacity: 0;
    }

    .carousel-fade .carousel-item-next,
    .carousel-fade .carousel-item-prev,
    .carousel-fade .carousel-item.active,
    .carousel-fade .active.carousel-item-left,
    .carousel-fade .active.carousel-item-prev {
        transform: translateX(0);
        transform: translate3d(0, 0, 0);
    }

    .container {

    -webkit-box-shadow: 0 0.1875rem 1.5rem rgba(0, 0, 0, 0.2);
    box-shadow: 0 0.1875rem 1.5rem rgba(0, 0, 0, 0.2);
    border-radius: 0.375rem;
    margin-bottom: 5%;

    }

    .carousel-inner {
        border-radius: 0 10px 10px 0;
    }

    .carousel-caption {
        text-align: left;
        left: 5%;
    }

    .login-sec {
        padding: 50px 30px;
        position: relative;
    }

    .login-sec .copy-text {
        position: absolute;
        width: 80%;
        bottom: 20px;
        font-size: 13px;
        text-align: center;
    }



    .login-sec h2 {
        margin-bottom: 30px;
        font-weight: 800;
        font-size: 30px;
    }

    .login-sec h2:after {
        content: " ";
        width: 100px;
        height: 5px;
        display: block;
        margin-top: 8px;
        border-radius: 3px;
        margin-left: auto;
        margin-right: auto
    }


    .banner-text {
        width: 70%;
        position: absolute;
        bottom: 40px;
        padding-left: 20px;
    }

    .banner-text h2 {
        color: #fff;
        font-weight: 600;
    }

    .banner-text h2:after {
        content: " ";
        width: 100px;
        height: 5px;
        background: #FFF;
        display: block;
        margin-top: 20px;
        border-radius: 3px;
    }

    .banner-text p {
        color: #fff;
    }



    /* login start */

    .container-login100-form-btn {
        margin: 0 auto;
        display: block;
        text-align: center;
        padding-top: 1%;
        padding-bottom: 2%;
    }

    .login100-form {
        width: 100%;
    }


    .validate-input {
        position: relative;
    }

    .wrap-input100 {
        width: 100%;
        position: relative;
        border-bottom: 2px solid #d9d9d9;
        margin-bottom: 5%;
    }

    .label-input100 {

        font-size: 14px;
        color: #333333;
        line-height: 1.5;
        padding-left: 7px;
    }

    textarea:focus,
    input:focus {
        border-color: transparent !important;
    }

    .input100:focus+.focus-input100::before {
        width: 100%;
    }



    .input100 {
        font-size: 12px;
        color: #333333;
        line-height: 1.2;
        display: block;
        width: 100%;
        height: 30px;
        background: transparent;
        padding: 0 7px 0 43px;
    }

    .focus-input100 {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
    }

    .focus-input100::before {
        content: "";
        display: block;
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: #7f7f7f;
        -webkit-transition: all 0.4s;
        -o-transition: all 0.4s;
        -moz-transition: all 0.4s;
        transition: all 0.4s;
    }

    .focus-input100::after {
        font-family: "FontAwesome";
        content: "\f007";
        color: #adadad;
        font-size: 22px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        height: calc(100% - 20px);
        bottom: 0;
        left: 0;
        padding-left: 13px;
        padding-top: 3px;
    }

    .focus-input100.password::after {
        font-family: "FontAwesome";
        content: "\f023";
        color: #adadad;
        font-size: 22px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        height: calc(100% - 20px);
        bottom: 0;
        left: 0;
        padding-left: 13px;
        padding-top: 3px;
    }

    input {
        outline: none;
        border: none;
    }



    .flex-c-m {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        -ms-align-items: center;
        align-items: center;
    }

    .login100-social-item {
        font-size: 12px;
        color: #fff;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        margin: 5px;
    }

    .bg1 {
        background-color: #3b5998;
    }


    .bg3 {
        background-color: #ea4335;
    }


    /* register start */

    .register-block 
    {

        width: 50%;
        margin: 0 auto;

    }

    .register_sec {

        padding: 0px;
        background-color: #f8fafb;

    }
    .register_sec img {

        margin: 24px auto;

    }

    .register-sec {
        padding: 50px 30px;
        position: relative;
    }

    .register-sec .copy-text {
        position: absolute;
        width: 80%;
        bottom: 20px;
        font-size: 13px;
        text-align: center;
    }

    .register-sec h2 {
        margin-bottom: 30px;
        font-weight: 800;
        font-size: 30px;
    }

    .register-sec h2:after {
        content: " ";
        width: 100px;
        height: 5px;
        display: block;
        margin-top: 8px;
        border-radius: 3px;
        margin-left: auto;
        margin-right: auto
    }


    .container-register100-form-btn {
        margin: 0 auto;
        display: block;
        text-align: center;
        padding-top: 1%;
        padding-bottom: 2%;
    }

    .register100-form {
        width: 100%;
    }


    .validate-input {
        position: relative;
    }

    .wrap-input100 {
        width: 100%;
        position: relative;
        border-bottom: 2px solid #d9d9d9;
        margin-bottom: 5%;
    }

    .label-input100 {

        font-size: 14px;
        color: #333333;
        line-height: 1.5;
        padding-left: 7px;
    }

    textarea:focus,
    input:focus {
        border-color: transparent !important;
    }

    .input100:focus+.focus-input100::before {
        width: 100%;
    }

    .input100 {
        font-size: 12px;
        color: #333333;
        line-height: 1.2;
        display: block;
        width: 100%;
        height: 30px;
        background: transparent;
        padding: 0 7px 0 43px;
    }

    .focus-input100 {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
    }

    .focus-input100::before {
        content: "";
        display: block;
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: #7f7f7f;
        -webkit-transition: all 0.4s;
        -o-transition: all 0.4s;
        -moz-transition: all 0.4s;
        transition: all 0.4s;
    }

    .focus-input100::after {
        font-family: "FontAwesome";
        content: "\f007";
        color: #adadad;
        font-size: 22px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        height: calc(100% - 20px);
        bottom: 0;
        left: 0;
        padding-left: 13px;
        padding-top: 3px;
    }

    .focus-input100.password::after {
        font-family: "FontAwesome";
        content: "\f023";
        color: #adadad;
        font-size: 22px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        height: calc(100% - 20px);
        bottom: 0;
        left: 0;
        padding-left: 13px;
        padding-top: 3px;
    }

    input {
        outline: none;
        border: none;
    }



    .flex-c-m {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        -ms-align-items: center;
        align-items: center;
    }

    .register100-social-item {
        font-size: 12px;
        color: #fff;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        margin: 5px;
    }

    .bg1 {
        background-color: #3b5998;
    }


    .bg3 {
        background-color: #ea4335;
    }
</style>