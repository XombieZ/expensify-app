import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      expenseToEdit={expenses[2]}
    />
  );
});

test("should render EditExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle editExpense correctly", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")({
    description: expenses[2].description,
    amount: expenses[2].amount,
    createdAt: expenses[2].createdAt,
    note: expenses[2].note
  });
  expect(history.push).toHaveBeenLastCalledWith("/dashboard");
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id, {
    description: expenses[2].description,
    amount: expenses[2].amount,
    createdAt: expenses[2].createdAt,
    note: expenses[2].note
  });
});

test("should handle removeExpense correctly", () => {
  wrapper.find("button").simulate("click");
  expect(history.push).toHaveBeenLastCalledWith("/dashboard");
  expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[2].id });
});
