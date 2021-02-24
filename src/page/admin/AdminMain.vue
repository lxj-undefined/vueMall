<template>
  <div class=''>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>

    <el-scrollbar style="height:100%;overflow-x:hidden;width:17%; border: 1px solid #eee">
    <el-aside style="overflow-y:hidden;overflow-x:hidden;width:100%;background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu v-for="(item,index) in outMenu" :key="item.id" :index="item.id+'a'" @click.native="secondMenu(item.id,index)">
          <template slot="title"><i :class="item.icon"></i>{{item.text}}</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">用户信息</el-menu-item>
            <el-menu-item index="1-2">修改密码</el-menu-item>
          </el-menu-item-group>
          <!--<el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>-->
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>商品管理</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="2-1">商品信息</el-menu-item>
            <!--<el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="2-3">选项3</el-menu-item>
            -->
          </el-menu-item-group>
          <!--
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>-->
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>订单管理</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">订单信息</el-menu-item>
            <!--<el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>-->
          </el-menu-item-group>
          <!--
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>-->
        </el-submenu>
      </el-menu>
    </el-aside>
  </el-scrollbar>

  <!--
  <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      
      <el-main>
        <el-table :data="tableData">
          <el-table-column
            label="商品 ID"
            prop="id">
          </el-table-column>
          <el-table-column
            label="商品名称"
            prop="name">
          </el-table-column>
          <el-table-column
            label="描述"
            prop="desc">
          </el-table-column>
          <el-table-column prop="date" label="日期" width="140">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
            <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    -->
    <el-scrollbar v-show="isCollapse" style="height:100%;overflow-x:hidden;width:17%;background:#161A2E;">
    <el-aside style="overflow-y:hidden;overflow-x:hidden;width:100%;height:100%;">
      <el-menu :default-active="this.$router.path" class="el-menu-vertical" router unique-opened :collapse="false" :collapse-transition="true" active-text-color='#BEC1C6' text-color="#BEC1C6" style="width:100%;background:#161A2E;overflow-x:hidden;" :default-openeds="open">
        <el-submenu v-for="(item,index) in outMenu" :key="item.id" :index="item.id+'a'" @click.native="secondMenu(item.id,index)">
          <template slot="title">
            <span class="tohide" :class="{active:categoryIndex==index}">{{item.text}}</span>
          </template>
          <!--         <el-submenu>
          <template slot="title">
            <span>基础信息管理</span>
          </template>
          <el-menu-item style="background:#161A2E;" index="/index/mainUser">
            <template slot="title">
              <span>个人信息</span>
            </template>
          </el-menu-item>
          <el-menu-item style="background:#161A2E;" index="/index/modifyPwd">
            <template slot="title">
              <span>修改密码</span>
            </template>
          </el-menu-item>
        </el-submenu> -->
       
          <!-- 一级菜单里面的菜单名称 -->
          <el-menu-item :index="item2.url" v-for="(item2,index2) in innerMenu" :key="item2.id" style="background:#161A2E;">
            <template slot="title">
              {{item2.text}}
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
  </el-scrollbar>
  </div>
  
</template>


<script type="text/javascript">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

 //import HelloWorld from './components/HelloWorld.vue'
