const App = getApp();

import * as Rest from '../../utils/restUtil';

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    matchedBus: [],
    history: wx.getStorageSync('history') || [],
    names: wx.getStorageSync('allLines') || []
  },

  onLoad: function () {
    var vm = this;
    let allLines = wx.getStorageSync('allLines');
    App.getUserInfo((userInfo) => {
      vm.setData({ userInfo });
      Rest.post('/api/user/add', userInfo, () => {});
      if (!allLines.length) {
        Rest.get('/bus/names/all', (res) => {
          const { data } = res;
          const lines = data.names.split(',');
          wx.setStorage({ key: "allLines", data: lines });
          allLines = lines;
          vm.setData({ names: allLines });
      });
      }
    });
  },

  onShareAppMessage: function () {
    return {
      title: '上海实时公交查询',
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
    if (!key.length || !data) return [];
    return data.filter(item => !item.indexOf(key) && item != key);
  },

  bindOnClickHistory: function(e) {
    const { name } = e.target.dataset;
    if (name) {
      wx.navigateTo({
        url: '../bus/busDetail?name=' + name
      });
    }
  },

  bindOnClearAll: function() {
    var vm = this;
    wx.removeStorage({
      key: 'history',
      success: function(res) {
        vm.setData({  history: [] });
      }
    });
  },

  bindOnClearHistoryItem: function(e) {
    const { history } = this.data;
    var index = history.findIndex(i => i === e.target.dataset.name);
    history.splice(index, 1);
    wx.setStorage({
      key: "history",
      data: history
    });
    this.setData({ history });
  },

  bindOnSearch: function () {
    const { history, inputVal, names } = this.data;
    if (!inputVal.length) return;
    if (names.indexOf(inputVal) < 0) {
      App.showModal('提示', '哎呀, 没有找到您查询的路线～', () => {});
    } else {
      if (!history.includes(inputVal)) {
        if (history.length >= 8) {
          history.splice(history.length - 1, 1);
        }
        history.unshift(inputVal);
      }
      this.setData({ history });
      wx.setStorage({ key: "history", data: history });
      wx.navigateTo({
        url: '../bus/busDetail?name=' + inputVal
      });
    }
  }
})
