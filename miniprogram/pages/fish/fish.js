Page({
  data: {
    Nav1: 0,
    Nav2: 0,
    scrollLeft:0,
    fishList:[
      
    ],
    nav1List:["本月鱼讯","下月预告"],
    nav2List:["北半球", "南半球"]
  },
  tab1Select(e) {
    this.setData({
      Nav1: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
    this.changeNav()
  },
  tab2Select(e) {
    this.setData({
      Nav2: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    this.changeNav()
  },
  
  changeNav: async function(){
    wx.cloud.init({
      env: 'animalcrossing-vxayk'
    })
    const db = wx.cloud.database()
    const _ = db.command
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var M = date.getMonth() + 1
    if(this.data.Nav1 == 1){
      M = M==12?1:M+1
    }
    var result=[]
    if(this.data.Nav2 == 0){
      result = await db.collection('fishinfo').where({
        northMonth: M
      }).get()
    }else if(this.data.Nav2 == 1){
      result = await db.collection('fishinfo').where({
        southMonth: M
      }).get()
    }
    this.setData({
      fishList : result.data
    })
  },
  onLoad: function (options) {
    this.changeNav()
  }
})