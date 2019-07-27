import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startSetExpenses,
  startAddExpense,
  addExpense,
  startEditExpense,
  editExpense,
  startRemoveExpense,
  removeExpense,
  setExpenses
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const uid = "thisismytestuid";
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });

  database
    .ref(`users/${uid}/expenses`)
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
  const store = createMockStore({ expenses, ...defaultAuthState });

  store.dispatch(startRemoveExpense(expenses[0])).then(() => {
    database
      .ref(`users/${uid}/expenses/${expenses[0].id}`)
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

test(`should edit expenses from firebase`, done => {
  const store = createMockStore({ expenses, ...defaultAuthState });
  const updates = {
    description: "test description",
    note: "test note",
    amount: 9999,
    createdAt: 1999
  };

  const id = expenses[2].id;

  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      return database
        .ref(`users/${uid}/expenses/${id}`)
        .once("value")
        .then(snapshot => {
          expect(snapshot.val()).toEqual(updates);
        });
    })
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: "EDIT_EXPENSE", id, updates });
      done();
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
  const store = createMockStore(defaultAuthState);
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

      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should add expense with defaults to database and store", done => {
  const store = createMockStore(defaultAuthState);
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

      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
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
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses
    });
    done();
  });
});
