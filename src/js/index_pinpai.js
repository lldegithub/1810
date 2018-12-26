define(["jq","data"],function(jq,data){
    let itemArr = data;
    let $contentUl = $(".content ul");
    pinpaiRendar(itemArr);
    let $brandLi = $(".brand");
    $brandLi.on("click",function(){
        let guid = $(this).attr("guid");
        location.href = "../html/details.html?id="+guid;
    });
    function pinpaiRendar(arr){
        let str = "";
        str += arr.map(function(item){
            return `<li class="brand" guid="${item.id}">
                        <img src="" data-url="${item.img2}">
                        <p>
                            <span>
                              ${item.tip}
                            </span>
                            ${item.pp}
                        </p>
                    </li>`;
        }).join("");
        $contentUl.html(str);
    }
});