import React, { Component } from 'react';
import {Record} from '../containers/Record';
import { connect } from 'react-redux';
import "../css/index.css";
import CalendarCell from './CalendarCell';
import left_png from '../images/left.png';
import right_png from '../images/right.png';
import {getMonthName, chunk} from '../utils';
import  {changeCalendar} from '../actions';

class Calendar extends Component{
    constructor(props){
      super();
      this.records=props.records;
      this.calendarMonth=new Date();
 
      this.currentRecord=new Record(false,0,"",1,"",new Date());
    }



    renderCalendarTable = (records, currentData)=>{  //у нас есть дата периода (к примеру, текущая дата). Выберем первый и последний день. Это и будут начало и конец периода
        let result=[];                              //соберём массив из всех чисел, в том числе и пустых, перед периодом и после для вывода в таблицу
        let d=new Date(currentData.getFullYear(), currentData.getMonth(),1);
        let days_in_month = 32 - new Date(currentData.getFullYear(), currentData.getMonth(),32).getDate();
        let dayOfWeek=d.getDay();
        dayOfWeek=dayOfWeek===0?7:dayOfWeek;  //Воскресенье почему-то =0. Поставим ему 7

        for (var i=1; i<dayOfWeek; i++){ //выводим дни прошлого месяца с понедельника (пустые даты)
            result.push(new Day("before"+i));
        }
      
        for (i=1; i<=days_in_month; i++){ //выводим дни прошлого месяца с понедельника (пустые даты)
            let filteredRecords=records.filter(element=>{
                let result=false;

                let startDate=new Date(currentData.getFullYear(), currentData.getMonth(),i,0,0,0,0);
                let endDate=new Date(currentData.getFullYear(), currentData.getMonth(),i,23,59,59,0);
                
                if (element.getDateAsObject()>=startDate && element.getDateAsObject()<=endDate){
                    result=true;
                }
                return result;
            },this);

            result.push(new Day("day"+i,filteredRecords,i));

            dayOfWeek++;
            if (dayOfWeek===8 && i<days_in_month){
                dayOfWeek=1;
            }
        } 
        for (i=dayOfWeek; i<8; i++){ //выводим дни следующего месяца
            result.push(new Day("after"+i));
        } 

        return result;
    }

    changeMonth = (ev) =>{
        if (ev){
            ev.preventDefault();
            this.props.changeCalendar(+ev.currentTarget[0].value);
        }
    }    

    render(){
        console.log("list form");
        this.records=this.props.tasks;
       // this.filter=this.props.currentTask;  //не стал этого делать. Если надо - скопипастить из ListForm фильтр и сорт
       this.calendarMonth=this.props.calendar;
       let strMonth=getMonthName(this.calendarMonth)+" "+this.calendarMonth.getFullYear();
       
       let arr=this.renderCalendarTable(this.records,this.calendarMonth);
       let weeks=chunk(7,arr);                              //порежем по неделям, сделаем двумерный массив
       //период календаря тоже не будем делать через редюсер. Получим все записи и здесь же их и отберем за период. Но дату месяца сделаем через экшн/редюсер
        let that=this;
        return (
            <div> <hr />
                    <br /><br />
                <div className="calendarHead"> 
                    <div className="monthDiv"> 
                        <span className="buttonsCalendarLeft">
                            <form onSubmit={this.changeMonth.bind(that)}>
                                <button value="-1"> <img src={left_png} width="40" height="40" alt="На месяц раньше"
                                    /></button>
                            </form>
                        </span>
                        <span className="buttonsCalendarCenter">
                            <h3>{strMonth}</h3> 
                        </span>
                        <span className="buttonsCalendarRight">
                            <form onSubmit={this.changeMonth.bind(that)}>
                                <button value="1"> <img src={right_png} width="40" height="40" alt="На месяц раньше"
                                    /></button>
                            </form>
                        </span> 
                    </div>
                </div>
                <table>
                    <tbody>
                        {weeks.map(week=>{
                            return (<tr  className="calendar_tr" key={"week_tr"+week[0].key}>
                            {week.map(day=>{
                                return (<td className="calendar_td" key={"day_td"+day.key}>
                                    < CalendarCell key={day.key} records={day.records}  day={day.day}/> 
                                </td>)
                                })
                            }
                            </tr>)



                        })}
                    </tbody>

                </table>
        </div> );         
    }
}

class Day{
    constructor(key="",records=[],day=0){
        
        this.records=records;
        this.day=day;
        this.key=key;
    }

}



function mapStateToProps (state) {
    //debugger;
    let result={ 
        tasks: state.tasks,
        filter:state.filter,
        calendar:state.calendar
    };

    return result;
  }


export default connect (mapStateToProps, {changeCalendar})(Calendar)