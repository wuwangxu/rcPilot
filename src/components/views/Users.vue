<template>
  <section class="content">
    <!--header-->


    <div class=" center-block header">
   <div class="col-md-12">
     <div class="col-md-8 col-sm-8">
     <div class="row">
    <form class="navbar-form navbar-left">

      <div class="form-group">
        <div class="col-md-5 col-sm-5">
          <el-select v-model="search.utype" placeholder="请选择用户类型" >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </div>
        <div class="col-md-7 col-sm-7">
         <input type="text" class="form-control" placeholder="请输入姓名" v-model="search.name" style="border-radius: 5px">
        <!--<input type="text" class="form-control" placeholder="请输入用户类型" v-model="search.utype">-->
      <input type="button" class="btn btn-default" @click="SearchData" value="查询"></div>
      </div>
    </form>
     </div>
     </div>
     <div class="col-md-4 col-sm-4">
    <div class="add">
      <button class="btn btn-primary btn-sm fa fa-plus" data-toggle="modal" data-target="#tableModal" @click="getAllData()" style="float: right"> 新增</button>
      <button class="btn btn-primary btn-sm fa fa-plus"  @click="resign(tableForm.businessId)" style="float: right;margin-right: 10px"> 离职</button>
    </div>
     </div>
   </div>
    </div>

    <!--表格-->
    <div class="box-body">
    <div class="row ">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <el-table
          :data="tableData"
          @selection-change="resignlist"
        >

          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="姓名">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="联系电话">
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
                <el-form-item label="身份证号">
                  <span>{{ props.row.idNumber }}</span>
                </el-form-item>
                <el-form-item label="邮箱">
                  <span>{{ props.row.email }}</span>
                </el-form-item>
                <el-form-item label="工作单位">
                  <span>{{ props.row.ucollege}}</span>
                </el-form-item>
                <el-form-item label="用户身份">
                  <span>{{ props.row.roleId=='b'?'教师':'学生'}}</span>
                </el-form-item>
                <el-form-item label="用户类型">
                  <span>{{ props.row.utype==0?'实习':(props.row.utype==1?'试用':(props.row.utype==2?'员工':'离职'))}}</span>
                </el-form-item>
                <el-form-item
                  label="参加工作时间">
                  <span>{{ props.row.uworkdate }}</span>

                </el-form-item>
                <el-form-item
                  label="离职时间">
                  <span>{{ props.row.uunworkdate }}</span>

                </el-form-item>

              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            type="selection"
            >
          </el-table-column>
          <el-table-column
            type="index"
            :index="indexMethod">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name"
          >
          </el-table-column>
          <el-table-column
            label="性别"
            prop="sex">
            <template slot-scope="props">
              <span>{{props.row.sex=='0'?'男':'女'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="用户身份"
            prop="roleId">
            <template slot-scope="props">
              <span>{{props.row.roleId=='b'?'教师':'学生'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="用户类型"
            prop="utype">
            <template slot-scope="props">
              <span>{{props.row.utype==0?'实习':(props.row.utype==1?'试用':(props.row.utype==2?'员工':'离职'))}}</span>
            </template>
          </el-table-column>
          <!--<el-table-column-->
            <!--label="参加工作时间"-->
            <!--prop="uworkdate">-->
          <!--</el-table-column>-->

          <el-table-column
            label="操作"
           >
            <template slot-scope="scope">
            <a class="btn btn-primary btn-sm fa fa-edit" title="编辑" @click="edit(scope.row)" data-toggle="modal" data-target="#tableModal2"></a>
            <a class="btn btn-danger btn-sm fa fa-bitbucket" title="删除" @click="del(scope.row.businessId)" ></a>

            </template >
          </el-table-column>
          <!--</el-col>-->
        </el-table>
        <!--<div style="margin-top: 20px">-->
          <!--<el-button type="warning" @click="delGroup" :disabled="this.sels.lenght===0">删除全部</el-button>-->
        <!--</div>&lt;!&ndash;disabled值动态显示，默认为true,当选中复选框后值为false&ndash;&gt;-->

        <nav aria-label="..." class="pull-right nav-pageing">
          <ul class="pagination">
            <li class="page-item"
                :class="{disabled:pageNu===1}"
                :disabled="pageNu===0"
                @click="lastTab">
              <a class="page-link" tabindex="-1">上一页</a>
            </li>
            <li v-for="(item,index) in pages"
                class="page-item"
                :class="{active:pageNu===index+1}"
                @click="toggleTabs(index)">
              <a class="page-link">{{index+1}}</a>
            </li>
            <li class="page-item"
                :class="{disabled:pageNu===pages}"
                :disabled="{disabled:pageNu===pages}"
                @click="nextTab">
              <a class="page-link">下一页</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    </div>
    <!--新增-->
    <div class="modal fade" id="tableModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="resetForm()">
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">新增弹出框</h4>
          </div>
          <div class="modal-body">
            <!-- Horizontal Form -->
            <div class="box box-info">
              <!-- form start -->
              <!--<form class="form-horizontal">-->
              <el-form :model="tableForm"  :rules="rules" ref="tableForm" label-width="100px" class="demo-ruleForm">
                <div class="box-body">

                    <el-form-item label="姓名" prop="name">
                      <el-input v-model="tableForm.name"></el-input>
                    </el-form-item>
                  <el-form-item label="登录名" prop="loginName">
                    <el-input v-model="tableForm.loginName"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input v-model="tableForm.password"></el-input>
                  </el-form-item>

                      <el-form-item label="性别">
                        <el-radio-group v-model="tableForm.sex">
                          <el-radio :label="0" value="0">男</el-radio>
                          <el-radio :label="1" value="1">女</el-radio>
                        </el-radio-group>
                      </el-form-item>

                      <el-form-item label="用户身份">
                        <el-radio-group v-model="tableForm.roleId">
                          <el-radio label="b" value="b">教师</el-radio>
                          <el-radio label="c" value="c">学生</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="身份证号" prop="idNumber">
                        <el-input v-model="tableForm.idNumber"></el-input>
                      </el-form-item>
                  <el-form-item
                    prop="email"
                    label="邮箱"
                   >
                    <el-input v-model="tableForm.email"></el-input>
                  </el-form-item>

                  <el-form-item label="联系电话" prop="phone">
                    <el-input v-model.number="tableForm.phone"></el-input>
                  </el-form-item>
                      <el-form-item label="用户类型">
                        <el-radio-group v-model="tableForm.utype">
                          <el-radio :label="0" value="0">实习</el-radio>
                          <el-radio :label="1" value="1">试用</el-radio>
                          <el-radio :label="2" value="2">员工</el-radio>
                          <el-radio :label="3" value="3">离职</el-radio>
                        </el-radio-group>
                      </el-form-item>

                  <el-form-item label="工作时间">
                    <el-date-picker
                      v-model="tableForm.uworkdate"
                      type="date"
                      placeholder="选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                      <!--<el-date-picker type="date" placeholder="请选择工作时间" v-model="tableForm.uworkdate" style="width: 100%;"></el-date-picker>-->
                  </el-form-item>
                    <el-form-item label="工作单位" prop="ucollege">
                      <el-input v-model="tableForm.ucollege"></el-input>
                    </el-form-item>

                </div>
                 <!--/.box-body-->
              </el-form>

              <!--</form>-->
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal" @click="resetForm()">取 消</button>
            <input type="button" class="btn btn-primary" @click="add" value="保 存">
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!--修改-->
    <div class="modal fade" id="tableModal2">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="resetForm">
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">修改弹出框</h4>
          </div>
          <div class="modal-body">
            <!-- Horizontal Form -->
            <div class="box box-info">
              <!-- form start -->
              <el-form :model="tableForm" :rules="rules" ref="tableForm2" label-width="100px" class="demo-ruleForm">
                <div class="box-body">

                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="tableForm.name"></el-input>
                  </el-form-item>

                  <el-form-item label="性别">
                    <el-radio-group v-model="tableForm.sex">
                      <el-radio label="0" value="0">男</el-radio>
                      <el-radio label="1" value="1">女</el-radio>
                    </el-radio-group>
                  </el-form-item>

                  <el-form-item label="用户身份">
                    <el-radio-group v-model="tableForm.roleId">
                      <el-radio label="b" value="b">教师</el-radio>
                      <el-radio label="c" value="c">学生</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="身份证号" prop="idNumber">
                    <el-input v-model="tableForm.idNumber"></el-input>
                  </el-form-item>
                  <el-form-item
                    prop="email"
                    label="邮箱">

                    <el-input v-model="tableForm.email"></el-input>
                  </el-form-item>

                  <el-form-item label="联系电话" prop="phone">
                    <el-input v-model.number="tableForm.phone"></el-input>
                  </el-form-item>
                  <el-form-item label="用户类型">
                    <el-radio-group v-model="tableForm.utype">
                      <el-radio label="0" value="0">实习</el-radio>
                      <el-radio label="1" value="1">试用</el-radio>
                      <el-radio label="2" value="2">员工</el-radio>
                      <el-radio label="3" value="3">离职</el-radio>
                    </el-radio-group>
                  </el-form-item>

                  <el-form-item label="工作时间">
                    <el-date-picker
                      v-model="tableForm.uworkdate"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="工作单位" prop="ucollege">
                    <el-input v-model="tableForm.ucollege"></el-input>
                  </el-form-item>

                </div>
                <!--/.box-body-->
              </el-form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal" @click="resetForm">取 消</button>
            <button type="button" class="btn btn-primary" @click="modify">保 存</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
  </section>
</template>
<style>
    body {
        background-color: #ff0000;
    }
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  .demo-ruleForm{
    padding-left: 1em;
    padding-right: 5em;
  }
    .navbar-form{
      padding:10px 0px;
    }
    .add{
      margin-top: 22px;

    }
    .el-form--inline .el-form-item{
      margin-right: 0px !important;
    }
  .demo-table-expand label{
    width: 100px;
  }
    .el-input__inner{
      height: 34px !important;
    }


</style>

<script>
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
  import ElCol from 'element-ui/packages/col/src/col'
//  import HeaderComponent from './components/header.vue'
//  import OtherComponent from './components/other.vue'
  export default{
    components: {
      ElCol,
      ElButton
    },
    name: 'users',
    data() {
      var validateName = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入姓名'));
        }
        var pattern = new RegExp(/^[a-zA-Z0-9-_\u4e00-\u9fa5]+$/g);
        setTimeout(() => {
          if (value.length > 5) {
            callback(new Error('姓名不能超过5位'));
          }
          else if (pattern.test(value) == false) {
            callback(new Error('请不要输入特殊字符'));
          } else {
            callback();
          }
        }, 1000);
      };
      var checknumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('身份证号不能为空'));
        }
        var pattern = new RegExp(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/)
        setTimeout(() => {
          if (pattern.test(value) === false) {
            return callback(new Error('身份证格式不正确'));
          } else {
            callback();
          }
        }, 1000);
      };
      var checkphone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('联系电话不能为空'));
        }
        var pattern = new RegExp(/^1[3|4|5|7|8][0-9]{9}$/)
        setTimeout(() => {
          if (pattern.test(value) === false) {
            return callback(new Error('联系方式不正确'));
          } else {
            callback();
          }
        }, 1000);
      };
      var checkemail=(rule,value,callback)=> {
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }
        var pattern = new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
        setTimeout(() => {
          if (pattern.test(value) === false) {
            return callback(new Error('邮箱格式不正确'));
          } else {
            callback();
          }
        }, 1000);
      };
      return {
        options: [
          {
            value: '0',
            label: '实习'
          }, {
            value: '1',
            label: '试用'
          }, {
            value: '2',
            label: '员工'
          }, {
            value: '3',
            label: '离职'
          }],
        tableData: [],
        tableForm: {
          businessId: '',
          name: '',
          roleId: 'b',
          idNumber: '',
          sex: 0,
          email: '',
          phone: '',
          utype: 0,
          uworkdate: '',
          unworkdate:'',
          loginName: '',
          password: ''
        },
        search: {
          name: '',
          utype: ''
        },
        sels:[],
        multipleSelection: [],
        pages: '', // 分页
        pageNu: 1, // 第一页
        pageSize: 10,// 一页十行

        rules: {
          name: [
            {required: true, validator: validateName, trigger: 'blur'}
          ],
          idNumber: [
            {required: true, validator: checknumber, trigger: 'blur'}
          ],
          phone: [
            {required: true, validator: checkphone, trigger: 'blur'}
          ],
          email:[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
            ],
          sex:[{required: true}]
        }
      }

    },
    methods: {
      indexMethod(index){
          return index + 1;
      },
      getData() {
        this.pilot.ajaxGetUtil('/bUser/queryBUserByPagination', {
            rows: this.pageSize,
            page: this.pageNu
          }, res => {
            console.log(res)
            this.tableData = res.rows
            this.pages = res.pages
          }, err => {
            console.log(err);
          }
        )
      },
      // 搜索
      SearchData(){
        this.pilot.ajaxGetUtil('/bUser/queryStaffByCriteria', {
            rows: this.pageSize,
            page: this.pageNu,
            name: this.search.name,
            utype: this.search.utype
          }, res => {
            console.log(this.search.utype)
            this.tableData = res.rows
            this.pages = res.pages
          }, err => {
            alert('err');
          }
        )
      },
      // 删除
      del(id){
        console.log(id);
        let that = this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.pilot.ajaxDeleteUtil('/bUser/del/' + id, {}, res => {
              console.log(res)
              if (res.code == 200) {
                that.$notify({
                  title: ' 提示信息 ',
                  message: res.message,
                });
                this.getData();
              } else {
                that.$notify.warning({
                  title: '警告',
                  message: '删除失败' + err,
                  duration: 2000
                });
              }
            },
            err => {
              this.$notify.error({
                title: '错误',
                message: '网络错误' + err,
              });
            })
  //
        }).catch(() => {

        });

      },

      getAllData(){
        this.pilot.ajaxGetUtil('/bUser/queryBUserByPagination', {
            //params
            rows: 999,
            page: this.pageNu
          }, res => {
            this.levelParent = [];
            for (let i = 0; i < res.rows.length; i++) {
              if (res.rows[i].sex === "0") {
                this.levelParent.push(res.rows[i]);
              }
            }
          }, err => {
            this.$notify.error({
              title: '错误',
              message: '网络错误',
              duration: 2000
            });
          }
        )
      },
      // 新增
      add(){


        this.$refs.tableForm.validate((valid) => {
            if (!valid) return false
            this.pilot.ajaxPostUtil('/auth/register', {
                    loginName: this.tableForm.loginName,
                    password: this.tableForm.password,
                    name: this.tableForm.name,
                    roleId: this.tableForm.roleId,
                    sex: this.tableForm.sex,
                    idNumber: this.tableForm.idNumber,
                    phone: this.tableForm.phone,
                    email: this.tableForm.email,
                    utype: this.tableForm.utype,
                    ucollege: this.tableForm.ucollege,
                    uworkdate: this.tableForm.uworkdate
                  }, res => {
                    console.log(this.tableForm.uworkdate)
                    if (res.code == 200) {
                      this.$notify.success({
                        title: '提示',
                        message: res.message,
                        duration: 2000
                      });
                      // 清空表单
                      this.resetForm();
                      $('#tableModal').modal('hide');
                      this.getData();
                    } else {
                      this.$notify.warning({
                        title: '警告',
                        message: res.message,
                        duration: 2000
                      });
                    }
                  }, err => {
                    console.log(err);
                  }
                )}
          )
      },
      // 修改
      edit(item){
        console.log(item);
        this.tableForm.name = item.name
        this.tableForm.businessId = item.businessId
        this.tableForm.phone = item.phone
        this.tableForm.sex = item.sex
        this.tableForm.email = item.email
        this.tableForm.utype = item.utype
        this.tableForm.ucollege = item.ucollege
        this.tableForm.roleId = item.roleId
        this.tableForm.idNumber = item.idNumber
        this.tableForm.uworkdate = item.uworkdate
      },
    modify(){
      this.$refs.tableForm2.validate((valid) => {
        if (!valid) return false
        this.pilot.ajaxPutUtil('/bUser/alter/' + this.tableForm.businessId, {
            businessId: this.tableForm.businessId,
            name: this.tableForm.name,
            sex: this.tableForm.sex,
            phone: this.tableForm.phone,
            email: this.tableForm.email,
            utype: this.tableForm.utype,
            ucollege: this.tableForm.ucollege,
            roleId: this.tableForm.roleId,
            idNumber: this.tableForm.idNumber,
            uworkdate: this.tableForm.uworkdate

          }, res => {
            console.log(this.tableForm.roleId)
            console.log(this.tableForm.uworkdate)
            if (res.code == 200) {
              this.$notify.success({
                title: '提示',
                message: '操作成功',
                duration: 2000
              });
              // 清空表单
//            this.resetForm();
              $('#tableModal2').modal('hide');
              this.getData();
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.message,
                duration: 2000
              });
            }
          }, err => {
            console.log(err);
          }

        )}
      )
    },
    // 表单重置
    resetForm() {
      this.tableForm.name = '',
        this.tableForm.roleId = 'b',
        this.tableForm.sex = 0,
        this.tableForm.phone = '',
        this.tableForm.email = '',
        this.tableForm.utype = 0,
        this.tableForm.uworkdate = '',
      this.tableForm.unworkdate = ''
    },
    // 切换
    toggleTabs(index) {
      this.pageNu = index + 1;
      this.getData();
    },
    // 下一页
    nextTab() {
      if (this.pageNu !== this.pages) {
        this.pageNu += 1;
        this.getData();
      }
    },
    // 上一页
    lastTab() {
      if (this.pageNu !== 1) {
        this.pageNu -= 1;
        this.getData();
      }
    },
      resignlist(val){
        this.multipleSelection = val;
      },
      // 离职
      resign(){
        if(this.multipleSelection.length===0){
          this.$notify({
            title: '警告',
            message: '请先勾选用户',
            type: 'warning'
          })
        }else{
          let userList = [];
          for(let i=0;i<this.multipleSelection.length;i++){
            userList.push(this.multipleSelection[i].businessId);
          }
          userList = userList.join(',');
          this.pilot.ajaxGetUtil('/bUser/dismiss',{
              userIds:userList
          },res=>{
              if(res.code===200){
                this.$notify.success({
                  title: '提示',
                  message: '成功离职',
                })
                this.getData();
              }else{
                this.$notify.warning({
                  title: '警告',
                  message: '操作失败',
                })
              }
          },err=>{
            this.$notify.error({
              title: '错误',
              message: '网络错误'
            })
          })
        }
      },



  },

    mounted() {
      this.getData()
    }
//      components : {
//      'other-component': OtherComponent, HeaderComponent,
//      }
  }
</script>
