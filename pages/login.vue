<template>
  <div class="login-container">
		<el-form class="login-form" label-width="100px" :model="form" :rules="rules" ref="loginForm">
			<el-form-item prop="email" label="邮箱">
				<el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
			</el-form-item>

			<el-form-item prop="captcha" label="验证码" class="captcha-container">
				<div class="captcha">
					<img :src="code.captcha" @click="resetCaptcha">
				</div>
				<el-input v-model="form.captcha" placeholder="请输入验证码"></el-input>
			</el-form-item>

			<el-form-item prop="emailcode" label="邮箱验证码" class="captcha-container">
				<div class="captcha">
					<el-button type="primary" :disabled="send.timer > 0" @click="sendEmailCode" >{{sendText}}</el-button>
				</div>
				<el-input v-model="form.emailcode" placeholder="请输入验证码"></el-input>
			</el-form-item>

			<el-form-item prop="passwd" label="密码">
				<el-input type="password" v-model="form.passwd" placeholder="请输入密码"></el-input>
			</el-form-item>
			
			<el-form-item label=" ">
				<!-- <button @clikc.prevent></button> -->
				<el-button type="primary" @click.native.prevent="handleLogin" >登录</el-button>
			</el-form-item>

		</el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import md5 from 'md5';
import { clearInterval } from 'timers';
export default {
	layout: 'login',
	name: "",
	data() {
		return {
			send:{
				timer: 0,
			},
			form: {
				email: '297280911@qq.com',
				passwd: '123456',
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
				emailcode:[
          { required:true, message:"请输入邮箱验证码" },
        ],
				passwd: [
					{ required: true, pattern: /^[\w_-]{6,12}$/g, message: '请输入6~12位密码'},
				],
			},
			code: {
				captcha: '/api/captcha'
			},
		}
	},
	computed: {
		sendText(){
			if(this.send.timer > 0){
				return `${this.send.timer}秒后发送`
			}
			return '发送'
		}
	},
	components: {},
	methods: {
		async sendEmailCode(){
			await this.$http.get('/sendcode?email='+this.form.email);
			this.send.timer = 10;
			this.timer = setInterval(() => {
				this.send.timer--;
				if(this.send.timer === 0){
					window.clearInterval(this.timer)
				}
			}, 1000);
		},
		handleLogin(){
			this.$refs.loginForm.validate(async valid => {
				if(valid){
					const { email, passwd, captcha, emailcode } = this.form;
					const params = {
						email,
						passwd: md5(passwd),
						captcha,
						emailcode,
					}
					let res = await this.$http.post('/user/login', params);
					if(res.code === 0){
						this.$message.success('登录成功')
            setTimeout(() => {
							this.$router.push("/")
						}, 500);
					}else{
            this.$message.error(res.message)
          }
				}
			})
		},
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
