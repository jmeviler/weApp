import { baseUrl } from './constant';

export const get = (url, success, fail) => {
  wx.request({
    url: baseUrl + url,
    header: { 'Content-Type': 'application/json' },
    success: function(res) {
      success(res.data);
    },
    fail: function(error) {
      fail(error);
    }
  });
}

export const post = (url, ) => {

}