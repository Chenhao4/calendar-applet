import Taro from "@tarojs/taro";

export const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

export const dateToString = (date)=>{ 
  var year = date.getFullYear(); 
  var month =(date.getMonth() + 1).toString(); 
  var day = (date.getDate()).toString();  
  if (month.length == 1) { 
      month = "0" + month; 
  } 
  if (day.length == 1) { 
      day = "0" + day; 
  }
  var dateTime = year + "-" + month + "-" + day;
  return dateTime; 
}

export const monthToChinese = (month) =>{
  switch (month) {
    case 1:
      return '一';
    case 2:
      return '二';
    case 3:
      return '三';
    case 4:
      return '四';
    case 5:
      return '五';
    case 6:
      return '六';
    case 7:
      return '七';
    case 8:
      return '八';
    case 9:
      return '九';
    case 10:
      return '十';
    case 11:
      return '十一';
    case 12:
      return '十二';
  }
}

export const getWeekChinese = (date) =>{
  var a = new Array("日", "一", "二", "三", "四", "五", "六");  
  var week = date.getDay();  
  return '星期' + a[week];
}

export const getWeek = (date) =>{
  var a = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");  
  var week = date.getDay();  
  return a[week];
}