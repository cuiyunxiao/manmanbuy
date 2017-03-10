$(function () {

    /*==========�����ĵ���=============*/
    init();
    /*==========�����Ķ���==============*/

    /*��ʼ��*/
    function init() {
        var brandTitleId = 0;
        getBrandTitle(brandTitleId);

    }

    /*����Ʒ�Ʊ�������*/
    function getBrandTitle(brandTitleId) {
        $.get("http://139.199.157.195:9090/api/getbrand?brandtitleid=" + brandTitleId, function (res) {
            var html = template("brandListTpl", res);
            $(".brand-list>ul").html(html);
            getBrandProductList(brandTitleId);
        });
    }

    // http://139.199.157.195:9090/api/getbrandproductlist?brandtitleid=0&pagesize=4
    /* ��ȡ��������*/
    function getBrandProductList(brandTitleId) {
        $.get("http://139.199.157.195:9090/api/getbrandproductlist?brandtitleid=" + brandTitleId + "&pagesize=4", function (res) {
            var html = template("productListTpl", res);
            $(".product-list").html(html);
            getProDuctcom(brandTitleId,res.result[0]);
        });
    }

    /*��ȡ��Ʒ����*/
    function getProDuctcom(brandTitleId,product){
        $.get("http://139.199.157.195:9090/api/getproductcom?productid="+product.productId,function(res){
            res.result.product=product;
            var html=template("productComTpl",res);
            $(".product-com ul").html(html);
        })

    }
})