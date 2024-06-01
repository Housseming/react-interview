// src/components/CategoryFilter.js
import React from 'react';
import Select from 'react-select';

const CategoryFilter = ({ categories, selectedCategories, onCategoryChange }) => {
  return (
    <Select
      options={categories}
      isMulti
      value={selectedCategories}
      onChange={onCategoryChange}
    />
  );
};

export default CategoryFilter;
