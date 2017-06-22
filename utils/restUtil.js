import { BASE_URL, BASE_URL_T } from './constant';

export const getBaseUrl = () => {
  const dateTime = new Date();
  if (dateTime.getHours() < 18) {
    return BASE_URL;
  }

  return BASE_URL_T;
}

export const get = (url, success, fail, data = {}) => {
  wx.request({
    url: getBaseUrl() + url,
    data,
    header: { 'Content-Type': 'application/json' },
    success: (res) => success(res),
    fail: (error) => fail(error)
  });
}

export const post = (url, params, success) => {
  wx.request({
    url: getBaseUrl() + url,
    method: 'POST',
    data: params,
    success: (res) => {
      success(res.data);
    }
  })
}