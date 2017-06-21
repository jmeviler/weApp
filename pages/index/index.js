import * as Rest from '../../utils/restUtil';
import { QINIU_URL } from '../../utils/constant'

var app = getApp()
Page({
  data: {
    tools: [{
      key: 'express',
      icon: '/express.png',
      name: '快递查询'
    }, {
      key: 'weather',
      icon: '/weather.png',
      name: '实时天气'
    }, {
      key: 'feedback',
      icon: '/feedback.png',
      name: '意见反馈'
    }, {
      key: 'metro',
      icon: '/metro.png',
      name: '地铁站点信息'
    }, {
      key: 'balance',
      icon: '/yue.png',
      name: '交通卡余额'
    }],
    QINIU_URL,
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
