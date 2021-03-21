var order = ['red', 'yellow', 'blue', 'green', 'red']
const { backend_url } = require('../../utils/util.js')
var util = require('../../utils/util.js')
Page({
    data: {
        backend_url: util.backend_url,
        // backend_url: "http://192.168.1.102:8087/",
        toView: 'red',
        scrollTop: 100,
        isShow: false,
        inputLink: false,
        showRightContainer: true,
        showLeftContainer: true,
        clothes: [],
        userBodyShot: [],
        choosedData: [],
        index: 0,
        resImg: 'static/images/model_1.png',
        uploadType: '',
        chaImgSrc: ''
    },
    inputlink: function(e) {
        this.setData({
            inputLink: !this.data.inputLink
        })
    },
    input_confirm: function() {
        this.setData({
                inputLink: !this.data.inputLink
            })
            // 调用处理链接的函数
    },
    show_right_container: function() {
        this.setData({
            showRightContainer: !this.data.showRightContainer
        })
    },
    show_left_container: function() {
        this.setData({
            showLeftContainer: !this.data.showLeftContainer
        })
    },
    listClick: function(e) {
        let me = this;
        console.log(e)
        index: e.currentTarget.dataset.index;
        console.log(this.data.userBodyShot[1]['shot']);
        me.setData({
            resImg: this.data.userBodyShot[e.currentTarget.dataset.index]['shot']
        })
    },
    upper: function(e) {
        console.log(e)
    },
    lower: function(e) {
        console.log(e)
    },
    scroll: function(e) {
        console.log(e)
    },
    tap: function(e) {
        for (var i = 0; i < order.length; ++i) {
            if (order[i] === this.data.toView) {
                this.setData({
                    toView: order[i + 1]
                })
                break
            }
        }
    },
    tapMove: function(e) {
        this.setData({
            scrollTop: this.data.scrollTop + 10
        })
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
                console.log(picPath);
                if (uploadType == 'UserShot') {
                    var uploadUrl = that.data.backend_url + 'match/recommend/test'
                } else if (uploadType == 'ClothImg') {
                    var uploadUrl = that.data.backend_url + 'match/recommend/test2'
                }
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
                that.setData({
                    chaImgSrc: picPath,
                    isShow: true
                });
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
    getClothesHamber: function() {

    },
    onLoad: function() {
        var that = this;
        console.log('backend_url:', backend_url);
        wx.request({
            url: this.data.backend_url + 'tryon/clothes/basket',
            data: {
                key: 'clothesHamber'
            },
            success: function(res) {
                console.log(res.data)
                that.setData({
                    clothes: res.data.data
                })
            }
        })
        wx.request({
            url: this.data.backend_url + 'tryon/userBodyShow/images',
            data: {
                key: 'userBodyShow'
            },
            success: function(res) {
                console.log(res.data)
                that.setData({
                    userBodyShot: res.data.data
                })
            }
        })
    }
})