<!--
在超小屏幕  手机 (<768px) 隐藏  标签
-->

<template>
  <section class="content">
    <div class="row center-block">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">服务器列表</h3>
            <div class="row">
              <div class="col-md-11">
                <el-form :inline="true" :model="search" class="demo-form-inline">
                  <!--<form class="navbar-form navbar-left form-inline">-->
                  <!--<div class="form-group">-->
                  <!--<input type="text" class="form-control" placeholder="请输入系统名" v-model="search.name">-->
                  <!--<input type="text" class="form-control" placeholder="请输入标签" v-model="search.tag">-->
                  <el-form-item>
                    <el-select v-model="search.businessId" placeholder="请选择所属系统">
                      <el-option
                        v-for="item in osoptions"
                        :key="item.businessId"
                        :label="item.name"
                        :value="item.businessId">
                      </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item>
                    <el-input
                      placeholder="请输入标签"
                      v-model="search.tag"
                      clearable>
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select v-model="search.category" placeholder="选择服务器">
                      <el-option
                        v-for="item in categoryoptions"
                        :key="item.category"
                        :label="item.label"
                        :value="item.category">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" size="medium" @click="SearchData">查询</el-button>
                    <el-button size="medium" @click="resetSearch">重置</el-button>
                  </el-form-item>
                  <!--</form>-->
                </el-form>
              </div>
              <div class="pull-right col-md-1">
                <!--<button class="btn btn-primary btn-sm fa fa-plus" data-toggle="modal" data-target="#tableModal"-->
                <!--@click="getOsData" style="margin-top: 19px"> 新增-->
                <!--</button>-->
                <el-button type="primary" size="medium" @click="getOsData" data-toggle="modal" data-target="#tableModal"
                           style="margin-top: 2px">新增
                </el-button>
              </div>
            </div>
          </div>
          <!-- /.box-header -->
          <div class="box-body table-responsive " style="height: 100%;">
            <el-table id="example2" class="table table-bordered table-hover" :data="tableData" style="">

              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand text-center">
                    <el-form-item label="服务器">
                      <span>{{ formatCategory(props.row) }}</span>
                    </el-form-item>
                    <el-form-item label="所属系统">
                      <span>{{ props.row.osname }}</span>
                    </el-form-item>
                    <el-form-item label="品牌">
                      <span>{{ props.row.brand }}</span>
                    </el-form-item>
                    <el-form-item label="CPU">
                      <span>{{ props.row.cpu }}</span>
                    </el-form-item>
                    <el-form-item label="内存">
                      <span>{{ props.row.memory }}</span>
                    </el-form-item>
                    <el-form-item label="硬盘">
                      <span>{{ props.row.disk }}</span>
                    </el-form-item>
                    <el-form-item label="带宽">
                      <span>{{ props.row.broadband }}</span>
                    </el-form-item>
                    <el-form-item label="内网IP">
                      <span>{{ props.row.intranetIp }}</span>
                    </el-form-item>
                    <el-form-item label="外网IP">
                      <span>{{ props.row.extranetIp }}</span>
                    </el-form-item>
                    <el-form-item label="服务器状态">
                      <span class="fa fa-circle"
                            v-bind:class="[{'text-green':props.row.status==1},{'text-danger':props.row.status==0}]">{{props.row.status==1 ? '开启':'关闭'}}</span>
                    </el-form-item>
                    <el-form-item label="到期时间">
                      <span>{{ formatDate(props.row.endTime) }}</span>
                    </el-form-item>
                    <el-form-item label="创建者">
                      <span>{{ props.row.creator }}</span>
                    </el-form-item>
                    <el-form-item label="更新者">
                      <span>{{ props.row.updater }}</span>
                    </el-form-item>
                    <el-form-item label="更新时间">
                      <span>{{ formatDate(props.row.updateDate) }}</span>
                    </el-form-item>
                    <el-form-item label="启用状态">
                      <span class="fa fa-circle"
                            v-bind:class="[{'text-green':props.row.flag==1},{'text-danger':props.row.flag==0}]">{{props.row.flag==1 ? '开启':'关闭'}}</span>
                      <!--<i class="fa fa-circle"  v-bind:class="[{'text-success':item.flag==1},{'text-danger':item.flag==0}]"/>-->
                    </el-form-item>
                    <el-form-item label="标签">
                      <span>{{ props.row.tag }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                type="index">
              </el-table-column>
              <el-table-column
                label="服务器"
                prop="category"
                :formatter="formatCategory">
              </el-table-column>
              <el-table-column
                label="所属系统"
                prop="osname">
              </el-table-column>
              <el-table-column
                label="状态">
                <template slot-scope="scope">
                  <i class="fa fa-circle text-green" v-if="scope.row.status==1"/><i class="fa fa-circle text-danger"
                                                                                    v-if="scope.row.status==0"/>
                </template>
              </el-table-column>
              <el-table-column
                :class-name="'hidden-xs'"
                label="标签"
                prop="tag">
                <template slot-scope="scope">
                  <el-tag>{{scope.row.tag}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                label="备注"
                prop="remarks">
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <!--<a class="btn btn-primary btn-sm fa fa-edit" title="编辑" @click="edit(scope.row)" data-toggle="modal"-->
                  <!--data-target="#tableModal2"></a>-->
                  <!--<a class="btn btn-danger btn-sm fa fa-bitbucket" title="删除" @click="del(scope.row.businessId)"></a>-->
                  <el-button size="mini" @click="edit(scope.row)" data-toggle="modal" data-target="#tableModal2">编辑
                  </el-button>
                  <el-button size="mini" type="danger" @click="del(scope.row.businessId)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <div aria-label="..." class="pull-right nav-pageing">
              <!--<ul class="pagination">-->
              <!--<li class="page-item"-->
              <!--:class="{disabled:pageNu===1}"-->
              <!--:disabled="pageNu===0"-->
              <!--@click="lastTab">-->
              <!--<a class="page-link" tabindex="-1">上一页</a>-->
              <!--</li>-->
              <!--<li v-for="(item,index) in pages"-->
              <!--class="page-item"-->
              <!--:class="{active:pageNu===index+1}"-->
              <!--@click="toggleTabs(index)">-->
              <!--<a class="page-link">{{index+1}}</a>-->
              <!--</li>-->
              <!--<li class="page-item"-->
              <!--:class="{disabled:pageNu===pages}"-->
              <!--:disabled="{disabled:pageNu===pages}"-->
              <!--@click="nextTab">-->
              <!--<a class="page-link">下一页</a>-->
              <!--</li>-->
              <!--</ul>-->
              <el-pagination
                background
                layout="prev, pager, next"
                :pageSize="pageSize"
                @current-change="handleCurrentChange"
                :total="total">
              </el-pagination>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
      <!-- 新增弹出框modal -->
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
                <el-form :model="tableForm" :rules="rules" ref="tableForm" label-width="100px" class="add-modalForm">
                  <div class="box-body">
                    <el-form-item label="所属系统" prop="businessId">
                      <el-select v-model="tableForm.businessId" placeholder="请选择所属系统">
                        <el-option
                          v-for="item in osoptions"
                          v-if="item.businessId!=' '"
                          :key="item.businessId"
                          :label="item.name"
                          :value="item.businessId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="品牌" prop="brand">
                      <el-input v-model="tableForm.brand"></el-input>
                    </el-form-item>
                    <el-form-item label="服务器" prop="category">
                      <el-select v-model="tableForm.category" placeholder="请选择服务器 ">
                        <el-option v-for="item in categoryoptions" v-if="item.category!=' '"
                                    :key="item.category" :label="item.label"
                                   :value="item.category">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="CPU" prop="cpu">
                      <el-input v-model="tableForm.cpu"></el-input>
                    </el-form-item>
                    <el-form-item label="标签" prop="tag">
                      <el-input v-model="tableForm.tag"></el-input>
                    </el-form-item>
                    <el-form-item label="带宽" prop="broadband">
                      <el-input v-model="tableForm.broadband"></el-input>
                    </el-form-item>
                    <el-form-item label="硬盘" prop="disk">
                      <el-input v-model="tableForm.disk"></el-input>
                    </el-form-item>
                    <el-form-item label="外网IP" prop="extranetIp">
                      <el-input v-model="tableForm.extranetIp"></el-input>
                    </el-form-item>
                    <el-form-item label="内网IP" prop="intranetIp">
                      <el-input v-model="tableForm.intranetIp"></el-input>
                    </el-form-item>
                    <el-form-item label="内存" prop="memory">
                      <el-input v-model="tableForm.memory"></el-input>
                    </el-form-item>
                    <el-form-item label="到期时间" prop="endTime">
                      <el-date-picker v-model="tableForm.endTime" type="datetime" placeholder="选择日期时间"
                                      value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                      <el-radio-group v-model="tableForm.status" size="medium">
                        <el-radio-button label="1">开启</el-radio-button>
                        <el-radio-button label="0">关闭</el-radio-button>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注" prop="remarks">
                      <el-input type="textarea" v-model="tableForm.remarks"></el-input>
                    </el-form-item>
                    <!--<el-form-item>
                                <el-button type="primary" @click="submitForm">添加</el-button>
                                <el-button @click="resetForm('tableForm')">重置</el-button>
                            </el-form-item>-->
                  </div>
                </el-form>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal" @click="resetForm">取 消</button>
              <input type="button" class="btn btn-primary" @click="add" value="保 存">
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>

      <!-- 修改弹出框modal -->
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
                  <el-form-item label="所属系统" prop="name">
                    <el-select v-model="tableForm.name" placeholder="请选择所属系统">
                      <el-option
                        v-for="item in osoptions"
                        v-if="item.businessId!=' '"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="品牌" prop="brand">
                    <el-input v-model="tableForm.brand"></el-input>
                  </el-form-item>
                  <el-form-item label="服务器" prop="category">
                    <el-select v-model="tableForm.category" placeholder="请选择服务器 ">
                      <el-option v-for="item in categoryoptions" v-if="item.category!=' '"
                                 :key="item.category" :label="item.label"
                                 :value="item.category">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="CPU" prop="cpu">
                    <el-input v-model="tableForm.cpu"></el-input>
                  </el-form-item>
                  <el-form-item label="标签" prop="tag">
                    <el-input v-model="tableForm.tag"></el-input>
                  </el-form-item>
                  <el-form-item label="带宽" prop="broadband">
                    <el-input v-model="tableForm.broadband"></el-input>
                  </el-form-item>
                  <el-form-item label="硬盘" prop="disk">
                    <el-input v-model="tableForm.disk"></el-input>
                  </el-form-item>
                  <el-form-item label="外网IP" prop="extranetIp">
                    <el-input v-model="tableForm.extranetIp"></el-input>
                  </el-form-item>
                  <el-form-item label="内网IP" prop="intranetIp">
                    <el-input v-model="tableForm.intranetIp"></el-input>
                  </el-form-item>
                  <el-form-item label="内存" prop="memory">
                    <el-input v-model="tableForm.memory"></el-input>
                  </el-form-item>
                  <el-form-item label="到期时间" prop="endTime" required>
                    <el-date-picker v-model="tableForm.endTime" type="datetime" placeholder="选择日期时间"
                                    value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="tableForm.status" size="medium">
                      <el-radio-button label="1">开启</el-radio-button>
                      <el-radio-button label="0">关闭</el-radio-button>
                    </el-radio-group>
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
  // import $ from 'jquery'
  // Require needed datatables modules
  import 'datatables.net'
  import 'datatables.net-bs'
  import axios from 'axios'

  export default {
    name: "ServerTables",
    data() {
      return {
        //   githubUrl: this.globalUrl+'/bos/queryBOsByPagination',
        // response: null,
        // error: null,
        tableData: [],//数据
        osoptions: [],
        categoryoptions: [
          {
            category: '0',
            label: '讯达云'
          }, {
            category: '1',
            label: '华为云'
          }, {
            category: '2',
            label: '519服务器'
          }, {
            category: '3',
            label: '其他服务器'
          },{
            category: ' ',
            label: '所有服务器'
          },

        ],//服务器列表
        tableForm: {    //弹出框表单
          businessId: '',
          // newEndTime:this.endTime,
          name: '',
          brand: '',
          category: '',
          cpu: '',
          tag: '',
          broadband: '',
          disk: '',
          extranetIp: '',
          intranetIp: '',
          memory: '',
          endTime: '',
          endTimestr: '',
          status: '',
          code: '',
          createBy: '',
          createDate: '',
          remarks: '',
          updateBy: '',
          updateDate: '',
          flag: ''
        },
        tableForm2: {},
        levelParent: [], //父级
        pages: '', //分页
        pageNu: 1,
        pageSize: 10,
        total: 0,
        message: '',
        isSearch: false,
        search: {
          businessId: '',
          tag: '',
          category: ''
        },
        rules: {
          businessId: [{
            required: true,
            message: '请输入所属系统',
            trigger: 'change'
          }
          ],
          name: [{
            required: true,
            message: '请输入所属系统',
            trigger: 'change'
          }
          ],
          category: [{
            required: true,
            message: '请选择活动区域',
            trigger: 'change'
          }],
          endTime: [{
            required: true,
            message: '请选择到期时间',
            trigger: 'change'
          }],
          brand: [{
            required: true,
            message: '请输入品牌',
            trigger: 'blur'
          }],
          cpu: [{
            required: true,
            message: '请输入CPU',
            trigger: 'blur'
          }],
          broadband: [{
            required: true,
            message: '请输入带宽(单位M)',
            trigger: 'blur'
          }],
          disk: [{
            required: true,
            message: '请选择硬盘',
            trigger: 'blur'
          }],
          extranetIp: [{
            required: true,
            message: '请输入外网IP',
            trigger: 'blur'
          }],
          intranetIp: [{
            required: true,
            message: '请输入内网IP',
            trigger: 'blur'
          }],
          memory: [{
            required: true,
            message: '请输入内存',
            trigger: 'blur'
          }],
          status: [{
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }],
        }
      }
    },
    mounted() {

      this.getData();
      this.getOsData();
    },
    methods: {
      getData() {
        const loading = this.$loading({
          lock: true,
          text: '正在读取数据...',
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255, 0.5)',
        });
        this.pilot.ajaxGetUtil('bserver/queryBServerByPagination', {
          //params
          rows: this.pageSize,
          page: this.pageNu,
          // sort:'seq'
        }, res => {
          this.tableData = res.rows;
          console.log(this.tableData);
          this.pages = Math.ceil(res.total / this.pageSize);
          this.total = res.total;
          loading.close();
        }, err => {
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
            this.pilot.ajaxPostUtil('bserver/add', {
              osId: this.tableForm.businessId,
              brand: this.tableForm.brand,
              category: this.tableForm.category,
              cpu: this.tableForm.cpu,
              tag: this.tableForm.tag,
              broadband: this.tableForm.broadband,
              disk: this.tableForm.disk,
              extranetIp: this.tableForm.extranetIp,
              intranetIp: this.tableForm.intranetIp,
              memory: this.tableForm.memory,
              // endTime:this.tableForm.endTime,//"endTime":"2018-03-02 16:10:37"
              endTime: this.formatDate3(this.tableForm.endTime),//"endTime": 1516166358000
              status: this.tableForm.status
            }, res => {
              console.log(res)
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
        // $('#tableModal').modal('hide')
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
          this.pilot.ajaxDeleteUtil('bserver' + '/' + id, {
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
        // console.log(item)
        this.tableForm.name = item.name;
        this.tableForm.brand = item.brand;
        // this.tableForm.category=item.category;
        this.tableForm.cpu = item.cpu;
        this.tableForm.tag = item.tag;
        this.tableForm.broadband = item.broadband;
        this.tableForm.disk = item.disk;
        this.tableForm.extranetIp = item.extranetIp;
        this.tableForm.intranetIp = item.intranetIp;
        this.tableForm.code = item.code;
        this.tableForm.memory = item.memory;
        this.tableForm.endTime = this.formatDate2(item.endTime);
        this.tableForm.status = item.status;
        this.tableForm.businessId = item.businessId;
        // console.log(this.tableForm)

        // this.tableForm.code = item.code;
        // // this.tableForm.isTop = item.isTop;
        // // this.tableForm.seq = item.seq;
        // // this.tableForm.parent = item.parentId;
        // this.tableForm.remarks = item.remarks;
        // this.tableForm.createBy = item.createBy;
        // this.tableForm.createDate = item.createDate;
        // this.tableForm.updateBy = item.updateBy;
        // this.tableForm.updateDate = item.updateDate;
        // this.tableForm.flag = item.flag;

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
            this.pilot.ajaxPutUtil('bserver/update/' + this.tableForm.businessId, {
              // parentId:this.tableForm.parent,
              endDate: this.tableForm.endTime,
              name: this.tableForm.name,
              brand: this.tableForm.brand,
              category: this.tableForm.category,
              cpu: this.tableForm.cpu,
              tag: this.tableForm.tag,
              broadband: this.tableForm.broadband,
              disk: this.tableForm.disk,
              extranetIp: this.tableForm.extranetIp,
              intranetIp: this.tableForm.intranetIp,
              memory: this.tableForm.memory,
              status: this.tableForm.status
            }, res => {
              loading.close();
              if (res.code === 200) {
                this.$notify.success({
                  title: '提示',
                  message: '保存成功',
                  duration: 2000
                });
                this.getData();
                $('#tableModal2').modal('hide');
                this.resetForm();
              } else {
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
      //表单重置
      resetForm() {
        this.tableForm.businessId = '';
        this.tableForm.code = '';
        this.tableForm.name = '';
        this.tableForm.createBy = '';
        this.tableForm.createDate = '';
        this.tableForm.updateBy = '';
        this.tableForm.updateDate = '';
        this.tableForm.flag = '';
        this.tableForm.brand = '';
        this.tableForm.category = '';
        this.tableForm.cpu = '';
        this.tableForm.tag = '';
        this.tableForm.broadband = '';
        this.tableForm.disk = '';
        this.tableForm.extranetIp = '';
        this.tableForm.intranetIp = '';
        this.tableForm.memory = '';
        this.tableForm.endTime = '';
        this.tableForm.status = '';
      },
      //分页
      handleCurrentChange(val) {
        this.pageNu = val;
        if (this.isSearch) {
          this.SearchData();
        } else {
          this.getData();
        }
        // console.log(`当前页: ${val}`);
      },
      //category数据转换
      formatCategory: function (row, column) {
        return row.category == 0 ? '讯达云' : row.category == 1 ? '华为云' : row.category == 2 ? '519服务器' : '其他服务器';
        // return this.categoryData[row.category];
      },
      //status转换
      formatStatus: function (row, column) {
        return row.category == 0 ? '讯达云' : row.category == 1 ? '华为云' : row.category == 2 ? '519服务器' : '其他服务器';
        // return this.categoryData[row.category];
      },
      //date数据转换
      formatDate: function (date) {
        // return this.pilot.formatDateString(date);
        return this.pilot.transTime(date, 2)
      },
      formatDate2: function (datetime) {
        var now = new Date(Number(datetime));
        var year = now.getYear() - 100;
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();

        return "20" + year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
      },
      formatDate3: function (datetimestr) {
        var str = datetimestr.toString();
        str = str.replace("/-/g", "/");
//// str =  str.replace("T"," ");
        var oDate = new Date(str);
        return oDate;
      },
      // 搜索
      SearchData() {
        if (!this.isSearch) {
          this.isSearch = true;
          this.pageNu = 1;
        }
        this.pilot.ajaxGetUtil('bserver/queryByCriteria', {
            rows: this.pageSize,
            page: this.pageNu,
            osId: this.search.businessId.trim(),
            tag: this.search.tag,
            category: this.search.category.trim()
          }, res => {
            this.tableData = res.rows;
            this.pages = Math.ceil(res.total / this.pageSize);
            this.total = res.total;
          }, err => {
            alert('err');
          }
        )
      },
      //重置search表单
      resetSearch: function () {
        this.search.businessId = '';
        this.search.tag = '';
        this.search.category = '';
        this.isSearch = false;
        this.pageNu = 1;
        this.getData();
      },
      //获取系统名和businessId
      getOsData() {
        this.$refs['tableForm'].resetFields();

        this.pilot.ajaxGetUtil('/bos/queryBOsByPagination', {
          //params
          rows: 20,
          page: 1,
          // sort:'seq'
        }, res => {
          this.osoptions = res.rows;
          this.osoptions.push(
            {
              businessId: ' ',
              name: '所有系统'
            }
          )
          // console.log(this.osoptions);
        }, err => {
          // console.log(res)
          this.$notify.error({
            title: '错误',
            message: '网络错误--',
            duration: 2000
          });
        })
      },

    },
    computed: {}

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
    width: 30%;
  }

  .add-modalForm, .edit-modalForm {
    padding-left: 1em;
    padding-right: 5em;
  }
</style>
