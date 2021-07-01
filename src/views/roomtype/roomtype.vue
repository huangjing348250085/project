<template>
  <div>
    <!--    搜索-->
    <div class="search">
      <el-button type="primary" size="mini" @click="addclick">添加客房类型</el-button>
    </div>
    <!--    表格-->
    <el-table
        :data="tableData"
        style="width: 99%"
        size="mini">
      <el-table-column
          label="类型编号"
          width="180">
        <template slot-scope="scope">
          {{ scope.row.roomTypeId }}
        </template>
      </el-table-column>
      <el-table-column
          label="类型名称"
          width="180">
        <template slot-scope="scope">
          {{ scope.row.roomTypeName }}
        </template>
      </el-table-column>
      <el-table-column
          label="床位数"
          width="180">
        <template slot-scope="scope">
          {{ scope.row.bedNum }}
        </template>
      </el-table-column>
      <el-table-column
          label="价格"
          width="180">
        <template slot-scope="scope">
          {{ scope.row.roomTypePrice }}
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
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    抽屉-->
    <el-drawer
        :title="isadd?'添加客房类型':'修改客房类型'"
        :visible.sync="drawer"
        direction="rtl"
        :before-close="drawerClose"
    size="45%">
      <div style="padding: 0 10px">
        <el-form size="mini" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px"
                 class="demo-ruleForm">
          <el-form-item label="类型名称" prop="roomTypeName">
            <el-input v-model="ruleForm.roomTypeName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="床位数" prop="bedNum">
            <el-input v-model.number="ruleForm.bedNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="roomTypePrice">
            <el-input v-model.number="ruleForm.roomTypePrice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="typeDescription">
            <quill-editor v-model="ruleForm.typeDescription"
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
  </div>
</template>

<script>
export default {
  name: "role",
  //数据
  data() {
    //验证客房类型名称
    var validateRoomTypeName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error('请输入客房类型名称'));
      } else {
        callback();
      }
    };
    //验证客房类型床位数
    var validateBedNum = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入客房类型床位数'));
      }else if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else {
        callback();
      }
    };
    //验证客房类型价格
    var validateRoomTypePrice = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入客房类型价格'));
      }else if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      }else {
        callback();
      }
    };
    return {
      //表格数据
      tableData: [],
      //表格数据的总数量
      count: 0,
      //当前页码
      pageIndex: 1,
      //是否打开抽屉
      drawer: false,
      //抽屉是否做添加
      isadd: true,
      //表单数据
      ruleForm: {
        //类型名称
        roomTypeName:"",
        //床位数
        bedNum:"",
        //类型价格
        roomTypePrice:"",
        //类型描述
        typeDescription:"",
      },
      //表单验证数据
      rules: {
        //验证客房类型名称
        roomTypeName: [
          {validator: validateRoomTypeName, trigger: 'blur'}
        ],
        //验证客房类型床位数
        bedNum: [
          {validator: validateBedNum, trigger: 'blur'}
        ],
        //验证客房类型价格
        roomTypePrice: [
          {validator: validateRoomTypePrice, trigger: 'blur'}
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
      //获取房间类型信息
      let data = await this.$get('/RoomType/List');
          this.tableData = data;
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
      let roomTypeId = row.roomTypeId
      //删除对应账号信息
      let {success, message} = await this.$post('/RoomType/Delete', {roomTypeId})
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
            //执行添加功能
            let {success, message} = await this.$post('/RoomType/Add', this.ruleForm)
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
            let {success, message} = await this.$post('/RoomType/Update', this.ruleForm)
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
          //类型名称
          roomTypeName:"",
          //床位数
          bedNum:"",
          //类型价格
          roomTypePrice:"",
          //类型描述
          typeDescription:"",
      }
    },
    //编辑表格数据
    async handleEdit(index, row) {
      //获取编号
      let roomTypeId = row.roomTypeId;
      //根据编号，获取对象
      let res = await this.$get('/RoomType/GetOne', {roomTypeId})
      //将获取到的对象，传给表单数据
      this.ruleForm = res
      //表示修改
      this.isadd = false;
      //打开抽屉
      this.drawer = true;
    },
  }
}
</script>

<style scoped lang="scss">

</style>