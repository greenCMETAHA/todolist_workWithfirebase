import React, { Component } from 'react';
import TableRow from './TableRow';
import SortSpan from './SortSpan';
import { connect } from 'react-redux';
import "../css/index.css";
import  {getCurrentLine} from '../actions';
import {sortByField} from '../utils';
import {DEFAULT_FILTER_STRUCTURE, DEFAULT_SORT_STRUCTURE} from '../containers/Record';

class ListForm extends Component{
    constructor(props){
      super();
      this.records=[];
      this.activeLine=-1;
      this.rows=-1;
      this.filter=DEFAULT_FILTER_STRUCTURE;
      this.sort=DEFAULT_SORT_STRUCTURE;
    }

    render(){
        this.rows=-1;
        this.records=this.props.tasks;
        this.activeLine=this.props.currentTask;
        this.filter=this.props.filter;
        let that=this;
        this.sort=this.props.sort;

        let filtederRecords=this.records.filter(element =>{               //отфильтруем
          let result=true;

          let filter=this.props.filter;
          if (filter.show && !element.getStatus()){
              return false;
          };
          if (filter.startDate>element.getDateAsObject() || filter.endDate<element.getDateAsObject()) {
            return false;
          };
          let str=this.props.filter.searchString;  //проверим поисковик
          if (str.length>0){
            if (element.getTitle().indexOf(str)<0 
              && element.getDescription().indexOf(str)<0 ) {
              return false;
            } 
          };

          return result;
        },this)
        
        filtederRecords= sortByField(filtederRecords,that.sort.field,this.sort.order);
        
                                                          //рендерим элемент
        let table=<div>  <hr />                           
          <table>
            <tbody>
              <tr>
                <th>Пометка <SortSpan key="status" field="status" sort={this.sort} /></th>
                <th>Запись <SortSpan key="title" field="title" sort={this.sort} /></th>
                <th>Важность <SortSpan key="importance" field="importance"sort={this.sort} /></th>
                <th>Дата <SortSpan key="date" field="date" sort={this.sort} /></th>
                <th>Описание <SortSpan key="description" field="description" sort={this.sort} /></th>
                <th>Редакт.</th>
                <th>удалить</th>
              </tr> 
              {filtederRecords.map(function(currentRecord){
                  that.rows++;
                  return <TableRow key={currentRecord.getId()} reduxProps={that.props} row={that.rows} record={currentRecord} activeLine={that.activeLine===that.rows?true:false} 
                            />
              })}
            </tbody>
          </table>
            </div>;
        return table;
      }
    
    }

function mapStateToProps (state) {
    //debugger;
    let result={ 
        tasks: state.tasks,
        currentTask:state.currentTask,
        filter:state.filter,
        sort:state.sort
    };

    return result;
}


export default connect(mapStateToProps, {getCurrentLine}) (ListForm);  //getCurrentLine - здесь закончил