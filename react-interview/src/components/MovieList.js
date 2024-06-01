// src/components/MovieList.js
import React, { useState, useEffect } from 'react';
import { movies$ } from '../movies';
import styled from 'styled-components';
import CategoryFilter from './CategoryFilter';
import MovieCard from './MovieCard';
import Pagination from './Pagination';

const MovieListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
`;

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    movies$.then(data => {
      setMovies(data);
      const uniqueCategories = [...new Set(data.map(movie => movie.category))];
      setCategories(uniqueCategories.map(category => ({ value: category, label: category })));
    });
  }, []);

  const handleLike = (id) => {
    setMovies(movies.map(movie =>
      movie.id === id ? { ...movie, likes: movie.likes + 1 } : movie
    ));
  };

  const handleDislike = (id) => {
    setMovies(movies.map(movie =>
      movie.id === id ? { ...movie, dislikes: movie.dislikes + 1 } : movie
    ));
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions || []);
    setCurrentPage(1); // Reset to first page on category change
  };

  const filteredMovies = selectedCategories.length === 0 
    ? movies 
    : movies.filter(movie => selectedCategories.some(category => category.value === movie.category));

  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  useEffect(() => {
    const remainingCategories = [...new Set(filteredMovies.map(movie => movie.category))];
    setCategories(remainingCategories.map(category => ({ value: category, label: category })));
  }, [filteredMovies]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (num) => {
    setItemsPerPage(num);
    setCurrentPage(1); // Reset to first page on items per page change
  };

  return (
    <div>
      <h1>Movie List</h1>
      <div>
        <CategoryFilter 
          categories={categories} 
          selectedCategories={selectedCategories} 
          onCategoryChange={handleCategoryChange} 
        />
      </div>
      <MovieListContainer>
        {currentMovies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onLike={handleLike} 
            onDislike={handleDislike} 
          />
        ))}
      </MovieListContainer>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default MovieList;
