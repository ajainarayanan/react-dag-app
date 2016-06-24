
import equal from 'deep-equal';
import sortKeys from 'sort-keys';

const isStateSameAsPresent = (state, localState) => {
  let typeOfState = typeof state;
  let typeOfLocalState = typeof localState;
  let sortedState, sortedLocalState;
  if (typeOfState !== typeOfLocalState) { return false; }
  switch(typeOfState) {
    case 'object':
      if (Array.isArray(state)) {
        return equal(state, localState, {strict: true});
      } else {
        sortedState = sortKeys(state);
        sortedLocalState = sortKeys(localState);
        if (JSON.stringify(sortedState) === JSON.stringify(sortedLocalState)) {
          return true;
        }
        return false;
      }
    default:
      return state === localState;
  }
};

const undoRedoReducer = (initialState, filterActions) => {
  let localHistory = {
    past: [],
    present: initialState,
    future: []
  };
  const undoredo = (state = initialState, action = {}) => {
    let oldPresent, present, newPresent;
    if (filterActions.indexOf(action.type) !== -1) {
      return state;
    }
    switch(action.type) {
      case 'UNDO':
        if (!localHistory.past.length) {
          return state;
        }
        localHistory.future.unshift(localHistory.present);
        localHistory.present = localHistory.past.pop();
        return localHistory.present;
      case 'REDO':
        if (!localHistory.future.length) {
          return state;
        }
        localHistory.past.push(localHistory.present);
        localHistory.present = localHistory.future.shift();
        return localHistory.present;
      case 'RESET':
        localHistory = {
          past: [],
          present: {},
          future: []
        };
        return state;
      // FIXME: This can be better. Need to figure out if there is anyother
      // init events or signals that we can listen to.
      case '@@redux/INIT':
        return state;
      default:
        if (isStateSameAsPresent(state, localHistory.present)) {
          return state;
        }
        localHistory.past.push(localHistory.present);
        localHistory.future = [];
        localHistory.present = state;
        return state;
    }
  };
  return undoredo;
};

export default undoRedoReducer;
