<template>
  <div>
    <!--    搜索-->
    <div class="search">
      <label style="color: #666;font-size: 12px">角色：</label>
      <el-select size="mini" v-model="roleId" placeholder="请选择角色" clearable
                 style="margin-right: 10px">
        <el-option
            v-for="item in roleListToSearch"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
        >
        </el-option>
      </el-select>
      <el-button type="success" size="mini" @click="searchClick">查询</el-button>
      <el-button type="primary" size="mini" @click="addclick">添加</el-button>
    </div>
    <!--    表格-->
    <el-table
        :data="tableData"
        style="width: 99%"
        size="mini">
      <el-table-column
          label="编号"
          width="160">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column
          label="账号"
          width="160">
        <template slot-scope="scope">
          {{ scope.row.loginId }}
        </template>
      </el-table-column>
      <el-table-column
          label="姓名"
          width="160">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
          label="电话"
          width="160">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column
          label="头像"
          width="160">
        <template slot-scope="scope">
          <el-image
              style="width: 60px; height: 60px"
              :src="BASE_URL_AdminImg+(scope.row.photo||'admin_default.jpg')"
              fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column
          label="角色"
          width="160">
        <template slot-scope="scope">
          {{ scope.row.role.roleName }}
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="warning"
              @click="handleEdit(scope.$index, scope.row)">编辑
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
          :page-size="8"
          @current-change="currentChange"
      >
      </el-pagination>
    </div>
    <!--    抽屉-->
    <el-drawer
        :title="isadd?'添加账号':'修改账号'"
        :visible.sync="drawer"
        direction="rtl"
        :before-close="drawerClose">
      <div style="padding: 0 10px">
        <el-form size="mini" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px"
                 class="demo-ruleForm">
          <el-form-item label="头像" prop="photo">
            <el-upload
                class="avatar-uploader"
                :action="Upload_AdminImg_URL"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
              <img v-if="ruleForm.photo" :src="BASE_URL_AdminImg+ruleForm.photo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="账号" prop="loginId">
            <el-input v-model="ruleForm.loginId" autocomplete="off"></el-input>
          </el-form-item>
          <!--          不需要修改密码-->
          <el-form-item v-if="isadd" label="密码" prop="loginPwd">
            <el-input type="password" v-model="ruleForm.loginPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item v-if="isadd" label="确认密码" prop="loginPwd2">
            <el-input type="password" v-model="ruleForm.loginPwd2" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roleId">
            <el-select v-model="ruleForm.roleId" placeholder="请选择角色" clearable>
              <el-option
                  v-for="item in roleList"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{ isadd ? '添加' : '修改' }}</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
//导入 查看管理员头像根路径和管理员头像上传路径
import {BASE_URL_AdminImg, Upload_AdminImg_URL} from '../../config'
//导入md5加密方法
import {strtomd5} from "../../util/md5";

