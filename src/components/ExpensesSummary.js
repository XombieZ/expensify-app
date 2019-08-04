import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import numeral from "numeral";
import getVisibleExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total";

export const ExpensesSummary = ({
  expenseCount,
  expenseUnfilteredCount,
  expenseTotal
}) => {
  const sufix = expenseCount > 1 ? "s" : "";
  const expenseFilteredCount = expenseUnfilteredCount - expenseCount;

  return (
    <div className="page-header">
      <div className="content-container">
        {expenseTotal > 0 && (
          <h1 className="page-header__title">
            Viewing <span>{expenseCount}</span> expense{sufix} totalling
            <span> {numeral(expenseTotal / 100).format("$0,0.00")}</span>
          </h1>
        )}
        {expenseFilteredCount > 0 && (
          <h4>
            {expenseFilteredCount} expense
            {expenseFilteredCount > 1 ? "s are" : " is"} hidden by filters
          </h4>
        )}
        <div className="page-header__actions">
          <Link className="button" to="/create">
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    expenseCount: getVisibleExpenses(state.expenses, state.filters).length,
    expenseUnfilteredCount: state.expenses.length,
    expenseTotal: selectExpensesTotal(
      getVisibleExpenses(state.expenses, state.filters)
    )
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
