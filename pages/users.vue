<template>
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">사용자 목록</h1>
      <ul>
        <li v-for="user in users" :key="user" class="mb-2">👤 {{ user }}</li>
      </ul>
    </div>
  </template>
  
  <script setup>
  const { data: users } = await useFetch('http://localhost:8080/api/users')
  </script>
  