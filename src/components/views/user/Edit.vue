<template>
    <div>
          <div class="modal-content ">
            <div class="modal-body row">
              <!-- Horizontal Form -->
              <div class=" col-md-6 col-sm-6">
                <!-- form start -->
                <el-form :model="tableForm" :rules="rules" ref="tableForm" label-width="100px" class="demo-ruleForm">
                  <div class="box-body">
                    <el-form-item label="工号" prop="empId">
                      <el-input v-model="tableForm.empId"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                      <el-input v-model="tableForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="登录名" prop="loginName">
                      <el-input v-model="tableForm.loginName" @blur="checkRepect()"></el-input>
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
                      label="邮箱">

                      <el-input v-model="tableForm.email"></el-input>
                    </el-form-item>

                    <el-form-item label="联系电话" prop="phone">
                      <el-input v-model.number="tableForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="用户类型">
                      <el-radio-group v-model="tableForm.utype">
                        <el-radio :label="0" value="0">实习</el-radio>
                        <el-radio :label="1" value="1">试用</el-radio>
                        <el-radio :label="2" value="2">正式</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="目前状态">
                      <el-radio-group v-model="tableForm.ustatus">
                        <el-radio :label="0" value="0">在职</el-radio>
                        <el-radio :label="1" value="1">离职</el-radio>
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
                <div class="modal-footer">
                  <button type="button" class="btn btn-default"  @click="resetForm">取 消</button>
                  <button type="button" class="btn btn-primary" @click="modify">保 存</button>
                </div>
              </div>

            </div>

          </div>


    </div>
</template>
<style>

</style>

<script>
  export default{
    data(){
              var validateempId = (rule, value, callback) => {
                if (value === '') {
                  return callback(new Error('请输入工号'));
                }
                var pattern = new RegExp(/^\d+$/);
                setTimeout(() => {
                  if (value.length!=8) {
                    callback(new Error('工号为8位'));
                  }
                  else if (pattern.test(value) == false) {
                    callback(new Error('请输入数字'));
                  } else {
                    callback();
                  }
                }, 1000);
              };
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
          unworkdate:'',
          loginName: '',
          empId:'',
                 },
        rules: {
          empId:[
              {required: true, validator: validateempId, trigger: 'blur'}
            ],
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
            { required: true, validator: checkemail, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ],
          sex:[{required: true}],
          loginName:[
            {required: true,message: '请输入登录名', trigger: 'blur'}
          ],
          password:[{required: true,message: '请输入密码', trigger: 'blur'}]
        }
             }
          },
    methods:{
      modify(){
       // let that= this
        this.$refs.tableForm.validate((valid) => {
            if (!valid) return false
            this.pilot.ajaxPutUtil('/bUser/alter/' + this.tableForm.businessId, {
                businessId: this.tableForm.businessId,
                empId:this.tableForm.empId,
                name: this.tableForm.name,
                sex: this.tableForm.sex,
                phone: this.tableForm.phone,
                email: this.tableForm.email,
                utype: this.tableForm.utype,
                ustatus: this.tableForm.ustatus,
                ucollege: this.tableForm.ucollege,
                roleId: this.tableForm.roleId,
                idNumber: this.tableForm.idNumber,
                uworkdate: this.tableForm.uworkdate
              }, res => {
                console.log(this.tableForm.empId)
                console.log(this.tableForm.roleId)
                console.log(this.tableForm.uworkdate)
                if (res.code == 200) {
                  this.$notify.success({
                    title: '提示',
                    message: '操作成功',
                    duration: 2000
                  });
                  this.$router.push({
                    'path':'/users'
                  })
                  // 清空表单
                  this.resetForm();
                //  $('#tableModal2').modal('hide');
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
          this.tableForm.unworkdate = ''
      },
      //查重
//      checkRepect(){
//        login_name:this.tableForm.loginName,
//
//        this.pilot.ajaxGetUtil('/bUser/validate/'+login_name+emp_id,{
//
//          },res=>{
//
//        },err=>{
//
//          })
//      }
    },
    components: {
    },
    mounted(){
      let item = this.$route.query.info;
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
//      console.log(info);
      let type = this.$route.query.type;
      console.log(type)
    },
  }
</script>
