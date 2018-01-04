import { combineReducers } from "redux";
import { ADD_TASK,   //SELECT_TASK, 
        EDIT_TASK, DELETE_TASK, DELETE_ALL, CHANGE_STATUS_TASK
        , GET_FILTER, GET_CURRENT_LINE, CHANGE_CALENDAR, CHANGE_SORT} from "../actions";
//import {Record} from "../containers/Record";
import {getTasks, getTaskById, saveTask, deleteTaskById, deleteTasks, getImportances} from "../mediator"; 
import {DEFAULT_FILTER_STRUCTURE,DEFAULT_SORT_STRUCTURE} from '../containers/Record';

const DEFAULT_LIST = [];


const tasks = (state = DEFAULT_LIST, action) => {
    console.log("reducer "+action);
  switch (action.type) {
    case ADD_TASK:{
      saveTask(action.record,true);
 
      return getTasks();
    }
    //case SELECT_TASK:    //переделать --> //не буду этого делать
    //  return getTasks();//переделать <--
    case EDIT_TASK:{
      let record=action.record;   //getTaskById(action.id); 
      saveTask(record, false);
      return getTasks();
    }
    case DELETE_TASK:
      deleteTaskById(action.id);
      return getTasks();

    case DELETE_ALL:
      deleteTasks(); 
      return getTasks();     

    case CHANGE_STATUS_TASK:
        let record=getTaskById(action.id); 
        record.setStatus(action.variant)
        saveTask(record);

        return getTasks();  

    default:
        return getTasks();
  }
};

const importances=(state=DEFAULT_LIST, action) =>{
  
    let result=state;
    if (result.length===0){
        result=getImportances();
    }

    return result;
};

const filter=(filter=DEFAULT_FILTER_STRUCTURE, action) =>{

    switch (action.type) {
        case GET_FILTER: //здесь надо менять фильтр

        return Object.assign({}, action.filter);
    default:
        return Object.assign({}, filter);
    }
};

const currentTask=(currentTask=-1, action) =>{

    switch (action.type) {
        case GET_CURRENT_LINE:

        return action.value; //id

    default:
        return currentTask;
    }
};

const editTask=(editTask=true, action) =>{

    switch (action.type) {
        case EDIT_TASK:

        return !editTask;

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