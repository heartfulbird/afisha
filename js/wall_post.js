/**
 * Created with JetBrains PhpStorm.
 * User: stas
 * Date: 20.09.13
 * Time: 17:01
 * To change this template use File | Settings | File Templates.
 */

var id_close;
var id_open;


//Обработка результатов поста
function callbackFunc(result) {
    //console.log(result);

    var el_close = $(id_close);
    var el_open = $(id_open);


    if (result.hasOwnProperty('response')) {

        if (result.response.post_id && result.response.post_id >0 ) {
            //console.log('Запись опубликована на вашей стене.')

            //Закрывем окно с инфо
            el_close.popup();
            el_close.popup('close');

            //Открываем окно с результатами поста на стену
            $(id_open + ' p').text('Запись опубликована на вашей стене.');

            el_open.popup();
            setTimeout(function () {

                el_open.popup('open', {transition: 'fade'});
                el_open.css('position', 'fixed');

                var w_popup =  parseInt(el_open.css('width').replace('px', ''));

                var w = $(window).width();

                ////console.log((w/2 - w_popup/2));

                el_open.css('left',(w/2 - w_popup/2) + 'px');

            }, 1000);


            //Закрываем окно с результатами
            setTimeout(function () {
                el_open.popup('close', {transition: 'fade'});
            }, 5000);


            setTimeout(function () {
                el_open.css('position', 'relative');
            }, 6000);

        }

    } else {
        //console.log('Запись не опубликована, попробуйте позже.');

        //Закрывем окно с инфо
        el_close.popup();
        el_close.popup('close');

//Открываем окно с результатами поста на стену
        $(id_open + ' p').text('Запись не опубликована, попробуйте позже.');

        el_open.popup();
        setTimeout(function () {
            el_open.popup('open', {transition: 'fade'});
            el_open.css('position', 'fixed');


            var w_popup =  parseInt(el_open.css('width').replace('px', ''));

            var w = $(window).width();

            ////console.log((w/2 - w_popup/2));

            el_open.css('left',(w/2 - w_popup/2) + 'px');

        }, 1000);


//Закрываем окно с результатами
        setTimeout(function () {
            el_open.popup('close', {transition: 'fade'});
        }, 5000);


        setTimeout(function () {
            el_open.css('position', 'relative');
        }, 6000);



    }



}


function wallPost (postVars) {

    $('body').append('<iframe class="hidden" src="http://favoriteclubs.ru/wall_post.html#' + postVars +'" frameborder="0"></iframe>');

}

function removeFrame () {
    $('iframe').remove();

}


$(function () {

    $('.wall_post').on('click', function () {


        //СПОСОБ С ПОДТВЕРЖДЕНИЕМ ПОСТА КЛИЕНТОМ - должен по идее работать даже если
        //в настройках доступа приложения не просить открыть стену

//        if ( $(this).data('mywrap') == 'main') {
//
//            var id_close = '#show_date';
//            var id_open = '#main_mess';
//        }
//
//        if ( $(this).data('mywrap') == 'fav') {
//            var id_close = '#show_fav_date';
//            var id_open = '#fav_mess';
//
//        }
//
//        var wrap = $(this).closest('[data-role="popup"]');
//
//        var club = wrap.find('.ev_club').text();
//        var date = wrap.find('.ev_date').text();
//        var artist = wrap.find('.ev_artist').text();
//
//       // var postVars =encodeURIComponent(viewer_id + '&' + club + '&' + date + '&' + artist);
//        var postVars = encodeURIComponent(viewer_id + '&' + club + '&' + date + '&' + artist);
//
//        ////console.log(postVars);
//        wallPost(postVars);
//
//
//
//
//        window.addEventListener( "message",
//            function (e) {
//                //if(e.origin !== 'http://favoriteclubs.ru') { return; }////если проверять откуда данные
//
//                //Домен фрэйма
//                //var domain = e.origin;
//
//                //Данные от фрейма
//                var data = e.data;//{"access_token":"**","expires_in":"86400","user_id":"**"}
//
//                //console.log(data);
//
//                data = JSON.parse(data);
//
//                if (data.post_id && data.post_id >0 ) {
//                    //console.log('Запись опубликована на вашей стене.')
//
//
//                    $(id_close).popup();
//
//                    $(id_close).popup('close');
//
//
//                    $(id_open + ' p').text('Запись опубликована на вашей стене.');
//
////                    var w_popup =  parseInt($('.message').css('width').replace('px', ''));
////
////                    var w = $(window).width();
//
//                   // //console.log((w/2 - w_popup/2));
//
//                    //$('.message').css('left',(w/2 - w_popup/2) + 'px');
//
//
//                    $(id_open).popup();
//
//                    setTimeout(function () {
//                        $(id_open).popup('open', {transition: 'fade'});
//                        $(id_open).css('position', 'fixed');
//                    }, 1000);
//
//
//
//                    setTimeout(function () {
//                        $(id_open).popup('close', {transition: 'fade'});
//                        $(id_open).css('position', 'relative');
//                    }, 5000);
//
//
//                } else {
//                    //console.log('Запись не опубликована, попробуйте позже.')
//                }
//
////
////                //console.log(data);
//
//                removeFrame();
//
//            },
//            false);
//
//



        //ЕСЛИ СТЕНА ВКЛЮЧЕНА В НАСТРОЙКИ ДОСТУПА ПРИЛОЖЕНИЯ и клиент это одобрил - можно постить сразу


        if ( $(this).data('mywrap') == 'main') {

            id_close = '#show_date';
            id_open = '#main_mess';
        }

        if ( $(this).data('mywrap') == 'fav') {
            id_close = '#show_fav_date';
            id_open = '#fav_mess';

        }

        var wrap = $(this).closest('[data-role="popup"]');

        var club = wrap.find('.ev_club').text();
        var date = wrap.find('.ev_date').text();
        var artist = wrap.find('.ev_artist').text();

        var message = club + '\n' + date + '\n' + artist;

        message = encodeURIComponent(message);

        var script = document.createElement('SCRIPT');

        script.src = "https://api.vk.com/" +
            "method/wall.post" +
            "?owner_id=" + viewer_id +
            "&message=" + message +
            "&v=5.1" +
            "&attachments=http://vk.com/app3892492" +
            "&access_token=" + access_token +
            "&callback=callbackFunc";

        document.getElementsByTagName("head")[0].appendChild(script);






    });


});

