import { getImportanceById } from "../mediator"; 
import {setStringDate} from '../utils';

export const SORT_UP="SORT_UP", SORT_DOWN="SORT_DOWN";

export const DEFAULT_FILTER_STRUCTURE={
          show: false,
          startDate: new Date(2000,0,1),
          endDate:new Date(2020,11,31),
          searchString:""                       
        }

export const DEFAULT_SORT_STRUCTURE={
          field:"date",
          order: SORT_UP
        }




export class Record{
    constructor(...args){
      this.done=args[0];
      args[1]=args[1]===undefined?Math.ceil((Math.random()*10)+(Math.random()+10)*36):args[1]; //костыль, чтобы исправить ошибку
      this.id=args[1];
      this.title=args[2];

      args[3]=args[3]===null?1:args[3]; //костыль, чтобы исправить ошибку
      this.importance=typeof (args[3])==="number"?getImportanceById(args[3])
                                                :new Importance(args[3].id, args[3].name);
      this.description=args[4];

      if (typeof (args[5])==="string"){
        let arr=args[5].split(args[5].indexOf("-")>-1?"-":".");
        this.date=new Date(+arr[0],(+arr[1])-1,+arr[2]);
      }else{
        this.date=args[5];
      }
    }
  
    getDate(){
      return this.date.getDate()+"."+(this.date.getMonth()+1)+"."+this.date.getFullYear();
    }

    getDateAsObject(){
      return this.date;
    }    

    getStatus(){
      return this.done;
    } 
    
    setStatus(value){
      this.done = value;
    }     
  
    getTime(){
      return this.date.getTime();
    }

    getTitle(){
      return this.title;
    }

    getImportance(){
      return this.importance.getId();
    }
    
    getDescription(){
      return this.description;
    }

    getId(){
      return this.id;
    }    

    getStrImportance(){
        
        return this.importance.getName();
      }

    toJSON(){
      let result={
        "done":this.done,
        "id":this.id,
        "title":this.title,
        "importance":this.importance,
        "description":this.description,
        "date":setStringDate(this.date),
      }

      return result;
    }
}

//--------------------------------------------------

export class Importance{
  constructor(...args){
    this.id_importance=args[0];
    this.name=args[1];
  }

  getId(){
    return this.id_importance;
  }

  getName(){
    return this.name;
  }
}

