var util = require('../../utils/util.js')
import { baseUrl } from '../../utils/constant';
import { getData } from '../../utils/restUtil';

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
    getData('weather', {}, function(data){
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
  },

  onShow: function () {
    var vm = this;
    getData('weather', {}, function(data){
      vm.setData({
        weather: data
      });
    });
  }
})
