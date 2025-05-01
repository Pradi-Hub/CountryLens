// For favorite countries
export const saveFavorites = (favorites) =>
    localStorage.setItem('favorites', JSON.stringify(favorites));

export const getFavorites = () =>
    JSON.parse(localStorage.getItem('favorites')) || [];
