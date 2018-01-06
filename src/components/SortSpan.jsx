import React, { Component } from 'react';
import '../css/index.css';
import { connect } from 'react-redux';
import up_png from '../images/up.png';
import down_png from '../images/down.png';
import sort_empty_png from '../images/sort.png';
import  {changeSort} from '../actions';
import { SORT_DOWN, SORT_UP } from '../containers/Record';


class SortSpan extends Component{
    constructor(props){
      super();
      this.field=props.field;
      this.order="";
    }

   changeSort = (ev) => {
       ev.preventDefault();
       let newOrder=this.order===SORT_UP?SORT_DOWN:SORT_UP;
       this.props.changeSort(this.field,newOrder);
    }

 
    render(){
        this.order=this.field===this.props.sort.field ? this.props.sort.order : "";
        let sort_image=this.order===SORT_UP?up_png:(this.order===SORT_DOWN?down_png:sort_empty_png);
        return (
            <form onSubmit={this.changeSort.bind(this)}>
                <button>
                    <img src={sort_image} width="20" height="20"  alt="Сортировка" />
                </button>
                
            </form>
        )
    }
}

export default connect(null, {changeSort})(SortSpan);



