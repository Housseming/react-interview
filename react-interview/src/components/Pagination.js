// src/components/Pagination.js
import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const Button = styled.button`
  margin: 0 5px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  background-color: ${props => (props.disabled ? '#ccc' : '#007bff')};
`;

const Select = styled.select`
  margin-left: 20px;
  padding: 8px;
`;

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange }) => {
  return (
    <PaginationContainer>
      <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Précédent
      </Button>
      <span>Page {currentPage} sur {totalPages}</span>
      <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Suivant
      </Button>
      <Select value={itemsPerPage} onChange={(e) => onItemsPerPageChange(Number(e.target.value))}>
        <option value={4}>4</option>
        <option value={8}>8</option>
        <option value={12}>12</option>
      </Select>
    </PaginationContainer>
  );
};

export default Pagination;
