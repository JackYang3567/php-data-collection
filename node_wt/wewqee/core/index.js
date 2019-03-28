var Main = require("./main").Main,
    Conn = require("./conn").conn,
    Config = require("./config").config,
    jczqList = require("./jczq_list").Main,
    jczq_prize = require("./jczq_prize").Main,
    action_api = require("./action_api").Main,
    fs = require('fs'),
    ini = require('ini'),
    path = require('path'),
    info_data = ini.parse(fs.readFileSync(path.resolve(__dirname, '../') + '/config.ini','UTF-8' )),
    Info = info_data.system,
    redis = require('redis'),
    redis_client = redis.createClient(info_data.redis.port,info_data.redis.host,(info_data.redis.password ? { 'password': info_data.redis.password } : {}));

    // 缓存最近数据期号
    var chat_expect = { cp: {}, host: 0, other: { jczq: 0 }, catch_time: 0 };
    action_api = new action_api;

function runAsync(callback, Main_obj) {
    // 这里查询数据库最新一期并缓存起来
    redis_client.hget('collection_client_data_' + Info['local'],Main_obj.bm,function(err,value){
        if(err){
            return;
        }
        value = JSON.parse(value);
        // 这里查询预设开奖表是否有预设,如果有的话就按预设表开奖
        Conn.query("SELECT content FROM preset_lottery_code WHERE type=" + Main_obj.bm + " AND expect=" + (parseInt(value['expect']) + 1), function(err, rows) {
            if (!err && rows.length > 0) {
                Main_obj.attendue = { data:[{ expect: (parseInt(value['expect']) + 1), code: rows[0]['content'], time: new Date().Format('yyyy-MM-dd hh:mm:ss')}]};
                //Main_obj.attendue = [{ expect: (parseInt(value['expect']) + 1), code: rows[0]['content'], time: Date.parse(new Date())/1000 }];
            }
            callback([value['expect'], value['time']], Main_obj);
        });
    });
}

function action() {
    var project = ['cp'],
        _time_config = Config.time,
        now_expect,
        _urls = Info.host.split(',');

    // 这里是每天到了 23:59:00 点,执行接口操作
    if (new Date().Format('hh:mm:ss') > '23:59:00' && new Date().Format('yyyyMMdd') > chat_expect['catch_time']) {
        chat_expect['catch_time'] = new Date().Format('yyyyMMdd');
        action_api.actionData();
    }

    //游戏开奖派奖
    action_api.gamePrize();

    for (var i in project) {
        _type_array = Info[project[i]].split(',');
        for (var j = 0, k = _type_array.length; j < k; j++) {
            // if (_type_array[j] == 'jczq') {
            //     // 五分钟 3000 秒,执行投注列表采集，及采集比赛结果并派奖
            //     if (chat_expect.other.jczq == 0 || chat_expect.other.jczq / 300 > 1) {
            //         (new jczqList).getData();
            //         (new jczq_prize).getData();
            //     }
            //     (chat_expect.other.jczq / 300 > 1) ? (chat_expect.other.jczq = 1) : (chat_expect.other.jczq += parseInt(Info.time));
            //     continue;
            // }
            now_expect = getNowExpect(_time_config[project[i]][_type_array[j]], _type_array[j], project[i]);
            if (!now_expect) {
                continue;
            }
            Main_obj = new Main;
            Main_obj.project = project[i];
            Main_obj.redis_client = redis_client;
            Main_obj.type = _type_array[j];
            Main_obj.bm = _time_config[project[i]][_type_array[j]].type;
            Main_obj.category = _time_config[project[i]][_type_array[j]].category;
            Main_obj.name = _time_config[project[i]][_type_array[j]].name;
            // console.log(now_expect); // 计算出的期数，如果是没到开奖时间，则返回是否采集结果
            /* if((_type_array[j] in chat_expect[project[i]])) console.log(Main_obj.name + '------' + chat_expect[project[i]][_type_array[j]][0] + '---' + now_expect + '------' + chat_expect[project[i]][_type_array[j]][1]); // 执行采集名字、缓存的最新期数、计算得出最新期数、最新期数开奖时间 */
            // 这里每个彩种第一次运行程序时都会去采集，以填补之前没采集到的最近几期，以及获得每个彩种的数据库最新期数，并缓存起来，用于决定下次是否执行采集
            // 每次到了下一期，也就是计算出的期号和缓存期号不符时，要执行操作，并从数据库中获得最新期数，并缓存，达到检测是否采集到最新一期数据的目的
				//console.log(_type_array[j]);
			
            if (!(_type_array[j] in chat_expect[project[i]]) || chat_expect[project[i]][_type_array[j]][0] != now_expect) {
				
                runAsync(function(_data, Main_obj) {

                    Main_obj.expect = _data[0];
                    // 这里如果没有获取到数据,就切换采集接口
				
				
                    if (Main_obj.type in chat_expect[Main_obj.project] && _data[0] <= chat_expect[Main_obj.project][Main_obj.type][0]) {
					
						//console.log(chat_expect.host);
					
						//console.log('----------------');
                        if (chat_expect.host >= _urls.length - 1) {
                            chat_expect.host = 0;
                        } else {
                            chat_expect.host++;
                        }
                    }
				

                    Main_obj.url = _urls[chat_expect.host];
				
                    if (!(Main_obj.type in chat_expect[Main_obj.project]) || _data[0] <= chat_expect[Main_obj.project][Main_obj.type][0]) {
						//console.log('++++++++++++++++');
                        Main_obj.main();
                    }

                    chat_expect[Main_obj.project][Main_obj.type] = _data;
                }, Main_obj);
            }
        }
    }

    setTimeout(action, Info.time * 1000);
}

