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
          <el-form-item label="商品名称：" label-width="95px">
            <el-input v-model="form.name" autocomplete="off" placeholder="请输入商品名称"></el-input>
          </el-form-item>
        </el-col>
        <!--         <el-col :span="7">
          <el-form-item label="商品编号：" :label-width="formLabelWidth">
            <el-input v-model="form.goodsNumber" autocomplete="off" placeholder="请输入商品编号"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="7">
          <el-form-item label="商品类型：" :label-width="formLabelWidth">
            <el-select v-model="form.value" placeholder="请选择" style="width:100%;">
              <el-option v-for="item in form.goodsType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="margin-left:1%;">
          <el-form-item>
            <el-button type="success" icon="el-icon-plus" @click="addGoods">新增</el-button>
            <el-button type="info" icon="el-icon-s-release" @click="reset">重置</el-button>
            <el-button type="primary" icon="el-icon-search" @click="searchGoods">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-row>
        <el-col :span="23" style="margin-left:1%;">
          <el-table ref="topictable" @row-click="getHandle" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe :height="tableHeight" border highlight-current-row style="height:100%" :header-cell-style="{background:'#F5F5F5',color:'black'}" :default-sort="{prop: 'date', order: 'descending'}">
            <!-- <el-table-column type="index" width="50" align="center"></el-table-column> -->
            <el-table-column type="selection" width="70" align="center"></el-table-column>
            <el-table-column prop="id" align="left" label="id" width="130" v-if="false">
            </el-table-column>
            <el-table-column prop="name" align="left" label="商品名称" width="130">
            </el-table-column>
            <el-table-column prop="goods_picture" align="center" label="商品图片" width="130">
              <template slot-scope="scope">
                <img :src="scope.row.img" style="width:50px;height:50px;" />
              </template>
            </el-table-column>
            <el-table-column prop="type" align="center" label="商品类型" width="130"></el-table-column>
            <el-table-column prop="evaluate" align="center" label="评分" width="130"></el-table-column>
            <el-table-column prop="reduce1" align="left" label="满减优惠一" width="130"></el-table-column>
            <el-table-column prop="reduce2" align="left" label="满减优惠二" width="130"></el-table-column>
            <el-table-column prop="sellnum" align="center" label="商品销量" width="130"></el-table-column>
            <el-table-column prop="price" align="center" label="商品价格" width="130"></el-table-column>
            <el-table-column label="操作" align="center" width="230">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="editCheck(scope.row)" icon="el-icon-edit">修 改</el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" slot="reference" @click="deleteFun(scope.row)">删 除</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="" align="center" label="" width="230"></el-table-column>
          </el-table>
          <el-pagination class="fy" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" :current-page="currentPage" :page-sizes="[15, 30, 50, 100]" :page-size="pageSize" @current-change="current_change" :total="currentTotal" background>
          </el-pagination>
        </el-col>
      </el-row>
    </el-form>
    <!--         </el-main>
      </el-container>
    </el-container> -->
    <!-- 放大图片弹窗 -->
    <el-dialog :visible.sync="picVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <!-- 新增弹窗 -->
    <el-dialog top="1.5%" :title="goodTitle" :visible.sync="addDialogVisible" @close='closeDialog' :before-close="handleDialogClose" class="abow_dialog">
      <el-form :model="articleInfo" label-width="160px" ref="articleInfo" :rules="articleRules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品名称：" prop="Content" :label-width="formLabelWidth">
              <el-input type="text" v-model="articleInfo.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品类型：" prop="Content" :label-width="formLabelWidth">
              <el-select v-model="articleInfo.value" placeholder="请选择" style="width:100%;">
                <el-option v-for="item in articleInfo.type" :key="item.id" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="评分：" prop="Content" :label-width="formLabelWidth">
              <el-input type="text" v-model="articleInfo.evaluate" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="满减优惠一：" prop="Content" :label-width="formLabelWidth">
              <el-input type="text" v-model="articleInfo.reduce1" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="满减优惠二：" prop="Content" :label-width="formLabelWidth">
              <el-input type="text" v-model="articleInfo.reduce2" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="Content" label="商品销量：" :label-width="formLabelWidth">
              <el-input type="text" v-model="articleInfo.sellnum" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="Content" label="商品价格：" :label-width="formLabelWidth">
              <el-input type="text" v-model="articleInfo.price" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="商品图片：" prop="Content" :label-width="formLabelWidth">
              <el-upload action="#" list-type="picture-card" :limit="1" :auto-upload="false" ref="upload" :on-change="handlePreview" :file-list="fileList">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}" style="height:100%;">
                  <img class="el-upload-list__item-thumbnail" :src="dialogImageUrl" alt="">
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="text-align:center;">
          <el-button type="success" size="medium" icon="el-icon-lock" @click="confirmAdd">保存</el-button>
          <el-button type="primary" size="medium" icon="el-icon-refresh-right" @click="cancelAdd">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import LeftMenu from '../../common/leftMenu.vue'
