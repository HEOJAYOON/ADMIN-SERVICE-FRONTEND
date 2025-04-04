<script setup lang="ts">
interface Props {
  icon: string;  // item 대신 icon으로 변경
  level?: number;
}

const { level = 0 } = defineProps<Props>()
</script>

<template>
  <v-icon :icon="icon" :size="level > 0 ? 16 : 20" class="iconClass"></v-icon>
</template>

<style scoped>
.iconClass {
  opacity: 0.8;
}
</style>