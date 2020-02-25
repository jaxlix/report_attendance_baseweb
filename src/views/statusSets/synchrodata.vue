<template>
    <div id="synchrodata">
        <div class="tree-box">
            <zTree :checkbox="true" @returnCheckData="getCheckData" />
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
            list: [],
            listObj: {},
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
            ]
        }
    },
    components: {
        zTree
    },
    methods: {
        getlist(deptId){
            this.$get(this.$api.findAccountsByDeptId, {deptId: deptId}).then( res => {
                if(res.result == 0){
                    // let arr = []
                    // for (let index = 0; index < res.data.length; index++) {
                    //     const e = res.data[index];
                    //     if(this.listObj[e.accountNo] != e.departmentId){
                    //         arr.push(e)
                    //         this.listObj[e.accountNo] = e.departmentId
                    //     }
                    // }
                    this.list = this.list.concat(res.data)
                }
            })
        },
        getCheckData(d){
            console.log(this.checks)
            this.list = []
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
            let p = new URLSearchParams()
            p.append("tMembers", JSON.stringify(arr))
            this.$post(this.$api.registerBatch, p).then( res => {
                if(res.result == 0){
                    this.$message({
                        message: "同步成功",
                        type: 'success'
                    })
                    this.$emit("close")
                }
            })
        },
        del(i){
            let d = this.list[i]
            delete this.listObj[d.accountNo]
            this.list.splice(i, 1)
        },
        cancel(){
            this.$emit("close")
        }
    }
}
</script>

<style lang="less" scoped>
    #synchrodata{
        display: flex;
        .tree-box{
            width: 300px;
            height: 400px;
            overflow: auto;
            border-right: 1px solid #f5f5f5;
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