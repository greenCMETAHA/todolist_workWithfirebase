import {Record,Importance} from './containers/Record';
import {firebase,database} from './firebase';
import firebaseAPI from 'firebase';
//import {dispatch} from 'redux';
//import { connect } from 'react-redux';
import  {getList, getTask,  getImportances} from './actions';  //getImportance,
import {store} from './index';
import {getStringDateForFirebase, setStringDateForFirebase} from './utils';

let db;

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

export const getImportancesFirebase=()=>{
    let result = [];

    db=getDB();
    if (db){
        console.log(db);
        let messagesRef = db.ref('importance');
        messagesRef.off();

        messagesRef.on('value', function(data) { //так возвратит все значения
            result=[];
            var val = data.val(); //data.key
            for (let index = 0; index < val.length; index++) {
                const element = val[index];
                if (element){
                    result.push(new Importance(index, element.name));
                }
            }
            store.dispatch(getImportances(result));
            messagesRef.off();
        },this);
    }
  
    return result;
}

export const getImportanceById=(id)=>{
    let result = new Importance(id,"Не важно");
   /* db=getDB();
    if (db){    
        let messagesRef = db.ref('importance/'+id);
        messagesRef.off();
    
        messagesRef.once('value').then(element=>{
            result=element.val()?element.val().name:"";

            return result;
        });
    } */
    let storeObject = store.getState();
    if (storeObject){
        result = storeObject["importances"][id-1]||result;
    }

    return result;
}

//----------------------------------------  Tasks ----------------------------------------


export const getTasks=(forDate=undefined)=>{
    let result=[];
    console.log(3);
    if (db){
        let messagesRef = db.ref('tasks');
        messagesRef.off();
        console.log(4);
   
        messagesRef.on('value', function(data) { //так возвратит все значения
            result=[];
            var val = data.val(); //data.key
            console.log(5);
            for (let key in val) {
                const element = val[key];
                if (element){
                    console.log(6);

                    let record=new Record(element.done,key,element.title
                            ,getImportanceById(element.importance),element.description,getStringDateForFirebase(element.date));
                    if (checkMonthForTask(record,forDate)){  
                        result.push(record);
                    }
                }
            }
            console.log(7);
            console.log(getList);
            store.dispatch(getList(result));
            messagesRef.off();
        },this);  
    }  

    return result;
}

export const getTaskById=(id=undefined)=>{
    let result=null;

    db=getDB();
    if (db){
        let messagesRef = db.ref('tasks/'+id);
        messagesRef.off();

        messagesRef.once('value').then(element=>{
            element=element.val();
            if (element!=null){
                result = new Record(element.done,element.id,element.title
                        ,getImportanceById(element.importance),element.description,getStringDateForFirebase(element.date));
            }

            store.dispatch(getTask(result));
            messagesRef.off();
        });
    }

    return result;
}
/*
export const getCompletedTasks=(forDate=undefined)=>{
    let result=getTasksByFieldDone(true, forDate);
 
    return result;  
}


export const getUncompletedTasks=(forDate=undefined)=>{
    let result=getTasksByFieldDone(false, forDate);

    return result;  
}
*/

export const saveTask=(record,isNew=false)=>{   //record - объект типа Record
    db=getDB();
    if (db){
        let json=record.toJSON();
        json.importance=record.getImportance();
        json.date=setStringDateForFirebase(record.getDateAsObject());
        if (isNew){
            console.log(1);
            db.ref("tasks").push(json);
            console.log(2)
        }else{
            db.ref("tasks/"+record.getId()).set(json);
        }
    }
 //   getTasks();

}

export const deleteTaskById=(id=undefined)=>{
    db=getDB();
    if (db){

        let messagesRef = db.ref('tasks/'+id).remove();
        console.log(messagesRef);
    }
 //   getTasks();
}

export const deleteTasks=()=>{
    db.ref('tasks').remove();

 //   getTasks();
}

//--------------------------------------Доп. функции ------------------------------------------
/*
export const getTasksByFieldDone = function(doneValue, forDate){
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
                    let record=new Record(element.done,key,element.title
                            ,getImportanceById(element.importance),element.description,getStringDateForFirebase(element.date));

                    if (checkMonthForTask(record,forDate)){  
                        result.push(record);
                    }
                }
            }
            store.dispatch(getTask(result));
            //return result;
        });  
    }
     
    return result;
}
*/
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
/*
function addImportances() { //создадим таблицу важности, чтобы не хранить её в HLML
    
    saveImportance(1, "Не важно");
    saveImportance(2, "Слегка важно");
    saveImportance(3, "Важно");
    saveImportance(4, "Очень важно");
    saveImportance(5, "Уссаться");
    
}*/