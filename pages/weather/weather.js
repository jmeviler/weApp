var util = require('../../utils/util.js')

Page({
  data: {
    date: util.formatTime(new Date()),
    weather: {},
    loading: false
  },

  updateWeather: function () {
    var vm = this;
    vm.setData({
        loading: !vm.data.loading
    });
    wx.request({
      url: 'https://robot.leanapp.cn/api/weather',
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        vm.setData({
            weather:res.data,
            loading: !vm.data.loading
        });
      }
    });
  },

  onLoad: function () {
    var vm = this;
    setInterval(() => {
      vm.setData({
        date: util.formatTime(new Date())
      });
    }, 1000);
  },

  onShow: function () {
    var vm = this;
    wx.request({
      url: 'https://robot.leanapp.cn/api/weather',
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        vm.setData({
            weather:res.data
        });
      }
    });
  }
})
