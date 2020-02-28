<template>
    <div class="lowerTesk">
        <div class="site">
            <div class="siteSearch">
                <div class="siteContent">
                    <div v-if="!batch" class="input-block">
                        <p class="label">
                            <em>*</em>成员姓名
                        </p>
                        <el-input class="inp" v-model="model.memberName" :disabled="!isAdd" placeholder="请输入姓名"></el-input>
                    </div>
                    <div v-if="!batch" class="input-block">
                        <p class="label">
                            <em>*</em>成员编号
                        </p>
                        <el-input class="inp" v-model="model.memberSign" :disabled="!isAdd" placeholder="请输入编号"></el-input>
                    </div>
                    <div class="input-block">
                        <p class="label">
                            <em>*</em>勤务模式
                        </p>
                        <el-select class="inp" v-model="model.memberStateMachineSign" @change="model.stateSign='RESTING'">
                            <el-option
                                v-for="(item, index) in memberStateMachineSign"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                    <div v-if="isAdd" class="input-block">
                        <p class="label">
                            <em>*</em>部门标识
                        </p>
                        <el-input class="inp" v-model="model.departmentName" @focus="showTree = true" placeholder="请选择部门"></el-input>
                    </div>
                    <div v-if="!isAdd" class="input-block">
                        <p class="label">
                            <em>*</em>勤务状态
                        </p>
                        <el-select class="inp" v-model="model.stateSign">
                            <el-option
                                v-for="(item, index) in statusOptions[model.memberStateMachineSign]"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="sure">
                        <el-button
                            type="primary"
                            class="btn-cancel"
                            @click="cancel"
                        >取消</el-button>
                        <el-button
                            type="primary"
                            class="btn-ok"
                            @click="addTerminal"
                        >确定</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 选择部门 -->
        <el-dialog title="选择部门" :visible.sync="showTree" :modal="false" >
            <Tree @returnData="getData" />
        </el-dialog>
    </div>
</template>

<script>
import Tree from "@/components/common/zTree/tree";

