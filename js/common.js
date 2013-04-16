﻿// for circular scrollable

$.fn.scrollableAddClones = function(addItems) {
    // grab scrollable plugin
    var scrollable;
    if (!(scrollable = $(this).data('scrollable')) || !scrollable.getConf().circular)
    return;
    // grab scrollable elements and remember it's count
    var nodes = scrollable.getItems();
    var length = nodes.length;

    // grab class for the nodes
    var clonedClass = scrollable.getConf().clonedClass;
    // get wrap object to append the clones to
    var wrap = scrollable.getItemWrap();
    // fill as much nodes as needed for 500 pixels
    if (!addItems) addItems = Math.ceil(1000 / nodes.eq(1).width());
    // create fake container to add the clones to (max 15 clones)
    var newNodesAppend = $('<span />');
    for (var i = 1; i <= (addItems < 15 ? addItems : 15); i++)
    nodes.eq(i % length).clone().addClass(clonedClass).appendTo(newNodesAppend);
    // insert HTML
    newNodesAppend.children().appendTo(wrap);
}

$(document).ready(function() {

    // scrollable 2
    $('.photo-more').scrollable({
        items: '.photo-more__items',
        next:'.photo-more__next',
        prev:'.photo-more__prew',
        circular:true
    });

	// scrollable
	$('.picture-day').scrollable({
		next:'.picture-day__next',
		prev:'.picture-day__prew',
		circular:true
	});

    //
	$(".picture-day").scrollableAddClones();

    // $('.list-news li').click(function(){
    //     $('.list-news li').removeClass("is-active");
    //     $(this).addClass("is-active");
    //     $('.super-news').html($(this).html());
    //     return false;
    // })
    //
    // jQuery(".top1").hover(
    //    function() {
    //       jQuery(".test1").css("display","block");
    //    },
    //    function() {
    //       jQuery(".test1").css("display","none");
    //    });

//tape
function tape_move() {
    var parent = $('.scrollable__list').width();
    var el = $('.scrollable__list ul');
    var item = $('.scrollable__list ul li');
    var el_width = 0;
    item.each(function() {
        el_width += $(this).width() + 2;
        return(el_width);
    })
    var max_pos = el_width - parent;
    el.css('width', el_width + 'px');
    $('.scrollable__next').hover(function() {
        var left = el.position().left;
        el.animate({left: -max_pos}, 1000);
    },
    function() {
        el.stop();
    });
    $('.scrollable__prev').hover(function() {
        var left = el.position().left;
        el.animate({left: 0}, 1000);
    },
    function() {
        el.stop();
    });
}
tape_move();


function get_news() {
    var img = $(".list-news .js-news-1").children(".list-news__img").html();
    var text = $(".list-news .js-news-1").children(".list-news__body").html();
    $('.super-news__img').html(img);
    $('.super-news__text').html(text);
}

function slider_news() {
    $(".list-news .js-news-1").addClass("is-active");
    var cycle = setInterval(function() {
        $(".list-news .is-active").each(function(i){
            $(this).addClass('js-news'+i);
            if ($(".list-news .js-news-4").hasClass("is-active")) {
                $(".list-news .js-news-1").addClass("is-active");
                $(".list-news .js-news-4").removeClass("is-active");
                get_news();
            }
            else {
                $(this).removeClass("is-active");
                $(this).next().addClass("is-active");
                //$('.super-news').html($(this).next().html());
                var img = $(this).next().children(".list-news__img").html();
                var text = $(this).next().children(".list-news__body").html();
                $('.super-news__img').html(img);
                $('.super-news__text').html(text);
            }
        });
    }, 3000);
    // get first news aftre page loaded
    get_news();
    // get news on click
    $('.list-news li').click(function(){
        $('.list-news li').removeClass("is-active");
        $(this).addClass("is-active");

                var img = $('.list-news .is-active').children(".list-news__img").html();
                var text = $('.list-news .is-active').children(".list-news__body").html();
                $('.super-news__img').html(img);
                $('.super-news__text').html(text);

        clearInterval(cycle); // stop cycle on click
    });

    $('#sent-redactor').click(function() {
        $(".quest-form_alt").css("display", "block");
    });
    $('.close').click(function() {
        $(".quest-form_alt").css("display", "none");
    });
}
slider_news();






});