<?php
namespace core\config;
use core\base\conn;

class lottery
{
   public static $type;
   
   public static function getConfig()
   {
      $dir = __DIR__ . '/lottery/';
      $is_config = conn::getConfig();
      if (is_dir($dir) && $dh = opendir($dir)) {
         while (($file = readdir($dh)) !== false) {
            if (strpos($file,'.php')) {
               $config = require_once('lottery/' . $file);
               if(isset($config[self::$type])){
                  closedir($dh);
                  $data = $config[self::$type];
                  if($is_config['core']['test']){
                     $data['list'][0]['test'] = true;
                  }
                  return $data;
               }
            }
         }
      }
      return false;
   }
}
