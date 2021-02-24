<template>
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
</template>

// <script>
// import AesEncryption from '@/assets/js/utils.js'
// import local from '@/store/localStorage.js'
// import SIdentify  from '@/components/sidentify.vue'

//   export default {
//       name:'login',
//       components: { SIdentify },
//       data() {
//         return {
//           loginName: 'account',//tabs
//           pwdType: 'password', // 密码类型
//           openeye: require('@/assets/img/passNo.png'), //眼睛图片地址
//           email: '',//邮箱
//           password: '',//密码
//           loading: false,//loading
//           identifyCodes: "1234567890ABCDEFGHJKLMNOPQRSTWXYZ",
//           identifyCode: "",
//           code:"",//text框输入的验证码
//         }
//       },
//       created () {
//           this.onLoad();
// 		  //初始验证码
// 		  this.refreshCode();
//       },
//       mounted(){
//         this.identifyCode = "";
//         this.makeCode(this.identifyCodes, 4);
//       },
//       methods: {
//          onLoad() {
//            // console.log(local._local.get('email_addr','2222'))
//            if(local._local.get('email_addr')){
//              this.$router.push({
//                   path:"/home",
//                   // query:{
//                   //     name:local._local.get('user_display_name')
//                   // }
//              });
//              window.location.reload();
//              // console.log(local._local.get('email_addr'),'11111')
//            }
//          },
//           //验证码
//           randomCode(min, max) {
//             return Math.floor(Math.random() * (max - min) + min);
//           },
//           refreshCode() {
//             this.identifyCode = "";
//             this.makeCode(this.identifyCodes, 4);
//           },
//           makeCode(o, l) {
//             for (let i = 0; i < l; i++) {
//               this.identifyCode += this.identifyCodes[
//                 this.randomCode(0, this.identifyCodes.length)
//               ];
//             }
//             console.log(this.identifyCode,'55');
//           },
//         tabsClick(tab, event) {
//           // console.log(tab, event);
//         },
//         changeType() {
//           this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
//           this.openeye = this.openeye == require("@/assets/img/passNo.png") ? require("@/assets/img/passYes.png") : require("@/assets/img/passNo.png");
//         },
//         randomNum(len) {
//             len = len || 32;
//         　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
//         　　var maxPos = $chars.length;
//         　　var pwd = '';
//         　　for (var i = 0; i < len; i++) {
//         　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
//         　　}
//         　　return pwd;
//         },
//         login(){
//           // console.log(this.email,'email')
//           // console.log(this.password,'password')
//           // console.log(local._local.set('access_token', '123456', 5000),'password')
//           // return false
//           var regEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
//           if(this.email == '' || this.password == ''){
//           	// alert("请输入正确的邮箱或密码")
//             this.$alert('请输入正确的邮箱或密码', '温馨提示', {
//               confirmButtonText: '确定'
//             });
//             this.loading=false
//             return;
//           }else if(this.code == ''){
//             this.$alert('请输入验证码', '温馨提示', {
//               confirmButtonText: '确定'
//             });
//             this.loading=false
//             return;
//           }else if(this.identifyCode.toUpperCase() !== this.code.toUpperCase()){
//             this.code = '';
//             this.refreshCode();
//             this.$alert('请输入正确的验证码', '温馨提示', {
//               confirmButtonText: '确定'
//             });
//             this.loading=false
//             return;
//           } else{
//             this.loading=true
//             // 获取密钥接口
//             this.$http.encryptKey().then(res=>{
//               // console.log(res.data,'获取密钥')
//               var data = res.data;
//               var ticket = data.ticket;
//               var keyStr = data.encrypt_key;
//               const aes = new AesEncryption('CBC',256);
//               var password =aes.encrypt(this.password,keyStr)
//               // console.log(password,'password')
//               if(res.code!=200){
//                 this.$alert('登录超时，请重新登录！', '温馨提示', {
//                   confirmButtonText: '确定'
//                 });
//                 this.loading=false
//               }else{
//                 this.$http.ssoLogin({
//                   email: this.email,
//                   password: password,
//                   ticket: ticket
//                 }).then(res=>{
//                   this.loading=false
//                   // console.log(res,'登录')
//                   if(res.code==200){
//                     var expires = 2*60*60*1000
//                     // console.log(2*60*1000,'11')
//                     // console.log(2*60*60*1000,'22')
//                     this.$store.state.email_addr = local._local.set('email_addr',res.data.email_addr,expires);
//                     this.$store.state.user_display_name = local._local.set('user_display_name', res.data.user_display_name, expires);
//                     // console.log(local._local.get('email_addr','2222'))
//                     // return false
//                     this.$message({
//                       showClose: true,
//                       message: '恭喜你，登录成功！',
//                       type: 'success'
//                     });
//                     setTimeout(()=>{
//                       this.$router.push({
//                            path:"/home",
//                            // query:{
//                            //     name:res.data.user_display_name
//                            // }
//                       });
//                       window.location.reload();
//                       //延迟时间：3秒
//                     },3000)

//                   }else{
//                     this.$alert(res.msg, '登录失败，请联系相关人员！', {
//                       confirmButtonText: '确定'
//                     });
//                   }

//                 })
//               }

//             })
//           }

//         }

//       }

//     };
// </script>

<style>

.el-loading-mask{
  background: rgba(0,0,0,0.5)!important;
}
.formRow{
  margin-left: 0!important;
  margin-right: 0!important;
  position: relative;
}
.loginInp {
  width: 60%;
  /* margin-left: 5px; */
  margin: auto;
}
.loginInp2 .form-control{
  width: 65%;
}
</style>
