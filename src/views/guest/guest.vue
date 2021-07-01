<template>
  <div>
    <!--    搜索-->
    <div class="search">
      <label style="color: #666;font-size: 12px">客户姓名：</label>
      <el-input v-model="guestName" size="mini" clearable style="width: 200px" placeholder="请输入客户姓名"></el-input>
      <label style="color: #666;font-size: 12px">结账状态：</label>
      <el-select size="mini" v-model="resideStateId" placeholder="请选择结账状态" clearable
                 style="margin-right: 10px">
        <el-option
            v-for="item in resideStateList"
            :key="item.resideStateId"
            :label="item.resideStateName"
            :value="item.resideStateId"
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
        style="width: 100%"
        size="mini">
      <el-table-column
          label="客户姓名"
          width="80">
        <template slot-scope="scope">
          {{ scope.row.guestName }}
        </template>
      </el-table-column>
      <el-table-column
          label="客户电话"
          width="100">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column
          label="身份证号"
          width="150">
        <template slot-scope="scope">
          {{ scope.row.identityId }}
        </template>
      </el-table-column>
      <el-table-column
          label="入住房间"
          width="80">
        <template slot-scope="scope">
          {{ scope.row.roomId }}
        </template>
      </el-table-column>
      <el-table-column
          label="房间类型"
          width="80">
        <template slot-scope="scope">
          {{ scope.row.room.roomType.roomTypeName }}
        </template>
      </el-table-column>
      <el-table-column
          label="床位数"
          width="60">
        <template slot-scope="scope">
          {{ scope.row.room.roomType.bedNum }}
        </template>
      </el-table-column>
      <el-table-column
          label="房间价格"
          width="80">
        <template slot-scope="scope">
          {{ scope.row.room.roomType.roomTypePrice }}
        </template>
      </el-table-column>
      <el-table-column
          label="入住日期"
          width="140">
        <template slot-scope="scope">
          {{ scope.row.resideDate }}
        </template>
      </el-table-column>
      <el-table-column
          label="离开日期"
          width="140">
        <template slot-scope="scope">
          {{ scope.row.leaveDate }}
        </template>
      </el-table-column>
      <el-table-column
          label="押金"
          width="60">
        <template slot-scope="scope">
          {{ scope.row.deposit }}
        </template>
      </el-table-column>
      <el-table-column
          label="消费"
          width="60">
        <template slot-scope="scope">
          {{ scope.row.totalMoney }}
        </template>
      </el-table-column>
      <el-table-column
          label="人数"
          width="60">
        <template slot-scope="scope">
          {{ scope.row.guestNum }}
        </template>
      </el-table-column>
      <el-table-column
          label="状态"
          width="70">
        <template slot-scope="scope">
          <el-tag
              size="mini"
              :type="scope.row.resideStateId === 1 ? 'danger' : 'success'"
              disable-transitions>{{ scope.row.resideState.resideStateName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template slot-scope="scope">
          <el-button
              v-if="scope.row.resideStateId === 1"
              size="mini"
              type="text"
              @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              v-if="scope.row.resideStateId === 1"
              size="mini"
              style="color: #E6A23C"
              type="text"
              @click="handleJiezhang(scope.$index, scope.row)">结账
          </el-button>
<!--          结账的顾客才能删除-->
          <el-button
              v-if="scope.row.resideStateId === 2"
              size="mini"
              style="color: #F56C6C"
              type="text"
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
        :title="isadd?'添加顾客':'修改顾客'"
        :visible.sync="drawer"
        direction="rtl"
        :before-close="drawerClose"
        size="30%">
      <div style="padding: 0 10px">
        <el-form size="mini" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px"
                 class="demo-ruleForm">
          <el-form-item label="姓名" prop="guestName">
            <el-input v-model="ruleForm.guestName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证" prop="identityId">
            <el-input v-model="ruleForm.identityId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="客房类型" prop="roomTypeId">
            <el-select size="mini" v-model="ruleForm.roomTypeId" placeholder="请选择客房类型" clearable
                       @change="roomTypeChange">
              <el-option
                  v-for="item in roomTypeList"
                  :key="item.roomTypeId"
                  :label="item.roomTypeName"
                  :value="item.roomTypeId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客房" prop="roomId">
            <el-select size="mini" v-model="ruleForm.roomId" placeholder="请选择客房" clearable>
              <el-option
                  v-for="item in roomList"
                  :key="item.roomId"
                  :label="item.roomId"
                  :value="item.roomId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入住时间" prop="resideDate">
            <el-date-picker
                v-model="ruleForm.resideDate"
                type="datetime"
                placeholder="请选择入住时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="押金" prop="deposit">
            <el-input v-model.number="ruleForm.deposit" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="入住人数" prop="guestNum">
            <el-input v-model.number="ruleForm.guestNum" autocomplete="off"></el-input>
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

import xlsx from "../../util/xlsx";
//导入 导出excel文件的方法
export default {
  name: "role",
  //数据
  data() {
    //验证身份证号
    var validateIdentityId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error('请输入身份证号'));
      } else {
        callback();
      }
    };
    //验证顾客姓名
    var validateGuestName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error('请输入顾客姓名'));
      } else {
        callback();
      }
    };
    //验证手机号
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error('请输入手机号'));
      } else {
        callback();
      }
    };
    //验证客房类型
    var validateRoomTypeId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error('请输入客房类型'));
      } else {
        callback();
      }
    };
    //验证客房
    var validateRoomId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入客房编号'));
      } else {
        callback();
      }
    };
    //验证入住日期
    var validateResideDate = (rule, value, callback) => {
      if (value === "") {
        callback(new Error('请输入入住日期'));
      } else {
        callback();
      }
    };
    //验证押金
    var validateDeposit = (rule, value, callback) => {
      if (value === "") {
        callback(new Error('请输入押金'));
      } else {
        callback();
      }
    };
    //验证入住人数
    var validateGuestNum = (rule, value, callback) => {
      if (value === "") {
        callback(new Error('请输入入住人数'));
      } else {
        callback();
      }
    };
    return {
      //表格数据
      tableData: [],
      //表格数据的总数量
      count: 0,
      //客户姓名（用于搜索）
      guestName: "",
      //结账状态编号（用于搜索）
      resideStateId: "",
      //结账状态数组
      resideStateList: [],
      //客房类型列表
      roomTypeList: [],
      //客房列表
      roomList: [],

      //当前页码
      pageIndex: 1,
      //是否打开抽屉
      drawer: false,
      //抽屉是否做添加
      isadd: true,
      //表单数据
      ruleForm: {
        //身份证号
        identityId: "",
        //客户姓名
        guestName: "",
        //客户电话
        phone: "",
        //房间类型编号
        roomTypeId: "",
        //房间号
        roomId: "",
        //入住日期
        resideDate: "",
        //押金
        deposit: "",
        //入住人数
        guestNum: "",
      },
      //表单验证数据
      rules: {
        //验证身份证号
        identityId: [
          {validator: validateIdentityId, trigger: 'blur'}
        ],
        //验证姓名
        guestName: [
          {validator: validateGuestName, trigger: 'blur'}
        ],
        //验证电话
        phone: [
          {validator: validatePhone, trigger: 'blur'}
        ],
        //验证类型价格
        roomTypeId: [
          {validator: validateRoomTypeId, trigger: 'change'}
        ],
        //验证客房
        roomId: [
          {validator: validateRoomId, trigger: 'change'}
        ],
        //验证入住日期
        resideDate: [
          {validator: validateResideDate, trigger: 'blur'}
        ],
        //验证押金
        deposit: [
          {validator: validateDeposit, trigger: 'blur'}
        ],
        //验证入住人数
        guestNum: [
          {validator: validateGuestNum, trigger: 'blur'}
        ],

      }
    }
  },
  created() {
    //调用获取表格数据的方法
    this.getTableData()
    //获取结账状态列表的方法
    this.getResideStateList()
    //调用获取客房类型列表的方法
    this.getRoomTypeList()
  },
  //方法
  methods: {
    //组织导出数据
    excelClick() {
      let json = this.tableData.map(r => {
        return {
          guestName: r.guestName,
          phone: r.phone,
          identityId: r.identityId,
          roomId: r.roomId,
          roomTypeName: r.room.roomType.roomTypeName,
          bedNum: r.room.roomType.bedNum,
          price: r.room.roomType.roomTypePrice,
          resideDate: r.resideDate,
          leaveDate: r.leaveDate,
          deposit: r.deposit,
          totalMoney: r.totalMoney,
          guestNum: r.guestNum,
          resideStateName: r.resideState.resideStateName,
        }
      })
      // 组织表头对象
      let fields = {
        guestName: "客户姓名",
        phone: "客户电话",
        identityId: "身份证号",
        roomId: "入住房间",
        roomTypeName: "房间类型",
        bedNum: "床位数",
        price: "房间价格",
        resideDate: "入住日期",
        leaveDate: "离开日期",
        deposit: "押金",
        totalMoney: "消费金额",
        guestNum: "入住人数",
        resideStateName: "结账状态",
      }
      // 定义文件名称
      let filename = '顾客信息表'
      //将指定的数据导出到一个excel文件中
      xlsx(json, fields, filename)
    },
    //获取表格数据的方法
    async getTableData() {
      //获取房间类型信息
      let {data, count} = await this.$get('/GuestRecord/List', {
        //页码
        pageIndex: this.pageIndex,
        //结账状态编号
        resideStateId: (this.resideStateId || 0),
        //客户姓名
        guestName: this.guestName
      })
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
    //获取结账状态列表的方法
    async getResideStateList() {
      let res = await this.$get('/ResideState/List');
      this.resideStateList = res;
    },
    //获取客房类型列表的方法
    async getRoomTypeList() {
      let res = await this.$get('/RoomType/List');
      this.roomTypeList = res;
    },
    //客房类型下拉框，选项改变后事件
    async roomTypeChange(type) {
      //判断type，若无值，则清空表单中roomid的值
      if(!type){
        this.ruleForm.roomId="";
      }
      //获取客房类型编号
      let roomTypeId = this.ruleForm.roomTypeId;
      if (roomTypeId){
        //根据客房类型编号，获取对应的客房信息，客房的状态必须是空闲
        let{data} = await this.$get('/Room/List',{roomTypeId,roomStateId: 1,guestId:(this.ruleForm.guestId||0)})
        this.roomList=data;
      }
    },
    //删除表格数据
    async handleDelete(index, row) {
      //删除确认
      await this.$con_f('是否确定删除？')
      //获取编号
      let guestId = row.guestId
      //删除对应账号信息
      let {success, message} = await this.$post('/GuestRecord/Delete', {guestId})
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
            let {success, message} = await this.$post('/GuestRecord/Add', this.ruleForm)
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
            let {success, message} = await this.$post('/GuestRecord/Update', this.ruleForm)
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
        //身份证号
        identityId: "",
        //客户姓名
        guestName: "",
        //客户电话
        phone: "",
        //房间类型编号
        roomTypeId: "",
        //房间号
        roomId: "",
        //入住日期
        resideDate: "",
        //押金
        deposit: "",
        //入住人数
        guestNum: "",
      }
    },
    //编辑表格数据
    async handleEdit(index, row) {
      //获取编号
      let guestId = row.guestId;
      //根据编号，获取对象
      let res = await this.$get('/GuestRecord/GetOne', {guestId})
      //将获取到的对象，传给表单数据
      this.ruleForm = res
      //给表单对象添加房间类型编号
      this.ruleForm.roomTypeId = res.room.roomTypeId;
      //调用获取客房类型对应客房信息的方法
      this.roomTypeChange(1);
      //表示修改
      this.isadd = false;
      //打开抽屉
      this.drawer = true;
    },
    //结账
    async handleJiezhang(index,row){
      await this.$con_f("是否确定结账?");
      //获取编号
      let guestId = row.guestId;
      let {totalMoney} = await this.$post("/GuestRecord/Checkout",{guestId})
      this.$msg_s('结账成功！需要支付'+totalMoney+'元,客房费用！')
      //获取最新的消息
      this.getTableData();
    }
  }
}
</script>

<style scoped lang="scss">
label:nth-of-type(2) {
  margin-left: 10px;
}
</style>