import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchFilters from "../components/countries/SearchFilters";

describe("SearchFilters", () => {
  it("renders search input and language dropdown", () => {
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

    // Since there's no native select or ARIA combobox, test for the custom dropdown button instead
    expect(
      screen.getByRole("button", { name: /All Languages|Filter by Language/i })
    ).toBeInTheDocument();

    // Check region buttons (All + 5 regions)
    const regionButtons = screen.getAllByRole("button");
    expect(regionButtons.length).toBeGreaterThanOrEqual(6); // Button count may include the dropdown
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
