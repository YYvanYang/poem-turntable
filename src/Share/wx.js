import img from './poem-turntable.png';

let currentUrl = window.location.href.split('#')[0];

console.log('img:', img);
const wx = window.wx;

export function initWxConfig() {
  getWxConfig(currentUrl).then(res => {
    let wxconfig = res.data;
    alert(JSON.stringify(wxconfig));
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: wxconfig.appId, // 必填，公众号的唯一标识
      timestamp: wxconfig.timestamp, // 必填，生成签名的时间戳
      nonceStr: wxconfig.nonceStr, // 必填，生成签名的随机串
      signature: wxconfig.signature, // 必填，签名
      jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
    });
  });
}

function getWxConfig(currentUrl) {
  // https://wx.yvan.top/wechat-sign?url=currentUrl
  let url = encodeURIComponent(currentUrl)
  return fetch(`https://wx.yvan.top/wechat-sign?url=${url}`)
  .then(response => response.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));;
}

export function setShare() {
  wx.ready(function() {
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
    // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
    // 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

    // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
    wx.updateAppMessageShareData({
      title: '古诗大转盘', // 分享标题
      desc: '小学生必背古诗75首', // 分享描述
      link: currentUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: img, // 分享图标
      success: function() {
        // 设置成功
      }
    });

    // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
    wx.updateTimelineShareData({
      title: '古诗大转盘', // 分享标题
      link: currentUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: img, // 分享图标
      success: function() {
        // 设置成功
      }
    });
  });
}

wx.error(function(res) {
  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});
