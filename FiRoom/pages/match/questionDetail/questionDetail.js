// pages/match/questionDetail/questionDetail.js
var util = require('../../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        backend_url: util.backend_url,
        questions: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        var userId = options.userId;
        console.log(options.userId)
        wx.request({
            url: this.data.backend_url + 'matchPro/problem/stateDetail',
            data: {
                userId: userId
            },
            success: function(res) {
                console.log('questions:', res.data.data);
                that.setData({
                    questions: [],
                    loadingMoreHidden: true
                });
                if (res.data.code != 0 || res.data.data.length == 0) {
                    that.setData({
                        loadingMoreHidden: false,
                    });
                    return;
                }
                that.setData({
                    questions: res.data.data[0],
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