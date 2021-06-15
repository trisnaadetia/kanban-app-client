<template>
    <div class="card-body">
        <div class="card text-dark bg-light shadow-lg">
            <div class="card-header">
                <div class="row">
                    <div class="col-sm">
                    </div>
                    <div class="col-sm offset-3">
                        <a href="#" class="m-1" :data-bs-toggle="dataUserLogin === taskList.User.email && 'modal'" 
                        :data-bs-target="dataUserLogin === taskList.User.email && '#exampleModal2'" @click.prevent="edit(taskList.id)"><img src="../img/edit.png" alt="edit" width="25rem" height="25rem"></a>
                        <a href="#" class="m-1" @click.prevent="deleteTask(taskList.id)"><img src="../img/delete.png" alt="edit" width="25rem" height="25rem"></a>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-text text-dark"><strong>Title:</strong></h5>
                <p>{{taskList.title}}</p>
                <h5 class="card-text text-dark"><strong>Description:</strong></h5>
                <p>{{taskList.description}}</p>
                <h5 class="card-text text-dark"><strong>Deadline:</strong></h5>
                <p>{{taskList.due_date.substring(0,10)}}</p>
                <div class="m-2">
                    <img src="../img/person.png" alt="person" width="20rem" height="20rem">
                    <p class="card-text text-dark m-0 d-inline">{{taskList.User.username}}</p>
                </div>
                <div class="m-2">
                    <img src="../img/email.png" alt="email" width="20rem" height="20rem">
                    <p class="card-text text-dark m-0 mb-2 d-inline">{{taskList.User.email}}</p>
                </div>
                <div v-if="typeButton === 1">
                    <a href="#" class="d-block d-flex justify-content-end mt-3" @click.prevent="next(taskList.id)"><img src="../img/next.png" alt="" width="50rem" height="50rem"></a>
                </div>
                <div class= "row mt-3" v-if="typeButton === 2">
                    <div class="col-1">
                    <a href="#" class="" @click.prevent="prev(taskList.id)"><img src="../img/prev.png" alt="" width="50rem" height="50rem"></a>
                    </div>
                    <div class="col-2 offset-7">
                        <a href="#" class="" @click.prevent="next(taskList.id)"><img src="../img/next.png" alt="" width="50rem" height="50rem"></a>
                    </div>
                </div>
                <div v-if="typeButton === 3">
                    <a href="#" class="d-block d-flex justify-content-start mt-3" @click.prevent="prev(taskList.id)"><img src="../img/prev.png" alt="" width="50rem" height="50rem"></a>
                </div>
            </div>
        </div>
        <ModalEdit :detailTask="detailTask" @editKanban="editKanban" :dataUserLogin="dataUserLogin"></ModalEdit>
    </div>
</template>

<script>
import ModalEdit from './ModalEdit'
export default {
    name: "Card",
    props: ["typeButton", "taskList", "detailTask", "dataUserLogin"],
    methods: {
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
    components: {
        ModalEdit
    }
}
</script>

<style>

</style>