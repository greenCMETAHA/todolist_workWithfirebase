import {Record,Importance} from './containers/Record';
import {firebase,database} from './firebase';
import firebaseAPI from 'firebase';


function getDB(){
 
    return firebaseAPI.database();

  } 
//------------------------------------------ Importances ------------------------------------------

export const saveImportance=(id, name, parent=false)=>{
    db=getDB();
    if (db){
        db.ref("importance/"+id).set(
                {"name": name});
    }
}

export const getImportances=()=>{
    let result = [];
    db=getDB();
    console.log("---");
    console.log(db);
    if (db){
        console.log(db);
        let messagesRef = db.ref('importance');
        messagesRef.off();

        console.log("---111");        
    
        messagesRef.on('value', function(data) { //так возвратит все значения
            console.log("---222");
            var val = data.val(); //data.key
            for (let index = 0; index < val.length; index++) {
                const element = val[index];
                if (element){
                    console.log("---333");
                    result.push(new Importance(index, element));
                }
            }
        });
    }
    console.log("---444");
  
    return result;
}

export const getImportanceById=(id)=>{
    let result = "";
    db=getDB();
    if (db){    
        let messagesRef = db.ref('importance/'+id);
        messagesRef.off();
    
        messagesRef.once('value').then(element=>{
            result=element.val()?element.val().name:"";

            return result;
        });
    }
    return result;
}

//----------------------------------------  Tasks ----------------------------------------


export const getTasks=(forDate=undefined)=>{
    let result=[];
    console.log("+++111");
    db=getDB();

    if (db){
        let messagesRef = db.ref('tasks');
        messagesRef.off();
        console.log("+++222");
    
        messagesRef.on('value', function(data) { //так возвратит все значения
            var val = data.val(); //data.key
            console.log("+++333");
            for (let key in val) {
                const element = val[key];
                if (element){
                    let record=new Record(element.done,key,element.title,element.importance,element.description,element.date);
                    console.log("+++444");
                    if (checkMonthForTask(record,forDate)){  
                        console.log("+++555");
                        result.push(record);
                    }
                }
            }
            console.log("+++666");
            return result;
        });  
    }  
    console.log("+++777");
    return result;
}


export const getTaskById=(id=undefined)=>{
    let result=null;

    db=getDB();
    if (db){
        let messagesRef = db.ref('tasks/'+id);
        messagesRef.off();

        messagesRef.once('value').then(element=>{
            let record=null;
            element=element.val();
            if (element!=null){
                result = new Record(element.done,element.id,element.title,element.importance,element.description,element.date);
            }

            return result;
        });
    }

    return result;
}

export const getCompletedTasks=(forDate=undefined)=>{
    let result=getTasksByFieldDone(true, forDate);
 
    return result;  
}


export const getUncompletedTasks=(forDate=undefined)=>{
    let result=getTasksByFieldDone(false, forDate);

    return result;  
}


export const saveTask=(record,isNew=false)=>{   //record - объект типа Record
    db=getDB();
    if (db){
        if (isNew){
            db.ref("tasks").push(record.toJSON())
        }else{
            db.ref("tasks/"+record.getId()).set(record.toJSON());
        }
    }

}

export const deleteTaskById=(id=undefined)=>{
    let result=true;
    db=getDB();
    if (db){

        let messagesRef = db.ref('tasks/'+id).remove();
        console.log(messagesRef);
    }

    return result;
}

export const deleteTasks=()=>{
    db.ref('tasks').remove();
}

//--------------------------------------Доп. функции ------------------------------------------

function getTasksByFieldDone(doneValue, forDate) {
    let result=[];

    db=getDB();
    if (db){

        let messagesRef = db.ref('tasks').orderByChild("done").equalTo(doneValue);
        messagesRef.off();
    
        messagesRef.on('value', function(data) { //так возвратит все значения
            var val = data.val(); //data.key
            for (let key in val) {
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
    }
     
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