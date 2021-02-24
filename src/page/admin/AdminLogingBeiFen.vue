<<template>
  <div>
    <div class="loginBox" v-loading="loading">
    <div class="loginIn">
      <div class="loginTitle">
        <span class="span1">K11</span>
        <span class="span2">WORKSPACE</span>
      </div>
      <div class="loginMain">
        <div class="loginTab">
          <el-tabs v-model="loginName" @tab-click="tabsClick">
            <el-tab-pane label="账户密码登录" name="account">
              <form class="loginForm">
                <div class="form-group row formRow">
                  <label for="inputEmail3" class="labelBox">
                    <i class="iconFont iconLogin">&#xe639;</i>
                  </label>
                  <div class="loginInp">
                    <input type="email" class="form-control" id="inputEmail3" placeholder="E-mail" v-model="email" />
                  </div>
                </div>
                <div class="form-group row formRow">
                  <label for="inputPassword3" class="labelBox">
                    <i class="iconFont iconLogin">&#xe600;</i>
                  </label>
                  <div class="loginInp">
                    <input :type="pwdType" class="form-control" id="inputPassword3" placeholder="Password" v-model="password" />
                    <!-- <img :src="openeye" class="iconEye" alt="" @click="changeType()"> -->
                  </div>
                </div>

                <div class="form-group row formRow">
                  <label for="inputPassword3" class="labelBox">
                    <i class="iconFont iconLogin">&#xe62f;</i>
                  </label>
                  <div class="loginInp loginInp2">
                    <input type="text" maxlength="4" id="code" v-model="code" class="form-control code"  placeholder="Verify Code" />
                  </div>
                  <div class="login-code" @click="refreshCode">
                    <!--验证码组件-->
                    <s-identify :identifyCode="identifyCode"></s-identify>
                  </div>
                </div>

                <div class="form-group row formRow">
                  <div class="loginBtnBox">
                    <button type="submit" class="btn btn-primary loginBtn" @click.prevent="login()">LOGIN</button>
                  </div>
                </div>
              </form>
            </el-tab-pane>
            <el-tab-pane label="扫码登录" name="scanCode">功能即将上线，敬请期待！</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
     </div>
  </div>
</template>
<!--
<template>
      <div class="loginBox">
        <div class="loginIn">
           <div class="loginTitle">
            <span class="span1">{{title}}</span>
           </div>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号：" prop="account">
            <el-input type="text" v-model="ruleForm.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">
              <router-link to="/Admin" class="login">登录</router-link>
              </el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          </el-form>
        </div>
      </div>
</template>
-->

<script>
  export default {

     name:'login',
      data() {
        return {
          loginName: 'account',//tabs
          pwdType: 'password', // 密码类型
          openeye: '/../../../static/admin/passNo.png', //眼睛图片地址
          email: '',//邮箱
          password: '',//密码
          loading: false,//loading
          identifyCodes: "1234567890ABCDEFGHJKLMNOPQRSTWXYZ",
          identifyCode: "",
          code:"",//text框输入的验证码
        }
      },

    
    // data() {
    //   var accountNum = (rule, value, callback) => {
    //     if (!value) {
    //       return callback(new Error('账号不能为空'));
    //     }
    //     setTimeout(() => {
    //       if (!Number.isInteger(value)) {
    //         callback(new Error('请输入账号'));
    //       } else {
    //           callback();
    //       }
    //     }, 1000);
    //   };
    //   var validatePass = (rule, value, callback) => {
    //     if (value === '') {
    //       callback(new Error('请输入密码'));
    //     } else {
    //       if (this.ruleForm.checkPass !== '') {
    //         this.$refs.ruleForm.validateField('checkPass');
    //       }
    //       callback();
    //     }
    //   };
    //   return {
    //     ruleForm: {
    //       pass: '',
    //       account: ''
    //     },
    //     rules: {
    //       pass: [
    //         { validator: validatePass, trigger: 'blur' }
    //       ],
    //       account: [
    //         { validator: accountNum, trigger: 'blur' }
    //       ]
    //     },
    //     title:"后台管理系统"
    //   };
    // },
    // methods: {
    //   submitForm(formName) {
    //     this.$refs[formName].validate((valid) => {
    //       if (valid) {
    //         alert('submit!');
    //       } else {
    //         console.log('error submit!!');
    //         return false;
    //       }
    //     });
    //   },
    //   resetForm(formName) {
    //     this.$refs[formName].resetFields();
    //   }
    // }
  }
