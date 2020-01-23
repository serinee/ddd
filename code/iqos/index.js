$(document).ready(function(){
    $('#section03 .contents_title ul li').on('click',function(){
        $('#section03 .contents_title ul li').removeClass('active');
        $(this).addClass('active');
        return false;
    })
})