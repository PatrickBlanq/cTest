<template>
  <div :key="menuArry.join(',')">
    <div 
      v-if="isMenuHidden"
      style="cursor: pointer; width: 100%; height: 40px; margin-bottom: 0px; text-align: center; border: 0px solid #f70909; display: flex; align-items: center; justify-content: center;"
      v-for="menu in menuArry" 
      :key="menu.name" 
      @click="menuNameClick(menu.name)"
      :class="{
        activeMenu: selectedMenukey === menu.name,
        menuDisableColor: menu.enable === 0,
        menuSelectedDisable: selectedMenukey === menu.name && menu.enable === 0
      }">
      {{ menu.name }}
    </div>
  </div>
</template>

<style scoped>
.table-cell {
  /* 添加其他样式 */
}

.menuDisableColor {
  background-color: gray;
}

.activeMenu {
  /* activeMenu 类的样式 */
}

.menuSelectedDisable {
  background-color: darkgray; /* 选中时的特殊背景色 */
}
</style>
