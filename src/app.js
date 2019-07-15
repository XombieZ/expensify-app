import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { addExpense, removeExpense, editExpense } from "./actions/expenses";
import { setTextFilter, sortByDate, sortByAmount } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";

import "normalize-css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  console.log(getVisibleExpenses(state.expenses, state.filters));
});

store.dispatch(
  addExpense({ description: "Water bill", amount: 200, createdAt: 1000 })
);
store.dispatch(
  addExpense({ description: "Gas bill", amount: 300, createdAt: 1200 })
);
store.dispatch(
  addExpense({ description: "Rent", amount: 1000, createdAt: 1040 })
);

// store.dispatch(setTextFilter("bill"));
// store.dispatch(setTextFilter("water"));
store.dispatch(sortByAmount());

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
