import React from 'react';
import './skeleton.css';

const Skeleton = () => {
    return (
        <div className='skeleton movie-list__item'>
            <div className='skeleton-img'></div>
            <div className='skeleton-info'>
                <div className='skeleton-title'></div>
                <div className='skeleton-year'></div>
            </div>
        </div>
    );
};

export default Skeleton;
