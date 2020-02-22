<template>
    <div class="lowerTesk">
        <div class="site">
            <div class="siteSearch">
                <div class="siteContent">
                    <div class="input-block">
                        <p class="label">
                            <em>*</em>成员姓名
                        </p>
                        <el-input class="inp" v-model="model.memberName" placeholder="请输入姓名"></el-input>
                    </div>
                    <div class="input-block">
                        <p class="label">
                            <em>*</em>成员编号
                        </p>
                        <el-input class="inp" v-model="model.memberSign" placeholder="请输入编号"></el-input>
                    </div>
                    <div class="input-block">
                        <p class="label">
                            <em>*</em>警种
                        </p>
                        <el-select class="inp" v-model="model.memberStateMachineSign">
                            <el-option
                                v-for="(item, index) in memberStateMachineSign"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="input-block">
                        <p class="label">
                            <em>*</em>部门标识
                        </p>
                        <el-input class="inp" v-model="model.departmentName" @focus="showTree = true" placeholder="请选择部门"></el-input>
                    </div>
                    <div class="sure">
                        <el-button
                            v-show="isAdd"
                            type="primary"
                            class="lowerSure"
                            @click="addTerminal"
                        >确定</el-button>
                        <el-button
                            v-show="!isAdd"
                            type="primary"
                            class="lowerSure"
                            @click="updateTerminal"
                        >提交修改</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 选择部门 -->
        <el-dialog title="选择部门" :visible.sync="showTree">
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
                memberStateMachineSign: 'TRAIN_POLICEMAN' // 成员状态机标识：TRAIN_POLICEMAN 乘警 PATROLMAN 巡警 CIVIL_POLICEMAN 机关民警
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
            showTree: false
        }
    },
    props: {
        data: {
            type: Object,
            default: null
        }
    },
    components: {
        Tree
    },
    watch: {
        data(val) {
            this.loadData()
        }
    },
    methods: {
        // 处理数据，判断添加或修改
        loadData() {
            if (this.data) {
                this.isAdd = false;
                this.model.id = this.data.id
                for (let key in this.model) {
                    this.model[key] = this.data[key]
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
        },
        // 修改
        updateTerminal() {
            this.$get(this.$api.update, this.model).then(res => {
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
            .lowerSure {
                height: 30px;
                line-height: 0px;
                margin-top: 15px;
                margin-left: 100px;
                margin-bottom: 30px;
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
                width: 160px;
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