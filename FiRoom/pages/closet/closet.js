var utils = require('../../utils/util.js');
var app = getApp();

Page({

    data: {
        hidden: true,
        books: [{
            title: "T恤",
            average: 8.0,
            coverImg: "https://s3.ax1x.com/2021/01/31/yAfMf1.jpg",
            bookId: 0,
            stars: utils.starsArray(8)
        }, {
            title: "长袖T恤",
            average: 8.0,
            coverImg: "https://s3.ax1x.com/2021/01/31/yAfKYR.jpg",
            bookId: 1,
            stars: utils.starsArray(8)
        }],
        valueList:[
            {
                title:'总数量',
                value:3
            },
            {
                title:'市场总价值',
                value:'￥3665'
            },
            {
                title:'成本',
                value:'￥3665'
            },
            {
                title:'总利润',
                value:'+￥3665'
            }
        ]
    },


    onLoad: function(options) {
        var defaultUrl = app.globalData.doubanBase + '/v2/book/search?q=' + '多肉' + '&fields=id,title,rating,images&start=0&count=9';
        //utils.http(defaultUrl, this.processDoubanData);
        //this.updateData(defaultUrl);
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
    getBooksList: function(url) {
        this.setData({
            hidden: false
        });
        var that = this;
        wx.request({
            url: url,
            method: 'GET',
            header: {
                'content-type': 'application/xml'
            },
            success: function(res) {
                //console.log(res.data);
                that.processDoubanData(res.data);
            }
        })
    },

    onShareAppMessage: function() {

    }
})