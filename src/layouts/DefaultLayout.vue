<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header -->
    <q-header elevated>
      <q-toolbar>
        <!-- Hamburger Menu (mobile) -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          class="q-mr-sm"
        />
        <q-space></q-space>
        <div class="row items-center no-wrap q-gutter-sm">
            <q-icon name="settings" :disabled="true"></q-icon>
        <q-icon name="notifications" :disabled="true"></q-icon>
        <q-icon name="person" :disabled="true"></q-icon>

        </div>
        </q-toolbar>
    </q-header>

    <!-- Drawer (Mobile Nav) -->
    <q-drawer v-model="leftDrawerOpen" behavior="mobile" bordered>
        <q-toolbar>
            <q-toolbar-title>
              Task Manager
            </q-toolbar-title>
        </q-toolbar>
      <q-list>
        <q-item clickable v-ripple to="/" @click="leftDrawerOpen = false">
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/tasks" @click="leftDrawerOpen = false">
          <q-item-section>Tasks</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/about" @click="leftDrawerOpen = false">
          <q-item-section>About</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Main Content -->
    <q-page-container class="container-fluid q-px-xl">
      <router-view />
    </q-page-container>

    <!-- Footer -->
    <q-footer class="bg-primary text-white" elevated>
      <q-toolbar class="justify-center">
        <span>&copy; 2025 Task Manager. Built with Vue.js + Quasar</span>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QLayout, QHeader, QToolbar, QToolbarTitle, QBtn, QDrawer, QList, QItem, QItemSection, QPageContainer, QFooter, QSpace, QIcon, QImg } from 'quasar'

const leftDrawerOpen = ref(false)
</script>