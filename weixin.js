/**
 * Created by lixiaodong on 15/11/27.
 */
var crypto = require('crypto');
var token = 'value of the token';

var checkSignature = function(signature, timestamp, nonce) {
    var tmpArr = [token, timestamp, nonce];
    tmpArr.sort();                           // 1.将token、timestamp、nonce三个参数进行字典序排序
    var tmpStr = tmpArr.join('');            // 2.将三个参数字符串拼接成一个字符串tmpStr
    var shasum = crypto.createHash('sha1');
    shasum.update(tmpStr);
    var shaResult = shasum.digest('hex');    // 3.字符串tmpStr进行sha1加密
    if(shaResult === signature){             // 4.加密后的字符串与signature对比，确定来源于微信
        return true;
    }
    return false;
}

function weixin(req, res) {
    var signature = req.param('signature');
    var timestamp = req.param('timestamp');
    var nonce = req.param('nonce');
    var echostr = req.param('echostr');

    if (checkSignature(signature, timestamp, nonce)) {
        res.send(echostr);   // 确认来源是微信，并把echostr返回给微信服务器。
    } else {
        res.toJSON(200, {code: -1, msg: "You arent wechat server !"});
    }
}

module.exports = {
    weixin : weixin
}
