<template>
   <div class="marquee">
  这是一段需要滚动的文字内容，当鼠标悬停时会停止滚动。
</div>
</template>

<script setup>

const initializeGroupedMenu = () => {
    // 创建一个新的 Map 来存储按 Group1 分组的数据
    const groupedByGroup1 = new Map();

    // 遍历 JSON 数据，按 Group1 分组
    for (const item of jsonData) {
        if (!groupedByGroup1.has(item.Group1)) {
            groupedByGroup1.set(item.Group1, []);
        }
        groupedByGroup1.get(item.Group1).push(item);
    }

    // 遍历按 Group1 分组的数据
    for (const [Group1, items] of groupedByGroup1) {
        // 创建一个新的对象来存储当前 Group1 的数据，包括其子组和各项总数
        const Group1Item = { group1: Group1, expanded: false, children: [], totalExpected: 0, totalMiddleEstimate: 0, totalFinished: 0 };

        // 创建一个新的 Map 来存储按 Group2 分组的数据
        const groupedByGroup2 = new Map();

        // 遍历当前 Group1 的数据，按 Group2 分组
        for (const item of items) {
            if (!groupedByGroup2.has(item.Group2)) {
                groupedByGroup2.set(item.Group2, []);
            }
            groupedByGroup2.get(item.Group2).push(item);
        }

        // 遍历按 Group2 分组的数据
        for (const [Group2, Group2Items] of groupedByGroup2) {
            // 创建一个新的对象来存储当前 Group2 的数据，包括其子组和各项总数
            const Group2Item = { group2: Group2, expanded: false, children: [], totalExpected: 0, totalMiddleEstimate: 0, totalFinished: 0 };

            // 创建一个新的 Map 来存储按 Group3 分组的数据
            const groupedByGroup3 = new Map();

            // 遍历当前 Group2 的数据，按 Group3 分组
            for (const item of Group2Items) {
                if (!groupedByGroup3.has(item.Group3)) {
                    groupedByGroup3.set(item.Group3, []);
                }
                groupedByGroup3.get(item.Group3).push(item);
            }

            // 遍历按 Group3 分组的数据
            for (const [Group3, Group3Items] of groupedByGroup3) {
                // 创建一个新的对象来存储当前 Group3 的数据，包括其子组和各项总数
                const Group3Item = { group3: Group3, expanded: false, children: Group3Items, totalExpected: 0, totalMiddleEstimate: 0, totalFinished: 0 };

                // 计算当前 Group3 的各项总数
                for (const item of Group3Items) {
                    Group3Item.totalExpected += item["納品予定"];
                    Group3Item.totalMiddleEstimate += item["中間見込"];
                    Group3Item.totalFinished += item["依頼棟数"];
                }

                // 将当前 Group3 的数据添加到当前 Group2 的子组中，并更新 Group2 的各项总数
                Group2Item.children.push(Group3Item);
                Group2Item.totalExpected += Group3Item.totalExpected;
                Group2Item.totalMiddleEstimate += Group3Item.totalMiddleEstimate;
                Group2Item.totalFinished += Group3Item.totalFinished;
            }

            // 将当前 Group2 的数据添加到当前 Group1 的子组中，并更新 Group1 的各项总数
            Group1Item.children.push(Group2Item);
            Group1Item.totalExpected += Group2Item.totalExpected;
            Group1Item.totalMiddleEstimate += Group2Item.totalMiddleEstimate;
            Group1Item.totalFinished += Group2Item.totalFinished;
        }

        // 将当前 Group1 的数据添加到最终的分组菜单中
        groupedMenu.value.push(Group1Item);
    }
};

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