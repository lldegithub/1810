require(["./config"],function(){
    require(["jq","loginbar","nav","content","data","totop","idpinpai"],function(a,b,c,d,e,f){
        // 渲染商品列表
        $list = $(".list");
        $list_ul = $(".list ul");
        let itemArr = e;
        // console.log(itemArr);
        rendar(itemArr);
        let $listLi = $(".listLi");
        $listLi.on("click",function(){
            let guid = $(this).attr("guid");
            location.href = "../html/details.html?id="+guid;
        });
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
                        <button href="#">加入购物车</button>
                    </p>
                </li>`;
                }).join("")
            )
        }

    })
});