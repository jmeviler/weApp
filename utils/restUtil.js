import { baseUrl } from './constant';

export const getData = (url, params = {}, cb) => {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
    });

    wx.request({
      url: baseUrl + url,
      data: params,
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
          wx.hideToast();
          cb(res.data);
      },
      fail: function(error) {
        console.error(error);
      }
    });
}