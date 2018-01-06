import {Record, SORT_DOWN} from './containers/Record';  //SORT_UP

export const getItems = (numberValue=10) => {
    return Promise.resolve(
        new Array(numberValue).fill(1)
            .map( function(_,index){
                return new Record(!!(index%2),index,`Title ${index}`,index % 5,`Description ${index}`, new Date() );
            }
        )
    );
  } 

export const setStringDate = function (value=new Date()) {
    let month=(value.getMonth()+1);
    month=month<10?("0"+month):month;
    let result=value.getFullYear()+"-"+month+"-"+(value.getDate()<10?("0"+value.getDate()):value.getDate());

    console.log("setStringDate ---- "+result);
    return result;
}


export const getStringDate = function (value="") {
  let result=new Date();
  let arr=value.split("-");
  if (arr.length>0){
    result.setFullYear(+arr[0]);
    result.setMonth(+arr[1]-1);
    result.setDate(+arr[2]);
  }
  console.log("getStringDate ---- "+result);
  return result;
}

export const getStringDateForFirebase = function (value="") {
    let result=new Date();
    let arr=value.split(".");
    if (arr.length>0){
      result.setFullYear(+arr[2]);
      result.setMonth(+arr[1]);
      result.setDate(+arr[0]);
    }
    console.log("getStringDate fore Firebase---- "+result);
    return result;
  }

  export const setStringDateForFirebase = function (value="") {
    let result="";
    result=value.getDate()+"."+value.getMonth()+"."+value.getFullYear();

    console.log("setStringDate fore Firebase---- "+result);
    return result;
  }
  

export const chunk = (size, arr) => {
    var result = [];
    for (var i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

export const getMonthName = function (currentData) {
  var result="";
  var month=currentData.getMonth()+1;
  switch (month) {
      case 1:
          result="Январь";
          break;
      case 2:
          result="Февраль";
          break;  
      case 3:
          result="Март";
          break;
      case 4:
          result="Апрель";
          break;
      case 5:
          result="Май";
          break;
      case 6:
          result="Июнь";
          break;
      case 7:
          result="Июль";
          break;
      case 8:
          result="Август";
          break;
      case 9:
          result="Сентябрь";
          break;
      case 10:
          result="Октябрь";
          break;
      case 11:
          result="Ноябрь";
          break;
      case 12:
          result="Декабрь";
          break;                                                                                                                                                                     
      default:
          break;
  }
  return result;
}

export const sortByField = function (arr, sortField, sortOrder){
    let result = arr.sort((a,b) => {
        if (sortField==="title" || sortField==="description"){
            return naturalCompare(b,a,sortField);
        }else {
            return getFieldForSort(sortField, b)-getFieldForSort(sortField, a);
        }
    });

    if (sortOrder===SORT_DOWN){
        result.reverse();
    }

    return result;
}

function naturalCompare (record_a, record_b, sortField="date") {
    let sortField1=getFieldForSort(sortField, record_a);
    let sortField2=getFieldForSort(sortField, record_b);

    for (let i = 0; i < Math.min(sortField1.length,sortField2.length); i++) {
        let char_a=sortField1.charCodeAt(i);
        let char_b=sortField2.charCodeAt(i);
        
        if (char_a!==char_b){
            return char_a-char_b;
        }
    }
    return sortField1.length - sortField2.length;
}

function getFieldForSort(value, currentRecord) {
    let result=-1;
   switch (value) {
     case "status":
       result= currentRecord.getStatus();
       break;
       case "title":
       result= currentRecord.getTitle();
       break;
       case "date":
       result= currentRecord.getDateAsObject();
       break;
       case "description":
       result= currentRecord.getDescription();
       break;
       case "importance":
       result= currentRecord.getImportance();
       break;                                                                
     default:
       break;
   }
   
   return result;
   
 }

