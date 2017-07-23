import * as Rest from '../../utils/restUtil';

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    list: [
       {
        id: 'time',
        name: '首末班车时间',
        open: false,
        datas: []
      }, {
        id: 'entrance',
        name: '出入口',
        open: false,
        datas: []
      }, {
        id: 'toilet',
        name: '洗手间位置',
        open: false,
        datas: []
      }, {
        id: 'elevator',
        name: '无障碍电梯',
        open: false,
        datas: []
      }
    ]
  },

  onShareAppMessage: function () {
    return {
      title: '上海实时公交查询',
      path: '/pages/metro/metro'
    }
  },
  showInput: function () {
    this.setData({ inputShowed: true });
  },

  clearInput: function () {
    this.setData({ inputVal: "" });
  },

  inputTyping: function (e) {
    this.setData({ inputVal: e.detail.value });
  },

  bindOnSearch: function () {
    const { inputVal } = this.data;
    if(!inputVal.length) return;
    let { list } = this.data;
    list = Object.keys(list).map(item => {
      list[item].open = false;
      list[item].datas = [];
      return list[item];
    });
    this.setData({ list });
    Rest.get(
      '/api/metro/detail',
      (res) => {
        const { statusCode, data } = res;
        let { time, toilet, entrance, elevator } = data;
        list[0].datas = time;
        list[1].datas = entrance.toString().replace(/[\r\n]/g,"").replace(/(:)/g,"：").split(',');
        list[2].datas = toilet.toString().replace(/[\r\n]/g,"").replace(/    /g,", ").split('<br />');
        list[3].datas = elevator.toString().replace(/[\r\n]/g,"").replace(/    /g,", ").split('<br />');
        this.setData({ list });
      },
      () => {},
      { name: inputVal }
    );
  },

  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  }
})