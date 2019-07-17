import React from "react";
import { ExpensesSummary } from "../../components/ExpensesSummary";
import { shallow } from "enzyme";

test("should render correctly with 1 expense", () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={1} expenseTotal={20300} />
  );

  expect(wrapper).toMatchSnapshot();
});

test("should render correctly with 2 expenses", () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={2} expenseTotal={13034} />
  );
  u;

  expect(wrapper).toMatchSnapshot();
});
