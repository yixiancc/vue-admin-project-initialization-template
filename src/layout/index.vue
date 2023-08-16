<template>
    <div class="app-wrapper">
        <sidebar class="sidebar-container"/>
        <div :class="{hasTagsView:needTagsView}" class="main-container">
            <div>
                <navbar/>
                <tags-view v-if="needTagsView"/>
            </div>
            <app-main/>
        </div>
    </div>
</template>

<script>
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import TagsView from './components/TagsView/index.vue' // 导入TagsView

export default {
    name: 'Layout',
    components: {
        AppMain,
        Navbar,
        Sidebar,
        TagsView
    },
    computed: {
        needTagsView() {
            return this.$store.state.settings.tagsView
        }
    }
}
</script>

<style lang="less" scoped>
@import "@/styles/mixin.less";
@import "@/styles/variables.less";
</style>
