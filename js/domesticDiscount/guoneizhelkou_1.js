

$(function () {

    /*==========�����ĵ���===============*/
    init();
    /*==========�����Ķ���===============*/

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
