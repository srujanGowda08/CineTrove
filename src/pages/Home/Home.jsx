import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const [bannerMovies, setBannerMovies] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const fetchBannerMovies = async () => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?s=jokes&apikey=8f470d71`
        );
        const data = await response.json();

        if (data.Response === "True") {
          setBannerMovies(data.Search); // Store all movies for rotation
        } else {
          console.error("No movies found:", data.Error);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchBannerMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the banner index to show the next movie
      setCurrentBannerIndex(
        (prevIndex) => (prevIndex + 1) % bannerMovies.length
      );
    }, 10000); // 3 seconds interval

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [bannerMovies.length]);

  const currentBannerMovie = bannerMovies[currentBannerIndex];

  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        {currentBannerMovie && (
          <>
            <img
              src={currentBannerMovie.Poster}
              alt={currentBannerMovie.Title}
              className="banner-img"
            />
            <div className="hero-caption">
              <h1 className="caption-title">{currentBannerMovie.Title}</h1>
              <p>{currentBannerMovie.Year}</p>
              <div className="hero-btns">
                <button className="btn">
                  <img src={play_icon} alt="Play Icon" />
                  Play
                </button>
                <button className="btn dark-btn">
                  <img src={info_icon} alt="Info Icon" />
                  More Info
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="more-cards">
        <TitleCards title="Popular on CineTrove" category="popular" />
        <TitleCards title="Blockbuster Movies" category="blockbuster" />
        <TitleCards title="Only on CineTrove" category="netflix" />
        <TitleCards title="Action" category="action" />
        <TitleCards title="Top picks for you" category="top" />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
