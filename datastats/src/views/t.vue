<template>
  <div>
    总人数： {{ totalPeople }}
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const totalPeople = ref(0)

    onMounted(async () => {
      // 请更换为你的json文件的url
      const response = await axios.get('/path/to/your/file.json')
      const data = response.data
      totalPeople.value = data.reduce((sum, item) => sum + item.人数, 0)
    })

    return {
      totalPeople
    }
  }
}
</script>