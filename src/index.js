$(document).ready(function(){
    var curent_format
    $('select').styler();
    curent_format = $('.select_container .jq-selectbox__select-text').text();
    $('.switcher').click(function (e) {
        e.preventDefault();
        $(this).parent().parent().toggleClass("switcher_on");
    });
    refresh(curent_format);
    $('.select_container .jq-selectbox__dropdown ul li').click(function () {
        curent_format = $('.select_container .jq-selectbox__select-text').text();
        refresh(curent_format);
    });
    $('.switcher').click(function () {
        refresh(curent_format); // Просто все обновляю, но тут можно оптимизировать
    });
});

function getcoin(type, format, $block) {

    $.ajax({
        type: "GET",
        url: 'https://apiv2.bitcoinaverage.com/indices/global/ticker/'+type+format+'',
        dataType: "json", // xml, html, script, json, jsonp, text
        success: function (data) {
            let $text_block = $block.find('.coin_content');
            if($text_block.hasClass('switcher_on')){
                $text_block.find('.price').html(data.ask);
                $text_block.find('.hour').html(data.changes.percent.hour+'%');
                (data.changes.percent.hour > 0)?$text_block.find('.hour').addClass('green_text'):$text_block.find('.hour').addClass('red_text');
                $text_block.find('.day').html(data.changes.percent.day+'%');
                (data.changes.percent.day > 0)?$text_block.find('.day').addClass('green_text'):$text_block.find('.day').addClass('red_text');
                $text_block.find('.week').html(data.changes.percent.week+'%');
                (data.changes.percent.week > 0)?$text_block.find('.week').addClass('green_text'):$text_block.find('.week').addClass('red_text');
                $text_block.find('.month').html(data.changes.percent.month+'%');
                (data.changes.percent.month > 0)?$text_block.find('.month').addClass('green_text'):$text_block.find('.month').addClass('red_text');
            }else {
                $text_block.find('.price').html(data.ask);
                $text_block.find('.hour').html(data.changes.price.hour);
                (data.changes.price.hour > 0)?$text_block.find('.hour').addClass('green_text'):$text_block.find('.hour').addClass('red_text');
                $text_block.find('.day').html(data.changes.price.day);
                (data.changes.price.day > 0)?$text_block.find('.day').addClass('green_text'):$text_block.find('.day').addClass('red_text');
                $text_block.find('.week').html(data.changes.price.week);
                (data.changes.price.week > 0)?$text_block.find('.week').addClass('green_text'):$text_block.find('.week').addClass('red_text');
                $text_block.find('.month').html(data.changes.price.month);
                (data.changes.price.month > 0)?$text_block.find('.month').addClass('green_text'):$text_block.find('.month').addClass('red_text');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error');
        },
    });
}

function refresh(format) {
    getcoin('ETH', format, $('.green_block'));
    getcoin('LTC', format, $('.gray_block'));
    getcoin('BTC', format, $('.brown_block'));
}
