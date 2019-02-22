<?php
namespace core\config;

class lottery
{
   public static $type;
   
   public static function getConfig()
   {
      $dir = __DIR__ . '/lottery/';
      if (is_dir($dir) && $dh = opendir($dir)) {
         while (($file = readdir($dh)) !== false) {
            if (strpos($file,'.php')) {
               $config = require_once('lottery/' . $file);
               if(isset($config[self::$type])){
                  closedir($dh);
                  $data = $config[self::$type];
                  // 开启所有彩种调试模式
                  $data['list'][0]['test'] = true;
                  return $data;
               }
            }
         }
      }
      return false;
   }
}
