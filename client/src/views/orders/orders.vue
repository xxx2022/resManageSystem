<template>
	<div class="order">
		<el-table :header-cell-style="{ background: '', color: '#000' }" :data="orderData" style="width: 100%">
			<el-table-column type="index" label="序号" width="90"></el-table-column>
			<el-table-column prop="food_name" label="菜名" width="180"></el-table-column>
			<el-table-column prop="attr" label="荤素"></el-table-column>
			<el-table-column prop="price" label="价格"></el-table-column>
			<el-table-column prop="name" label="用户姓名"></el-table-column>
			<el-table-column prop="order_num" label="菜品数量"></el-table-column>
			<el-table-column prop="status" label="订单状态" width="200">
				<template slot-scope="{ row }">
					<el-switch
						active-text="已确认"
						inactive-text="待确认"
						:active-value="1"
						:inactive-value="0"
						:width="30"
						v-model="row.status"
						@change="changeBtn(row)"
					></el-switch>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="{row}">
					<span class="text-btn" @click="del(row)">删除</span>
				</template>
			</el-table-column>
		</el-table>
		<div class="order-bottom">
            <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 15,20]"
            :page-size="pageSize"
            @size-change="handleSizeChange"
            @current-change="currentChange"
            :total="total"
            background
        ></el-pagination>
        </div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			orderData: [],
			controlStatus: "",
			total:0,
            currentPage:1,
            pageSize:10,
		};
	},
	mounted() {
		this.getOrderData();
	},
	methods: {
		getOrderData() {
			let params={
				currentPage: this.currentPage,
                pageSize: this.pageSize,
			}
			this.$axios.get("/api/users/orderDetail",{params}).then((res) => {
				this.orderData = res.data.data;
				this.total = res.data.total
			});
		},
		//控制订单状态按钮
		changeBtn(row) {
			this.$axios
				.post("/api/users/changeStatus", { status: row.status, id: row.o_id })
				.then((res) => {
					this.$message.success("操作成功");
					this.getOrderData()
				})
				.catch((err) => {
					this.$message.error("操作失败");
				});
		},
		//选择页码
        currentChange(currentPage) {
            this.currentPage = currentPage;
            this.getOrderData()
        },
        //选择每页数量
        handleSizeChange(val){
            this.pageSize = val
            this.getOrderData()
        },
		//删除订单
		del(row) {
			this.$confirm("确定删除?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(() => {
				this.$axios
					.post("/api/users/orderDel", { id: row.o_id })
					.then(() => {
						this.$message.success("删除成功");
						this.getOrderData()
					})
					.catch(() => {
						this.$message.error("删除失败");
					});
			}).catch(() => { });
		},
	},
};
</script>

<style lang="less" scoped>
.order{
	&-bottom{
		margin-top: 20px;
		display: flex;
		justify-content: flex-end;
	}
}
</style>