import React, { Component } from 'react';
import '../css/index.css';
import  {getCurrentLine, editTask, deleteTask,changeStatusTask} from '../actions';
import { connect } from 'react-redux';
import delete_png from '../images/delete.png';
import edit_png from '../images/edit.png';


class TableRow extends Component{
    constructor(props){
      super();
      this.record=props.record;
      this.isActiveTask=props.activeLine; //выделенный Task
      this.row=props.row;
    }

   editButton = (ev) => {
       ev.preventDefault();
       console.log("edit "+this.record.getId());
       this.props.getCurrentLine (this.record.getId());
       this.props.editTask(this.record); 
    }

    deleteButton = (ev) => {
        ev.preventDefault();
        console.log("delete "+this.record.getId());
        this.props.deleteTask(this.record.getId());  
    }    

    activateTask = () =>{
        getCurrentLine(this.row);
    }

  changeTaskStatus =(ev) =>{
      this.props.changeStatusTask( this.record.getId(),ev.target.checked);
   }

    render(){
        this.record=this.props.record;
        this.isActiveTask=this.props.activeLine; //выделенный Task
        this.row=this.props.row;        
        return (
            <tr className={this.isActiveTask?"normalTR":"activeTR"} onClick={this.activateTask()}>
                <td>
                        <input type="checkbox" id="show" checked={this.record.getStatus()} 
                            onChange={this.changeTaskStatus.bind(this)}/>

                </td>
                <td>
                    {this.record.getTitle()}
                </td>
                <td>
                {this.record.getStrImportance()}
                </td>
                <td>
                     {this.record.getDate()}
                </td>
                <td>
                     {this.record.getDescription()}
                </td>
                <td>
                    <form onSubmit={this.editButton.bind(this)} >
                    <button><img  height="20" width="20" 
                           //     onClick={this.editButton()}
                                src={edit_png} alt="Редактировать"/></button>
                                </form>
                </td>
                <td>
                    <form onSubmit={this.deleteButton.bind(this)} >
                    <button><img  height="20" width="20" 
                              //  onClick={this.deleteButton()}
                                src={delete_png}  alt="Удалить"/></button>
                    </form>
                </td>                                  
            </tr>
                                 
        )
    }
}

export default connect(null, {getCurrentLine, editTask, deleteTask, changeStatusTask})(TableRow);



