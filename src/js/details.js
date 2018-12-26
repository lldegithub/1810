require(["config"],function(){
    require(["jq","loginbar","data","totop","fdj","tab","xiding","dlrendar"],function(a,b,c){
        // 控制商品分类那里的那个箭头转
        let $classify = $(".classify");
        console.log($classify);
        let $i = $classify.children(".classify_i");
        $classify.on("mouseenter",function(){
            $i.css({"transform":"rotate(180deg)","transition":"all .3s"});
        }).on("mouseleave",function(){
            $i.css({"transform":"rotate(0deg)","transition":"all .3s"});
        });

        // 渲染页面
        let itemArr = c;
        // console.log(itemArr);
        let id = location.search.slice(1).split("=")[1];
        let goods = [];
        // console.log(id);
        for(let i = 0;i<itemArr.length;i++){
            if(id == itemArr[i].id){
                goods = itemArr[i];
            }
        }
        $("span.title").html(""+goods.title+"");


        // 主图部分渲染
        let $main_tu = $(".main_tu");
        zhutu(goods);
        function zhutu(obj){
            let str = "";
            str += ` <div class="tu_l fl">
                <h3>
                    ${obj.title}
                </h3>
                <p>
                    ${obj.introduction}
                </p>
                <div class="zhutu">
                    <img src="${obj.img2}" alt="">
                    <div class="small"></div>
                    <div class="big">
                        <img src="${obj.img2}" alt="">
                    </div>
                </div>
                <div class="tu_l_b">
                    <span class="tips">${obj.tip}</span>
                    <div class="share fr">
                        <i class="share_i"></i>
                        <b>分享到</b>
                        <div class="kuang">
                            <span class="sj1"></span>
                            <span class="sj2"></span>
                            <div class="tus">
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tu_r fr">
                <div class="logo">
                    <img src="${obj.img3}" alt="">
                </div>
                <div class="tu_r_c">
                    <p style="margin-bottom:25px;">
                        <span style="color:#999;">价格</span>
                        <span style="color:#f00;margin-left:40px;">￥</span>
                        <strong style="font-size:26px;color:#f00;margin-right:10px;">${obj.newprice}</strong>
                        <b style="color:#fff;background:#f00;font-weight:normal;margin-right:20px;">${obj.zhe}折</b>
                        <del style="color:#999;">￥${obj.oldprice}</del>
                    </p>
                    <p>
                        <span style="color:#999;">优惠</span>
                        <i style="margin-left:40px;"></i>
                        <span>全场满99包邮</span>
                    </p>
                </div>
                <div class="tu_r_b">
                    <div class="shuliang">
                        <span>购买数量</span>
                        <input type="button" class="jian" value="-"><input type="text" class="num" value="1"><input type="button" class="jia" value="+">
                    </div>
                    <div class="cartBtn">
                        加入购物车
                    </div>
                    <p>
                        购买最多可以获得
                        <span style="color:#f00;">${parseInt(obj.newprice / 2)}个</span>
                        花粉
                    </p>
                </div>

            </div>`;
            $main_tu.html(str);
        }

        // 吸顶价格渲染
        let $xq_r = $(".xq_r");
        xqRendar(goods);
        function xqRendar(obj){
            $xq_r[0].innerHTML = `<strong>￥${obj.newprice}</strong>
                    <del>￥${obj.oldprice}</del>
                    <span class="cartBtn">加入购物车</span>`;
        }
    })
});