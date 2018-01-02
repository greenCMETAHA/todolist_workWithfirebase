import {Record,Importance} from './containers/Record';
//import {Importance} from './record';

const pathLocalStorage="ToDoList_Vasilchenko_react_redux_11";
//var db = defaultApp.database();	

//------------------------------------------ Importances ------------------------------------------

export const saveImportance=(id, name, parent=false)=>{
    
}

export const getImportances=()=>{
    let result = [];

    let str=localStorage.getItem(pathLocalStorage);
    str=str===""?null:str;
    let obj=JSON.parse(str)||{};
    if (!obj.importances) {
        result.push(new Importance(1, "Не важно"));
        result.push(new Importance(2, "Слегка важно"));
        result.push(new Importance(3, "Важно"));
        result.push(new Importance(4, "Очень важно"));
        result.push(new Importance(5, "Уссаться"));
    }else{
        obj.importances.forEach(element => {
            result.push(new Importance(element.id, element.name));
        });
    }
  
    return result;
}

export const setImportances=()=>{
    let str=localStorage.getItem(pathLocalStorage);
    str=str===""?null:str;
    let obj=JSON.parse(str)||{};
    obj.importances=getImportances();
    localStorage.setItem(pathLocalStorage,JSON.stringify(obj));
}

export const getCurrentTask=()=>{
    let result = -1;
    let str=localStorage.getItem(pathLocalStorage);
    str=str===""?null:str;
    let obj=JSON.parse(str)||{};
    if (obj.currentTask) {
        result=obj.currentTask;
    }

    return result;
}

export const setCurrentTask=(value=0)=>{
    let str=localStorage.getItem(pathLocalStorage);
    str=str===""?null:str;
    let obj=JSON.parse(str)||{};
    obj.currentTask=value;
    localStorage.setItem(pathLocalStorage,JSON.stringify(obj));
}


export const getImportanceById=(id)=>{
    let result = null;

    let list=getImportances().filter(item =>{
        let result=false;
        if (item.getId()===id){
            result= true;
        }
        return result;
    });
    if (list.length>0){
        result=list[0];
    }

    return result;
}

//----------------------------------------  Tasks ----------------------------------------


export const getTasks=(forDate=undefined)=>{
    let result = [];
    
    let str=localStorage.getItem(pathLocalStorage);
    str=str===""?null:str;
    let obj=JSON.parse(str)||{};
    if (obj.tasks) {
        obj.tasks.forEach(element => {
            if (element!=null){
                let record=new Record(element.done, element.id, element.title, element.importance, element.description, element.date);
                if (checkMonthForTask(record,forDate)){  
                    result.push(record);
                }
            }
        });

        return result;
    }

    return result;
}


export const getTaskById=(id=undefined)=>{
    let result=null;

    let list=getTasks().filter(item =>{
        let result=false;
        if (item.getId()===id){
            result= true;
        }
        return result;
    });
    if (list.length>0){
        result=list[0];
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
    let list=getTasks();

    if (isNew){
        list.push(record);
    }else{
        for (let i = 0; i < list.length; i++) {
            if (list[i].getId()===record.getId()){
                list[i]=record;
                break;
            }
        }
    }
    saveTasksListInStorage(list);

 

}

export const saveTasksListInStorage = (list=[]) => {
    let str=localStorage.getItem(pathLocalStorage);
    str=str===""?null:str;
    let obj=JSON.parse(str)||{};
    obj.tasks=list;
    localStorage.setItem(pathLocalStorage,JSON.stringify(obj));        
}

export const deleteTaskById=(id=undefined)=>{
    let list=getTasks();

    let filtered = list.filter(element=>{
        return (element.getId()!==id);
    });

    saveTasksListInStorage(filtered);
}

export const deleteTasks=()=>{
    saveTasksListInStorage([]);
}

//--------------------------------------Доп. функции ------------------------------------------

export const getTasksByFieldDone = (doneValue, forDate) => {
    let result=getTasks().filter(item=>{
        let result=false;

        if (item.getStatus()===doneValue && checkMonthForTask(item,forDate)){
            result=true;
        }
        return result;
    });

    return result || [];
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
/*
function addImportances() { //создадим таблицу важности, чтобы не хранить её в HLML
    
    saveImportance(1, "Не важно");
    saveImportance(2, "Слегка важно");
    saveImportance(3, "Важно");
    saveImportance(4, "Очень важно");
    saveImportance(5, "Уссаться");
    
}
*/