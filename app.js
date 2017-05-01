import * as CONSTANT from './utils/constant';
import * as Rest from './utils/restUtil';

App({
  onLaunch: function () {
    const allLines = wx.getStorageSync('allLines');
    if (!allLines.length) {
      Rest.get('/bus/names/all', (data) => {
        const lines = data.names.split(',');
        wx.setStorage({ key: "allLines", data: lines });
      });
    }
  },
  getUserInfo:function(cb){
    const vm = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              vm.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(vm.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  showLoading(title = '查询中', icon = 'loading') {
    wx.showToast({ title, icon });
  },
  hideLoading() {
    wx.hideToast();
  },
  showModal(title = CONSTANT.MODAL_TIPS, content = CONSTANT.SERVER_ERROR, cb) {
    wx.showModal({
      title,
      content,
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          cb();
        }
      }
    });
  },
  globalData: {
    userInfo: null
  }
})