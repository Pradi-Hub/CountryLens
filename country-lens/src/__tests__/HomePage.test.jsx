import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import * as countryService from '../services/countryService';

// Mock the react-router-dom module
jest.mock('react-router-dom', () => ({
  Link: ({ to, children, className }) => (
    <a href={to} className={className} data-testid="link">
      {children}
    </a>
  ),
  useNavigate: () => jest.fn()
}));

// Mock the components used inside HomePage
jest.mock('../components/layout/Layout', () => ({ children }) => <div>{children}</div>);
jest.mock('../components/ui/ScrollToTopButton', () => () => <div>ScrollButton</div>);

// Mock the useAuth hook
jest.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    login: jest.fn(),
    logout: jest.fn()
  })
}));

// Mock the CountryCard component to make testing easier
jest.mock('../components/countries/CountryCard', () => {
  return function MockCountryCard({ country }) {
    return (
      <div data-testid="country-card">
        <h3>{country.name.common}</h3>
        <p>Region: {country.region}</p>
        {country.languages && (
          <p>
            Languages: {Object.values(country.languages).join(', ')}
          </p>
        )}
      </div>
    );
  };
});

// Sample mock data
const mockCountries = [
  {
    name: { common: 'France' },
    region: 'Europe',
    languages: { fra: 'French' },
    flags: { png: 'france-flag.png', alt: 'Flag of France' },
    population: 67391582,
    capital: ['Paris']
  },
  {
    name: { common: 'Japan' },
    region: 'Asia',
    languages: { jpn: 'Japanese' },
    flags: { png: 'japan-flag.png', alt: 'Flag of Japan' },
    population: 125836021,
    capital: ['Tokyo']
  }
];

describe('HomePage Integration Test', () => {
  beforeEach(() => {
    // Mock the API functions
    jest.spyOn(countryService, 'getAllCountries').mockResolvedValue(mockCountries);
    jest.spyOn(countryService, 'getCountriesByRegion').mockImplementation(async (region) => {
      return mockCountries.filter(c => c.region === region);
    });
    jest.spyOn(countryService, 'getCountriesByLanguage').mockImplementation(async (lang) => {
      return mockCountries.filter(c =>
        Object.values(c.languages || {}).some(l => 
          l.toLowerCase() === lang.toLowerCase()
        )
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('loads and displays countries on mount', async () => {
    await act(async () => {
      render(<HomePage />);
    });
    
    expect(screen.getByText(/Explore Countries/i)).toBeInTheDocument();
    
    // Wait for the countries to be displayed
    await waitFor(() => {
      expect(screen.getByText('France')).toBeInTheDocument();
      expect(screen.getByText('Japan')).toBeInTheDocument();
    });
  });

  test('filters countries by region', async () => {
    await act(async () => {
      render(<HomePage />);
    });
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('France')).toBeInTheDocument();
    });

    // Change region filter to Europe
    await act(async () => {
      const regionSelect = screen.getByLabelText(/filter by region/i);
      fireEvent.change(regionSelect, { target: { value: 'Europe' } });
    });

    // Check that only France is displayed
    await waitFor(() => {
      expect(screen.getByText('France')).toBeInTheDocument();
      expect(screen.queryByText('Japan')).not.toBeInTheDocument();
    });
  });

  test('filters countries by language', async () => {
    await act(async () => {
      render(<HomePage />);
    });
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('France')).toBeInTheDocument();
    });

    // Change language filter to Japanese
    await act(async () => {
      const languageSelect = screen.getByLabelText(/filter by language/i);
      fireEvent.change(languageSelect, { target: { value: 'Japanese' } });
    });

    // Check that only Japan is displayed
    await waitFor(() => {
      expect(screen.getByText('Japan')).toBeInTheDocument();
      expect(screen.queryByText('France')).not.toBeInTheDocument();
    });
  });

  test('filters countries by search term', async () => {
    await act(async () => {
      render(<HomePage />);
    });
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('France')).toBeInTheDocument();
    });

    // Search for "fran"
    await act(async () => {
      const searchInput = screen.getByPlaceholderText(/search for a country/i);
      fireEvent.change(searchInput, { target: { value: 'fran' } });
    });

    // Check that only France is displayed
    await waitFor(() => {
      expect(screen.getByText('France')).toBeInTheDocument();
      expect(screen.queryByText('Japan')).not.toBeInTheDocument();
    });
  });
});