import HeaderCommon from '../../common/header.vue'
export default {
  data() {
    return {
      // table 高度
      tableHeight: "",
      formLabelWidth: "120px",
      form: {
        name: "",
        value: "",
        goodsType: [
          { id: "0", value: "0", label: "药剂" },
          { id: "1", value: "1", label: "生活急救药" },
          { id: "2", value: "2", label: "处方药" },
          { id: "3", value: "3", label: "健康保健药" },
        ],
      },
      articleRules: {

      },
      tableData: [],
      visible: false,
      dialogVisible: false, //编辑弹窗显示
      addDialogVisible: false, //新增弹窗显示
      goodTitle: "新增商品信息",
      articleInfo: {
        evaluate: "",
        name: "",
        id: "",
        sellnum: "",
        price: "",
        goods_picture: "",
        reduce1: "",
        reduce2: "",
        value: "",
        img: "",
        imgType: "",
        type: [
          { id: "0", value: "0", label: "药剂" },
          { id: "1", value: "1", label: "生活急救药" },
          { id: "2", value: "2", label: "处方药" },
          { id: "3", value: "3", label: "健康保健药" },
        ],
      },
      disabled: false,
      picVisible: false,
      dialogImageUrl: "",
      currentTotal: 0, //默认数据总数
      pageSize: 15, //每页的数据条数
      currentPage: 1, //默认开始页面
      currentUserRow: [], //当前行数据
      fileList: [],
    }
  },
  components: {
    LeftMenu,
    HeaderCommon
  },
  methods: {
    // 点击查询按钮
    searchGoods() {
      this.$axios({
        method: 'POST',
        url: this.baseURL + '/searchCommodity',
        data: this.form
      }).then((res) => {
        this.tableData = res.data.list;
        this.modifyGoodMessageTypeName();
        this.currentTotal = this.tableData.length;
        console.log(res);
      })
    },
    editCheck(row) {
      this.goodTitle = "修改商品信息";
      this.fileList = [];
      this.dialogImageUrl = "";
      this.addDialogVisible = true;
      this.articleInfo.name = row.name;
      this.articleInfo.evaluate = row.evaluate;
      this.articleInfo.id = row.id;
      this.articleInfo.sellnum = row.sellnum;
      this.articleInfo.price = row.price;
      this.articleInfo.reduce1 = row.reduce1;
      this.articleInfo.reduce2 = row.reduce2;
      if (row.type == "药剂") {
        this.articleInfo.value = "0";
      } else if (row.type == "生活急救药物") {
        this.articleInfo.value = "1"
      } else if (row.type == "处方药") {
        this.articleInfo.value = "2"
      } else if (row.type == "健康保健药") {
        this.articleInfo.value = "3"
      }
      this.articleInfo.img = row.img;
      this.dialogImageUrl = row.img
      this.fileList.push({ url: row.img });
    },
    modifyEditOption(label) {
      this.articleInfo.value = label;
      this.articleInfo.goods_type = label;
    },
    // 选择种类时，重设option
    resetOption() {
      this.articleInfo.type = [
        { id: "0", value: "0", label: "药剂" },
        { id: "1", value: "1", label: "生活急救药" },
        { id: "2", value: "2", label: "处方药" },
        { id: "3", value: "3", label: "健康保健药" },
      ]
    },
    sureCheck(row) {

    },
    deleteFun(scope) {
      this.$confirm('确认删除该条数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'POST',
          url: this.baseURL + '/deleteCommodityById',
          data: { id: scope.id },
        }).then((res) => {
          if (res.data.result.type == "success") {
            this.getGoodMessage();
            this.$message({
              type: 'success',
              message: '删除成功'
            });
          } else {
            this.$message({
              type: 'info',
              message: '删除失败'
            });
            console.log(res.data);
          }

        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
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
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.articleInfo.imgType = file.raw.type;
      var that = this;
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(e) {
        // this.result // 这个就是base64编码了
        // This.imageUrl = this.result;
        that.imageUrl = this.result
        that.articleInfo.pic_url = this.result
      }
    },
    handlePictureCardPreview(file) {
      // this.articleInfo.img = file.url;
      this.dialogImageUrl = file.url;
      this.picVisible = true;
    },
    handleRemove(file) {
      this.$refs.upload.clearFiles();
    },
    // 重置查询
    reset() {
      this.form.goodsName = "";
      this.form.goodsNumber = "";
      this.form.value = "";
      this.form.name = "";
    },
    // 添加商品
    addGoods() {
      this.goodTitle = "新增商品信息";
      this.addDialogVisible = true;
      this.dialogImageUrl = "";
      this.articleInfo = {
        name: "",
        evaluate: "",
        id: "",
        sellnum: "",
        price: "",
        goods_picture: "",
        reduce1: "",
        reduce2: "",
        value: "",
        img: "",
        type: [
          { id: "0", value: "0", label: "药剂" },
          { id: "1", value: "1", label: "生活急救药" },
          { id: "2", value: "2", label: "处方药" },
          { id: "3", value: "3", label: "健康保健药" },
        ],
      }
    },
    confirmAdd() {
      if (this.goodTitle == "新增商品信息") {
        this.$axios({
          method: 'POST',
          url: this.baseURL + '/addCommodity',
          data: this.articleInfo,
        }).then((res) => {
          if (res.data.result.type == "success") {
            this.getGoodMessage();
          } else {
            console.log(res.data);
          }

        })
      } else if (this.goodTitle == "修改商品信息") {
        console.log(this.articleInfo);
        this.$axios({
          method: 'POST',
          url: this.baseURL + '/updateCommodityById',
          data: this.articleInfo,
        }).then((res) => {
          if (res.data.result.type == "success") {
            this.getGoodMessage();
          } else {
            console.log(res.data);
          }

        })
      }
      this.addDialogVisible = false;
    },
    cancelAdd() {
      this.addDialogVisible = false;
    },
    current_change(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    //拿到当前点击的行的数据
    getHandle(row) {
      this.currentUserRow = row;
    },
    //计算table高度
    _getTableHeight() {
      let tableH = 240
      let tableHeightDetil = window.innerHeight - tableH
      console.log(tableHeightDetil);
      if (tableHeightDetil <= 300) {
        this.tableHeight = 300
      } else {
        this.tableHeight = window.innerHeight - tableH
      }
    },
    // 获取所有商品信息
    getGoodMessage() {
      this.$axios({
        method: 'GET',
        url: this.baseURL + '/commodity',
      }).then((res) => {
        this.tableData = res.data.list;
        this.modifyGoodMessageTypeName();
        this.currentTotal = this.tableData.length;
      })
    },
    modifyGoodMessageTypeName() {
      this.tableData.forEach((item, index) => {
        if (item.type == 0) {
          this.tableData[index].type = "药剂"
        } else if (item.type == 1) {
          this.tableData[index].type = "生活急救药物"
        } else if (item.type == 2) {
          this.tableData[index].type = "处方药"
        } else if (item.type == 3) {
          this.tableData[index].type = "健康保健药"
        }
      })
    },
    // 关闭弹窗清除图片列表
    closeDialog() {
      this.fileList = [];
    },
    handleDialogClose() {
      this.fileList = [];
      this.addDialogVisible = false;
    }
  },
  created() {
    this.getGoodMessage();
    this._getTableHeight();
  },
  watch: {
    addDialogVisible(current, old) {
      if (current == false) {
        this.fileList = [];
      }
    }
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
