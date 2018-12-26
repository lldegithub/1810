define(["jq"],function(jq){
    let $zhutu = $(".zhutu");
    let $small = $(".small");
    let $big = $(".big");
    $zhutu.on("mouseover",function(){
        $small.css("display","block");
        $big.css("display","block");
        $zhutu.on("mousemove",function(e){
            // console.log(e.clientX);
            let fuox = $zhutu.offset().left;
            let fuoy = $zhutu.offset().top;
            let ox = $small.outerWidth()/2;
            let oy = $small.outerHeight()/2;
            let left = e.pageX - ox - fuox;
            let top = e.pageY - oy - fuoy;
            if(left < 0){
                left = 0;
            }else if(left > $zhutu.outerWidth() - $small.outerWidth()){
                left = $zhutu.outerWidth() - $small.outerWidth();
            }
            if(top < 0){
                top = 0;
            }else if(top > $zhutu.outerHeight() - $small.outerHeight()){
                top = $zhutu.outerHeight() - $small.outerHeight();
            }
            $small.css("left",left);
            $small.css("top",top);
            // console.log($small.position(),fuoy);
            $big.children("img").css({"left":-left * 3,"top":-top*3});
        })
    }).on("mouseout",function(){
        $small.css("display","none");
        $big.css("display","none");
    })
});