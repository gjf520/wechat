var app = getApp(),
  deviceInfo = app.globalData.deviceInfo;

Page({

    data: {
      longitude: "",
      latitude: "",
      controls: [{
      id: 1,
      iconPath: '/resource/pin.png',
      position: {
        left: deviceInfo.windowWidth / 2 - 10,
        top: (deviceInfo.windowHeight - 42) / 2 - 26,
        width: 20,
        height: 26
          }
      },{
      id: 2,
      iconPath: '/resource/center.png',
      position: {
        left: 20,
        top: deviceInfo.windowHeight - 92,
        width: 30,
        height: 30
          },
          clickable: true
      }],
        markers:[]
    },

    staticData: {
        markersInfo: []
    },

    onReady: function (e) {
      this.mapCtx = wx.createMapContext('map');
    },

    onShow: function() {
      wx.getLocation({
      type: 'gcj02',
      success: this.handleGetLocationSucc.bind(this)
    });

        wx.request({
                url: 'https://nuanwan.wekeji.cn/student/index.php/trade/get_list', 
                data: {},
                method: "GET",
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: this.handleGetMarkersSucc.bind(this)
            })
    },

    handleGetMarkersSucc: function(res) {
        this.staticData.markersInfo = res.data.data;
        var markers = res.data.data,
            results = [];
        for (var i = 0; i < markers.length; i++) {
            var item = markers[i];
            results.push({
                iconPath: "/resource/" + item.type + ".png",
                id: i,
                latitude: item.latitude,
                longitude: item.longitude,
                width: 30,
                height: 30
            })
        }
        this.setData({
            markers: results
        })
    },

    handleGetLocationSucc: function(res) {
      this.setData({
      longitude: res.longitude,
        latitude: res.latitude
    })
    },

    onShareAppMessage: function () {
        return {
            title: '最酷炫的线下水族交易平台',
            path: 'pages/index/index'
        }
    },

    handleControlTap: function(e) {
      var id = e.controlId;
      if (id = 2) {
        this.mapCtx.moveToLocation();
      }
    },

    bingMarkerTap: function(e) {
        var id = e.markerId,
            infoId = this.staticData.markersInfo[id].id;

        wx.navigateTo({
            url: '/pages/detail/detail?id=' + infoId
        });
    }

})
