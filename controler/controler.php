<?php

if( !defined('YOUR_SESSION_ID'))
    define('YOUR_SESSION_ID',md5($_SERVER['REMOTE_ADDR'].'admin'));

require_once __DIR__.'/../model/db.php';



class BeeControler{
    protected $task;
    public function __construct()
    {
        $this->template = 'default';
        $this->js = [
            'https://code.jquery.com/jquery-3.4.1.js',
            'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
            'https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js',
            'https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js',
            'https://cdn.datatables.net/autofill/2.3.4/js/dataTables.autoFill.min.js',
            'https://cdn.datatables.net/autofill/2.3.4/js/autoFill.bootstrap4.min.js',
            'https://rawgit.com/notifyjs/notifyjs/master/dist/notify.js',
            'assets/js/js.js?t='.random_int(0,99999)
        ];
        $this->css = [
            'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.css',
            'https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css',
            'https://cdn.datatables.net/autofill/2.3.4/css/autoFill.bootstrap4.min.css',
            'assets/css/css.css?t='.random_int(0,99999)
        ];
    }

    protected function getAuthDisplayNone(){
        session_id(YOUR_SESSION_ID);
        session_start();
        $style_display_none = 'badminquit';
        if(isset($_SESSION['ip']) AND $_SESSION['ip'] == $_SERVER['REMOTE_ADDR']){
            $style_display_none = 'badmin';
        }
        session_write_close();
        return $style_display_none;
    }
    
    public function display(){
        $BeeModel = new BeeModel();
        $loadStatus = $BeeModel->loadStatus();
        
        $initStatusJs = '';
        foreach ($loadStatus as $k => $status) {
            $initStatusJs .= "'".$status."':".$k.",";
        }

        $this->loadTemplate([
            'css' => $this->css,
            'js' => $this->js,
            'r' => $BeeModel->load(),
            'style_display_none' => $this->getAuthDisplayNone(),
            'Status' => $loadStatus,
            'initStatusJs' => $initStatusJs
        ]);
    }

    protected function  loadTemplate( $param, $tpl = null){
        $name = $this->template;
        if(isset($tpl))$name = $tpl;
        include __DIR__.'/../template/'.$name.'.php';
    }
}

?>