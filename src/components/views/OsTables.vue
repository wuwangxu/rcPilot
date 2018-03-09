<template>
  <section class="content">
    <div class="row center-block">
      <h2>操作系统</h2>
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">操作系统列表</h3>
            <div class="pull-right">
              <button class="btn btn-primary btn-sm fa fa-plus" data-toggle="modal" data-target="#tableModal" @click=""> 新增</button>
            </div>
          </div>
          <!-- /.box-header -->
          <div class="box-body" style="height: 100%;">
            <table id="example2" class="table table-bordered table-hover text-center" style="">
              <thead>
              <tr>
                <th>操作系统编号</th>
                <th>操作系统名称</th>
                <th>操作系统ID</th>
                <th>创建者</th>
                <th>创建时间</th>
                <th>更新者</th>
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
                <td>{{item.businessId}}</td>
                <td>{{item.createBy}}</td>
                <td>{{formatDate(item.createDate)}}</td>
                <td>{{item.updateBy}}</td>
                <td>{{formatDate(item.updateDate)}}</td>
                <td><!--{{item.flag==1 ? ''}}-->
                  <i class="fa fa-circle"  v-bind:class="[{'text-success':item.flag==1},{'text-danger':item.flag==0}]"/>
                </td>
                <td>{{item.remarks}}</td>
                <!--<td>{{item.delFlag}}</td>-->
                <!--<td>{{item.isTop==='1'?'一级':'二级'}}</td>-->
                <!--<td>{{item.remarks}}</td>-->
                <td>
                  <a class="btn btn-primary btn-sm fa fa-edit" title="编辑" @click="edit(item)" data-toggle="modal" data-target="#tableModal2"></a>
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
      <!-- modal -->
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
                <form class="form-horizontal">
                  <div class="box-body">
                    <!--<div class="form-group">-->
                      <!--<label for="code" class="col-sm-2 control-label">编号</label>-->
                      <!--<div class="col-sm-10">-->
                        <!--<input type="text" class="form-control" id="code" placeholder="请输入编号" v-model="tableForm.code">-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="form-group">-->
                      <!--<label for="name" class="col-sm-2 control-label">名称</label>-->
                      <!--<div class="col-sm-10">-->
                        <!--<input type="text" class="form-control" id="name" placeholder="请输入名称" v-model="tableForm.name">-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="form-group">-->
                      <!--<label class="col-sm-2 control-label">一级</label>-->
                      <!--<div class="col-sm-10 radio">-->
                        <!--<label>-->
                          <!--<input type="radio" name="optionsRadios" v-model="tableForm.isTop" value="1">是-->
                        <!--</label>-->
                        <!--<label style="margin-left:1rem">-->
                          <!--<input type="radio" name="optionsRadios" v-model="tableForm.isTop" value="0">否-->
                        <!--</label>-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="form-group" v-show="tableForm.isTop === '0'">-->
                      <!--<label class="col-sm-2 control-label">父级</label>-->
                      <!--<div class="col-sm-10">-->
                        <!--<select class="form-control" v-model="tableForm.parent">-->
                          <!--<option v-for="(item,index) in levelParent" :value="item.businessId">{{item.name}}</option>-->
                        <!--</select>-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="form-group">-->
                      <!--<label for="sort" class="col-sm-2 control-label">排序</label>-->
                      <!--<div class="col-sm-10">-->
                        <!--<input type="text" class="form-control" id="sort" placeholder="请输入排序号" v-model="tableForm.seq">-->
                      <!--</div>-->
                    <!--</div>-->
                    <div class="form-group">
                      <label for="code2" class="col-sm-2 control-label">操作系统编号</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" id="code1" placeholder="请输入编号" v-model="tableForm.code">
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="name2" class="col-sm-2 control-label">操作系统名称</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" id="name1" placeholder="请输入名称" v-model="tableForm.name">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-2 control-label">备注</label>
                      <div class="col-sm-10">
                        <textarea class="form-control" rows="3" placeholder="请输入备注" v-model="tableForm.remarks"></textarea>
                      </div>
                    </div>
                  </div>
                  <!-- /.box-body -->
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal" @click="resetForm">取 消</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="add">保 存</button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>

      <!-- modal -->
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
                      <label for="code2" class="col-sm-2 control-label">操作系统编号</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" id="code2" placeholder="请输入编号" v-model="tableForm.code">
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="name2" class="col-sm-2 control-label">操作系统名称</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" id="name2" placeholder="请输入名称" v-model="tableForm.name">
                      </div>
                    </div>
                    <div class="form-group">
                    <label for="name2" class="col-sm-2 control-label">操作系统ID</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="businessId2" placeholder="请输入名称" v-model="tableForm.businessId" readonly>
                    </div>
                  </div>
                    <!--<div class="form-group">-->
                      <!--<label class="col-sm-2 control-label">一级</label>-->
                      <!--<div class="col-sm-10 radio">-->
                        <!--<label>-->
                          <!--<input type="radio" name="optionsRadios" v-model="tableForm.isTop" value="1">是-->
                        <!--</label>-->
                        <!--<label style="margin-left:1rem">-->
                          <!--<input type="radio" name="optionsRadios" v-model="tableForm.isTop" value="0">否-->
                        <!--</label>-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="form-group" v-show="tableForm.isTop === '0'">-->
                      <!--<label class="col-sm-2 control-label">父级</label>-->
                      <!--<div class="col-sm-10">-->
                        <!--<select class="form-control" v-model="tableForm.parent">-->
                          <!--<option v-for="(item,index) in levelParent" :value="item.businessId">{{item.name}}</option>-->
                        <!--</select>-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="form-group">-->
                      <!--<label for="sort2" class="col-sm-2 control-label">排序</label>-->
                      <!--<div class="col-sm-10">-->
                        <!--<input type="text" class="form-control" id="sort2" placeholder="请输入排序号" v-model="tableForm.seq">-->
                      <!--</div>-->
                    <!--</div>-->
                    <div class="form-group">
                      <label class="col-sm-2 control-label">备注</label>
                      <div class="col-sm-10">
                        <textarea class="form-control" rows="3" placeholder="请输入备注" v-model="tableForm.remarks"></textarea>
                      </div>
                    </div>
                  </div>
                  <!-- /.box-body -->
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal" @click="resetForm">取 消</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="modify">保 存</button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
    </div>
    <!--<div>-->
      <!--获取来的数据：{{tableData}}-->
    <!--</div>-->
  </section>
