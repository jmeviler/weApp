var util = require('../../utils/util.js')
Page({
  data: {
    express: [ '圆通快递','申通快递','顺丰快递','韵达快递','德邦物流','中通快递','百世快递','邮政包裹','EMS','邮政国际' ],
    key: [ 'yuantong','shentong','shunfeng','yunda','debangwuliu','zhongtong','huitongkuaidi','youzhengguonei','ems','youzhengguoji' ],
    index: 0,
    postId: '',
    data: [],
    loading: false
  },

  bindExpressChange: function (e) {
    var vm = this;
    console.log(vm.data.key[e.detail.value]);
    vm.setData({
      index: e.detail.value
    });
  },

  bindChangeInput: function(e) {
    this.setData({
      postId: e.detail.value
    });
  },

  bindOnSearch: function () {
    var vm = this;
    var postId = vm.data.postId;
    var type = vm.data.key[vm.data.index];
    if (!postId.length || !type.length) return;

    vm.setData({
      loading: !vm.data.loading
    });

    wx.request({
      url: 'https://robot.leanapp.cn/api/express/'+type+'/'+postId,
      header: { 'Content-Type': 'application/json' },
      success: function(res) {
        vm.setData({
          loading: !vm.data.loading,
          data: res.data
        });
      }
    });
  }
})
