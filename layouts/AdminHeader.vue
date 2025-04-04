<template>
    <header class="admin-header">
          <div class="right-section">
            <!-- 🌙 다크모드 토글 -->
            <v-btn icon variant="text" @click="toggleDark">
              <v-icon>{{ isDark ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}</v-icon>
            </v-btn>
      
            <!-- 🔔 알림 아이콘 -->
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
      
            <!-- 👤 유저 아이디 드롭다운 -->
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
                <v-list-item @click="goTo('/dashboard')">
                  <v-list-item-title>대시보드</v-list-item-title>
                </v-list-item>
                <v-list-item @click="goTo('/meta')">
                  <v-list-item-title>메타서비스</v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout">
                  <v-list-item-title>로그아웃</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </header>
</template>
  
  
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const router = useRouter()
const { global: theme } = useTheme()
const hasNotifications = ref(true) // 기본값: 알림 있음

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
</script>
  

<style scoped>
.admin-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  color: white;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 12px;
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
</style>
    