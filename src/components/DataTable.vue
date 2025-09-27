<template>
  <div class="w-full">
    <!-- Table Title -->
    <div v-if="title" class="mb-2 text-lg font-semibold text-gray-700">
      {{ title }}
    </div>

    <!-- AG Grid -->
    <div class="ag-theme-alpine" style="height: 100%; width: 100%">
      <ag-grid-vue
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        :rowData="rowData"
        :pagination="pagination"
        :paginationPageSize="paginationPageSize"
        :defaultColDef="defaultColDef"
        :rowSelection="rowSelection"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { defineProps } from "vue";

defineProps({
  title: {
    type: String,
    default: "",
  },
  columnDefs: {
    type: Array,
    required: true,
  },
  rowData: {
    type: Array,
    default: () => [],
  },
  pagination: {
    type: Boolean,
    default: true,
  },
  paginationPageSize: {
    type: Number,
    default: 10,
  },
  rowSelection: {
    type: String,
    default: "single", // "multiple" also works
  },
});

const defaultColDef = {
  sortable: true,
  filter: true,
  resizable: true,
};
</script>
