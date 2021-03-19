var util = require('../../../../utils/util.js')
var WxParse = require('../../../../wxParse/wxParse.js');
Page({
    onShareAppMessage: function() { //分享
        var that = this
        return {
            title: '找货就上定制链商城',
            path: '/pages/index/searchpros/prodetail/prodetail?styleId=' + that.data.styleId
        }
    },
    data: {
        backend_url: util.backend_url,
        ctx: util.ctx,
        weixinCtx: util.weixinCtx,
        detailsClass: 'activedetail',
        detailsShow: true,
        attentionsClass: '',
        attentionsShow: false,
        indicatorDots: true,
        autoplay: false,
        interval: 3000,
        duration: 500,
        style: "长袖T恤",
        price: 100,
        fabric: "纯棉",
        secondNames: "修身款",
        colors: [{
            value: null,
            color_name: "蓝色"
        }],
        swipers: [],
        detailId: 1,
        MatchTitle: '',
        detail: '',
        postTime: ''
    },
    onLoad: function(option) {
        var that = this
        var styleId = option.styleId
        var current = option.current

        console.log('styleId', styleId)
        console.log('current:', current)
        util.requestSupply(current, styleId,
            function(res) {
                console.log('res', res)
                var result = res.data;
                console.log("result:", result);
                that.setData({
                    detailId: result[0].id,
                    detail: result[0].detailDescrib,
                    MatchTitle: result[0].name,
                    postTime: result[0].postTime,
                    tags: result[0].tags
                });
            },
            function(res) {
                console.log(res);
            });

        wx.request({
            url: 'http://192.168.1.116:8087/match/recommend/DetailImages',
            method: 'GET',
            data: {
                userId: styleId
            },
            header: {
                'content-type': 'multipart/x-www-form-urlencoded;charset=UTF-8'
            },
            success: function(res) {
                console.log('detailImages:', res.data.data);
                if (res.statusCode == 200 && res.data.code == "0") {
                    that.setData({
                        swipers: res.data.data
                    })
                }
            }
        })
    },
    changeIndicatorDots: function(e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function(e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function(e) {
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange: function(e) {
        this.setData({
            duration: e.detail.value
        })
    },
    showDetails: function() {
        var that = this
        that.setData({
            detailsClass: 'activedetail',
            attentionsClass: '',
            detailsShow: true,
            attentionsShow: false
        })
    },
    showAttentions: function() {
        var that = this
        that.setData({
            detailsClass: '',
            attentionsClass: 'activedetail',
            detailsShow: false,
            attentionsShow: true
        })
    },
    tobuy: function() {

    }
})