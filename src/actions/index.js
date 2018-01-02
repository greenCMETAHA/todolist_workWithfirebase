export const ADD_TASK = "ADD_TASK", SELECT_TASK="SELECT_TASK", EDIT_TASK="EDIT_TASK"
    , DELETE_TASK="DELETE_TASK", DELETE_ALL="DELETE_ALL"
    , CHANGE_STATUS_TASK="CHANGE_STATUS_TASK", GET_FILTER="GET_FILTER"
    , GET_CURRENT_LINE="GET_CURRENT_LINE", CHANGE_CALENDAR="CHANGE_CALENDAR",
    CHANGE_SORT="CHANGE_SORT" ;



export const selectTask = (id) => ({
  type: SELECT_TASK,
  id
})

export const addTask = (record) => ({
    type: ADD_TASK,
    record
  })

  export const editTask = (record) => ({
    type: EDIT_TASK,
    record
  })  

export const deleteTask = (id) => ({
    type: DELETE_TASK,
    id
  }) 

  export const deleteAll = () => ({
    type: DELETE_ALL
  })   

export const changeStatusTask = (id,variant) => ({
    type: CHANGE_STATUS_TASK,
    id,
    variant
  })

export const getFilter = (filter) => ({
    type: GET_FILTER,
    filter
  })


export const getCurrentLine = (value) => ({
    type: GET_CURRENT_LINE,
    value  //id
  }) 

export const changeCalendar = (value) => ({
    type: CHANGE_CALENDAR,
    value
  }) 

export const changeSort = (field, order) => ({
    type: CHANGE_SORT,
    field,
    order
  })  

  



