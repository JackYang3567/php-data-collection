var http = require("http"),
    colors = require('colors'),
    fs = require('fs'),
    ini = require('ini'),
    path = require('path'),
    Info = ini.parse(fs.readFileSync(path.resolve(__dirname, '../') + '/config.ini','UTF-8' )).system;
    Conn = require("./conn").conn;

function Main() {
    this.url = 'http://caipiao.163.com/t/jczqmixpAllWap.html';
    this.name = '竞彩足球';
    this.data = '';
    this.add_data = [];
    this.data_key = [];
};

Main.prototype.getData = function() {
    var _this = this,
        req = http.get(_this.url, function(res) {
            res.on('data', function(data) {
                _this.data += data.toString();
                // console.log(_this.data);
            });
            res.on('timeout', function() {
                if (Info.action_tip == '0') {
                    console.log(colors.red('--> [ ' + _this.name + ' ] 投注数据采集请求超时 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));
                }
            });
            res.on("end", function() {
                clearTimeout(request_timer);
                try {
                    _this.data = eval('(' + _this.data + ')').matchList;
                    _this.getNewData();
                } catch (e) {
                    if (Info.action_tip == '0') {
                        console.log(e);
                        console.log(colors.red('--> [ ' + _this.name + ' ] 投注数据采集出错,程序再次执行采集 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));
                    }
                }
            });
        }).on('error', function(e) {
            if (Info.action_tip == '0') {
                console.log('--> [ ' + _this.name + ' ] 投注数据采集出错：' + e + ' [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']');
            }
        });
    var request_timer = setTimeout(function() {
        req.abort();
    }, Info.abort_time * 1000);
    req.on("abort", function() {
        if (Info.action_tip == '0') {
            console.log(colors.red('--> [ ' + _this.name + ' ] 投注数据采集超过预定时间,终止了任务并再次执行 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));
        }
    });
};

Main.prototype.getNewData = function() {
    // 格式化数据
    var _this = this;
    for (var n in _this.data) {
        _this.data_key.push(n);
        _this.add_data.push('(' + n + ",'" + JSON.stringify({
            hostName: _this.data[n].hostName,
            guestName: _this.data[n].guestName,
            leagueName: _this.data[n].leagueName,
            startTime: _this.data[n].startTime,
            rankInfo: [_this.data[n].hostRankInfo, _this.data[n].visitRankInfo],
            bid: {
                spf: _this.data[n].mixBidCounts[0],
                rqspf: _this.data[n].mixBidCounts[1]
            },
            avgOdds: {
                s: _this.data[n].odds3,
                p: _this.data[n].odds1,
                f: _this.data[n].odds0
            },
            history: {
                num: _this.data[n].hisHitCount,
                score: _this.data[n].historyScore,
                host: _this.data[n].hostRecent,
                guest: _this.data[n].visitRecent
            },
            odds: {
                bf: (_this.data[n].singleSpTabMix ? _this.data[n].singleSpTabMix[1] : 0),
                zjq: (_this.data[n].singleSpTabMix ? _this.data[n].singleSpTabMix[2] : 0),
                bqc: (_this.data[n].singleSpTabMix ? _this.data[n].singleSpTabMix[3] : 0),
                rqspf: _this.data[n].spTabMix[4],
                spf: _this.data[n].spTabMix[0]
            }
        }) + "'," + (_this.data[n].buyEndTime / 1000) + ')');
    }
    if (_this.add_data.length) {
        _this.dataAction();
    }
}

Main.prototype.dataAction = function() {
    // 将最新数据入库
    var _this = this;
    Conn.query('DELETE FROM football_list WHERE order_id in (' + _this.data_key.join(',') + ')', function(error, rows) {
        Conn.query('INSERT football_list (order_id,content,over_time) VALUES ' + _this.add_data.join(','), function(error, rows) {
            console.log(colors.green('--> [ ' + _this.name + ' ] 投注数据已更新 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));
        });
    });
};

/* 这里如果竞彩足球列表采集独立运行的代码 */

// (new Main).getData();
// setInterval(function() {
//     (new Main).getData();
// }, 5 * 60000)

exports.Main = Main;