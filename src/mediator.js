import * as firebaseAPI from './apiWrappersFirebase';
//БД надо подключить в index.html

import * as localStorageAPI from './apiWrappersLocalStorage';

const MODE_LOCALSTORAGE="LocalStorage", MODE_FIREBASE="Firebase"; 
const MODE=MODE_FIREBASE; //MODE_LOCALSTORAGE   //поменять!!!!!!!!!!!!!!!!!!!!!!!!

//------------------------------------------ Importances ------------------------------------------
// Я сохраняю список важностей в БД. Это не особо важно, просто так привык. Нужно или сделать заглушку, 
// или внести в БД.
// Можно было бы тогда менять их количество, но по факту это используется только в ../containers/Record'
//там же есть класс для этого бина. 
//Внизу я сохранил localStorage (для примера его можно просто вставить в хроме в инструментах разработчика)

export const saveImportance=(id, name, parent=false)=>{
    if (MODE===MODE_LOCALSTORAGE){
        return localStorageAPI.saveImportance(id, name, parent);
    }else{
        //return firebaseAPI.saveImportance(id, name, parent);
    }
}

export const getImportances=()=>{
    console.log("---aaa");
    if (MODE===MODE_LOCALSTORAGE){
        return localStorageAPI.getImportances();
    }else{
        console.log("---aaa222");        
        return firebaseAPI.getImportancesFirebase();
    }    
  
}
/*
export const setImportances=()=>{
    if (MODE===MODE_LOCALSTORAGE){
        return localStorageAPI.setImportances();
    }else{
        return firebaseAPI.setImportances();
    } 
}
*/
export const getImportanceById=(id)=>{
    if (MODE===MODE_LOCALSTORAGE){
        return localStorageAPI.getImportanceById(id);
    }else{
        return firebaseAPI.getImportanceById(id);
    } 

}

//----------------------------------------  Tasks ----------------------------------------
// record - объект типа Record, бин для task, лежит здесь: ../containers/Record'

//new Record(статус (чекбокс, булево),id (число),title (строка),importance (new Importance(id, name), сработает, если цифру от 1 до 5 прислать),description(текст),дата(new Date()))

//Часть методов здесь не используется, т.к. фильтрацию и сортировки я делаю прямо в ListForm
//, (так проще для учебного проекта, хотя можно было прокинуть фильтры через экшн) 
//для для нормальной БД, где данные выбираются по условию, они подошли бы очень хорошо 
/*
export const getCurrentTask=()=>{

    if (MODE===MODE_LOCALSTORAGE){
        return localStorageAPI.getCurrentTask();
    }else{
        return firebaseAPI.getCurrentTask();
    } 
}

export const setCurrentTask=(value=0)=>{
    if (MODE===MODE_LOCALSTORAGE){
        return localStorageAPI.setCurrentTask(value);
    }else{
        return firebaseAPI.setCurrentTask(value);
    } 
}
*/

export const getTasks=(forDate=undefined)=>{
    console.log("+++aaa");    
    if (MODE===MODE_LOCALSTORAGE){
        return localStorageAPI.getTasks(forDate);
    }else{
        return firebaseAPI.getTasks(forDate);
    } 
}


export const getTaskById=(id=undefined)=>{
    if (MODE===MODE_LOCALSTORAGE){
        return localStorageAPI.getTaskById(id);
    }else{
        return firebaseAPI.getTaskById(id);
    } 
}
/*
function saveTasksListInStorage(list=[]) {
    if (MODE===MODE_LOCALSTORAGE){
        return localStorageAPI.saveTasksListInStorage(list);
    }else{
        return firebaseAPI.saveTasksListInStorage(list);
    }        
}
*/

export const saveTask=(record,isNew=false)=>{   //record - объект типа Record
    if (MODE===MODE_LOCALSTORAGE){
        return localStorageAPI.saveTask(record,isNew);
    }else{
        return firebaseAPI.saveTask(record,isNew);
    }  
}

export const deleteTaskById=(id=undefined)=>{
    if (MODE===MODE_LOCALSTORAGE){
        return localStorageAPI.deleteTaskById(id);
    }else{
        return firebaseAPI.deleteTaskById(id);
    }  
}

export const deleteTasks=()=>{
    if (MODE===MODE_LOCALSTORAGE){
        return localStorageAPI.deleteTasks();
    }else{
        return firebaseAPI.deleteTasks();
    }  
}

/*

export const getCompletedTasks=(forDate=undefined)=>{
    if (MODE===MODE_LOCALSTORAGE){
        return localStorageAPI.getCompletedTasks(forDate);
    }else{
        return firebaseAPI.getCompletedTasks(forDate);
    }   
}

export const getUncompletedTasks=(forDate=undefined)=>{
    if (MODE===MODE_LOCALSTORAGE){
        return localStorageAPI.getUncompletedTasks(forDate);
    }else{
        return firebaseAPI.getUncompletedTasks(forDate);
    }  
}
*/
/*
function getTasksByFieldDone(doneValue, forDate) {
    if (MODE===MODE_LOCALSTORAGE){
        return localStorageAPI.getTasksByFieldDone(doneValue, forDate);
    }else{
        return firebaseAPI.getTasksByFieldDone(doneValue, forDate);
    }  
}
*/

// сама база из LocalStorage:
// {"tasks":[{"done":false,"id":392,"title":"SSS","importance":{"name":"Не важно"},"description":"DDDDDD","date":"2017-12-31"},{"done":true,"id":371,"title":"3333","importance":{"name":"Не важно"},"description":"44444","date":"2018-01-01"},{"done":false,"id":377,"title":"dddd","importance":{"name":"Не важно"},"description":"dddddddd","date":"2018-01-02"},{"done":false,"id":210,"title":"dddd22","importance":{"name":"Не важно"},"description":"dddddddd222","date":"2018-01-02"},{"done":false,"id":14,"title":"222222222ыыы","importance":{"name":"Не важно"},"description":"121212222aaaa","date":"2018-01-02"},{"done":false,"id":27,"title":"z223","importance":{"name":"Не важно"},"description":"z223","date":"2018-01-05"},{"done":false,"id":17,"title":"dddd22","importance":{"name":"Не важно"},"description":"dddddddd222sss","date":"2018-01-02"},{"done":false,"id":382,"title":"ыыв","importance":{"name":"Не важно"},"description":"вывыв","date":"2018-01-02"}]}
// У меня лежала в Итеме  const pathLocalStorage="ToDoList_Vasilchenko_react_redux_11";
// (прописано в начале файла ./apiWrappersLocalStorage)