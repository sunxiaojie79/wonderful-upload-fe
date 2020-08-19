<template>
  <div class="login-container">
		<el-form class="login-form" label-width="100px" :model="form" :rules="rules" red="registerForm">
			<el-form-item prop="email" label="邮箱">
				<el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
			</el-form-item>

			<el-form-item prop="captcha" label="验证码" class="captcha-container">
				<div class="captcha">
					<img :src="code.captcha" @click="resetCaptcha">
				</div>
				<el-input v-model="form.captcha" placeholder="请输入验证码"></el-input>
			</el-form-item>

			<el-form-item prop="nickname" label="昵称">
				<el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
			</el-form-item>

			<el-form-item prop="passwd" label="密码">
				<el-input type="password" v-model="form.passwd" placeholder="请输入密码"></el-input>
			</el-form-item>

      <el-form-item prop="repasswd" label="确认密码">
				<el-input type="password" v-model="form.repasswd" placeholder="请再次输入密码"></el-input>
			</el-form-item>
			
			<el-form-item label=" ">
				<!-- <button @clikc.prevent></button> -->
				<el-button type="primary" @click.native.prevent="handleRegister" >注册</el-button>
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
				form: {
					email: '',
					nickname: '',
					passwd: '',
					repasswd: '',
					captcha: '',
				},
				rules:{
					email: [
						{ required: true, message: '请输入邮箱'},
						{ type: 'email', message: '请输入正确的邮箱格式'},
					],
					captcha: [
						{ required: true, message: '请输入验证码'},
					],
					nickname: [
						{ required: true, message: '请输入昵称'},
					],
					passwd: [
						{ required: true, message: '请输入密码'},
					],
					repasswd: [
						{ required: true, message: '请再次输入密码'},
					],
				},
				code: {
					captcha: '/api/captcha'
				},
			}
    },
    components: {},
    methods: {
		resetCaptcha(){
			this.code.captcha = '/api/captcha?_t=' + new Date().getTime()
		}
	}
}
</script>

<style lang="stylus" scoped>
.login-form
	width 800px
	margin 50px auto
</style>
