/**
 * Created by Administrator on 2017/3/7.
 */
$(function(){
    //��������
    init();

    //��ʼ��

    function init(){


        getNavHeading();
        defaultToggle();
        getProduct();
        getBijia();
        getCom();



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

            var id = $(this).data("id");

            getNavdefault(id,this);


        });
    }


//��ҳ���������б���Ⱦ
    function getNavdefault(id,target){
        //��ȡ����������
        $.get('http://139.199.157.195:9090/api/getcategory?titleid='+id,function(result){
            var html = template('categoryListTpl',result);
            //��̬��Ⱦ

            //��̬��Ⱦ��Ҫʱ�䣬���Ը��¼����һ����ʱ����Ȼ�Ӿ�������
            setTimeout(function(){

                //���stop���������ظ�ִ��
                $(target).find(".nav-collapse").stop().slideToggle();
                //һ���»�ʱ��һ���ϻ�
                $(target).siblings('.nav-default').find('.nav-collapse').slideUp();
                },50)
            $(target).find(".row").html(html);


            //$(this).find(".nav-collapse").slideToggle();
            //$('.nav-collapse> .nav-body >.row').html(html);
        });


    }




    //��Ʒ�б���Ⱦ

    function getProduct() {
         //��ȡURL���ݵĲ���
        var id = getQueryString('categoryid');
          var title =getQueryString('category');

        $.get('http://139.199.157.195:9090/api/getproductlist?categoryid='+id, function (result) {
            var html = template('productListtpl', result);
            //��̬��Ⱦ
            $('.product-list').html(html);

            $('.title').html(title);
            //console.log(title);
        });



    }

    //�ȼ�
    function getBijia() {
        var id = getQueryString('productid');
        $.get('http://139.199.157.195:9090/api/getproduct?productid='+id, function (result) {
            var html = template('productbijia', result);
            //��̬��Ⱦ
            $('.product-bijia').html(html);
        });


    }
    //����
    function getCom() {
        var id = getQueryString('productid');
        $.get('http://139.199.157.195:9090/api/getproductcom?productid='+id, function (result) {
            var html = template('productpjtpl', result);
            //��̬��Ⱦ
            $('.pcom').html(html);
        });


    }

    function getQueryString(key) {

        // ȥ���ַ�������ĸ?��
        var search = location.search.slice(1);

        // ʹ��&���ŵõ�ÿһ��key=val
        var searchArr = search.split('&');
        var tempArr = null;
        var searchObj = {};

        // ���������е�ÿһ��key=val�ַ�����ʹ��=��������
        // Ȼ����keyΪ����valΪֵ��ӵ�searchObj�����С�
        for( var i =0, len = searchArr.length; i < len; i++) {
            tempArr = searchArr[i].split('=');
            searchObj[ tempArr[0] ] = tempArr[1];
        }

        // �в�������ָ��ֵ��û�в�������ȫ��ֵ

        return arguments.length? decodeURI(searchObj[key]):searchObj;
        //return searchObj;
    };

});