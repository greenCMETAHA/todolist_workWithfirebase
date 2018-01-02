import React, { Component } from 'react';
import '../css/index.css';

class CalendarCell extends Component{
    constructor(props){
      super();
      this.records=props.records;
      this.day=props.day;
      this.key=props.key;
    }

  
    render(){
        this.records=this.props.records;
        this.day=this.props.day;
        this.key=this.props.key;

        let recordsDiv=this.records.length>0?"Заданий: "+this.records.length:"";
        let dayDiv=this.day===0?" ":(this.day<10?" "+this.day:this.day);
        return (
            <div className="calendarCell" key={"cell_"+this.key}>
                <div className="calendarDay"><h3>{dayDiv}</h3></div>
                <div className="records"> <h5><b>{recordsDiv}</b></h5></div>
            </div>
        )
    }
}

export default (CalendarCell);



