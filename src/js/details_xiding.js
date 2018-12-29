define(["jq"],function(jq){
    // window.onload = function(){
        let $xiangqing = $(".xiangqing_t");
        let $zheli = $(".zheli");
        let $span = $(".xiangqing_t div span");
        let $height1 = $xiangqing.offset().top;
        // console.log($height1);
        let $left = $xiangqing.offset().left;
        let $width = $xiangqing.outerWidth();
        let $height2 = $zheli.offset().top;
        // console.log($height1,$height2);
        $span.on("click",function(){
            $span.removeClass("cur");
            $(this).addClass("cur");
            if(this.innerText.trim() == "商品详情"){
                $("html").animate({scrollTop:$height1},500);
            }else if(this.innerText.trim() == "乐蜂承诺"){
                $("html").animate({scrollTop:$height2},500);
            }
        });
        $(window).on("scroll",function(){
            if($(document).scrollTop() >= $height1){
                $xiangqing.addClass("fixed").css({"left":$left,"width":$width});
            }else{
                $xiangqing.removeClass("fixed");
            }
        })



    // $(window).on("load",function(){
    //     console.log($xiangqing.offset().top);
    //     console.log($zheli.offset().top);
    // });

});