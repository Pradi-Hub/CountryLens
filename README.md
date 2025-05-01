# 🌍 CountryLens

CountryLens is a modern React application that lets you explore, search, and discover detailed information about countries around the world. Powered by the [REST Countries API](https://restcountries.com/), CountryLens offers an interactive experience to browse global data, filter by region or language, and optionally curate a personal list of favorite countries.

---

## 🚀 Features

- 🔍 **Search** for countries by name
- 🌐 **Filter** countries by region or language
- 🗺️ **View details**: flag, capital, population, region, and languages
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
- **Version Control**: Git + GitHub
- **Deployment**: Netlify / Vercel (free hosting)
- **Optional**: Firebase Auth or custom backend for user login

---

## 🔧 Installation

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Steps

```bash
# Clone the repo
git clone https://github.com/your-username/countrylens.git
cd countrylens

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📁 Project Structure

```
countrylens/
├── public/
├── src/
│   ├── components/         # Reusable components (SearchBar, CountryCard, etc.)
│   ├── pages/              # Page components (Home, CountryDetail, etc.)
│   ├── services/           # API service functions
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── styles/             # Tailwind or global styles
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🌐 API Usage

Using the [REST Countries API](https://restcountries.com/), the app interacts with the following endpoints:

- `GET /all` – Get a list of all countries
- `GET /name/{name}` – Search country by name
- `GET /region/{region}` – Filter countries by region
- `GET /alpha/{code}` – Get detailed info by country code

---

## 🧪 Testing

- Manual testing across different screen sizes
- (Optional) Write component/unit tests using Jest and React Testing Library

---

## 📦 Deployment

You can deploy this app for free using:

- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)

---

## 👩‍💻 Author

- Name: P. Pradicksha
- Course: BSc (Hons) in Information Technology – Software Engineering

---

## 📜 License

This project is for academic use only. Do not distribute without permission.
