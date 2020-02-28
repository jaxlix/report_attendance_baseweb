<template>
    <div id="synchrodata">
        <div class="search">
            <input v-model="kw" placeholder="姓名/警号" @keyup.enter="search" />
            <i class="el-icon-search" @click="search"></i>
        </div>
        <div class="tree-box">
            <div v-show="searchList.length>0" class="search-list">
                <div class="item" v-for="(d, i) in searchList" :key="i" @click="checkSearch(i)">
                    <span>{{d.accountName}}</span>
                    <span>{{d.accountNo}}</span>
                    <i class="el-icon-check" :class="listObj_search[d.accountNo] ? 'checked' : ''"></i>
                </div>
            </div>
            <zTree v-show="searchList.length==0" :checkbox="true" @returnCheckData="getCheckData" />
        </div>
        <div class="list">
            <div class="title">
                <span>已添加（{{list.length}}）</span>
                <div class="inp-inline">
                    <label>选择勤务模式：</label>
                    <el-select class="inp" v-model="memberStateMachineSign">
                        <el-option
                            v-for="(item, index) in memberStateMachineSignOptions"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
            </div>
            <div class="content">
                <div class="item" v-for="(d, i) in list" :key="i">
                    <span>{{d.accountName}}</span>
                    <span>{{d.accountNo}}</span>
                    <i class="el-icon-close" @click="del(i)"></i>
                </div>
            </div>
            <div class="btns">
                <button @click="cancel">取消</button>
                <button @click="registerBatch">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
import zTree from "@/components/common/zTree/tree";
export default {
    data () {
        return {
            list: [],   // 总勾选人员列表
            list_tree: [],  // 树组件中勾选的部门人员列表
            // listObj: {},
            list_search: [],
            listObj_search: {},
            checks: {},
            memberStateMachineSign: 'TRAIN_POLICEMAN',
            memberStateMachineSignOptions: [
                {
                    label: "乘警",
                    value: "TRAIN_POLICEMAN"
                },
                {
                    label: "巡警",
                    value: "PATROLMAN"
                },
                {
                    label: "机关民警",
                    value: "CIVIL_POLICEMAN"
                }
            ],
            kw: '',
            searchList: []
        }
    },
    components: {
        zTree
    },
    methods: {
        getlist(deptId){
            this.$get(this.$api.findAccountsByDeptId, {deptId: deptId}).then( res => {
                if(res.result == 0){
                    this.list_tree = this.list_tree.concat(res.data)
                    this.list = this.list_tree.concat(this.list_search)
                }
            })
        },
        getCheckData(d){
            this.list_tree = []
            d.forEach( e => {
                // if(!this.checks[e.id]){
                //     this.checks[e.id] = true
                // }
                this.getlist(e.id)
            })
            // for (const key in this.checks) {
            //     if(this.checks[key]){
            //         let h = false
            //         d.forEach( e => {
            //             if(key == e.id){
            //                 h = true
            //             }
            //         })
            //         if(!h){
            //             this.checks[key] = false
            //             let arr = []
            //             this.list.forEach( (item) => {
            //                 if(item.departmentId != key){
            //                     arr.push(item)
            //                 }
            //             })
            //             this.list = arr
            //         }
            //     }
            // }
        },
        registerBatch(){
            if(this.list.length == 0){
                return
            }
            let arr = []
            this.list.forEach( d => {
                arr.push({
                    memberSign: d.accountNo,
                    memberName: d.accountName,
                    departmentSign: d.departmentId,
                    memberStateMachineSign: this.memberStateMachineSign
                })
            })
            this.$postJson(this.$api.registerBatch, arr).then( res => {
                if(res.result == 0){
                    this.$message({
                        message: "同步成功",
                        type: 'success'
                    })
                    this.$emit("close")
                }else{
                    this.$message({
                        message: "同步失败",
                        type: 'error'
                    })
                }
            })
        },
        del(i){
            let d = this.list[i]
            // delete this.listObj[d.accountNo]
            delete this.listObj_search[d.accountNo]
            this.list.splice(i, 1)
        },
        cancel(){
            this.$emit("close")
        },
        // 搜索
        search(){
            if(this.kw == ''){
                this.searchList = []
            }else{
                this.$get(this.$api.findAccountsByKey, {key: this.kw, pageNum: 1, pageSize: 1000}).then( res => {
                    if(res.result == 0 && res.data.records.length>0){
                        this.searchList = res.data.records
                    }else{
                        this.$message({
                            message: "未搜索到匹配人员",
                            type: "warning"
                        })
                    }
                })
            }
        },
        checkSearch(i){
            let d = this.searchList[i]
            if(this.listObj_search[d.accountNo]){
                this.list_search.splice(i, 1)
                delete this.listObj_search[d.accountNo]
            }else{
                this.$set(this.listObj_search, d.accountNo, true)
                this.list_search.push(d)
            }
            this.list = this.list_tree.concat(this.list_search)
        }
    }
}
</script>

<style lang="less" scoped>
    #synchrodata{
        display: flex;
        position: relative;
        .search{
            position: absolute;
            left: 0;
            top: -40px;
            height: 30px;
            margin-top: 7px;
            border: 1px solid #f5f5f5;
            border-radius: 15px;
            z-index: 9999999999;
            input{
                width: 230px;
                height: 22px;
                line-height: 22px;
                padding-left: 15px;
                padding-right: 40px;
                border-radius: 15px;
                border: 1px solid #ccc;
                font-size: 14px;
            }
            i{
                position: absolute;
                top: 0;
                right: 0;
                width: 40px;
                height: 22px;
                text-align: center;
                line-height: 22px;
                color: #409EFF;
                font-weight: bold;
                cursor: pointer;
            }
        }
        .tree-box{
            width: 300px;
            height: 400px;
            overflow: auto;
            border-right: 1px solid #f5f5f5;
            .search-list{
                height: 380px;
                margin-bottom: 10px;
                overflow: auto;
                .item{
                    display: flex;
                    padding: 10px;
                    border-bottom: 1px solid rgba(100, 100, 100, .2);
                    cursor: pointer;
                    span{
                        flex: 1;
                    }
                    .el-icon-check{
                        width: 40px;
                        font-size: 20px;
                        text-align: center;
                        color: #dadada;
                        &.checked{
                            color: #409EFF;
                        }
                    }
                }
            }
        }
        .list{
            flex: 1;
            padding-left: 20px;
            padding-right: 20px;
            .title{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 5px;
                border-bottom: 1px solid #f5f5f5;
                .inp-inline{
                    .inp{
                        width: 170px;
                    }
                }
            }
            .content{
                height: 310px;
                margin-bottom: 10px;
                overflow: auto;
                .item{
                    display: flex;
                    align-items: center;
                    padding: 5px;
                    span{
                        flex: 1;
                        text-align: left;
                    }
                    .el-icon-close{
                        color: #e70012;
                        padding: 10px;
                        cursor: pointer;
                        font-weight: bold;
                    }
                }
            }
            .btns{
                height: 34px;
                text-align: center;
                button{
                    background-color: #D7DEE5;
                    width: 130px;
                    height: 34px;
                    margin-right: 20px;
                    border: 0;
                    text-align: center;
                    line-height: 34px;
                    cursor: pointer;
                    &:last-child{
                        background-color: #409EFF;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>