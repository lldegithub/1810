define(["jq"],function(){
    let $totop = $(".totop");
    let $sao = $(".sao");
    let $mifeng = $(".mifeng");
    let $btn = $(".mifeng i");
    $(window).on("scroll",function(){
        if($(document).scrollTop() >= 300){
            $totop.css("display","block");
            $sao.css("display","block");
        }else if($(document).scrollTop() < 300){
            $totop.css("display","none");
            $sao.css("display","none");
        }
    });
    if($(document).scrollTop() >= 300) {
        $totop.css("display", "block");
        $sao.css("display", "block");
    }
    $totop.on("click",function(){
        $("html").animate({scrollTop:0},500);
        return false;
    });
    $btn.on("click",function(){
        $mifeng.css("visibility","hidden");
    });
});