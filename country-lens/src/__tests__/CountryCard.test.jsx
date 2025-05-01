import { render, screen } from '@testing-library/react';
import CountryCard from '../components/CountryCard';

test('renders country card with basic info', () => {
    const mockCountry = {
        cca3: 'USA',
        name: { common: 'United States' },
        flags: { png: 'test-flag.png' },
        population: 329484123,
        region: 'Americas',
        capital: ['Washington D.C.']
    };

    render(<CountryCard country={mockCountry} />);
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Population: 329,484,123')).toBeInTheDocument();
});
