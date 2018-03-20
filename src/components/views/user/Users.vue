<template>
  <section class="content">
    <!--header-->
    <div class=" center-block header">
   <div class="col-md-12">
    <form class="navbar-form navbar-left">
<!--查询-->
      <div class="form-group">
        <div class="col-md-4 col-sm-4">
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange">
          </el-cascader>
        </div>
        <div class="col-md-8 col-sm-8">
         <input type="text" class="form-control" placeholder="请输入姓名" v-model="search.name" style="border-radius: 5px;max-width: 198px;margin-top: 3px;">
        <!--<input type="text" class="form-control" placeholder="请输入用户类型" v-model="search.utype">-->
          <el-button
            size="mini"
            type="primary"
            @click="SearchData"
            style="margin-left: 10%"
          >查询</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="resetSearch">重置</el-button>

      <!--<input type="button" class="btn btn-default" @click="SearchData" value="查询">-->
          <!--<input type="button" class="btn btn-default" @click="resetSearch" value="重置">-->
        </div>

      </div>
    </form>
     <!--新增-->
    <div class="add">
      <router-link to="/addNew" >
      <el-button
        size="mini"
        type="primary"
        @click="getAllData()">新增</el-button>
      </router-link>

    </div>
   </div>
    </div>
    <!--表格-->
    <div class="box-body">
    <div class="row ">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <el-table
          :data="tableData">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="工号">
                  <span>{{ props.row.empId }}</span>
                </el-form-item>
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
                  <span>{{ props.row.utype==0?'实习':(props.row.utype==1?'试用':'正式')}}</span>
                </el-form-item>
                <el-form-item label="用户类型">
                  <span>{{ props.row.ustatus==0?'在职':'离职'}}</span>
                </el-form-item>
                <el-form-item
                  label="入职时间">
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
            label="工号"
            prop="empId">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name" width="100">
          </el-table-column>
          <el-table-column
            label="用户身份"
            prop="roleId" width="100">
            <template slot-scope="props">
              <span>{{props.row.roleId=='b'?'教师':'学生'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="用户类型"
            prop="utype" width="100">
            <template slot-scope="props">
              <span>{{props.row.utype==0?'实习':(props.row.utype==1?'试用':'正式')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="目前状态"
            prop="ustatus" width="100">
            <template slot-scope="props">
              <span>{{props.row.ustatus==0?'在职':'离职'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="联系电话"
            prop="phone">
          </el-table-column>
          <el-table-column
            label="身份证号"
            width="120">
            <template slot-scope="scope" style="display: inline-block">
              <span :title="scope.row.idNumber">{{scope.row.idNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作" width="300">
            <template slot-scope="scope" style="display: inline-block">
              <router-link :to="{
               path:'/Edit',
              query:{type:'edit',info:scope.row}
              }">
                <el-button
                  size="mini"
                  @click="edit(scope.$index, scope.row)">编辑</el-button>
              </router-link>
              <el-button
                size="mini"
                type="danger"
                @click="del(scope.row.businessId)">删除</el-button>
              <el-button
                size="mini"
                type="primary"
                data-toggle="modal"
                @click="resign(scope.row.businessId)">离职</el-button>

            </template >
          </el-table-column>
          <!--</el-col>-->
        </el-table>
        <nav aria-label="..." class="pull-right nav-pageing">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-size="10"
            background
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </nav>
      </div>
    </div>
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
      float: right;
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
    .el-table .cell{
      text-overflow: ellipsis;
      -moz-text-overflow: ellipsis;
      overflow: hidden !important;
      white-space: nowrap !important;
    }

</style>

<script>
  export default{
    name: 'users',
    data() {
      return {
        options:[
          {
            value:'',
            label:'全部',
            children:[
              {
                value:'',
                label:'全部'
              },
              {
                value:'0',
                label:'在职'
              },{
                value:'1',
                label:'离职'
              }
            ]
          },
           {
             value:'0',
             label:'实习',
             children:[
               {
                 value:'',
                 label:'全部'
               },
               {
                 value:'0',
                 label:'在职'
               },{
                 value:'1',
                 label:'离职'
               }
             ]
            }, {
             value:'1',
             label:'试用',
            children:[
              {
                value:'',
                label:'全部'
              },
              {
                value:'0',
                label:'在职'
              },{
                value:'1',
                label:'离职'
              }
            ]
           }, {
             value:'2',
             label:'正式',
            children:[
              {
                value:'',
                label:'全部'
              },
              {
                value:'0',
                label:'在职'
              },{
                value:'1',
                label:'离职'
              }
            ]
           },
         ],
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
          ustatus:0,
          uworkdate: '',
          unnworkdate:'',
          loginName: '',
          empId:'',
//          password: ''
        },
        search: {
          name: '',
          utype: '',
          ustatus:''
        },
        selectedOptions:[],
        page: 1, // 分页
        rows: 10,
        total: 0,
//        pageNu: 1, // 第一页
//        pageSize: 10,// 一页十行
//        isSearch:false,
      }
    },
    methods: {
      //级联选择器
      handleChange(value) {
        console.log(value);
        console.log("-----------")
        this.search.utype = value[0];
        this.search.ustatus = value[1];

      },
      getData() {
        this.pilot.ajaxGetUtil('/bUser/queryBUserByPagination', {
            rows: this.rows,
            page: this.page
          }, res => {
            console.log(res)
            this.tableData = res.rows
            this.pages = res.pages
            this.total = res.total
          }, err => {
            console.log(err);
          }
        )
      },
      // 搜索
      SearchData(){
//        if(!isSearch){
//          this.isSearch=true;
//        }
        this.pilot.ajaxGetUtil('/bUser/queryStaffByCriteria', {
            rows: this.rows,
            page: this.page,
            name: this.search.name,
            utype: this.search.utype,
            ustatus:this.search.ustatus
          }, res => {
            console.log(this.search.utype)
            console.log("--------------")
            console.log(this.search.ustatus)
            this.tableData = res.rows
            this.total = res.total
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
            page: 1
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
//      add(){
//
//        this.$refs.tableForm.validate((valid) => {
//            if (!valid) return false
//            this.pilot.ajaxPostUtil('/auth/register', {
//                    loginName: this.tableForm.loginName,
//                    password: this.tableForm.password,
//                    name: this.tableForm.name,
//                    roleId: this.tableForm.roleId,
//                    sex: this.tableForm.sex,
//                    idNumber: this.tableForm.idNumber,
//                    phone: this.tableForm.phone,
//                    email: this.tableForm.email,
//                    utype: this.tableForm.utype,
//                    ucollege: this.tableForm.ucollege,
//                    uworkdate: this.tableForm.uworkdate
//                  }, res => {
//                    console.log(this.tableForm.uworkdate)
//                    if (res.code == 200) {
//                      this.$notify.success({
//                        title: '提示',
//                        message: '操作成功',
//                        duration: 2000
//                      });
//                      // 清空表单
//                      this.resetForm();
//                      $('#tableModal').modal('hide');
//                      this.getData();
//                    } else {
//                      this.$notify.warning({
//                        title: '警告',
//                        message: res.message,
//                        duration: 2000
//                      });
//                    }
//                  }, err => {
//                    console.log(err);
//                  }
//                )}
//          )
//      },
      // 修改
      edit(index,item){
        console.log(item);
        this.tableForm.empId=item.empId
        this.tableForm.name = item.name
        this.tableForm.businessId = item.businessId
        this.tableForm.phone = item.phone
        this.tableForm.sex = item.sex
        this.tableForm.email = item.email
        this.tableForm.utype = item.utype
        this.tableForm.ustatus = item.ustatus
        this.tableForm.ucollege = item.ucollege
        this.tableForm.roleId = item.roleId
        this.tableForm.idNumber = item.idNumber
        this.tableForm.uworkdate = item.uworkdate
      },
//    modify(){
//        let that= this
//      this.$refs.tableForm2.validate((valid) => {
//        if (!valid) return false
//
//        this.pilot.ajaxPutUtil('/bUser/alter/' + that.tableForm.businessId, {
//            businessId: this.tableForm.businessId,
//            empId:this.tableForm.empId,
//            name: this.tableForm.name,
//            sex: this.tableForm.sex,
//            phone: this.tableForm.phone,
//            email: this.tableForm.email,
//            utype: this.tableForm.utype,
//            ucollege: this.tableForm.ucollege,
//            roleId: this.tableForm.roleId,
//            idNumber: this.tableForm.idNumber,
//            uworkdate: this.tableForm.uworkdate
//
//          }, res => {
//          console.log(this.tableForm.empId)
//            console.log(this.tableForm.roleId)
//            console.log(this.tableForm.uworkdate)
//            if (res.code == 200) {
//              this.$notify.success({
//                title: '提示',
//                message: '操作成功',
//                duration: 2000
//              });
//              // 清空表单
////            this.resetForm();
//              $('#tableModal2').modal('hide');
//              this.getData();
//            } else {
//              this.$notify.warning({
//                title: '警告',
//                message: res.message,
//                duration: 2000
//              });
//            }
//          }, err => {
//            console.log(err);
//          }
//
//        )}
//      )
//    },
    // 表单重置
    resetForm() {
        this.tableForm.empId='',
        this.tableForm.name = '',
        this.tableForm.roleId = 'b',
        this.tableForm.sex = 0,
        this.tableForm.phone = '',
        this.tableForm.email = '',
        this.tableForm.utype = 0,
        this.tableForm.ustatus=0,
        this.tableForm.uworkdate = '',
        this.tableForm.unnworkdate = ''
    },
//      // 分页
//      handleSizeChange: function (size) {
//        this.pagesize = size;
//      },
//      handleCurrentChange: function(currentPage){
//        this.currentPage = currentPage;
//      },

    // 切换
    toggleTabs(index) {
      this.pageNu = index + 1;
//      if(this.isSearch){
//        this.SearchData();
//      }else {
//        this.getData();
//      }
    },
    // 下一页
    nextTab() {
      if (this.pageNu !== this.pages) {
        this.pageNu += 1;
//        if(this.isSearch){
//          this.SearchData();
//        }else {
//          this.getData();
//        }

      }
    },
    // 上一页
    lastTab() {
      if (this.pageNu !== 1) {
        this.pageNu -= 1;
//        if(this.isSearch){
//          this.SearchData();
//        }else {
//          this.getData();
//        }

      }
    },
      // 离职(多个)
      resign(bId){
          this.pilot.ajaxGetUtil('/bUser/dismiss',{
              userIds:bId
          },res=>{
              if(res.code===200){
                console.log(this.tableForm.businessId)
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

      },
      resetSearch(){
        this.search.name='',
        this.search.utype='',
//        this.isSearch=false,
        this.currentPage='1'
        this.getData();
      },
      // 离职(单个)
//      resignSingle(){
//
//      }
      //页数发生改变
      handleCurrentChange(val){
        this.page = val
        this.getData()
      }
  },

    mounted() {
      this.getData()
    }
//      components : {
//      'other-component': OtherComponent, HeaderComponent,
//      }
  }
</script>
