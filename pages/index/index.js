import * as Rest from '../../utils/restUtil';

var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  onLoad: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  bindOnGoRoute(e) {
    const { name } = e.target.dataset;
    wx.navigateTo({
      url: `../${name}/${name}`
    });
  }
})
