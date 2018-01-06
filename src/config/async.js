// https://redux.js.org/docs/advanced/Middleware.html
// https://redux.js.org/docs/api/applyMiddleware.html
const async = ({ dispatch, getState }) => next => action => {
  // Если функция - вызовем ее с параметром dispatch
  // и остановим цикл action
  if (typeof action === "function") {
    return action(dispatch);
  }
  next(action);
};

export default async;
