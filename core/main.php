<?php
namespace core;
use QL\QueryList;

class main
{
  // 采集配置
  public $config = [];
  // 程序运行临时性的数据
  public $chat_data = [];

  public function curlAction()
  {
      $curl = curl_init();
      curl_setopt($curl, CURLOPT_URL, $this->chat_data['config']['url']);
      curl_setopt($curl, CURLOPT_HEADER, 0);  //0表示不输出Header，1表示输出
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
      curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
      curl_setopt($curl, CURLOPT_ENCODING, '');
      curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);
      curl_setopt($curl, CURLOPT_TIMEOUT,5);   // 超时设置(秒)
      curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
      curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; SLCC1; .NET CLR 2.0.50727; .NET CLR 3.0.04506; .NET CLR 3.5.21022; .NET CLR 1.0.3705; .NET CLR 1.1.4322)');
      curl_setopt($curl, CURLOPT_HTTPHEADER, array('Expect:'));
      $contents = trim(curl_exec($curl));
      curl_close($curl);
      //empty($contents) && ($contents = file_get_contents($this->chat_data['config']['url']));
      $encode = mb_detect_encoding($contents,array('GBK','UTF-8','EUC-CN','GB2312','ASCII','CP936'));
      $encode != 'UTF-8' && ($contents = iconv($encode,'UTF-8//IGNORE',$contents)); // print_r($contents);
      return $contents;
  }

  public function insertData(){
      if(count($this->chat_data['insert_data']) > 0){
        $insert_data = join(',',$this->chat_data['insert_data']);
        // print_r("INSERT INTO code ({$this->config['field']},type) VALUES {$insert_data}");
        $num = $this->chat_data['conn']->exec("INSERT INTO code ({$this->config['field']},type) VALUES {$insert_data}");
        if(empty($num)){
          $this->chat_data['new_data'] = [];
        }
        /** 更新缓存最新旗号 */
        $is_data = array_merge($this->chat_data['redis_data'], $this->chat_data['new_data']);
        $data = json_encode(array_slice($is_data,-10));
        $this->chat_data['redis']->hset('collection_server_data', $this->config['type'], $data);
        // print_r("添加了{$num}条数据");
        return $num;
      }
  }

  public function getNewData()
  {
    $data = $this->chat_data['config']['callback']($this->chat_data['data']);
    if(!empty($data)){
      $db_data = json_decode($this->chat_data['redis']->hget('collection_server_data', $this->config['type']),true);
      $this->chat_data['redis_data'] = $db_data;
      if(count($db_data)){
        $db_data = $db_data[count($db_data)-1]['expect'];
      } else {
        $db_data = 0;
      }
      // print_r($db_data); // 这里是最新的期数
      foreach ($data as $value) {
        // 这里判断开奖号码为 -,-,- 情况为开奖中，避免采集到
        if(((intval($value['expect']) == '' ? 0 : $value['expect']) > $db_data || (isset($this->chat_data['config']['test']) && $this->chat_data['config']['test'])) && strpos($value['code'],'-,-') === false && $value['code'] != ''){
          $this->chat_data['new_data'][] = $value;
          $_value = array_values($value);
          $_value[] = $this->config['type'];
          $this->chat_data['insert_data'][] = "('" . join("','",$_value) . "')";
        }
      }
    }
  }

  public function star()
  {
    foreach ($this->config['list'] as $value) {
      $this->chat_data['config'] = $value;
      $this->chat_data['insert_data'] = [];
      $this->chat_data['new_data'] = [];
      $this->chat_data['data'] = $this->curlAction();
      switch ($value['mode']){
        case 'html':
          $this->chat_data['data'] = (QueryList::html($this->chat_data['data']))
               ->rules($this->chat_data['config']['rules'])
               ->range($this->chat_data['config']['range'])
               ->removeHead()
               ->query()
               ->getData()->all();
          break;
        case 'json':
          $this->chat_data['data'] = json_decode($this->chat_data['data'],true);
          break;
        case 'xml':
          // 禁止引用外部xml实体
          libxml_disable_entity_loader(true);
          $this->chat_data['data'] = json_decode(json_encode(simplexml_load_string($this->chat_data['data'], 'SimpleXMLElement', LIBXML_NOCDATA)), true);
          break;
        default:
          break;
      }
      $this->getNewData();
      // 如果在测试模式下，显示所有采集到的数据，不写入数据库
      if(count($this->chat_data['new_data']) || (isset($this->chat_data['config']['test']) && $this->chat_data['config']['test'])) {
        if(!isset($this->chat_data['config']['test']) || !$this->chat_data['config']['test']){
          $this->insertData();
        }
        return;
      }
    }
  }
}
