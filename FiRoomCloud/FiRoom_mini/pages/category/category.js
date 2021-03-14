
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  /*
  "pages/goods_list/index",
    "pages/goods_detail/index",
    "pages/cart/index",
    "pages/collect/index",
    "pages/order/index",
    "pages/search/index",
    "pages/user/index",
    "pages/feedback/index",
    "pages/login/index",
    "pages/auth/index",
    "pages/pay/index"
   */
  data: {
    "message":[
      {
        "cat_id":0,
        "cat_name":"汲茗",
        "cat_icon":"",
        "goodsType":[
          {
            "cat_id":0,
            "cat_name":"汲茗主打",
            "cat_icon":"",
            "children":[
              {
                "cat_id":1,
                "cat_name":"阳光白茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Hac86dc5bdf86470599e171a7196757e23.jpg"
              },
              {
                "cat_id":2,
                "cat_name":"自信黄茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Hb5f368264d0542bd9d29280274beedfdJ.jpg"
              },
              {
                "cat_id":3,
                "cat_name":"温柔红茶",
                "cat_icon":"https://ae01.alicdn.com/kf/H204c72c94c6b42088e323ef2494d6ce6W.jpg"
              },
              {
                "cat_id":5,
                "cat_name":"敏锐乌龙",
                "cat_icon":"https://ae01.alicdn.com/kf/H4db78a40a0804f3284d783fbf2965fd0y.jpg"
              },
              {   
                "cat_id":6,
                "cat_name":"理性黑茶",
                "cat_icon":"https://ae01.alicdn.com/kf/H6c6af596be3241bb8a28c67172d1b565v.jpg"
              },
              {
                "cat_id":7,
                "cat_name":"新鲜绿茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Ha6550faf841d4850969db3974a318340i.jpg"
              }
            ]
          }
        ]
      },
      {
        "cat_id":3,
        "cat_name":"普洱茶",
        "cat_icon":"",
        "goodsType":[
          {
            "cat_id":0,
            "cat_name":"侧栏3二级分类3",
            "cat_icon":"",
            "children":[
              {
                "cat_id":1,
                "cat_name":"苹果茶",
                "cat_icon":"https://ae01.alicdn.com/kf/H597ee1acffa94f81bcc85fcaf9fa0193I.jpg"
              },
              {
                "cat_id":2,
                "cat_name":"杨桃茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Heed05acfb1684c7a8fb99c428602add8r.jpg"
              },
              {
                "cat_id":3,
                "cat_name":"柠檬茶",
                "cat_icon":"https://ae01.alicdn.com/kf/H57483e4c5ec74a7b9b761ac9ae8f85ea5.jpg"
              },
              {
                "cat_id":4,
                "cat_name":"橙子茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Hcaa89a0a23a948be98a9f3e313b61c95T.jpg"
              },
              {
                "cat_id":5,
                "cat_name":"葡萄茶",
                "cat_icon":"https://ae01.alicdn.com/kf/H9e9771ec775f499ab1b18504d81a85aaC.jpg"
              },
              {   
                "cat_id":6,
                "cat_name":"雪梨茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Hfd0123ecb663434c85fc7feafde7cd04I.jpg"
              },
              {
                "cat_id":7,
                "cat_name":"红枣茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Hbd20fca4f8d945e69d55a655e8064ce8H.jpg"
              },
              {
                "cat_id":8,
                "cat_name":"奇异果茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Hb9b41ae895f341fca8169256dad058b7c.jpg"
              }
            ]
          }
        ]
      },
      {
        "cat_id":4,
        "cat_name":"黑茶",
        "cat_icon":"",
        "goodsType":[
          {
            "cat_id":0,
            "cat_name":"侧栏4二级分类4",
            "cat_icon":"",
            "children":[
              {
                "cat_id":1,
                "cat_name":"苹果茶",
                "cat_icon":"https://ae01.alicdn.com/kf/H597ee1acffa94f81bcc85fcaf9fa0193I.jpg"
              },
              {
                "cat_id":2,
                "cat_name":"杨桃茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Heed05acfb1684c7a8fb99c428602add8r.jpg"
              },
              {
                "cat_id":3,
                "cat_name":"柠檬茶",
                "cat_icon":"https://ae01.alicdn.com/kf/H57483e4c5ec74a7b9b761ac9ae8f85ea5.jpg"
              },
              {
                "cat_id":4,
                "cat_name":"橙子茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Hcaa89a0a23a948be98a9f3e313b61c95T.jpg"
              },
              {
                "cat_id":5,
                "cat_name":"葡萄茶",
                "cat_icon":"https://ae01.alicdn.com/kf/H9e9771ec775f499ab1b18504d81a85aaC.jpg"
              },
              {   
                "cat_id":6,
                "cat_name":"雪梨茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Hfd0123ecb663434c85fc7feafde7cd04I.jpg"
              },
              {
                "cat_id":7,
                "cat_name":"红枣茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Hbd20fca4f8d945e69d55a655e8064ce8H.jpg"
              },
              {
                "cat_id":8,
                "cat_name":"奇异果茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Hb9b41ae895f341fca8169256dad058b7c.jpg"
              }
            ]
          }
        ]
      },
      {
        "cat_id":5,
        "cat_name":"绿茶",
        "cat_icon":"",
        "goodsType":[
          {
            "cat_id":0,
            "cat_name":"侧栏5二级分类5",
            "cat_icon":"",
            "children":[
              {
                "cat_id":1,
                "cat_name":"苹果茶",
                "cat_icon":"https://ae01.alicdn.com/kf/H597ee1acffa94f81bcc85fcaf9fa0193I.jpg"
              },
              {
                "cat_id":2,
                "cat_name":"杨桃茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Heed05acfb1684c7a8fb99c428602add8r.jpg"
              },
              {
                "cat_id":3,
                "cat_name":"柠檬茶",
                "cat_icon":"https://ae01.alicdn.com/kf/H57483e4c5ec74a7b9b761ac9ae8f85ea5.jpg"
              },
              {
                "cat_id":4,
                "cat_name":"橙子茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Hcaa89a0a23a948be98a9f3e313b61c95T.jpg"
              },
              {
                "cat_id":5,
                "cat_name":"葡萄茶",
                "cat_icon":"https://ae01.alicdn.com/kf/H9e9771ec775f499ab1b18504d81a85aaC.jpg"
              },
              {   
                "cat_id":6,
                "cat_name":"雪梨茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Hfd0123ecb663434c85fc7feafde7cd04I.jpg"
              },
              {
                "cat_id":7,
                "cat_name":"红枣茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Hbd20fca4f8d945e69d55a655e8064ce8H.jpg"
              },
              {
                "cat_id":8,
                "cat_name":"奇异果茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Hb9b41ae895f341fca8169256dad058b7c.jpg"
              }
            ]
          }
        ]
      },
      {
        "cat_id":6,
        "cat_name":"红茶",
        "cat_icon":"",
        "goodsType":[
          {
            "cat_id":0,
            "cat_name":"侧栏6二级分类6",
            "cat_icon":"",
            "children":[
              {
                "cat_id":1,
                "cat_name":"茶三级分类1",
                "cat_icon":"../../pictrue/image_1.jpg"
              },
              {
                "cat_id":2,
                "cat_name":"茶三级分类2",
                "cat_icon":"../../pictrue/image_2.jpg"
              },
              {
                "cat_id":3,
                "cat_name":"茶三级分类3",
                "cat_icon":"../../pictrue/image_3.jpg"
              },
              {
                "cat_id":4,
                "cat_name":"茶三级分类4",
                "cat_icon":"../../pictrue/image_4.jpg"
              },
              {
                "cat_id":5,
                "cat_name":"茶三级分类5",
                "cat_icon":"../../pictrue/image_5.jpg"
              },
              {
                "cat_id":6,
                "cat_name":"茶三级分类6",
                "cat_icon":"../../pictrue/image_6.jpg"
              }
            ]
          }
        ]
      },
      {
        "cat_id":7,
        "cat_name":"白茶",
        "cat_icon":"",
        "goodsType":[
          {
            "cat_id":0,
            "cat_name":"侧栏7二级分类7",
            "cat_icon":"",
            "children":[
              {
                "cat_id":1,
                "cat_name":"苹果茶",
                "cat_icon":"https://ae01.alicdn.com/kf/H597ee1acffa94f81bcc85fcaf9fa0193I.jpg"
              },
              {
                "cat_id":2,
                "cat_name":"杨桃茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Heed05acfb1684c7a8fb99c428602add8r.jpg"
              },
              {
                "cat_id":3,
                "cat_name":"柠檬茶",
                "cat_icon":"https://ae01.alicdn.com/kf/H57483e4c5ec74a7b9b761ac9ae8f85ea5.jpg"
              },
              {
                "cat_id":4,
                "cat_name":"橙子茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Hcaa89a0a23a948be98a9f3e313b61c95T.jpg"
              },
              {
                "cat_id":5,
                "cat_name":"葡萄茶",
                "cat_icon":"https://ae01.alicdn.com/kf/H9e9771ec775f499ab1b18504d81a85aaC.jpg"
              },
              {   
                "cat_id":6,
                "cat_name":"雪梨茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Hfd0123ecb663434c85fc7feafde7cd04I.jpg"
              },
              {
                "cat_id":7,
                "cat_name":"红枣茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Hbd20fca4f8d945e69d55a655e8064ce8H.jpg"
              },
              {
                "cat_id":8,
                "cat_name":"奇异果茶",
                "cat_icon":"https://ae01.alicdn.com/kf/Hb9b41ae895f341fca8169256dad058b7c.jpg"
              }
            ]
          }
        ]
      },
      {
        "cat_id":8,
        "cat_name":"乌龙茶",
        "cat_icon":"",
        "goodsType":[
          {
            "cat_id":0,
            "cat_name":"侧栏8二级分类8",
            "cat_icon":"",
            "children":[
              {
                "cat_id":1,
                "cat_name":"茶三级分类1",
                "cat_icon":"../../pictrue/image_1.jpg"
              },
              {
                "cat_id":2,
                "cat_name":"茶三级分类2",
                "cat_icon":"../../pictrue/image_2.jpg"
              },
              {
                "cat_id":3,
                "cat_name":"茶三级分类3",
                "cat_icon":"../../pictrue/image_3.jpg"
              },
              {
                "cat_id":4,
                "cat_name":"茶三级分类4",
                "cat_icon":"../../pictrue/image_4.jpg"
              },
              {
                "cat_id":5,
                "cat_name":"茶三级分类5",
                "cat_icon":"../../pictrue/image_5.jpg"
              },
              {
                "cat_id":6,
                "cat_name":"茶三级分类6",
                "cat_icon":"../../pictrue/image_6.jpg"
              }
            ]
          }
        ]
      },
      {
        "cat_id":9,
        "cat_name":"黄茶",
        "cat_icon":"",
        "goodsType":[
          {
            "cat_id":0,
            "cat_name":"侧栏9二级分类9",
            "cat_icon":"",
            "children":[
              {
                "cat_id":1,
                "cat_name":"茶三级分类1",
                "cat_icon":"../../pictrue/image_1.jpg"
              },
              {
                "cat_id":2,
                "cat_name":"茶三级分类2",
                "cat_icon":"../../pictrue/image_2.jpg"
              },
              {
                "cat_id":3,
                "cat_name":"茶三级分类3",
                "cat_icon":"../../pictrue/image_3.jpg"
              },
              {
                "cat_id":4,
                "cat_name":"茶三级分类4",
                "cat_icon":"../../pictrue/image_4.jpg"
              },
              {
                "cat_id":5,
                "cat_name":"茶三级分类5",
                "cat_icon":"../../pictrue/image_5.jpg"
              },
              {
                "cat_id":6,
                "cat_name":"茶三级分类6",
                "cat_icon":"../../pictrue/image_6.jpg"
              }
            ]
          }
        ]
      },
      {
        "cat_id":10,
        "cat_name":"花茶",
        "cat_icon":"",
        "goodsType":[
          {
            "cat_id":0,
            "cat_name":"侧栏10二级分类10",
            "cat_icon":"",
            "children":[
              {
                "cat_id":1,
                "cat_name":"茶三级分类1",
                "cat_icon":"../../pictrue/image_1.jpg"
              },
              {
                "cat_id":2,
                "cat_name":"茶三级分类2",
                "cat_icon":"../../pictrue/image_2.jpg"
              },
              {
                "cat_id":3,
                "cat_name":"茶三级分类3",
                "cat_icon":"../../pictrue/image_3.jpg"
              },
              {
                "cat_id":4,
                "cat_name":"茶三级分类4",
                "cat_icon":"../../pictrue/image_4.jpg"
              },
              {
                "cat_id":5,
                "cat_name":"茶三级分类5",
                "cat_icon":"../../pictrue/image_5.jpg"
              },
              {
                "cat_id":6,
                "cat_name":"茶三级分类6",
                "cat_icon":"../../pictrue/image_6.jpg"
              }
            ]
          }
        ]
      }
      
    ],
    
    //左侧菜单栏数据
    leftMenuList:[],
    //右侧的商品数据
    rightContent:[],
    currentIndex:0,
    // 右侧内容的滚动条距离顶部的距离
    scrollTop:0
  },
  // 接口的返回数据
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 获取本地缓存开始
    /**
     * 0 web中的本地存储和小程序中的本地存储的区别
        1写代码的方式不一样了
          web: localStorage.setItem("key""value") localStorage.getItem("key")
          小程序中: wx.setStorageSync("key","value"); wx.getStorageSync("key");
        2:存的时候有没有做类型转换
          web:不管存入的是什么类型的数据，最终都会先调用以下toString(), 把数据变成了字符串再存入进去
          小程序:不存在类型转换的这个操作存什么类似的数据进去，获取的时候就是什么类型
     * 1 先判断本地存储中有没有旧的数据
     *  {time:Date.now(),data:[...]}
     * 2 没有旧数据 直接发送请求
     * 3 有旧的数据 同时 旧的数据没有过期 就使用本地存储中的数据
     */

     // 1 获取本地存储中的数据 (小程序中也存在本地存储技术)
     const Cates = wx.getStorageSync('cates');
     // 2 判断
     if(!Cates){
       //本地存储中不存在旧数据 发送请求获取数据
       this.getCates();
     }else{
       // 有旧的数据 判断是否过期  过期时间为10s
       if(Date.now()-Cates.time>1000*10){
         // 重新发送请求
         this.getCates();
       }else{
          // 可以使用旧的数据
          this.Cates = Cates.data;
          // 构造左侧的大菜单数据
          let leftMenuList = this.Cates;
          //构造右侧的商品数据
          let rightContent = this.Cates[0].goodsType;
          this.setData({
            leftMenuList,
            rightContent,
            // 重新设置 右侧内容的scroll-view滚动条距离顶部的距离
            scrollTop:0
          })
        }
      }
    // 获取本地缓存结束
  },

  click:function(e){
    console.log(e);
    var value = e.currentTarget.dataset.number;
    console.log(value);
    
    if(value=="阳光白茶"){
      wx.navigateTo({
        url: '/pages/custom/custom',
        success: function(res){
          console.log(res);
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }else{
      console.log("fail");
    }
  },

  getCates(){
    
    this.Cates=this.data.message;

    // 把数据存入本地内存中
    wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
    // 把数据存入本地内存中 结束
    
    console.log(this.Cates);
    // 构造左侧的大菜单数据
    let leftMenuList = this.Cates;
    //构造右侧的商品数据
    let rightContent = this.Cates[0].goodsType;
    this.setData({
      leftMenuList,
      rightContent
    })
    console.log(leftMenuList);
    //console.log(rightContent);
  },
  handleItemTap(e){
    /**
     * 1 获取被点击的标题身上的索引
     * 2 给data中的currentIndex赋值
     */
    const {index}=e.currentTarget.dataset;
    let rightContent = this.Cates[index].goodsType;
    this.setData({
      currentIndex:index,
      rightContent
    })
  },
  bindtap(){
    wx.navigateTo({
      url:'/pages/custom/custom'
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})