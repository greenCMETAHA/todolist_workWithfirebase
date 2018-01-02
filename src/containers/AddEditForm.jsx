import { connect } from 'react-redux';
import React, { Component } from 'react';
import AddForm from '../components/AddForm';
import EditForm from '../components/EditForm';

class AddEditForm extends Component {
  render () {
    let editTask=this.props.editTask;
    
    return (editTask?<EditForm />:<AddForm />)


  };
}

const mapStateToProps = (state) => {
  return {
    editTask: state.editTask
  }
}

export default connect(mapStateToProps)(AddEditForm)