define(["jq"],function(jq){
    // 轮播图
    let $banner = $(".banner");
    let idx = 0;
    let timer = null;
    let $img = $(".banner img");
    let $ul = $(".banner ul");
    let $li = $(".banner ul li");
    timer = setInterval(function(){
        idx++;
        change();
    },2000);
    $banner.on("mouseover",function(){
        clearInterval(timer);
    }).on("mouseout",function(){
        timer = setInterval(function(){
            idx++;
            change();
        },2000);
    });
    $ul.on("click","li",function(){
        idx = this.dataset.li;
        change();
    });
    function change(){
        if(idx >= $img.length){
            idx = 0;
        }
        $img.stop().animate({"opacity":0},500);
        $li.removeClass("cur");
        $img.eq(idx).stop().animate({"opacity":1},500);
        $li.eq(idx).addClass("cur");
    }
});