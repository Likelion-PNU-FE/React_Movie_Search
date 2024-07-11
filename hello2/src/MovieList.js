// 영화 리스트
import React, { useState } from 'react';

// 영화 결과 띄우기 (결과가 있을 때, 없을 때)
const Movielist = ({movies}) => {
    if (movies.length === 0) {
        return <p className="text-center my-8">검색 결과가 없습니다.</p>;
    }
    else
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> //반응형이 이 과제에 필요한가?
            {movies.map((movie, index) => (
                <div key={index} className="bg-white rounded-lg"> // 영화 카드 형태만들기
                <img src={movie.poster} alt={movie.Title} className="w-full h-64 object-cover"/>
                    <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{movie.Title}</h2>
                    <p className="text-m text-black">Director: {movie.Director}</p>
                    <p classname="text-m text-black">{movie.Year}</p>

                    //각 버튼에 대한 유효성 검사를 진행한다.
const totalPages = Math.ceil(totalResults / moviesPerPage);
const currentBatch = Math.ceil(currentPage / pagesPerBatch);
//currentPage가 15이고 pagesPerBatch가 10이면, currentBatch는 2, 두 번째 배치(11~20 페이지 범위)에 있다는 의미
const startPage = (currentBatch - 1) * pagesPerBatch + 1;
const endPage = Math.min(startPage + pagesPerBatch - 1, totalPages);
const renderPagination = () = (
        <div className='flex justify-center mt-6'>
            {startPage > 1 && (
             //이전으로 가기 버튼은 startPage가 1보다 클 경우 렌더링 된다.
                <button
                    className='p-2 mx-1 bg-gray-300 text-gray-700 rounded-md hover:bg-blue-600 hover:text-white'
                    onClick={() => handlePageChange(startPage - pagesPerBatch)}
                >
                    &laquo;
                </button>
            )}
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                <button
                    key={startPage + index}
                    className={`p-2 mx-1 ${
                        currentPage === startPage + index ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                    } rounded-md hover:bg-blue-600 hover:text-white`}
                    onClick={() => handlePageChange(startPage + index)}
                >
                    {startPage + index}
                </button>
            ))}
            {endPage < totalPages && (
                <button
                    className='p-2 mx-1 bg-gray-300 text-gray-700 rounded-md hover:bg-blue-600 hover:text-white'
                    onClick={() => handlePageChange(startPage + pagesPerBatch)}
                >
                    &raquo;
                </button>
            )}
        </div>
    );
                    </div>
                </div>
            ))}
        </div>
    );
};
export default Movielist;
