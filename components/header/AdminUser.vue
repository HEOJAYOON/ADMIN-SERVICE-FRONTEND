<!-- <script setup lang="ts">
import { useTheme } from 'vuetify';
// import { useAuthFetch } from '~/composables/useAuthFetch';
// import { useAuthStore } from '~/store/auth';

interface Member {
  memName: string;
  memId: string;
  memThumb: string;
  memEmail: string;
}

// const authStore = useAuthStore();

// const { data, error: memberError } = await useAuthFetch(`http://192.168.1.215:9090/api/v1/member/info/mid/${authStore.mid}`, {
//   method: 'GET'
// });

const member = data as Ref<Member | null>;

let user;

if (member.value) {
  user = {
    name: member.value.memName,
    id: member.value.memId,
    img: member.value.memThumb 
      ? "https://egiscloud.com" + member.value.memThumb 
      : "/image/main/icon_privacy_b1.png"
  };
} else {
  user = {
    name: "로그인 정보가 없습니다",
    email: "",
    img : "https://egiscloud.com/image/main/icon_privacy_b1.png",
  };
}

// Vuetify Theme 설정
const theme = useTheme();
const currentTheme = computed({
  get: () => theme.global.name.value,
  set: (value) => {
    theme.global.name.value = value;
  }
});

// 다크모드 토글 함수
const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark';
};

const { $alert } = useNuxtApp();

// 로그아웃 함수 (예시용)
const logout = () => {
  $alert('confirm', '로그아웃 확인', '로그아웃하시겠습니까?', '네', '아니요')
  .then((confirmed) => {
    if (confirmed) {
      $alert('error', '로그아웃 완료', '로그아웃 되었습니다.');
    }
  })
};
</script> -->

<template>
  <div class="d-flex justify-space-around">
    <v-menu :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar size="40">
            <v-img :src="user.img" alt="User Avatar"></v-img>
          </v-avatar>
        </v-btn>
      </template>

      <v-card min-width="200">
        <v-list>
          <v-list-item
          :prepend-avatar="user.img"
          :subtitle="user.id"
          :title="user.name"
          to="/my-profile"
          >
            <template #append>
              <v-btn
              :icon="currentTheme === 'dark' ? 'mdi-weather-night' : 'mdi-white-balance-sunny'"
              @click.stop="toggleTheme"
              variant="text"
              :class="currentTheme === 'dark' ? 'text-yellow' : 'text-grey'"
              >
              </v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact">
          <v-list-item @click="" exact to="/">
            <template #prepend>
              <v-icon size="20">mdi-view-dashboard</v-icon>
            </template>
            <v-list-item-title>대시보드</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-list-item @click="" href="http://192.168.1.215:3001/">
          <template #prepend>
            <v-icon size="20">mdi-home</v-icon>
          </template>
          <v-list-item-title>메인</v-list-item-title>
        </v-list-item>

        <v-list-item @click="logout">
          <template #prepend>
            <v-icon size="20" color="red">mdi-logout</v-icon>
          </template>
          <v-list-item-title>로그아웃</v-list-item-title>
        </v-list-item>
      </v-card>
    </v-menu>
  </div>
</template>

<style scoped>
.small-item {
  min-height: 32px !important; /* 기본 크기보다 줄이기 */
  padding: 4px 12px !important; /* 내부 여백 최소화 */
  font-size: 10px !important; /* 글자 크기 조절 */
}

.v-list-item-title {
  font-size: 13px !important; /* 글자 크기 조절 */
}

.small-icon {
  margin-right: -15px !important; /* 아이콘과 텍스트 사이 간격 조절 */
}
</style>
