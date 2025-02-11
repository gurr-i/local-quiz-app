import { useState, useEffect } from "react";
const API_KEY = process.env.REACT_APP_API_KEY;

const GENRES = [
  "Super Cars",
  "Sports Cars",
  "Ferrari",
  "Bugatti",
  "Jeep Wrangler",
  "BMW",
  "Toyota Supra",
  "Porsche",
  "Audi",
  "Lamborghini",
  "Maserati",
  "Rolls-Royce",
];

const useBackground = () => {
  const [background, setBackground] = useState(null);

  useEffect(() => {
    const fetchBackground = async () => {
      const query = GENRES[Math.floor(Math.random() * GENRES.length)];
      const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${API_KEY}&orientation=landscape`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.urls && data.urls.full) {
          setBackground(data.urls.full);
        }
      } catch (error) {
        console.error("Failed to fetch background image:", error);
      }
    };

    fetchBackground();
  }, []);

  return background;
};

export default useBackground;
