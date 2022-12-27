const API_KEY = "aa9053913fbf30c4ec2f4307ecba00f7";
const BASE_URL = "https://api.themoviedb.org/3";

interface BaseResponse {
  page: number;
  total_pages: number;
  total_results: number;
}

export interface MovieResults extends BaseResponse {
  results: IMovie[];
}

export interface TvResults extends BaseResponse {
  results: ITv[];
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ITv {
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
}

export interface IMovieDetail {
  adult?: boolean;
  backdrop_path?: string | null;
  belongs_to_collection?: null | Object;
  budget?: number;
  genres?: {
    id: number;
    name: string;
  }[];
  homepage?: string | null;
  id?: number;
  imdb_id?: string | null;
  original_language?: string;
  original_title?: string;
  overview?: string | null;
  popularity?: number;
  poster_path?: string | null;
  production_companies: {
    id?: number;
    logo_path?: string | null;
    name?: string;
    origin_country?: string;
  }[];
  production_countries?: {
    name?: string;
    iso_3166_1?: string;
  }[];
  release_date?: string;
  revenue?: number;
  runtime?: number | null;
  spoken_languages?: {
    english_name?: string;
    iso_639_1?: string;
    name?: string;
  }[];
  status?: string;
  tagline?: string | null;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export const fetchMovies = {
  trending: () =>
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  upcoming: () =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko&page=1`
    ).then((res) => res.json()),
  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko&page=1`
    ).then((res) => res.json()),
  search: (query: string) => {
    return fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko&page=1&query=${query}&include_adult=false`
    ).then((res) => res.json());
  },
  detail: (id: number) => {
    return fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};

export const fetchTvs = {
  trending: () =>
    fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  airingToday: () =>
    fetch(
      `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=ko&page=1`
    ).then((res) => res.json()),
  topRated: () =>
    fetch(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko&page=1`
    ).then((res) => res.json()),
  search: (query: string) => {
    return fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=ko&page=1&query=${query}&include_adult=false`
    ).then((res) => res.json());
  },
  detail: (id: number) => {
    return fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=k&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};
