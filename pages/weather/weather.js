var util = require('../../utils/util.js')
import { BASE_URL } from '../../utils/constant';
import * as Rest from '../../utils/restUtil';

Page({
  data: {
    date: util.formatTime(new Date()),
    weather: {},
    loading: false
  },

  updateWeather: function () {
    var vm = this;
    vm.setData({ loading: !vm.data.loading });
    Rest.get('/api/weather', (data) => {
      vm.setData({
        weather: data,
        loading: !vm.data.loading
      });
    });
  },

  onLoad: function () {
    var vm = this;
    setInterval(() => {
      vm.setData({
        date: util.formatTime(new Date())
      });
    }, 1000);

    var vm = this;
    Rest.get('/api/weather', (data) => {
      vm.setData({
        weather: data
      });
    });
  }
})
