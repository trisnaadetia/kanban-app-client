<template>
    <div>
        <Navbar @logout="logout" :dataUserLogin="dataUserLogin"></Navbar>
        <div>
            <button type="button" class="btn btn-primary m-3" data-bs-toggle="modal" data-bs-target="#exampleModal1">Add Task Here</button>
        </div>
        <div class="container1 mt-3">
            <Category :taskList="taskList"
            v-for="category in categoryList" :key="category.id" :categoryList="category"
            :filterBacklog="filterBacklog"
            :filterTodo="filterTodo"
            :filterDoing="filterDoing"
            :filterDone="filterDone"
            @edit="edit"
            @deleteTask="deleteTask"
            @next="next"
            @prev="prev"
            :detailTask="detailTask"
            @editKanban="editKanban"
            :dataUserLogin="dataUserLogin">
            </Category>
        </div>
        <ModalAdd @addKanban="addKanban"
        ></ModalAdd>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Category from '../components/Category'
import ModalAdd from '../components/ModalAdd'
export default {
    name: "Home",
    data() {
        return {
            
        }
    },
    components: {
        Navbar,
        Category,
        ModalAdd
    },
    methods: {
        logout(data) {
            this.$emit("logout", data)
        },
        addKanban(data) {
            this.$emit("addKanban", data)
        },
        edit(id) {
            this.$emit("edit", id)
        },
        deleteTask(id) {
            this.$emit("deleteTask", id)
        },
        next(id) {
            this.$emit("next", id)
        },
        prev(id) {
            this.$emit("prev", id)
        },
        editKanban() {
            this.$emit("editKanban")
        }
    },
    props: ["dataUserLogin", "taskList", "categoryList", 
        "filterBacklog", "filterTodo", "filterDoing", "filterDone", "detailTask"
    ]
}
</script>

<style>

</style>