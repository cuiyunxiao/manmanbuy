/**
 * Created by Ville on 2017/3/9.
 */
$(function() {

    /*=============�����ĵ���=============*/
    init();
    /*=============�����Ķ���=============*/
    function init() {

        getBrandTitle();
    }

    /*��ȡƷ���б�����*/
    function getBrandTitle() {
        $.get("http://139.199.157.195:9090/api/getbrandtitle", function(res) {
            var html = template("proLstTpl", res);
            $('.brand-List').html(html);
        });
    }

})