// const host = "http://localhost:8090";
const host = "https://quicklyweb.cn";
const access_token = wx.getStorageSync("access_token");
export const fetch = (options) => {
    const header = {
        'Authorization': 'Bearer ' + access_token,
        'Content-Type':
            (options.method === 'GET' || options.method === 'DELETE') ?
                'application/x-www-form-urlencoded' : 'application/json'
    }
    // console.log(header)
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: options.msg || '加载中',
            mask: true
        })
        wx.request({
            method: options.method,
            header: header,
            url: host + options.url,
            data: options.data || {},
            success: function (res) {
                // 请求成功
                if (res.data.code == 200 || res.statusCode == 200) {
                    setTimeout(function () {
                        wx.hideLoading()
                        resolve(res)
                    }, 400);
                } else {
                    // console.log(res.data)
                    if (res.statusCode === 401) {
                        wx.showToast({
                            
                            title: '未经授权',
                            icon: 'none',
                            duration: 2000
                        })
                        reject(res)
                    }
                    wx.hideLoading()
                    reject(res)
                }
            },
            fail: function (res) {
                wx.showToast({
                    title: '请求失败',
                    icon: 'none',
                    duration: 2000
                })
                reject(res)
            }
        })
    })
}

export const uploadFile = (options) => {
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: options.msg || '正在上传',
            mask: true
        })
        wx.uploadFile({
            url: host + '/good/uploadOSSImage',
            filePath: options.filePath,
            name: options.name,
            success: function (res) {
                let code = JSON.parse(res.data).code
                if (code == 200) {
                    setTimeout(function () {
                        wx.hideLoading()
                        resolve(res)
                    }, 400);
                } else {
                    wx.showToast({
                        title: '文件上传失败',
                        icon: 'none',
                        duration: 2000
                    })
                    reject(res)
                }
            },
            fail: function (res) {
                wx.showToast({
                    title: '服务器异常',
                    icon: 'none',
                    duration: 2000
                })
                reject(res)
            }
        })
    })
}