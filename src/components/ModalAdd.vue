<template>
    <!-- Modal -->
    <div>
        <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title text-center" id="exampleModalLabel">Add Task</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="title" class="form-label">Title:</label>
                            <input type="text" class="" id="title" v-model="title" style="color: black;">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description:</label>
                            <input type="text" class="" id="description" v-model="description" style="color: black;">
                        </div>
                        <div class="mb-3">
                            <label for="deadline" class="form-label">Deadline:</label>
                            <input type="date" class="" id="deadline" v-model="due_date" style="color: black;">
                        </div>
                        <div>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click.prevent="addKanban">Add</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalAdd',
    data() {
        return {
            title: "",
            description: "",
            due_date: ""
        }
    },
    methods: {
        addKanban(data) {
            this.$emit("addKanban", {
                title: this.title,
                description: this.description,
                due_date: this.due_date
            })
            this.title = ""
            this.description = ""
            this.due_date = ""

        },
    }

}
</script>

<style>

</style>