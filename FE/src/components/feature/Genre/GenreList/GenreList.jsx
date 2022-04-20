import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ROUTES } from './../../../../constants/routes';
import GenreItem from "../GenreItem/GenreItem";
import "./GenreList.scss";


const GenreList = () => {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async (url) => {
      try {
        const response = await axios.get(url);
        const genres = response.data;
  
        // genres.map((genre) => {
        //   genre.open = false;
        //   return genre;
        // });
        
        console.log(genres);
  
        setGenres(genres);
        setLoading(false);
        
        console.log(isLoading);
      } catch (error) {
        console.log(`Error ${error}`);
      }
    };

    fetchGenres('/api/v1/genres');
  }, [isLoading]);

  const goToHomePage = () => navigate(ROUTES.HOME);

  return (
    <>
      <div>Genre list:</div>
      <div className="genre-list">
        <GenreItem genres={genres} />
      </div>
      <hr />
      <button onClick={goToHomePage}>Перейти на главную страницу</button>
    </>
  )
}

export default GenreList;
