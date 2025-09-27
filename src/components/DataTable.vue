<template>
  <div class="q-pa-md">
    <div v-if="title" class="text-h6 q-mb-md">
      {{ title }} 
      <!-- Add Refresh button -->
        <q-btn flat round dense color="primary" icon="refresh" @click="emit('refresh-records')" />
    </div>

    <QTable
      :rows="rows"
      :columns="columns"
      row-key="id"
      flat
      bordered
      :pagination="pagination"
      :loading="loading"
      @row-click="emitSelectedRow"
    >
      <!-- header slot to align headers -->
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            style="text-align: left;"
          >
            <strong>
                {{ col.label }}
            </strong>
          </q-th>
        </q-tr>
      </template>

      <!-- body cell slots -->
      <template v-for="col in columns" v-slot:[`body-cell-${col.name}`]="props">
        <!-- eslint-disable-next-line vue/valid-v-for -->
        <q-td :props="props" style="text-align: left;">
          <!-- Pass to parent slot, fallback to default field value -->
          <slot :name="`body-cell-${col.name}`" v-bind="props">
            <!-- @vue-ignore -->
            {{ props.row[col.field] }}
          </slot>
        </q-td>
      </template>
    </QTable>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { QTableProps } from 'quasar'
import { QTable, QTr, QTh, QTd, QBtn } from 'quasar'

const emit = defineEmits<{
  (e: 'row-click', row: any): void,
  (e: 'refresh-records'): void
}>()

interface Props {
  title?: string
  columns: QTableProps['columns']
  rows: QTableProps['rows']
  loading?: boolean
}

defineProps<Props>()

function emitSelectedRow(evt: Event, row: any) {
  emit("row-click", { ...row });
}


const pagination = {
  rowsPerPage: 10
}
</script>
