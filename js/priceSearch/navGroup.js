/**
 * Created by Administrator on 2017/3/7.
 */
$(function(){
    //��������
    init();

    //��ʼ��

    function init(){

        //getNavdefault();
        getNavHeading();
        defaultToggle();
        getProduct();

    }

    //��ҳ��������Ⱦ
    function getNavHeading() {
        $.get('http://139.199.157.195:9090/api/getcategorytitle', function (result) {
            var html = template('navHeadingtpl', result);
            //��̬��Ⱦ
            $('.nav-group').html(html);
        });


    }

    //����»�
    function defaultToggle(){
        $('.nav-group').on("click",".nav-default", function(){
            var id = $(this).attr('data-id');

            getNavdefault(id);
            $('.nav-collapse').slideToggle();

        });


    }


//��ҳ���������б���Ⱦ
    function getNavdefault(id){
        //��ȡ����������
        $.get('http://139.199.157.195:9090/api/getcategory?titleid=0'+id,function(result){
            var html = template('categoryListTpl',result);
            //��̬��Ⱦ
            $('.nav-collapse> .nav-body >.row').html(html);
        });
    }


    //��Ʒ�б���Ⱦ
    function getProduct() {
        $.get('http://139.199.157.195:9090/api/getproductlist?categoryid=0', function (result) {
            var html = template('productListtpl', result);
            //��̬��Ⱦ
            $('.product-list').html(html);
        });


    }

});