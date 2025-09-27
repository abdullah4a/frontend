<template>
    <div>
        <!-- Task Table -->
        <DataTable title="Tasks" :columnDefs="defTaskColumns" :rowData="tasks" />
    </div>
</template>

<script setup lang="ts">

import DataTable from '../DataTable.vue';

const defTaskColumns = [
    { field: "title" },
    { field: "description" },
    { field: "status" },
    { field: "priority" },
    { field: "createdAt" },
]

const tasks = [
    { title: "Task 1", description: "Description 1", status: "Pending", priority: "High", createdAt: "2024-01-01" },
    { title: "Task 2", description: "Description 2", status: "In Progress", priority: "Medium", createdAt: "2024-01-02" },
    { title: "Task 3", description: "Description 3", status: "Completed", priority: "Low", createdAt: "2024-01-03" },
];
</script>

<style scoped></style>