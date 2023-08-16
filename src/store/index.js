import Vue from "vue";
import Vuex from "vuex";
import getters from './getters'
import tagsView from './modules/tagsView.js' // 新增tagsView

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        app: {},
        settings: {
            tagsView: true,
            showTitleImg: false, // 左上角标题是否带图片
            titleImg: "", // 左上角标题图片地址
            title: "后台管理系统", // 左上角标题文字
            showLogo: true, // 是否显示左上角标题
            userAvatarImg: "", // 右上角头像地址
            LocalstorgePermission: "auth_roleType" // 本地存储权限字段
        }
    },
    mutations: {},
    actions: {},
    modules: {
        tagsView // 新增tagsView
    },
    getters
});
