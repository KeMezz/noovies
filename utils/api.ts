const API_KEY = "aa9053913fbf30c4ec2f4307ecba00f7";
const BASE_URL = "https://api.themoviedb.org/3";

interface BaseResponse {
  page: number;
  total_pages: number;
  total_results: number;
}

export interface iMedia {
  adult?: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title?: string;
  original_name?: string;
  origin_country?: string;
  first_air_date?: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date?: string;
  title?: string;
  name?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  media_type?: string;
}

export interface MediaResponse extends BaseResponse {
  results: iMedia[];
}

export const moviesApi = {
  trending: () =>
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  upcoming: ({ pageParam }: { pageParam: number }) =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${pageParam}`
    ).then((res) => res.json()),
  nowPlaying: () =>
    fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  search: ({ queryKey }: { queryKey: string[] }) => {
    const [, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    ).then((res) => res.json());
  },
  detail: ({ queryKey }: { queryKey: string[] }) => {
    const [, id] = queryKey;
    return fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};

export const tvApi = {
  trending: () =>
    fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  airingToday: () =>
    fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  topRated: () =>
    fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  search: ({ queryKey }: { queryKey: string[] }) => {
    const [, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}`
    ).then((res) => res.json());
  },
  detail: ({ queryKey }: { queryKey: string[] }) => {
    const [, id] = queryKey;
    return fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};
