
App({

  globalData: {
    deviceInfo: {}
  },

    onLaunch: function() {
        try {
        var localInfo = wx.getStorageSync("deviceInfo");

          if (!localInfo) {
            var res = wx.getSystemInfoSync();
            wx.setStorageSync("deviceInfo", res);
            this.globalData.deviceInfo = res;
          }else {
            this.globalData.deviceInfo = localInfo;
          }

    } catch (e) {}
    }

})


