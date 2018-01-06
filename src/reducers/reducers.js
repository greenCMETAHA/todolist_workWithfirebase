import { combineReducers } from "redux";
import { ADD_TASK,   //SELECT_TASK, 
        EDIT_TASK, DELETE_TASK, DELETE_ALL, CHANGE_STATUS_TASK, SAVE_TASK
        , GET_FILTER, GET_CURRENT_LINE, CHANGE_CALENDAR, CHANGE_SORT, GET_LIST, GET_IMPORTANCE, GET_TASK, GET_IMPORTANCES, getTask} from "../actions";
//import {Record} from "../containers/Record";
import {getTasks, getTaskById, saveTask, deleteTaskById, deleteTasks, getImportances} from "../mediator"; 
import {DEFAULT_FILTER_STRUCTURE,DEFAULT_SORT_STRUCTURE, Record} from '../containers/Record';

//import {store} from '../index';

const DEFAULT_LIST = [];


const tasks = (state = DEFAULT_LIST, action) => {
    console.log("reducer "+action);
  switch (action.type) {
    case ADD_TASK:{
      let arr=Object.assign([], state);
     // saveTask(action.record,true);
     // arr.push(action.record);
 
      return state;// arr;
    }
    //case SELECT_TASK:    //переделать --> //не буду этого делать
    //  return getTasks();//переделать <--
    case EDIT_TASK:{
      let arr=Object.assign([], state);   //getTaskById(action.id); 
    //  saveTask(action.record, false);
     /* for (let i = 0; i < arr.length; i++) {
          if (arr[i].getId()===action.record.getId()){
            arr[i]=action.record;
            break;
          }
      }
      */
      return arr;
    }

    case SAVE_TASK:{
        let arr=Object.assign([], state);   //getTaskById(action.id); 
        saveTask(action.record, action.mode);
       /* for (let i = 0; i < arr.length; i++) {
            if (arr[i].getId()===action.record.getId()){
              arr[i]=action.record;
              break;
            }
        }
        */
        return getTasks();
      }

    case DELETE_TASK:
        deleteTaskById(action.id);
      /*  let arr=Object.assign([], state);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].getId()===action.id){
            delete arr[i];
            break;
            }
        } */

     // return arr;
     return getTasks();

    case DELETE_ALL:
      deleteTasks(); 
      return [];     

    case CHANGE_STATUS_TASK:
      /*  let record=getTaskById(action.id); 
        record.setStatus(action.variant)
        saveTask(record);

        return getTasks(); 
   */
        break;
    case GET_LIST:
        return action.value;
    case GET_TASK:
        return action.value;

    default:
        let result=getTasks();

        return result;
  }
};

const importances=(state=DEFAULT_LIST, action) =>{
    switch (action.type) {
        case GET_IMPORTANCES:
            return action.value;
        case GET_IMPORTANCE:
            return action.value;

        default:
            let result=state;
            if (result.length===0){
                    result=getImportances();
            }

            return result;
        }
};

const filter=(filter=DEFAULT_FILTER_STRUCTURE, action) =>{

    switch (action.type) {
        case GET_FILTER: //здесь надо менять фильтр

        return Object.assign({}, action.filter);
    default:
        return Object.assign({}, filter);
    }
};

const currentTask=(currentTask=null, action) =>{

    switch (action.type) {
        case GET_CURRENT_LINE:

        return action.value; //id

    default:
        return currentTask;
    }
};

const editTask=(editTask=false, action) =>{

    switch (action.type) {
        case EDIT_TASK:

        return action.value;

    default:
        return editTask;
    }
};

const calendar=(currentMonth=new Date(), action) =>{
    currentMonth=new Date(currentMonth.getFullYear(),currentMonth.getMonth(),1);

    switch (action.type) {
        case  CHANGE_CALENDAR:

        currentMonth.setMonth(currentMonth.getMonth()+action.value);

        return currentMonth;

    default:
        return currentMonth;
    }
};

const sort=(sort=DEFAULT_SORT_STRUCTURE, action) =>{

    switch (action.type) {
        case  CHANGE_SORT:

        return {
            field:action.field,
            order:action.order
                };

    default:
        return sort;
    }
};



export const changeSort = (field, order) => ({
    type: CHANGE_SORT,
    field,
    order
  })  


const reducers = combineReducers({
    importances,
    currentTask,
    editTask,
    filter,
    calendar,
    sort,
    tasks,
});

export default reducers;