import React, { Component } from 'react';
import {setStringDate, getStringDate} from '../utils';
import { connect } from 'react-redux';
import {DEFAULT_FILTER_STRUCTURE} from '../containers/Record';
import  {getFilter} from '../actions';

class FilterForm extends Component{
    constructor(props){
      super();
      this.fulter=DEFAULT_FILTER_STRUCTURE;
    }
  
    onFilter = (ev)=>{

      let result={
          show: ev.currentTarget[1].checked,
          startDate:getStringDate(ev.currentTarget[2].value),
          endDate:getStringDate(ev.currentTarget[3].value),
          searchString:ev.currentTarget[4].value
      }
      this.props.getFilter(result);
    }
  
    render(){
      this.filter=this.props.filter;  

      let result=<form onChange={this.onFilter.bind(this)}>
          <fieldset>
            <legend>Filter</legend>
            <input type="checkbox" id="show" checked={this.filter.show} />Показать только выполненные.<br />
            Период с <input type="date"  id="startDate" defaultValue={setStringDate(this.filter.startDate)}></input> по  
            <input type="date"  id="endDate" defaultValue={setStringDate(this.filter.endDate)}></input><br />
            Поиск: <input id="searchString" onSubmit={this.onFilter.bind(this)} 
                defaultValue={this.props.searchString}></input>
  
  
          </fieldset>
        
        </form>;
  
      return result;
        
    }
  
  }

  function mapStateToProps (state) {
    //debugger;
    let result={ 
        filter: state.filter
    };

    return result;
  }


  export default connect(mapStateToProps,{getFilter}) (FilterForm);