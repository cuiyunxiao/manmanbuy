/**
 * Created by Ville on 2017/3/9.
 */
$(function() {

    /*=============方法的调用=============*/
    init();
    /*=============方法的定义=============*/
    function init() {

        getBrandTitle();
    }

    /*获取品牌列表数据*/
    function getBrandTitle() {
        $.get("http://139.199.157.195:9090/api/getbrandtitle", function(res) {
            var html = template("proLstTpl", res);
            $('.brand-List').html(html);
        });
    }

})