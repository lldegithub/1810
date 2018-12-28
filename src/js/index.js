require(["./config"],function(){
    require(["jq","loginbar","nav","content","data","totop","idpinpai"],function(a,b,c,d,e,f){
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
        };

        // 渲染商品列表
        let $list = $(".list");
        let $list_ul = $(".list ul");
        let itemArr = e;
        // console.log(itemArr);
        rendar(itemArr);
        let $listLi = $(".listLi");
        $listLi.on("click",function(){
            let guid = $(this).attr("guid");
            location.href = "../html/details.html?id="+guid;
        });

        // 点击加入购物车
        let $cartBtn = $("button.cartBtn");
        let cartArr = [];
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
        $cartBtn.on("click",function(e){
            e.stopPropagation();
            let guid = $(this).parents("li").attr("guid");
            gouwuche(guid);
            gwcRendar(cartArr);
            tcRendar();
        });

        // console.log(cartArr);
        let $shopping = $(".shopping");
        let $shopping_btn = $(".shopping-btn");
        let $shopping_content = $(".shopping-content");
        let $gwclist = $(".gwclist");
        $shopping.on("mouseover",function() {
            console.log(666);
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


        function gouwuche(guid){
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
                console.log(cartArr);
                let num = -1;
                let res = cartArr.some(function(item,idx){
                    num = idx;
                    console.log(item.id,guid,idx);
                    return item.id == guid;
                });
                if(res){
                    cartArr[num].qty++;
                }else{
                    cartArr.push(itemArr[guid - 1]);
                    cartArr[cartArr.length - 1].qty = 1;
                }
                let shujuArr = [];
                let obj = {};
                for(let i = 0;i < cartArr.length;i++){
                    obj.id = cartArr[i].id;
                    obj.qty = cartArr[i].qty;
                    shujuArr.push(Object.assign({},obj));
                }
                console.log(shujuArr.length);
                let cartStr = JSON.stringify(shujuArr);
                console.log(shujuArr);
                $.ajax({
                    type : "post",
                    url : "../api/xieru.php",
                    data : {"name":cookie,"cart":cartStr},
                    success : function(res){

                    }
                });
            }
        }

        function rendar(arr){
            $list_ul.html(
                arr.map(function(item){
                    return `<li guid="${item.id}" class="listLi">
                    <img src="${item.img1}" alt="">
                    <p class="title">
                        <span>${item.zhe}折/</span>
                        ${item.title.slice(0,20)}
                    </p>
                    <p class="price">
                        <span>￥${item.newprice}</span>
                        <del>￥${item.oldprice}</del>
                        <button class="cartBtn">加入购物车</button>
                    </p>
                </li>`;
                }).join("")
            )
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
            console.log(num,totalPrice);
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
    })
});