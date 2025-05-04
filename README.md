<p align="center">
  <a>
    <img src="/country-lens/src/assets/countryLens2.png" width="250" height="250"/>
  </a>
  <h1 align="center">CountryLens</h1>
</p>

## About

CountryLens is a modern React application that lets you explore, search, and discover detailed information about countries around the world. Powered by the [REST Countries API](https://restcountries.com/), CountryLens offers an interactive experience to browse global data, filter by region or language, and optionally curate a personal list of favorite countries.

---

## 🚀 Features

- 🔍 **Search** for countries by name (frontend-based filtering)
- 🌐 **Filter** countries by region or language
- 🗺️ **View details**: flag, capital, population, region, and languages
- 🗺️ **Interactive map** using Leaflet
- 💖 Add to **favorites list** after login **(CountryLens Pro)**
- 📱 Responsive design using Tailwind CSS
- ⚡ Fast performance powered by Vite

---

## 🛠️ Tech Stack

- **Frontend**: React (Functional Components)
- **Styling**: Tailwind CSS
- **API**: [REST Countries API](https://restcountries.com/)
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: React Router DOM
- **Maps**: [React-Leaflet](https://react-leaflet.js.org/)
- **Version Control**: Git + GitHub
- **Deployment**: [Vercel](https://vercel.com/)
- **Optional**: Firebase Auth or custom backend for user login

---

## 🔧 Installation and Setup

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/countrylens.git
cd countrylens

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🏗️ Build Process

To build the project for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

The optimized build will be output to the `dist` folder.

---

## 🌐 API Usage

The app interacts with the [REST Countries API](https://restcountries.com/v3.1) using the following endpoints:

- `GET /all` – Fetch all countries
- `GET /region/{region}` – Filter countries by region
- `GET /lang/{language}` – Filter countries by language
- `GET /alpha/{code}` – Get detailed country information by code

All API calls are managed in `/src/services/countryService.js`:

- `getAllCountries()`
- `getCountriesByName(name)` — Filters countries whose names start with the input
- `getCountriesByRegion(region)`
- `getCountriesByLanguage(language)`
- `getCountryByCode(code)`

---

## 🗺️ Map Integration

- Interactive maps integrated using `react-leaflet`
- Country markers with popup details (name + capital)
- Smooth map scroll and proper z-index for modals

---

## 🧪 Testing

- Manual testing on multiple screen sizes and browsers
- (Optional) Use **Jest** and **React Testing Library** for unit/component tests

---

## 📦 Deployment

Deployed using:

- **Vercel**: [https://countrylens.vercel.app](https://countrylens.vercel.app)

---

## 👩‍💻 Author

- **Name**: P. Pradicksha  
- **Course**: BSc (Hons) in Information Technology – Software Engineering

---

## 📜 License

This project is for academic use only. Do not distribute without permission.
