import instance from './axiosConfig';

// 영화 검색 목록
export const fetchMovies = async (query, page = 1) => {
    try {
        const response = await instance.get('/', {
            params: {
                s: query,
                page: page,
            },
        });
        if (response.Response === 'False') {
            throw new Error(response.Error || '영화를 찾을 수 없습니다.');
        }
        return {
            ...response,
            Search: response.Search || [], // Search가 undefined인 경우에 빈배열 설정
        };
    } catch (error) {
        console.error('Fetch movies error:', error);
        throw new Error('영화를 찾을 수 없음');
    }
};

// 영화 상세 정보
export const fetchMovieDetails = async (id) => {
    try {
        const response = await instance.get('/', {
            params: {
                i: id,
            },
        });
        if (response.Response === 'False') {
            throw new Error(response.Error || '영화 세부 정보를 찾을 수 없습니다.');
        }
        return response;
    } catch (error) {
        console.error('Fetch movie details error:', error);
        throw error;
    }
};
