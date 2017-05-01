import * as Rest from '../../utils/restUtil';
var App = getApp();

Page({
  data: {
    userInfo: {},
    content: ""
  },
  onLoad: function () {
    const vm = this;
    App.getUserInfo((userInfo) => {
      vm.setData({ userInfo });
    })
  },
  inputTyping(e) {
    this.setData({ content: e.detail.value });
  },
  bindOnSubmit(e) {
    const { content, phone } = e.detail.value;
    if (!content.length) return;
    const { nickName } = this.data.userInfo;
    const feedback = { nickName, content, phone };
    Rest.post('/api/user/feedback', feedback, () => {
      App.showModal('提示', '您的反馈, 我们已经收到, 感谢您的反馈～', () => {
        wx.navigateBack();
      });
    });
  }
})
