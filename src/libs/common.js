// 获取上个月
export function getPreMonth(date) {
    let arr = date.split('-');
    let year = arr[0]; //获取当前日期的年份
    let month = arr[1]; //获取当前日期的月份
    let day = arr[2]; //获取当前日期的日
    let days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    let year2 = year;
    let month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    let day2 = day;
    let days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    let t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
}

// 获取两个日期间隔的天数
export function getDays(date1, date2) {
    let date1Str = date1.split("-");
    //将日期字符串分隔为数组,数组元素分别为年.月.日
    // 根据年 . 月 . 日的值创建Date对象
    let date1Obj = new Date(date1Str[0], (date1Str[1] - 1), date1Str[2]);
    let date2Str = date2.split("-");
    let date2Obj = new Date(date2Str[0], (date2Str[1] - 1), date2Str[2]);
    let t1 = date1Obj.getTime();
    let t2 = date2Obj.getTime();
    let dateTime = 1000 * 60 * 60 * 24; //每一天的毫秒数
    let minusDays = Math.floor(((t2 - t1) / dateTime));//计算出两个日期的天数差
    let days = Math.abs(minusDays);//取绝对值
    return days;
}

export function GetDateStr(AddDayCount)
{
    var dd = new Date();
    dd.setTime(dd.getTime()+AddDayCount*1000*24*60*60);//获取AddDayCount天后的日期
    var y = dd.getFullYear().toString();
    var m = dd.getMonth()+1;//获取当前月份的日期
    var f_m = m> 9 ? m.toString() : "0" + m.toString();
    var d = dd.getDate();
    var f_d =d > 9 ? d.toString() : "0" + d.toString();
    return y+"-"+f_m+"-"+f_d;
}

export function mathRand(n) {
    var Num="";
    for(var i=0;i<n;i++)
    {
        Num+=Math.floor(Math.random()*10);
    }
    return Num;
}
