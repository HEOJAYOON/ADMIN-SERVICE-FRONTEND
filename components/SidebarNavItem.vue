<template>
    <v-list-group
      v-if="item.children"
      :prepend-icon="item.icon"
      :value="false"
    >
      <template #activator>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </template>
  
      <v-list-item
        v-for="(child, index) in item.children"
        :key="index"
        :to="child.to"
      >
        <v-list-item-icon>
          <v-icon>{{ child.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ child.title }}</v-list-item-title>
      </v-list-item>
    </v-list-group>
  
    <v-list-item
      v-else
      :to="item.to"
    >
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item>
  </template>
  
  <script setup lang="ts">
  defineProps({
    item: {
      type: Object,
      required: true,
    },
  })
  </script>
  