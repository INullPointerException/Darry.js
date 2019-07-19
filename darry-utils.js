(function(window, document) {
  var ArrayUtils = {
    isArrayLike: function(o) {
      if (
        o && // o不是null、undefined等
        typeof o === "object" && // o是对象
        isFinite(o.length) && // o.length是有限数值
        o.length >= 0 && // o.length为非负值
        o.length === Math.floor(o.length) && // o.length是整数
        o.length < 4294967296
      )
        // o.length < 2^32
        return true;
      else return false;
    },

    /**
     * 遍历数组或者类数组对象
     * @param {待遍历数组或者类数组对象} obj
     * @param {遍历的回调函数} callback
     */
    each: function(obj, callback) {
      var value,
        i = 0,
        length = obj.length,
        isArray = this.isArrayLike(obj);

      if (isArray) {
        for (; i < length; i++) {
          value = callback.call(obj[i], i, obj[i]);
          if (value === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          value = callback.call(obj[i], i, obj[i]);
          if (value === false) {
            break;
          }
        }
      }
      return obj;
    },

    /**
     * 反向遍历数组
     * @param {待遍历数组或者类数组对象} obj
     * @param {遍历的回调函数} callback
     */
    reverseEach: function(obj, callback) {
      var value,
        length = obj.length,
        isArray = this.isArrayLike(obj);

      if (isArray) {
        for (var l = length - 1; l >= 0; l--) {
          value = callback.call(obj[l], l, obj[l]);
          if (value === false) {
            break;
          }
        }
      } else {
        for (var i in obj) {
          value = callback.call(obj[i], i, obj[i]);
          if (value === false) {
            break;
          }
        }
      }
      return obj;
    },

    /**
     * 移除数组中的指定文本
     * @param {待移除文本数组} array
     * @param {待移除文本} removeText
     */
    removeTextOfArray: function(array, removeText) {
      var dx = -1;
      for (var i = 0, n = 0; i < array.length; i++) {
        if (array[i] === removeText) {
          dx = i;
          break;
        }
      }
      if (dx === -1) {
        return false;
      }
      array.splice(dx, 1);
    },

    isEqual: function(array1, array2) {
      var Iterator = function(obj) {
        var current = 0;

        var next = function() {
          current += 1;
        };

        var isDone = function() {
          return current >= obj.length;
        };

        var getCurrItem = function() {
          return obj[current];
        };

        var getLength = function() {
          return obj.length;
        };

        return {
          next: next,
          isDone: isDone,
          getCurrItem: getCurrItem,
          getLength: getLength
        };
      };

      var iterator1 = Iterator(array1);
      var iterator2 = Iterator(array2);

      let isEqual = true;
      if (iterator1.getLength() !== iterator2.getLength()) {
        return (isEqual = false);
      }
      while (!iterator1.isDone() && !iterator2.isDone()) {
        if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
          isEqual = false;
        }
        iterator1.next();
        iterator2.next();
      }
      return isEqual;
    }
  };

  var TimeUtils = {
    /**
     * 时间戳转化为时间格式
     * @param {时间戳} timestamp
     */
    timestampToTime: function(timestamp) {
      //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      if (timestamp.toString().length === 10) {
        timestamp *= 1000;
      }
      var date = new Date(timestamp);
      Y = date.getFullYear() + "-";
      M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      D = date.getDate() + " ";
      h = date.getHours() + ":";
      m = date.getMinutes() + ":";
      s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
  };

  var CommonUtils = {
    /**
     * 检测手机号合法性
     * @param {待检测手机号} phoneNumber
     */
    checkPhone: function(phoneNumber) {
      if (!/^1[3456789]\d{9}$/.test(phoneNumber)) {
        return false;
      } else {
        return true;
      }
    },

    checkTel: function(value) {
      if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel)) {
        return false;
      } else {
        return true;
      }
    },
    
    //身份证号合法性校验,可以校验15位和18位的身份证号
    IdentityCodeValid: function(sfzh) {
      var checkMonthDay = function(year, month, day) {
        switch (month) {
          case "01":
          case "03":
          case "05":
          case "07":
          case "08":
          case "10":
          case "12":
            if (day > 31) {
              return false;
            }
            break;
          case "04":
          case "06":
          case "09":
          case "11":
            if (day > 30) {
              return false;
            }
            break;
          case "02":
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
      };

      //是否为空
      if (sfzh == "") {
        return false;
      }

      var pat18 = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
      var pat15 = /^\d{8}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}/;
      if (pat18.test(sfzh) || pat15.test(sfzh)) {
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
          if (!checkMonthDay(year, month, day)) {
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
          if (!checkMonthDay(year, month, day)) return false;
          sfzh = sfzh.split("");
          //∑(ai×Wi)(mod 11)
          //加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          //校验位
          /*校验位规则
              公式:∑(ai×Wi)(mod 11)……………………………………(1)
             公式(1)中：
  ai----表示第i位置上的号码字符值；
  Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
  Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1
  */
          //余数[ 0   1  2   3  4  5  6  7  8  9  10]
          var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
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
      } else {
        return false;
      }
    },

    /*获取光标选中的文本 */
    getSelectedText: function() {
      var txt = "";
      if (document.selection) {
        txt = document.selection.createRange().text; //ie
      } else {
        txt = document.getSelection();
      }
      return txt.toString();
    },

    /**
     * 变量类型判断
     * Types.isString()
     */
    Types: (function() {
      var Type = {};
      var types = ["String", "Array", "Number"];
      for (var i = 0; i < types.length; i++) {
        (function(type) {
          Type["is" + type] = function(obj) {
            return (
              Object.prototype.toString.call(obj) == "[object " + type + "]"
            );
          };
        })(types[i]);
      }
      return Type;
    })(),

    /**
     * 函数节流， 防止函数频繁被调用
     * @param { 需要节流处理的函数 } fn
     * @param { 防止重复调用的时间间隔 } interval
     */
    throttle: function(fn, interval) {
      var __self = fn,
        timer,
        firstTime = true;

      return function() {
        var args = arguments,
          __me = this;

        if (firstTime) {
          __self.apply(__me, args);
          return (firstTime = false);
        }

        if (timer) {
          return false;
        }

        timer = setTimeout(function() {
          // 延迟一段时间执行 clearTimeout(timer);
          timer = null;
          __self.apply(__me, args);
        }, interval || 500);
      };
    },

    /**
     * 分时函数
     * @param {分时处理的数据} arr
     * @param {分时处理每一个数据的回调函数} fn
     * @param {分时处理数据每批次处理的数据个数} count
     */
    timeThunk: function(arr, fn, count) {
      var obj, t;

      var len = arr.length;

      var start = function() {
        for (var i = 0; i < Math.min(count || 1, arr.length); i++) {
          var obj = arr.shift();
          fn(obj);
        }
      };

      return function() {
        t = setInterval(function() {
          if (arr.length === 0) {
            return clearInterval(t);
          }
          start();
        }, 200);
      };
    },

    /**
     * 快速定义划分命名空间的对象
     */
    defineNamespaceObj: function(namespaceArr) {
      var obj = {};
      obj.namespace = function(name) {
        var parts = name.split(".");
        var current = obj;
        for (var i in parts) {
          if (!current[parts[i]]) {
            current[parts[i]] = {};
          }
          current = current[parts[i]];
        }
      };

      for (var i in namespaceArr) {
        obj.namespace(namespaceArr[i]);
      }
      return obj;
    }
  };

  var EventUtils = {
    /**
     * 事件绑定函数，兼容浏览器的不同方式的事件绑定
     * @param {绑定事件的元素} elem
     * @param {绑定事件的类型} type
     * @param {绑定事件的处理函数} handler
     */
    addEvent: function(elem, type, handler) {
      if (window.addEventListener) {
        addEvent = function(elem, type, handler) {
          elem.addEventListener(type, handler, false);
        };
      } else if (window.attachEvent) {
        addEvent = function(elem, type, handler) {
          elem.attachEvent("on" + type, handler);
        };
      }
      addEvent(elem, type, handler);
    },

    Event: (function() {
      var global = this,
        Event,
        _default = "default"; // 默认的命名空间名称

      Event = (function() {
        var _listen,
          _trigger,
          _remove,
          _splice = Array.prototype.splice,
          _shift = Array.prototype.shift,
          _unshift = Array.prototype.unshift,
          namespaceCache = {}, // 命名空间缓存对象
          _create;

        each = function(arr, fn) {
          // 用来遍历缓存函数列表和离线事件列表
          var ret;
          for (var i = 0, l = arr.length; i < l; i++) {
            var n = arr[i];
            ret = fn.call(n, i, n);
          }
          return ret; //   这里最终返回的是什么？
        };

        /**
         * 事件订阅
         */
        _listen = function(key, fn, cache) {
          // 针对缓存列表中没有的事件类型，先初始化事件列表为空数组
          if (!cache[key]) {
            cache[key] = [];
          }
          // 对于已经订阅的事件类型，向该订阅类型的事件缓存列表中添加缓存函数
          cache[key].push(fn);
        };

        /**
         * 事件订阅移除
         */
        _remove = function(key, cache, fn) {
          if (cache[key]) {
            if (fn) {
              // 倒叙遍历移除， 防止splice导致数组遍历出现bug
              for (var i = cache[key].length; i >= 0; i--) {
                if (cache[key][i] === fn) {
                  _splice.call(cache[key], i, 1);
                }
              }
            } else {
              // 如果没有传递要移除的函数， 则移除该类订阅类型的全部回调函数
              cache[key] = [];
            }
          }
        };

        /**
         * 事件分发函数, 触发事件
         */
        _trigger = function() {
          var cache = _shift.call(arguments), // 函数缓存列表
            key = _shift.call(arguments), // 订阅事件类型
            args = arguments, // 参数列表
            _self = this,
            stack = cache[key]; // 某种事件的调用栈

          if (!stack || !stack.length) {
            return;
          }

          return each(stack, function() {
            // 这里的this为某种类型事件缓存函数列表中的每一个函数
            return this.apply(_self, args);
          });
        };

        /**
         * 命名空间创建函数
         */
        _namespace = function(namespace) {
          var namespace = namespace || _default; // 默认的命名空间为default
          var cache = {}, // 事件缓存对象，  存储每一类事件类型的回调函数
            offlineStack = [], //离线事件
            ret = {
              // 每一个命名空间对应的数据结构
              listen: function(key, fn, last) {
                _listen(key, fn, cache);
                if (offlineStack === null) {
                  return;
                }
                if (last === "last") {
                  offlineStack.length && offlineStack.pop()();
                } else {
                  each(offlineStack, function() {
                    // 这里的this为离线事件中每一个事件的回调函数
                    this();
                  });
                }

                offlineStack = null;
              },

              /**
               * 订阅某种类型的事件一次
               * @param {订阅事件类型} key
               * @param {接收通知的回调函数} fn
               * @param {} last
               */
              one: function(key, fn, last) {
                // 移除缓存中已经订阅的事件
                _remove(key, cache);
                this.listen(key, fn, last);
              },

              remove: function(key, fn) {
                _remove(key, cache, fn);
              },

              /**
               * trigger('click', 1)
               */
              trigger: function() {
                var fn,
                  args,
                  _self = this;

                _unshift.call(arguments, cache);
                args = arguments;
                fn = function() {
                  return _trigger.apply(_self, args);
                };

                if (offlineStack) {
                  return offlineStack.push(fn);
                }
                return fn();
              }
            };

          /* 如果调用create函数时候的命名空间已经存在直接返回命名空间缓存对象中的命名空间，
          否则初始化新的命名空间为上面的数据钢结构 */
          return namespace
            ? namespaceCache[namespace]
              ? namespaceCache[namespace]
              : (namespaceCache[namespace] = ret)
            : ret;
        };

        return {
          namespace: _namespace,
          one: function(key, fn, last) {
            var event = this.namespace();
            event.one(key, fn, last);
          },
          remove: function(key, fn) {
            var event = this.namespace();
            event.remove(key, fn);
          },
          listen: function(key, fn, last) {
            var event = this.namespace();
            event.listen(key, fn, last);
          },
          trigger: function() {
            var event = this.namespace();
            event.trigger.apply(this, arguments);
          }
        };
      })();

      return Event;
    })()
  };

  var DarryUtils = {
    common: CommonUtils,
    time: TimeUtils,
    array: ArrayUtils,
    event: EventUtils
  };

  DarryUtils.desc = function() {
    console.log(DarryUtils);
  };

  window.DarryUtils = DarryUtils;
})(window, document);
