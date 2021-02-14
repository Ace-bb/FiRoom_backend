//index.js
var util = require('../../utils/util.js')
var app = getApp()

Page({
    onShareAppMessage: function() { //分享
        return {
            title: '找货就上定制链商城',
            path: '/pages/index/index'
        }
    },
    data: {
        ctx: util.ctx,
        weixinCtx: util.weixinCtx,
        chaImgSrc: '',
        isShow: false,
        styleName: '', // -
        imageUrl: '',
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        loadingHidden: false, // loading
        userInfo: {},
        swiperCurrent: 0,
        selectCurrent: 0,
        categories: [],
        activeCategoryId: 0,
        goods: [],
        scrollTop: "0",
        loadingMoreHidden: true,

        hasNoCoupons: true,
        coupons: []
    },

    tabClick: function(e) {
        this.setData({
            activeCategoryId: e.currentTarget.id
        });
        this.getGoodsList(this.data.activeCategoryId);
    },
    //事件处理函数
    swiperchange: function(e) {
        //console.log(e.detail.current)
        this.setData({
            swiperCurrent: e.detail.current
        })
    },
    toDetailsTap: function(e) {
        wx.navigateTo({
            url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
        })
    },
    tapBanner: function(e) {
        if (e.currentTarget.dataset.id != 0) {
            wx.navigateTo({
                url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
            })
        }
    },
    bindTypeTap: function(e) {
        this.setData({
            selectCurrent: e.index
        })
    },
    scroll: function(e) {
        //  console.log(e) ;
        var that = this,
            scrollTop = that.data.scrollTop;
        that.setData({
                scrollTop: e.detail.scrollTop
            })
            // console.log('e.detail.scrollTop:'+e.detail.scrollTop) ;
            // console.log('scrollTop:'+scrollTop)
    },
    onLoad: function() {
        var that = this;

        wx.login({
            success: function(e) {
                console.log(e)
            }
        })

        wx.setNavigationBarTitle({
            title: wx.getStorageSync('mallName')
        })

        util.requestSupply("getSupplierProduct", "",
            function(res) {
                that.setData({
                    productSorts: res.results
                });
            },
            function(res) {
                console.log(res);
            });

        wx.request({
            url: 'https://api.it120.cc/' + app.globalData.subDomain + '/banner/list',
            data: {
                key: 'mallName'
            },
            success: function(res) {
                if (res.data.code == 404) {
                    wx.showModal({
                        title: '提示',
                        content: '请在后台添加 banner 轮播图片',
                        showCancel: false
                    })
                } else {
                    that.setData({
                        banners: res.data.data
                    });
                }
            }
        })
        wx.request({
            url: 'https://api.it120.cc/' + app.globalData.subDomain + '/shop/goods/category/all',
            success: function(res) {
                var categories = [{ id: 0, name: "全部" }];
                if (res.data.code == 0) {
                    for (var i = 0; i < res.data.data.length; i++) {
                        categories.push(res.data.data[i]);
                    }
                }
                that.setData({
                    categories: categories,
                    activeCategoryId: 0
                });
                that.getGoodsList(0);
            }
        })

        that.getCoupons();
        that.getNotice();
    },
    onShow: function() { // -
        //调用API从本地缓存中获取数据
        this.setData({
            history: wx.getStorageSync('searchStyle') || []
        })
    },
    styleName: function(e) { // -
        this.setData({
            styleName: e.detail.value
        })
    },
    searchStyle: function(e) { // -
        var that = this
        var style = that.data.styleName,
            image = that.data.imageUrl,
            chaImgSrc = that.data.chaImgSrc;
        wx.navigateTo({
                url: 'searchpros/searchpros?style=' + style + '&imageUrl=' + image + '&chaImgSrc=' + chaImgSrc
            })
            //保存搜索记录
        if (style != null && style != '') {
            var searchStyle = wx.getStorageSync('searchStyle') || []
            searchStyle.unshift(style)

            wx.setStorageSync('searchStyle', util.getArray(searchStyle))
        }

    },
    chooseImageTap: function() { // -
        var that = this;
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#f7982a",
            success: function(res) {
                if (!res.cancel) {
                    if (res.tapIndex == 0) {
                        that.chooseWxImage('album')
                    } else if (res.tapIndex == 1) {
                        that.chooseWxImage('camera')
                    }
                }
            }
        })
    },
    chooseWxImage: function(type) { // -
        var that = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有  
            sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有  
            success: function(res) {
                var picPath = res.tempFilePaths[0];
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
                that.setData({
                        chaImgSrc: picPath,
                        isShow: true
                    })
                    //图片上传到定制链服务器进行款式搜索
                util.uploadFile(picPath,
                    function(path) { //path为定制链图片链接
                        that.setData({
                            imageUrl: path
                        })
                        var style = that.data.styleName
                        wx.navigateTo({
                            url: 'searchpros/searchpros?style=' + style + '&imageUrl=' + path + '&chaImgSrc=' + picPath
                        })
                    })
            }
        })
    },
    deleteImage: function() { // -
        this.setData({
            isShow: false,
            imageUrl: '',
            chaImgSrc: ''
        })
    },
    getGoodsList: function(categoryId) {
        if (categoryId == 0) {
            categoryId = "";
        }
        console.log(categoryId)
        var that = this;
        wx.request({
            url: 'https://api.it120.cc/' + app.globalData.subDomain + '/shop/goods/list',
            data: {
                categoryId: categoryId
            },
            success: function(res) {
                that.setData({
                    goods: [],
                    loadingMoreHidden: true
                });
                var goods = [];
                if (res.data.code != 0 || res.data.data.length == 0) {
                    that.setData({
                        loadingMoreHidden: false,
                    });
                    return;
                }
                for (var i = 0; i < res.data.data.length; i++) {
                    goods.push(res.data.data[i]);
                }
                that.setData({
                    goods: goods,
                });
            }
        })
        wx.request({
            url: 'http://127.0.0.1:8087/match/orders/',
            success: function(res) {
                console.log(res);
            }
        })
    },
    getCoupons: function() {
        var that = this;
        wx.request({
            url: 'https://api.it120.cc/' + app.globalData.subDomain + '/discounts/coupons',
            data: {
                type: ''
            },
            success: function(res) {
                if (res.data.code == 0) {
                    that.setData({
                        hasNoCoupons: false,
                        coupons: res.data.data
                    });
                }
            }
        })
    },
    gitCoupon: function(e) {
        var that = this;
        wx.request({
            url: 'https://api.it120.cc/' + app.globalData.subDomain + '/discounts/fetch',
            data: {
                id: e.currentTarget.dataset.id,
                token: app.globalData.token
            },
            success: function(res) {
                if (res.data.code == 20001 || res.data.code == 20002) {
                    wx.showModal({
                        title: '错误',
                        content: '来晚了',
                        showCancel: false
                    })
                    return;
                }
                if (res.data.code == 20003) {
                    wx.showModal({
                        title: '错误',
                        content: '你领过了，别贪心哦~',
                        showCancel: false
                    })
                    return;
                }
                if (res.data.code == 30001) {
                    wx.showModal({
                        title: '错误',
                        content: '您的积分不足',
                        showCancel: false
                    })
                    return;
                }
                if (res.data.code == 20004) {
                    wx.showModal({
                        title: '错误',
                        content: '已过期~',
                        showCancel: false
                    })
                    return;
                }
                if (res.data.code == 0) {
                    wx.showToast({
                        title: '领取成功，赶紧去下单吧~',
                        icon: 'success',
                        duration: 2000
                    })
                } else {
                    wx.showModal({
                        title: '错误',
                        content: res.data.msg,
                        showCancel: false
                    })
                }
            }
        })
    },
    onShareAppMessage: function() {
        return {
            title: wx.getStorageSync('mallName') + '——' + app.globalData.shareProfile,
            path: '/pages/index/index',
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        }
    },
    getNotice: function() {
        var that = this;
        wx.request({
            url: 'https://api.it120.cc/' + app.globalData.subDomain + '/notice/list',
            data: { pageSize: 5 },
            success: function(res) {
                if (res.data.code == 0) {
                    that.setData({
                        noticeList: res.data.data
                    });
                }
            }
        })
    }
})