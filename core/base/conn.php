<?php
namespace core\base;

class conn
{
   static function getConfig()
   {
      return parse_ini_file(__DIR__  . '/../../config.ini',true);
   }

   static function mysqlConn()
   {
     $dbms = 'mysql';
     $charset = 'utf8';
     $db = parse_ini_file(__DIR__  . '/../../config.ini',true)['db'];
     $dsn = "{$dbms}:host={$db['host']};port={$db['port']};dbname={$db['database']};charset={$charset}";
     return new \PDO($dsn, $db['user'], $db['password'],[ \PDO::ATTR_PERSISTENT => true ]);
   }

   static function redisConn()
   {
      $redis_config = self::getConfig()['redis'];
      $redis = new \Redis();
      $redis->connect($redis_config['host'], $redis_config['port']);
      $redis->auth($redis_config['password']);
      return $redis;
   }
}
