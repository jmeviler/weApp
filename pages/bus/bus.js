Page({
  data: {
    name: ''
  },

  bindChangeInput: function(e) {
    this.setData({
      name: e.detail.value
    });
  },
  bindOnSearch: function () {
    if (this.data.name) {
      wx.navigateTo({
        url: '../bus/busDetail?name='+this.data.name
      })
    }
  }
})