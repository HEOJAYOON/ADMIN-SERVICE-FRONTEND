<template>
  <v-app>
    <Sidebar />

    <v-main>
      <v-app-bar>EGIS 관리자 페이지</v-app-bar>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Sidebar from '@/components/sidebar/Sidebar.vue'
</script>
