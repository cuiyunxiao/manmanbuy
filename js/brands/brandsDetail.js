$(function () {

    /*==========方法的调用=============*/
    init();
    /*==========方法的定义==============*/

    /*初始化*/
    function init() {
        var brandTitleId = 0;
        getBrandTitle(brandTitleId);

    }

    /*请求品牌标题数据*/
    function getBrandTitle(brandTitleId) {
        $.get("http://139.199.157.195:9090/api/getbrand?brandtitleid=" + brandTitleId, function (res) {
            var html = template("brandListTpl", res);
            $(".brand-list>ul").html(html);
            getBrandProductList(brandTitleId);
        });
    }

    // http://139.199.157.195:9090/api/getbrandproductlist?brandtitleid=0&pagesize=4
    /* 获取销量排行*/
    function getBrandProductList(brandTitleId) {
        $.get("http://139.199.157.195:9090/api/getbrandproductlist?brandtitleid=" + brandTitleId + "&pagesize=4", function (res) {
            var html = template("productListTpl", res);
            $(".product-list").html(html);
            getProDuctcom(brandTitleId,res.result[0]);
        });
    }

    /*获取商品评论*/
    function getProDuctcom(brandTitleId,product){
        $.get("http://139.199.157.195:9090/api/getproductcom?productid="+product.productId,function(res){
            res.result.product=product;
            var html=template("productComTpl",res);
            $(".product-com ul").html(html);
        })

    }
})