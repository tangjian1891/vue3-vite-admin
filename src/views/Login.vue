<template>
  <div class="login">
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">若依后台管理系统</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaOnOff">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img" />
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2021 ruoyi.vip All Rights Reserved.</span>
    </div>
  </div>
</template>
<script  setup>
import { reactive, toRefs, onMounted, ref } from 'vue';
import Cookies from "js-cookie";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { getCodeImg } from "@/api/login";

const loginFormRef = ref(null)
const store = useStore()
const router = useRouter()
const data = reactive({
  codeUrl: "",
  cookiePassword: "",
  loginForm: {
    username: "admin",
    password: "admin123",
    rememberMe: false,
    code: "",
    uuid: ""
  },
  loginRules: {
    username: [
      { required: true, trigger: "blur", message: "用户名不能为空" }
    ],
    password: [
      { required: true, trigger: "blur", message: "密码不能为空" }
    ],
    code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
  },
  loading: false,
  captchaOnOff: true,
  redirect: undefined
})
const { codeUrl, cookiePassword, loginForm, loginRules, loading, captchaOnOff, redirect } = toRefs(data)



// const { name, region, date1, date2, delivery, type, resource, desc } = toRefs(form)

function onSubmit() {
  console.log('submit!');
}
const getCode = function () {
  getCodeImg().then(res => {
    data.captchaOnOff = res.captchaOnOff === undefined ? true : res.captchaOnOff;
    if (data.captchaOnOff) {
      data.codeUrl = "data:image/gif;base64," + res.img;
      data.loginForm.uuid = res.uuid;
    }
  });
}
const getCookie = function () {
  // const username = Cookies.get("username");
  // const password = Cookies.get("password");
  // const rememberMe = Cookies.get('rememberMe')
  // this.loginForm = {
  //   username: username === undefined ? this.loginForm.username : username,
  //   password: password === undefined ? this.loginForm.password : decrypt(password),
  //   rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
  // };
}
const handleLogin = function () {
  loginFormRef.value.validate(valid => {
    if (valid) {
      data.loading = true;
      if (data.loginForm.rememberMe) {
        Cookies.set("username", data.loginForm.username, { expires: 30 });
        Cookies.set("password", encrypt(data.loginForm.password), { expires: 30 });
        Cookies.set('rememberMe', data.loginForm.rememberMe, { expires: 30 });
      } else {
        Cookies.remove("username");
        Cookies.remove("password");
        Cookies.remove('rememberMe');
      }
      store.dispatch("Login", data.loginForm).then(() => {
        router.push({ path: data.redirect || "/" }).catch(() => { });
      }).catch(() => {
        data.loading = false;
        if (data.captchaOnOff) {
          getCode();
        }
      });
    }
  })
}

onMounted(() => {

  getCode()
})
</script>
<style lang='scss'>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>