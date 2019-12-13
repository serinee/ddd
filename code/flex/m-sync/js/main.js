var oldScrollTop = 0;
var scrollDirection;

$(document).ready(function () {

    $('nav').click(function(){
        $('.header-wrap').toggleClass('active');
        $('.menu-wrap').toggleClass('on');
        
        if($('.header-wrap').hasClass('active')){
            $('.top-logo').attr('src','images/logo-w.png');
        }else{
            $('.top-logo').attr('src','images/logo-b.png');
        }


    });

    setInterval(function () {
        console.log(scrollDirection);
        oldScrollTop = $(window).scrollTop();
    }, 1000);

    $(window).scroll(function () {
        var top = $(document).scrollTop();
        var h = $(window).height();
        var bottom = top + h;

        if (oldScrollTop > top) {
            scrollDirection = 'up';
        } else {
            scrollDirection = 'down';
        }

        $('.motion').each(function () {
            if (scrollDirection === 'up') {
                if (
                    $(this).hasClass('animate') &&
                    bottom < ($(this).offset().top - 20)
                ) {
                    $(this).removeClass('animate');
                }

            } else {
                if (
                    !$(this).hasClass('animate') &&
                    bottom > $(this).offset().top
                ) {
                    $(this).addClass('animate');
                }
            }
            // if(bottom > $(this).offset().top){
            //     $(this).addClass('animate');
            // }else{
            //     $(this).removeClass('animate');
            // }
        })
    });

    // $('body').on('mousewheel',function(event){
    //     var delta = event.originalEvent.wheelDelta;
    //     if( delta > 0){
    //         console.log('up');
    //         $('.motion').removeClass('animate');
    //     }else{
    //         console.log('down');
    //         $('.motion').addClass('animate');
    //     }
    // });
    //끝
})

// $(document).ready(function(){

//     $(window).scroll(function(){
//         var top = $(document).scrollTop();
//         var h = $(window).height();
//         var bottom = top + h;

//         $('.motion').each(function(){
//             if( bottom > $(this).offset().top){

//                 $(this).addClass('animate');
//             }  else{
//                 $(this).removeClass('animate');
//             }



//         });


//     }).trigger('scroll');