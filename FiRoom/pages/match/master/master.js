// pages/match/master/master.js
var util = require('../../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        backend_url: util.backend_url,
        male: true,
        masterPrint: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        var masterId = options.masterId;
        wx.request({
            url: 'http://192.168.1.116:8087/match/recommend/masterDetail?masterId=' + masterId,
            header: {
                'Content-Type': 'application/json'
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
                    masters: res.data.data[0],
                });
            }
        })
        wx.request({
            url: 'http://192.168.1.116:8087/match/recommend/masterPrint?masterId=' + masterId,
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log('masterPrint:', res.data.data);
                that.setData({
                    masterPrint: [],
                    loadingMoreHidden: true
                });
                if (res.data.code != 0 || res.data.data.length == 0) {
                    that.setData({
                        loadingMoreHidden: false,
                    });
                    return;
                }
                that.setData({
                    masterPrint: res.data.data,
                });
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})