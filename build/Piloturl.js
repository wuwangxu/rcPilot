/**
 * Created by Administrator on 2018/2/28.
 */
const axios = require('axios')
const preUrl = require('../config/url')
// axios.defaults.headers.common['Authorization']=(sessionStorage.getItem("token")!=''&&sessionStorage.getItem("token")!=undefined&&sessionStorage.getItem("token")!=null)?sessionStorage.getItem("token"):localStorage.getItem("token")

/**
 * @description: 将键值对集合转换为FormData对象，以便axios传参；
 * @param: data ：形如{param1:"",param2:""}
 * @return   {FormData}
 * @author: Breaker-93
 * @date: create on 2017-12-18 15:40:10
 */
var formData = function(data){
  let _formData = new FormData();
  for(var i in data){
    _formData.append(i, data[i]);
  }
  return _formData;
};
module.exports={

  /**
   * @description: 时间戳格式转换为日期格式(转换两种)
   * @param: timestamp 时间戳
   * @param type 1:年/月/日  2:年/月/日 时分秒
   * @return    {string}
   * @author: Breaker-93
   * @date: create on 2017-12-18 15:36:49
   */
  transTime (timestamp,type) {
    var newDate = new Date();

    newDate.setTime(timestamp);
    if(type==1){
      return newDate.toLocaleDateString();
    }
    if(type==2){
      return newDate.toLocaleString();
    }
    if(type==3){
      let year = newDate.getFullYear();
      let month = this.formatDateString(newDate.getMonth() + 1);
      let date = this.formatDateString(newDate.getDate());
      let hour = this.formatDateString(newDate.getHours());
      let minute = this.formatDateString(newDate.getMinutes());
      let second = this.formatDateString(newDate.getSeconds());
      return [year, month, date].join("-") + " " + [hour, minute, second].join(":");
    }
  },

  /**
   * @description: 对axios的POST请求方法的封装(已加header)
   * @param: url  -> String
   * @param: param  -> 形如{param1:"",param2:""}
   * @param: thenFun  -> 请求成功（200）的回调函数
   * @param: exeFun  -> 请求失败（非200）的回调函数
   * @return
   * @author: Breaker-93
   * @date: create on 2017-12-18 15:45:09
   */
  ajaxPostUtil (url,param,thenFun,exeFun){
    var _formData = formData(param);
    axios.defaults.headers.common['Authorization']=sessionStorage.getItem("token")||localStorage.getItem("token")
    axios.post(preUrl.interfaceUrl+url,_formData).then(function (res) {
      thenFun.call(this,res.data);
    }).catch(function (error) {
      exeFun.call(this,error);
    });
  },

  /**
   * @description: 对axios的GET请求方法的封装（已加header）
   * @param: url  -> String
   * @param: param  -> 形如{param1:"",param2:""}
   * @param: thenFun  -> 请求成功（200）的回调函数
   * @param: exeFun  -> 请求失败（非200）的回调函数
   * @return
   * @author: Breaker-93
   * @date: create on 2017-12-18 15:48:35
   */
  ajaxGetUtil (url,param,thenFun,exeFun){
    axios.defaults.headers.common['Authorization']=sessionStorage.getItem("token")||localStorage.getItem("token")
    axios({
      method: 'get',
      url: preUrl.interfaceUrl + url,
      params: param
    }).then(function (res) {
      thenFun.call(this,res.data);
    }).catch(function (error) {
      exeFun.call(this,error);
    });
},

  ajaxDeleteUtil (url,param,thenFun,exeFun){
    axios.defaults.headers.common['Authorization']=sessionStorage.getItem("token")||localStorage.getItem("token")
    axios({
      method: 'delete',
      url: preUrl.interfaceUrl + url,
      params: param
    }).then(function (res) {
      thenFun.call(this,res.data);
    }).catch(function (error) {
      exeFun.call(this,error);
    });
  },
  ajaxPutUtil (url,param,thenFun,exeFun){
    axios.defaults.headers.common['Authorization']=sessionStorage.getItem("token")||localStorage.getItem("token")
    axios({
      method: 'put',
      url: preUrl.interfaceUrl + url,
      params: param
    }).then(function (res) {
      thenFun.call(this,res.data);
    }).catch(function (error) {
      exeFun.call(this,error);
    });
  },

  /**
   * @description: 格式化日期
   * @param: date {Date}
   * @param: fmt {String}
   * @return: {string}
   * @author: Breaker-93
   * @date: create on 2018-01-25 15:36:49
   */
  formatDate (date,fmt){
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "H+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },

  /**
   * @description: 根据浏览器url中的参数key获取值
   * @param: name url参数key{String}
   * @return: {string}
   * @author: Breaker-93
   * @date: create on 2018-01-25 15:39:28
   */
  GetQueryString (name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");

    //专获取先编码后加密的url的参数，例如： let goUrl = 'experiment.html?'+window.btoa(encodeURIComponent("paramBody="+JSON.stringify(paramBody)));
    var r =window.decodeURIComponent(window.atob(window.location.search.substr(1))).match(reg);
    if(r!=null)return  decodeURI(r[2]); return null;
  },

  /**
   * @description: 格式化日期字符串，给不足两位的数字补0
   * @param: number  -> Number
   * @return  {String}
   */
  formatDateString (number){
    return (number > 9 ? "" : "0") + number;
  },

  /**
   * @description: 把数字转换成字母
   * @param: number  -> Number
   * @return  {String}
   */
  numberToLetter (number){
    var result = [];
    while (number) {
      var t = number % 26;
      if (!t) {
        t = 26;
        -- number;
      }
      result.push(String.fromCodePoint(t + 64));
      number = ~~(number / 26);
    }
    return result.reverse().join('');
  },

  substr (source,begin,len){
    if(source=="") {
      return "";
    }
    return source.substr(begin,len);
  },

  connectWebSocket(tag,onClose){
    var socket;
    if(!window.WebSocket)
      window.WebSocket = window.MozWebSocket;
    if(window.WebSocket){
      socket = new WebSocket(preUrl.webSocketUrl+"?token="+tag);
      socket.onmessage = function(event){
        console.log(event);

        var data = eval("(" + event.data + ")");
        if(data.code == "202"){
          socket.close();
        }

      };
      socket.onopen = function(event){
        console.log("连接成功！");
      };
      socket.onclose = function (event) {
        console.log("即将关闭！");
        onClose.call(this);
      };
    }else{
      alert("很遗憾，您的浏览器不支持websocket技术！");
    }
  }
}
