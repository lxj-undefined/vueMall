<template>
  <el-col :span="23" style="margin-top:2%;">
    <div class="app-container common-list-page">
      <el-form :model="resetForm" :rules="resetFormRules" ref="resetForm" status-icon label-width="100px">
        <el-form-item label="用户名：" prop="username">
          <el-input type="text" v-model="resetForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="旧密码：" prop="password">
          <el-input type="password" v-model="resetForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newpwd">
          <el-input type="password" v-model="resetForm.newpwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="newpassword1">
          <el-input type="password" v-model="resetForm.newpassword1" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="toAmend">确认修改</el-button>
        </el-form-item>
        <el-form-item>
          <span style="font-size: 12px;">密码修改说明:新的登录密码必须由数字和字母(大小写)和特殊字符组成，并且密码长度为8~15位。</span>
        </el-form-item>
      </el-form>
    </div>
  </el-col>
</template>
<script>
import LeftMenu from '../../common/leftMenu.vue';
import HeaderCommon from '../../common/header.vue';
import { validatorAccountNumber } from '../../utils/validate.js';
export default {
  data() {
    const validatorAccountNumber = (rule, value, callback) => {
      if (!value) {
        console.log(this.resetForm.password);
        return callback(new Error("请输入确认密码"));
      } else if (this.resetForm.newpassword1 != this.resetForm.newpwd) {
        return callback(new Error("两次输入密码不一致"));
      }
    }
    return {
      resetForm: {
        //传给后台所需要的参数
        newpassword1: "",
        password: "",
        newpwd: "",
        username: "" //此处只是后台需要的字段而已，如果前期有公用cookie里面有获取并且保存过，现在需要另外调用进来，具体的获取方法就看个人了
      },
      resetFormRules: {
        password: [
          { required: true, message: "请输入旧密码", trigger: 'blur' }
        ],
        newpwd: [{
          required: true,
          message: "请输入新密码",
          trigger: 'blur'
        }],
        newpassword1: [
          { required: true, validator: validatorAccountNumber, trigger: "blur" }
        ]
      }
    }
  },
  components: {
    LeftMenu,
    HeaderCommon
  },
  methods: {
    toAmend() {
      if (this.resetForm.username == "") {
        this.$alert('用户名不能为空！', '提示', {
          confirmButtonText: '确定'
        });
        return;
      } else if (this.resetForm.password == "") {
        this.$alert('旧密码不能为空！', '提示', {
          confirmButtonText: '确定'
        });
        return;
      } else if (this.resetForm.newpwd == "") {
        this.$alert('新密码不能为空！', '提示', {
          confirmButtonText: '确定'
        });
        return;
      } else if (this.resetForm.newpassword1 == "") {
        this.$alert('确认密码不能为空！', '提示', {
          confirmButtonText: '确定'
        });
        return;
      } else if (this.resetForm.newpassword1 != this.resetForm.newpwd) {
        this.$alert('两次输入密码不一致！', '提示', {
          confirmButtonText: '确定'
        });
        return;
      } else {
        this.$axios({
          method: 'POST',
          url: this.baseURL + '/modifyPwd',
          data: this.resetForm
        }).then((res) => {
          if (res.data.result.type == "success") {
            this.$alert(res.data.result.message, '提示', {
              confirmButtonText: '确定'
            });
            this.$router.push({ path: '/' });
          } else {
            this.$alert(res.data.result.message, '提示', {
              confirmButtonText: '确定'
            });
          }
        })
      }
    }
  }
}

</script>
<style>
</style>
