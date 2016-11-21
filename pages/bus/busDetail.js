Page({
  data: {
    name: '',
    stopId: '',
    direction: 0,
    tips: '',
    busInfo: {},
    stations: {},
    stationsLeft: {},
    stationsRight: {}
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
        var stations = res.data.lineResults0;
        stations.start = res.data.busLine.start_stop;
        stations.end = res.data.busLine.end_stop;
        vm.setData({
          name: name,
          stations: stations,
          busInfo: res.data.busLine,
          stationsLeft: res.data.lineResults0,
          stationsRight: res.data.lineResults1
        });
      }
    });
  },

  onClickSwitch: function(e) {
    var vm = this;
    if (!vm.data.direction) {
      var temp = vm.data.stationsRight;
      temp.start = vm.data.busInfo.end_stop;
      temp.end = vm.data.busInfo.start_stop;
      vm.setData({
        stations: temp,
        direction: 1
      });
    } else {
      var temp = vm.data.stationsLeft;
      temp.start = vm.data.busInfo.start_stop;
      temp.end = vm.data.busInfo.end_stop;
      vm.setData({
        stations: temp,
        direction: 0
      });
    }
  },

  bindClickStop: function(e) {
      var vm = this;
      var name = vm.data.name;
      var lineId = vm.data.busInfo.line_id;
      var stopId = e.target.id;

      wx.request({
      url: 'https://robot.leanapp.cn/api/busstop/'+name+'/'+lineId+'/'+stopId+'/1',
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        var tips = '';
        if (res.data.cars.length) {
          var terminal = res.data.cars[0].terminal;
          var stopdis = res.data.cars[0].stopdis;
          var time = res.data.cars[0].time;
          console.error(typeof time, time)

          if (time !== 'null') {
            tips = terminal+'还有'+stopdis+'站，约'+Math.ceil(time / 60)+'分钟';
          }
        }

        vm.setData({
          stopId: stopId,
          tips: tips
        });
      }
    });
  }
})