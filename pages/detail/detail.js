Page({

	data: {
		address: "",
		message: "",
		contact: "",
		type: "sell",
		textType: ""
	},

	onLoad: function(options) {
   		var id = options.id;
   		 wx.request({
            url: 'https://nuanwan.wekeji.cn/student/index.php/trade/get_item', 
            data: {id: id},
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: this.handleGetDetailSucc.bind(this)
        })
	},

	handleGetDetailSucc: function(res) {
		var data = res.data.data;
		this.setData({
			address: data.address,
			message: data.message,
			contact: data.contact,
			type: data.type,
			textType: data.type == "sell" ? "转让" : "求购"
		})
	}

})