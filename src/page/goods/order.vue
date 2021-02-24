<template>
  <div style="height:100%;">
    <!--     <el-container style="height:100%;" direction="vertical">
      <header-common></header-common>
      <el-container style="height:100%;">
        <left-menu></left-menu>
        <el-main> -->
    <el-form>
      <el-row>
        <el-col :span="7">
          <el-form-item label="用户名称：" label-width="95px">
            <el-input v-model="form.buy_username" autocomplete="off" placeholder="请输入用户名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="手机号码：" :label-width="formLabelWidth">
            <el-input v-model="form.buy_phoneNumber" autocomplete="off" placeholder="请输入手机号码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="订单编号：" :label-width="formLabelWidth">
            <el-input v-model="form.buy_order" autocomplete="off" placeholder="请输入订单编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="margin-left:1%;">
          <el-form-item>
            <!--                   <el-button type="success" icon="el-icon-plus" @click="addGoods">新增</el-button> -->
            <el-button type="info" icon="el-icon-s-release" @click="reset">重置</el-button>
            <el-button type="primary" icon="el-icon-search" @click="getOrderMessage">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-row>
        <el-col :span="23" style="margin-left:1%;">
          <el-table ref="topictable" @row-click="getHandle" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe :height="tableHeight" border highlight-current-row style="height:100%" :header-cell-style="{background:'#F5F5F5',color:'black'}" :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column type="selection" width="70" align="center"></el-table-column>
            <el-table-column prop="buy_username" align="center" label="用户名称" width="130">
            </el-table-column>
            <el-table-column prop="buy_phoneNumber" align="center" label="手机号码" width="130">
            </el-table-column>
            <el-table-column prop="buy_names" align="center" label="商品名称" width="130">
            </el-table-column>
            <el-table-column prop="buy_order" align="center" label="订单编号" width="130">
            </el-table-column>
            <el-table-column prop="receive_place" align="center" label="收货地址" width="130">
            </el-table-column>
            <el-table-column prop="buy_picture" align="center" label="商品图片" width="130">
              <template slot-scope="scope">
                <img :src="scope.row.imageUrl" style="width:50px;height:50px;" />
              </template>
            </el-table-column>
            <el-table-column prop="buy_num" align="center" label="购买数量" width="130"></el-table-column>
            <el-table-column prop="state" align="center" label="状态" width="130"></el-table-column>
            <el-table-column prop="date" align="center" label="下单时间" width="130"></el-table-column>
            <el-table-column prop="note" align="center" label="备注" width="130"></el-table-column>
            <el-table-column prop="buy_price" align="center" label="商品单价" width="130"></el-table-column>
            <el-table-column prop="buy_allPrice" align="center" label="商品总价" width="130"></el-table-column>
            <!--             <el-table-column label="操作" align="center" width="230">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="editCheck(scope.row)" icon="el-icon-edit">修 改</el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" slot="reference" @click="deleteFun(scope.row)">删 除</el-button>
              </template>
            </el-table-column> -->
          </el-table>
          <el-pagination class="fy" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" :current-page="currentPage" :page-sizes="[15, 30, 50, 100]" :page-size="pageSize" @current-change="current_change" :total="currentTotal" background>
          </el-pagination>
        </el-col>
      </el-row>
    </el-form>
    <!--  </el-main>
      </el-container>
    </el-container> -->
    <!-- 放大图片弹窗 -->
    <el-dialog :visible.sync="picVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <!-- 修改商品信息弹窗 -->
    <el-dialog top="1.5%" title="修改订单信息" :visible.sync="dialogVisible" class="abow_dialog">
      <el-form :model="articleInfo" label-width="160px" ref="articleInfo" :rules="articleRules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名称：" prop="Content" :label-width="formLabelWidth">
              <el-input type="text" v-model="articleInfo.buy_username" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码：" prop="Content" :label-width="formLabelWidth">
              <el-input type="text" v-model="articleInfo.buy_phoneNumber" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品名称：" prop="Content" :label-width="formLabelWidth">
              <el-input type="text" v-model="articleInfo.buy_names" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单编号：" prop="Content" :label-width="formLabelWidth">
              <el-input type="text" v-model="articleInfo.buy_order" autocomplete="off" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货地址：" prop="Content" :label-width="formLabelWidth">
              <el-input type="text" v-model="articleInfo.receive_place" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="Content" label="购买数量：" :label-width="formLabelWidth">
              <el-input type="text" v-model="articleInfo.buy_num" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="Content" label="商品单价：" :label-width="formLabelWidth">
              <el-input type="text" v-model="articleInfo.buy_price" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="Content" label="商品总价：" :label-width="formLabelWidth">
              <el-input type="text" v-model="articleInfo.buy_allPrice" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="Content" label="状态" :label-width="formLabelWidth">
              <el-input type="text" v-model="articleInfo.state" autocomplete="off" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="Content" label="下单时间" :label-width="formLabelWidth">
              <el-input type="text" v-model="articleInfo.date" autocomplete="off" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="Content" label="备注" :label-width="formLabelWidth">
              <el-input type="text" v-model="articleInfo.note" autocomplete="off" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="text-align:center;">
          <el-button type="success" size="medium" icon="el-icon-lock" @click="confirmUpdate(articleInfo.id)">保存</el-button>
          <el-button type="primary" size="medium" icon="el-icon-refresh-right" @click="cancelUpdate">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import LeftMenu from '../../common/leftMenu.vue'
