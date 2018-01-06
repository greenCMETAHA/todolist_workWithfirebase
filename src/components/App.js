import React, { Component } from 'react';
import FilterForm from './FilterForm';
import ListForm from './ListForm';
import AddEditForm from '../containers/AddEditForm';
import Calendar from './CalendarForm';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props){
    super();
  }

  render() {
    return (
      <div className="App">
        <AddEditForm />
        <FilterForm />
        <ListForm />
        <Calendar / > 
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    filter: state.filter,
    tasks:state.tasks,
    currentTask:state.currentTask,
  }
}

export default connect(mapStateToProps) (App);


  // debugger;

  /*  getItems().then((items)=>{
      console.log(items);
      this.setState({items});
    })
  }
  
  
    withFilter = (items=[], settings={})=>{
      //debugger;
      return items.filter((value)=>{
        let result=true;
        
        if (settings["show"]){
          if (!value.done){
            result=false;
          }
          if (value.getTime()<settings["startDate"].getTime() || value.getTime()>settings["startDate"].getTime()){
            result=false;
          }
        }
        if (settings["searchString"].length>0){
          if (value.title.indexOf(settings["searchString"].trim())<0 && value.description.indexOf(settings["searchString"].trim())<0){
            result=false;
          }
        }
        console.log(result);
        return result;
      });
      
    }
  
    addRecord=(record)=>{
      this.state.items.push(record);
      this.setState({
        items: this.state.items 
      });
  
  
    }
  
   
    */