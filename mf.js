/** 
 * 移动框架插件 
 * @author 欧阳<804393659@qq.com>
 * @version 0.1
 */
//基础操作
;(function($){
  //解析框架模板
  $._parseTpl = function(tpl, data){
    for(var key in data){
      tpl = tpl.replace("<%="+key+"%>", data[key]);
    }
    return tpl;
  }
})(Zepto);

//覆盖层
;(function($){
  //模板
  var _tpl = '<div class="mf-mask"></div>';
  //默认参数
  var defaults = {
    zIndex: 90,
    callback: function(){
      return false;
    },
    background: "#000",
    opacity: 0.5
  };

  //构造函数
  function Mask(options){
    this.options = $.extend(defaults, options);
    this._init();
  }

  Mask.prototype = {
    _init: function(){
      var html = $._parseTpl(_tpl);
      $(".mf-mask").remove();
      $("body").append(html);
      $(".mf-mask").css({
        zIndex: this.options.zIndex, 
        backgroundColor: this.options.background,
        opacity: this.options.opacity
      });
      //绑定事件
      if(typeof(this.options.callback)=="function"){
        var that = this;
        $("body").on("tap", ".mf-mask", function(){
          var result = that.options.callback();
          if(result){
            that.remove();
          }
        });  
      }
    },
    show: function(){
      $(".mf-mask").show();
    },
    hide: function(){
      $(".mf-mask").hide();
    },
    remove: function(){
      $(".mf-mask").remove();
    }
  };

  $.mask = function(options){
    return new Mask(options);
  };
})(Zepto);

//Toast
;(function($){
  //模板
  var _tpl = '<div class="mf-toast <%=position%>">' + 
        '<p class="content"><%=content%></p>' + 
    '</div>';

    //默认参数
    var defaults = {
      content: 'Content',
      timeout: 1500,
      callback: false,
      position: "center"
    };

    var Toast = function(options){
      var options = $.extend(defaults, options);
      _tpl = _tpl.replace('<%=position%>', options.position);
      _tpl = _tpl.replace('<%=content%>', options.content);
      $(".mf-toast").remove();
      $("body").append(_tpl);
      $(".mf-toast").css("margin-left", -$(".mf-toast").width()/2);
      setTimeout(function(){
        $(".mf-toast").remove();
        if(typeof(options.callback)=="function"){
          options.callback();
        }
      }, options.timeout);
    }

    $.toast = Toast;
})(Zepto);

//确认框
;(function($){
  //模板
  var _tpl = '<div class="mf-confirm">' + 
        '<h2 class="mf-confirm-title"><%=title%></h2>' +
        '<div class="mf-confirm-content">' +
            '<p><%=content%></p>' +
        '</div>' +
        '<div class="mf-confirm-btns">' +
            '<a class="ok"><%=okVal%></a>' +
            '<a class="cancel"><%=cancelVal%></a>' +
        '</div></div>';

    //默认参数
    var defaults = {
      title: "Confirm this operation",
      content: "Confirm to perform this operation?",
      okVal: "Yes",
      cancelVal: "Cancel",
      lock: false,
      ok: function(){
        return true;
      },
      cancel: function(){
        return true;
      }
    }

    //构造函数
    function Confirm(options){
      this.options = $.extend(defaults, options);
      that = this;
      console.log(that);
      var html = $._parseTpl(_tpl, {
        title: this.options.title,
        content: this.options.content,
        okVal: this.options.okVal,
        cancelVal: this.options.cancelVal
      });
      //移除之前的残余代码
      $(".mf-confirm").remove()
      $(".mf-mask").remove();
      $("body").append(html);
      if(this.options.lock){
        $.mask();
      }
      //绑定事件
      $("body").on("tap", ".mf-confirm-btns .ok", function(){
        if(typeof(that.options.ok)=="function"){
          var result = that.options.ok();
          if(result){
            that.remove();
          } 
        } else {
          that.remove();
        }
      });
      $("body").on("tap", ".mf-confirm-btns .cancel", function(){
        if(typeof(that.options.cancel)=="function"){
          var result = that.options.cancel();
          if(result){
            that.remove();
          } 
        } else {
          that.remove();
        }
      });
    }

    Confirm.prototype = {
      //显示
      show: function(){
        $(".mf-confirm").show();
        if(this.options.lock){
          $(".mf-mask").show();
        }
      },
      //隐藏
      hide: function(){
        $(".mf-confirm").hide();
        if(this.options.lock){
          $(".mf-mask").hide();
        }
      },
      //移除
      remove: function(){
        $(".mf-confirm").remove();
        if(this.options.lock){
          $(".mf-mask").remove();
        }
      }
    };

    //封装插件
    $.confirm = function(options){
      return new Confirm(options);
    }
})(Zepto);

//加载框
;(function($){
  //模板
  var _tpl = '<div class="mf-loading">' + 
        '<i class="loading-icon"></i>' + 
        '<p class="content"><%=content%></p>' +
    '</div>';
    //默认值
  var defaults = {
    content: "Loading",
    lock: false
  };

  //构造函数
  function Loading(options) {
    this.options = $.extend(defaults, options);
    this._init();
    return this;
  }
  //方法定义
  Loading.prototype = {
    _init: function(){
      var html = $._parseTpl(_tpl, {
        content: this.options.content
      });
      $(".mf-loading").remove();
      $("body").append(html);
      if(this.options.lock){
        $.mask();
      }
    },
    show: function(){
      $(".mf-loading").show();
      if(this.options.lock){
        $(".mf-mask").show();
      }
    },
    hide: function(){
      $(".mf-loading").hide();
      if(this.options.lock){
        $(".mf-mask").hide();
      }
    },
    remove: function(){
      $(".mf-loading").remove();
      if(this.options.lock){
        $(".mf-mask").remove();
      }
    }
  };

  $.loading = function(options){
    return new Loading(options);
  }
})(Zepto);