</template>

<script>
  import $ from 'jquery'
  // Require needed datatables modules
  import 'datatables.net'
  import 'datatables.net-bs'
  import axios from 'axios'


  export default {
    name: "OsTables",
    data () {
      return {
        //   githubUrl: this.globalUrl+'/bos/queryBOsByPagination',
        // response: null,
        // error: null,
        tableData:[],//数据
        tableForm:{    //弹出框表单
          businessId:'',
          name:'',
          code:'',
          createBy:'',
          createDate:'',
          remarks:'',
          updateBy:'',
          updateDate:'',
          flag:''
        },
        levelParent:[], //父级
        pages:'', //分页
        pageNu:1,
        pageSize:10,
        message:''
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
    methods:{
      getData(){
        const loading = this.$loading({
          lock: true,
          text: '正在读取数据...',
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255, 0.5)',
        });
        this.pilot.ajaxGetUtil('/bos/queryBOsByPagination' ,{
          //params
          rows:this.pageSize,
          page:this.pageNu,
          // sort:'seq'
          } , res=>{
          console.log(res)
          this.tableData=res.rows
          // console.log(this.pilot.transTime(this.tableData[0].createDate,2))
          // console.log(this.tableData[0])

          this.pages=Math.ceil(res.total/this.pageSize)
          loading.close()
          },err=>{
            console.log(res)
          loading.close();
          this.$notify.error({
            title:'错误',
            message:'网络错误',
            duration:2000
          });
          })
      },
      // //新增
      add(){
        const loading = this.$loading({
          lock: true,
          text: '正在保存...',
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255, 0.5)',
        });
        this.pilot.ajaxPostUtil('bos/add',{
          // businessId:this.tableForm.businessId,
          code:this.tableForm.code,
          name:this.tableForm.name,
          // createBy:this.tableForm.createBy,
          // createDate:this.tableForm.createDate,
          // updateBy:this.tableForm.updateBy,
          // updateDate:this.tableForm.createDate,
          // flag:this.tableForm.flag,
          remarks:this.tableForm.remarks,
          // isTop:this.tableForm.isTop,
          // parentId:this.tableForm.parent,
          // seq:this.tableForm.seq,
        },res=>{
          if (res.code===200){
            loading.close();
            this.$notify.success({
              title:'提示',
              message:res.message,
              duration:2000
            });
            //清空表单
            this.resetForm();
            // $('#tableModal').modal('hide');
            this.getData();
          }else{
            loading.close();
            this.$notify.warning({
              title:'警告',
              message:'保存失败',
              duration:2000
            });
          }
        },err=>{
          loading.close();
          this.$notify.error({
            title:'错误',
            message:'网络错误',
            duration:2000
          });
        })
      },
      //删除
      del(id){
        const loading = this.$loading({
          lock: true,
          text: '正在删除...',
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255, 0.5)',
        });
        this.pilot.ajaxDeleteUtil('bos/delete'+'/'+id,{
          // params
        },res=>{
          if (res.code===200){
            loading.close();
            this.$notify.success({
              title:'提示',
              message:res.message,
              duration:2000
            });
            this.getData();
          }else{
            this.$notify.warning({
              title:'警告',
              message:'删除失败',
              duration:2000
            });
          }
        },err=>{
          this.$notify.error({
            title:'错误',
            message:'网络错误',
            duration:2000
          });
        })
      },
      //修改
      edit(item){
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

        console.log(item);
      },
      modify(){
        const loading = this.$loading({
          lock: true,
          text: '正在保存...',
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255, 0.5)',
        });
        this.pilot.ajaxPutUtil('bos/update/'+this.tableForm.businessId,{
          businessId:this.tableForm.businessId,
          code:this.tableForm.code,
          name:this.tableForm.name,
          businessId:this.tableForm.businessId,
          // parentId:this.tableForm.parent,
          remarks:this.tableForm.remarks,
          // seq:this.tableForm.seq
        },res=>{
          loading.close();
          if (res.code===200){
            this.$notify.success({
              title:'提示',
              message:'保存成功',
              duration:2000
            });
            this.getData();
            // $('#tableModal2').modal('hide');
            this.resetForm();
          }else{
            this.$notify.warning({
              title:'警告',
              message:'保存失败',
              duration:2000
            });
          }
        },err=>{
          loading.close();
          this.$notify.error({
            title:'错误',
            message:'网络错误--mod',
            duration:2000
          });
        });
      },
      //表单重置
      resetForm(){
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
      //切换
      toggleTabs(index){
        this.pageNu = index+1;
        this.getData();
      },
      //下一页
      nextTab(){
        if (this.pageNu!==this.pages){
          this.pageNu +=1;
          this.getData();
        }
      },
      //上一页
      lastTab(){
        if (this.pageNu!==1){
          this.pageNu -=1;
          this.getData();
        }
      },
      //date数据转换
      formatDate:function (date) {
        // return this.pilot.formatDateString(date);
        return  this.pilot.transTime(date,2)
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
  form{
    padding: 0px;
  }
  nav {
    cursor: pointer;
  }
</style>
