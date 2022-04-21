<template>
	<div class="editFoods">
		<add-food :info="info" @change="getValue($event)" @update="getUpdateValue($event)"></add-food>
		<div class="headerContainer">
			<el-button type="primary" size="small" @click="edit('0', '')">新增菜品</el-button>
			<div class="search-int">
                <el-input
                    v-model.trim="foodName"
                    placeholder="请输入菜品名"
                    style="width:200px"
                    size="small"
                    class="ml10"
					clearable
                ></el-input>
                <el-button type="primary" size="small" @click="searchContent" class="ml10" >搜索</el-button>
            </div>
		</div>
		<el-table :header-cell-style="{ background: '', color: '#000' }" :data="foodsData" style="width: 100%">
			<el-table-column type="index" label="序号" width="90"></el-table-column>
			<el-table-column prop="food_name" label="菜名" width="180"></el-table-column>
			<el-table-column prop="attr" label="荤素"></el-table-column>
			<el-table-column prop="price" label="价格"></el-table-column>
			<el-table-column prop="type" label="类型">
				<template slot-scope="{row}">
					{{foodType[row.type]}}
				</template>
			</el-table-column>
			<el-table-column prop="description" label="描述"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="{row}">
					<span class="text-btn" @click="del(row)">删除</span>
					<span class="text-btn ml10" @click="edit('1', row)">编辑</span>
				</template>
			</el-table-column>
		</el-table>
		<div class="editFoods-bottom">
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
import AddFood from "./dialogs/addFood.vue";
export default {
	data() {
		return {
			foodsData: [],
			form: {},
			info: {
				isOpen: false,
			},
			total:0,
            currentPage:1,
            pageSize:10,
			foodName:'',
			foodType:{
				0:'本店促销',
				1:'本店热销',
				2:'加料',
				3:'酒水饮料',
				4:'推荐套餐',
				5:'本店特色',
				6:'主食',
				7:'特色小炒'
			}
		};
	},
	components: {
		AddFood,
	},
	mounted() {
		this.getTableData();
	},
	methods: {
		getTableData() {
			let params = {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
				foodName:this.foodName
            }
			this.$axios.get("api/foods/paging",{params}).then((res) => {
				this.foodsData = res.data.data;
				this.total = res.data.total
			});
		},
		//搜索
		searchContent(){
			this.currentPage=1,
			this.getTableData();
		},
		//选择页码
        currentChange(currentPage) {
            this.currentPage = currentPage;
            this.getTableData()
        },
        //选择每页数量
        handleSizeChange(val){
            this.pageSize = val
            this.getTableData()
        },
		del(row) {
			this.$confirm("确定删除?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(() => {
				this.$axios
					.post("api/foods/foodDel", { id: row.id })
					.then((res) => {
						this.$message.success("删除成功");
						this.getTableData();
					})
					.catch((err) => {
						this.$message.error("删除失败");
					});
			});
		},
		//修改菜品
		edit(type, row) {
			this.info.id = row.id;
			this.info.isOpen = true;
			this.info.type = type;
		},
		getValue(value) {
			this.info.isOpen = value;
		},
		getUpdateValue(val) {
			if (val == true) {
				this.getTableData();
			}
		},
	},
};
</script>

<style scoped lang="less">
.headerContainer {
	display: flex;
	justify-content: space-between;
}
.editFoods-bottom{
	display: flex;
	justify-content: flex-end;
	margin-top: 20px;
}
</style>