/**
 * Created by Administrator on 2017/3/9.
 */
$(function(){
    //��������
    init();

    //��ʼ��

    function init(){
        getProductlist();

    }

    //��ȡ��ҳ�˵�����
    function getProductlist(){
        $.get('http://139.199.157.195:9090/api/getproductlist?categoryid=1',function(result){
            //����ģ��
            var html =template('productListtpl',result);
            //��̬��Ⱦ
            $('.product-list').html(html);
        });
    }


});