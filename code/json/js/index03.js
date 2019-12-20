$(document).ready(function () {
    
    

    //     $('.pdt_thumb').mouseover(function(){
    //         $('.hover-img').css({visibility: "inherit", opacity:"1"});
    //         $('.quickshop').css({visibility: "inherit", opacity:"1", transform: "translate(0,-100%)"});
    //     });
    //     $('.pdt_thumb').mouseleave(function(){
    //         $('.hover-img').css({visibility: "hidden", opacity:"0"});
    //         $('.quickshop').css({visibility: "hidden", opacity:"0", transform: "translate(0,0)"});
    //     })

    //     $('.product').hover(function(){
    //         $(this).addClass('on');
    //     },function(){
    //         $(this).removeClass('on');
    //     });

    // $('.product').hover(function () {
    //     $(this).toggleClass('on');
    // });

    $(".productlist").on('mouseenter', '.product', function () {
        $(this).addClass('on');
    }).on('mouseleave', '.product', function () {
        $(this).removeClass('on');
    });

    // $(".btn_like").on('click',function () {
    //     $('.show').toggle();
    //     $('.fill').toggle();
    // });
    // $('.productlist').on('click','.btn_like',function(){
    //     $('.show').toggle();
    //     $('.fill').toggle();
    // })

    $('.productlist').on('click','.show',function(){
        $(this).hide();
    }).on('click','.fill',function(){
        $(this).show();
    })

    //html에 있는 클래스로 인식~~
    // $('.pop_quickshop_zone').hide();
    $('.productlist').on('click','.quickshop p' ,function () {
        $(".pop_quickshop_zone").show();
        galleryThumbs.update();
        galleryTop.update();
    });


//팝업 닫기 
    $('.productlist_wrap').on('click','.pop_close', function(){
        $(".pop_quickshop_zone").hide();
    })


    $('.pop_quickshop_zone').on('click','.selected' ,function () {
        //$(".options").show();
        $(this).find('.options').slideToggle();
        
    });

    
    getProductData(1);

});

function getProductData( page ) {
    let url = `http://stage.wishtrend.com/wp-json/wt/v1/products/shop/all?sort=&page=${page}&offset=16`;

    // jquery 의 ajax 메소드?
    // $.get / $.getJSON / $.post / $.ajax
    $.get(url, {}, function (response) {
        console.log(response);

        // var is_success;

        // if ( response.success === true ) {
        //     is_success = true;
        // } else {
        //     is_success = false;
        // }
        // 삼항연산자.
        // var is_success = ( response.success === true ? true : false );

        printProduct(response.data.products);

        printPage(response.data.max_page, response.data.page);
        
    

        

    });
}


//프린트하고,, 붙이기 



function printProduct(data) {

    $(".productlist").empty();

    for (let i in data) {

        let html = `
                <div class="product">
                    <a href="#">
                        <div class="pdt_thumb">
                            
                            <div class="img" style="background-image: url(https://www.wishtrend.com${data[i].thumbnail});"></div>
                            <div class="hover-img" style="background-image: url(https://www.wishtrend.com${data[i].thumbnail_hover});"></div>
                            <div class="quickshop">
                                <p>QUICKSHOP</p>
                            </div>
                            <div class="btn_like">
                                <span>
                                    <img class="show" src="images/ico_like.svg" alt="">
                                    <img class="fill" src="images/ico_like_color.svg" alt="">
                                </span>
                            </div>
                        </div>
                        <div class="pdt_info">
                            <!-- <div class="is_vegan">${data[i].is_vegan}</div> -->
                            <div class="info_brand">
                                <h3>${data[i].brand}</h3>
                            </div>
                            <div class="info_name">
                                <h3>${data[i].post_title}</h3>
                            </div>
                            
                            <div class="info_price">
                                <h3>
                                    ${price(data[i].regular_price, data[i].sale_price)}
                                </h3>
                            </div>
                        </div>
                        <div class="pdt_review">
                            <div class="rating">
                                ${makeStar(data[i].review_rating)}
                                <div class="count">
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                `;



        $(".productlist").append(html);

        //함수를 굳이 안써도 된다 ,, 
        // function price(){
        //     let price_html='';


        //     (regular_price == sale_price) ?
        //     '<p>'+ regular_price +'</p>':
        //     '<p>'+ sale_price + '</p>';


        // if ( regular_price == sale_price){
        //     '<p>'+regular_price+'</p>'
        // }else{
        //     '<del>'+ regular_price + '</del>'
        // }

        // }

        // let is_vegan = data[i].is_vegan;
        // if(is_vegan = 'Y'){
        //     true;
        // }else{
        //     false;
        // }
        // console.log(is_vegan);

    }

}

function price(regular_price, sale_price) {
    regular_price = regular_price * 1;
    sale_price = sale_price * 1;
    console.log(regular_price, sale_price);
    let price_html = '';

    if (regular_price === sale_price) {
        price_html = `<p>$${regular_price.toFixed(2)}</p>`;
    } else {

        let dc_price = Math.ceil(100 - (sale_price / regular_price * 100));
        //console.log(dc_price);
        price_html = `
                            <p>${'$' + sale_price.toFixed(2)}</p>
                            <del>${'$' + regular_price.toFixed(2)}</del>
                            <span class="dc">${dc_price + '%'}</span>`;
    }

    return `
            <h3>
            ${price_html}
            </h3>
            `;
}


function makeStar(rating) {
    // 별점을 반올림 합니다.
    let star_rate = Math.ceil(rating); // 4

    let star_html = '';

    for (let i = 0; i < 5; i++) {
        star_html = star_html + (i < star_rate ?
            '<span><img src="images/star_rating.png" alt=""></span>' :
            '<span><img src="images/star_rating_empty.png" alt=""></span>');
    }

    return `
            <div class="stars">
                ${star_html}
            </div>
            `;

}

function printPage(max_page, current_page){
    console.log(max_page, current_page);
    $(".pagenav ul").empty();

    // let html = '<ul>';

    for (let i = 1; i <= max_page; i++){
        let html = `<li class="${(i === current_page ? 'active' : '')}"><a href="javascript:getProductData(${i});">${i}</a></li>`;            
        $(".pagenav ul").append(html);
    }

    // html += '</ul>';
    // $(".pagenav").html(html);
}


// function price(regularPrice){
//     let regular_Price = regularPrice;
//     console.log(regular_Price);

//     let price_html = '';


// }


