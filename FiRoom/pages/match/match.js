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
        backend_url: util.backend_url,
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
        coupons: [],
        matchOrAsk: false,
        questions: [],
        masters: [],
        isUnswered: false,
        goodsPage: 1,
        masterPage: 1,
        questionPage: 1
    },

    tabClick: function(e) {
        console.log(e.currentTarget.id);
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
    naviPost: function(e) {
        console.log(this.data.activeCategoryId)
        if (this.data.activeCategoryId == 0 || this.data.activeCategoryId == 1) {
            wx.navigateTo({
                url: '../post/post'
            })
        } else {
            wx.navigateTo({
                url: '../post/postQuestion/postQuestion'
            })
        }
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
        console.log(util.backend_url)
        wx.login({
            success: function(e) {
                console.log(e)
            }
        })

        wx.setNavigationBarTitle({
            title: wx.getStorageSync('mallName')
        })

        wx.request({
            url: this.data.backend_url + 'match/recommend/swiper',
            data: {
                key: 'mallName'
            },
            success: function(res) {
                console.log(res.data)
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
            url: this.data.backend_url + 'match/recommend/category',
            success: function(res) {
                console.log(res);
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
                that.getGoodsList(1);
                that.getMastersList(1);
                that.getQuestionList(1);
            }
        })
        that.getCoupons();
        that.getNotice();
    },
    styleName: function(e) { // -
        console.log(e.detail.value)
        this.setData({
            styleName: e.detail.value
        })
    },
    searchStyle: function(e) { // -
        var that = this
        var style = that.data.styleName;
        wx.navigateTo({
                url: 'searchpros/searchpros?style=' + style
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
    getGoodsList: function(pageNum) {
        if (pageNum == 0) {
            pageNum = 1;
        }
        console.log('pageNum:', pageNum)
        var that = this;
        wx.request({
            url: this.data.backend_url + 'match/recommend/blueprint',
            data: {
                pageNum: pageNum
            },
            success: function(res) {
                console.log('blueprint:', res.data);
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


    },
    getMastersList: function(pageNumber) {
        var that = this;
        wx.request({
            url: this.data.backend_url + 'match/recommend/masters',
            data: {
                pageNum: pageNumber
            },
            success: function(res) {
                console.log('masters:', res.data.data);
                that.setData({
                    masters: [],
                    loadingMoreHidden: true
                });
                if (res.data.code != 0 || res.data.data.length == 0) {
                    that.setData({
                        loadingMoreHidden: false,
                    });
                    return;
                }
                that.setData({
                    masters: res.data.data,
                });
            }
        })
    },
    getQuestionList: function(pageNum) {
        var that = this;
        wx.request({
            url: this.data.backend_url + 'matchPro/problem/state',
            data: {
                pageNum: pageNum
            },
            success: function(res) {
                console.log('questions:', res.data.data);
                that.setData({
                    questions: [],
                    loadingMoreHidden: true,
                    userId: 1
                });
                if (res.data.code != 0 || res.data.data.length == 0) {
                    that.setData({
                        loadingMoreHidden: false,
                    });
                    return;
                }
                that.setData({
                    questions: res.data.data,
                });
            }
        })
    },
    loadMoreItems: function(e) {
        console.log(e.currentTarget.dataset.type)
        var type = e.currentTarget.dataset.type

        if (type == 'dresserPrint') {
            var goodsPage = this.data.goodsPage + 1
            this.setData({
                goodsPage: goodsPage
            })
            this.getGoodsList(goodsPage)
        } else if (type == 'masterPrint') {
            var masterPage = this.data.masterPage + 1
            this.setData({
                masterPage: masterPage
            })
            this.getMastersList(masterPage)
        } else if (type == 'question') {
            var questionPage = this.data.questionPage + 1
            this.setData({
                questionPage: questionPage
            })
            this.getQuestionList(questionPage)
        }
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
            url: 'http://127.0.0.1:8087/match/recommend/notice',
            data: { pageSize: 5 },
            success: function(res) {
                console.log('getNotice')
                console.log(res.data.data)
                if (res.data.code == 0) {
                    that.setData({
                        noticeList: res.data.data
                    });
                }
            }
        })
    },
    navigateToPost: function() {
        wx.navigateTo({
            url: 'pages/post/post',
        })
    }
})