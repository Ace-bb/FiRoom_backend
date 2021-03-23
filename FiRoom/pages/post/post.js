var app = getApp();
var util = require('../../utils/util.js')
Page({
    data: {
        backend_url: util.backend_url,
        imageUpload: [],
        simgleCloth_list: [],
        upImage: 'static/icons/photo.png',
        tags: [],
        singleImages: [],
        showTagInputView: false,
        price: 10,
        title: '',
        mainText: '',
        printImgUrl_List: [],
        singleImgUrl_List: [],
        printImgUrls: [],
        singleImgUrls: [],
        userInfo: []
    },
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
            }
        })
    },
    chooseSingleImages: function(e) {
        console.log(e)
    },
    choosePrintImages: function(e) {
        var that = this;
        console.log(e.currentTarget.dataset);
        var type = e.currentTarget.dataset.type;
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#f7982a",
            success: function(res) {
                console.log('choosePrintImages--res:', res)
                if (!res.cancel) {
                    if (res.tapIndex == 0) {
                        that.chooseWxImage('album', type)
                    } else if (res.tapIndex == 1) {
                        that.chooseWxImage('camera', type)
                    }
                }
            }
        })
    },
    chooseWxImage: function(type, uploadType) {
        var that = this;
        console.log(uploadType)
        wx.chooseImage({
            count: 9,
            sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有  
            sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有  
            success: function(res) {
                var picPath = res.tempFiles;
                var printImages = that.data.imageUpload;
                var singleImages = that.data.singleImages;
                console.log(res);
                if (uploadType == 'printImages') {
                    for (var i = 0; i < picPath.length; i++) {
                        printImages.push(picPath[i])
                    }
                    console.log('printImages:', printImages)
                    that.setData({
                        imageUpload: printImages,
                        isShow: true
                    })
                } else if (uploadType == 'single') {
                    for (var i = 0; i < picPath.length; i++) {
                        singleImages.push(picPath[i])
                    }
                    console.log('singleImages:', singleImages)
                    that.setData({
                        singleImages: singleImages,
                        isShow: true
                    })
                }
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  

                //图片上传到定制链服务器进行款式搜索

            }
        })
    },
    // 上传照片函数
    postMatchPrint: function(printId, compriseImageId) {
        var that = this;
        var imgPath = that.data.imageUpload;
        var singleImages = that.data.singleImages;
        console.log('imgPath:', imgPath);
        for (var i = 0; i < imgPath.length; i++) {
            var path = imgPath[i].path;
            console.log('path:', path)
            wx.uploadFile({
                filePath: path,
                name: 'printImages',
                url: "http://192.168.1.116:8087/match/post/uploadPrintImages",
                header: { "Content-Type": "multipart/form-data" },
                formData: {
                    fileName: 'printImg_',
                    printId: printId
                },
                success: (res) => {
                    var data = res.data;
                    console.log('uploadPrintImagesResData:', data);
                }
            })
        }
        for (var i = 0; i < singleImages.length; i++) {
            var path = singleImages[i].path
            console.log('path:', path)
            wx.uploadFile({
                filePath: path,
                name: 'singleImages',
                url: "http://192.168.1.116:8087/match/post/uploadSingleImages",
                header: { "Content-Type": "multipart/form-data" },
                formData: {
                    fileName: 'singleImage_' + i,
                    printId: printId,
                    compriseImageId: compriseImageId
                },
                success: (res) => {
                    //var data = JSON.parse();
                    var data = res.data;
                    var resPath = that.data.singleImgUrl_List;
                    console.log('upload_single_images_res_data:', data)
                }
            })
        }
    },
    showTagInput: function() {
        this.setData({
            showTagInputView: !this.data.showTagInputView
        })
    },
    // 点击发布将搭配方案上传到数据库中
    formSubmit: function(e) {
        var that = this;
        var title = this.data.title; // 标题
        var mainText = this.data.mainText; // 内容
        this.setData({
            title: title,
            mainText: mainText
        })
        console.log('form数据为：', e.detail.value)
        var printImages = that.data.printImgUrl_List; // 方案图片
        console.log("printImagessssss:", printImages[0]);
        var singleClothes = this.data.singleImgUrl_List; // 单间衣服图片
        var price = this.data.price; // 价格
        var tags = this.data.tags; // 标签
        var mainText = this.data.mainText;
        var coverUrl = this.data.imageUpload[0];
        console.log('coverUrl', coverUrl)
        var printData = {
            mainText: mainText,
            name: title,
            minPrice: price,
            coverUrl: coverUrl,
            tags: tags,
            authorName: that.data.userInfo.nickName,
            avatarUrl: that.data.userInfo.avatarUrl
        }
        wx.request({
            url: this.data.backend_url + 'match/post/savePrintData',
            method: 'POST',
            data: {
                printData: printData
            },
            success: function(res) {
                console.log(res.data);
                var printId = res.data.printId;
                var compriseImageId = res.data.compriseImageId;
                that.postMatchPrint(printId, compriseImageId)
            }
        })
    },
    // 获取输入的标签内容
    tagsSubmit: function(e) {
        var that = this;
        console.log(that.data.tags);
        var temp = that.data.tags;
        temp.push(e.detail.value);
        that.setData({
            showTagInputView: !that.data.showTagInputView,
            tags: temp
        })
        console.log("tags:", that.data.tags)
        console.log('form数据为：', e.detail.value)
    },
    formReset: function() {
        console.log('form发生了reset事件')
    },
    tagsReset: function() {
        console.log('form发生了reset事件')
    },
    plusPrince: function() {
        if (this.data.price > 0) {
            this.setData({
                price: this.data.price - 1
            })
        }
    },
    addPrince: function() {
        this.setData({
            price: this.data.price + 1
        })
    },
    getTitle: function(e) {
        console.log(e.detail.value)
        this.setData({
            title: e.detail.value
        })
    },
    getMainText: function(e) {
        console.log(e.detail.value)
        this.setData({
            mainText: e.detail.value
        })
    },
    input_confirm: function(e) {
        console.log(e)
    },
    onReady: function() {
        // 页面渲染完成
    },
    onShow: function() {
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    }
})