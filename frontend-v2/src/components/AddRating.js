import { useState } from 'react';
import Rating from 'react-rating';

import { AddRatingStyles, ReviewInput } from './styles/AddRatingStyles';
import { Title, Subtitle } from './styles/ProductStyles';
import Button from './styles/Button';

function AddRating() {
  const [rating, setRating] = useState(3);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit', rating, reviewText);
  };

  return (
    <AddRatingStyles>
      <Title>What's your rating?</Title>

      <label className="rating-label">
        <Subtitle>Rating</Subtitle>

        <Rating
          emptySymbol={<img src="assets/star-grey.png" alt="empty star" className="stars" />}
          fullSymbol={<img src="assets/star-gold.png" alt="filled star" className="stars" />}
          placeholderSymbol={<img src="assets/star-gold.png" alt="filled star" className="stars" />}
          placeholderRating={rating}
          onChange={(newRating) => setRating(newRating)}
        // onClick={(newRating) => setRating(newRating)}
        />
      </label>

      <label className="rating-label">
        <Subtitle>Review</Subtitle>

        <ReviewInput
          type="text"
          placeholder="Start typing..."
          onChange={(e) => setReviewText(e.target.value)}
        />
      </label>

      <Button onClick={handleSubmit} submit>Submit Review</Button>
    </AddRatingStyles>
  );
}

export default AddRating;
