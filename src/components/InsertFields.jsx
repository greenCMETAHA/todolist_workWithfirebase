import React, { Component } from 'react';
//import {Record} from '../containers/Record';
import {setStringDate} from '../utils';

class InsertField extends Component{
    constructor(props){
      super();
      this.record=props.record;
    }
    
   
    render(){
        this.record=this.props.record;
        let taskDate=setStringDate(this.record.getDateAsObject());
      return (
        <div>
            <input id="id" hidden defaultValue={this.record.getId()} />
            Запись:<input defaultValue={this.record.getTitle()}></input>
            Важность:<select defaultValue={this.record.getImportance()}>
                <option disabled>Важность</option>
                <option value="0" name="importance1">Не важно</option>
                <option value="1" name="importance2">Слегка важно</option>
                <option value="2" name="importance3">Важно</option>
                <option value="3" name="importance4">Очень важно</option>
                <option value="4" name="importance5">Уссаться</option>
            </select>
            Дата:<input type="date"  defaultValue={taskDate}></input><br />
            Описание:<br />
            <textarea cols={50} rows={20} defaultValue={this.record.getDescription()}></textarea>
            <br />
          </div>
      )
    }
  
  }
  
  export default InsertField;