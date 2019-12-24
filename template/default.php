<?php


?><html>
<head>
    <?php

    foreach ($param['js'] as $j) {
        echo "<script type=\"text/javascript\" src=\"$j\" ></script>";
    }
    foreach ($param['css'] as $cs) {
        echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"$cs\" />";
    }

    ?>
</head>
<body>
<div class="container">
<div class="row mt-3">
    <div class="col-sm-6 sticky-top">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#wcreate" data-whatever="@wcreate">Создать задачу</button>

    </div>
    <div class="col-sm-6 sticky-top text-right">

        <style>
            #<?= $param['style_display_none'] ?> {
                display: none;
            }
            .aonly{
                display: <?= $param['style_display_none'] == 'badmin' ? 'block' : 'none' ?>;
            }
        </style>

        <script type="text/javascript">
            var adminMode = <?= $param['style_display_none'] == 'badmin' ? 'true' : 'false' ?>;
            var ListStatus = {<?=  $param['initStatusJs'] ?>};//init next code
        </script>

        <button id="badmin" type="button" class="btn btn-danger" data-toggle="modal" data-target="#wadmin" data-whatever="@wadmin">Администрирование</button>
        <button id="badminquit" type="button" class="btn btn-danger" >Выход</button>
    </div>
    <div class="col-sm-12 mt-3">
        <table id="Lis" class="table table-condensed table-bordered table-striped" width="100%"></table>
    </div>



</div>
    <div class="modal fade" id="wcreate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="wcreateexampleModalLabel">Новая задача</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="fwcreate" action="#">
                        <input type="hidden" data-skipcheck="true" id="recipient-id"/>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Имя:</label>
                            <input type="text" class="form-control form-control-check" id="recipient-name">
                        </div>
                        <div class="form-group">
                            <label for="message-email" class="col-form-label">Email:</label>
                            <input type="text" class="form-control checkemail form-control-check" id="recipient-email">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Задача:</label>
                            <textarea class="form-control form-control-check" id="message-text"></textarea>
                        </div>
                        <div class="form-group aonly">
                            <label for="message-text" class="col-form-label">Результат:</label>
                            <textarea data-skipcheck="true" class="form-control " id="text-result"></textarea>

                        </div>
                        <div class="form-group aonly">
                            <label for="message-text" class="col-form-label">Статус:</label>

                            <div class="dropdown ">
                                <button class="btn btn-secondary dropdown-toggle form-control" type="button" id="wstatusdropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <?= $param['Status'][key($param['Status'])] ?>
                                </button>
                                <input data-skipcheck="true" id="wstatus" type="text" value="<?= key($param['Status']) ?>">
                                <div id="recipient-status" data-status="" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <?php
                                    foreach ($param['Status'] as $k => $status) {                                            ?>
                                        <a data-status="<?= $k?>" class="dropdown-item ClickStatus" href="#"><?= $status?></a>
                                        <?php
                                    }
                                    ?>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button id="csend" type="button" class="btn btn-primary">Send task</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="wadmin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Admin area</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="fwadmin" action="#">
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Login:</label>
                            <input type="text" class="form-control form-control-check" id="recipient-name">
                        </div>
                        <div class="form-group">
                            <label for="message-email" class="col-form-label">PWD:</label>
                            <input type="text" class="form-control form-control-check" id="recipient-pwd">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button  id="asend" type="button" class="btn btn-primary">Go</button>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>
