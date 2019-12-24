<?php

require __DIR__.'/helper/vendor/autoload.php';

use RESTfulPHPtpl\TRS;

$trs = new TRS();

if($trs->check()){
    echo $trs->json();return;
}

require_once __DIR__.'/controler/controler.php';

$BeeControler = new BeeControler();

$BeeControler->display();

?>


