<template>
  <v-app class="bg-background text-white dark:text-white">
    <Sidebar />
    <AdminHeader />
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Sidebar from '@/components/sidebar/Sidebar.vue'
import AdminHeader from './AdminHeader.vue'
</script>
