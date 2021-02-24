<template>
  <el-col :span="23" style="margin-left:1%;">
    <div v-if="Teacherform">
      <span class="title">人员信息</span>　
      <!-- //渲染教师信息 -->
      <el-table :data="teacherData" border highlight-current-row :header-cell-style="{background:'#F5F5F5',color:'black'}" :default-sort="{prop: 'date', order: 'descending'}" style="width: 100%">
        <el-table-column align='center' prop="id" label="账号"></el-table-column>
        <el-table-column align='center' prop="tname" label="姓名"></el-table-column>
        <el-table-column align='center' prop="tsex" label="性别"></el-table-column>
        <el-table-column align='center' prop="tdepart" label="部门"></el-table-column>
        <el-table-column align='center' prop="class_cno" label="出生日期"></el-table-column>
        <el-table-column align='center' prop="passwd" label="密码"></el-table-column>
        <el-table-column align='center' prop="role" label="角色"></el-table-column>
      </el-table>
    </div>
  </el-col>
</template>
<script>
import LeftMenu from '../../common/leftMenu.vue'
import HeaderCommon from '../../common/header.vue'
export default {
  data() {
    return {
      open: ['0a'],
      teacherData: [{
          id: "1146776843",
          tname: "DING",
          tsex: "男",
          tdepart: "IT事业部",
          class_cno: "******",
          passwd: "******",
          role: "超级管理员"
        },
        {
          id: "569004840",
          tname: "MING",
          tsex: "男",
          tdepart: "IT事业部",
          class_cno: "******",
          passwd: "******",
          role: "系统管理员"
        },
        {
          id: "664504546",
          tname: "MIN",
          tsex: "男",
          tdepart: "IT事业部",
          class_cno: "******",
          passwd: "******",
          role: "演示"
        }
      ],
      studentData: [],
      Teacherform: true,
      Studentform: true
    }
  },
  components: {
    LeftMenu,
    HeaderCommon
  },
}

</script>
<style scoped>
.title {
  display: inline-block;
  border-left: 5px solid #4586EE;
  padding-left: 0.5%;
  margin-top: 2%;
  margin-bottom: 2%;
}

</style>
