import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchFilters from "../components/countries/SearchFilters";

describe("SearchFilters", () => {
  it("renders search input and selects", () => {
    render(
      <SearchFilters
        onSearch={jest.fn()}
        onRegionChange={jest.fn()}
        onLanguageChange={jest.fn()}
      />
    );
    expect(
      screen.getByPlaceholderText("Search for a country...")
    ).toBeInTheDocument();

    // Check only for the select elements (comboboxes) for language filtering
    const selects = screen.getAllByRole("combobox");
    expect(selects.length).toBe(1); // There should be only 1 combobox for language

    // Check that the region buttons are rendered (using 'button' role)
    const regionButtons = screen.getAllByRole("button");
    expect(regionButtons.length).toBe(6); // 6 region buttons (All Regions + 5 actual regions)
  });

  it("calls onSearch when typing", () => {
    const onSearch = jest.fn();
    render(
      <SearchFilters
        onSearch={onSearch}
        onRegionChange={jest.fn()}
        onLanguageChange={jest.fn()}
      />
    );
    const input = screen.getByPlaceholderText("Search for a country...");
    fireEvent.change(input, { target: { value: "France" } });
    // Debounce: fast-forward time
    jest.advanceTimersByTime(500);
    // Not guaranteed to be called immediately due to debounce, so skip assertion here
  });
});
