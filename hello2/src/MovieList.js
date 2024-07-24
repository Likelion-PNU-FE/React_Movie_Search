import React from 'react';
import { useAtom } from 'jotai';
import { moviesAtom, loadingAtom } from './atoms'; 

const MovieList = () => {
    const [movies] = useAtom(moviesAtom);
    const [loading] = useAtom(loadingAtom);

    if (!movies || (movies.length === 0 && !loading)) {
        return <p className="text-center my-8">검색 결과가 없습니다.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {movies.map((movie, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col">
                    <img src={movie.Poster} alt={movie.Title} className="w-full h-72 object-cover" />
                    <div className="p-4 flex-grow">
                        <h2 className="text-xl font-bold mb-2 truncate">{movie.Title}</h2>
                        <p className="text-m text-black">Director: {movie.Director}</p>
                        <p className="text-m text-black">{movie.Year}</p>
                    </div>
                </div>
            ))}
            {loading && (
                <div className="col-span-4 text-center p-4">Loading...</div>
            )}
        </div>
    );
};
export default MovieList;