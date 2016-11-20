Page({
  data: {
    name: ''
  },

  bindChangeInput: function(e) {
    this.setData({
      name: e.detail.value
    });
  }
})