import HeaderCommon from '../../common/header.vue'
export default {
  components: {
    LeftMenu,
    HeaderCommon
  },
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        buy_username: "",
        buy_phoneNumber: "",
        buy_order: ""
      },
      currentTotal: 0, //默认数据总数
      pageSize: 15, //每页的数据条数
      currentPage: 1, //默认开始页面
      currentUserRow: [], //当前行数据
      picVisible: false,
      dialogImageUrl: "",
      dialogVisible: false, //编辑弹窗显示
      articleRules: {},
      tableData: [],
      articleInfo: {
        buy_username: "",
        buy_phoneNumber: "",
        buy_names: "",
        buy_order: "",
        receive_place: "",
        buy_number: "",
        state: ""
      }
    }
  },
  methods: {
    // 重置查询
    reset() {
      this.form.buy_username = "";
      this.form.buy_phoneNumber = "";
      this.form.buy_order = "";
    },
    editCheck(row) {
      console.log(row);
      this.dialogVisible = true;
      this.articleInfo = row;
      // this.articleInfo.value = row.goods_type;
    },
    confirmUpdate(id) {
      this.dialogVisible = false;
      this.articleInfo.goods_type = this.articleInfo.value;
      console.log(id);
    },
    cancelUpdate() {
      this.dialogVisible = false;
      this.articleInfo.goods_type = this.articleInfo.value;
    },
    deleteFun(scope) {
      this.$confirm('确认删除该条数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    current_change(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //拿到当前点击的行的数据
    getHandle(row) {
      this.currentUserRow = row;
    },
    //计算table高度
    _getTableHeight() {
      let tableH = 300
      let tableHeightDetil = window.innerHeight - tableH
      console.log(tableHeightDetil);
      if (tableHeightDetil <= 300) {
        this.tableHeight = 300
      } else {
        this.tableHeight = window.innerHeight - tableH
      }
    },
    // 获取所有订单信息
    getOrderMessage() {
      this.$axios({
        method: 'POST',
        url: this.baseURL + '/searchOrder',
        data: this.form
      }).then((res) => {
        this.tableData = res.data.list;
        this.tableData.forEach((item, index) => {
          this.tableData[index].buy_allPrice = item.buy_num * item.buy_price;
        })
        this.currentTotal = this.tableData.length;
      })
    },
  },
  created() {
    this.getOrderMessage();
    // this.currentTotal = this.tableData.length;
    this._getTableHeight();
  },
  //挂载window.onresize事件
  mounted() {
    let _this = this
    window.onresize = () => {
      if (_this.resizeFlag) {
        clearTimeout(_this.resizeFlag)
      }
      _this.resizeFlag = setTimeout(() => {
        _this._getTableHeight()
        _this.resizeFlag = null
      }, 100)
    }
  },
  // 注销window.onresize事件
  beforeRouteLeave(to, from, next) {
    //离开组件的时候触发
    window.onresize = null
    next()
  },
}

</script>
<style scoped>
.fy {
  padding-top: 1%;
  padding-bottom: 1%;
}

.abow_dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 0 auto !important;

  .el-dialog {
    margin: 0 auto !important;
    height: 90%;
    overflow: hidden;

    .el-dialog__body {
      position: absolute;
      left: 0;
      top: 54px;
      bottom: 0;
      right: 0;
      padding: 0;
      z-index: 1;
      overflow: hidden;
      overflow-y: auto;
    }
  }
}

</style>
