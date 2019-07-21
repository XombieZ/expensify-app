import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startSetExpenses,
  startAddExpense,
  addExpense,
  editExpense,
  startRemoveExpense,
  removeExpense,
  setExpenses
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });

  database
    .ref("expenses")
    .set(expensesData)
    .then(() => {
      done();
    });
});

test(`should setup remove expense action object`, () => {
  const action = removeExpense({ id: "123abc" });

  expect(action).toEqual({ type: "REMOVE_EXPENSE", id: "123abc" });
});

test("should remove expenses from firebase", done => {
  const store = createMockStore({ expenses });

  store.dispatch(startRemoveExpense(expenses[0])).then(() => {
    database
      .ref(`expenses/${expenses[0].id}`)
      .once("value")
      .then(snapshot => {
        expect(snapshot.val()).toBe(null);
      })
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: "REMOVE_EXPENSE",
          id: expenses[0].id
        });
        done();
      });
  });
});

test(`should setup edit expense action object`, () => {
  const result = editExpense("123abc", { note: "new note" });

  expect(result).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: { note: "new note" }
  });
});

test(`should setup add expense action object with provided values`, () => {
  const result = addExpense(expenses[2]);

  expect(result).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2]
  });
});

test("should add expense to database and store", done => {
  const store = createMockStore({});
  const expenseData = {
    description: "Mouse",
    amount: 3000,
    note: "This one is better",
    createdAt: 1000
  };

  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });

      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should add expense with defaults to database and store", done => {
  const store = createMockStore({});
  const defaultData = {
    description: "",
    note: "",
    amount: 0,
    createdAt: 0
  };

  store
    .dispatch(startAddExpense())
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...defaultData
        }
      });

      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(defaultData);
      done();
    });
});

test("should setup set expense action object with data", () => {
  const action = setExpenses(expenses);

  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  });
});

test("should fetch the expenses from firebase", done => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses
    });
    done();
  });
});
