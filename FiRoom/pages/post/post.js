
var app = getApp();

Page({
  data:{
    imageUpload:[
      {
        picUrl:'http://127.0.0.1:8087/static/BluePrintImage/recommand/recomand1.jpg'
      },
      {
        picUrl:'http://127.0.0.1:8087/static/BluePrintImage/recommand/recomand2.jpg'
      },
      {
        picUrl:'http://127.0.0.1:8087/static/BluePrintImage/recommand/recommand3.jpg'
      },
      {
        picUrl:'http://127.0.0.1:8087/static/BluePrintImage/recommand/recommand4.jpg'
      }
    ],
    simgleCloth_list:[
      {
        picUrl:'http://127.0.0.1:8087/static/BluePrintImage/recommand/recomand1.jpg'
      },
      {
        picUrl:'http://127.0.0.1:8087/static/BluePrintImage/recommand/recomand2.jpg'
      },
      {
        picUrl:'http://127.0.0.1:8087/static/BluePrintImage/recommand/recommand3.jpg'
      },
      {
        picUrl:'http://127.0.0.1:8087/static/BluePrintImage/recommand/recommand4.jpg'
      }
    ],
    upImage:'http://127.0.0.1:8087/static/icons/photo.png'
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})