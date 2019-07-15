import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test(`should setup remove expense action object`, () => {
  const action = removeExpense({ id: "123abc" });

  expect(action).toEqual({ type: "REMOVE_EXPENSE", id: "123abc" });
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
  const expenseData = {
    description: "rent",
    amount: 12456,
    note: "my last rent",
    createdAt: 9999
  };

  const result = addExpense(expenseData);

  expect(result).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test(`should setup add expense action object with default values`, () => {
  const result = addExpense();

  expect(result).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      description: "",
      note: "",
      amount: 0,
      createdAt: 0,
      id: expect.any(String)
    }
  });
});
