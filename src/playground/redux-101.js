import { createStore } from "redux";

// Action generators

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: "DECREMENT",
  decrementBy
});

const setCount = ({ count } = {}) => ({ type: "SET", count });

const resetCount = () => ({ type: "SET", count: 0 });

// Reducers

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.incrementBy
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy
      };
    case "SET":
      return { count: action.count };
    case "RESET":
      return {
        count: 0
      };

    default:
      return state;
  }
};

const store = createStore(countReducer);

store.subscribe(() => {
  console.log(store.getState());
});

// Actions

store.dispatch(incrementCount());
store.dispatch(incrementCount({ incrementBy: 5 }));

// Decrement count by 1
store.dispatch(decrementCount());
store.dispatch(decrementCount({ decrementBy: 10 }));

// Set a counter value
store.dispatch(setCount({ count: 101 }));

// Reset count to 0
store.dispatch(resetCount());
