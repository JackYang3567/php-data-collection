var mysql = require('mysql'),
    conn,
    fs = require('fs'),
    ini = require('ini'),
    path = require('path'),
    Info = ini.parse(fs.readFileSync(path.resolve(__dirname, '../') + '/config.ini','UTF-8' )).db;

Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

main = function() {
    console.log("--> 数据库连接中...");
    conn = mysql.createConnection({
        host: Info.host,
        user: Info.user,
        password: Info.password,
        database: Info.database,
        port: ('port' in Info ? Info.port : 3306)
    });
    //连接错误，2秒重试
    conn.connect(function(err) {
        if (err) {
            console.log("--> 数据库连接错误");
            setTimeout(main, 2000);
        } else {
            console.log("--> 数据库连接成功");
        }
    });
    conn.on('error', function(err) {
        console.log("--> 数据库连接断开");
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log("--> 数据库重连中...");
            main();
        } else {
            throw err;
        }
    });
};
main();
exports.conn = conn;