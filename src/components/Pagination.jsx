import React from 'react';
import './pagination.css';

function Pagination({ currentPage, totalResults, onPageChange }) {
    const totalPages = Math.ceil(totalResults / 10);

    return (
        <div className="pagination" >
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                이전
            </button>
            <span>{currentPage} / {totalPages}</span>
            <button 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                다음
            </button>
        </div>
    );
}

export default Pagination;
