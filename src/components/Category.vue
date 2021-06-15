<template>
    <div class="col-3" v-if="categoryList.name === 'Backlog'">
        <div class="card shadow-lg bg-white rounded1" style="max-width: 25vw;">
            <h4 class="text-center mt-2">{{categoryList.name}}</h4>
            <hr>
            <div style="overflow: scroll;max-height: 100vh;">
                <Card :typeButton="1" v-for="task in filterBacklog" :key="task.id" @edit="edit"
                :taskList="task" @deleteTask="deleteTask" @next="next" :detailTask="detailTask"
                @editKanban="editKanban" :dataUserLogin="dataUserLogin"></Card>
            </div>
        </div>
    </div>
    <div class="col-3" v-else-if="categoryList.name === 'Todo'">
        <div class="card shadow-lg bg-info rounded1" style="max-width: 25vw;overflow: scroll;max-height: 100vh;">
            <h4 class="text-center mt-2">{{categoryList.name}}</h4>
            <hr>
            <div style="overflow: scroll;max-height: 100vh;">
                <Card :typeButton="2" v-for="task in filterTodo" :key="task.id" @edit="edit"
                :taskList="task" @deleteTask="deleteTask" @next="next" @prev="prev" :detailTask="detailTask"
                @editKanban="editKanban" :dataUserLogin="dataUserLogin"></Card>
            </div>
        </div>
    </div>
    <div class="col-3" v-else-if="categoryList.name === 'Doing'">
        <div class="card shadow-lg bg-warning rounded1" style="max-width: 25vw;overflow: scroll;max-height: 100vh;">
            <h4 class="text-center mt-2">{{categoryList.name}}</h4>
            <hr>
            <div style="overflow: scroll;max-height: 100vh;">
                <Card :typeButton="2" v-for="task in filterDoing" :key="task.id" @edit="edit"
                :taskList="task" @deleteTask="deleteTask" @next="next" @prev="prev" :detailTask="detailTask"
                @editKanban="editKanban" :dataUserLogin="dataUserLogin"></Card>
            </div>
        </div>
    </div>
    <div class="col-3" v-else-if="categoryList.name === 'Done'">
        <div class="card shadow-lg bg-success rounded1" style="max-width: 25vw;overflow: scroll;max-height: 100vh;">
            <h4 class="text-center mt-2">{{categoryList.name}}</h4>
            <hr>
            <div style="overflow: scroll;max-height: 100vh;">
                <Card :typeButton="3" v-for="task in filterDone" :key="task.id" @edit="edit"
                :taskList="task" @deleteTask="deleteTask" @prev="prev" :detailTask="detailTask"
                @editKanban="editKanban" :dataUserLogin="dataUserLogin"></Card>
            </div>
        </div>
    </div>
</template>

<script>
import Card from '../components/Card'
export default {
    name: "Category",
    components: {
        Card
    },
    props: ["taskList", "categoryList", "filterBacklog", 
        "filterTodo", "filterDoing", "filterDone", "detailTask", "dataUserLogin"
    ],
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
    }
}
</script>

<style>

</style>