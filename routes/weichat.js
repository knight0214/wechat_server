var express = require('express');
const request = require('request');
var router = express.Router();
const appId = 'wxe2d3d7300ea4c0ab';
const appsecret = '3d8146ebaa20c9590108dd2dafb5ed9d';
// 模板id
temId = 'hEUeFep1353RVo0C0guj26lqDtqVjVMqq8465zb7fKk';
// 测试openid
let openIdList = [
  'oHrXc1apx1j17rWuiLZUcuKdICx0',
  'oHrXc1bnrsuVwp5wE4MOiLG5lAA8'
];
var state = false;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('weichat');
});
router.get('/tokenCheck', function(req, res, next) {
  //微信得到返回后会通过你的认证
  var query = req.query;
  console.log('query', req.query);
  var echostr = query.echostr;
  res.send(echostr);
});
router.post('/tokenCheck', function(req, res, next) {
  //微信得到返回后会通过你的认证
  var query = req.query;
  console.log('query', req.query);
  var echostr = query.echostr;
  res.send(echostr);
});
// 调用接口发送模板
router.get('/sendMsg', function(req, res, next) {

  var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appId + "&secret=" + appsecret;
  //获取token
  request(url, function(err, response, body) {
    var body = JSON.parse(body);
    var token = body.access_token;
    for (let i in openIdList) {
      var openId = openIdList[i];
      sendMsg(token, openId);
    }
    // console.log('endState', state);
    // if (state == true) {
    res.send('消息已经发送');
    //}
  });


});
//向微信请求模板消息发送
var sendMsg = function(token, openId) {
  state = false;
  var url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + token;
  request({
    url: url,
    method: "POST",
    json: true,
    body: {
      "touser": openId,
      "template_id": temId,
      "url": "http://weixin.qq.com/download",
      "data": {
        'keyword1': {
          "value": new Date().getTime(),
          "color": '#173177'
        },
        'keyword2': {
          "value": '2017-12-02',
          "color": '#173177'
        },
        'keyword3': {
          "value": '测试物流公司',
          "color": '#173177'
        },
      }

    }
  }, function(err, response, body) {
    console.log('body', body);
    if (body.errMsg == "ok") {
      state = true;
    }

  });

};

module.exports = router;