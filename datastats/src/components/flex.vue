<template>
    <div class="fullscreen-div ">
        <div class="left">
            <div class="left1">Left1</div>
            <div class="left2">Left2</div>
        </div>
        <div class="center">Center</div>
        <div class="right">Right</div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.fullscreen-div {
    width: 100vw;
    height: 100vh;
    background-color: #04091F;
    display: flex;
    color: #fff;
}

.left,
.center,
.right {
    flex: 1;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
}

.left {
    flex: 33;
    display: flex;
    flex-direction: column;
}

.left1 {
    flex: 53;
    padding: 5px;
        background-image: url('../accsets/img/left1.png');
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
}

.left2 {
    flex: 23;
    padding: 5px;
    background-color: #80e0b0;
    margin-top: 17px;
}

.center {
    flex: 47;
}

.right {
    flex: 31;
    margin-right: 20px;
}
</style>
