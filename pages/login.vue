<template>
    <div class="login-form">
		<el-form :rules="rules">
			<el-form-item props="email">
			<span>
				<i class="el-icon-mobile"></i>
			</span>
			<el-input placeholder="邮箱"></el-input>
			</el-form-item>
		</el-form>

		<el-form>
			<el-form-item props="passwd">
			<span>
				<i class="el-icon-mobile"></i>
			</span>
			<el-input placeholder="密码"></el-input>
			</el-form-item>
		</el-form>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    layout: 'login',
    name: "",
    data() {
        return {
			rules:{}
		}
    },
    components: {},
    methods: {}
}
</script>

<style lang="stylus" scoped>
.login-form
	width 800px
	margin 50px auto
</style>
