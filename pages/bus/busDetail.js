'use strict';
import * as Rest from '../../utils/restUtil';
const App = getApp();

Page({
  data: {
    name: '',
    stopId: '',
    direction: 0,
    tips: '',
    busInfo: {},
    stations: {},
    stationsLeft: {},
    stationsRight: {},
    noShow: true,
  },
  onLoad: function (option) {
    var vm = this;
    var name = option.name;
    if (!name.length) return;

    wx.request({
      url: 'https://robot.leanapp.cn/api/bus/'+name,
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        if (res.statusCode === 200) {
          var stations = res.data.lineResults0;
          stations.start = res.data.busLine.start_stop;
          stations.end = res.data.busLine.end_stop;
          vm.setData({
            name: name,
            noShow: false,
            stations: stations,
            busInfo: res.data.busLine,
            stationsLeft: res.data.lineResults0,
            stationsRight: res.data.lineResults1
          });
        } else {
          vm.setData({
            noShow: true
          })
        }
      }
    });
  },

  onShareAppMessage() {
    const { name, busInfo } = this.data;
    const { start_stop, end_stop } = busInfo;
    return {
      title: name + '-上海Bus',
      path: 'pages/bus/busDetail?name=' + name
    }
  },

  showModal: function() {
    wx.showModal({
      title: '提示',
      content: '哎呀，服务器开小差了～刷新一下吧～',
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },

  onClickSwitch: function(e) {
    var vm = this;
    var stations = {};
    var direction = 0;
    const { stationsRight, stationsLeft, busInfo } = vm.data;
    if (!vm.data.direction) {
      stations = stationsRight;
      stations.start = busInfo.end_stop;
      stations.end = busInfo.start_stop;
      direction = 1;
    } else {
      stations = stationsLeft;
      stations.start = busInfo.start_stop;
      stations.end = busInfo.end_stop;
    }

    vm.setData({
     stations: stations,
     direction: direction,
     stopId: '',
     tips: ''
    });
  },

  bindClickStop: function(e) {
    const vm = this;
    const { name, direction, busInfo } = vm.data;
    const lineId = busInfo.line_id;
    const stopId = e.target.id;

    App.showLoading();
    Rest.get(
      '/api/busstop/' + name + '/' + lineId + '/' + stopId + '/' + direction,
      (data) => {
        let tips = '';
        if (data.cars.length) {
          const { terminal, stopdis, time } = data.cars[0];
          if (time !== 'null') {
            tips = '车牌:'+terminal+', 剩余'+stopdis+'站, 约'+Math.ceil(time / 60)+'分钟';
          }
        }
        vm.setData({ stopId, tips });
        App.hideLoading();
      }
    );
  }
})
