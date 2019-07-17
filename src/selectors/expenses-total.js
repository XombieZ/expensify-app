export default (expenses = []) =>
  expenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);
