<?php
namespace core;

use core\base\conn;
use core\main;
use core\config\lottery;

class index
{
  private static $redis;
  private static $config;
  private static $conn;

  public function __construct()
  {
    self::$config = conn::getConfig();
    self::$redis = conn::redisConn();
    self::$conn = conn::mysqlConn();
  }
  
  /**
   * 初始化
   *  1、对历史数据处理，每天只执行一次
   *  2、初始化期号
   */
  private static function init()
  {
    if(self::$config['core']['test']){
      return;
    }
    /** 获得今天零点的时间戳 */
    $time = strtotime('today');
    $cache_time = self::$redis->get('collection_server_delete_time');
    if($cache_time == ''){
      self::initCacheExpect();
    }
    if($cache_time == '' || $time > $cache_time){
      self::$redis->set('collection_server_delete_time',$time);
      self::$conn->exec('DELETE code WHERE UNIX_TIMESTAMP(time) < ' . $time - (self::$config['core']['history_data'] * 86400));
    }
  }

  /**
   * 初始化redis缓存里各个彩种最后10期的期号
   */
  private static function initCacheExpect()
  {
    $lottery = explode(',',self::$config['system']['cp']);
    foreach($lottery as $type){
      $db_data = self::$conn->query("SELECT expect,code,time FROM code WHERE type='{$type}' ORDER BY Id DESC LIMIT 10")->fetchAll(\PDO::FETCH_ASSOC);
      if(!$db_data){
          $db_data = [];
      }
      self::$redis->hset('collection_server_data', $type, json_encode(array_reverse($db_data)));
    }
  }

  public function main()
  {
    if(!isset($_GET["type"]) || !isset($_GET["project"])){
      echo json_encode([ 'code'=>0,'msg'=>'非法访问' ]);
      return;
    }
    $type =  addslashes(sprintf("%s",$_GET["type"]));
    $project = addslashes(sprintf("%s",$_GET["project"]));
    lottery::$type = $type;
    $config = lottery::getConfig();
    if(!$config){
      echo json_encode([ 'code'=>0,'msg'=>'这个彩种没有配置采集规则' ]);
      return;
    }
    /** 初始化 */
    self::init();
    // 如果有期数参数，说明是要自动开奖
    if(isset($_GET['expect'])){
      // 这里是自动开奖（开一期）
      $expect = addslashes(sprintf("%s",$_GET['expect']));
      $code = [];
      $is_code_all = [];
      for($i = 0;$i < $config['code_config']['num'];$i++){
        // 这里是随机不重复开奖
        if(isset($config['code_config']['repeat']) && $config['code_config']['repeat']){
          if(count($is_code_all) == 0){
            for($j = $config['code_config']['min']; $j < ($config['code_config']['max'] + 1);$j++){
              $is_code_all[] = $j;
            }
          }
          $is_rand_num = mt_rand(0,(count($is_code_all) - 1));
          $rand_code = $is_code_all[$is_rand_num];
          array_splice($is_code_all, $is_rand_num, 1);
        }else{
          $rand_code = mt_rand($config['code_config']['min'],$config['code_config']['max']);
        }
        $code[] = (($config['code_config']['is'] && $rand_code < 10) ? ('0' . $rand_code) : $rand_code);
      }
      $db_data = json_decode(self::$redis->hget('collection_server_data', $type),true);
      $return_data = [];
      if((count($db_data) == 0 || $db_data[count($db_data)-1]['expect'] < $expect)){
        $return_data = [
          [
            'code' => join($code,','),
            'expect' => $expect,
            'time' => date('Y-m-d H:i:s')
          ]
        ];
        /** 如果没有开启全局测试模式，也没有开启这个彩种的测试模式，数据库入库，并更新缓存数据 */
        if(self::$config['core']['test'] == 0 || !isset($config['list'][0]) || !isset($config['list'][0]['test']) || !$config['list'][0]['test']){
          self::$conn->exec("INSERT INTO code ({$config['field']},type) VALUES ('" . join($code,',') . "','{$expect}','" . date('Y-m-d H:i:s') . "','" . $config['type'] . "')");
          $is_data = array_merge($db_data ,$return_data);
          $data = json_encode(array_slice($is_data,-10));
          self::$redis->hset('collection_server_data', $type, $data);
        }
      }
    } else {
      $main = new main();
      $main->config = $config;
      $main->chat_data['redis'] = self::$redis;
      $main->chat_data['conn'] = self::$conn;
      $main->star();
      $return_data = $main->chat_data['new_data'];
    }
    echo json_encode([ 'code'=>1,'msg'=>'success','data'=>$return_data ]);
  }
}

$action = new Index();
$action->main();