export default {
  name: '',
 //import引入的组件需要注入到对象中才能使用
  components: {
    //HelloWorld
},
  props:{},
  data(){
    //这里存放数据
     const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
    return {
        tableData: Array(20).fill(item),
        childrenMenu:[
          {chi1:""}
        ],
        outMenu: [
          { id: 0, text: "首页", icon:"el-icon-s-home"},
          { id: 1, text: "个人中心", icon:"el-icon-message" },
          { id: 2, text: "商品管理", icon:"el-icon-menu" },
          { id: 3, text: "订单管理", icon:"el-icon-setting"},
          { id: 4, text: "下架商品", icon:"el-icon-delete-solid"}
      ],
   }
  },
//计算属性 类似于data概念
  computed: {},
//监控data中的数据变化
  watch: {},
//方法集合
  methods: {

     secondMenu(id, index) {
      // this.$taber.open({
      //   name: this.innerMenu.text
      // })
      // console.log(this.innerMenu.text);
      this.categoryIndex = index;
      console.log(id);
      if (id == 0) {
        this.innerMenu = [
          // { id: 0, text: "个人信息", url: "/index/mainUser" },
          { id: 0, text: "修改密码", url: "/index/modifyPwd" }
        ]
      } else if (id == 1) {
        this.innerMenu = [
          { id: 1, text: "产品信息", url: "/index/goodsMessage" },
          { id: 2, text: "订单信息", url: "/index/order" },
          { id: 3, text: "地址信息", url: "/index/address" },
        ]
      } else if (id == 2) {
        this.innerMenu = [
          { id: 4, text: "科普信息", url: "/index/science" }
        ]
      } else if (id == 3) {
        this.innerMenu = [
          { id: 5, text: "培训教育信息", url: "/index/education" }
        ]
      }
    },

},
//生命周期 - 创建完成（可以访问当前this实例）
  created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang="" scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<!--
<template>
  <el-scrollbar v-show="isCollapse" style="height:100%;overflow-x:hidden;width:17%;background:#161A2E;">
    <el-aside style="overflow-y:hidden;overflow-x:hidden;width:100%;">
      <el-menu :default-active="this.$router.path" class="el-menu-vertical" router unique-opened :collapse="false" :collapse-transition="true" active-text-color='#BEC1C6' text-color="#BEC1C6" style="width:100%;background:#161A2E;overflow-x:hidden;" :default-openeds="open">
        <el-submenu v-for="(item,index) in outMenu" :key="item.id" :index="item.id+'a'" @click.native="secondMenu(item.id,index)">
          <template slot="title">
            <span class="tohide" :class="{active:categoryIndex==index}">{{item.text}}</span>
          </template>
          <!--         <el-submenu>
          <template slot="title">
            <span>基础信息管理</span>
          </template>
          <el-menu-item style="background:#161A2E;" index="/index/mainUser">
            <template slot="title">
              <span>个人信息</span>
            </template>
          </el-menu-item>
          <el-menu-item style="background:#161A2E;" index="/index/modifyPwd">
            <template slot="title">
              <span>修改密码</span>
            </template>
          </el-menu-item>
        </el-submenu> -->

          <!-- 一级菜单里面的菜单名称 -->
          <!--
          <el-menu-item :index="item2.url" v-for="(item2,index2) in innerMenu" :key="item2.id" style="background:#161A2E;">
            <template slot="title">
              {{item2.text}}
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
  </el-scrollbar>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      open: ['1'],
      // isCollapse: true,
      outMenu: [
        { id: 0, text: "基础信息管理" },
        { id: 1, text: "购物产品管理" },
        { id: 2, text: "科普信息管理" },
        { id: 3, text: "培训教育信息管理" },
      ],
      categoryIndex: null, //点击当前背景变成蓝色索引
      categoryIndex2: null, //点击当前背景变成蓝色索引
      innerMenu: {},
      innerMenu2: [],
    }
  },
  created() {},
  methods: {
    secondMenu(id, index) {
      // this.$taber.open({
      //   name: this.innerMenu.text
      // })
      // console.log(this.innerMenu.text);
      this.categoryIndex = index;
      console.log(id);
      if (id == 0) {
        this.innerMenu = [
          // { id: 0, text: "个人信息", url: "/index/mainUser" },
          { id: 0, text: "修改密码", url: "/index/modifyPwd" }
        ]
      } else if (id == 1) {
        this.innerMenu = [
          { id: 1, text: "产品信息", url: "/index/goodsMessage" },
          { id: 2, text: "订单信息", url: "/index/order" },
          { id: 3, text: "地址信息", url: "/index/address" },
        ]
      } else if (id == 2) {
        this.innerMenu = [
          { id: 4, text: "科普信息", url: "/index/science" }
        ]
      } else if (id == 3) {
        this.innerMenu = [
          { id: 5, text: "培训教育信息", url: "/index/education" }
        ]
      }
    },
  },
  computed: {
    ...mapState(['isCollapse', 'roleId', 'username', 'options'])
  },
  mounted() {
    // 刷新时以当前路由做为tab加入tabs
    if (this.$route.path !== '/index/modifyPwd') {
      this.$store.commit('add_tabs', { route: '/index/modifyPwd', name: '修改密码' });
      this.$store.commit('add_tabs', { route: this.$route.path, name: this.$route.name });
      this.$store.commit('set_active_index', this.$route.path);
    } else {
      this.$store.commit('add_tabs', { route: '/index/modifyPwd', name: '修改密码' });
      this.$store.commit('set_active_index', '/index/modifyPwd');
      this.$router.push('/index/modifyPwd');
    }

  },
}

</script>
<style scoped>
.active {
  /*background-color: #161A2E;*/
  color: #5691EF;
}

</style>
-->