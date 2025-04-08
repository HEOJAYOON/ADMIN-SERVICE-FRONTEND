<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import dayjs from 'dayjs'
import AdminPageHeader from '@/components/header/AdminPageHeader.vue'

definePageMeta({
  layout: 'admin',
  title: '회원 관리',
  icon: 'mdi-account-outline',
})

interface User {
  name: string
  id: string
  level: string
  partner: string
  joinedAt: string
  lastLogin: string
  status: string
  usage: number
}

interface ApiResponse {
  items: User[]
  total: number
}
interface Header {
  title: string
  key: string
  width?: string
}

const page = ref(1)
const itemsPerPage = ref(25)

const { data, pending } = useFetch<ApiResponse>('/api/users', {
  query: {
    page,
    limit: itemsPerPage,
  },
  watch: [page, itemsPerPage],
})

const users = computed(() => data.value?.items ?? [])
const total = computed(() => data.value?.total ?? 0)

const headers: Header[] = [
  { title: '회원명', key: 'name', width: '10%'},
  { title: 'ID', key: 'id', width: '10%'},
  { title: '레벨', key: 'level', width: '5%'},
  { title: '협력사', key: 'partner', width: '10%'},
  { title: '가입일', key: 'joinedAt', width: '10%'},
  { title: '최근 로그인', key: 'lastLogin', width: '10%'},
  { title: '상태', key: 'status', width: '5%'},
  { title: '사용량 (MB)', key: 'usage', width: '7%'},
  { title: '정보변경', key: 'actions', sortable: false, width: '5%' },
]

watchEffect(() => {
  console.log('총 유저 수:', total.value)
})

const search = ref('')

function onAddUser() {
  console.log('신규 등록 버튼 클릭됨!')
}
</script>

<template>
  <ClientOnly>
    <div class="page-section">
      <AdminPageHeader>
        <template #left>
          <v-icon class="mr-2" color="primary">mdi-account</v-icon>
          <h1 class="page-title">회원 관리</h1>
          <v-btn
            class="reveal-button"
            @click="onAddUser"
            color="primary"
            elevation="1"
            variant="flat"
          >
            <v-icon start>mdi-plus</v-icon>
            <span class="btn-label">회원 등록</span>
          </v-btn>
        </template>
        <template #center>
          <v-text-field
            v-model="search"
            placeholder="검색"
            density="compact"
            hide-details
            clearable
            prepend-inner-icon="mdi-magnify"
            class="search-field"
          />
        </template>
      </AdminPageHeader>
        <!-- 기본 푸터 숨김 -->
        <div class="table-scroll-area">
          <v-data-table
            :key="`${page}-${itemsPerPage}`"
            v-model:page="page"
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="users"
            :loading="pending"
            :server-items-length="total"
            :height="750"
            hide-default-footer
            class="elevation-1 fixed-table"
            style="table-layout: fixed;"
          >
          <template #header="{ props }">
              <tr>
                <th
                  v-for="header in headers"
                  :key="header.key"
                  :style="{ width: header.width }"
                >
                  {{ header.title }}
                </th>
              </tr>
            </template>
            <template #item.level="{ item }">
              <v-chip
                v-if="item"
                :color="item.level === '관리자' ? 'red' : item.level === '미승인' ? 'grey' : 'blue'"
                dark
                small
              >
                {{ item.level }}
              </v-chip>
            </template>
            <template #item.status="{ item }">
              <v-chip
                v-if="item"
                :color="item.status === '정상' ? 'green' : 'orange'"
                dark
                small
              >
                {{ item.status }}
              </v-chip>
            </template>
            <template #item.joinedAt="{ item }">
              <span v-if="item">
                {{ dayjs(item.joinedAt).format('YYYY-MM-DD') }}
              </span>
            </template>
            <template #item.lastLogin="{ item }">
              <span v-if="item">
                {{ dayjs(item.lastLogin).format('YYYY-MM-DD HH:mm') }}
              </span>
            </template>
            <template #item.actions="{ item }">
              <v-btn icon size="small" variant="text" color="primary" @click="onEdit(item)">
                <v-icon>mdi-pencil-outline</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </div>
        <!-- 커스텀 푸터 -->
        <v-row class="pa-2" align="center" justify="space-between">
          <div>
            총 {{ total }} 명의 회원 정보가 있습니다.
          </div>
          <v-pagination
            v-model="page"
            :length="Math.ceil(total / itemsPerPage)"
            total-visible="7"
          ></v-pagination>
        </v-row>
    </div>
  </ClientOnly>
</template>

<style scoped>

.page-title {
  font-size: 22px;
  font-weight: bold;
  color: white;
}

.page-section {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 8px;
}

.table-scroll-area {
  flex: 1 1 auto;
  min-height: 0;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.fixed-table ::v-deep .v-data-table__wrapper {
  max-height: 100%;
}

::v-deep(.v-table__wrapper)::-webkit-scrollbar {
  width: 4px;
}

::v-deep(.v-table__wrapper)::-webkit-scrollbar-thumb {
  background-color: #666;
  border-radius: 4px;
}

::v-deep(.v-data-table__wrapper)::-webkit-scrollbar-track {
  background: transparent;
}

.fixed-table ::v-deep thead {
  position: sticky;
  top: 0;
  background-color:#2b2b2b;
  z-index: 2;
}

.reveal-button {
  display: inline-flex;
  align-items: center;
  height: 30px;
  width: 30px;
  padding: 0;
  border-radius: 999px;
  overflow: hidden;
  white-space: nowrap;
  transition: all 0.3s ease;
  min-width: 30px;
  position: relative;
  margin-left: 10px;
}

.reveal-button .v-icon {
  transition: margin 0.3s ease;
  margin-left: 8px;
  z-index: 2;
}

.reveal-button .btn-label {
  opacity: 0;
  margin-left: 0;
  max-width: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 1;
}
.reveal-button:hover {
  width: 110px;
  justify-content: flex-start;
}

.reveal-button:hover .btn-label {
  opacity: 1;
  max-width: 100px;
}
</style>
