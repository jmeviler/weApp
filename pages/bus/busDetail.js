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
        console.error(res.data.busLine);
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
          console.error(typeof time)

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