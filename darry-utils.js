(function(window, document) {
  var DarryUtils = {

    /**
     * 出生年月校验
     */
    checkMonthDay: function(year, month, day) {
      switch (month) {
        case '01':
        case '03':
        case '05':
        case '07':
        case '08':
        case '10':
        case '12':
          if (day > 31) {
            return false;
          }
          break;
        case '04':
        case '06':
        case '09':
        case '11':
          if (day > 30) {
            return false;
          }
          break;
        case '02':
          if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            if (day > 29) {
              return false;
            }
          } else {
            if (day > 28) {
              return false;
            }
          }
          break;
        default:
          return false;
      }
      return true;
    },

    //身份证号合法性校验
    IdentityCodeValid: function(sfzh) {
      //是否为空
      if (sfzh == "") {
        return false;
      }

      var pat18 = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
      var pat15 = /^\d{8}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}/;
      if ((pat18.test(sfzh) || pat15.test(sfzh))) {
        //长度
        if (sfzh.length != 15 && sfzh.length != 18) {
          return false;
        }
        //地址编码
        var area = {
          11: "北京",
          12: "天津",
          13: "河北",
          14: "山西",
          15: "内蒙古",
          21: "辽宁",
          22: "吉林",
          23: "黑龙江",
          31: "上海",
          32: "江苏",
          33: "浙江",
          34: "安徽",
          35: "福建",
          36: "江西",
          37: "山东",
          41: "河南",
          42: "湖北",
          43: "湖南",
          44: "广东",
          45: "广西",
          46: "海南",
          50: "重庆",
          51: "四川",
          52: "贵州",
          53: "云南",
          54: "西藏",
          61: "陕西",
          62: "甘肃",
          63: "青海",
          64: "宁夏",
          65: "新疆",
          71: "台湾",
          81: "香港",
          82: "澳门",
          91: "国外"
        };
        if (area[parseInt(sfzh.substr(0, 2))] == null) {
          return false;
        }
        /* 15位身份证 校验 */
        if (sfzh.length == 15) {
          pattern = /^\d{15}$/;
          if (pattern.exec(sfzh) == null) {
            return false;
          }
          var year = parseInt("19" + sfzh.substr(6, 2));
          var month = sfzh.substr(8, 2);
          var day = parseInt(sfzh.substr(10, 2));
          if (!this.checkMonthDay(year, month, day)) {
            return false;
          } else {
            return true;
          }
        }
        /* 18位身份证需要验证最后一位校验位 */
        if (sfzh.length == 18) {
          //出生年月
          var year = parseInt(sfzh.substr(6, 4));
          var month = sfzh.substr(10, 2);
          var day = parseInt(sfzh.substr(12, 2));
          if (!this.checkMonthDay(year, month, day))
            return false;
          sfzh = sfzh.split('');
          //∑(ai×Wi)(mod 11)
          //加权因子
          var factor = [
            7,
            9,
            10,
            5,
            8,
            4,
            2,
            1,
            6,
            3,
            7,
            9,
            10,
            5,
            8,
            4,
            2
          ];
          //校验位
          /*校验位规则
                  公式:∑(ai×Wi)(mod 11)……………………………………(1)
                 公式(1)中：
      ai----表示第i位置上的号码字符值；
      Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
      Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1
      */
          //余数[ 0   1  2   3  4  5  6  7  8  9  10]
          var parity = [
            1,
            0,
            'X',
            9,
            8,
            7,
            6,
            5,
            4,
            3,
            2
          ];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = sfzh[i];
            wi = factor[i];
            sum += ai * wi;
          }
          var last = parity[sum % 11];
          // alert("余数"+sum % 11);
          // alert("校验"+last);
          if (last != sfzh[17]) {
            return false;
          }
          return true;
        }
      }else{
        return false;
      }
    },

    timestampToTime: function(timestamp) {
          //时间戳为10位需*1000，时间戳为13位的话不需乘1000
          if(timestamp.toString().length === 10){
              timestamp *= 1000;
          }
          var date = new Date(timestamp);
          Y = date.getFullYear() + '-';
          M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          D = date.getDate() + ' ';
          h = date.getHours() + ':';
          m = date.getMinutes() + ':';
          s = date.getSeconds();
          return Y+M+D+h+m+s;
      }
  };

  window.DarryUtils = DarryUtils;
}(window, document));
