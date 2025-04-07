<template>
  <ClientOnly>
    <header class="admin-header">
      <div class="title-wrap">
        <v-icon class="mr-2" color="primary">{{ icon }}</v-icon>
        <h1 class="text-h6 font-weight-bold">{{ title }}</h1>
      </div>
      <div class="right-section d-flex align-center gap-4">
        <!-- 기존 컨트롤 버튼들 -->
        <v-btn icon variant="text" @click="toggleDark">
          <v-icon>{{ isDark ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}</v-icon>
        </v-btn>
        <v-btn icon variant="text" class="notification-btn">
          <v-badge
            color="red"
            dot
            offset-x="4"
            offset-y="4"
            :content="''"
            :model-value="hasNotifications"
          >
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>
        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn v-bind="props" variant="text" class="user-id-button">
              <span class="user-id">{{ user.id }}</span>
              <v-icon size="16">mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="goTo('/profile')">
              <v-list-item-title>내 프로필</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>로그아웃</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </header>
  </ClientOnly>
</template>
  
  
<script setup lang="ts">

import { useRoute, useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import { ref, computed } from 'vue'

const router = useRouter()
const route = useRoute()


const title = computed(() => route.meta.title || '')
const icon = computed(() => route.meta.icon || 'mdi-file-document-outline')

const { global: theme } = useTheme()
const hasNotifications = ref(true)

const isDark = computed(() => theme.name.value === 'dark')
const toggleDark = () => {
  theme.name.value = theme.name.value === 'dark' ? 'light' : 'dark'
}

const user = {
  id: 'admin123'
}

const goTo = (path: string) => {
  router.push(path)
}

const logout = () => {
  alert('로그아웃!')
}

console.log(title.value)
</script>

  

<style scoped>
.admin-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  margin: 10px;
  z-index: 999;
}


.right-section {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #212121;
  border-radius: 20px;
  padding: 8px 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}

.user-id-button {
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  text-transform: none;
}

.user-id {
  margin-right: 6px;
}

.title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  /* Sidebar 너비만큼 밀어줌 */
  margin-left: 270px;
}
</style>
    