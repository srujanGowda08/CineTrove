import React, { useEffect, useState } from "react";
import "./TitleCard.css";

const TitleCards = ({ title, category }) => {
  const [cardsData, setCardsData] = useState([]);

  const truncateTitle = (title) => {
    return title.length > 20 ? `${title.substring(0, 20)}...` : title;
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?s=${category || "popular"}&apikey=8f470d71`
        );
        const data = await response.json();

        if (data.Response === "True") {
          // Fetch ratings for each movie
          const detailedMovies = await Promise.all(
            data.Search.map(async (movie) => {
              const movieResponse = await fetch(
                `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=8f470d71`
              );
              return movieResponse.json();
            })
          );
          setCardsData(detailedMovies); // Store detailed movie data with ratings
        } else {
          console.error("No data found:", data.Error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovies();
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list">
        {cardsData.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.Poster} alt={card.Title} />
            <p>{truncateTitle(card.Title)}</p> {/* Use the truncate function */}
            {card.Ratings && card.Ratings.length > 0 && (
              <p>
                Rating: {card.Ratings[0].Value} {/* Display the first rating */}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
