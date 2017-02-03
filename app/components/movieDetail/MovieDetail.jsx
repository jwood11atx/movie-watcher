import React, { Component } from 'react';
import { Link } from 'react-router';
// import './movieCard-style';

const MovieDetail = (props) => {
  const { movie } = props

  const addFavToApi = (props) => {
    const {id, user, title, poster_path,
           release_date, vote_average,
           overview} = props;

    const favID = getMatchedFavID(props);

    if(!favID){
      fetch('api/users/favorites/new', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          movie_id: id,
          user_id: user.id,
          title: title,
          poster_path: poster_path,
          release_date: release_date,
          vote_average: vote_average,
          overview: overview })
        })
        .then(() => props.addFav(props))
      } else {

        fetch(`api/users/${user.id}/favorites/${favID}`, {
          method: "DELETE",
          headers: {'Content-Type' : 'application/json'},
        })
          .then(() => props.removeFav(props))
          .catch(err => console.log(err))
      }
  }

  const favCheck = () => {
    let favorited = "";
    props.favorites.forEach(fav => {
      if(fav.title === props.title)
        favorited = "favorite"
    })
    return favorited;
  }

  const favoriteBtn = (props) => {
    if(props.user) {
    return (
      <button className={"fav " + favCheck()}
        onClick={() => addFavToApi(props)}>
        ♥︎
      </button>
    )}
  }

  return (

    <div className='movie-card'>
      <h1 className='movie-title'>{movie.title}</h1>
      <p className='movie-release'>{movie.release_date}</p>
      {favoriteBtn(movie)}
        <img className='movie-poster'
             src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}/>

    </div>
  );
};

export default MovieDetail;
