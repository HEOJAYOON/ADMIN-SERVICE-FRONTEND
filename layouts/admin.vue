<template>
  <v-app>
    <Sidebar />
    <AdminHeader />
    <v-main class="admin-main">
      <div class="content-scroll">
        <NuxtPage />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Sidebar from '@/components/sidebar/Sidebar.vue'
import AdminHeader from './AdminHeader.vue'
</script>


<style scoped>
.admin-main {
  padding-top: 64px; /* 헤더 높이만큼 밀어줌 */
  height: 100vh;
  overflow: hidden; /* 전체 페이지 스크롤 막기 */
  position: relative;
}

.content-scroll {
  height: calc(100vh - 64px); /* 헤더 높이 뺀 나머지 영역 */
  overflow-y: auto; /* 여기만 스크롤 */
  padding: 24px;
}

.v-main {
  overflow: hidden;
}
</style>