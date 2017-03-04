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
    wx.playVoice({
      filePath: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
      complete: function(e){
        console.error(e)
      }
    })
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
