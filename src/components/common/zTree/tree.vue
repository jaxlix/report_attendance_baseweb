<template>
    <div>
        <el-tree
            node-key="id"
            :data="treeData"
            :props="defaultProps"
            :default-expanded-keys="defaultExpanded"
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
    created() {
        console.log(window.DEPT_DATA)
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
        }
    }
};
</script>