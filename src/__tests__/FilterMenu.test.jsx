import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FilterMenu from "../components/FilterMenu/FilterMenu";

const defaultFilter = {
  fuel: [],
  price: { min: 0, max: 20 },
  sort: "best-match",
};

const filter = { ...defaultFilter };

describe("FilterMenu Component", () => {
  const setFilter = jest.fn();

  it("renders the filter menu", () => {
    render(
      <FilterMenu
        filter={defaultFilter}
        setFilter={setFilter}
        defaultFilter={defaultFilter}
      />
    );
    expect(screen.getByText(/Filters/i)).toBeInTheDocument();
    expect(screen.getByText(/Fuel/i)).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <FilterMenu
        filter={filter}
        setFilter={setFilter}
        defaultFilter={defaultFilter}
      />
    );
    expect(asFragment).toMatchSnapshot();
  });

  it("handles fuel checkbox changes", () => {
    render(
      <FilterMenu
        filter={filter}
        setFilter={setFilter}
        defaultFilter={defaultFilter}
      />
    );
    const petrolCheckbox = screen.getByLabelText("Petrol");
    fireEvent.click(petrolCheckbox);
    expect(setFilter).toHaveBeenCalled();
  });

  it("handles price changes", () => {
    render(
      <FilterMenu
        filter={filter}
        setFilter={setFilter}
        defaultFilter={defaultFilter}
      />
    );
    const minPriceInput = screen.getByTestId("min");
    fireEvent.change(minPriceInput, { target: { value: "5" } });
    expect(setFilter).toHaveBeenCalled();
  });

  it("clears all filters", () => {
    render(
      <FilterMenu
        filter={filter}
        setFilter={setFilter}
        defaultFilter={defaultFilter}
      />
    );
    fireEvent.click(screen.getByText(/Clear All/i));
    expect(setFilter).toHaveBeenCalledWith(defaultFilter);
  });
});
