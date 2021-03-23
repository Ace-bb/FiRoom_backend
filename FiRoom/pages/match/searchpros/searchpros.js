var util = require('../../../utils/util.js')
var page = 1
var app = getApp()

//获取款式信息列表
var GetList = function(that) {
    console.log('getList:', that)
    page = 1
    that.setData({
        hidden: false,
        scrollTop: 0
    });
    var style = that.data.styleName,
        method = that.data.method;

    wx.request({
        url: that.data.backend_url + 'match/search/searchMatch', //method为方法名,params为参数
        method: "GET",
        data: {
            method: method,
            style: style,
            pageNumber: page
        },
        header: {
            'content-type': 'multipart/x-www-form-urlencoded;charset=UTF-8'
        },
        success: function(res) {
            console.log('searchRes:', res.data.resSearchList);
            var resList = res.data.resSearchList
            that.setData({
                list: resList
            })
            if (res.statusCode == 200 && res.data.code == "0") {
                typeof success == "function" && success(res.data);
            } else {
                typeof fail == "function" && fail(res.data.message);
            }
        },
        fail: function(res) {
            console.log('searchRes:', res);
            typeof fail == "function" && fail(res);
        }
    })
}

//上拉获取更多款式信息
var loadMore = function(that) {
    var style = that.data.styleName,
        image = that.data.imageUrl,
        params, method = that.data.method,
        productId = that.data.productId;

    if (productId != null) {
        params = "?id=" + productId + "&pageNumber=" + page;
    } else {
        params = "?style=" + style + "&picture=" + image + "&pageNumber=" + page;
    }
    util.requestSupply(method, params,
        function(res) {
            var scrollHeight = that.data.scrollHeight,
                scrollTop = that.data.scrollTop;
            var reqList = res.pageResults.list;
            if (reqList != null && reqList.length > 0) {
                var listNew = that.data.list.concat(reqList);

                that.setData({
                    list: listNew,
                    hasMore: true,
                    emptyShow: false
                });
                page++;
            } else {
                that.setData({
                    hasMore: false
                });
            }
        },
        function(res) {
            console.log(res);
        });
}

Page({
    onShareAppMessage: function() { //分享
        return {
            title: 'FiRoom 量身定制，眼见为实',
            path: '/pages/index/searchpros/searchpros?style=&imageUrl=&chaImgSrc='
        }
    },
    data: {
        backend_url: util.backend_url,
        ctx: util.ctx,
        weixinCtx: util.weixinCtx,
        isShow: false,
        emptyShow: false,
        hasMore: true,
        styleName: '',
        imageUrl: '',
        method: 'searchStyle',
        productId: null,
        hidden: true,
        scrollTop: 0,
        scrollHeight: 0,
        list: [],
        open: false,
        mark: 0,
        newmark: 0,
        istoright: true,
        categoryList: [{
            categoryId: 1,
            categoryName: "搭配达人"
        }, {
            categoryId: 2,
            categoryName: "穿搭大师"
        }, {
            categoryId: 3,
            categoryName: "日系穿搭"
        }, {
            categoryId: 4,
            categoryName: "欧美范儿"
        }, {
            categoryId: 5,
            categoryName: "潮流复古"
        }, {
            categoryId: 6,
            categoryName: "休闲时尚"
        }]
    },

    // 获取页面传递的参数，option中
    onLoad: function(option) {
        var that = this;
        console.log('option:', option)
        wx.getSystemInfo({
            success: function(res) {
                console.log('getSystemInfo:', res)
                that.setData({
                    scrollHeight: res.windowHeight
                });
            }
        });
        if (option.id != undefined) { //从产品分类点击
            that.setData({
                styleName: option.style,
                method: 'getProductDetail',
                productId: option.id
            })
        } else { //点击历史记录和直接搜索
            that.setData({
                styleName: option.style,
                method: 'searchPrint'
            })
        }

        GetList(that);
    },
    bindDownLoad: function() {
        //  该方法绑定了页面滑动到底部的事件
        var that = this
            //图片搜索不进行上拉加载请求
        var image = that.data.imageUrl
        if (image != '') {
            that.setData({
                hasMore: false
            });
            return;
        } else {
            that.setData({
                hasMore: true
            });
        }
        loadMore(that);
    },
    scroll: function(event) {
        //  该方法绑定了页面滚动时的事件，这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
        this.setData({
            scrollTop: event.detail.scrollTop
        });
    },
    styleName: function(e) {
        this.setData({
            styleName: e.detail.value
        })
    },
    // 搜索框搜索
    searchStyle: function(e) {
        page = 1;
        var that = this;
        var style = that.data.styleName,
            image = that.data.imageUrl,
            show = that.data.isShow;
        if (!show) { //如果图片被X掉则置空
            image = ''
            that.setData({
                imageUrl: ''
            })
        }
        that.setData({
            list: [],
            scrollTop: 0,
            productId: null,
            hasMore: true,
            hidden: false,
            emptyShow: false,
            method: 'searchStyle'
        })

        //保存搜索记录
        if (style != null && style != '') {
            var searchStyle = wx.getStorageSync('searchStyle') || []
            searchStyle.unshift(style)
            wx.setStorageSync('searchStyle', util.getArray(searchStyle))
        }

        util.requestSupply("searchStyle", "?style=" + style + "&picture=" + image + "&pageNumber=" + page, function(res) {
                var reqList = res.pageResults.list;
                if (reqList != null && reqList.length > 0) {
                    that.setData({
                        list: reqList,
                        emptyShow: false
                    });
                    page = 2;
                } else {
                    that.setData({
                        list: [],
                        emptyShow: true
                    });
                }
                that.setData({
                    hidden: true
                })
            }),
            function(res) {
                console.log(res)
            }
    },
    tap_ch: function(e) {
        if (this.data.open) {
            this.setData({
                open: false
            });
        } else {
            this.setData({
                open: true
            });
        }
    },
    tap_start: function(e) {
        // touchstart事件
        this.data.mark = this.data.newmark = e.touches[0].pageX;
    },
    tap_drag: function(e) {
        // touchmove事件

        /*
         * 手指从左向右移动
         * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
         */
        this.data.newmark = e.touches[0].pageX;
        if (this.data.mark < this.data.newmark) {
            this.istoright = true;
        }
        /*
         * 手指从右向左移动
         * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
         */
        if (this.data.mark > this.data.newmark) {
            this.istoright = false;

        }
        this.data.mark = this.data.newmark;

    },
    tap_end: function(e) {
        // touchend事件
        this.data.mark = 0;
        this.data.newmark = 0;
        if (this.istoright) {
            this.setData({
                open: true
            });
        } else {
            this.setData({
                open: false
            });
        }
    }

})