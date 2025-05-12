import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import from Firebase

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // wait until Firebase confirms auth state
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // You can also fetch additional user data here if needed
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          favorites: [], // You may need to load this from Firestore
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // clean up
  }, []);

  // Optional: update localStorage if needed
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const logout = () => {
    const auth = getAuth();
    auth.signOut();
    setUser(null);
  };

  const addFavorite = (country) => {
    setUser((prev) => {
      const currentFavorites = Array.isArray(prev?.favorites)
        ? prev.favorites
        : [];
      const isAlreadyFavorite = currentFavorites.some(
        (fav) => fav.cca3 === country.cca3
      );
      if (isAlreadyFavorite) return prev;

      return {
        ...prev,
        favorites: [
          ...currentFavorites,
          {
            cca3: country.cca3,
            name: country.name.common,
            flag: country.flags.svg,
          },
        ],
      };
    });
  };

  const removeFavorite = (countryCode) => {
    setUser((prev) => ({
      ...prev,
      favorites: (prev?.favorites || []).filter(
        (country) => country.cca3 !== countryCode
      ),
    }));
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, logout, addFavorite, removeFavorite }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
