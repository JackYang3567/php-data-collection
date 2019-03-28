<?php
  $return_data = [
    'code' => 0,
    'msg' => 'error'
  ];
  if(!isset($_GET["type"]) || !isset($_GET["project"])){
    echo json_encode($return_data);
    die;
  }
  use core\base\conn;
  use core\config\lottery;
  $type =  addslashes(sprintf("%s",$_GET["type"]));
  $project = addslashes(sprintf("%s",$_GET["project"]));
  lottery::$type = $type;
  $config = lottery::getConfig();
  if(!$config){
    $return_data['msg'] = '没有找到这个彩种';
    echo json_encode($return_data);
    die;
  }
  $db_data = conn::redisConn()->hget('collection_server_data', $type);
  if(empty($db_data)){
    $return_data['msg'] = '没有开启这个彩种';
    echo json_encode($return_data);
    die;
  }
  $return_data['code'] = 1;
  $return_data['msg'] = 'success';
  $return_data['data'] = json_decode($db_data,true);
  echo (isset($_GET["compatible"]) ? json_encode($return_data) : json_encode($return_data['data']));