</script>

<style lang="" >
  .loginBox{
  background: url("../../../static/admin/login_bg.png");
  position:fixed;
  top: 0;
  left: 0;
  width:100%;
  height:100%;
  min-width: 1000px;
  z-index:-10;
  zoom: 1;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
}
.loginIn{
  width: 30vw;        /* 宽度  页面宽度的30% */
  min-width: 320px;
  /*height: 60vh;        高度  页面高度的60% */
  /* 容器自动水平居中 */
  margin: 0px auto;
  /* 实现垂直居中 距顶部高度  也可以写成 20vh */
  /* margin-top: calc((100vh - 60vh)/2); */
  text-align: center; /* 文字水平居中 */
  /*line-height: 60vh;  /* 文字垂直居中 */
  color: #fff;
  
}

.loginTitle{
  padding-bottom: 50px;
  padding-left: 80px;
  text-align: center;
}

.loginTitle span{
  display: block;
  color: rgba(32, 56, 85, 0.9);
  font-size: 30px;
  line-height: 45px;
}

/* @media only screen and (max-width: 700px) and (min-width:320px) {
 .loginBox {
    flex: 1;
    width: 200px;
    text-align: center;
    }
} */
.el-loading-mask{
  background: rgba(0,0,0,0.5)!important;
}
.formRow{
  margin-left: 0!important;
  margin-right: 0!important;
  position: relative;
}

.form-group{
  margin-bottom:1rem
}

.loginInp {
  width: 60%;
  /* margin-left: 5px; */
  margin: auto;
}

.form-control{
  width:100%;
  display: block;
  border:1px solid #ced4da;
  border-radius:0.35rem ;
}

.loginInp2 .form-control{
  width: 65%;
}

.loginTitle{
  text-align: left;
}
.loginTitle span{
  display: block;
  color: rgba(32, 56, 85, 0.9);
  font-size: 55px;
  line-height: 45px;
}
.loginTitle .span2{
  font-family: Rajdhani-Bold;
}
.loginTitle .span1{
  font-family: Rajdhani-Medium
}
.loginMain{
  height: 455px;
  margin-top: 15px;
  background: rgba(76, 83, 102, 0.7);
}
.loginTab .el-tabs__nav{
  width: 100%;
}
.loginTab .el-tabs__item{
  width: 50%;
  height: 50px;
  line-height: 50px;
  color: #FFFFFF;
}
.loginTab .el-tabs__active-bar{
  background: #FFFFFF;
  /* display: none; */
}
.loginTab /deep/.el-tabs__nav-wrap::after {
    /* position: static !important; */
    background: rgba(255, 255, 255, 0.3);
}
.loginForm{
  /* padding: 45px 65px 40px 65px; */
  margin-top: 45px;
}
.iconLogin{
  font-size: 30px;
}
.labelBox {
  padding: 0;
  margin-bottom: 0;
  margin-top: 5px;
  position: absolute;
  left: 12%;
}
.loginForm .form-control{
  height: 55px;
  line-height: 55px;
  font-family:Rajdhani-Regular;
  font-weight:bold;
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
}
.loginInp{
  padding-left: 0;
  position: relative;
}
.iconEye {
  position: absolute;
  right: 25px;
  top: 11px;
  width: 35px;
  color: #000000;
  cursor: pointer;
}
.loginBtn{
  color: #F6F4EA!important;
  font-size:30px!important;
  font-family:Rajdhani-Regular,Rajdhani;
  font-weight:400;
  letter-spacing:2px!important;
  background: rgba(0, 0, 0, 0.8)!important;
  border-radius:8px!important;
  border: 0!important;
  padding: 5px 20px!important;
}
.loginBtnBox {
  padding: 0;
  /* margin-left: 45px; */
  /* margin-top: 50px; */
  margin: 50px auto 0;
}
.loginBtn:hover{
  background: rgba(0, 0, 0, 1)!important;
}
/*验证码样式*/
/* .code{
  width:124px;
  height:31px;
  border:1px solid rgba(186,186,186,1);
} */
.login-code {
  width: 20%;
  cursor: pointer;
  position: absolute;
  right: 20%;
}

</style>
