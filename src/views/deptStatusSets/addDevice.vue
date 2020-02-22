<template>
    <div class="lowerTesk">
        <div class="site">
            <div class="siteSearch">
                <div class="siteContent">
                    <div class="input-block">
                        <p class="label">
                            设备账号
                            <em>*</em>
                        </p>
                        <div class="inp">
                            <el-input
                                @click.native="accountShow = !accountShow"
                                v-model="this.model.accountName"
                                placeholder="请选择"
                            />
                            <div class="account-box" v-show="accountShow">
                                <div class="account-search">
                                    <el-input
                                        v-model="keyword"
                                        placeholder="请输入关键字"
                                        class="inputPlan"
                                    ></el-input>
                                    <el-button
                                        type="primary"
                                        @click="searchName"
                                        icon="el-icon-search"
                                    >搜索</el-button>
                                </div>
                                <div class="account-table">
                                    <el-table
                                        :data="tableData"
                                        @row-click="getAccountName"
                                        border
                                        tooltip-effect="dark"
                                        style="width: 100%,text-align: center;"
                                    >
                                        <el-table-column label="账号编号" align="center">
                                            <template slot-scope="scope">{{ scope.row.accountNo }}</template>
                                        </el-table-column>
                                        <el-table-column label="账号名称" align="center">
                                            <template slot-scope="scope">{{ scope.row.accountName }}</template>
                                        </el-table-column>
                                    </el-table>
                                    <el-pagination
                                        background
                                        layout="prev, pager, next"
                                        :total="total"
                                        class="pagination"
                                        :pager-count="5"
                                        :current-page="page+1"
                                        :page-size="pageSize"
                                        @current-change="handleCurrentChange"
                                    ></el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="input-block">
                        <p class="label">
                            个呼模式
                            <em>*</em>
                        </p>
                        <el-select class="inp" v-model="model.privateCallMode">
                            <el-option
                                v-for="(item, index) in privateCallModeSelect"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="input-block">
                        <p class="label">
                            归属于
                            <em>*</em>
                        </p>
                        <el-select class="inp" v-model="model.belongToId">
                            <el-option
                                v-for="(item, index) in belongToIdSelect"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="input-block">
                        <p class="label">
                            是否保存录音
                            <em>*</em>
                        </p>
                        <el-radio v-model="model.saveRecording" :label="true">是</el-radio>
                        <el-radio v-model="model.saveRecording" :label="false">否</el-radio>
                    </div>
                    <div class="input-block">
                        <p class="label">
                            设备类型
                            <em>*</em>
                        </p>
                        <el-select class="inp" v-model="model.deviceType">
                            <el-option
                                v-for="(item, index) in deviceTypeSelect"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="input-block">
                        <p class="label">
                            业务优先级
                            <em>*</em>
                        </p>
                        <el-select class="inp" v-model="model.bussinessPriority">
                            <el-option
                                v-for="(item, index) in 9"
                                :key="index"
                                :label="item"
                                :value="item"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="input-block">
                        <p class="label">
                            外部设备编号
                            <em>*</em>
                        </p>
                        <el-input class="inp" v-model="model.deviceNoOfOuter" placeholder="请输入"></el-input>
                    </div>
                    <div class="input-block">
                        <p class="label">
                            是否自动上报GPS
                            <em>*</em>
                        </p>
                        <el-radio v-model="model.enableGpsAlert" :label="true">是</el-radio>
                        <el-radio v-model="model.enableGpsAlert" :label="false">否</el-radio>
                    </div>
                    <div class="input-block">
                        <p class="label">
                            GPS默认扫描频率(秒)
                            <em>*</em>
                        </p>
                        <el-input class="inp" v-model="model.defaultGpsFrequency" placeholder="请输入"></el-input>
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            type: "",
            tableData: [],
            isAdd: true,
            model: {
                accountName: "", // 设备账号
                privateCallMode: "", // 个呼模式
                saveRecording: true, // 是否保存录音
                deviceType: "", // 设备类型
                bussinessPriority: "", // 业务优先级
                deviceNoOfOuter: "", // 外部设备编号
                accountId: "", // 对应的账号ID
                belongToId: "", // 归属的系统ID
                enableGpsAlert: true, // 是否自动上报GPS
                defaultGpsFrequency: "30", // GPS默认扫描频率
                defaultAccountNo: null, // 设备的默认账号
                id: "" // 设备ID
            },
            accountNameSelect: [],
            bussinessPrioritySelect: [],
            deviceTypeSelect: [],
            privateCallModeSelect: [
                {
                    label: "全双工",
                    value: "CALL_MODE_TYPE_FULL_DUPLEX"
                },
                {
                    label: "半双工",
                    value: "CALL_MODE_TYPE_HALF_DUPLEX"
                }
            ],
            belongToIdSelect: [
                {
                    label: "VSX",
                    value: "1"
                }
            ],
            keyword: "",
            rowData: "",
            total: 0,
            page: 0, // 分页
            pageSize: 10, // 分页数量,
            accountShow: false // 获取设备账号
        };
    },
    props: ["data"],
    watch: {
        data(val) {
            console.log(val);
            this.loadData();
        }
    },
    methods: {
        loadData() {
            if (this.data) {
                this.isAdd = false;
                this.model.accountName = this.data.account.accountName;
                this.model.privateCallMode = this.data.privateCallMode;
                this.model.saveRecording = this.data.saveRecording;
                this.model.deviceType = this.data.deviceType;
                this.model.bussinessPriority = this.data.bussinessPriority;
                this.model.deviceNoOfOuter = this.data.deviceNoOfOuter;
                this.model.belongToId = this.data.belongToId;
                this.model.enableGpsAlert = this.data.enableGpsAlert;
                this.model.defaultGpsFrequency = this.data.defaultGpsFrequency;
                this.model.defaultAccountNo = this.data.defaultAccountNo;
                this.model.id = this.data.id;
                this.model.accountId = this.data.account.id;
            } else {
                this.isAdd = true;
                this.model.accountName = "";
                this.model.privateCallMode = "";
                this.model.saveRecording = true;
                this.model.deviceType = "";
                this.model.bussinessPriority = "";
                this.model.deviceNoOfOuter = "";
                this.model.belongToId = "";
                this.model.enableGpsAlert = true;
                this.model.defaultGpsFrequency = 30;
                this.model.defaultAccountNo = "";
            }
        },
        // 获取账号数据
        getAccount() {
            let params = new URLSearchParams();
            params.append("page", this.page);
            params.append("pageSize", this.pageSize);
            params.append("sortField", "id");
            params.append("sortOrder", "asc");
            params.append("searchKey", this.keyword);
            this.$post(this.$api.getAccount, params).then(res => {
                if (res.status == 200) {
                    this.tableData = res.content.content;
                    this.tableData.forEach(d => {
                        if (d.accountName == this.model.accountName) {
                            this.model.accountId = d.id;
                        }
                    });
                    this.total = res.content.count;
                } else {
                    this.$message.error("查询失败");
                }
            });
        },
        // 选取账号
        getAccountName(val) {
            this.model.accountName = val.accountName;
            this.model.accountId = val.id;
            this.accountShow = false;
        },
        handleCurrentChange(newPage) {
            this.page = newPage - 1;
            this.getAccount();
        },
        // 账号搜索
        searchName() {
            this.getAccount();
        },
        // 添加域
        addTerminal() {
            let params = new URLSearchParams();
            params.append("privateCallMode", this.model.privateCallMode);
            params.append("saveRecording", this.model.saveRecording);
            params.append("deviceType", this.model.deviceType);
            params.append("bussinessPriority", this.model.bussinessPriority);
            params.append("deviceNoOfOuter", this.model.deviceNoOfOuter);
            params.append("account.id", this.model.accountId);
            params.append("belongToId", this.model.belongToId);
            params.append("enableGpsAlert", this.model.enableGpsAlert);
            params.append(
                "defaultGpsFrequency",
                this.model.defaultGpsFrequency
            );
            params.append("defaultAccountNo", this.model.defaultAccountNo);
            this.$post(this.$api.addDevice, params).then(res => {
                if (res.status == 200) {
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
        // 修改域
        updateTerminal() {
            let params = new URLSearchParams();
            params.append("privateCallMode", this.model.privateCallMode);
            params.append("saveRecording", this.model.saveRecording);
            params.append("deviceType", this.model.deviceType);
            params.append("bussinessPriority", this.model.bussinessPriority);
            params.append("deviceNoOfOuter", this.model.deviceNoOfOuter);
            params.append("account.id", this.model.accountId);
            params.append("belongToId", this.model.belongToId);
            params.append("enableGpsAlert", this.model.enableGpsAlert);
            params.append(
                "defaultGpsFrequency",
                this.model.defaultGpsFrequency
            );
            params.append("defaultAccountNo", this.model.defaultAccountNo);
            params.append("id", this.model.id);
            this.$post(this.$api.updDevice, params).then(res => {
                if (res.status == 200) {
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
        // 获取所有设备类型
        getAllDeviceType() {
            this.$get(this.$api.getAllDeviceType).then(res => {
                if (res.status == 200) {
                    let arr = [];
                    res.content.forEach(d => {
                        arr.push({
                            label: d.description,
                            value: d.sign
                        })
                    });
                    this.deviceTypeSelect = arr
                }
            });
        }
    },
    created() {
        this.getAllDeviceType()
    },
    mounted() {
        this.getAccount();
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