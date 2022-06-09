export const makeImagePath = (backdropPath: string, size: string = "w500") =>
  `https://image.tmdb.org/t/p/${size}${backdropPath}`;
