// https://redux.js.org/docs/advanced/Middleware.html
// https://redux.js.org/docs/api/applyMiddleware.html
const logger = ({ /* dispatch, */ getState }) => next => action => {
  console.info("Custom logger:", action.type, action.payload);

  if (action.type === "TOGGLE_CHECK" && action.payload % 2 === 0) {
    return; // do not allow toggle check 
  }
  next(action);
};

export default logger;
