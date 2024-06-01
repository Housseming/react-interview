// src/components/MovieCard.js
import React from 'react';
import styled from 'styled-components';

const MovieCardContainer = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: 300px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 10px;
`;

const MovieTitle = styled.h2`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Category = styled.p`
  font-style: italic;
  margin-bottom: 16px;
`;

const GaugeContainer = styled.div`
  position: relative;
  height: 10px;
  background: #eee;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 16px;
`;

const Gauge = styled.div`
  height: 100%;
  background: ${props => props.color};
  width: ${props => props.width}%;
`;

const Button = styled.button`
  margin: 4px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  background-color: ${props => props.bgColor};
`;

const MovieCard = ({ movie, onLike, onDislike }) => {
  const total = movie.likes + movie.dislikes;
  const likeRatio = total ? (movie.likes / total) * 100 : 0;

  return (
    <MovieCardContainer>
      <MovieTitle>{movie.title}</MovieTitle>
      <Category>{movie.category}</Category>
      <GaugeContainer>
        <Gauge color="#76c7c0" width={likeRatio} />
      </GaugeContainer>
      <p>Likes: {movie.likes} Dislikes: {movie.dislikes}</p>
      <Button bgColor="#4CAF50" onClick={() => onLike(movie.id)}>Like</Button>
      <Button bgColor="#f44336" onClick={() => onDislike(movie.id)}>Dislike</Button>
    </MovieCardContainer>
  );
};

export default MovieCard;

