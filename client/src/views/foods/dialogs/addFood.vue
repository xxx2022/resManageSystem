<template>
	<div class="dialogs">
		<el-dialog
			:title="info.type == '0' ? '新增菜品' : '更新菜品'"
			:visible.sync="dialogFormVisible"
			@close="handleClose"
		>
			<el-form :model="foodForm" label-width="140px" size="small">
				<el-form-item label="上传图片：">
					<el-upload
						ref="uploadImg"
						action="http://localhost:8080/api/upload/img"
						list-type="picture-card"
						name="img"
						:on-preview="handlePreview"
						:before-upload="beforeUpload"
						:on-remove="handleRemove"
						:on-progress="sendIng"
						:on-error="sendErr"
						:on-success="sendSuccess"
					>
						<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="菜品名：">
					<el-input v-model="foodForm.food_name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="荤素：">
					<el-input v-model="foodForm.attr" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="价格：">
					<el-input v-model="foodForm.price" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="销量：">
					<el-input v-model="foodForm.sales" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="类型：">
					<el-input v-model="foodForm.type" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述：">
					<el-input v-model="foodForm.description" type="textarea" :rows="5"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel()">取 消</el-button>
				<el-button type="primary" @click="save">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	props: ["info"],
	data() {
		return {
			dialogFormVisible: false,
			foodForm: {},
			id: "",
			isUpdate: false,
			fileList: []
		};
	},
	watch: {
		info: {
			handler(val) {
				this.dialogFormVisible = val.isOpen;
				this.id = val.id;
				if (val.type == "0") {
					this.foodForm = {};
				}
				if (val.type == "1") this.getFoodsDetail();
			},
			deep: true,
		},
	},
	methods: {
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handlePreview(file) {
			console.log(file);
		},
		beforeUpload(file) {
			console.log(file);
		},
		sendIng(event, file) {
			console.log(event)
			console.log(file)
		},
		sendErr(err) {
			console.log(err)
		},
		sendSuccess(val){
			console.log(val);
		},
		//获取菜品详情
		getFoodsDetail() {
			this.$axios
				.get("api/foods/foodDetail", {
					params: {
						id: this.id,
					},
				})
				.then((res) => {
					this.foodForm = {
						food_name: res.data.data[0].food_name,
						attr: res.data.data[0].attr,
						price: res.data.data[0].price,
						sales: res.data.data[0].sales,
						type: res.data.data[0].type,
						description: res.data.data[0].description,
					};
				});
		},
		save() {
			if (this.info.type == "1") this.foodForm["id"] = this.id;
			this.$axios
				.post(
					this.info.type == "0" ? "api/foods/foodAdd" : "api/foods/foodUpdate",
					this.foodForm
				)
				.then((res) => {
					this.$message.success(
						`${this.info.type == "0" ? "新增" : "更新"}成功`
					);
					this.$emit("update", (this.isUpdate = true));
				})
				.catch((err) => {
					this.$message.error(`${this.info.type == "0" ? "新增" : "更新"}失败`);
				});
				this.$refs['uploadImg'].clearFiles()
				this.dialogFormVisible = false;
		},
		cancel() {
			// this.$refs.upload.submit();
			this.$refs['uploadImg'].clearFiles()
			this.dialogFormVisible = false;
		},
		handleClose() {
			this.$emit("change", this.dialogFormVisible);
			this.$refs['uploadImg'].clearFiles()
		},
	},
};
</script>

<style>
</style>