<template>
    <div>
        <div class="flex flex-row justify-end">
            <!-- Add Task Button -->
            <q-btn icon="add" color="primary" class="q-mt-md" round @click="openCreateDialog" />
        </div>
        <!-- Table -->
        <DataTable title="Task List" :columns="columns" :rows="taskStore.tasks" :loading="taskStore.loading"
            @row-click="handleRowClick" @refresh-records="getAllTasks">
            <!-- Custom cell for completed -->
            <template #body-cell-completed="{ row }">
                <q-chip :color="row.completed ? 'green' : 'red'" text-color="white" dense>
                    {{ row.completed ? 'Yes' : 'No' }}
                </q-chip>
            </template>

            <!-- Custom cell for priority -->
            <template #body-cell-priority="{ row }">
                <q-badge :color="row.priority === 'High'
                    ? 'red'
                    : row.priority === 'Medium'
                        ? 'orange'
                        : 'blue'" :label="row.priority" />
            </template>

            <!-- Example: formatted createdAt -->
            <template #body-cell-createdAt="{ row }">
                {{ new Date(row.createdAt).toLocaleDateString() }}
            </template>
        </DataTable>


        <!-- Dialog -->
        <q-dialog v-model="showModal" persistent>
            <q-card style="min-width: 400px">
                <!-- Title + Actions -->
                <q-card-section class="row items-center justify-between">
                    <div class="text-h6">
                        {{ isEditMode ? 'Edit Task' : 'Create Task' }}
                    </div>
                    <div>
                        <q-btn v-if="isEditMode" flat round dense color="negative" icon="delete" @click="deleteTask" />
                        <q-btn v-else flat round dense color="grey" icon="close" @click="showModal = false" />
                    </div>
                </q-card-section>

                <q-separator />

                <!-- Form -->
                <q-card-section>
                    <q-input v-model="formData.title" label="Title" outlined dense />
                    <q-input v-model="formData.description" label="Description" type="textarea" outlined dense
                        class="q-mt-sm" />
                    <q-select v-model="formData.priority" :options="priorityOptions" :emit-value="true" label="Priority"
                        outlined dense class="q-mt-sm" />
                    <q-toggle v-model="formData.completed" label="Completed" class="q-mt-sm" />
                </q-card-section>

                <q-separator />

                <!-- Actions -->
                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" @click="showModal = false" />
                    <q-btn flat label="Save" color="primary" @click="saveTask" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup lang="ts">
import DataTable from '../DataTable.vue'
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/store/tasks'
import {
    QBtn,
    QCard,
    QCardActions,
    QCardSection,
    QDialog,
    QInput,
    QSelect,
    QSeparator,
    QToggle,
    QChip,
    QBadge
} from 'quasar'
import { TASK as defaultTaskColumns } from '@/utils/defaultColumns'
import type { Task } from '@/utils/types/task'

// store
const taskStore = useTaskStore()

const showModal = ref(false)
const isEditMode = ref(false)

const formData = ref<Task>({
    _id: '',
    title: '',
    description: '',
    createdAt: '',
    completed: false,
    priority: 'low'
})

const columns = ref([...defaultTaskColumns])
const priorityOptions = ref([
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' }
])

onMounted(() => {
    getAllTasks()
})

// --- Handlers ---
const getAllTasks = async () => {
    await taskStore.fetchTasks()
}
function handleRowClick(row: Task) {
    isEditMode.value = true
    formData.value = { ...row }
    showModal.value = true
}

function openCreateDialog() {
    isEditMode.value = false
    formData.value = {
        _id: '',
        title: '',
        description: '',
        createdAt: new Date().toISOString(),
        completed: false,
        priority: 'low'
    }
    showModal.value = true
}

async function saveTask() {
    if (isEditMode.value && formData.value._id) {
        await taskStore.updateTask(formData.value._id, formData.value)
    } else {
        await taskStore.createTask({
            title: formData.value.title,
            description: formData.value.description,
            priority: formData.value.priority,
            completed: formData.value.completed
        })
    }
    showModal.value = false
}

async function deleteTask() {
    if (formData.value._id) {
        await taskStore.deleteTask(formData.value._id)
        showModal.value = false
    }
}
</script>
