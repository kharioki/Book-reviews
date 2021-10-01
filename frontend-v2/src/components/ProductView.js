import { useState, useEffect } from 'react';
import Rating from 'react-rating';

import { ProductStyles, Title, Summary, AverageRatingStyles, Divider, List, Subtitle, ListItem } from './styles/ProductStyles';
import Button from './styles/Button';
import { DB_URL } from '../Utils';

const AverageRating = ({ rating }) => {
  return (
    <AverageRatingStyles>
      <p className="average">{rating}</p>
      <Rating
        emptySymbol={<img src="assets/star-grey.png" alt="empty star" className="stars" />}
        fullSymbol={<img src="assets/star-gold.png" alt="filled star" className="stars" />}
        initialRating={rating}
        readonly
      />
    </AverageRatingStyles>
  )
};

const Review = ({ review }) => {
  return (
    <ListItem>
      <span className="stars">
        <Rating
          emptySymbol={<img src="assets/star-grey.png" alt="empty star" className="stars" />}
          fullSymbol={<img src="assets/star-gold.png" alt="filled star" className="stars" />}
          initialRating={review.rating}
          readonly
        />
      </span>
      <p className="num">{review.rating}</p>
      <p className="text">, {review.text}</p>
    </ListItem>
  )
}

function ProductView() {
  const [rating, setRating] = useState(1);
  const [reviews, setReviews] = useState([]);

  const calculateAverageRating = (reviews) => {
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = (total / reviews.length).toFixed(1);
    return average;
  }

  const getReviews = async () => {
    const req = JSON.stringify({
      query: `{
        reviews {
          id
          text
          rating
        }
      }`,
    });

    const response = await fetch(DB_URL, {
      method: 'POST',
      body: req,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setReviews(data.data.reviews);
    setRating(calculateAverageRating(data.data.reviews));
    return data;
  }

  useEffect(() => {
    getReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProductStyles>
      <div className="content">
        <Title>The Minimalist Entrepreneur</Title>
        <Summary>
          <div className="average-rating">
            <AverageRating rating={rating} />
          </div>

          <Button>Add Review</Button>
        </Summary>

        <Divider />

        <div className="reviews">
          <Subtitle>Reviews</Subtitle>
          <List>
            <ul>
              {reviews.map(review => (
                <Review review={review} key={review.id} />
              ))}
            </ul>
          </List>
        </div>
      </div>
    </ProductStyles>
  );
}

export default ProductView;
