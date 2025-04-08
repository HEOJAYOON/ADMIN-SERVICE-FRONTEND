<script setup lang="ts">
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import { debouncedRef  } from '@vueuse/core'
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
const itemsPerPage = ref(30)
const search = ref('')
const debouncedSearch = debouncedRef (search, 300)

const { data, pending } = useFetch<ApiResponse>('/api/users', {
  query: {
    page,
    limit: itemsPerPage,
    search: debouncedSearch,
  },
  watch: [page, itemsPerPage, debouncedSearch],
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
          <v-tooltip
            location="right"
            offset="10"
            class="custom-tooltip"
          >
            <template #activator="{ props }">
              <v-btn
                icon
                v-bind="props"
                variant="tonal"
                size="30px"
                class="ml-2"
                @click="onAddUser"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            회원 등록
          </v-tooltip>
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
            :items="users"
            :headers="headers"
            :items-per-page="users.length"
            :page="1"
            :loading="pending"
            class="elevation-1 fixed-table"
            style="table-layout: fixed;"
            hide-default-footer
            :height="750"
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
            <template v-if="search && search.trim()">
              <strong>'{{ search }}'</strong> 검색결과 <strong>{{ total }}</strong> 명이 일치합니다.
            </template>
            <template v-else>
              총 <strong>{{ total }}</strong>명의 회원이 등록되어 있습니다.
            </template>
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

/* Vuetify 테이블 스크롤 및 헤더 고정 */
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
  background-color: #2b2b2b;
  z-index: 2;
}

::v-deep(.custom-tooltip .v-overlay__content) {
  background-color: #2c2c2c !important; /* ✅ 원하는 색으로 바꿔 */
  color: #fff;
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  white-space: nowrap;
}
.search-summary strong {
  color: #42a5f5;
}
</style>

<style>
.custom-tooltip .v-overlay__content {
  background-color: #2c2c2c !important;
  color: white;
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 6px;
}
</style>