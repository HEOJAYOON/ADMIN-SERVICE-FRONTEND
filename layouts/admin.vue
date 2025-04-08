<template>
  <v-app>
    <Sidebar />
    <v-main>
      <div class="layout-content">
        <slot /> <!-- 페이지들이 여기 렌더됨 -->
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Sidebar from '@/components/sidebar/Sidebar.vue'
</script>

<style scoped>
.layout-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
