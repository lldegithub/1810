define(["jq"],function(jq){
    let arr = [];
        $.ajax({
            type:"get",
            url:"../api/data.php",
            success : function(res){
                arr = JSON.parse(res);
                arr.forEach(function(item){
                    let zhekou = (item.newprice / item.oldprice).toFixed(2);
                    item.zhe = (zhekou * 10 + "").slice(0,3);
                });
            },
            async : false
        });
        return arr;
});