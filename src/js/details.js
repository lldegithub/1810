require(["config"],function(){
    require(["jq","loginbar","data","totop","fdj","tab","xiding","dlrendar"],function(a,b,c){
        // 控制商品分类那里的那个箭头转
        let $classify = $(".classify");
        // console.log($classify);
        let $i = $classify.children(".classify_i");
        $classify.on("mouseenter",function(){
            $i.css({"transform":"rotate(180deg)","transition":"all .3s"});
        }).on("mouseleave",function(){
            $i.css({"transform":"rotate(0deg)","transition":"all .3s"});
        });

        // 封装cookie的设置、获取、删除
        var Cookie = {
            setCookie : function(name,val,date,path){
                var str = name+"="+val;
                if(date){
                    str += "; expires="+date.toUTCString();
                }
                if(path){
                    str += "; path="+path;
                }
                document.cookie = str;
            },
            // 获取cookie
            getCookie : function(name){
                var cookie = document.cookie;//"left=300; age=17"
                if(cookie == ""){
                    return "";
                }else{
                    var cookieArr = cookie.split("; ");
                    for(var i=0;i<cookieArr.length;i++){
                        var arr = cookieArr[i].split("=");
                        if(arr[0] == name){
                            return arr[1];
                        }
                    }
                    return "";
                }
            },
            // 删除某条cookie
            delCookie : function(name,path){
                var d = new Date();
                d.setDate(d.getDate()-1);
                Cookie.setCookie(name,"",d,path);
            }
        }

        // 渲染页面
        let itemArr = c;
        // console.log(itemArr);
        let id = location.search.slice(1).split("=")[1];
        let goods = {};
        // console.log(id);
        for(let i = 0;i<itemArr.length;i++){
            if(id == itemArr[i].id){
                goods = itemArr[i];
            }
        }
        $("span.title").html(""+goods.title+"");
// console.log(goods);

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

        // 点击加入购物车
        let $carDiv = $("div.cartBtn");
        let $shuliang = $(".shuliang .num");
        let $jian = $(".jian");
        let $jia = $(".jia");
        // 数量加减
        $jian.on("click",function(){
            let _shuliang = $shuliang.val();
            _shuliang = parseInt(_shuliang) - 1;
            if(_shuliang < 1){
                _shuliang = 1;
            }
            $shuliang.val(_shuliang);
        });
        $jia.on("click",function(){
            let _shuliang = $shuliang.val();
            _shuliang = parseInt(_shuliang) + 1;
            $shuliang.val(_shuliang);
        });
        $shuliang.on("change",function(){
            if($(this).val() < 1){
                $(this).val(1);
            }
            let _shuliang = $shuliang.val();
            $shuliang.val(parseInt(_shuliang));
        });
        let $cartBtn = $("span.cartBtn");
        // console.log($cartBtn);
        let cartArr = [];
        let cart = "";
        let cookie = Cookie.getCookie("uname");
        if(cookie){
            $.ajax({
                type : "post",
                url : "../api/cart.php",
                data : {"name":cookie},
                success : function(res){
                    if(!JSON.parse(res)[0].cart){
                        cart = "";
                    }else{
                        // console.log(666);
                        cart = JSON.parse((JSON.parse(res))[0].cart);
                    }
                    if(!cart){
                        cart = [];
                    }else{
                        cartArr = cart;
                    }
                    // console.log(cartArr);
                },
                async : false
            });
        }

        let $shopping_btn2 = $(".shopping-btn2");

        gwcRendar(cartArr);
        $carDiv.on("click",function(e){
            let _shuliang = $shuliang.val();
            e.stopPropagation();
            let guid = goods.id;
            gouwuche(guid,_shuliang);
            gwcRendar(cartArr);
            tcRendar();
        });
        $cartBtn.on("click",function(e){
            e.stopPropagation();
            let guid = goods.id;
            gouwuche(guid,1);
            gwcRendar(cartArr);
            tcRendar();
        });

        let $shopping = $(".shopping");
        let $shopping_btn = $(".shopping-btn");
        let $gwclist = $(".gwclist");
        $shopping.on("mouseover",function() {
            // console.log(666);
            if (cartArr.length == 0) {
                $shopping_btn.css("display", "none");
                $shopping_btn2.css("display","block");
                $gwclist.css("display","block");
            }else{
                $shopping_btn.css("display", "none");
                $shopping_btn2.css("display","block");
                $gwclist.css("display","block");
            }
        }).on("mouseout",function(){
            $shopping_btn.css("display", "block");
            $shopping_btn2.css("display","none");
            $gwclist.css("display","none");
        });

        function gwcRendar(arr){
            let count = 0;
            let totaljia = 0;
            for(let i = 0;i < arr.length;i++){
                count += parseInt(arr[i].qty);
                totaljia += arr[i].qty * itemArr[arr[i].id - 1].newprice;
            }
            let $shoppingBtn = $(".shopping-btn");
            $shoppingBtn.children("strong").html(count);
            let str = `<div class="shopping-title">
                            <strong>${count}</strong>
                        </div>
                        <!--<div class="shopping-content">-->
                            <!--<img src="../img/gwc.png" alt="">-->
                        <!--</div>-->
                        <div class="gwclist">
                            <ul>`;
            str += arr.map(function(item){
                let goods = itemArr[item.id - 1];
                return `<li class="clearfix">
                            <img src="${goods.img1}" alt="">
                            <p>
                                ${goods.title}
                            </p>
                            <span>
                                X${item.qty}
                            </span>
                            <span style="color:#f00;font-weight:bold;">
                                ￥${goods.newprice}
                            </span>
                        </li>`;
            }).join("");
            str += `</ul>
                    <div class="gwc_b clearfix">
                        <div class="gwc_b_l fl">
                            <p>
                                共
                                <span style="color:#f00;">
                                    ${count}
                                </span>
                                件商品
                            </p>
                            <p>共计:
                                <span style="color:#f00;">
                                    ￥
                                </span>
                                <span style="color:#f00;font-size:18px;">
                                    ${totaljia}
                                </span>
                            </p>
                        </div>
                        <div class="gwc_b_r fr">
                            <a href="cart.html">
                                去购物车结算
                            </a>
                        </div>
                    </div>`;
            $shopping_btn2.html(str);
        }

        function gouwuche(guid,qty){
            if(!cookie){
                location.href = "../html/reg.html";
            }else{
                $.ajax({
                    type : "post",
                    url : "../api/cart.php",
                    data : {"name":cookie},
                    success : function(res){
                        if(!JSON.parse(res)[0].cart){
                            cart = "";
                        }else{
                            // console.log(666);
                            cart = JSON.parse((JSON.parse(res))[0].cart);
                        }
                        if(!cart){
                            cart = [];
                        }else{
                            cartArr = cart;
                        }
                        // console.log(cartArr);
                    },
                    async : false
                });
                // console.log(cartArr);
                let num = -1;
                let res = cartArr.some(function(item,idx){
                    num = idx;
                    // console.log(item.id,guid,idx);
                    return item.id == guid;
                });
                if(res){
                    cartArr[num].qty = parseInt(cartArr[num].qty) + parseInt(qty);
                }else{
                    cartArr.push(itemArr[guid - 1]);
                    // console.log(qty);
                    cartArr[cartArr.length - 1].qty = qty;
                }
                let shujuArr = [];
                let obj = {};
                for(let i = 0;i < cartArr.length;i++){
                    obj.id = cartArr[i].id;
                    obj.qty = cartArr[i].qty;
                    shujuArr.push(Object.assign({},obj));
                }
                // console.log(shujuArr.length);
                let cartStr = JSON.stringify(shujuArr);
                // console.log(shujuArr);
                $.ajax({
                    type : "post",
                    url : "../api/xieru.php",
                    data : {"name":cookie,"cart":cartStr},
                    success : function(res){

                    }
                });
            }
        }

        function tcRendar(){
            let cartArr = [];
            let cart = [];
            if(cookie){
                $.ajax({
                    type : "post",
                    url : "../api/cart.php",
                    data : {"name":cookie},
                    success : function(res){
                        if(!JSON.parse(res)[0].cart){
                            cart = "";
                        }else{
                            // console.log(666);
                            cart = JSON.parse((JSON.parse(res))[0].cart);
                        }
                        if(!cart){
                            cart = [];
                        }else{
                            cartArr = cart;
                        }
                        // console.log(cartArr);
                    },
                    async : false
                });
            }
            let num = 0;
            let totalPrice = 0;
            if(cartArr){
                for(let i = 0;i < cartArr.length;i++){
                    num += parseInt(cartArr[i].qty);
                    totalPrice += cartArr[i].qty * itemArr[cartArr[i].id-1].newprice;
                }
            }
            // console.log(num,totalPrice);
            let $tc = $("<div>");
            let $p1 = $("<p>");
            let $span = $("<span>");
            $p1.html("该商品已成功加入购物车").appendTo($tc);
            $p1.prepend($span);
            let $p2 = $("<p>");
            $p2.html(pRendar(num,totalPrice)).appendTo($tc);
            let $p3 = $("<p>");
            let $a = $("<a href='../html/cart.html'>去结算</a>");
            $a.appendTo($p3);
            let $p3sp = $("<span><<继续购物</span>");
            $p3sp.appendTo($p3);
            $p3.appendTo($tc);
            let $btn = $("<span>X</span>");
            $btn.addClass("btn").appendTo($tc);
            $tc.addClass("tc").appendTo($("body"));
            $btn.on("click",function(){
                $tc.remove();
            });
            $p3sp.on("click",function(){
                $tc.remove();
            });
        }

        function pRendar(num,totalPrice){
            let str = "购物车共<span class='sp1'>" + num +
                "</span>件商品  合计:<span>"+totalPrice+"</span>元";
            return str;
        }


    });



});