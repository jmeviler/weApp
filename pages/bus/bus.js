Page({
  data: {
    inputShowed: false,
    inputVal: "",
    matchedBus: [],
    history: wx.getStorageSync('history') || [],
    names: wx.getStorageSync('Lines') || []
  },

  onLoad: function () {
    var vm = this;
    if (!this.data.names.length) {
      wx.request({
        url: 'https://robot.leanapp.cn/bus/names/all',
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
          var lines = res.data.names.split(',');
          vm.setData({ names: lines });
          wx.setStorage({
            key: "Lines",
            data: lines
          });
        }
      });
    }
  },

  onShareAppMessage: function () {
    return {
      title: '上海实时公交',
      desc: '上海实时公交查询，从此不在因等车而烦恼',
      path: '/pages/bus/bus'
    }
  },

  onHide: function() {
    this.setData({
      inputShowed: false,
      inputVal: "",
      matchedBus: [],
      history: wx.getStorageSync('history') || []
    });
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },

  hideInput: function () {
    this.setData({
      inputVal: "",
      matchedBus: [],
      inputShowed: false
    });
  },

  clearInput: function () {
      this.setData({
          inputVal: "",
          matchedBus: []
      });
  },

  inputTyping: function (e) {
    console.error(this.data.names)
    this.setData({
      inputVal: e.detail.value,
      matchedBus: this.checkBusName(this.data.names, e.detail.value)
    });
  },

  selectBusName: function (e) {
    this.setData({
      inputVal: e.target.id,
      matchedBus: []
    });
  },

  checkBusName: function (data, key){
    if (!key.length) return [];
    return data.filter(item => !item.indexOf(key) && item != key);
  },

  bindOnClickHistory: function(e) {
    if (e.target.dataset.name) {
      wx.navigateTo({
        url: '../bus/busDetail?name='+e.target.dataset.name
      });
    }
  },

  bindOnClearAll: function() {
    var vm = this;
    wx.removeStorage({
      key: 'history',
      success: function(res) {
        vm.setData({
          history: []
        });
      }
    });
  },

  bindOnClearHistoryItem: function(e) {
    var history = this.data.history;
    var index = history.findIndex(i => i === e.target.dataset.name);
    history.splice(index, 1);
    wx.setStorage({
      key: "history",
      data: history
    });
    this.setData({
      history
    });
  },

  bindOnSearch: function () {
    var history = this.data.history;
    if (this.data.inputVal) {
      if (!history.includes(this.data.inputVal)) {
        console.error(history.length >= 10)
        if (history.length >= 10) {
          history.splice(history.length - 1, 1);
        }
        history.unshift(this.data.inputVal);
      }
      this.setData({ history });
      wx.setStorage({
        key: "history",
        data: history
      });

      wx.navigateTo({
        url: '../bus/busDetail?name='+this.data.inputVal
      });
    }
  }
})
