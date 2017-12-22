//import {Record} from './record';
//import {Importance} from './record';

var db = defaultApp.database();	

//------------------------------------------ Importances ------------------------------------------

//export const
var saveImportance=(id, name, parent=false)=>{
 
    db.ref("importance/"+id).set(
                {"name": name});
}

//export const 
var getImportances=()=>{
    let result = [];

    let messagesRef = db.ref('importance');
    messagesRef.off();
  
    messagesRef.on('value', function(data) { //так возвратит все значения
        var val = data.val(); //data.key
        for (let index = 0; index < val.length; index++) {
            const element = val[index];
            if (element){
                result.push(new Importance(index, element));
            }
        }
    });
  
    return result;
}

//export const 
var getImportanceById=(id)=>{
    let result = "";

    let messagesRef = db.ref('importance/'+id);
    messagesRef.off();
  
    messagesRef.once('value').then(element=>{
         result=element.val()?element.val().name:"";

         return result;
    });

    return result;
}

//----------------------------------------  Tasks ----------------------------------------


//export const 
getTasks=(forDate=undefined)=>{
    let result=[];

    let messagesRef = db.ref('tasks');
    messagesRef.off();
  
    messagesRef.on('value', function(data) { //так возвратит все значения
        var val = data.val(); //data.key
        for (key in val) {
            const element = val[key];
            if (element){
                let record=new Record(element.done,key,element.title,element.importance,element.description,element.date);

                if (checkMonthForTask(record,forDate)){  
                    result.push(record);
                }
            }
        }
 
        return result;
    });    

    return result;
}


//export const 

getTaskById=(id=undefined)=>{
    let result=null;

    let messagesRef = db.ref('tasks/'+id);
    messagesRef.off();

    messagesRef.once('value').then(element=>{
        element=element.val();
        if (element!=null){
            result = new Record(element.done,key,element.title,element.importance,element.description,element.date);
        }

        return result;
    });

    return result;
}

getCompletedTasks=(forDate=undefined)=>{
    let result=getTasksByFieldDone(true, forDate);
 
    return result;  
}


//export const 
getUncompletedTasks=(forDate=undefined)=>{
    let result=getTasksByFieldDone(false, forDate);

    return result;  
}


//export const 
saveTask=(record,isNew=false)=>{   //record - объект типа Record
       if (isNew){
        db.ref("tasks").push(record.toJSON())
    }else{
        db.ref("tasks/"+record.getId()).set(record.toJSON());
    }

}

//export const 

deleteTaskById=(id=undefined)=>{
    let result=true;

    let messagesRef = db.ref('tasks/'+id).remove();
    console.log(messagesRef);

    return result;
}

//--------------------------------------Доп. функции ------------------------------------------

function getTasksByFieldDone(doneValue, forDate) {
    let result=[];

    let messagesRef = db.ref('tasks').orderByChild("done").equalTo(doneValue);
    messagesRef.off();
  
    messagesRef.on('value', function(data) { //так возвратит все значения
        var val = data.val(); //data.key
        for (key in val) {
            const element = val[key];
            if (element){
                let record=new Record(element.done,key,element.title,element.importance,element.description,element.date);

                if (checkMonthForTask(record,forDate)){  
                    result.push(record);
                }
            }
        }

        return result;
    });  
     
    return result;
}

function checkMonthForTask(record,forDate) { //тогда в дате лежит дата месяца, по которому нужно сделать выборку
    let result=true;

    if (forDate){  //тогда в дате лежит дата месяца, по которому нужно сделать выборку
        let startDate=new Date(forDate.getFullYear(),forDate.getMonth(),0,0,0,0,1);
        let endDate=new Date(startDate.getFullYear(), startDate.getMonth()+1,0,0,0,0,1)-1;
        if (record.getTime()<=startDate || record.getTime()>=endDate){
            result=false;
        }
    }

    return result;
}

function addImportances() { //создадим таблицу важности, чтобы не хранить её в HLML
    
    saveImportance(1, "Не важно");
    saveImportance(2, "Слегка важно");
    saveImportance(3, "Важно");
    saveImportance(4, "Очень важно");
    saveImportance(5, "Уссаться");
    
}