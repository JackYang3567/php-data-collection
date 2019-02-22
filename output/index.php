<?php
  if(!isset($_GET["type"]) || !isset($_GET["project"])){
    echo '欢迎您的光临';
    die;
  }
  use core\base\conn;
  use core\config\lottery;
  $type =  addslashes(sprintf("%s",$_GET["type"]));
  $project = addslashes(sprintf("%s",$_GET["project"]));
  lottery::$type = $type;
  $config = lottery::getConfig();
  if(!$config){
    echo 'Nothing';
    return;
  }
  !strpos($config['field'],'time') && ($config['field'] .= ',time');
  $take = 10;
  isset($_GET["take"]) && ($take = intval($_GET["take"]));
  $db_data = conn::mysqlConn()->query("SELECT {$config['field']} FROM {$config['table']} WHERE type='{$config['type']}' ORDER BY Id DESC LIMIT 0,{$take}")->fetchAll(\PDO::FETCH_ASSOC);
  echo "===";//json_encode(array_reverse($db_data));