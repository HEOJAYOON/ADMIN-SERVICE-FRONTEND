<script setup lang="ts">
import { ref, shallowRef } from 'vue'

export interface MenuItem {
  title: string
  icon: string
  to?: string
  children?: MenuItem[]
}

const sidebarItems: MenuItem[] = [
  { title: '대시보드', icon: 'mdi-view-dashboard', to: '/dashboard' },
  {
    title: '사용자 관리', icon: 'mdi-account-multiple', children: [
      { title: '사용자 관리', icon: 'mdi-chevron-right', to: '/users' },
      { title: '협력사 관리', icon: 'mdi-chevron-right', to: '/partners' },
      { title: '구독자 관리', icon: 'mdi-chevron-right', to: '/subscribers' },
      { title: '그룹 관리', icon: 'mdi-chevron-right', to: '/groups' },
      { title: '그룹 요청 관리', icon: 'mdi-chevron-right', to: '/group-requests' },
      { title: '개발자 관리', icon: 'mdi-chevron-right', to: '/developers' },
    ]
  },
  { title: '분석 관리', icon: 'mdi-chart-bar', to: '/analytics' },
  {
    title: '상품 관리', icon: 'mdi-cube-outline', children: [
      { title: 'APP 관리', icon: 'mdi-chevron-right', to: '/product/apps' },
      { title: '결제 관리', icon: 'mdi-chevron-right', to: '/product/payment' },
      { title: '앱 그룹 관리', icon: 'mdi-chevron-right', to: '/product/app-group' },
      { title: '카테고리 관리', icon: 'mdi-chevron-right', to: '/product/category' },
    ]
  },
  {
    title: '로그 관리', icon: 'mdi-file-document', children: [
      { title: '사용자 로그 관리', icon: 'mdi-chevron-right', to: '/logs/user' },
      { title: '관리자 로그', icon: 'mdi-chevron-right', to: '/logs/admin' },
    ]
  },
  {
    title: '사이트 관리', icon: 'mdi-web', children: [
      { title: '좌표계 관리', icon: 'mdi-chevron-right', to: '/site/coordinates' },
      { title: '백업 설정', icon: 'mdi-chevron-right', to: '/site/backup' },
      { title: '게시판 관리', icon: 'mdi-chevron-right', to: '/site/board' },
    ]
  },
  {
    title: '분석용 데이터 관리', icon: 'mdi-database', children: [
      { title: '기본 모델데이터 관리', icon: 'mdi-chevron-right', to: '/data/basic-model' },
      { title: '사용자 모델데이터 관리', icon: 'mdi-chevron-right', to: '/data/user-model' },
    ]
  },
  {
    title: '메인 관리', icon: 'mdi-monitor-dashboard', children: [
      { title: '슬라이드 컨텐츠 관리', icon: 'mdi-chevron-right', to: '/main/slide' },
      { title: '공지사항 관리', icon: 'mdi-chevron-right', to: '/main/notice' },
      { title: '자주묻는질문 관리', icon: 'mdi-chevron-right', to: '/main/faq' },
      { title: '1:1문의 관리', icon: 'mdi-chevron-right', to: '/main/inquiry' },
      { title: '팝업 관리', icon: 'mdi-chevron-right', to: '/main/popup' },
    ]
  },
  {
    title: '시스템 관리', icon: 'mdi-cog', children: [
      { title: '시스템관리', icon: 'mdi-chevron-right', to: '/system/core' },
      { title: '스토리지 관리', icon: 'mdi-chevron-right', to: '/system/storage' },
      { title: '2D 지도 서버 관리', icon: 'mdi-chevron-right', to: '/system/2d-map' },
      { title: '워커 관리', icon: 'mdi-chevron-right', to: '/system/worker' },
    ]
  },
]

const sidebarMenu = shallowRef(sidebarItems)
const sDrawer = ref(true)
</script>

<template>
  <v-app>
    <v-navigation-drawer
      v-model="sDrawer"
      app
      permanent
      class="bg-grey-darken-4 text-white"
    >
      <div class="px-4 py-6 flex items-center">
        <v-img
          src="/image/main-logo-img.png"
          alt="EGIS Logo"
          contain
          width="120"
        />
      </div>

      <v-list dense nav>
        <template v-for="(item, i) in sidebarMenu" :key="i">
          <SidebarNavItem :item="item" />
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>