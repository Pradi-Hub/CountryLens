import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import HomePage from "../pages/HomePage";
import * as countryService from "../services/countryService";

// ✅ Mock useLocation, useNavigate, Link from react-router-dom
jest.mock("react-router-dom", () => ({
  Link: ({ to, children, className }) => (
    <a href={to} className={className} data-testid="link">
      {children}
    </a>
  ),
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    search: "",
  }),
}));

// ✅ Mock layout and utility components
jest.mock("../components/layout/Layout", () => ({ children }) => (
  <div>{children}</div>
));
jest.mock("../components/ui/ScrollToTopButton", () => () => (
  <div>ScrollButton</div>
));

// ✅ Mock CountryCard to simplify UI
jest.mock("../components/countries/CountryCard", () => {
  return function MockCountryCard({ country }) {
    return (
      <div data-testid="country-card">
        <h3>{country.name.common}</h3>
        <p>Region: {country.region}</p>
        {country.languages && (
          <p>Languages: {Object.values(country.languages).join(", ")}</p>
        )}
      </div>
    );
  };
});

// ✅ Sample mock data
const mockCountries = [
  {
    name: { common: "France" },
    region: "Europe",
    languages: { fra: "French" },
    flags: { png: "france-flag.png" },
    population: 67000000,
    capital: ["Paris"],
  },
  {
    name: { common: "Japan" },
    region: "Asia",
    languages: { jpn: "Japanese" },
    flags: { png: "japan-flag.png" },
    population: 125000000,
    capital: ["Tokyo"],
  },
];

// ✅ Test suite
describe("HomePage Integration Test", () => {
  beforeEach(() => {
    jest
      .spyOn(countryService, "getAllCountries")
      .mockResolvedValue(mockCountries);
    jest
      .spyOn(countryService, "getCountriesByRegion")
      .mockImplementation(async (region) => {
        return mockCountries.filter((c) => c.region === region);
      });
    jest
      .spyOn(countryService, "getCountriesByLanguage")
      .mockImplementation(async (language) => {
        const filteredCountries = mockCountries.filter((c) =>
          Object.values(c.languages || {}).some(
            (l) => l.toLowerCase() === language.toLowerCase()
          )
        );
        console.log("Filtered countries by language:", filteredCountries); // Debugging line
        return filteredCountries;
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("loads and displays countries on mount", async () => {
    await act(async () => {
      render(<HomePage />);
    });

    expect(screen.getByText(/Explore Countries/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("France")).toBeInTheDocument();
      expect(screen.getByText("Japan")).toBeInTheDocument();
    });
  });

  test("filters countries by region", async () => {
    await act(async () => {
      render(<HomePage />);
    });

    await waitFor(() => {
      expect(screen.getByText("France")).toBeInTheDocument();
    });

    // ✅ Click on "Europe" region button
    await act(async () => {
      const europeButton = screen.getByText("Europe");
      fireEvent.click(europeButton);
    });

    await waitFor(() => {
      expect(screen.getByText("France")).toBeInTheDocument();
      expect(screen.queryByText("Japan")).not.toBeInTheDocument();
    });
  });

  test("filters countries by search term", async () => {
    await act(async () => {
      render(<HomePage />);
    });

    await waitFor(() => {
      expect(screen.getByText("France")).toBeInTheDocument();
    });

    // ✅ Search for "fran"
    await act(async () => {
      const searchInput = screen.getByPlaceholderText(/search for a country/i);
      fireEvent.change(searchInput, { target: { value: "fran" } });
    });

    await waitFor(() => {
      expect(screen.getByText("France")).toBeInTheDocument();
      expect(screen.queryByText("Japan")).not.toBeInTheDocument();
    });
  });

  // Negative Test 1: No countries match the selected region
  test("displays no countries when an invalid region is selected", async () => {
    // Mock an empty region response
    jest.spyOn(countryService, "getCountriesByRegion").mockResolvedValue([]); // No countries for the selected region

    await act(async () => {
      render(<HomePage />);
    });

    // Select a region that has no countries
    await act(async () => {
      const europeButton = screen.getByText("Africa"); // Assuming Africa has no countries in the mock
      fireEvent.click(europeButton);
    });

    await waitFor(() => {
      expect(screen.queryByText("France")).not.toBeInTheDocument();
      expect(screen.queryByText("Japan")).not.toBeInTheDocument();
    });
  });

  // Negative Test 2: No countries match the search term
  test("displays no countries when no countries match the search term", async () => {
    await act(async () => {
      render(<HomePage />);
    });

    // Enter a search term that doesn't match any country
    await act(async () => {
      const searchInput = screen.getByPlaceholderText(/search for a country/i);
      fireEvent.change(searchInput, {
        target: { value: "NonExistentCountry" },
      });
    });

    await waitFor(() => {
      // Ensure no countries are displayed
      expect(screen.queryByText("France")).not.toBeInTheDocument();
      expect(screen.queryByText("Japan")).not.toBeInTheDocument();
    });
  });
});
