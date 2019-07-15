import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../actions/expenses";

export class EditExpensePage extends React.Component {
  onSubmit = expense => {
    this.props.editExpense(this.props.expenseToEdit.id, expense);
    this.props.history.push("/"); // go to index page
  };

  onRemove = () => {
    this.props.removeExpense({ id: this.props.expenseToEdit.id });
    this.props.history.push("/"); // go to index page
  };

  render() {
    return (
      <div>
        <ExpenseForm
          expenseToEdit={this.props.expenseToEdit}
          onSubmit={this.onSubmit}
        />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    expenseToEdit: state.expenses.find(
      expense => expense.id === ownProps.match.params.id
    )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editExpense: (id, updates) => dispatch(editExpense(id, updates)),
    removeExpense: id => dispatch(removeExpense(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);
