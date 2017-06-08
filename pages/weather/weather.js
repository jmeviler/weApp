var util = require('../../utils/util.js')

import * as Rest from '../../utils/restUtil';

Page({
  data: {
    date: util.formatTime(new Date()),
    weather: {},
    loading: false
  },
  onLoad: function () {
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.error(res);
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
      }
    });

    var vm = this;
    setInterval(() => {
      vm.setData({
        date: util.formatTime(new Date())
      });
    }, 1000);

    var vm = this;
    Rest.get('/api/weather', (res) => {
      const { data } = res;
      vm.setData({
        weather: data
      });
    });
  },

  updateWeather: function () {
    var vm = this;
    vm.setData({ loading: !vm.data.loading });
    Rest.get('/api/weather', (res) => {
      const { data } = res;
      vm.setData({
        weather: data,
        loading: !vm.data.loading
      });
    });
  },
})
