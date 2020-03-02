<template>
	<div class="taskPlanM">
		<div class="teskContent">
			<!-- 搜索 -->
			<div class="tesk_">
				<el-input v-model="keyword" placeholder="请输入关键字" class="inputPlan" @keyup.enter="search"></el-input>
				<el-button type="primary" @click="search" icon="el-icon-search">搜索</el-button>
				<div class="tesk_right">
					<!-- <el-button type="primary" @click="dialogTableVisible=true, rowData=''">添加</el-button> -->
				</div>
			</div>
			<!-- 数据表格 -->
			<div class="taskPlanList">
				<el-table :data="tableData" tooltip-effect="dark" style="width: 100%,text-align: center;">
                    <el-table-column label="勤务模式" align="center">
						<template slot-scope="scope">{{ scope.row.type }}</template>
					</el-table-column>
					<el-table-column label="包含的勤务状态" align="center">
						<template slot-scope="scope">{{ scope.row.types }}</template>
					</el-table-column>
					<el-table-column label="勤务状态流转逻辑" align="center">
						<template slot-scope="scope">
							<div :class="allScreen == scope.row.id ? 'allScreen' : 'hide'"  @click="allScreen=''">
								<img :src="scope.row.img" alt="">
							</div>
							<div class="img" @click="allScreen=scope.row.id">
								<img :src="scope.row.img" alt="" title="点击放大">
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [
					{
						id: 1,
						type: "乘警",
						types: "休息、出乘、预退乘、间休、处警",
						img: require("@/assets/icon/lc_cj.png")
					},
					{
						id: 2,
						type: "巡警",
						types: "休息、巡逻、预结束巡逻、处警",
						img: require("@/assets/icon/lc_xj.png")
					},
					{
						id: 3,
						type: "机关民警",
						types: "休息、上班",
						img: require("@/assets/icon/lc_jgmj.png")
					}
				],
				tableData2: [
					{
						id: 1,
						type: "乘警",
						types: "休息、出乘、预退乘、间休、处警",
						img: require("@/assets/icon/lc_cj.png")
					},
					{
						id: 2,
						type: "巡警",
						types: "休息、巡逻、预结束巡逻、处警",
						img: require("@/assets/icon/lc_xj.png")
					},
					{
						id: 3,
						type: "机关民警",
						types: "休息、上班",
						img: require("@/assets/icon/lc_jgmj.png")
					}
				],
				allScreen: '',
				keyword: ''
			};
		},
		methods: {
			search(){
				if(this.keyword == ''){
					this.tableData = this.tableData2
				}else{
					let arr = []
					this.tableData2.forEach( d => {
						if(d.type.indexOf(this.keyword) != -1){
							arr.push(d)
						}
					})
					this.tableData = arr
				}
			}
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
		.img{
			img{
				width: 390px;
				height: 190px;
				cursor: pointer;
			}
		}
		.allScreen{
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			background-color: rgba(0, 0, 0, .3);
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 99999;
			img{
				width: 600px;
			}
		}
		.hide{
			display: none;
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