commonInit();

/*取到字符串里面的数字 */
function getNum(str) {
    if (!str || str.length == 0) {
        return "";
    } else {
        var ret = /\d+/.exec(str);
        if (!ret) {
            return "";
        }
        return parseInt(/\d+/.exec(str)[0]);
    }
}


/*取到url的参数*/
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}


function commonInit() {
    /* 往模版插件注册方法 */
    template.helper("getNum", getNum);
}