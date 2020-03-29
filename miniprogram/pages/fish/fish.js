Page({
  data: {
    Nav1: 0,
    Nav2: 0,
    scrollLeft:0,
    fishList:[
      
    ],
    nav1List:["本月鱼讯","下月预告"],
    nav2List:["北半球", "南半球"],
    placeList: [{
      name: '大海',
      checked: true
    }, {
      name: '河流',
      checked: true
    }, {
      name: '池塘',
      checked: true
    }, {
      name: '崖上河流',
      checked: true
    }, {
      name: '出海口',
      checked: true
    }, {
      name: '码头',
      checked: true,
    }]
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
      Nav2: e.detail.value?1:0,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    this.changeNav()
  },
  
  getEnablePlace: function () {
    var places = []
    for (let i = 0; i < this.data.placeList.length; i++) {
      if (this.data.placeList[i].checked) {
        places.push(this.data.placeList[i].name)
      }
    }
    return places
  },
  changeNav: async function(){
    wx.cloud.init({
      env: 'animalcrossing-vxayk'
    })
    wx.cloud.init({
      env: 'animalcrossing-vxayk'
    })
    const db = wx.cloud.database()
    const _ = db.command
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var M = date.getMonth() + 1
    var D = date.getDay + 1
    
    if(this.data.Nav1 == 1){
      M = M==12?1:M+1
    }
    var places = this.getEnablePlace()
    console.log(places)
    var condition = {
      northMonth: M,
      place: _.in(places)
    }
    if (this.data.Nav2 == 1) {
      condition = {
        southMonth: M,
        place: _.in(places)
      }
    }
    var count = 0
    await db.collection('fishinfo').where(condition).count().then(res => {
      count = res.total;
    })
    console.log(count)
    // const page = count % 20 == 0 ? count / 20 : count / 20 + 1;
    let result = []
    for (let i = 0; i < count; i += 20) {
      await db.collection('fishinfo').where(condition).skip(i).get().then(res =>{
        result = result.concat(res.data)
      })
    }
    for(let i = 0 ; i < result.length; i ++){
      var months = result[i].northMonth
      if(this.data.Nav2 == 1){
        months = result[i].southMonth
      }
      var go = M + 1
      if(M == 12){
        go = 1
      }
      var back = M - 1
      if(back == 1){
        back = 12
      }
      var goFlag = 0
      var backFlag = 0
      if(months.indexOf(go) == -1){
        goFlag = 1
      }
      if(months.indexOf(back) == -1){
        backFlag = 1
      }
      
      if (goFlag == 1 && backFlag == 1){
        if(D < 15){
          result[i].flag = 0
        }else{
          result[i].flag = 1
        }
      }else if(goFlag == 1){
        result[i].flag = 1
      }else if(backFlag == 1){
        result[i].flag = 2
      }else {
        result[i].flag = 0
      }
    }
    
    result = result.sort(function(a,b){
      if(a.flag == b.flag){
        return 0;
      }
      return a.flag > b.flag?-1:1
    })
    // if(this.data.Nav2 == 0){
    //   result = await db.collection('fishinfo').where({
    //     northMonth: M
    //   }).get()
    // }else if(this.data.Nav2 == 1){
    //   result = await db.collection('fishinfo').where({
    //     southMonth: M
    //   }).get()
    // }
    // console.log(result)
    this.setData({
      fishList : result
    })
  },
  onLoad: function (options) {
    this.changeNav()
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
  ChooseCheckbox(e) {
    let items = this.data.placeList;
    let values = e.currentTarget.dataset.value;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].name == values) {
        items[i].checked = !items[i].checked;
        break
      }
    }
    this.setData({
      placeList: items
    })
    this.changeNav()
  }
})