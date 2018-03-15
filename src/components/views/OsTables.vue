<!--
在超小屏幕  手机 (<768px) 隐藏  创建者 创建时间 更新者
-->

<template>
  <section class="content">
    <div class="row center-block">
      <h2>操作系统</h2>
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">操作系统列表</h3>
            <div class="pull-right">
              <button class="btn btn-primary btn-sm fa fa-plus" data-toggle="modal" data-target="#tableModal" @click="resetRuleForm">
                新增
              </button>
            </div>
          </div>
          <!-- /.box-header -->
          <div class="box-body table-responsive" style="height: 100%;">
            <table id="example2" class="table table-bordered table-hover text-center"
                   style="word-break:break-all; word-wrap:break-word;">
              <thead>
              <tr>
                <th>操作系统编号</th>
                <th>操作系统名称</th>
                <!--<th>操作系统ID</th>-->
                <th class="hidden-xs">创建者</th>
                <th class="hidden-xs">创建时间</th>
                <th class="hidden-xs">更新者</th>
                <th>更新时间</th>
                <th>启用状态</th>
                <th>备注</th>
                <!--<th>删除</th>-->
                <th>操作</th>
              </tr>
              </thead>
              <tbody style="height:100%;">
              <tr v-for="(item,index) in tableData">
                <td>{{item.code}}</td>
                <td>{{item.name}}</td>
                <!--<td>{{item.businessId}}</td>-->
                <td class="hidden-xs">{{item.createBy}}</td>
                <td class="hidden-xs">{{formatDate(item.createDate)}}</td>
                <td class="hidden-xs">{{item.updateBy}}</td>
                <td>{{formatDate(item.updateDate)}}</td>
                <td><!--{{item.flag==1 ? ''}}-->
                  <i class="fa fa-circle" v-bind:class="[{'text-success':item.flag==1},{'text-danger':item.flag==0}]"/>

                </td>
                <td>{{item.remarks}}</td>
                <!--<td>{{item.delFlag}}</td>-->
                <!--<td>{{item.isTop==='1'?'一级':'二级'}}</td>-->
                <!--<td>{{item.remarks}}</td>-->
                <td>
                  <a class="btn btn-primary btn-sm fa fa-edit" title="编辑" @click="edit(item)" data-toggle="modal"
                     data-target="#tableModal2"></a>
                  <a class="btn btn-danger btn-sm fa fa-bitbucket" title="删除" @click="del(item.businessId)"></a>
                </td>
              </tr>
              </tbody>
            </table>

            <nav aria-label="Page navigation" class="pull-right nav-pageing">
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
            <!-- /.box-body -->
          </div>
        </div>
      </div>
      <!-- 新增modal -->
      <div class="modal fade" id="tableModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="resetForm">
                <span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">新增弹出框</h4>
            </div>
            <div class="modal-body">
              <!-- Horizontal Form -->
              <div class="box box-info">
                <!-- form start -->
                <el-form :model="tableForm" :rules="rules" ref="tableForm" label-width="100px" class="add-modalForm">
                  <el-form-item label="操作系统编号" prop="code">
                    <el-input v-model="tableForm.code"></el-input>
                  </el-form-item>
                  <el-form-item label="操作系统名称" prop="name">
                    <el-input v-model="tableForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="备注" prop="remarks">
                    <el-input type="textarea" v-model="tableForm.remarks"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal" @click="resetForm">取 消</button>
              <button type="button" class="btn btn-primary" @click="add">保 存</button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>

      <!-- 修改modal -->
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
                <el-form :model="tableForm" :rules="rules" ref="tableForm2" label-width="100px" class="edit-modalForm">
                  <el-form-item label="操作系统编号" prop="code">
                    <el-input v-model="tableForm.code"></el-input>
                  </el-form-item>
                  <el-form-item label="操作系统名称" prop="name">
                    <el-input v-model="tableForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="操作系统ID" prop="businessId">
                    <el-input v-model="tableForm.businessId" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="备注" prop="remarks">
                    <el-input type="textarea" v-model="tableForm.remarks"></el-input>
                  </el-form-item>
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
    </div>
  </section>
</template>

