<template>  
  <div>  
    <p v-for="item in data" :key="item.d_id">  
      <pre>{{ formatGroupName(item.d_起案者所属name) }}</pre>  
    </p>  
  </div>  
</template>  
  
<script setup>  
import { ref } from 'vue';  
  
// 使用 ref 而不是 data 函数，因为 <script setup> 不需要返回任何东西  
const data = ref([  
  {  
    d_作成日: "2024.03.05",  
    d_メーカーname: "カネカソーラー",  
    d_起案者所属name: "東京設計センター　東京第１グループ",  
    d_id: "0453de82-866c-417b-b9de-76081fb7dfe7",  
    d_管理番号: "KANEKA-147637",  
    d_支払金額: 45670.00  
  }  
]);  
  
// 方法定义保持不变  
function formatGroupName(name) {  
  return name.replace(/　/g, '\n');  
}  
</script>  
  
<style>  
/* CSS 保持不变 */  
pre {  
  white-space: pre-wrap;  
}  
</style>