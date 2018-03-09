<template>
  <section class="content">
    <!--header-->
    <div class="row center-block header">
   <div class="col-md-12">
    <form class="navbar-form navbar-left">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Search" v-model="search.name">
      </div>
      <button class="btn btn-default" @click="getData">查询</button>
    </form>
    <div class="pull-right">
      <button class="btn btn-primary btn-sm fa fa-plus" data-toggle="modal" data-target="#tableModal" @click="getAllData()"> 新增</button>
    </div>
   </div>
    </div>
    <!--表格-->
    <div class="row center-block">
      <div class="col-md-12">
        <el-table
          :data="tableData"
          style="width: 100%">
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
                <el-table-column
                  label="参加工作时间"
                  prop="uworkdate">
                </el-table-column>

              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="商品 ID"
            prop="code">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name">
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
          <el-table-column
            label="参加工作时间"
            prop="uworkdate">
          </el-table-column>

          <el-table-column
            label="操作"
           >
            <template slot-scope="scope">
            <a class="btn btn-primary btn-sm fa fa-edit" title="编辑" @click="edit(scope.row)" data-toggle="modal" data-target="#tableModal2"></a>
            <a class="btn btn-danger btn-sm fa fa-bitbucket" title="删除" @click="del(scope.row.businessId)" ></a>

            </template >
          </el-table-column>

        </el-table>


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
              <form class="form-horizontal">
                <div class="box-body">
                  <div class="form-group">
                    <label for="name" class="col-sm-3 control-label">姓名</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" id="name" placeholder="请输入姓名" v-model="tableForm.name">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">用户身份</label>
                    <div class="col-sm-9 radio">
                      <label>
                        <input type="radio" name="teacher" v-model="tableForm.roleId" value="b">教师
                      </label>
                      <label style="margin-left:1rem">
                        <input type="radio" name="student" v-model="tableForm.roleId" value="c">学生
                      </label>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">性别</label>
                    <div class="col-sm-9 radio">
                      <label>
                        <input type="radio" name="man" v-model="tableForm.sex" value="0">男
                      </label>
                      <label style="margin-left:1rem">
                        <input type="radio" name="woman" v-model="tableForm.sex" value="1">女
                      </label>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="idNumber" class="col-sm-3 control-label">身份证号</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" id="idNumber" placeholder="请输入身份证号" v-model="tableForm.idNumber">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">用户类型</label>
                    <div class="col-sm-9 radio">
                      <label>
                        <input type="radio" name="Internship" v-model="tableForm.utype" value="0">实习
                      </label>
                      <label style="margin-left:1rem">
                        <input type="radio" name="Probationary" v-model="tableForm.utype" value="1">试用
                      </label>
                      <label style="margin-left:1rem">
                        <input type="radio" name="staff" v-model="tableForm.utype" value="3">员工
                      </label>
                      <label style="margin-left:1rem">
                        <input type="radio" name="Separation" v-model="tableForm.utype" value="4">离职
                      </label>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="uworkdate" class="col-sm-3 control-label">工作时间</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" id="uworkdate" placeholder="请输入工作时间" v-model="tableForm.uworkdate">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="ucollege" class="col-sm-3 control-label">工作单位</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" id="ucollege" placeholder="请输入工作单位" v-model="tableForm.ucollege">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="email" class="col-sm-3 control-label">邮箱</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" id="email" placeholder="请输入邮箱" v-model="tableForm.email">
                    </div>
                  </div>
                  <div class="form-group">
                  <label for="phone" class="col-sm-3 control-label">联系电话</label>
                  <div class="col-md-9">
                    <input type="text" class="form-control" id="phone" placeholder="联系电话" v-model="tableForm.phone">
                  </div>
                </div>
                </div>
                <!-- /.box-body -->
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal" @click="resetForm()">取 消</button>
            <button type="button" class="btn btn-primary" @click="add()">保 存</button>
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
              <form class="form-horizontal">
                <div class="box-body">
                  <div class="form-group">
                    <label for="name" class="col-sm-3 control-label">姓名</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" id="name" placeholder="请输入姓名" v-model="tableForm.name">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">用户身份</label>
                    <div class="col-sm-9 radio">
                      <label>
                        <input type="radio" name="teacher" v-model="tableForm.roleId" value="b">教师
                      </label>
                      <label style="margin-left:1rem">
                        <input type="radio" name="student" v-model="tableForm.roleId" value="c">学生
                      </label>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">性别</label>
                    <div class="col-sm-9 radio">
                      <label>
                        <input type="radio" name="man" v-model="tableForm.sex" value="0">男
                      </label>
                      <label style="margin-left:1rem">
                        <input type="radio" name="woman" v-model="tableForm.sex" value="1">女
                      </label>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="idNumber" class="col-sm-3 control-label">身份证号</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" id="idNumber" placeholder="请输入身份证号" v-model="tableForm.idNumber">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">用户类型</label>
                    <div class="col-sm-9 radio">
                      <label>
                        <input type="radio" name="Internship" v-model="tableForm.utype" value="0">实习
                      </label>
                      <label style="margin-left:1rem">
                        <input type="radio" name="Probationary" v-model="tableForm.utype" value="1">试用
                      </label>
                      <label style="margin-left:1rem">
                        <input type="radio" name="staff" v-model="tableForm.utype" value="3">员工
                      </label>
                      <label style="margin-left:1rem">
                        <input type="radio" name="Separation" v-model="tableForm.utype" value="4">离职
                      </label>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="uworkdate" class="col-sm-3 control-label">工作时间</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" id="uworkdate" placeholder="请输入工作时间" v-model="tableForm.uworkdate">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="ucollege" class="col-sm-3 control-label">工作单位</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" id="ucollege" placeholder="请输入工作单位" v-model="tableForm.ucollege">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="email" class="col-sm-3 control-label">邮箱</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" id="email" placeholder="请输入邮箱" v-model="tableForm.email">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="phone" class="col-sm-3 control-label">联系电话</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" id="phone" placeholder="联系电话" v-model="tableForm.phone">
                    </div>
                  </div>
                </div>
                <!-- /.box-body -->
              </form>
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
  .form-horizontal{
    padding-left: 1em;
    padding-right: 5em;
  }
    .navbar-form{
      padding:10px 0px;
    }
    .pull-right{
      margin-top: 22px;
    }
