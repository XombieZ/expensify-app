import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";

const now = moment();
console.log(now);

export default class ExpenseForm extends React.Component {
  state = {
    description: "",
    note: "",
    amount: "",
    createdAt: moment(),
    calendarFocused: false,
    error: ""
  };

  constructor(props) {
    super(props);

    if (props.expenseToEdit) {
      this.state = {
        ...this.state,
        description: props.expenseToEdit.description,
        note: props.expenseToEdit.note,
        amount: (props.expenseToEdit.amount / 100).toString(),
        createdAt: moment(props.expenseToEdit.createdAt)
      };
    }
  }

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  onAmountChange = e => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  onFocusChange = ({ focused }) =>
    this.setState(() => ({ calendarFocused: focused }));

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      // Set error
      this.setState(() => ({
        error: "Please provide description and amount!"
      }));
    } else {
      // Clear error
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100, // *100 => calculating in cents
        createdAt: this.state.createdAt.valueOf(), // timestamp in milliseconds moment().valueOf()
        note: this.state.note
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            value={this.state.note}
            onChange={this.onNoteChange}
            placeholder="Add a note for your expense (optional)"
          />
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}
