Page({
  data: {
    name: '',
    stopId: '',
    direction: 0,
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

  bindClickStop: function(e) {
      var vm = this;
      vm.setData({
          stopId: e.target.id
      });
  }
})