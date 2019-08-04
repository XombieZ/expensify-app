import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import ModalWrapper from "./ModalWrapper";
import ConfirmationModal from "./modals/ConfirmationModal";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";

export class EditExpensePage extends React.Component {
  state = { isRemoveModalHidden: true, isSaveModalHidden: true };

  setRemoveModalHidden = isHidden =>
    this.setState({ isRemoveModalHidden: isHidden });

  onSubmit = expense => {
    this.props.startEditExpense(this.props.expenseToEdit.id, expense);
    this.props.history.push("/dashboard"); // go to index page
  };

  onRemoveModalConfirm = () => {
    this.setRemoveModalHidden(true);
    this.props.startRemoveExpense({ id: this.props.expenseToEdit.id });
    this.props.history.push("/dashboard"); // go to index page
  };

  onRemoveModalCancel = () => {
    this.setState({ isRemoveModalHidden: true });
    console.log("Modal: cancel");
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expenseToEdit={this.props.expenseToEdit}
            onSubmit={this.onSubmit}
          />
          <button
            className="button button--secondary"
            onClick={() => this.setRemoveModalHidden(false)}
          >
            Remove Expense
          </button>
        </div>
        <ModalWrapper isHidden={this.state.isRemoveModalHidden}>
          <ConfirmationModal
            message="Are you sure you want to delete current expense ?"
            onConfirm={this.onRemoveModalConfirm}
            onCancel={this.onRemoveModalCancel}
          />
        </ModalWrapper>
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
    startEditExpense: (id, updates) => dispatch(startEditExpense(id, updates)),
    startRemoveExpense: id => dispatch(startRemoveExpense(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);
