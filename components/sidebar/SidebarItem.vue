<script setup lang="ts">
import { ref } from 'vue';
import Icon from './Icon.vue';

export interface MenuItem {
  title: string;
  icon: string;
  to?: string;
  type?: 'external' | 'internal';
  disabled?: boolean;
  children?: MenuItem[];
}

interface Props {
  item: MenuItem;
  level?: number;
}

const { item, level = 0 } = defineProps<Props>()

// 드롭다운 열기 / 닫기
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleChildClick = () => {
//   setTimeout(() => {
    isOpen.value = false;
//   }, 100);
};
</script>

<template>
  <div class="mb-1">
    <v-list>
      <v-list-item
      v-if="!item.children"
      :to="item.type === 'external' ? '' : item.to"
      :href="item.type === 'external' ? item.to : ''"
      :exact="true"
      :rounded="true"
      class="bg-hover-primary"
      color="primary"
      :ripple="false"
      :disabled="item.disabled"
      :target="item.type === 'external' ? '_blank' : ''"
      >
        <template #prepend>
          <div class="navbox bg-hover-primary mr-4">
            <span class="icon-box">
              <Icon :icon="item.icon" :level="level" class="position-relative z-index-2 texthover-primary" />
            </span>
          </div>
        </template>
        <v-list-item-title class="text-subtitle-1 font-weight-medium" color="primary">
          {{item.title }}
        </v-list-item-title>
      </v-list-item>
      <v-list-group v-else v-model="isOpen">
        <template #activator="{ props: activatorProps }">
          <v-list-item
          v-bind="activatorProps"
          :exact="true"
          :rounded="true"
          class="bg-hover-primary"
          color="primary"
          :ripple="false"
          :disabled="item.disabled"
          @click="toggleDropdown"
          >
            <template #prepend>
              <div class="navbox bg-hover-primary mr-4">
                <span class="icon-box">
                  <Icon :icon="item.icon" :level="level" class="position-relative z-index-2 texthover-primary" />
                </span>
              </div>
            </template>
            <v-list-item-title class="text-subtitle-1 font-weight-medium" color="primary">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item
        v-for="(child, index) in item.children"
        :key="child.title || index"
        :to="child.to"
        :exact="true"
        :rounded="true"
        class="bg-hover-primary pl-2"
        color="primary"
        :ripple="false"
        @click="handleChildClick"
        >
          <template #prepend>
            <div class="navbox bg-hover-primary mr-4">
              <span class="icon-box">
                <Icon :icon="child.icon" :level="level + 1" class="position-relative z-index-2 texthover-primary" />
              </span>
            </div>
          </template>
          <v-list-item-title class="text-subtitle-1 font-weight-medium" color="primary">
            {{ child.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<style scoped>

.v-list-item {
    min-height: 40px;
}

.icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
}

::v-deep(.v-list-item__content) {
  flex-grow: 1 !important;
  flex-shrink: 1 !important;
  min-width: 0 !important;
}

::v-deep(.v-list-item__append) {
  min-width: 24px !important; 
  max-width: 24px !important;
}

::v-deep(.v-list-group__items .v-list-item) {
  padding-left: 30px !important;
}
</style>
