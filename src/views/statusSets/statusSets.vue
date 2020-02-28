<template>
    <div class="taskPlanM">
        <div class="teskContent">
            <!-- 搜索 -->
            <div class="tesk_">
                <el-input v-model="vague" placeholder="姓名/编号" class="inputPlan" @keyup.enter.native="searchName"></el-input>
                <el-button type="primary" @click="searchName" icon="el-icon-search">搜索</el-button>
                <el-button v-show="checkedList.length>0" type="primary" @click="updStatus">编辑</el-button>
                <el-button v-show="checkedList.length>0" type="primary" @click="batchDelete">删除</el-button>
                <div class="tesk_right">
                    <el-button type="primary" @click="synchronousVisible=true">同步</el-button>
                    <!-- <el-button type="primary" @click="dialogTableVisible=true, rowData='', title='添加成员'">添加</el-button> -->
                </div>
            </div>
            <!-- 数据表格 -->
            <div class="taskPlanList">
                <div class="tree">
                    <zTree @returnData="getDeptData" />
                </div>
                <div class="table-box">
                    <el-table class="table" :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column label="成员姓名" align="center">
                            <template slot-scope="scope">{{ scope.row.memberName }}</template>
                        </el-table-column>
                        <el-table-column label="成员编号" align="center">
                            <template slot-scope="scope">{{ scope.row.memberSign }}</template>
                        </el-table-column>
						<el-table-column label="所属部门" align="center">
                            <template
                                slot-scope="scope"
                            >{{ scope.row.departmentName }}</template>
                        </el-table-column>
                        <el-table-column label="勤务模式" align="center">
                            <template
                                slot-scope="scope"
                            >{{ machineSign[scope.row.memberStateMachineSign] }}</template>
                        </el-table-column>
                        <el-table-column label="勤务状态" align="center">
                            <template
                                slot-scope="scope"
                            >{{ memberStateSigns[scope.row.memberStateSign] }}</template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" width="200">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="upd(scope.row)">编辑</el-button>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="delConfirm(scope.row)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="total"
                        class="pagination"
                        :pager-count="5"
                        :current-page="page"
                        :page-size="pageSize"
                        @current-change="handleCurrentChange"
                    ></el-pagination>
                </div>
            </div>
        </div>
        <!-- 添加设备 -->
        <el-dialog :title="title" :visible.sync="dialogTableVisible" :destroy-on-close="true">
            <addDevice :data="rowData" :batch="batch" @reload="reload"></addDevice>
        </el-dialog>
        <!-- 同步数据 -->
        <el-dialog title="从融合通信同步数据" :visible.sync="synchronousVisible" :destroy-on-close="true" width="800px">
            <synchrodata @close="closesync" />
        </el-dialog>
    </div>
</template>

<script>
import addDevice from "./addDevice";
import zTree from "@/components/common/zTree/tree";
import synchrodata from "./synchrodata";