function getNowExpect(_time_config, type, project) {
    var date_obj = new Date;
    if ('low' in _time_config) {
        var _get_day = date_obj.getDay();
        /*这里低频采集，如果第一次执行，需要执行采集，并到数据库获得最新信息，之后要满足：到了开奖那天、到了开奖时间、当天没有采集到数据，这三个条件才执行采集 */
        if (!(type in chat_expect[project]) || (date_obj > new Date(date_obj.Format('yyyy-MM-dd') + ' ' + _time_config.time) && _time_config.wek.indexOf(_get_day) > -1 && new Date(date_obj.Format('yyyy-MM-dd') + ' 00:00:00') > new Date(new Date(chat_expect[project][type][1]).Format('yyyy-MM-dd') + ' 00:00:00'))) {
            return true;
        }
        return false;
    } else if ('not' in _time_config) {
        // 这里是期数每天往上累积的,满足上次数据入库时间是否超过设定每期的时间、是否是投注时间内来决定是否采集
        if (!(type in chat_expect[project]) || (date_obj > new Date(date_obj.Format('yyyy-MM-dd') + ' ' + _time_config.time) && date_obj < new Date(date_obj.Format('yyyy-MM-dd') + ' ' + _time_config.end_time) && (Date.parse(date_obj) - Date.parse(new Date(chat_expect[project][type][1]))) / 1000 / 60 > _time_config.cha)) {
            return true;
        }
        return false;
    } else {
        var now_date = Date.parse(date_obj),
            start_date = Date.parse(new Date(date_obj.Format('yyyy-MM-dd') + ' ' + _time_config.time));
        // 这里即便是销售没有开始，也要执行一次采集，以填补程序关闭、或者其他原因没采集到的最近几期
        if (now_date < start_date && type in chat_expect[project]) {
            var day_max_expect = Math.ceil((Date.parse(new Date(date_obj.Format('yyyy-MM-dd') + ' 23:59:59')) - start_date) / 1000 / 60 / _time_config.cha) + 1;
            // 这里是如果期号存在跨天处理
            if (day_max_expect < _time_config.expects) {
                date_obj.setDate(date_obj.getDate() - 1);
                start_date = Date.parse(new Date(date_obj.Format('yyyy-MM-dd') + ' ' + _time_config.time));
            } else {
                return false;
            }
        }
        var cha_date = (now_date - start_date) / 1000 / 60,
            get_num = parseInt(cha_date / _time_config.cha);
        if (type == 'ssc') {

            // 重庆时时彩 23 期之前是 5 分钟一期，之后是 10 分钟一期，96期之后又是5分钟一期
            // cha_date += 1; // 第一期只有 4 分钟
            
            /**
             * 重庆时时彩 2019 新规定 第一期 00:10开始,其中3:10-到7:30开一期,20分钟一期,每天60期
             */
            
            //get_num = cha_date / 5;

            get_num = cha_date / 20;

            // if (get_num > 23) { // 第24期是 01:54 ~ 09:59
            if (get_num > 9) { // 第10期是 03:10 ~ 07:30
                //cha_date = cha_date - 5 * 23 - 485 - 1;
                cha_date = cha_date - 20 * 9 - 260 - 1;
                if (cha_date <= 0) {
                    //get_num = 24;
                    get_num = 10;
                } else {
                    //get_num = 24 + cha_date / 10;
                    get_num = 10 + cha_date / 20;
                }
            }
            // if (get_num > 96) {
            //     cha_date = cha_date - 10 * (96 - 24) + 1;
            //     get_num = 96 + cha_date / 5;
            // }
            get_num = parseInt(get_num);
        }
        if (get_num < 1 || get_num > _time_config.expects) {
            date_obj.setDate(date_obj.getDate() - 1);
            get_num = _time_config.expects;
        }
        get_num = date_obj.Format('yyyyMMdd') + ("000" + get_num).substr(-_time_config.expects.toString().length);
        return get_num;
    }
}

/**
 *  这里第一次执行时，初始化缓存数据
 */
_type_array = Info['cp'].split(',');
redis_client.del('collection_client_data_' + Info['local']);
_all_lottery = 0;
for (let j = 0, k = _type_array.length; j < k; j++) {
    Conn.query("SELECT expect,create_time as time FROM lottery_code WHERE type=" + Config.time['cp'][_type_array[j]].type + " ORDER BY expect DESC LIMIT 1", function(err, rows) {
        if(err || rows.length < 1){
            _data = {
                'expect': 0,
                'time': 0
            };
        }else{
            _data = rows[0];
        }
        redis_client.hset('collection_client_data_' + Info['local'],Config.time['cp'][_type_array[j]].type,JSON.stringify(_data),function(err,v){
            _all_lottery++;
            if(_all_lottery == _type_array.length){
                console.log('--> 采集器启动成功');
                action();
            }
        });
    });
}