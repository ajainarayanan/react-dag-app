import {combineReducers, createStore} from 'Redux';
import uuid from 'node-uuid';

let nodes = (state = [], action = {}) => {
  switch(action.type) {
    case 'ADD-NODE':
      return [
        ...state,
        {
          id: uuid.v4(),
          type: action.node.type
        }
      ];
    default:
      return state;
  }
};
let connections = (state = [], action = {}) => {
  switch(action.type) {
    case 'ADD-CONNECTIONS':
      return [
        ...state,
        {
          from: action.connection.from,
          to: action.connection.to
        }
      ];
    default:
      return state;
  }
};

let combinedReducer = combineReducers({
  nodes,
  connections
});
let store = createStore(combinedReducer)
export {store};
