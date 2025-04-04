<template>
  <ClientOnly>
    <v-navigation-drawer
      app
      permanent
      :width="sidebarWidth"
      class="admin-sidebar"
    >
      <template #prepend>
        <div class="sidebar-logo">
          <v-img
            src="/image/main-logo-img.png"
            alt="EGIS Admin"
            width="80%"
            contain
            class="logo-img"
          />
          <div class="admin-label">
            <v-icon class="admin-icon" size="16">mdi-shield-account</v-icon>
            <span class="admin-text">Admin</span>
          </div>
        </div>
      </template>
      <v-list nav dense>
        <SidebarItem
          v-for="(item, index) in sidebarItems"
          :key="index"
          :item="item"
          :level="0"
        />
      </v-list>
    </v-navigation-drawer>
  </ClientOnly>
</template>


<script setup lang="ts">
import SidebarItem from '@/components/sidebar/SidebarItem.vue'
import { sidebarItems } from '@/constants/menu'

const sidebarWidth = ref(270) // 기본값

</script>


<style scoped>
.admin-sidebar {
  background-color: #212121;
  color: white;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  position: relative;
  user-select: none;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 13px;
  background-color: #212121;
}

.logo-img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.admin-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  padding: 4px 10px;
  background-color: #2071AF;
  border-radius: 12px;
  font-size: 13px;
  font-weight: bold;
  color: white;
  gap: 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}
::v-deep(.v-navigation-drawer__content)::-webkit-scrollbar {
  width: 3px;
}
::v-deep(.v-navigation-drawer__content)::-webkit-scrollbar-track {
  background: transparent;
}
::v-deep(.v-navigation-drawer__content)::-webkit-scrollbar-thumb {
  background-color: #666; 
  border-radius: 4px;
}

</style>
