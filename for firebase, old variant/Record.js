//export 
class Record{
    constructor(...args){
      this.done=args[0];
      this.id=args[1];
      this.title=args[2];
      this.importance=args[3];
      this.description=args[4];

      if (typeof (args[5])==="string"){
        let arr=args[5].split("-");
        this.date=new Date(+arr[0],(+arr[1])-1,+arr[2]);
      }else{
        this.date=args[5];
      }
    }
  
    getDate(){
      return this.date.getDate()+"."+(this.date.getMonth()+1)+"."+this.date.getFullYear()
    }
  
    getTime(){
      return this.date.getTime();
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
        "title":this.title,
        "importance":this.importance,
        "description":this.description,
        "date":this.getDate(),
      }

      return result;
    }
}

//--------------------------------------------------

//export 
class Importance{
  constructor(...args){
    this.id=args[0];
    this.name=args[1];
  }

  getId(){
    return this.id;
  }

  getName(){
    return this.name;
  }
}