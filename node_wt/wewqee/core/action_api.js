var http = require("http"),
    colors = require('colors'),
    fs = require('fs'),
    ini = require('ini'),
    path = require('path'),
    Info = ini.parse(fs.readFileSync(path.resolve(__dirname, '../') + '/config.ini','UTF-8' )).system;
    Conn = require("./conn").conn;

function Main() {}

Main.fn = Main.prototype;

Main.fn.visitApi = function(url, name) {
    var _this = this,
        _data = '',
        req = http.get(url, function(res) {
            res.on('data', function(data) {
                _data += data.toString();
                // console.log(_data);
            });
            res.on('timeout', function() {
                if (Info.action_tip == '0') {
                    console.log(colors.red('--> [ ' + name + ' ] 接口请求超时 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));
                }
            });
            res.on("end", function() {
                clearTimeout(request_timer);
                try {
                    _data = eval('(' + _data + ')');
                    if (Info.action_tip == '0') {
                        console.log('--> ' + _data.msg + ' [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']');
                    }
                } catch (error) {
                    if (Info.action_tip == '0') {
                        console.log(url);
                        console.log(colors.red('--> [ ' + name + ' ] 接口程序执行出错 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));
                    }
                }
            });
        }).on('error', function(e) {
            if (Info.action_tip == '0') {
                console.log('--> [ ' + name + ' ] 访问接口出错：' + e + ' [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']');
            }
        });
    var request_timer = setTimeout(function() {
        req.abort();
    }, Info.abort_time * 1000);
    req.on("abort", function() {
        if (Info.action_tip == '0') {
            console.log(colors.red('--> [ ' + name + ' ] 超过预定时间,终止了任务并再次执行 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));
        }
    });
}

Main.fn.gamePrize = function() {
    this.visitApi('http://' + Info.local + '/home/Game/prize/type/0', '百家乐');
    this.visitApi('http://' + Info.local + '/home/Game/prize/type/1', '龙虎斗');
    this.visitApi('http://' + Info.local + '/Home/new_return_money/back', '返水');
}

Main.fn.actionData = function() {
    var day = 2, // 保留的数据的天数
        is_day = (Date.parse(new Date()) / 1000) - (day * 24 * 60 * 60);
    Conn.query("DELETE FROM lottery_code WHERE type <> 21 AND type <> 19 AND type <> 22 AND create_time < " + is_day, function(err) {
        if (err) {
            console.log('--> 执行保留' + day + '天的开奖数据操作失败！！！ [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']');
        } else {
            console.log('--> 执行保留' + day + '天的开奖数据操作成功 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']');
        }
    });
    Conn.query("DELETE FROM login_log WHERE create_time < " + is_day, function(err) {
        if (err) {
            console.log('--> 执行保留' + day + '天的用户登陆日志操作失败！！！ [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']');
        } else {
            console.log('--> 执行保留' + day + '天的用户登陆日志据操作成功 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']');
        }
    });
    this.visitApi('http://' + Info.local + '/djycpgk/Commission/commission', '代理返佣');
    this.visitApi('http://' + Info.local + '/djycpgk//Lottery/returnmoney', 'PC28返点');
    this.visitApi('http://' + Info.local + '/home/in/deleteDemo', '清除所有试玩用户数据');
    this.visitApi('http://' + Info.local + '/home/in/deleteImg', '清除图片上传缓存');
}

exports.Main = Main;