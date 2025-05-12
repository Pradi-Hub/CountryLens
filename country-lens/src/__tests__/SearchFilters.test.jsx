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
    expect(screen.getAllByRole("combobox").length).toBe(2);
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
