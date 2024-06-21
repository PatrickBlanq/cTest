<script setup>
import { ref, onMounted } from 'vue'

const iframe = ref(null)
const data = ref({})

onMounted(() => {
  iframe.value.onload = async () => {
    try {
      const response = await fetch(iframe.value.contentWindow.location.href)
      const text = await response.text()
      console.log(text);
      data.value = JSON.parse(text)
    } catch (error) {
      console.error(error)
    }
  }
})
</script>

<template>
  <div>
    <iframe ref="iframe" src="/mockData.js" style="display: none;"></iframe>
    <div v-for="user in data.users" :key="user.id">
      {{ user.name }} - {{ new Date(user.timestamp).toLocaleString() }}
    </div>
  </div>
</template>