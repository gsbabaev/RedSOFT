<?php

class BeeModel{
    protected $db;
    public function __construct()
    {
        $config = [];
        include __DIR__.'/../helper/vendor/gsbabaev/restfulphptpl/config.php';
        $this->config = $config;

        $this->db = new SafeMySQL($this->config);
    }

    //авторизация через сессии: данные, связанные с сессией хранятся на сервере
    public function load(){
        $old_name = session_name('newname');
        ini_set('session.name','newname');
        //var_dump($old_name);
        $name = ini_get('session.name');
        return $name;
    }
    public function loadStatus(){
        return $this->db->getIndCol('id','SELECT id,name FROM test_bee_status WHERE 1 ORDER BY id');
    }
}

?>