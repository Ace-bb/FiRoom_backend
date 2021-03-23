import resource from '../../lib/resource';

const app = getApp();

Page({
    data: {
        userInfo: {},
        order: {
            icon: 'images/order.png',
            text: '我的试衣',
            tip: '',
            url: '../orders/orders?t=all'
        },
        // 收货数量
        orderBadge: {
            unpaid: 0,
            undelivered: 0,
            unreceived: 0
        },
        orderCell: [{
            icon: 'images/record.png',
            text: '我的发布',
            url: '../orders/orders?t=unpaid',
            class: 'order-cell-icon-small'
        }, {
            icon: 'images/like.png',
            text: '我的收藏',
            url: '../orders/orders?t=undelivered',
            class: 'order-cell-icon-small',
        }, {
            icon: 'images/match.png',
            text: '穿搭',
            url: '../orders/orders?t=unreceived',
            class: 'order-cell-icon-big'
        }],
        list: [{
            icon: 'images/person.png',
            text: '个人信息',
            tip: '',
            cut: true,
            url: 'userHome/userHome'
        }, {
            icon: 'images/dresser.png',
            text: '申请成为达人',
            tip: '',
            cut: true,
            url: '../mine/dresserApply/dresserApply'
        }, {
            icon: 'images/master.png',
            text: '大师认证',
            tip: '',
            cut: true,
            url: '../mine/masterApply/masterApply'
        }, {
            icon: 'images/tel.png',
            text: '客服电话',
            tip: '13488223385',
        }, {
            icon: 'images/feedback.png',
            text: '意见反馈',
            tip: '',
            cut: true,
            url: 'feedback/feedback'
        }, {
            icon: 'images/about.png',
            text: '关于商城',
            tip: '',
            url: 'about/about'
        }]
    },
    countOrder(orderList) {
        /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
        this.orderBadge = { unpaid: 0, undelivered: 0, unreceived: 0 };

        for (let i = orderList.length - 1; i >= 0; i--) {
            switch (orderList[i].order_status) {
                case '待支付':
                    this.orderBadge.unpaid += 1;
                    break;
                case '待发货':
                    this.orderBadge.undelivered += 1;
                    break;
                case '待收货':
                    this.orderBadge.unreceived += 1;
                    break;
                default:
                    break;
            }
        }
        this.data.orderCell[0].count = this.orderBadge.unpaid;
        this.data.orderCell[1].count = this.orderBadge.undelivered;
        this.data.orderCell[2].count = this.orderBadge.unreceived;
        this.setData({
            orderBadge: this.orderBadge,
            orderCell: this.data.orderCell
        });
    },
    //点击触发
    onShow() {
        resource.fetchOrderList().then((res) => {
            const orderList = res.data;
            this.countOrder(orderList);
        });
        this.setData({
            userInfo: app.globalData.userInfo
        });
    },
    onLoad() {
        this.setData({
            userInfo: app.globalData.userInfo
        });
        // 订单列表
        resource.fetchOrderList().then((res) => {
            console.log(233);
            console.log(res);
            const orderList = res.data;
            this.countOrder(orderList);
        });
    },
    navigateTo(e) {
        const url = e.currentTarget.dataset.url;
        if (e.currentTarget.dataset.urlType) {
            wx.navigateTo({
                url: 'user-info/user-info'
            });
        } else {
            if (url === undefined) {
                wx.makePhoneCall({
                    phoneNumber: e.currentTarget.dataset.tip
                });
            } else {
                wx.navigateTo({
                    url
                });
            }
        }
    }
});