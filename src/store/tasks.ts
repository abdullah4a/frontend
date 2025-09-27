// stores/task.ts
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import apiClient from "@/config/axios";
import { Task } from "@/utils/types/task";

const STORAGE_KEY = "task_store";
const FETCH_COOLDOWN = 60 * 1000; // 1 minute in ms

export const useTaskStore = defineStore("task", () => {
  // state
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const lastFetched = ref<number | null>(null);

  // Load from localStorage on init
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      tasks.value = parsed.tasks || [];
      lastFetched.value = parsed.lastFetched || null;
    } catch (e) {
      console.error("Failed to parse local storage", e);
    }
  }

  // Persist whenever tasks/lastFetched change
  watch([tasks, lastFetched], () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        tasks: tasks.value,
        lastFetched: lastFetched.value,
      })
    );
  }, { deep: true });

  // actions
  async function fetchTasks(force = false) {
    // If data is fresh (within cooldown), skip fetch
    if (
      !force &&
      lastFetched.value &&
      Date.now() - lastFetched.value < FETCH_COOLDOWN &&
      tasks.value.length > 0
    ) {
      return;
    }

    loading.value = true;
    error.value = null;
    try {
      const { data } = await apiClient.get("/tasks/");
      tasks.value = data.data || [];
      lastFetched.value = Date.now();
    } catch (err: any) {
      error.value = err.message || "Failed to fetch tasks";
    } finally {
      loading.value = false;
    }
  }

  async function createTask(task: Partial<Task>) {
    const { data } = await apiClient.post("/tasks/", task);
    const results = data.data as Task;
    tasks.value.unshift(results);
  }

  async function updateTask(id: string, task: Partial<Task>) {
    const { data } = await apiClient.put(`/tasks/${id}/`, task);
    const index = tasks.value.findIndex((t) => t._id === id);
    if (index !== -1) tasks.value[index] = data.data;
  }

  async function deleteTask(id: string) {
    await apiClient.delete(`/tasks/${id}/`);
    tasks.value = tasks.value.filter((t) => t._id !== id);
  }

  return {
    tasks,
    loading,
    error,
    lastFetched,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
});
