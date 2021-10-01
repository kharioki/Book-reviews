// export const DB_URL = 'https://kiki-book-reviews.herokuapp.com/';
export const DB_URL = 'http://localhost:7777/';
export const WS_URL = 'ws://localhost:7777/';

export const calculateAverageRating = (reviews) => {
  const total = reviews.reduce((acc, review) => acc + review.rating, 0);
  const average = (total / reviews.length).toFixed(1);
  return average;
}
