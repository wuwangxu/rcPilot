<template>
    <div>
        <!--<header-component/>-->
        <!--<div>this is template body</div>-->
        <!--<other-component/>-->
      <div class="main-contant">
       <span class="my-title">修改密码</span>
        <div class="change-pwd">
          <div id="modify-pwd" v-show="img_success">
            <img src="">
            <div class="mf-success-tip">
              <span >密码修改成功!</span>
            </div>
          </div>
          <div v-show!="img-success">
            <label>原密码：</label>
            <input type="password" id="pwd" v-model="oldPwd" :class="{is_Error:hasError}" @change="changeOldPwd()" />
            <div class="mp-tip-right">
              <img v-show="isSuccss" src="">
              <span :class="{font_Error:hasError}">{{oldPwd_tip}}</span>
            </div>
          </div>
          <div v-show!="img-success">
            <label>新密码：</label>
            <input type="password" id="new-pwd" v-model="newPwd" :class="{newError:noError}" @change="checkPwd()"/>
            <div class="mp-tip-right">
              <img v-show="isSuc" src="">
            <span :class="{newFont_Error:noError}">{{newPwd_tip}}</span>
            </div>
          </div>
          <div v-show!="img-success">
            <label>确认新密码：</label>
            <input type="password" id="confirm-pwd" v-model="confirmPwd" :class="{conError:Error}" @change="confirmPwd()"/>
            <div class="mp-tip-right">
              <img  v-show="istrue" src="">
              <span :class="{conFont_Error:Error}">{{conPwd_tip}}</span>
            </div>
          </div>
          <div v-show!="img-success">
            <button @click="savePwd()">保存</button>
          </div>

        </div>
      </div>

    </div>
</template>
<style>
    body {
        background-color: #ff0000;
    }
  .isError,.newError,.conError{
    border:1px solid red;
  }
  .font_Error,.newfontError,.conFont_Error{
    color: #ff6b1b;
  }

</style>

<script>

  export default{
    data () {
      return {
        oldPwd:"",
        oldPwd_tip:'请输入当前用户的登录密码',
        hasError:false,

        newPwd:"",
        newPwd_tip:'请输入新密码',
        noError:false,

        conPwd:"",
        conPwd_tip:"请确认密码",
        Error:false,

        img_success: false,
        isSuccess:false,
        isSuc:false,
        istrue:false,

             }
          } ,
    method:{
        changeOldPwd(){
          if(this.oldPwd!="123456"){
            this.hasError=true;
            this.oldPwd_tip='密码有误',
            this.isSuccess=false,
          } else{
            this.hasError=false,
            this.oldPwd_tip='',
              this.isSuccess=true,
          }
        },
      checkPwd(){
          if(this.newPwd.length<6||this.newPwd.lengh>16){
              this.noError=true,
              this.oldPwd_tip='请输入6~16位密码（字母或数字）',
              this.isSuccess=false,
          }else if (this.newPwd==this.oldPwd){
                this.noError=true,
                this.oldPwd_tip='新密码与原密码不能相同',
                this.isSuc=false,
          }else{
              this.noError=false,
              this.oldPwd_tip='',
              this.isSuc=true,
          }
      },
      confirmPwd(){
        if(this.conPwd!=this.newPwd){
            this.Error=true,
            this.conPwd_tip='密码不一致',
            this.istrue=false,
        }else{
            this.Error=false,
            this.conPwd_tip='',
            this.istrue=true,
        }
      },
      savePwd(){
        if(this.isSuccess==true&&this.isSuc==true&&this.istrue==true){
              this.img_success=true,
        }
      },
    }

           }
</script>
