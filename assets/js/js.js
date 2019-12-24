var tableL = null;

/* Изначально форма не заполнена и по этому считаем что все возможные ошибки есть  */
var errorNull = true, errorMail = true, errorPass = true;

/* Для удобства и уменьшения размера кода выносим функцию проверки поля на null в отдельную переменную */
var checkNull = function(){
    $(this).val($(this).val().trim());
    if ($(this).val() =="" ) {
        /* Выводим сообщение об ошибке под элементом.
           This в данном случае это элемент, который инициировал вызов функции */
        $(this).notify("Поле нужно заполнить", "error");
        $(this).addClass("errtextbox");
        errorNull = true;
    } else {
        errorNull = false;
        $(this).removeClass("errtextbox");
    }
};




$(document).ready(function() {
    onLoadBee('/work/gets/' );



    /* Проверяем корректность E-mail */
    $(".checkemail").focusout(function(){
        var value = $(this).val().trim();
        /* Для этого используем регулярное выражение  */
        if (/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(value) == false ) {
            $(this).notify("E-mail введён не корректно", "error");
            $(this).addClass("errtextbox");
            errorMail = true;
        } else {
            $(this).removeClass("errtextbox");
            errorMail = false;
        }
    });


    /* Проверяем значения полей Имя и Информация на null в момент когда они теряют фокус */
    $(".form-control-check").focusout(checkNull);

    $("#badminquit").click(function(){
        $.ajax({
            url: 'user/quit',
            type: 'post',
            data: null,
            dataType:'JSON',
            success: function(result) {

                alert(result.message);
                //$('#wadmin').modal('hide');

                if(result.success){
                    $("#badminquit").css('display','none');
                    $("#badmin").css('display','block');
                    $(".aonly").css('display','none');
                    adminMode= false;
                }else{
                    $("#badminquit").css('display','block');
                    $("#badmin").css('display','none');
                    $(".aonly").css('display','block');
                    adminMode = true;
                }

                // действия при получения ответа (result) от сервера
            }
        });
    });
    /* В результате клика по кнопке отправить если ошибок заполнения нет то форма отправляется иначе получаем сообщение об ошибке */
    $("#asend").click(function(){

        console.log(errorNull , errorPass);

        // создадим пустой объект
        var $data = {}; var  $errorANull = true;
// переберём все элементы input, textarea и select формы с id="myForm "
        $('#fwadmin').find ('input').each(function(errorANull) {
            // добавим новое свойство к объекту $data
            // имя свойства – значение атрибута name элемента
            // значение свойства – значение свойство value элемента
            $data[this.name] = $(this).val().trim();

            if ($(this).val().trim() != ''  ) {
                $(this).removeClass("errtextbox");
                //$errorANull = true;
                $data[this.id] = $(this).val().trim();
            } else {
                $(this).notify("Поле нужно заполнить", "error");
                $(this).addClass("errtextbox");
                $errorANull = false;
            }
        });
        console.log($data,$errorANull);
        if($errorANull) {
            $.ajax({
                url: 'user/auth',
                type: 'post',
                data: $data,
                dataType:'JSON',
                success: function(result) {

                    if(result.success){
                        $("#badminquit").css('display','block');
                        $("#badmin").css('display','none');
                        $(".aonly").css('display','block');
                        adminMode = true;
                    }else{
                        $("#badminquit").css('display','none');
                        $("#badmin").css('display','block');
                        $(".aonly").css('display','none');
                        adminMode = false;
                    }

                    alert(result.message);
                    $('#wadmin').modal('hide');



                    // действия при получения ответа (result) от сервера
                }
            });

        } else {
            $(this).notify("Форма пустая или заполнена не корректно", "error");
        }





    });

    $("#csend").click(function(){

        // создадим пустой объект
        var $data = {}; var  $errorANull = true;
// переберём все элементы input, textarea и select формы с id="myForm "
        $('#wcreate').find ('input,textarea').each(function(errorANull) {
            // добавим новое свойство к объекту $data
            // имя свойства – значение атрибута name элемента
            // значение свойства – значение свойство value элемента
            $data[this.name] = $(this).val().trim();
            if ($(this).val().trim() != '' || $(this).data('skipcheck') == true ) {
                $(this).removeClass("errtextbox");
                //$errorANull = true;
                $data[this.id] = $(this).val().trim();
            } else {
                $(this).notify("Поле нужно заполнить", "error");
                $(this).addClass("errtextbox");
                $errorANull = false;
            }
        });
        url_task = 'work/create';
        if($data['recipient-id'] > 0 && adminMode){
            url_task = 'work/update';
        }

        if($errorANull) {
            $.ajax({
                url: url_task,
                type: 'post',
                data: $data,
                dataType:'JSON',
                success: function(result) {

                    $('#wcreate').modal('hide');
                    alert(result.message);
                    if(result.success){
                        window.location.reload();
                    }else{
                        $("#badminquit").css('display','none');
                        $("#badmin").css('display','block');
                        $(".aonly").css('display','none');
                        adminMode = false;
                    }
                    // действия при получения ответа (result) от сервера
                }
            });

        } else {
            $(this).notify("Форма пустая или заполнена не корректно", "error");
        }





    });

    $('#wcreate').on('hide.bs.modal', function (e) {
        $('#wcreateexampleModalLabel').html('Новая задача');
        $('#wcreate').find ('input,textarea').each(function() {
            if($(this).attr('id') != 'wstatus'){
                $(this).val('');
            }else{
                $(this).val(1);
                $('#wstatusdropdownMenuButton').html('Открыто');
            }

        });
    })


});

