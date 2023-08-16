<template>
    <div class="logo-content">
        <img v-if="$store.state.settings.showTitleImg" :src="$store.state.settings.titleImg">
        <h1>{{ $store.state.settings.title }}</h1>
    </div>
</template>

<script>
export default {
    name: "logo"
}
</script>

<style scoped lang="less">
.logo-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    > img {
        width: 32px;
        height: 32px;
        vertical-align: middle;
        margin-right: 12px;
    }

    > h1 {
        color: #fff;
        font-weight: 600;
        font-size: 14px;
    }
}
</style>
