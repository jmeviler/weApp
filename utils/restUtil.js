import { BASE_URL } from './constant';

export const get = (url, success, fail) => {
  wx.request({
    url: BASE_URL + url,
    header: { 'Content-Type': 'application/json' },
    success: (res) => success(res),
    fail: (error) => fail(error)
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