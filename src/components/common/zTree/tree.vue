<template>
    <div id="tree">
        <el-tree
            node-key="id"
            ref="zTree"
            :data="treeData"
            :props="defaultProps"
            :default-expanded-keys="defaultExpanded"
            :show-checkbox="checkbox"
            @check="handleCheckChange"
            @node-click="handleNodeClick"
        ></el-tree>
    </div>
</template>

<script>
export default {
    data() {
        return {
            treeData: [],
            defaultProps: {
                children: "children",
                label: "name",
                isLeaf: "leaf"
            },
            defaultExpanded: []
        };
    },
    props: {
        "checkbox": {
            type: Boolean,
            default: false
        }
    },
    created() {
        if(window.DEPT_DATA){
            this.treeData = [window.DEPT_DATA];
            this.defaultExpanded.push(window.DEPT_DATA.id);
        }else{
            this.departmentTree();
        }
    },
    methods: {
        // 获取部门树
        departmentTree() {
            this.$get(this.$api.departmentTree).then(res => {
                if (res.result == 0) {
                    window.DEPT_DATA = res.data
                    this.treeData = [res.data];
                    this.defaultExpanded.push(res.data.id);
                }
            });
        },
        handleNodeClick(data){
            this.$emit("returnData", data)
        },
        handleCheckChange(){
            this.$emit("returnCheckData", this.$refs.zTree.getCheckedNodes())
        }
    }
};
</script>

<style lang="less" scoped>
    #tree{
        /deep/.el-tree{
            .el-tree-node.is-current > .el-tree-node__content {
                background-color: #409EFF;
                color: #fff;
            }
        }
    }
</style>