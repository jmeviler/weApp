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
    if (!vm.data.direction) {
      stations = vm.data.stationsRight;
      stations.start = vm.data.busInfo.end_stop;
      stations.end = vm.data.busInfo.start_stop;
      direction = 1;
    } else {
      stations = vm.data.stationsLeft;
      stations.start = vm.data.busInfo.start_stop;
      stations.end = vm.data.busInfo.end_stop;
    }

    vm.setData({
     stations: stations,
     direction: direction,
     stopId: '',
     tips: ''
    });
  },

  bindClickStop: function(e) {
      var vm = this;
      var name = vm.data.name;
      var lineId = vm.data.busInfo.line_id;
      var stopId = e.target.id;
      var direction = vm.data.direction;

      wx.showToast({
        title: '加载中',
        icon: 'loading',
      });

      wx.request({
      url: 'https://robot.leanapp.cn/api/busstop/'+name+'/'+lineId+'/'+stopId+'/'+direction,
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        var tips = '';
        if (res.data.cars.length) {
          var terminal = res.data.cars[0].terminal;
          var stopdis = res.data.cars[0].stopdis;
          var time = res.data.cars[0].time;

          if (time !== 'null') {
            tips = '车牌:'+terminal+', 剩余'+stopdis+'站, 约'+Math.ceil(time / 60)+'分钟';
          }
        }

        vm.setData({
          stopId: stopId,
          tips: tips
        });

        wx.hideToast();
      }
    });
  }
})
