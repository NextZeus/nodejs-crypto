///////////////////////////
// Hash算法
///////////////////////////

var crypto = require('crypto');

/**
 * @param algorithm 算法名
 */
function hashAlgorithm(algorithm){
    var s1 = new Date();
    var key = "751b09076d721f6c5b0849caf390e300d76f8d614d64ab676bb26cbb9dadb";
    var shasum = crypto.createHash(algorithm);
    shasum.update(key);
    var d = shasum.digest('hex');
    var s2 = new Date();
    console.log(algorithm+','+(s2-s1) +'ms,'+ d);
}

function doHash(hashs){
    hashs.forEach(function(name){
        hashAlgorithm(name);
    })
}

//var algs = crypto.getHashes();
var algs = [ 'md5','sha','sha1','sha256','sha512','RSA-SHA','RSA-SHA1','RSA-SHA256','RSA-SHA512'];
doHash(algs);





