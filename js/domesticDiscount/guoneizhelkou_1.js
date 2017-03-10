

$(function () {

    /*==========方法的调用===============*/
    init();
    /*==========方法的定义===============*/

    function init() {
        getDiscountProduct(getQueryString('productid'));
    }

    function getDiscountProduct(productid) {
        $.ajax({
            url: "http://139.199.157.195:9090/api/getdiscountproduct",
            data: { 'productid': productid },
            success: function (data) {
                var html = template("discountProduct", data);
                $('.discount-product').html(html);
            }
        })
    }

});