function onLoadScriptTableL() {
    return jQuery("#Lis").DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.13/i18n/Russian.json"
        },
        "columns": [
            {"title": "№"},
            {"title": "User"},
            {"title": "email"},
            {"title": "Задача"},
            {"title": "Результат"},
            {"title": "Статус"},
            {"title": "EditAdmin"}
        ],
        select: true,
        order: [[0, 'asc'], [5, 'desc']],
        "iDisplayLength": 10,
        "columnDefs": [
            {className: "dt-body-center", "targets": [0, 5]},
            {
                "targets": [ 6 ],
                "visible": false
            },
            { "width": "20px", "targets": 0 },
            { "width": "40px", "targets": 5 }
        ],
        buttons: [
            "accept", "admin"
        ],
        "dom": "<'row'<'col-sm-4'l><'col-sm-4'f><'col-sm-4'>>" + "<'row'<'col-sm-4'i><'col-sm-8'p>>",
        createdRow: function (nRow, aData, iDisplayIndex) {
            if (aData[6] != 0 ) {
                $('td:eq(3)', nRow).html( aData[3] + '<p class="badge badge-warning badge-pill">отредактировано администратором</p>' );
                //aData[3] += ;
                //jQuery('tr', nRow).addClass('danger');
                //jQuery('td ', nRow).eq(0).addClass('text-danger');
                //jQuery(nRow).addClass("danger");
            }
            color = ['', 'text-info', 'text-warning', 'text-success', 'text-danger'];
            console.log( ListStatus);
            $('td:eq(5)', nRow).addClass(color[ ListStatus[aData[5]] ]);
        }

        /*,
            "fnRowCallback": function(oSettings) {
                var table = jQuery('#').dataTable(), // получаем таблицу
                    rows = table.fnGetNodes(); // получаем все строки, а не только на текущей страниц

                jQuery(rows).each(function () {
                    jQuery(this).find('td:first').text(this._DT_RowIndex + 1);
                });
            }*/
    });

};


function onLoadBee(restful){
    tableL = onLoadScriptTableL();

    jQuery.ajax({
        url: restful  ,
        type:'GET',
        dataType:'JSON',
        success:function(data)
        {
            //    console.log(data, data.success, data.data);

            if ( data.success ){
                if(data.data) {
                    console.log(data.data);
                    //tableL.buttons().container().appendTo( jQuery(".col-sm-4:eq(2)", tableL.table().container() ) );
                    tableL.clear();
                    tableL.rows.add(data.data).draw();
                }
            }else{

            }
            //JSON_renderMessages(data);
        }
    });

    jQuery('.ClickStatus').click(function () {
        $('#wstatusdropdownMenuButton').html($(this).html());
        $('#wstatus').val($(this).data('status'));
    });

    jQuery('#Lis tbody').on('dblclick', 'tr:has(td)', function(e) {

        var  self = this;

        var row = tableL.row( self );
        //alert( tableAD.row( self ).data() );
        //row.data( row.data() + "1" ).draw();
        var dateL =  tableL.row( self ).data(), indexL = 0;

        if(adminMode){
            $('#wcreate').find ('input,textarea').each(function() {
                if(indexL == (dateL.length - 1)){
                    $(this).val(ListStatus[dateL[indexL]]);// подстановка числового значения статуса
                }else{
                    $(this).val(dateL[indexL]);
                }

                indexL ++;
            });
            //console.log(dateL, indexL, dateL[indexL-1]);
            $('#wstatusdropdownMenuButton').html(dateL[dateL.length - 2]);
            $('#wcreateexampleModalLabel').html('Редактирование задачи id=' + dateL[0]);

            //ListStatus
            $('#wcreate').modal('show');
        }


        //tableL.cell( self, 0 ).data()

    } );

}


