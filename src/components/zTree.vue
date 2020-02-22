<template>
    <div id="tree">
        <div class="tree-content">
            <div class="tree-tree">
                <el-tree
                    node-key="id"
                    lazy
                    show-checkbox
                    :load="loadNode"
                    @node-expand="handleNodeClick"
                    @node-click="handleNodeClick"
                    @check-change="handleCheckChange"
                    :props="defaultProps"
                ></el-tree>
            </div>
            <div class="tree-checked">
                <p class="title">已选择</p>
                <div class="list">
                    <div class="item" v-for=" (item, key) in checked" :key="key">{{ item.name }}</div>
                </div>
                <div class="btns">
                    <el-button type="primary" size="mini" @click="commit">确定</el-button>
                    <el-button type="warning" size="mini" @click="cancel">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Loading } from "element-ui";
export default {
    data() {
        return {
            groupData: [
                {
                    //todo 测试数据
                    id: "557",
                    name: "东湖分局",
                    children: []
                }, {
                    id: "wbxtz",
                    name: "东湖分局外部系统组",
                    children: []
                }
            ],
            peopleData: [
                {
                    //todo 测试数据
                    id: "557",
                    name: "东湖分局",
                    children: []
                }
            ],
            defaultProps: {
                children: "children",
                label: "name",
                isLeaf: 'leaf'
            },
            //todo 测试数据
            deptId: 557,    // 需要加载的部门id
            checked: []     // 选中项
        };
    },
    props: ['type'],    // type(group: 选择组    people：选择人) 
    methods: {
        // 获取组织结构和组
        getDeptData() {
            let p = new URLSearchParams();
            p.append("type", "DEPARTMENTS_GROUPS_DATA");

           p.append("memberUniqueNo", "330997587366641664");
            //todo 测试数据
//             p.append("memberUniqueNo", "338857923058860032");
            p.append("deptId", this.deptId);
            this.$post(this.$api.getDeptData, p).then(res => {
                let deptList = res.memberGroups.deptList
                let groupList = res.memberGroups.groupList
                groupList.forEach( e => {
                    e.leaf = true
                });
                let arr = deptList.concat(groupList)
                this.resolve(arr)
            });
        },
        // 获取东湖分局外部系统组
        getWbxtzData() {
            let p = new URLSearchParams();
            p.append("type", "PC_PDTGROUP_BY_DEPT");

         p.append("memberUniqueNo", "330997587366641664");
            //todo 测试数据
//             p.append("memberUniqueNo", "338857923058860032");
            p.append("deptId", '557');
            this.$post(this.$api.getDeptData, p).then(res => {
                this.resolve(res.pdtGroups)
            });
        },
        // 获取部门人员
        getPeople() {
            let p = new URLSearchParams();
            p.append("type", "PC_CONTACTS_ALL_DATA");

           p.append("memberUniqueNo", "330997587366641664");
            //todo 测试数据
//             p.append("memberUniqueNo", "338857923058860032");
            p.append("deptId", this.deptId);
            this.$post(this.$api.getDeptData, p).then(res => {
                let deptList = res.allMember.deptList
                let accountDtos = res.allMember.accountDtos
                accountDtos.forEach( e => {
                    e.leaf = true
                });
                let arr = deptList.concat(accountDtos)
                this.resolve(arr)
            });
        },
        handleCheckChange(data, checked, indeterminate) {
            if(checked){
                if(data.leaf){
                    this.checked.push(data)
                }
            }else{
                if(data.leaf){
                    this.checked.forEach( (d, i) => {
                        if(d.id == data.id){
                            this.checked.splice(i,1)
                        }
                    })
                }
            }
        },
        handleNodeClick(data) {
            if(this.type == 'group'){
                if(data.id == 'wbxtz'){
                    this.getWbxtzData()
                }else{
                    if(!data.leaf){
                        this.deptId = data.id
                        this.getDeptData()
                    }
                }
            }else if(this.type == 'people'){
                if(!data.leaf){
                    this.deptId = data.id
                    this.getPeople()
                }
            }
        },
        loadNode(node, resolve){
            this.resolve = resolve
            if (node.level === 0) {
                if(this.type == 'group'){
                    return resolve(this.groupData);
                }else if(this.type == 'people'){
                    return resolve(this.peopleData);
                }
            }
            // if (node.level > 3) return resolve([]);
            if(this.type == 'group'){
                if(node.data.id == 'wbxtz'){
                    this.getWbxtzData()
                }else{
                    this.getDeptData()
                }
            }else{
                this.getPeople()
            }
        },
        commit(){
            this.$emit('getTreeData', this.checked)
        },
        cancel(){
            this.$emit('treeClose')
        }
    }
};
</script>

<style lang="less" scope>
    #tree{
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9999999;
        background-color: rgba(0, 0, 0, .5);
        .tree-content{
            display: flex;
            width: 700px;
            height: 600px;
            padding: 20px;
            background-color: #fff;
            border-radius: 4px;
            .tree-tree{
                width: 400px;
                height: 600px;
                padding-right: 10px;
                overflow: auto;
                border-right: 1px solid #f5f5f5;
            }
            .tree-tree::-webkit-scrollbar {
                display: none;
            }
            .tree-checked{
                flex: 1;
                height: 600px;
                padding-left: 10px;
                overflow: auto;
                .title{
                    height: 40px;
                    line-height: 40px;
                }
                .list{
                    height: 520px;
                    overflow: auto;
                    .item{
                        display: flex;
                        padding-top: 10px;
                        padding-bottom: 10px;
                        border-bottom: 1px solid #f5f5f5;
                    }
                }
                .btns{
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                }
            }
            .tree-checked::-webkit-scrollbar {
                display: none;
            }
        }
    }
</style>