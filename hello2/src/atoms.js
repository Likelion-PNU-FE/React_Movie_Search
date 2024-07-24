import { atom } from 'jotai';

// 검색어 상태를 저장하는 atom
export const searchQueryAtom = atom('');

// 영화 목록 상태를 저장하는 atom
export const moviesAtom = atom([]);

// 로딩 상태를 저장하는 atom
export const loadingAtom = atom(false);