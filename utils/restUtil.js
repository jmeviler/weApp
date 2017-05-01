import { BASE_URL } from './constant';

const App = getApp();
export const get = (url, success, fail) => {
  wx.request({
    url: BASE_URL + url,
    header: { 'Content-Type': 'application/json' },
    success: function(res) {
      if (res.statusCode === 200) {
        success(res.data);
      } else {
        App.showModal();
      }
    },
    fail: function(error) {
      fail(error);
    }
  });
}

export const post = (url, params, success) => {
  wx.request({
    url: BASE_URL + url,
    method: 'POST',
    data: params,
    success: (res) => {
      success(res.data);
    }
  })
}