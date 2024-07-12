import React from 'react';

function Movie({ title, year, imdbid, type, poster, onClick }) {
    const clickButton = () => {
        onClick({ imdbid });
    };

    return (
        <div className="movie-container" onClick={clickButton}>
            <img src={poster} alt={`${title} poster`} />
            <p>{title}</p>
        </div>
    );
}

export default Movie; // Movie 컴포넌트를 default로 export
