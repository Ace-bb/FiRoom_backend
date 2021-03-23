// pages/post/postQuestion/postQuestion.js
var util = require('../../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        backend_url: util.backend_url,
        userShotImages: [],
        upImage: 'static/icons/photo.png',
        reward_price: 0,
        title: '',
        mainText: '',
        userInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        wx.getUserInfo({
            success: function(res) {
                var userInfo = res.userInfo
                var nickName = userInfo.nickName
                var avatarUrl = userInfo.avatarUrl
                var gender = userInfo.gender // 性别：0：未知、1：男、2：女
                var province = userInfo.province
                var city = userInfo.city
                var country = userInfo.country
                that.setData({
                    userInfo: userInfo
                })
                console.log('userInfo:', userInfo)
            }
        })
    },
    chooseShotImages: function(e) {
        var that = this;
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#f7982a",
            success: function(res) {
                console.log('choosePrintImages--res:', res)
                if (!res.cancel) {
                    if (res.tapIndex == 0) {
                        console.log(e.currentTarget.dataset.uploadtype);
                        that.chooseWxImage('album')
                    } else if (res.tapIndex == 1) {
                        that.chooseWxImage('camera')
                    }
                }
            }
        })
    },
    chooseWxImage: function(type) {
        var that = this;
        wx.chooseImage({
            count: 9,
            sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有  
            sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有  
            success: function(res) {
                var picPath = res.tempFiles;
                var shotImages = that.data.userShotImages;
                console.log(res);
                for (var i = 0; i < picPath.length; i++) {
                    shotImages.push(picPath[i])
                }
                console.log('shotImages:', shotImages)
                that.setData({
                    userShotImages: shotImages,
                    isShow: true
                })
            }
        })
    },
    getReward: function(e) {
        console.log(e.detail)
        this.setData({
            reward_price: e.detail.value
        })
    },
    getTitle: function(e) {
        console.log(e.detail)
        this.setData({
            title: e.detail.value
        })
    },
    getMainText: function(e) {
        console.log(e.detail)
        this.setData({
            mainText: e.detail.value
        })
    },
    postMatchPrint: function(questionId, userShotId) {
        var that = this;
        var imgPath = that.data.userShotImages;
        console.log('postMatchPrint')
        console.log('imgPath:', imgPath);
        for (var i = 0; i < imgPath.length; i++) {
            var path = imgPath[i].path;
            console.log('path:', path)
            wx.uploadFile({
                filePath: path,
                name: 'shotImages',
                //url: 'http://192.168.1.102:8087/tryon/userImage/shot',
                //url: 'http://192.168.1.102:8087/match/recommend/test',
                url: this.data.backend_url + "matchPro/post/problemShots",
                header: { "Content-Type": "multipart/form-data" },
                formData: {
                    fileName: 'shot' + i,
                    questionId: questionId,
                    userShotId: userShotId
                },
                success: (res) => {
                    var data = JSON.parse(res.data);
                    console.log('uploadPrintImagesResData:', data)
                }
            })
        }
    },
    postQuestion: function() {
        var that = this;
        var reward = this.data.reward_price;
        var title = this.data.title;
        var mainText = this.data.mainText;
        var imgList = this.data.userShotImages;
        console.log(reward);

        var userInfo = this.data.userInfo;
        console.log('userInfo;;;;', userInfo)
        wx.request({
            url: this.data.backend_url + 'matchPro/post/saveQuestionData',
            method: 'GET',
            data: {
                'reward': reward,
                'title': title,
                'mainText': mainText,
                'avatarUrl': userInfo['avatarUrl'],
                'nickName': userInfo['nickName']
            },
            success: function(res) {
                console.log(res.data)
                var questionId = res.data.questionId
                var userShotId = res.data.userShotId
                that.postMatchPrint(questionId, userShotId);
                wx.navigateTo({
                    url: '../../match/match'
                })
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