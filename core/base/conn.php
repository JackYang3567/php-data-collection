<?php
namespace core\base;

class conn
{
   static function mysqlConn()
   {
     $dbms = 'mysql';
     $charset = 'utf8';
     $db = parse_ini_file(__DIR__  . '/../../config.ini',true)['db'];
     $dsn = "{$dbms}:host={$db['host']};port={$db['port']};dbname={$db['database']};charset={$charset}";
     return new \PDO($dsn, $db['user'], $db['password'], array(\PDO::ATTR_PERSISTENT => true));
   }
}
