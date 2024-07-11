const key = process.env.REACT_APP_API_KEY;
const BASE_URL = 'http://www.omdbapi.com';

//영화 검색 목록
export const fetchMovies = async (query, page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/?s=${query}&page=${page}&apikey=${key}`);
        const data = await response.json();
        if (!response.ok || data.Response === 'False') {
            throw new Error(data.Error || '영화를 찾을 수 없습니다.');
        }
        return {
            ...data,
            Search: data.Search || [], // Search가 undefined인 경우에 빈배열 설정
        };
    } catch (error) {
        console.error('오류:', error);
        throw new Error('영화를 찾을 수 없음');
    }
};
//상세페이지
export const fetchMovieDetails = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/?i=${id}&apikey=${key}`);
        const data = await response.json();
        if (!response.ok || data.Response === 'False') {
            throw new Error(data.Error || '영화 세부 정보를 찾을 수 없습니다.');
        }
        return data;
    } catch (error) {
        console.error('오류 :', error);
        throw error;
    }
};
