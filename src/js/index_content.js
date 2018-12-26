define(["jq","idpinpai"],function(jq){
      let $content = $(".content");
      let $ul = $(".content ul");
      let $brand = $(".brand");
      let $img = $(".brand img");
      $(window).on("scroll",function(){
          lazy();
      });
      lazy();
    function lazy(){
        // console.log(666);
        // 可视窗口的高度
        let $gaodu = $(window).height();
        // 浏览器窗口顶部距离文档顶部的距离
        let $ding = $(document).scrollTop();
        // 获取元素的尺寸
        // let $height = $brand.outerHeight(true);
        // 元素离文档顶部的距离
        // let toTop = $brand.offset().top;
        // console.log($gaodu,$ding,$height,toTop);
        // let keshigaodu = $gaodu + $ding;
        // let yuansugaodu = $height + toTop;
        for(let i = 0;i < $brand.length;i++){
            let $height = $brand.eq(i).outerHeight(true);
            let toTop = $brand.eq(i).offset().top;
            let keshigaodu = $gaodu + $ding;
            let yuansugaodu = $height + toTop;
            if(keshigaodu > toTop && yuansugaodu > $ding){
                let attr = $img.eq(i).attr("data-url");
                $img.eq(i).attr("src",attr);
                // console.log(attr);
            }
        }
    }
});