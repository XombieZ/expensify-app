import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();

  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test("should render ExpenseListFilters correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilters with alt data correctly", () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test("should handle text change", () => {
  const text = "new text filter";
  wrapper.find("input").simulate("change", { target: { value: text } });
  expect(setTextFilter).toHaveBeenLastCalledWith(text);
});

test("should handle sort by date", () => {
  wrapper.find("select").simulate("change", { target: { value: "date" } });
  expect(sortByDate).toHaveBeenCalled();
});

test("should handle sort by amount", () => {
  wrapper.find("select").simulate("change", { target: { value: "amount" } });
  expect(sortByAmount).toHaveBeenCalled();
});

test("should handle set start date and set end date", () => {
  const startDate = moment(0);
  const endDate = moment(0).add(4, "days");
  wrapper.find("DateRangePicker").prop("onDatesChange")({ startDate, endDate });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test("should handle date focus changes", () => {
  wrapper.find("DateRangePicker").prop("onFocusChange")("startDate");
  expect(wrapper.state().calendarFocused).toBe("startDate");
});
