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
        singleImgUrls: []
    },
    onLoad: function(options) {

    },
    chooseSingleImages: function(e) {
        console.log(e)
    },
    choosePrintImages: function(e) {
        var that = this;
        console.log(e.currentTarget.dataset.type);
        var type = e.currentTarget.dataset.type;
        this.setData({
            uploadType: e.currentTarget.dataset.uploadtype
        });
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#f7982a",
            success: function(res) {
                console.log('choosePrintImages--res:', res)
                if (!res.cancel) {
                    if (res.tapIndex == 0) {
                        console.log(e.currentTarget.dataset.uploadtype);
                        that.chooseWxImage('album', e.currentTarget.dataset.type)
                    } else if (res.tapIndex == 1) {
                        that.chooseWxImage('camera', e.currentTarget.dataset.type)
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
    postMatchPrint: function() {
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
                //url: 'http://192.168.1.102:8087/tryon/userImage/shot',
                //url: 'http://192.168.1.102:8087/match/recommend/test',
                url: "http://192.168.1.116:8087/match/post/uploadPrintImages",
                header: { "Content-Type": "multipart/form-data" },
                formData: {
                    fileName: 'printImg_' + i
                },
                success: (res) => {
                    var data = res.data;
                    console.log('uploadPrintImagesResData:', data)
                }
            })
        }
        for (var i = 0; i < singleImages.length; i++) {
            var path = singleImages[i].path
            console.log('path:', path)
            wx.uploadFile({
                filePath: path,
                name: 'singleImages',
                //url: 'http://192.168.1.102:8087/tryon/userImage/shot',
                //url: 'http://192.168.1.102:8087/match/recommend/test',
                url: "http://192.168.1.116:8087/match/post/uploadSingleImages",
                header: { "Content-Type": "multipart/form-data" },
                formData: {
                    fileName: 'singleImage_' + i
                },
                success: (res) => {
                    var data = JSON.parse(res.data);
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
    input_confirm: function(e) {

    },
    // 点击发布将搭配方案上传到数据库中
    formSubmit: function(e) {
        var that = this;
        var data = e.detail.value;
        var title = data.title; // 标题
        var mainText = data.mainText; // 内容
        this.setData({
            title: title,
            mainText: mainText
        })
        console.log('form数据为：', e.detail.value)
            // 上传图片
        this.postMatchPrint();
        // 上传图片完成后，上传数据到数据库
        var printImages = that.data.printImgUrl_List; // 方案图片
        console.log("printImagessssss:", printImages[0]);
        var singleClothes = this.data.singleImgUrl_List; // 单间衣服图片
        var price = this.data.price; // 价格
        var tags = this.data.tags; // 标签
        var printData = {
            categoryId: 1,
            name: title,
            minPrice: price,
            pic: printImages[0],
            singleClothes: singleClothes,
            tags: tags
        }
        wx.request({
            url: this.data.backend_url + 'match/post/savePrintData',
            method: 'POST',
            data: {
                printData: printData
            },
            success: function(res) {
                console.log(res.data)
                that.setData({
                    clothes: res.data.data
                })
            }
        })
    },
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
        if (this.data.peice > 0) {
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