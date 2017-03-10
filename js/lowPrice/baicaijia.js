//�����ĵ���
$(function () {
    //��������
    // ��һ�������洢λ��
    var leDis = 0;

    // ���ɾ���
    var spring = 30;
    // �Ѿ������˵ľ���
    var alrDis = 0;
    init();
    //������װ
    function init() {
        getBaiCaiJiaTitle();
        getBaiCaijiaProduct(0);
        clickTitleEvent();
    }

//��ȡ�������б������
    function getBaiCaiJiaTitle(titleid) {
        $.get("http://139.199.157.195:9090/api/getbaicaijiatitle", function (res) {
            //�������ݱ���
            var html = template("baicaijiaTitleTmp", res);
            $(".content ul").html(html);
            $(".content ul  :first").addClass("active");
            var tmpWidth = 0;
            $.each($(".content ul li "), function (i, value) {
                tmpWidth += $(value).width();
            });
            $(".content ul").width(tmpWidth);
            //ʵ�ֻ���
            move();

        })
    }

    //��ȡ�ײ˼۵���Ʒ�б�
    function getBaiCaijiaProduct(titleid) {

        $.get("http://139.199.157.195:9090/api/getbaicaijiaproduct?titleid=" + titleid, function (res) {
            var html = template("baicaijiaProductTmp", res);
            $(".products ul").html(html);
        });
    }

//ʵ�ֻ���
    function move() {
        //�ȼ�¼��ʼʱ��λ��
        var startX = 0;
        leDis = $(".content ul").width() - $(".content").width() + 38 + spring;
        //��ʼ����
        $(".content ul").on("touchstart", function (e) {
            var _touch = e.originalEvent.targetTouches[0];
            startX = _touch.pageX;
        });

//���ڻ���
        $(".content ul").on("touchmove", function (e) {
            var _touch = e.originalEvent.targetTouches[0];
            var dis = _touch.pageX - startX + alrDis
//��ʼ�ƶ�
//�ж��Ƿ�����ƶ����ɾ���
            if (dis >= spring) {
                dis = spring;
            }
            //���󻬶�ʱ���жϾ���
            if (dis < (-leDis)) {
                dis = -leDis;
            }
            $(".content ul").css("transition", "none");
            $(".content ul").css("transform", "translateX(" + dis + "px)");

        });

//��������
        $(".content ul").on(".touchend", function (e) {
            var _touch = e.originalEvent.changedTouches[0];
            //�ٴ��϶���ʹ��alrDis
            alrDis = _touch.pageX - startX + alrDis;
            //�ж��ƶ��Ƿ���ڵ��ɾ���
            if (alrDis >= spring) {
                alrDis = 0;
                $(".content ul").css("transition", "all .2s");
                $(".content ul").css("transform", "translateX(" + 0 + "px)");
            }
            //���󻬶�ʱ���жϾ���
            if (alrDis < (-leDis)) {
                alrDis = spring - leDis;
                $(".content ul").css("transition", "all .2s");
                $(".content ul").css("transform", "translateX(" + alrDis + "px)");
            }
        })
    }

//����������¼�ʹ���¼�ί��
    function clickTitleEvent() {
        $('.content ul').on('click', "li a", function () {
            //��ȡ��ǰ�ĵ������Ϊ�Ǹ�a��ǩ��ӵ���¼�����ͨ�����ĸ�Ԫ�ص�id
            var titleid = $(this).parent('li').data("titleid");
            //��Ⱦ���� �ڵ�ǰtitleidҲ��li��ǩ������
            $(this).parent("li").addClass("active").siblings("").removeClass("active");
            //tmpwidth��ʵ��������ƶ�����
            var tmpWidth = 0;
            $.each($(".content ul li"), function (i, v) {
                if (i < titleid) {
                    tmpWidth += $(v).width();
                }
            });

            if (tmpWidth >= leDis) {
                tmpWidth = leDis - spring;
            }
            $(".content ul").css("transition", "all .2s");
            $(".content ul").css("transform", "translateX(" + (-tmpWidth) + "px)");
            alrDis = -tmpWidth;
            getBaiCaijiaProduct(titleid);

        });
    }

})