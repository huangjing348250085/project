<template>
  <div>
    <!--    搜索-->
    <div class="search">
      <el-button type="primary" size="mini" @click="addclick">添加角色</el-button>
    </div>
    <!--    表格-->
    <el-table
        :data="tableData"
        style="width: 99%"
        size="mini"
    >
      <el-table-column
          label="角色编号"
          width="180">
        <template slot-scope="scope">
          {{ scope.row.roleId }}
        </template>
      </el-table-column>
      <el-table-column
          label="角色名称"
          width="180">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="success"
              >设置权限
          </el-button>
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
        :title="isadd?'添加角色':'修改角色'"
        :visible.sync="drawer"
        direction="rtl"
        :before-close="drawerClose">
      <div style="padding: 0 10px">
        <el-form size="mini" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px"
                 class="demo-ruleForm">
          <el-form-item label="角色名称" prop="ruleName">
            <el-input v-model="ruleForm.ruleName" autocomplete="off"></el-input>
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
import * as role_api from '../../api/role_api'
export default {
  name: "role",
  //数据
  data() {
    //验证角色名称
    var validateRuleName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入角色名称'));
      } else {
        callback();
      }
    };
    return {
      //表格数据
      tableData: [],
      //是否打开抽屉
      drawer: false,
      //抽屉是否做添加
      isadd: true,
      //表单数据
      ruleForm: {
        ruleName: ""
      },
      //表单验证数据
      rules: {
        //验证账号
        ruleName: [
          {validator: validateRuleName, trigger: 'blur'}
        ],
      }
    }
  },
  created() {
    //调用获取表格数据的方法
    this.getTableData()
  },
  //方法
  methods: {
    //获取表格数据的方法
    async getTableData() {
      //在页面中请求接口获取数据
      // let res = await this.$get('/Role/List')
      //在api层请求接口获取数据
      let res =await role_api.list()
      this.tableData = res
    },
    //删除表格数据
    async handleDelete(index, row) {
      //删除确认
      await this.$con_f('是否确定删除？')
      //获取角色编号
      let roleId = row.roleId
      //删除对应角色信息
      let {success, message} = await this.$post('/Role/Delete', {roleId})
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
            let {success, message} = await this.$post('/Role/Add', this.ruleForm)
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
            let {success, message} = await this.$post('/Role/Update', this.ruleForm)
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
        ruleName: "",
      }
    },
    //编辑表格数据
    async handleEdit(index, row) {
      //获取角色编号
      let roleId = row.roleId;
      //根据角色编号，获取角色对象
      let res = await this.$get('/Role/GetOne', {roleId})
      this.ruleorm = res
      //表示修改
      this.isadd = false;
      //打开抽屉
      this.drawer = true;
    },
  }
}
</script>

<style scoped lang="scss">
.search {
  padding-bottom: 10px;
}
</style>