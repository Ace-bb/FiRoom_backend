// pages/mine/dresserApply/dresserApply.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        identify_introduce: '达人认证是FiRoom平台鼓励原创作者创作优质内容的一种肯定,' +
            '对于原创搭配方案用户来说，是有特殊意义的的身份象征。' +
            '只要你会想、懂搭配、愿意分享、有创意，大V的荣誉就在前方等着你~',
        identify_message: '个人账号定位至关重要，认证信息会参考最贴近您个人属性的内容类型进行认证，如：校园时尚穿搭达人，商务正式穿搭达人等',
        main_factor: [{
            factor: '搭配方案内容需为原创(自己作为模特进行试穿，拍照发布方案可以快速证实内容的原创性)'
        }, {
            factor: '方案内容优质，特点鲜明，具有鲜明的个人风格和辨识度，并且收到多数认可'
        }, {
            factor: '保持账号活跃度，积极与粉丝互动和回评，积极解答他人发布的搭配问题'
        }, {
            factor: '遵守FiRoom平台规则，维护平台良好环境'
        }],
        main_condition: [{
            condition: '粉丝数≥2万'
        }, {
            condition: '搭配方案≥50'
        }, {
            condition: '搭配方案平均点赞数≥500'
        }],
        notices: [{
            notice: '系统会在5个工作日内对提交的认证进行审核，并恢复是否获得认证资格;'
        }, {
            notice: '目前认证之针对原创搭配方案作者，非原创无法通过认证;'
        }, {
            notice: '若出现粉丝刷赞等作弊行为，一经查实，此次申请则视为无效，并在三个月内无法通过认证申请;'
        }],
        showApply: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    apply_for_dresser: function(e) {
        this.setData({
            showApply: !this.data.showApply
        })
    },
    cancel_apply: function(e) {
        this.setData({
            showApply: !this.data.showApply
        })
    },
    confrim_apply: function(e) {
        this.setData({
            showApply: !this.data.showApply
        })
        wx.showToast({
            title: '提交中...',
            icon: 'loading',
            duration: 1000
        })
        setTimeout(function() {
                //要延时执行的代码
                wx.showToast({
                    title: '提交成功', // 标题
                    icon: 'success', // 图标类型，默认success
                    duration: 1500 // 提示窗停留时间，默认1500ms
                })
            }, 1000) //延迟时间 这里是2秒


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