<script>
  import 'datatables.net'
  import 'datatables.net-bs'
  import axios from 'axios'


  export default {
    name: "OsTables",
    data() {
      return {
        tableData: [],//数据
        tableForm: {    //弹出框表单
          businessId: '',
          name: '',
          code: '',
          createBy: '',
          createDate: '',
          remarks: '',
          updateBy: '',
          updateDate: '',
          flag: ''
        },
        tableForm2:{},
        levelParent: [], //父级
        pages: '', //分页
        pageNu: 1,
        pageSize: 10,
        message: '',
        rules: {
          code: [{
            required: true,
            message: '请输入系统编号',
            trigger: 'change'
          }
          ],
          name: [{
            required: true,
            message: '请输入系统名称',
            trigger: 'change'
          }
          ]
        }
      }
    },
    mounted() {
      // this.$nextTick(() => {
      //   $('#example1').DataTable({
      //     data:this.serverdatas,
      //
      //     serverSide:true,
      //     ajax:{
      //       type:'GET',
      //       url:this.globalUrl+'/bos/queryBOsByPagination'
      //     }
      //   })
      // })
      this.getData()
    },
    methods: {
      getData() {
        const loading = this.$loading({
          lock: true,
          text: '正在读取数据...',
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255, 0.5)',
        });
        this.pilot.ajaxGetUtil('/bos/queryBOsByPagination', {
          //params
          rows: this.pageSize,
          page: this.pageNu,
          // sort:'seq'
        }, res => {
          // console.log(res)
          this.tableData = res.rows
          this.pages = Math.ceil(res.total / this.pageSize)
          loading.close()
        }, err => {
          console.log(res)
          loading.close();
          this.$notify.error({
            title: '错误',
            message: '网络错误',
            duration: 2000
          });
        })
      },
      // //新增
      add() {
        this.$refs['tableForm'].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '正在保存...',
              spinner: 'el-icon-loading',
              background: 'rgba(255,255,255, 0.5)',
            });
            this.pilot.ajaxPostUtil('bos/add', {
              code: this.tableForm.code,
              name: this.tableForm.name,
              remarks: this.tableForm.remarks,
            }, res => {
              if (res.code === 200) {
                loading.close();
                this.$notify.success({
                  title: '提示',
                  message: res.message,
                  duration: 2000
                });
                //清空表单
                this.resetForm();
                $('#tableModal').modal('hide');
                this.getData();
              } else {
                loading.close();
                this.$notify.warning({
                  title: '警告',
                  message: '保存失败',
                  duration: 2000
                });
              }
            }, err => {
              loading.close();
              this.$notify.error({
                title: '错误',
                message: '网络错误',
                duration: 2000
              });
            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      //删除
      del(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const loading = this.$loading({
            lock: true,
            text: '正在删除...',
            spinner: 'el-icon-loading',
            background: 'rgba(255,255,255, 0.5)',
          });
          this.pilot.ajaxDeleteUtil('bos/delete' + '/' + id, {
            // params
          }, res => {
            if (res.code === 200) {
              loading.close();
              this.$notify.success({
                title: '提示',
                message: res.message,
                duration: 2000
              });
              this.getData();
            } else {
              this.$notify.warning({
                title: '警告',
                message: '删除失败',
                duration: 2000
              });
            }
          }, err => {
            this.$notify.error({
              title: '错误',
              message: '网络错误',
              duration: 2000
            });
          })
        }).catch(() => {

        });
      },
      //修改
      edit(item) {
        this.tableForm.code = item.code;
        this.tableForm.name = item.name;
        this.tableForm.businessId = item.businessId;
        // this.tableForm.isTop = item.isTop;
        // this.tableForm.seq = item.seq;
        // this.tableForm.parent = item.parentId;
        this.tableForm.remarks = item.remarks;
        this.tableForm.createBy = item.createBy;
        this.tableForm.createDate = item.createDate;
        this.tableForm.updateBy = item.updateBy;
        this.tableForm.updateDate = item.updateDate;
        this.tableForm.flag = item.flag;

        // console.log(item);
      },
      modify() {
        this.$refs['tableForm2'].validate((valid) => {
            if (valid) {
        const loading = this.$loading({
          lock: true,
          text: '正在保存...',
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255, 0.5)',
        });
        this.pilot.ajaxPutUtil('bos/update/' + this.tableForm.businessId, {
          businessId: this.tableForm.businessId,
          code: this.tableForm.code,
          name: this.tableForm.name,
          businessId: this.tableForm.businessId,
          // parentId:this.tableForm.parent,
          remarks: this.tableForm.remarks,
          // seq:this.tableForm.seq
        }, res => {
          loading.close();
          if (res.code === 200) {
            this.$notify.success({
              title: '提示',
              message: '保存成功',
              duration: 2000
            });
            this.getData();
            // $('#tableModal2').modal('hide');
            this.resetForm();
          } else {
            this.$notify.warning({
              title: '警告',
              message: '保存失败',
              duration: 2000
            });
          }
          this.getData();
          $('#tableModal2').modal('hide');
          this.resetForm();
        }, err => {
          loading.close();
          this.$notify.error({
            title: '错误',
            message: '网络错误',
            duration: 2000
          });
        });
            } else {
              // console.log('error submit!!');
              return false;
            }
        });
      },
      //表单重置
      resetForm() {
        this.tableForm.businessId = '';
        this.tableForm.code = '';
        this.tableForm.name = '';
        this.tableForm.isTop = '1';
        this.tableForm.createBy = '';
        this.tableForm.createDate = '';
        this.tableForm.updateBy = '';
        this.tableForm.updateDate = '';
        this.tableForm.flag = '';

      },
      resetRuleForm(){
        this.$refs['tableForm'].resetFields();
      },
      //切换
      toggleTabs(index) {
        this.pageNu = index + 1;
        this.getData();
      },
      //下一页
      nextTab() {
        if (this.pageNu !== this.pages) {
          this.pageNu += 1;
          this.getData();
        }
      },
      //上一页
      lastTab() {
        if (this.pageNu !== 1) {
          this.pageNu -= 1;
          this.getData();
        }
      },
      //date数据转换
      formatDate: function (date) {
        // return this.pilot.formatDateString(date);
        return this.pilot.transTime(date, 2)
      }

    }

  }
</script>

<style scoped>
  /* Using the bootstrap style, but overriding the font to not draw in
     the Glyphicons Halflings font as an additional requirement for sorting icons.

     An alternative to the solution active below is to use the jquery style
     which uses images, but the color on the images does not match adminlte.

  @import url('/static/js/plugins/datatables/jquery.dataTables.min.css');
  */
  @import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

  table.dataTable thead .sorting:after,
  table.dataTable thead .sorting_asc:after,
  table.dataTable thead .sorting_desc:after {
    font-family: 'FontAwesome';
  }

  table.dataTable thead .sorting:after {
    content: "\f0dc";
  }

  table.dataTable thead .sorting_asc:after {
    content: "\f0dd";
  }

  table.dataTable thead .sorting_desc:after {
    content: "\f0de";
  }

  form {
    padding: 0px;
  }

  nav {
    cursor: pointer;
  }
  .add-modalForm, .edit-modalForm{
    padding-left: 1em;
    padding-right: 5em;
  }
</style>
