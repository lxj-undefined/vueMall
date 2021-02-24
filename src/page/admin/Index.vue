<template>
  <div style="height:100%;">
    <el-container style="height:100%;" direction="vertical">
      <!--<header-common></header-common>-->
      <el-container style="height:100%;">
        
        <el-main style="width:90%;padding:0;overflow:hidden;background:white;">
            <left-menu></left-menu>
        
          <div class="template-tabs">
            <!-- <el-tabs v-model="activeIndex" type="border-card" closable @tab-click="tabClick" v-if="options.length" @tab-remove="tabRemove">
              <el-tab-pane :key="item.route" v-for="(item, index) in options" :label="item.name" :name="item.route">
              </el-tab-pane>
            </el-tabs> -->
          </div>
          <el-row>
            <!-- <el-col :span="24"> -->
            <div style="width:100%;background:white;padding:1% 0 0 1%;overflow:hidden;">
              <router-view></router-view>
            </div>
            <!--   <div v-if="Teacherform">
              <h4 class="title">人员信息</h4>　
              //渲染教师信息
              <el-table :data="teacherData" border style="width: 100%">
                <el-table-column align='center' prop="id" label="账号"></el-table-column>
                <el-table-column align='center' prop="tname" label="姓名"></el-table-column>
                <el-table-column align='center' prop="tsex" label="性别"></el-table-column>
                <el-table-column align='center' prop="tdepart" label="部门"></el-table-column>
                <el-table-column align='center' prop="class_cno" label="出生日期"></el-table-column>
                <el-table-column align='center' prop="passwd" label="密码"></el-table-column>
                <el-table-column align='center' prop="role" label="角色"></el-table-column>
              </el-table>
            </div> -->
            <!-- </el-col> -->
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import AdminMain from './AdminMain.vue';
import LeftMenu from './leftMenu.vue'
//import HeaderCommon from './header.vue'
export default {
  data() {
    return {
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
  created() {},
  components: {
    LeftMenu,
    AdminMain,
    //HeaderCommon
  },
  methods: {
    // tab切换时，动态的切换路由
    tabClick(tab) {
      let path = this.activeIndex;
      this.$router.replace({ path: path });
    },
    tabRemove(targetName) {
      // 首页不可删除
      if (targetName == '/') {
        return;
      }
      this.$store.commit('delete_tabs', targetName);
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.options && this.options.length >= 1) {
          this.$store.commit('set_active_index', this.options[this.options.length - 1].route);
          this.$router.replace({ path: this.activeIndex });
        } else {
          this.$router.replace({ path: '/' });
        }
      }
    }
  },
  computed: {
    options() {
      return this.$store.state.options;
    },
    activeIndex: {
      get() {
        return this.$store.state.activeIndex;
      },
      set(val) {
        this.$store.commit('set_active_index', val);
      }
    }
  },
  /*watch: {
    '$route'(to) {
      let flag = false;
      for (let option of this.options) {
        if (option.route === to.path) {
          flag = true;
          this.$store.commit('set_active_index', to.path);
          break
        }
      }
      if (!flag) {
        this.$store.commit('add_tabs', { route: to.path, name: to.name });
        this.$store.commit('set_active_index', to.path);
      }
    }
  }*/
}

</script>
<style scoped>
.title {
  padding-bottom: 20px;
  padding-top: 20px;
}

</style>
