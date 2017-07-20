import { fromPromise } from 'rxjs/observable/fromPromise';
import { combineEpics } from 'redux-observable';
import { startSubmit, stopSubmit } from 'redux-form';

async function submitToServer(data) {
  try {
    const response = await fetch('http://localhost:3030/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return await response.json();
  } catch(error) {
    return error;
  }
}

// action -> action
const registerEpic = (action$, { getState, dispatch }) =>
  action$.ofType('REQUEST_SUBMIT')
    .do(() => dispatch(startSubmit('contact')))
    .mergeMap(action => 
      fromPromise(submitToServer(action.data))  
      .map(response => {
        console.log(response);
        dispatch(stopSubmit('contact', response.errors || {}));
        if (response.errors) {
          return {
            type: 'REQUEST_FAILED',
            errors: response.errors,
          }
        } else {
          return {
            type: 'REQUEST_SUCCESSFUL'
          }
        }
      })
    );

export default combineEpics(
  registerEpic,
);
