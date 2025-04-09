<script setup lang="ts">
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import { debouncedRef  } from '@vueuse/core'
import AdminPageHeader from '@/components/header/AdminPageHeader.vue'
import { useFetch } from '#app'

definePageMeta({
  layout: 'admin',
  title: '협력사 관리',
  icon: 'mdi-handshake-outline',
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

const showDialog = ref(false)
const formRef = ref()
const userForm = ref({
  username: '',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const rules = {
  required: (v: string) => !!v || '필수 입력입니다.',
  email: (v: string) => /.+@.+\..+/.test(v) || '올바른 이메일 형식이어야 합니다.',
  passwordMatch: () => userForm.value.password === userForm.value.confirmPassword || '비밀번호가 일치하지 않습니다.',
}

function submitForm() {
  formRef.value?.validate().then(async (isValid: boolean) => {
    if (isValid) {
      // *추후 API 연동 *
      // const res = await $fetch('/api/users', {
      //   method: 'POST',
      //   body: userForm.value,
      // })
      console.log('등록 완료:', res)
      showDialog.value = false
    }
  })
}


// 회원추가 다이얼로그

const editDialog = ref(false)

const editForm = ref({
  username: 'user123',
  name: '홍길동',
  email: 'gildong@example.com',
  partner: '협력사1',
  level: '승인회원',
  status: '정상',
  loginCount: 87,
  joinedAt: '2023-12-01',
  lastLogin: '2024-04-08 12:34',
  apps: ['문서함', '파일공유', '메시지']
})

function openEditDialog(item: User) {
  editForm.value = {
    username: item.id,
    name: item.name,
    email: item.email || '',
    partner: item.partner || '',
    level: item.level || '',
    status: item.status || '',
    loginCount: item.loginCount || 0,
    joinedAt: dayjs(item.joinedAt).format('YYYY-MM-DD'),
    lastLogin: dayjs(item.lastLogin).format('YYYY-MM-DD HH:mm'),
    apps: item.apps || []
  }
  editDialog.value = true
}


function submitEdit() {
  // TODO: API 연동
  console.log('보낼 데이터:', editForm.value)
}


const headers: Header[] = [
  { title: '회원명', key: 'name', align: 'center', width: '10%'},
  { title: 'ID', key: 'id', align: 'center',width: '10%'},
  { title: '레벨', key: 'level', align: 'center',width: '5%'},
  { title: '협력사', key: 'partner', align: 'center',width: '10%'},
  { title: '가입일', key: 'joinedAt', align: 'center',width: '10%'},
  { title: '최근 로그인', key: 'lastLogin', align: 'center',width: '10%'},
  { title: '상태', key: 'status', align: 'center',width: '5%'},
  { title: '사용량 (MB)', key: 'usage',align: 'center', width: '7%'},
  { title: '', key: 'actions', sortable: false, width: '3%' },
]

</script>

<template>
  <ClientOnly>
    <div class="page-section">
      <AdminPageHeader>
        <template #left>
          <v-icon class="mr-2" color="primary">mdi-handshake-outline</v-icon>
          <h1 class="page-title">협력사 관리</h1>
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
                @click="showDialog = true"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            회원 추가
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
            <!-- 헤더 -->
            <template #header="{ props }">
              <tr>
                <th
                  v-for="header in headers"
                  :key="header.key"
                  :style="{ width: header.width } "
                >
                  {{ header.title }}
                </th>
              </tr>
            </template>

            <!-- 회원명 -->
            <template #item.name="{ item }">
              {{ item.name }}
            </template>

            <!-- ID -->
            <template #item.id="{ item }">
              {{ item.id }}
            </template>

            <!-- 레벨 -->
            <template #item.level="{ item }">
              <v-chip
                :color="item.level === '관리자' ? 'red' : item.level === '미승인' ? 'grey' : 'blue'"
                dark
                small
              >
                {{ item.level }}
              </v-chip>
            </template>

            <!-- 협력사 -->
            <template #item.partner="{ item }">
              {{ item.partner }}
            </template>

            <!-- 가입일 -->
            <template #item.joinedAt="{ item }">
              {{ dayjs(item.joinedAt).format('YYYY-MM-DD') }}
            </template>

            <!-- 최근 로그인 -->
            <template #item.lastLogin="{ item }">
              {{ dayjs(item.lastLogin).format('YYYY-MM-DD HH:mm') }}
            </template>

            <!-- 상태 -->
            <template #item.status="{ item }">
              <v-chip
                :color="item.status === '정상' ? 'green' : 'orange'"
                dark
                small
              >
                {{ item.status }}
              </v-chip>
            </template>

            <!-- 사용량 -->
            <template #item.usage="{ item }">
              {{ item.usage }}
            </template>

            <!-- 정보변경 (연필 아이콘) -->
            <template #item.actions="{ item }">
              <v-btn
                icon
                size="small"
                variant="text"
                class="edit-icon"
                @click="openEditDialog(item)"
              >
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


    <!-- 회원추가 다이얼로그 -->
    <v-dialog v-model="showDialog" max-width="600px" class="rounded-dialog">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">
          <v-icon class="mr-2" color="primary">mdi-account-plus</v-icon>
          회원 등록</v-card-title>
        <v-card-text>
          <v-form ref="formRef">
            <v-text-field
              v-model="userForm.username"
              label="아이디"
              :rules="[rules.required]"
              required
            />
            <v-text-field
              v-model="userForm.name"
              label="이름"
              :rules="[rules.required]"
              required
            />
            <v-text-field
              v-model="userForm.email"
              label="이메일"
              :rules="[rules.required, rules.email]"
              required
            />
            <v-text-field
              v-model="userForm.password"
              label="비밀번호"
              type="password"
              :rules="[rules.required]"
              required
            />
            <div class="hint-message">
              ⚠ 비밀번호는 <strong>숫자, 영문, 특수문자를 각각 포함 9자리 이상</strong>
            </div>   
            <v-text-field
              v-model="userForm.confirmPassword"
              label="비밀번호 확인"
              type="password"
              :rules="[rules.required, rules.passwordMatch]"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="showDialog = false">취소</v-btn>
          <v-btn color="primary" @click="submitForm">등록</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 회원 정보 수정 다이얼로그 -->
    <v-dialog v-model="editDialog" max-width="700px" class="rounded-dialog">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">
          <v-icon class="mr-2" color="primary">mdi-account-edit</v-icon>
          회원 정보 수정
        </v-card-title>

        <v-card-text>
          <v-form ref="editFormRef">
            <!-- 텍스트 (읽기 전용) -->
            <v-text-field v-model="editForm.username" label="회원 아이디" readonly />
            <v-text-field v-model="editForm.loginCount" label="로그인 수" readonly />
            <v-text-field v-model="editForm.joinedAt" label="회원 가입일" readonly />
            <v-text-field v-model="editForm.lastLogin" label="마지막 로그인" readonly />

            <!-- 수정 가능 -->
            <v-text-field v-model="editForm.name" label="회원명" :rules="[rules.required]" />
            <v-text-field v-model="editForm.email" label="이메일" :rules="[rules.required, rules.email]" />
            <v-text-field v-model="editForm.partner" label="협력사" />

            <!-- 드롭다운: 레벨 -->
            <v-select
              v-model="editForm.level"
              label="회원 레벨"
              :items="['사이트관리자', '미승인', '승인회원', '그룹관리자']"
            />

            <!-- 드롭다운: 상태 -->
            <v-select
              v-model="editForm.status"
              label="회원 상태"
              :items="['정상', '이용정지', '회원탈퇴']"
            />

            <!-- 사용 중인 앱 -->
            <div class="mt-4">
              <label class="text-subtitle-2 font-weight-medium mb-1">사용 중인 앱</label>
              <div class="app-list">
                <v-chip
                  v-for="app in editForm.apps"
                  :key="app"
                  class="ma-1"
                  color="primary"
                  text-color="white"
                  small
                >
                  {{ app }}
                </v-chip>
              </div>
            </div>
          </v-form>
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn text @click="editDialog = false">취소</v-btn>
          <v-btn color="primary" @click="submitEdit">저장</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


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

/* 테이블 내부 고정 및 스크롤 */
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


.v-data-table thead th .v-data-table-header__icon {
  margin-left: 10px; /* 👈 이걸로 조절해줘. 4~8px 사이 추천 */
}

/* 연필 아이콘 hover 효과 */
.edit-icon .v-icon {
  color: #888;
  transition: color 0.2s ease;
}
.edit-icon:hover .v-icon {
  color: #1976d2;
}

.search-summary strong {
  color: #42a5f5;
}

.hint-message {
  font-size: 12px;
  margin-top: -12px;
  margin-bottom: 8px;
  color: #aaa;
  text-align: center;
}
.app-list {
  display: flex;
  flex-wrap: wrap;
}
</style>

<!-- 🔥 글로벌 스타일은 여기 하나면 끝 -->
<style>
.custom-tooltip .v-overlay__content {
  background-color: #2c2c2c !important;
  color: white;
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 6px;
}
.rounded-dialog .v-overlay__content {
  border-radius: 20px !important;
  overflow: hidden;
}
</style>
