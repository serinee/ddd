$(document).ready(function () {
    //스크립트로 html 작성하면 작동 안함 .product가 스크립트 html이어서 ,, 
    // $('.product').hover(function () {
    //     $(this).toggleClass('on');
    // });

    //html안에 있는 큰 .productlist를 지정해서 안에 있는 .product를 선택자로 쓴다.
    $(".productlist").on('mouseenter', '.product', function () {
        $(this).addClass('on');
    }).on('mouseleave', '.product', function () {
        $(this).removeClass('on');
    })

    //this를 안 써서 모든 show,fill이 반응
    /* $('.productlist').on('click','.btn_like',function(){
        $('.show').toggle();
        $('.fill').toggle();
    }) */

    //find로 지정
    $('.productlist').on('click', '.btn_like', function () {
        $(this).find('.show').toggle();
        $(this).find(".fill").toggle();
    })

    //swiper 플러그인이 안 먹어서 update()
    $('.productlist').on('click', '.quickshop p', function () {
        $(".pop_quickshop_zone").show();
        galleryThumbs.update();
        galleryTop.update();
    });


    //팝업 닫기 
    $('.productlist_wrap').on('click', '.pop_close', function () {
        $(".pop_quickshop_zone").hide();
    })

    //팝업 옵션 - this
    $('.pop_quickshop_zone').on('click', '.selected', function () {
        //$(".options").show();
        $(this).find('.options').slideToggle();

    });

    //데이터 받아오기 1페이지
    getProductData(1);

});

//a 링크 막기,, ? 

function getProductData(page) {
    let url = `http://stage.wishtrend.com/wp-json/wt/v1/products/shop/all?sort=&page=${page}&offset=16`;

    $.get(url, {}, function (response) {
        console.log(response);

        printProduct(response.data.products);
        
        printPageNum(response.data.max_page, response.data.page);
        console.log(printPageNum);


    })

    //프린트하고 붙인다



}

function printProduct(data) {
    $('.productlist').empty();

    //오브젝트 타입일 때 for ( let 변수 in 오브젝트이름 ) 이렇게 씀 
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
                            <!-- <div class="is_vegan"></div> -->
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
                                    <span>${'('+ data[i]. review +')'}</span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                `;

        $('.productlist').append(html);
    }
}

//정상가, 세일가, 할인율 구하기
function price(regular_price, sale_price){
    regular_price = regular_price * 1; //문자를 숫자로 바꾸기 위해 간단히 * 1 을 해 준다.
    sale_price = sale_price * 1;
    //console.log(regular_price, sale_price);

    let price_html = '';

    if ( regular_price === sale_price){
        price_html = `<p>$${regular_price.toFixed(2)}</p>`;
    }else{
        let dc_price = Math.ceil( 100 - (sale_price / regular_price * 100));
        console.log(dc_price);
        price_html = `
                    <p>${'$' + sale_price.toFixed(2)}</p>
                    <del>${'$' + regular_price.toFixed(2)}</del>
                    <span class='dc'>${dc_price + '%'}</span>
                    `;
    }

    return `
            <h3>
            ${price_html}
            </h3>
            `
}

//별점 만들기
function makeStar(rating){
    let star_rate = Math.ceil(rating);

    let star_html = '';

    for ( let i = 0; i < 5; i++ ){
        // star_html = star_html + ( i < star_rate ?
        //     '<span><img src="images/star_rating.png" alt=""><span>' :
        //     '<span><img src="images/star_rating_empty.png" alt=""></span>');

        star_html += ( i < star_rate ) ?
            '<span><img src="images/star_rating.png" alt=""></span>' :
            '<span><img src="images/star_rating_empty.png" alt=""></span>';
    }

    return `
            <div class="stars">
                ${star_html}
            </div>
            `
}

//페이징하기~!
function printPageNum(max_page, current_page){
    $('.pagenav ul').empty();

    for ( let i = 1; i <= max_page; i++){
        let html = `<li class="${(i === current_page ? 'active' : '')}"><a href="javascript:getProductData(${i});">${i}</a></li>`;
        $(".pagenav ul").append(html);
    }
}