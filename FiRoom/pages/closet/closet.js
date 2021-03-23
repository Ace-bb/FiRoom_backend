var utils = require('../../utils/util.js');
var app = getApp();

Page({

    data: {
        backend_url: utils.backend_url,
        hidden: true,
        clothes: [],
        valueList: [{
                title: '总数量',
                value: 3
            },
            {
                title: '总金额',
                value: '￥3665'
            }
        ],
        categoryList: [{
            id: 0,
            name: '全部'
        }, {
            id: 1,
            name: '已购'
        }, {
            id: 2,
            name: '收藏'
        }, {
            id: 3,
            name: '上衣'
        }, {
            id: 4,
            name: '下装'
        }, {
            id: 5,
            name: '鞋子'
        }],
        activeCategoryId: 0,
        totalPrice: 0,
        totalNum: 0,
        selectedAllStatus: false,
        selectedClothes: [],
        showAddContainer: false,
        category_check: [{
            value: '已购',
            checked: false
        }, {
            value: '收藏',
            checked: false
        }, {
            value: '上衣',
            checked: false
        }, {
            value: '下装',
            checked: false
        }, {
            value: '鞋子',
            checked: false
        }],
        uploadImgUrl: '',
        checkedCategory: [],
        uploadImageTitle: '上传图片'
    },


    onLoad: function(options) {
        this.getClothList('全部')
    },

    updateData: function(url) {
        this.setData({
            hidden: false
        });
        utils.http(url, this.processDoubanData);
    },

    processDoubanData: function(bookList) {
        var books = [];
        for (var idx in bookList.books) {
            var book = bookList.books[idx];
            var title = book.title;
            var temp = {
                title: title,
                average: book.rating.average,
                coverImg: book.images.large,
                bookId: book.id,
                stars: utils.starsArray(book.rating.average)
            }
            books.push(temp);
        }
        this.setData({
            books: books,
            hidden: true
        });
    },
    //之前用来从豆瓣获取数据的方法
    getClothList: function(categoryType) {
        var that = this
        wx.request({
            url: this.data.backend_url + 'closet/clothes/basket',
            data: {
                category: categoryType
            },
            success: function(res) {
                console.log('masters:', res.data.data);
                that.setData({
                    clothes: [],
                    loadingMoreHidden: true
                });
                if (res.data.code != 0 || res.data.data.length == 0) {
                    that.setData({
                        loadingMoreHidden: false,
                    });
                    return;
                }
                that.setData({
                    clothes: res.data.data,
                    totalPrice: 0,
                    totalNum: 0
                });
            }
        })
    },
    upper: function(e) {
        console.log(e)
    },
    lower: function(e) {
        console.log(e)
    },
    scroll: function(e) {},
    tabClick: function(e) {
        console.log(this.data.categoryList[e.currentTarget.id]['name']);
        var categoryType = this.data.categoryList[e.currentTarget.id]['name'];
        this.setData({
            activeCategoryId: e.currentTarget.id
        });
        this.getClothList(categoryType);
    },
    checkboxChange: function(e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
        var checkList = e.detail.value;
        var toPrice = 0;
        var selectedCloth = [];
        for (let i = 0; i < checkList.length; i++) {
            toPrice += this.data.clothes[checkList[i]]['clothPrice']
            selectedCloth.push(this.data.clothes[checkList[i]])
        }
        this.setData({
            totalPrice: toPrice,
            totalNum: checkList.length,
            selectedClothes: selectedCloth
        })
    },
    checkAll: function(e) {
        var that = this;
        var carts = this.data.clothes;
        var selectedAllStatus = !this.data.selectedAllStatus
        console.log('selectAll', selectedAllStatus)
        var totalPrice = 0
        var selectedCloth = [];
        for (let i = 0; i < carts.length; i++) {
            totalPrice += carts[i].clothPrice;
            carts[i]['checked'] = selectedAllStatus
        }
        console.log('carts:', carts)
        if (selectedAllStatus) {
            this.setData({
                clothes: carts,
                selectedAllStatus: selectedAllStatus,
                totalNum: carts.length,
                totalPrice: totalPrice,
                selectedClothes: carts
            })
        } else {
            this.setData({
                clothes: carts,
                selectedAllStatus: 0,
                totalNum: 0,
                totalPrice: 0,
                selectedClothes: []
            })
        }
    },
    addToTryonBasket: function(e) {
        var cloth_list = this.data.selectedClothes;
        var that = this
        for (let i = 0; i < cloth_list.length; i++) {

        }
        wx.request({
            url: that.data.backend_url + 'closet/clothes/addToBasket',
            data: {
                clothes: cloth_list
            },
            success: function(res) {
                console.log('masters:', res.data.data);
            }
        })
    },
    addClothToCloset: function(e) {
        this.setData({
            showAddContainer: !this.data.showAddContainer
        })
    },
    cancelForm: function() {
        this.setData({
            showAddContainer: !this.data.showAddContainer
        })
    },
    categoryboxChange: function(e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
        this.data.checkedCategory = e.detail.value
    },
    chooseClothImage: function(e) {
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
                console.log(picPath);
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
                that.setData({
                    uploadImgUrl: picPath,
                    isShow: true,
                    uploadImageTitle: '上传成功'
                });
                //图片上传到定制链服务器进行款式搜索

            }
        })
    },
    formSubmit: function(e) {
        var that = this
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        var formData = e.detail.value;
        var clothName = formData.clothName;
        var clothPrice = formData.clothPrice;
        var clothStyle = formData.clothStyle;
        console.log(that.data.checkedCategory)
        wx.uploadFile({
            filePath: that.data.uploadImgUrl,
            name: 'uploadCloth',
            url: that.data.backend_url + 'closet/clothes/uploadCloth',
            header: { "Content-Type": "multipart/form-data" },
            formData: {
                fileName: 'clothes',
                clothName: clothName,
                clothPrice: clothPrice,
                clothStyle: clothStyle,
                category: JSON.stringify(that.data.checkedCategory)
            },
            success: (res) => {
                console.log("res");
                const data = JSON.parse(res.data);
                console.log(data);
            }
        })
        that.setData({
            showAddContainer: !that.data.showAddContainer,
            activeCategoryId: 0
        })
        this.getClothList('全部');
    },

    onShareAppMessage: function() {

    },
    onShow: function() {
        // 页面显示

    }
})