var http = require("http"),
    colors = require('colors'),
    fs = require('fs'),
    ini = require('ini'),
    path = require('path'),
    Info = ini.parse(fs.readFileSync(path.resolve(__dirname, '../') + '/config.ini','UTF-8' )).system;
    Conn = require("./conn").conn;

function Main() {
    this.data = '';
    this.add_data = [];
    this.project = '';
    this.type = '';
    this.expect = '';
    this.name = '';
    this.url = '';
};

Main.fn = Main.prototype;

Main.fn.getData = function() {
    if ('attendue' in this) {
        this.data = this.attendue;
        this.getNewData();
        return;
    }
    var _this = this,
        req = http.get(_this.url, function(res) {
            res.on('data', function(data) {
                _this.data += data.toString();
                // console.log(_this.data);
            });
            res.on('timeout', function() {
                if (Info.action_tip == '0') {
                    console.log(colors.red('--> [ ' + _this.name + ' ] 请求超时 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));
                }
            });
            res.on("end", function() {
                clearTimeout(request_timer);
                if (_this.data == 'Nothing') {
                    if (Info.action_tip == '0') {
                        console.log(colors.red('--> [ ' + _this.name + ' ] 没有配置采集目标地址 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));
                    }
                    return;
                }
                try {
                    _this.data = eval('(' + _this.data + ')');
                    _this.getNewData();
                } catch (error) {
                    if (Info.action_tip == '0') {
                        console.log(error);
                        console.log(colors.red('--> [ ' + _this.name + ' ] 采集出错,程序再次执行采集 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));
                    }
                }
            });
        }).on('error', function(e) {
            if (Info.action_tip == '0') {
                console.log('--> [ ' + _this.name + ' ] 采集出错：' + e + ' [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']');
            }
        });
    var request_timer = setTimeout(function() {
        req.abort();
    }, Info.abort_time * 1000);
    req.on("abort", function() {
        if (Info.action_tip == '0') {
            console.log(colors.red('--> [ ' + _this.name + ' ] 超过预定时间,终止了任务并再次执行 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));
        }
    });
};

Main.fn.getNewData = function() {
    // 获得最新数据
    var _this = this,
        now_date = parseInt(new Date().getTime() / 1000),
        _add_data = [];
    for (var i = 0, j = _this.data.length, _expect, is_reg; i < j; i++) {
        _expect = _this.data[i].expect;
        if (parseInt(_expect) > parseInt(_this.expect)) {
            _add_data.push(_this.data[i]);
            _this.add_data.push("('" + _this.data[i].expect + "','" + _this.data[i].code.replace(/-,/g, '') + "','" + _this.bm + "','" + (new Date(_this.data[i].time).getTime() / 1000) + "')");
        }
    }
    if (_this.add_data.length > 0) {
        _this.data = _add_data;
        _this.addData();
    } else {
        if (Info.action_tip == '0') {
            console.log('--> [ ' + _this.name + ' ] [ ' + (_this.expect ? (parseInt(_this.expect) + 1) + '期' : '初始化') + ' ] 获取数据时间为: ' + new Date().Format('yyyy-MM-dd hh:mm:ss'));
        }
    }
}

Main.fn.addData = function() {
    // 将最新数据入库
    var _this = this;
    Conn.query('INSERT lottery_code (expect,content,type,create_time) VALUES ' + _this.add_data.join(','), function(err) {
        if (err) {
            if (Info.action_tip == '0') {
                console.log(colors.red('数据入库失败'));
                console.log(err);
            }
            return;
        }
        for (var i = 0, j = _this.data.length, _expect, is_reg; i < j; i++) {
            console.log(colors.green('--> [ ' + _this.name + ' ] [ ' + _this.data[i].expect + '期 ] 获得开奖数据 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));
            _this.prize(_this.data[i].expect);
            // 这里是 新疆28 和 重庆 28 派奖
            if (_this.bm == 2 || _this.bm == 12) {
                _this.category = 'pc28';
                _this.bm = (_this.bm == 2 ? 26 : 27);
                _this.prize(_this.data[i].expect);
            }
        }
    });
};
Main.fn.prize = function(is_expect,list = 0) {
    var _this = this;
    http.get('http://' + Info.local + '/prize/' + _this.category + '/prize/expect/' + is_expect + '/type/' + _this.bm, function(res) {
        var is_data;
        res.on('data', function(data) {
            is_data = data.toString();
            // console.log(_this.data);
        });
        res.on("end", function() {
            try {
                is_data = eval('(' + is_data + ')');
                if (is_data.code) {
                    console.log(colors.green('--> [ 执行派奖 ] ' + is_data.msg + ' [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));

                    // PC28系列是晚上23:59分一次性返水
                    if (_this.bm != 21) {
                        return;
                    }

                    /** 这里是执行返水 **/

                    http.get('http://' + Info.local + '/Home/return_money/Back/expect/' + is_expect + '/type/' + _this.bm, function(res) {
                        var is_data;
                        res.on('data', function(data) {
                            is_data = data.toString();
                            // console.log(_this.data);
                        });
                        res.on("end", function() {
                            try {
                                is_data = eval('(' + is_data + ')');
                                if (is_data.code) {
                                    console.log(colors.green('--> [ 执行返水 ] ' + is_data.msg + ' [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));
                                } else {
                                    console.log('--> [ 执行返水 ] ' + is_data.msg + ' [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']');
                                }
                            } catch (e) {
                                console.log(colors.red('--> [ 执行返水 ] [ ' + _this.name + ' ] 返水出错，没有执行返水 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));
                            }
                        });
                    }).on('error', function(e) {
                        console.log(colors.red('--> [ 执行返水 ] [ ' + _this.name + ' ] ' + e + ' [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));
                    });

                    /** --- **/

                } else {
                    console.log('--> [ 执行派奖 ] ' + is_data.msg + ' [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']');
                }
            } catch (e) {
                console.log('http://' + Info.local + '/prize/' + _this.category + '/prize/expect/' + is_expect + '/type/' + _this.bm);
                console.log(e);
                console.log(colors.red('--> [ 执行派奖 ] [ ' + _this.name + ' ] 派奖出错，未能执行派奖 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));
            }
        });
    }).on('error', function(e) {
        // 如果派奖失败，则尝试再次访问派奖，间隔3秒，不超过3次再次尝试
		if(list < 3){
            setTimeout(() => { _this.prize(is_expect,list++); },3000);
        }
        console.log(colors.red('--> [ 执行派奖 ] [ ' + _this.name + ' ] ' + e + ' [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));
    });
}
Main.fn.main = function() {
    var _this = this;
    _this.url = 'http://' + _this.url + '/?project=' + _this.project + '&type=' + _this.type;
    _this.getData();
};
exports.Main = Main;
