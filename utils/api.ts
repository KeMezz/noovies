const API_KEY = "aa9053913fbf30c4ec2f4307ecba00f7";
const BASE_URL = "https://api.themoviedb.org/3";

export const moviesAPI = {
  trending: () =>
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  upcoming: () =>
    fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  nowPlaying: () =>
    fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
};
