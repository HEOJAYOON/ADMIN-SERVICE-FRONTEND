<template>
  <header class="admin-page-header">
    <div class="left-section">
      <slot name="left" />
    </div>
    <div class="center-section">
      <slot name="center" />
    </div>
    <div class="right-section">
      <AdminHeader />
    </div>
  </header>
</template>
  
  <script setup>
  import AdminHeader from './AdminHeader.vue'
  </script>
  
  <style scoped>
.admin-page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.left-section,
.right-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.center-section {
  display: flex;
  justify-content: center;
  width: 300px;
}
  </style>
  