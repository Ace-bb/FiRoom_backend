var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
    data: {
        toView: 'red',
        scrollTop: 100
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
    chooseImageTap: function() {
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
    chooseWxImage: function(type) {
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
    }
})