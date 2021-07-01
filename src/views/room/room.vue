<template>
  <div>
    <!--    搜索-->
    <div class="search">
      <label style="color: #666;font-size: 12px">客房类型：</label>
      <el-select size="mini" v-model="roomTypeId" placeholder="请选择客房类型" clearable
                 style="margin-right: 10px">
        <el-option
            v-for="item in roomTypeList"
            :key="item.roomTypeId"
            :label="item.roomTypeName"
            :value="item.roomTypeId"
        >
        </el-option>
      </el-select>
      <el-button type="success" size="mini" @click="searchClick">查询</el-button>
      <label style="color: #666;font-size: 12px">客房状态：</label>
      <el-select size="mini" v-model="roomStateId" placeholder="请选择客房状态" clearable
                 style="margin-right: 10px">
        <el-option
            v-for="item in roomStateList"
            :key="item.roomStateId"
            :label="item.roomStateName"
            :value="item.roomStateId"
        >
        </el-option>
      </el-select>
      <el-button type="success" size="mini" @click="searchClick">查询</el-button>
      <el-button type="success" size="mini" @click="excelClick">导出Excel</el-button>
      <el-button type="primary" size="mini" @click="addclick">添加</el-button>
    </div>
    <!--    表格-->
    <el-table
        :data="tableData"
        style="width: 99%"
        size="mini">
      <el-table-column
          label="房间号"
          width="180">
        <template slot-scope="scope">
          {{ scope.row.roomId }}
        </template>
      </el-table-column>
      <el-table-column
          label="房间编号"
          width="180">
        <template slot-scope="scope">
          {{ scope.row.roomType.roomTypeName }}
        </template>
      </el-table-column>
      <el-table-column
          label="床位数"
          width="180">
        <template slot-scope="scope">
          {{ scope.row.roomType.bedNum }}
        </template>
      </el-table-column>
      <el-table-column
          label="价格"
          width="180">
        <template slot-scope="scope">
          {{ scope.row.roomType.roomTypePrice }}
        </template>
      </el-table-column>
      <el-table-column
          label="房间状态"
          width="180">
        <template slot-scope="scope">
          <el-tag
              size="mini"
              :type="scope.row.roomStateId === 1 ? 'success' : (scope.row.roomStateId === 2 ?'danger':'warning')"
              disable-transitions>{{ scope.row.roomState.roomStateName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="warning"
              @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click="handleShowImg(scope.$index, scope.row)">图片
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页-->
    <div class="flex j-c" style="margin-top: 5px">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="count"
          @current-change="currentChange"
      >
      </el-pagination>
    </div>
    <!--    抽屉-->
    <el-drawer
        :title="isadd?'添加客房':'修改客房'"
        :visible.sync="drawer"
        direction="rtl"
        :before-close="drawerClose"
        size="45%">
      <div style="padding: 0 10px">
        <el-form size="mini" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px"
                 class="demo-ruleForm">
          <el-form-item label="客房编号" prop.number="roomId">
            <el-input v-model.number="ruleForm.roomId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="客房类型" prop="roomTypeId">
            <el-select size="mini" v-model="ruleForm.roomTypeId" placeholder="请选择客房类型" clearable
                       style="margin-right: 10px">
              <el-option
                  v-for="item in roomTypeList"
                  :key="item.roomTypeId"
                  :label="item.roomTypeName"
                  :value="item.roomTypeId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客房状态" prop="roomStateId">
            <el-select size="mini" v-model="ruleForm.roomStateId" placeholder="请选择客房状态" clearable
                       style="margin-right: 10px">
              <el-option
                  v-for="item in roomStateList2"
                  :key="item.roomStateId"
                  :label="item.roomStateName"
                  :value="item.roomStateId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <quill-editor v-model="ruleForm.description"
                          ref="myQuillEditor" style="height: 300px;margin-bottom: 100px">
            </quill-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{ isadd ? '添加' : '修改' }}</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
    <!--    图片弹出层-->
    <el-dialog
        title="房间图片"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose">
      <!--      图片上传组件-->
      <el-upload
          :action="Upload_RoomImg_URL"
          list-type="picture-card"
          :file-list="fileList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
        <i class="el-icon-plus"></i>
      </el-upload>
      <!--      弹出层：用于显示大图-->
      <el-dialog :visible.sync="dialogVisible2" append-to-body>
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
//导入 显示房间图片的根路径和房间图片上传地址
import {BASE_URL_RoomImg, Upload_RoomImg_URL} from '../../config'
import xlsx from "../../util/xlsx";
//导入 导出excel文件的方法
export default {
  name: "role",
  //数据
  data() {
    //验证房间号
    var validateRoomId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入客房编号'));
      } else if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else {
        callback();
      }
    };
    //验证状态
    var validateRoomStateId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error('请输入客房状态'));
      } else {
        callback();
      }
    };
    //验证类型
    var validateRoomTypeId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error('请输入客房类型'));
      } else {
        callback();
      }
    };
    return {
      // 房间图片的根路径
      BASE_URL_RoomImg,
      // 房间图片上传地址
      Upload_RoomImg_URL,
      //是否显示弹出层
      dialogVisible: false,
      //是否显示查看大图弹出层
      dialogVisible2: false,
      //弹出层里面大图的地址
      dialogImageUrl: "",
      //定义房间图片对应的房间号
      roomId: "",
      //定义房间照片墙显示的照片数组
      fileList: [],
      //表格数据
      tableData: [],
      //表格数据的总数量
      count: 0,
      //客房类型编号
      roomTypeId: "",
      //客房状态编号
      roomStateId: "",
      //客房类型数组
      roomTypeList: [],
      //客房状态列表
      roomStateList: [],
      //客房状态列表(用于添加)
      roomStateList2: [],
      //当前页码
      pageIndex: 1,
      //是否打开抽屉
      drawer: false,
      //抽屉是否做添加
      isadd: true,
      //表单数据
      ruleForm: {
        //房间号
        roomId: "",
        //状态编号
        roomStateId: "",
        //类型编号
        roomTypeId: "",
        //房间描述
        description: "",
      },
      //表单验证数据
      rules: {
        //验证房间号
        roomId: [
          {validator: validateRoomId, trigger: 'blur'}
        ],
        //验证状态
        roomStateId: [
          {validator: validateRoomStateId, trigger: 'change'}
        ],
        //验证类型价格
        roomTypeId: [
          {validator: validateRoomTypeId, trigger: 'change'}
        ],
      }
    }
  },
  created() {
    //调用获取表格数据的方法
    this.getTableData()
    //获取客房类型列表的方法
    this.getRoomTypeList()
    //获取客房状态列表的方法
    this.getRoomStateList()
  },
  //方法
  methods: {
    //组织导出数据
    excelClick() {
      let json = this.tableData.map(r=>{
        return{
          roomId:r.roomId,
          roomType:r.roomType.roomTypeName,
          bedNum:r.roomType.bedNum,
          price:r.roomType.roomTypePrice,
          roomState:r.roomState.roomStateName
        }
      })
      // 组织表头对象
      let fields = {
        roomId:"客房编号",
        roomType:"客房类型",
        bedNum:"床位数",
        price:"价格",
        roomState:"客房状态"
      }
      // 定义文件名称
      let filename = '客房信息表'
      //将指定的数据导出到一个excel文件中
      xlsx(json,fields,filename)
    },
    //获取表格数据的方法
    async getTableData() {
      //获取房间类型信息
      let {data, count} = await this.$get('/Room/List', {
        roomTypeId: (this.roomTypeId || 0),
        roomStateId: (this.roomStateId || 0),
        pageIndex: this.pageIndex
      });
      //设置表格显示的房间信息
      this.tableData = data;
      //设置总数量
      this.count = count;
    },
    //分页方法
    currentChange(pageIndex) {
      //设置当前页码
      this.pageIndex = pageIndex;
      //重新调用获取表格数据的方法
      this.getTableData();
    },
    //搜索方法
    searchClick() {
      //重新调用获取表格数据的方法
      this.getTableData();
    },
    //获取客房类型列表的方法
    async getRoomTypeList() {
      let res = await this.$get('/RoomType/List');
      this.roomTypeList = res;
    },
    //获取客房状态列表的方法
    async getRoomStateList() {
      let res = await this.$get('/RoomState/List');
      this.roomStateList = res;
      //获取客房状态信息（没有入住状态）
      let res2 = await this.$get('/RoomState/ListToUpdate');
      this.roomStateList2 = res2;
    },
    //删除表格数据
    async handleDelete(index, row) {
      //删除确认
      await this.$con_f('是否确定删除？')
      //获取编号
      let roomId = row.roomId
      //删除对应账号信息
      let {success, message} = await this.$post('/Room/Delete', {roomId})
      if (success) {
        this.$msg_s(message)
        //获取最新的信息
        this.getTableData()
      } else {
        this.$msg_e(message)
      }
    },
    //查看客房图片
    handleShowImg(index, row) {
      //显示客房图片列表的对话框
      this.dialogVisible = true
      // 获取客房编号
      this.roomId = row.roomId
      //显示图片列表
      this.ShowImg()
    },
    //显示图片列表
    async ShowImg() {
      // 根据客房编号，查询所有客房图片
      let res = await this.$get('/RoomImg/List', {roomId: this.roomId})
      //设置照片墙上，显示的照片列表
      this.fileList = res.map(r => {
        return {
          roomImgId: r.roomImgId,
          name: r.imgUrl,
          url: this.BASE_URL_RoomImg + r.imgUrl
        }
      })
    },
    //关闭图片对话框
    handleClose(done) {
      //清空照片墙上缓存的客房照片
      this.fileList = [];
      done();
    },
    //删除照片墙里的照片
    async handleRemove(file, fileList) {
      let {roomImgId, name} = file
      let {success, message} = await this.$post('/RoomImg/Delete', {roomImgId, filename: name})
      if (success) {
        this.$msg_s(message, 1000);
      } else {
        this.$msg_e(message, 1000);
      }
    },
    //预览照片墙上的照片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible2 = true;
    },
    //添加按钮点击方法
    addclick() {
      this.drawer = true
    },
    //关闭抽屉的方法
    drawerClose(done) {
      this.resetForm('ruleForm')
      //表单恢复成添加状态
      this.isadd = true
      //关闭抽屉
      done()
    },
    //表单提交方法
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        //判断表单是否验证成功
        if (valid) {
          //判断是否执行添加功能
          if (this.isadd) {
            //执行添加功能
            let {success, message} = await this.$post('/Room/Add', this.ruleForm)
            //判断是否添加成功
            if (success) {
              this.$msg_s(message)
              //获取最新的信息
              this.getTableData()
              //清空表单
              this.resetForm("ruleForm")
            } else {
              this.$msg_e(message)
            }
          } else {
            //执行修改功能
            let {success, message} = await this.$post('/Room/Update', this.ruleForm)
            //判断是否修改成功
            if (success) {
              this.$msg_s(message)
              //获取最新的信息
              this.getTableData()
            } else {
              this.$msg_e(message)
            }
          }

        } else {
          return false;
        }
      });
    },
    //表单重置方法
    resetForm(formName) {
      //重置表单
      this.$refs[formName].resetFields();
      //清空表单数据
      this.ruleForm = {
        //房间号
        roomId: "",
        //状态编号
        roomStateId: "",
        //类型编号
        roomTypeId: "",
        //房间描述
        description: "",
      }
    },
    //编辑表格数据
    async handleEdit(index, row) {
      //获取编号
      let roomId = row.roomId;
      //根据编号，获取对象
      let res = await this.$get('/Room/GetOne', {roomId})
      //将获取到的对象，传给表单数据
      this.ruleForm = res
      //给表单对象添加一个id，用于备份房间号
      this.ruleForm.id = res.roomId;
      //表示修改
      this.isadd = false;
      //打开抽屉
      this.drawer = true;
    },
    //照片上传成功
    async handleAvatarSuccess(res) {
      let {success, filename} = res
      //表示客房图片上传成功
      if (success) {
        let res = await this.$post('RoomImg/Add', {
          roomId: this.roomId,
          imgUrl: filename
        })
      }
    },
    //照片上传之前
    beforeAvatarUpload(file) {
      //定义可以上传的图片类型数组
      let img_type_list = ["image/jpeg", "image/png", "image/gif"]
      //通过includes方法判断是否包含
      const isJPG = img_type_list.includes(file.type);
      //限制图片大小
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isJPG) {
        this.$message.error('上传客房图片只能是 JPG,PNG,GIF 格式!');
      }
      if (!isLt1M) {
        this.$message.error('上传客房图片大小不能超过 1MB!');
      }
      return isJPG && isLt1M;
    },
  }
}
</script>

<style scoped lang="scss">
label:nth-of-type(2) {
  margin-left: 10px;
}
</style>