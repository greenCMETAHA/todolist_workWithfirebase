import React, { Component } from 'react';
//import {Record} from '../containers/Record';
import {setStringDate} from '../utils';

class InsertField extends Component{
    constructor(props){
      super();
      this.record=props.record;
      this.id=this.record.getId();
      this.title=this.record.getTitle();
      this.importance=this.record.getImportance();
      this.taskDate=setStringDate(new Date());
      this.description=this.record.getDescription();
      console.log("constructor");       

    }

    onChange= (idx) => (evt) => {
      this.title=evt.target.value;
      console.log(this.title);


    }

    componentDidUpdate ()
    {
      this.record=this.props.record;
      this.id=this.record.getId();
      this.title=this.record.getTitle();
      this.importance=this.record.getImportance();
      this.taskDate=setStringDate(new Date());
      this.description=this.record.getDescription(); 
      console.log("componentDidUpdate");

        this.refs.id.value = this.id;
        this.refs.title.value = this.title;
        this.refs.importance.value = this.importance;
        this.refs.taskDate.value = this.taskDate;
        this.refs.description.value = this.description;                
    }    
  
   
    render(){
      console.log("render");      
        this.record=this.props.record;
        this.id=this.record.getId();
        this.title=this.record.getTitle();
        this.importance=this.record.getImportance();
        this.taskDate=setStringDate(new Date());
        this.description=this.record.getDescription();        
      return (
        <div>
            <input id="id" hidden defaultValue={this.id}  ref="id" onChange={this.onChange} />
            Запись:<input   defaultValue={this.title}  ref="title" onChange={this.onChange}></input>
            Важность:<select  defaultValue={this.importance} onChange={this.onChange} ref="importance">
                <option disabled>Важность</option>
                <option value="1" name="importance1">Не важно</option>
                <option value="2" name="importance2">Слегка важно</option>
                <option value="3" name="importance3">Важно</option>
                <option value="4" name="importance4">Очень важно</option>
                <option value="5" name="importance5">Уссаться</option>
            </select>
            Дата:<input type="date"   defaultValue={this.taskDate} ref="taskDate" onChange={this.onChange}></input><br />
            Описание:<br />
            <textarea cols={50} rows={20} defaultValue={this.description}  ref="description" onChange={this.onChange}>
            </textarea>
            <br />
          </div>
      )
    }
  
  }
  
  export default InsertField;