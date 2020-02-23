<template>
	<div class="taskPlanM">
		<div class="teskContent">
			<!-- 搜索 -->
			<div class="tesk_">
				<el-input v-model="keyword" placeholder="请输入关键字" class="inputPlan"></el-input>
				<el-button type="primary" @click="searchName" icon="el-icon-search">搜索</el-button>
				<div class="tesk_right">
					<el-button type="primary" @click="dialogTableVisible=true, rowData=''">刷新</el-button>
					<el-button type="primary" @click="dialogTableVisible=true, rowData=''">同步</el-button>
					<el-button type="primary" @click="dialogTableVisible=true, rowData=''">添加</el-button>
				</div>
			</div>
			<!-- 数据表格 -->
			<div class="taskPlanList">
				<el-table :data="tableData" tooltip-effect="dark" style="width: 100%,text-align: center;">
                    <el-table-column label="部门名称" align="center">
						<template slot-scope="scope">{{ scope.row.account.accountName }}</template>
					</el-table-column>
                    <el-table-column label="勤务模式" align="center">
						<template slot-scope="scope">{{ scope.row.account.accountNo }}</template>
					</el-table-column>
                     <el-table-column label="有效期" align="center">
						<template slot-scope="scope"><span :class="statusClass[scope.row.deviceStatus]">{{ deviceStatus[scope.row.deviceStatus] }}</span></template>
					</el-table-column>
					<el-table-column label="操作" fixed="right" width="200">
						<template slot-scope="scope">
							<el-button size="mini" @click="getDetail(scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="delConfirm(scope.row)">删除</el-button>
						</template>
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
		<!-- 添加设备 -->
		<el-dialog title="设备信息" :visible.sync="dialogTableVisible">
			<addDevice :data="rowData" @reload="reload"></addDevice>
		</el-dialog>
	</div>
</template>

<script>
	import addDevice from "./addDevice"
	import upload from "@/components/common/upload"
	export default {
		data() {
			return {
				tableData: [],
				taskType: "0",
				taskName: "",
				dialogTableVisible: false,
				finishStatus: "",
				total: 0,
				num: 0,
				noData: true,
				keyword: "",
				rowData: "",
				page:0, // 分页
				pageSize:10, // 分页数量
				deviceType:{
					DEVICE_UAV:"无人机",
					DEVICE_PHONE:"警务通",
					DEVICE_PC:"指挥中心终端"
				},
				deviceStatus:{
					ONLINE:"已在线",
					OFFLINE:"已离线",
					KILLED:"已遥毙"
				},
				statusClass:{
					ONLINE:"online",
					OFFLINE:"offline",
					KILLED:"killed"
				}
			};
		},
		components: {
			addDevice,
			upload
		},
		methods: {
			getTerminal() {
				let params = new URLSearchParams();
				params.append("page", this.page);
				params.append("pageSize", this.pageSize);
				params.append("sortField", "");
				params.append("sortOrder", "asc");
				params.append("searchKey", this.keyword);
				this.$post(this.$api.getDevice, params).then(res => {
					if (res.status == 200) {
						this.tableData = res.content.content;
						this.total = res.content.count;
					} else {
						this.$message.error("查询失败");
					}
				});
			},
			// 修改
			getDetail(d) {
				this.dialogTableVisible = true;
				this.rowData = d;
			},
			// 删除分类
			delConfirm(item) {
				if(item.deviceStatus == "ONLINE"){
					this.$alert('在线终端无法被删除，请先遥毙终端后再进行删除', '系统提示', {
						confirmButtonText: '确定'
					});
				}else{
					this.$confirm("您确定要删除该终端吗，删除后不可恢复", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}).then(() => {
						this.deleteTerminal(item.id);
					});
					}
			},
			deleteTerminal(id) {
				let params = new URLSearchParams();
				params.append("id", id)
				this.$post(this.$api.deleteDevice, params).then(res => {
					if (res.status == 200) {
						this.$message({
							message: "删除成功",
							type: "success"
						});
						this.getTerminal();
					} else {
						this.$message.error("删除失败");
					}
				});
			},
			handleCurrentChange(newPage) {
                this.page = newPage-1;
                this.getTerminal();
            },
			searchName() {
				this.getTerminal();
			},
			reload() {
				this.dialogTableVisible = false;
				this.getTerminal();
			},
			// 文件模板下载
			downloadTemplet(){
				window.location.href = this.$api.downloadTempletDevice
			},
			// 遥毙终端
			dieDevice(item){
				if(item.deviceStatus == "KILLED"){
					this.$confirm('您确定要解除该遥毙终端吗？', '信息确认', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
						}).then(() => {
							let params = new URLSearchParams();
								params.append("id", item.id)
							this.$post(this.$api.unDieDevice, params).then(res => {
								if(res.status == 200){
									this.$message({
										message:"遥毙终端解除成功",
										type:"success"
									});
									this.reload();
								}
							})
						}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});          
						});
				}else{
					this.$confirm('警告：您确认要遥毙该终端吗？(该操作会使终端app无法使用)', '信息确认', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
						}).then(() => {
							let params = new URLSearchParams();
								params.append("id", item.id) 
							this.$post(this.$api.dieDevice, params).then(res => {
								if(res.status == 200){
									this.$message({
										message:"遥毙终端成功",
										type:"success"
									});
									this.reload();
								}else{
									this.$message({
										message:"遥毙终端失败",
										type:"warning"
									})
								}
							})
						}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});          
					});
				}
			}
		},
		mounted() {
			this.getTerminal();
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
	text-align: center;
}
.online{
    color:#0ee20e;
}
.offline{
	color:#666;
}
.killed{
	color: red
}
</style>