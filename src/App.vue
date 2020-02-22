<template>
    <div id="app">
        <el-container style="height: 100%;">
            <el-header style="background-color:#252525;">
                <banner></banner>
            </el-header>
            <el-container style="height: calc(100% - 60px);">
                <el-aside width="200px" style="background-color: #35373F;">
                    <el-menu
                        :default-active="indexActive"
                        @select="select"
                        class="el-menu-vertical-demo"
                        background-color="#35373F"
                        text-color="#fff"
                        active-text-color="#fff"
                        :router="true"
                    >
                        <el-menu-item index="/status">
                            勤务状态流转图
                        </el-menu-item>
                        <el-menu-item index="/statusSets">
                            成员勤务状态管理
                        </el-menu-item>
                        <!-- <el-menu-item index="/deptStatusSets">
                            部门勤务状态管理
                        </el-menu-item> -->
                    </el-menu>
                </el-aside>
                <el-main>
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import banner from "@/components/customization/banner";

export default {
    data() {
        return {
            indexActive: sessionStorage.getItem("indexActive") || "/status"
        };
    },
    components: {
        banner
    },
    methods: {
        select(index) {
            sessionStorage.setItem("indexActive", index);
        }
    }
};
</script>

<style lang="less" scope>
html,
body {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
#app {
    width: 100%;
    height: 100%;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.is-active {
    background-color: #009688 !important;
}
.el-aside {
    height: 100%;
}
</style>
