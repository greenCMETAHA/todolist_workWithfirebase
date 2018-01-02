import React, { Component } from 'react';
import {Record} from '../containers/Record';
import InsertFields from './InsertFields';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux'
import  {addTask} from '../actions';

class AddForm extends Component{
    constructor(props){
      super();
  //    debugger;
      this.record=props.currentTask;
      this.currentDate=new Date();
    }

    
    onSubmitForm= function (ev) {
        ev.preventDefault();
        let record=new Record(this.record.getStatus()
            , (ev.target[1].value==="0"?Math.ceil((Math.random()*10)+(Math.random()+10)*36):ev.target[1].value)//id
            ,ev.target[2].value  //title
            ,+ev.target[3].value //importance
            ,ev.target[5].value //description//date
            ,(ev.target[4].value===""?new Date(): ev.target[4].value));  

          this.props.addTask(record);
        ev.target.reset();
      }

    render(){
        this.record=this.props.currentTask;
        return (
            <form onSubmit={this.onSubmitForm.bind(this)}>
                <fieldset>
                    <legend>Добавить задачу</legend>
                        <InsertFields record={this.record} />
                        <button>Добавить</button>
                </fieldset>
            </form>  
        )              
    }
}


function mapStateToProps (state) {
    //debugger;
    let result={};
    //if (result.editTask && state.currentTask>=0){
    //    result.currentTask=state.tasks[state.currentTask];
    //}else{
        result.currentTask=new Record(false,0,"",1,"",new Date());
    //}


    return result;
  }



export default connect (mapStateToProps,{addTask})(AddForm);