export default {
    data() {
        return {
            tableData: [],
            taskType: "0",
            taskName: "",
            dialogTableVisible: false,
            synchronousVisible: false,
            title: "添加成员",
            finishStatus: "",
            total: 0,
            num: 0,
            noData: true,
            vague: "",
            rowData: "",
            batch: false,
            page: 1, // 分页
            pageSize: 10, // 分页数量
            departmentSign: "", // 查询的部门id
            machineSign: {
                TRAIN_POLICEMAN: "乘警",
                PATROLMAN: "巡警",
                CIVIL_POLICEMAN: "机关民警"
            },
            memberStateSigns: {
                "RESTING": "休息",
                "SET_OFF": "出乘",
                "INTERVAL": "间休",
                "INSTRUCTION_HANDLING": "处警",
                "PRE_GO_OFF": "预退乘",
                "PATROLLING": "巡逻",
                "PRE_LEAVE_PATROLLING": "预结束巡逻",
                "START_WORK": "上班"
            },
            checkedList: []
        };
    },
    components: {
        addDevice,
        zTree,
        synchrodata
    },
    methods: {
        // 获取数据表格
        getData() {
            let data = {
                pageNum: this.page,
                pageSize: this.pageSize,
                departmentSign: this.departmentSign,
                vague: this.vague
            };
            this.$get(this.$api.page, data).then(
                res => {
                    if (res.result == 0) {
                        this.tableData = res.data.records;
                        this.total = res.data.total;
                    } else {
                        this.$message.error("查询失败");
                    }
                }
            );
        },
        // 修改
        upd(d) {
            this.batch = false
            this.title = "修改成员状态"
            this.dialogTableVisible = true;
            this.rowData = d;
        },
        // 批量修改状态
        updStatus() {
            this.title = "批量修改成员状态"
            let memberSigns = ""
            if(this.checkedList.length > 0){
                this.checkedList.forEach( (d, i) => {
                    if(i == this.checkedList.length-1){
                        memberSigns += d.memberSign
                    }else{
                        memberSigns += d.memberSign+","
                    }
                })
                this.rowData = {
                    memberSign: memberSigns
                }
                this.batch = true
                this.dialogTableVisible = true;
            }else{
                this.$message({
                    message: "请选择人员",
                    type: "warning"
                })
                return
            }
        },
        // 删除
        delConfirm(item) {
            this.$confirm("您确定要删除成员"+item.memberName+"？删除后不可恢复", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let params = {
                    memberSignList: item.memberSign
                };
                this.$get(this.$api.delete, params).then(res => {
                    if (res.result == 0) {
                        this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                        this.getData();
                    } else {
                        this.$message.error("删除失败");
                    }
                });
            });
        },
        // 批量删除
        batchDelete() {
            let memberSigns = ""
            if(this.checkedList.length > 0){
                this.checkedList.forEach( (d, i) => {
                    if(i == this.checkedList.length-1){
                        memberSigns += d.memberSign
                    }else{
                        memberSigns += d.memberSign+","
                    }
                })
            }else{
                this.$message({
                    message: "请选择人员",
                    type: "warning"
                })
                return
            }
            this.$confirm("您确定要批量删除成员？删除后不可恢复", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let params = {
                    memberSignList: memberSigns
                };
                this.$get(this.$api.delete, params).then(res => {
                    if (res.result == 0) {
                        this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                        this.getData();
                    } else {
                        this.$message.error("删除失败");
                    }
                });
            });
        },
		// 分页
        handleCurrentChange(newPage) {
            this.page = newPage;
            this.getData();
		},
		// 搜索
        searchName() {
            if(this.vague == ''){
                this.departmentSign = ''
            }
            this.getData();
        },
        // 添加或修改成功之后更新列表
        reload(v) {
            if(v == 'notReload'){
                this.dialogTableVisible = false;
            }else{
                this.dialogTableVisible = false;
                this.getData();
            }
        },
        // 获取部门id重新加载数据表格
        getDeptData(d){
            if(this.departmentSign != d.id){
                this.departmentSign = d.id;
                this.getData();
            }else{
                this.departmentSign = "";
                this.getData();
                // 防止去除父节点class时无效
                setTimeout(() => {
                    let dom = document.getElementsByClassName("is-current")[0];
                    let classVal = dom.getAttribute("class").replace("is-current","");
                    dom.setAttribute("class", classVal);
                }, 200);
            }
        },
        checkedData(d){
            this.$emit("checkedData", d)
        },
        close(){
            this.$emit("close")
        },
        handleSelectionChange(val){
            console.log(val)
            this.checkedList = val
        },
        closesync(){
            this.getData()
            this.synchronousVisible = false
        }
    },
    mounted() {
        this.getData();
    }
};
</script>

<style lang="less" scoped>
.taskPlanM {
    margin: 20px;
    .teskContent {
        background: white;
        padding: 20px;
        box-shadow: 0 0 10px #ccc;
        border-radius: 6px;
        .tesk_ {
            display: flex;
            position: relative;
            padding-bottom: 15px;
            border-bottom: 1px solid #d6d6d6;
            .inputPlan {
                width: 300px;
            }
            .tesk_right {
                position: absolute;
                right: 20px;
            }
        }
        .taskPlanList {
            display: flex;
            height: 648px;
            .tree {
                width: 300px;
                height: 100%;
                border: 1px solid #d6d6d6;
                border-top: 0;
                overflow: auto;
            }
            .table-box {
                flex: 1;
                height: 100%;
                .table {
                    text-align: center;
                }
            }
        }
    }
}
.taskPlanContent {
    .complete {
        font-size: 14px;
        text-align: left;
        margin-top: 10px;
        border-bottom: 1px solid #d6d6d6;
        em {
            display: inline-block;
            margin-left: 10px;
            cursor: pointer;
        }
    }
    .pagination {
        margin-top: 50px;
    }
    .active {
        color: #409eff;
    }
}
.pagination {
    margin-top: 20px;
    padding-bottom: 20px;
    text-align: center;
    border-bottom: 1px solid #d6d6d6;
}
.online {
    color: #0ee20e;
}
.offline {
    color: #666;
}
.killed {
    color: red;
}
</style>