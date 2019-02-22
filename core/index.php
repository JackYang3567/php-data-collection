<?php
namespace core;

use core\base\conn;
use core\main;
use core\config\lottery;

class index
{
  public function main()
  {
    if(!isset($_GET["type"]) || !isset($_GET["project"])){
      echo '非法访问';
      return;
    }
    $type =  addslashes(sprintf("%s",$_GET["type"]));
    $project = addslashes(sprintf("%s",$_GET["project"]));
    lottery::$type = $type;
    $config = lottery::getConfig();
    if(!$config){
      echo 'Nothing';
      return;
    }
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
      $is_data = conn::mysqlConn()->query("SELECT Id FROM {$config['table']} WHERE type='{$config['type']}' AND expect='$expect' ORDER BY Id DESC LIMIT 0,1")->fetch(\PDO::FETCH_ASSOC);
      if(empty($is_data) && conn::mysqlConn()->exec("INSERT INTO {$config['table']} ({$config['field']},type) VALUES ('" . join($code,',') . "','{$expect}','" . date('Y-m-d H:i:s') . "','" . $config['type'] . "')")){
        $return_data = [
          [
            'code' => join($code,','),
            'expect' => $expect,
            'time' => date('Y-m-d H:i:s')
          ]
        ];
      }else {
        $return_data = [];
      }
    } else {
      // print_r($config);
      $main = new main();
      $main->config = $config;
      $main->star();
      $return_data = $main->chat_data['new_data'];
    }
    echo json_encode($return_data);
  }
}

$action = new Index();
$action->main();
