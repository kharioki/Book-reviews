import { useState, forwardRef } from 'react';
import Rating from 'react-rating';
import { useMutation, gql } from '@apollo/client';

import { AddRatingStyles, ReviewInput } from './styles/AddRatingStyles';
import { Title, Subtitle } from './styles/ProductStyles';
import Button from './styles/Button';

const ADD_REVIEW = gql`
  mutation createReview($rating: Float!, $text: String!) {
    createReview(rating: $rating, text: $text) {
      id
      text
      rating
    }
  }
`;

const AddRating = forwardRef((props, ref) => {
  const [rating, setRating] = useState(3);
  const [reviewText, setReviewText] = useState('');

  const [createReview] = useMutation(ADD_REVIEW);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReview({
      variables: {
        rating,
        text: reviewText,
      },
    });
    setRating(3);
    setReviewText('');
  };

  return (
    <AddRatingStyles>
      <Title>What's your rating?</Title>

      <label className="rating-label">
        <Subtitle>Rating</Subtitle>

        <Rating
          emptySymbol={<img src="assets/star-grey.png" alt="empty star" className="stars" />}
          fullSymbol={<img src="assets/star-gold.png" alt="filled star" className="stars" />}
          placeholderSymbol={<img src="assets/star-gold.png" alt="filled placeholder star" className="stars" />}
          placeholderRating={rating}
          onChange={(newRating) => setRating(newRating)}
        />
      </label>

      <label className="rating-label">
        <Subtitle>Review</Subtitle>

        <ReviewInput
          type="text"
          placeholder="Start typing..."
          onChange={(e) => setReviewText(e.target.value)}
          value={reviewText}
        />
      </label>

      <Button ref={ref} onClick={handleSubmit} submit>Submit Review</Button>
    </AddRatingStyles>
  );
});

export default AddRating;
