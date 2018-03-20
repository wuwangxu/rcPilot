<template>
  <section class="content">
    <div class="row center-block">

      <!-- 新增弹出框modal -->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close"  aria-label="Close" @click="resetForm">
                <span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">新增服务器</h4>
            </div>
            <div class="modal-body">
              <!-- Horizontal Form -->
              <div class="box box-info">
                <el-form :model="tableForm" :rules="rules" ref="tableForm" label-width="100px" class="add-modalForm">
                  <div class="box-body">
                    <el-col :md="{span:8,offset:4}" :sm="{span:20,offset:4}" :xs="{span:20,offset:4}">
                    <el-form-item label="所属系统" prop="osId">
                      <el-select v-model="tableForm.osId" placeholder="请选择所属系统">
                        <el-option
                          v-for="item in osoptions"
                          :key="item.businessId"
                          :label="item.name"
                          :value="item.businessId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :md="{span:8,offset:0,pull:4}" :sm="{span:20,offset:4}" :xs="{span:20,offset:4}">
                    <el-form-item label="品牌" prop="brand">
                      <el-input v-model="tableForm.brand"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :md="{span:8,offset:4}" :sm="{span:20,offset:4}" :xs="{span:20,offset:4}">
                    <el-form-item label="服务器" prop="category">
                      <el-select v-model="tableForm.category" placeholder="请选择服务器 ">
                        <el-option v-for="item in categoryoptions"
                                    :key="item.category" :label="item.label"
                                   :value="item.category">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :md="{span:8,offset:0,pull:4}" :sm="{span:20,offset:4}" :xs="{span:20,offset:4}">
                    <el-form-item label="CPU" prop="cpu">
                      <el-input v-model="tableForm.cpu"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :md="{span:8,offset:4}" :sm="{span:20,offset:4}" :xs="{span:20,offset:4}">
                    <el-form-item label="标签" prop="tag">
                      <el-input v-model="tableForm.tag"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :md="{span:8,offset:0,pull:4}" :sm="{span:20,offset:4}" :xs="{span:20,offset:4}">
                    <el-form-item label="带宽" prop="broadband">
                      <el-input v-model="tableForm.broadband"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :md="{span:8,offset:4}" :sm="{span:20,offset:4}" :xs="{span:20,offset:4}">
                    <el-form-item label="硬盘" prop="disk">
                      <el-input v-model="tableForm.disk"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :md="{span:8,offset:0,pull:4}" :sm="{span:20,offset:4}" :xs="{span:20,offset:4}">
                    <el-form-item label="外网IP" prop="extranetIp">
                      <el-input v-model="tableForm.extranetIp"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :md="{span:8,offset:4}" :sm="{span:20,offset:4}" :xs="{span:20,offset:4}">
                    <el-form-item label="内网IP" prop="intranetIp">
                      <el-input v-model="tableForm.intranetIp"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :md="{span:8,offset:0,pull:4}" :sm="{span:20,offset:4}" :xs="{span:20,offset:4}">
                    <el-form-item label="内存" prop="memory">
                      <el-input v-model="tableForm.memory"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :md="{span:8,offset:4}" :sm="{span:20,offset:4}" :xs="{span:20,offset:4}">
                    <el-form-item label="到期时间" prop="endTime">
                      <el-date-picker v-model="tableForm.endTime" type="datetime" placeholder="选择日期时间"
                                      value-format="yyyy-MM-dd HH:mm:ss" style="width:160px;"></el-date-picker>
                    </el-form-item>
                    </el-col>
                    <el-col :md="{span:8,offset:0,pull:4}" :sm="{span:20,offset:4}" :xs="{span:20,offset:4}">
                    <el-form-item label="状态" prop="status">
                      <el-radio-group v-model="tableForm.status" size="medium">
                        <el-radio-button label="1">开启</el-radio-button>
                        <el-radio-button label="0">关闭</el-radio-button>
                      </el-radio-group>
                    </el-form-item>
                    </el-col>
                    <!--<el-col :span="{span:20,offset:4}">-->
                    <!--<el-form-item label="备注" prop="remarks">-->
                      <!--<el-input type="textarea" v-model="tableForm.remarks"></el-input>-->
                    <!--</el-form-item>-->
                    <!--</el-col>-->
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
  </section>
</template>

<script>
  // import $ from 'jquery'
  // Require needed datatables modules
  import 'datatables.net'
  import 'datatables.net-bs'
  import axios from 'axios'

  export default {
    name: "AddServerTable",
    data() {
      var validateIp = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入IP地址'));
        }
        var pattern = new RegExp(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
        setTimeout(() => {
          if (pattern.test(value) == false) {
            callback(new Error('请输入正确的IP地址'));
          } else {
            callback();
          }
        }, 500);
      };

      return {
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
          }

        ],//服务器列表
        tableForm: {    //弹出框表单
          osId: '',
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
          status: ''
        },
        message: '',
        rules: {
          osId: [{
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
            validator: validateIp,
            trigger: 'blur'
          }],
          intranetIp: [{
            required: true,
            validator: validateIp,
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
      this.getOsData();
    },

    methods: {
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
              osId: this.tableForm.osId,
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
                this.$router.push("servertables");
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

      //表单重置
      resetForm() {
        this.tableForm.osId = '';
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
        this.$router.push("servertables");
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
      formatDate3: function (datetimestr) {
        var str = datetimestr.toString();
        str = str.replace("/-/g", "/");
//// str =  str.replace("T"," ");
        var oDate = new Date(str);
        return oDate;
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
          // console.log(this.osoptions);
        }, err => {
          // console.log(res)
          this.$notify.error({
            title: '错误',
            message: '网络错误--',
            duration: 2000
          });
        })
      }
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

  .el-input, .el-select{
    width:160px;
  }


</style>
