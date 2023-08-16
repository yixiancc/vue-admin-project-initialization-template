<template>
    <div :class="{'has-logo':$store.state.settings.showLogo}">
        <div class="logo-div"
             v-if="$store.state.settings.showLogo">
            <logo></logo>
        </div>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <div>
                <el-menu
                    :default-active="activeMenu"
                    :collapse="false"
                    background-color="#304156"
                    text-color="#bfcbd9"
                    :unique-opened="false"
                    active-text-color="#409EFF"
                    :collapse-transition="false"
                    mode="vertical"
                >
                    <sidebar-item v-for="route in routes" :key="route.path" :item="route"
                                  :base-path="route.path"></sidebar-item>
                </el-menu>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
import logo from './logo.vue'
import sidebarItem from "./SidebarItem.vue";

export default {
    name: "index",
    components: {
        logo,
        sidebarItem
    },
    computed: {
        routes() {
            return this.$router.options.routes
        },
        activeMenu() {
            const route = this.$route
            const {meta, path} = route
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            let returnPath = path
            
            this.$router.options.routes.forEach(data => { // 遍历路由列表，以防有些路由是隐藏的，但是触发了，导致父节点没有亮，做法是返回父节点下的第一个子节点，也就是redirect
                if (data.path == path) {
                    returnPath = data.redirect
                }
                if (data.children) {
                    data.children.forEach(child => {
                        if (child.path === path) {
                            if (child.hidden) {
                                returnPath = data.redirect
                            }
                        }
                    })
                }
            })
            return returnPath
        },
    },
    mounted() {
        let roleType = localStorage.getItem(this.$store.state.settings.LocalstorgePermission)
        let children = document.querySelector(".el-menu").children
        for (let i = 0; i < children.length; i++) {
            let hasPermission = children[i].getAttribute("has-permission")
            if (hasPermission) {
                if (hasPermission.indexOf(roleType) == -1) {
                    document.querySelector(".el-menu").removeChild(children[i]) // 删除没有权限的节点
                    i = i - 1 // 删除节点后，后面的节点会往前移，所以要减1
                }
            }
        }
    },
    methods: {}
}
</script>

<style scoped>
/deep/ .scrollbar-wrapper {
    overflow-x: hidden !important;
}

/deep/ .el-scrollbar__bar.is-vertical {
    right: 0px;
}

/deep/ .el-scrollbar {
    height: 100%;
}

.logo-div {
    width: 100%;
    height: 50px
}
</style>
