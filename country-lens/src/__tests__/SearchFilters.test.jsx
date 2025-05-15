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

    const selects = screen.getAllByRole("combobox");
    expect(selects.length).toBe(1);

    const regionButtons = screen.getAllByRole("button");
    expect(regionButtons.length).toBe(6);
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

    jest.advanceTimersByTime(500);
  });
});
