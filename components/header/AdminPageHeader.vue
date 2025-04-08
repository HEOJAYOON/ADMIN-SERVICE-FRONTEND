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
  justify-content: space-between;
  position: relative;
}

.left-section,
.right-section {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.center-section {
  min-width: 300px;
  position: absolute;
  left: 45%;
  transform: translateX(-45%);
  display: flex;
  align-items: center;
  margin-top: 20px;
}


  </style>
  