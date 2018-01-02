import React, { Component } from 'react';
import {Record} from '../containers/Record';
import InsertFields from './InsertFields';
import { connect } from 'react-redux'
import  {addTask,editTask} from '../actions';

class EditForm extends Component{
    constructor(props){
      super();
      this.record=props.record;
      this.currentDate=new Date();
      this.whichButtonWasPressed=0;
  
    }

    editTask=(ev)=>{
        let oldId=+ev.target[1].value;
        let record=new Record(this.record.getStatus()
            , (oldId===0?Math.ceil((Math.random()*10)+(Math.random()+10)*36):oldId)//id
            ,ev.target[2].value  //title
            ,+ev.target[3].value //importance
            ,ev.target[5].value //description
            ,(ev.target[4].value===""?new Date(): ev.target[4].value));  //date
        this.props.editTask(record);
   
    }

    addTask =(ev)=>{
        let record=new Record(this.record.getStatus()
            , Math.ceil((Math.random()*10)+(Math.random()*10)*36)//id
            ,ev.target[2].value  //title
            ,+ev.target[3].value //importance
            ,ev.target[5].value //description
            ,(ev.target[4].value===""?new Date(): ev.target[4].value));  //date
        this.props.addTask(record);
        

    }

    saveTask = (ev) =>{
        ev.preventDefault();        
        if (this.whichButtonWasPressed===1){  //edit
            this.editTask(ev);
        }else if (this.whichButtonWasPressed===2){ //add
            this.addTask(ev);
        }
        ev.currentTarget.reset();
    }

    render(){
        this.record=this.props.currentTask;
        return (
            <form onSubmit={this.saveTask.bind(this)}>
                <fieldset>
                    <legend>Изменить задачу</legend>
                    <InsertFields record={this.record}/>
                    
                    <button value="1" onClick={() => this.whichButtonWasPressed=1}>Изменить</button>
                    <button value="2" onClick={() => this.whichButtonWasPressed=2}>Добавить</button>
                </fieldset>
            </form>    
        )            
    }
}


function mapStateToProps (state) {
    let result={};
    for (let i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].getId()===state.currentTask){
            result.currentTask=state.tasks[i];
            break;

        }
    }
 
    return result;
}


export default connect (mapStateToProps,{addTask,editTask})(EditForm);