export default {
    data() {
        return {
            type: "",
            tableData: [],
            isAdd: true,
            model: {
                memberName: '',	// 成员名称
                memberSign: '', // 成员标识：警号
                departmentSign: '', // 部门标识：部门ID
                departmentName: '', // 部门名称
                memberStateMachineSign: 'TRAIN_POLICEMAN', // 成员状态机标识：TRAIN_POLICEMAN 乘警 PATROLMAN 巡警 CIVIL_POLICEMAN 机关民警
                stateSign: 'RESTING'   // 状态
            },
            memberStateMachineSign: [
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
            // 乘警：
            // RESTING, // 乘警、巡警、机关民警勤务状态流转中的休息状态
            // SET_OFF, // 乘警勤务状态流转中的出乘状态
            // INTERVAL, // 乘警的间休状态
            // INSTRUCTION_HANDLING, // 乘警、巡警勤务状态流转中的处警状态
            // PRE_GO_OFF, // 乘警勤务状态流转中的预退乘状态
            // 巡警：
            // RESTING, // 乘警、巡警、机关民警勤务状态流转中的休息状态
            // INSTRUCTION_HANDLING, // 乘警、巡警勤务状态流转中的处警状态
            // PATROLLING, // 巡警勤务状态流转中的巡逻状态
            // PRE_LEAVE_PATROLLING, // 巡警勤务状态流转中的预结束巡逻状态
            // 机关民警：
            // RESTING, // 乘警、巡警、机关民警勤务状态流转中的休息状态
            // START_WORK, // 机关民警勤务状态流转中的上班状态
            statusOptions: {
                TRAIN_POLICEMAN: [
                    {
                        label: "休息",
                        value: "RESTING"
                    },
                    {
                        label: "出乘",
                        value: "SET_OFF"
                    },
                    {
                        label: "间休",
                        value: "INTERVAL"
                    },
                    {
                        label: "处警",
                        value: "INSTRUCTION_HANDLING"
                    },
                    {
                        label: "预退乘",
                        value: "PRE_GO_OFF"
                    }
                ],
                PATROLMAN: [
                    {
                        label: "休息",
                        value: "RESTING"
                    },
                    {
                        label: "处警",
                        value: "INSTRUCTION_HANDLING"
                    },
                    {
                        label: "巡逻",
                        value: "PATROLLING"
                    },
                    {
                        label: "预结束巡逻",
                        value: "PRE_LEAVE_PATROLLING"
                    }
                ],
                CIVIL_POLICEMAN: [
                    {
                        label: "休息",
                        value: "RESTING"
                    },
                    {
                        label: "上班",
                        value: "START_WORK"
                    }
                ],
            },
            showTree: false
        }
    },
    props: {
        data: {
            type: Object,
            default: null
        },
        batch: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Tree
    },
    watch: {
        batch(val) {
            this.batch =val
        },
        data() {
            this.loadData()
        }
    },
    methods: {
        // 处理数据，判断添加或修改
        loadData() {
            if (this.data) {
                this.isAdd = false;
                if(this.batch){
                    this.model = {
                        memberName: '',	// 成员名称
                        memberSign: this.data.memberSign, // 成员标识：警号
                        departmentSign: '', // 部门标识：部门ID
                        departmentName: '', // 部门名称
                        memberStateMachineSign: 'TRAIN_POLICEMAN', // 成员状态机标识：TRAIN_POLICEMAN 乘警 PATROLMAN 巡警 CIVIL_POLICEMAN 机关民警
                        stateSign: "RESTING"
                    }
                }else{
                    for (let key in this.model) {
                        this.model[key] = this.data[key]
                    }
                    this.model.stateSign = this.data.memberStateSign || "RESTING"
                }
            } else {
                this.isAdd = true;
                this.model = {
                    memberName: '',	// 成员名称
                    memberSign: '', // 成员标识：警号
                    departmentSign: '', // 部门标识：部门ID
                    departmentName: '', // 部门名称
                    memberStateMachineSign: 'TRAIN_POLICEMAN' // 成员状态机标识：TRAIN_POLICEMAN 乘警 PATROLMAN 巡警 CIVIL_POLICEMAN 机关民警
                }
            }
        },
        // 添加
        addTerminal() {
            if(this.isAdd){
                this.$get(this.$api.register, this.model).then(res => {
                    if (res.result == 0) {
                        this.$message({
                            message: "添加成功",
                            type: "success"
                        });
                        this.$emit("reload");
                    } else {
                        this.$message.error("添加失败");
                    }
                });
            } else {
                this.updateTerminal()
            }
        },
        // 修改
        updateTerminal() {
            let obj = {
                memberSign: this.model.memberSign,
                stateMachineSign: this.model.memberStateMachineSign,
                stateSign: this.model.stateSign
            }
            this.$get(this.batch ? this.$api.setMemberStateBatch : this.$api.upd, obj).then(res => {
                if (res.result == 0) {
                    this.$message({
                        message: "修改成功",
                        type: "success"
                    });
                    this.$emit("reload");
                } else {
                    this.$message.error("修改失败");
                }
            });
        },
        // 获取部门信息
        getData(d){
            this.model.departmentSign = d.id
            this.model.departmentName = d.name
            this.showTree = false
        },
        cancel(){
            this.$emit("reload", "notReload")
        }
    },
    mounted() {
        this.loadData();
    }
};
</script>

<style lang="less" scoped>
.lowerTesk {
    position: relative;
    z-index: 1;
    .site {
        .siteSearch {
            background: white;
            #map {
                height: 300px;
                width: 1000px;
            }
            > p {
                text-align: left;
                padding: 10px;
                font-size: 14px;
                em {
                    color: red;
                    position: relative;
                    top: 2px;
                    left: 2px;
                }
            }
        }
        .sure {
            text-align: left;
            margin-left: 100px;
            .btn-cancel {
                width: 120px;
                height: 40px;
                line-height: 0px;
                margin-top: 15px;
                margin-bottom: 30px;
                background-color: #D7DEE5;
                border: 0;
            }
            .btn-ok {
                width: 120px;
                height: 40px;
                line-height: 0px;
                margin-top: 15px;
                margin-left: 20px;
                margin-bottom: 30px;
                background-color: #409EFF;
                color: #fff;
                border: 0;
            }
        }
    }
    .siteContent {
        padding: 20px;
        font-size: 14px;
        .input-block {
            display: flex;
            margin-bottom: 10px;
            position: relative;
            .label {
                width: 90px;
                line-height: 40px;
                em {
                    color: red;
                    position: relative;
                    top: 2px;
                    left: 2px;
                }
            }
            .account-box {
                position: absolute;
                min-width: 500px;
                z-index: 32008;
                background: #fff;
                box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
                border-radius: 4px;
                padding: 10px;
                margin-top: 3px;
                .account-search {
                    margin-bottom: 5px;
                    .inputPlan {
                        width: 220px;
                        display: inline-block;
                    }
                }
                .account-table {
                    width: 100%;
                    .pagination {
                        margin-top: 10px;
                        text-align: center;
                    }
                }
            }

            .inp {
                flex: 1;
            }
            .danwei {
                width: 100px;
                text-align: center;
                line-height: 40px;
                font-size: 16px;
            }
        }
        .lowerDiv {
            display: flex;
            width: 700px;
            border: 1px solid #ccc;
            border-radius: 2px;
            margin-left: 30px;
            .lowerDivLeft {
                flex: 1;
                padding: 15px;
                .search {
                    display: flex;
                    margin-bottom: 20px;
                }
            }
            .peopleList {
                flex: 1.5;
                border-left: 1px solid #ccc;
                .noData1 {
                    color: #9a9a9a;
                    line-height: 54px;
                    border-bottom: none;
                }
                .noData1:hover {
                    background: white;
                }
                li {
                    height: 34px;
                    line-height: 34px;
                    border-bottom: 1px solid #eee;
                    cursor: pointer;
                }
                .active {
                    background: #409eff;
                    color: white;
                }
                li:hover {
                    background: #eee;
                }
            }
        }
        .title {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            .el-icon-circle-plus-outline {
                color: #409eff;
                font-size: 20px;
                cursor: pointer;
            }
        }
        .tpl {
            position: relative;
            margin-top: 10px;
            padding: 10px 20px;
            border: 1px dashed #ccc;
            .el-icon-error {
                position: absolute;
                top: -10px;
                right: -10px;
                font-size: 20px;
                cursor: pointer;
                color: #e70012;
            }
        }
    }
}
.el-dialog__body {
    padding: 0;
}
.el-radio {
    line-height: 40px;
}
.el-select-dropdown {
    display: none !important;
}
</style>