import * as Rest from '../../utils/restUtil';

Page({
  data: {
    inputVal: '',
    balance: 0.0,
    warning: ''
  },
  onLoad: function () {

  },

  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value,
      warning: ''
    });
  },

  bindOnSearch: function () {
    const { inputVal } = this.data;
    if (!inputVal.length) return;
    if (!inputVal.match(/^(\d{11})$/)) {
      this.setData({ warning: '交通卡号不合法' });
      return;
    }
    Rest.get(
      '/api/bus/card',
      (res) => {
        const { statusCode } = res;
        if (statusCode === 200) {
          const { balance } = res.data;
          this.setData({
            warning: balance === null ? '交通卡号错误或不存在' : '',
            balance: balance || 0
          });
        } else {
          this.setData({ warning: '交通卡号错误或不存在' });
        }
      },
      () => {},
      { cardId: inputVal }
    );
  }
})
