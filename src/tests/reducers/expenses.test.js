import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });

  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "2"
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expense if id is not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "4"
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual(expenses);
});

test("should add an expense", () => {
  const expense = {
    id: "4",
    description: "Gas",
    note: "",
    amount: 5000,
    createdAt: 1234
  };

  const action = {
    type: "ADD_EXPENSE",
    expense
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual([...expenses, expense]);
});

test("should edit an expense by id", () => {
  const updates = {
    description: "Booty call",
    note: "",
    amount: 50000,
    createdAt: 0
  };

  const action = {
    type: "EDIT_EXPENSE",
    id: "1",
    updates
  };

  const state = expensesReducer(expenses, action);

  expect(state[0]).toEqual({ ...expenses[0], ...updates });
});

test("should not edit an expense if id is not found", () => {
  const updates = {
    description: "Booty call",
    note: "",
    amount: 50000,
    createdAt: 0
  };

  const action = {
    type: "EDIT_EXPENSE",
    id: "6",
    updates
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual(expenses);
});

test("should set expenses", () => {
  const expensesToSet = [
    {
      id: "99",
      description: "Candy",
      note: "This was a good candy",
      amount: 555,
      createdAt: 3002200
    },
    {
      id: "1234",
      description: "Karate practice",
      note: "Break a leg",
      amount: 9999999,
      createdAt: 456732
    }
  ];

  const action = {
    type: "SET_EXPENSES",
    expenses: expensesToSet
  };

  let currentExpenses = expenses;

  const state = expensesReducer(currentExpenses, action);

  expect(state).toEqual(expensesToSet);
});
