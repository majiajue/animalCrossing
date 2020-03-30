const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    
    gridCol:3,
    skin: false,

    appId: "wx8abaf00ee8c3202e",
    extraData: {
      // 把1221数字换成你的产品ID，否则会跳到别的产品
      id: "wx6d18b1a09c333147",
      // 自定义参数，具体参考文档
      customData: {
        clientInfo: `iPhone OS 10.3.1 / 3.2.0.43 / 0`,
        imei: '7280BECE2FC29544172A2B858E9E90D0'
      }
    }
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  gridchange: function (e) {
    this.setData({
      gridCol: e.detail.value
    });
  },
  gridswitch: function (e) {
    this.setData({
      gridBorder: e.detail.value
    });
  },
  menuBorder: function (e) {
    this.setData({
      menuBorder: e.detail.value
    });
  },
  menuArrow: function (e) {
    this.setData({
      menuArrow: e.detail.value
    });
  },
  menuCard: function (e) {
    this.setData({
      menuCard: e.detail.value
    });
  },
  switchSex: function (e) {
    this.setData({
      skin: e.detail.value
    });
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection =='left'){
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  feedback: function(){
    const Tucao = requirePlugin('tucao').default;
    const userInfo = {
      productId: 139412,
      avatar: app.globalData.avatar,
      nickname: app.globalData.nickname
    }

    var url = Tucao.getUrl(userInfo);

    wx.navigateTo({
      url: url
    });
  },
  onLoad: function (options) {
    let res = wx.getSystemInfoSync()
    this.setData({
      extraData: {
        // 把1221数字换成你的产品ID，否则会跳到别的产品
        id: "wx6d18b1a09c333147",
        // 自定义参数，具体参考文档
        customData: {
          clientInfo: res.model + '/' + res.system + '/' + res.platform
        }
      }
    })
    
  },
  onShareAppMessage: function(){

  }
})