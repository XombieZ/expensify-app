import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import getVisibleExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total";

export const ExpensesSummary = ({ expenseCount, expenseTotal }) => {
  const sufix = expenseCount > 1 ? "s" : "";
  const text = `Viewing ${expenseCount} expense${sufix} totalling $${numeral(
    expenseTotal / 100
  ).format("0.00")}`;

  return <div>{expenseTotal > 0 && <p>{text}</p>}</div>;
};

const mapStateToProps = state => {
  return {
    expenseCount: getVisibleExpenses(state.expenses, state.filters).length,
    expenseTotal: selectExpensesTotal(
      getVisibleExpenses(state.expenses, state.filters)
    )
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
