import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import numeral from "numeral";
import getVisibleExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total";

export const ExpensesSummary = ({ expenseCount, expenseTotal }) => {
  const sufix = expenseCount > 1 ? "s" : "";

  return (
    <div className="page-header">
      <div className="content-container">
        {expenseTotal > 0 && (
          <h1 className="page-header__title">
            Viewing <span>{expenseCount}</span> expense{sufix} totalling
            <span> {numeral(expenseTotal / 100).format("$0,0.00")}</span>
          </h1>
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
    expenseTotal: selectExpensesTotal(
      getVisibleExpenses(state.expenses, state.filters)
    )
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
