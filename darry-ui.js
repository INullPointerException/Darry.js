(function(window, document) {
  var CommonDarryUIUtils = {
    /**
     * 获取单例对象, 节省频繁创建dom元素小消耗的性能
     * @param {生成对象的函数} fn
     *  var createLoginLayer = function () {
     *    var div = document.createElement('div');
     *    div.innerHTML = '我是登录浮窗';
     *    div.style.display = 'none';
     *    document.body.appendChild(div);
     *    return div;
     *  };
     *
     *  var createSingleLoginLayer = getSingle( createLoginLayer );
     *
     *  document.getElementById( 'loginBtn' ).onclick = function(){
     *    var loginLayer = createSingleLoginLayer(); loginLayer.style.display = 'block';
     *  };
     */
    getSingle: function(fn) {
      var result;
      return function() {
        return result || (result = fn.apply(this, arguments));
      };
    }
  };

  var DarryUIUtils = {
    common: CommonDarryUIUtils
  };

  DarryUIUtils.desc = function() {
    console.log(DarryUIUtils);
  };

  window.DarryUIUtils = DarryUIUtils;
})(window, document);