export default {
  name: "role",
  //数据
  data() {
    //验证账号
    var validateLoginId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error('请输入账号'));
      } else {
        callback();
      }
    };
    //验证密码
    var validateLoginPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    //验证确认密码
    var validateLoginPwd2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'));
      } else if (value !== this.ruleForm.loginPwd) {
        callback(new Error('两次密码输入不一致'));
      } else {
        callback();
      }
    };
    //验证姓名
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入姓名'));
      } else {
        callback();
      }
    };
    //验证手机
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机'));
      } else {
        callback();
      }
    };
    //验证角色
    var validateRoleId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入角色'));
      } else {
        callback();
      }
    };
    return {
      //表格数据
      tableData: [],
      //表格数据的总数量
      count: 0,
      //角色编号(用于根据条件查询账号信息)
      roleId: "",
      //角色列表（用于搜索）
      roleListToSearch:[],
      //当前页码
      pageIndex: 1,
      //角色列表
      roleList: [],
      //管理员头像根路径
      BASE_URL_AdminImg,
      //管理员头像上传路径
      Upload_AdminImg_URL,
      //是否打开抽屉
      drawer: false,
      //抽屉是否做添加
      isadd: true,
      //表单数据
      ruleForm: {
        //账号
        loginId: "",
        //密码
        loginPwd: "",
        //确认密码
        loginPwd2: "",
        //姓名
        name: "",
        //电话
        phone: "",
        //角色编号
        roleId: "",
        //头像
        photo: "",
      },
      //表单验证数据
      rules: {
        //验证账号
        loginId: [
          {validator: validateLoginId, trigger: 'blur'}
        ],
        //验证密码
        loginPwd: [
          {validator: validateLoginPwd, trigger: 'blur'}
        ],
        //验证确认密码
        loginPwd2: [
          {validator: validateLoginPwd2, trigger: 'blur'}
        ],
        //验证姓名
        name: [
          {validator: validateName, trigger: 'blur'}
        ],
        //验证手机
        phone: [
          {validator: validatePhone, trigger: 'blur'}
        ],
        //验证角色
        roleId: [
          {validator: validateRoleId, trigger: 'change'}
        ],
      }
    }
  },
  created() {
    //调用获取表格数据的方法
    this.getTableData()
    //获取角色列表的方法
    this.getRoleList()
  },
  //方法
  methods: {
    //获取表格数据的方法
    async getTableData() {
      let {data, count} = await this.$get('/Admin/List', {
        roleId: (this.roleId || 0),
        pageIndex: this.pageIndex,
        pageSize: 8,
      })
      //data是账号数组数据
      //count是总共有多少条数据
      this.tableData = data;
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
    searchClick(){
      //重新调用获取表格数据的方法
      this.getTableData();
    },
    //获取角色列表的方法
    async getRoleList() {
      let res = await this.$get('/Role/List');
      this.roleList = res;
      this.roleListToSearch=res;
    },
    //删除表格数据
    async handleDelete(index, row) {
      //删除确认
      await this.$con_f('是否确定删除？')
      //获取编号
      let id = row.id
      //获取头像照片名称
      let photo = row.photo
      //删除对应账号信息
      let {success, message} = await this.$post('/Admin/Delete', {id, photo})
      if (success) {
        this.$msg_s(message)
        //获取最新的信息
        this.getTableData()
      } else {
        this.$msg_e(message)
      }
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
            //对密码进行加密
            this.ruleForm.loginPwd = strtomd5(this.ruleForm.loginPwd)
            //执行添加功能
            let {success, message} = await this.$post('/Admin/Add', this.ruleForm)
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
            let {success, message} = await this.$post('/Admin/Update', this.ruleForm)
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
        //账号
        loginId: "",
        //密码
        loginPwd: "",
        //确认密码
        loginPwd2: "",
        //姓名
        name: "",
        //电话
        phone: "",
        //角色编号
        roleId: "",
        //头像
        photo: "",
      }
    },
    //编辑表格数据
    async handleEdit(index, row) {
      //获取登录名
      let loginId = row.loginId;
      //根据角色编号，获取角色对象
      let res = await this.$get('/Admin/GetOne', {loginId})
      this.ruleorm = res
      //表示修改
      this.isadd = false;
      //打开抽屉
      this.drawer = true;
    },
    //照片上传成功
    handleAvatarSuccess(res) {
      let {success, filename} = res
      //表示头像上传成功
      if (success) {
        this.ruleForm.photo = filename
      }
    },
    //照片上传之前
    beforeAvatarUpload(file) {
      //定义可以上传的图片类型数组
      let img_type_list = ["image/jpeg", "image/png", "image/gif"]
      const isJPG = img_type_list.includes(file.type);
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG,PNG,GIF 格式!');
      }
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!');
      }
      return isJPG && isLt1M;
    },
  }
}
</script>

<style scoped lang="scss">
//上传头像样式
.avatar-uploader {
  width: 178px;
  height: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>