</style>

<script>
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
//  import HeaderComponent from './components/header.vue'
//  import OtherComponent from './components/other.vue'
  export default{
    components: {ElButton},
    name: 'users',
    data() {
      return {
        tableData: [],
        tableForm: {
          businessId:'',
          name: '',
          roleId: 'b',
          idNumber: '',
          sex: '0',
          email: '',
          phone: '',
          utype: '0',
          uworkdate: ''
        },
        search:{
          name:''
        },
        pages: '', // 分页
        pageNu: 1 , // 第一页
        pageSize: 10 // 一页十行
      }

    },
    methods: {
      getData() {
        let that = this;
        this.pilot.ajaxGetUtil('/bUser/queryBUserByPagination', {
          rows: this.pageSize,
          page: this.pageNu,
          name: this.search.name
          },res => {
            console.log(res)
            that.tableData = res.rows
            that.pages = res.pages
             },err => {
            console.log(err);
          }
        )
      },
      // 删除
      del(id){
        console.log(id) ;
        let that = this ;
        this.pilot.ajaxDeleteUtil('/bUser/del/' + id ,{

        },res=>{
          console.log(res)
          if (res.code == 200) {
            that.$notify({
              title: ' 提示信息 ',
              message: res.message,
            });
            this.getData();
          }else{
            that.$notify.warning({
              title: '警告',
              message:'删除失败'+err,
              duration:2000
            });
          }
        },
        err=>{
          this.$notify.error({
            title:'错误',
            message:'网络错误'+err,
          });
        })
      },
      // 新增
      getAllData(){
        this.pilot.ajaxGetUtil('/bUser/queryBUserByPagination',{
            //params
            rows:999,
            page:this.pageNu
          },res=>{
            this.levelParent = [];
            for (let i=0;i<res.rows.length;i++){
              if (res.rows[i].sex ==="0"){
                this.levelParent.push(res.rows[i]);
              }
            }

          },err=>{
            this.$notify.error({
              title: '错误',
              message: '网络错误',
              duration: 2000
            });
          }
        )
      },

      add(){
        this.pilot.ajaxPostUtil('/bUser/add', {
           name: this.tableForm.name,
          roleId: this.tableForm.roleId,
             sex: this.tableForm.sex,
          idNumber: this.tableForm.idNumber,
          phone: this.tableForm.phone,
          email: this.tableForm.email,
          utype: this.tableForm.utype,
          ucollege: this.tableForm.ucollege,
          uworkdate: this.tableForm.uworkdate
          },res => {
            console.log(res)
           if (res.code == 200){
             this.$notify.success({
               title : '提示',
               message : res.message,
               duration:2000
             });
             // 清空表单
             this.resetForm();
             $('#tableModal').modal('hide');
             this.getData();
           }else{

             this.$notify.warning({
               title:'警告',
               message:'保存失败',
               duration:2000
             });
           }
          },err => {
            console.log(err);
          }
        )
      },
      // 修改
      edit(item){
        this.tableForm.name = item.name
        this.tableForm.businessId = item.businessId
        this.tableForm.phone = item.phone
        this.tableForm.email = item.email
        this.tableForm.utype = item.utype
        this.tableForm.ucollege = item.ucollege
        this.tableForm.roleId = item.roleId
        this.tableForm.idNumber = item.idNumber
      },
      modify(){
        this.pilot.ajaxPutUtil('/bUser/alter/' + this.tableForm.businessId, {
          businessId:this.tableForm.businessId,
           name: this.tableForm.name,
          phone: this.tableForm.phone,
          email: this.tableForm.email,
          utype: this.tableForm.utype,
          ucollege: this.tableForm.ucollege,
          roleId: this.tableForm.roleId,
          idNumber: this.tableForm.idNumber

          },res => {
            console.log(res)
            if (res.code == 200){
              this.$notify.success({
                title : '提示',
                message : res.message,
                duration:2000
              });
              // 清空表单
              this.resetForm();
              $('#tableModal2').modal('hide');
              this.getData();
            }else{
              this.$notify.warning({
                title:'警告',
                message:'保存失败',
                duration:2000
              });
            }
          },err => {
            console.log(err);
          }
        )
      },
      // 表单重置
      resetForm() {
        this.tableForm.name = '',
        this.tableForm.roleId = 'b',
        this.tableForm.sex = '0',
        this.tableForm.phone = '',
        this.tableForm.email = '',
        this.tableForm.utype = '0',
        this.tableForm.uworkdate = ''
      },
      // 切换
      toggleTabs(index) {
        this.pageNu = index + 1;
        this.getData();
      },
      // 下一页
      nextTab() {
        if (this.pageNu !== this.pages){
          this.pageNu += 1 ;
          this.getData() ;
        }
      },
      // 上一页
      lastTab() {
        if (this.pageNu !== 1) {
          this.pageNu -= 1 ;
          this.getData() ;
        }
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
