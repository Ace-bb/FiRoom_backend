// pages/mine/masterApply/masterIdentify/mastereIdentify.js
var util = require('../../../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        backend_url: util.backend_url
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    chooseImageTap: function(e) {
        var that = this;
        console.log(e.currentTarget.dataset.uploadtype);
        this.setData({
            uploadType: e.currentTarget.dataset.uploadtype
        });
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#f7982a",
            success: function(res) {
                if (!res.cancel) {
                    if (res.tapIndex == 0) {
                        console.log(e.currentTarget.dataset.uploadtype);
                        that.chooseWxImage('album', e.currentTarget.dataset.uploadtype)
                    } else if (res.tapIndex == 1) {
                        that.chooseWxImage('camera', e.currentTarget.dataset.uploadtype)
                    }
                }
            }
        })
    },
    chooseWxImage: function(type, uploadType) {
        var that = this;
        console.log(uploadType)
        wx.chooseImage({
            count: 1,
            sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有  
            sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有  
            success: function(res) {
                var picPath = res.tempFilePaths[0];
                console.log(res);
                var uploadUrl = this.data.backend_url + 'users/masterIdentify/uploadCertification'
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
                that.setData({
                        certificateImgUrl: picPath,
                        isShow: true,
                        haveUpload: true
                    })
                    //图片上传到定制链服务器进行款式搜索
                wx.uploadFile({
                    filePath: picPath,
                    name: 'name',
                    //url: 'http://192.168.1.102:8087/tryon/userImage/shot',
                    //url: 'http://192.168.1.102:8087/match/recommend/test',
                    url: uploadUrl,
                    header: { "Content-Type": "multipart/form-data" },
                    formData: {
                        type: uploadType
                    },
                    success: (res) => {
                        console.log("res")
                        const data = JSON.parse(res.data)
                        console.log(res)
                    }
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