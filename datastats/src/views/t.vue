<template>
   <div class="marquee">
  这是一段需要滚动的文字内容，当鼠标悬停时会停止滚动。
</div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.marquee {
  width: 200px; /* 设置滚动区域的宽度 */
  white-space: nowrap; /* 确保文本不换行 */
  overflow: hidden; /* 隐藏超出区域的文本 */
  box-sizing: border-box; /* 防止滚动条影响宽度 */
}
 
.marquee::after {
  content: '';
  display: inline-block;
  width: 100%; /* 设置伪元素的宽度为100% */
  animation: scroll 10s linear infinite; /* 开始滚动动画 */
}
 
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
 
.marquee:hover::after {
  animation-play-state: paused; /* 鼠标悬停时暂停滚动 */
}
</style>