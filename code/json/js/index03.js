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

    $(".quickshop").on('click', function () {
        $(".pop_quick_wrap").show();
        
    });

    // $(".quickshop").click(function(){
    //     $(".pop_quick_wrap").show();
    //     alert('dd')
    // })



})

let url = 'http://stage.wishtrend.com/wp-json/wt/v1/products/shop/all?sort=&page=1&offset=16';

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

    printPage(response.data.max_page);

});

function printPage(page) {
    $(".pagenav").empty();
    let max_page = page;
    console.log(max_page);

    for (let i in page) {
        let html = `
                <ul>
                    <li><a href="#">${printPage()}</a></li>
                </ul>
                `;

        $(".pagenav").append(html);

        let page_html = '';

        for (let i = 0; i < max_page; i++) {
            `<li><a href="#">$</a></li>`
        }
        console.log(max_page)

        return `
             <ul>
                 ${page_html}
             </ul>
                 `;

    }


}

function makePage(paging) {

}


// function printPage(page) {
//     $(".pagenav").empty();

//     console.log(max_page);

// }

// function makePage(pagelist){
//     let max_page = page * 1;
// }

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
                                    ${price()}
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


        function price() {
            let regular_price = data[i].regular_price * 1;
            //console.log(regular_price);
            let sale_price = data[i].sale_price * 1;
            //console.log(sale_price);
            let price_html = '';

            let dc_price = Math.ceil(100 - (sale_price / regular_price * 100));
            //console.log(dc_price);

            if (regular_price === sale_price) {
                price_html = `<p>$${regular_price.toFixed(2)}</p>`;
            } else {
                price_html = `
                                    <p>${'$' + data[i].sale_price}</p>
                                    <del>${'$' + regular_price.toFixed(2)}</del>
                                    <span class="dc">${dc_price + '%'}</span>`;
            }

            return `
                    <h3>
                    ${price_html}
                    </h3>
                    `;
        }
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



function makeStar(rating) {
    // 별점을 반올림 합니다.
    let star_rate = Math.ceil(rating); // 4

    let star_html = '';

    for (let i = 0; i < 5; i++) {
        star_html += (i < star_rate) ?
            '<span><img src="images/star_rating.png" alt=""></span>' :
            '<span><img src="images/star_rating_empty.png" alt=""></span>';
    }

    return `
            <div class="stars">
                ${star_html}
            </div>
            `;


}


// function price(regularPrice){
//     let regular_Price = regularPrice;
//     console.log(regular_Price);

//     let price_html = '';


// }