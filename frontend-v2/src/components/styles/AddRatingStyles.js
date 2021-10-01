import styled from 'styled-components';

export const AddRatingStyles = styled.div`
  width: 400px;
  height: 300px;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin: 0 20px;

  .rating-label {
    display: block;
  }

  .stars {
    height: 24px;
  }

  .review-label {
    display: contents;
    margin-block-end: 1rem;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    margin: 0 10px;
  }
`;

export const ReviewInput = styled.input`
  margin: 10px 10px;
  border: none;
  border-color: transparent;
  width: 100%;
  color: gray;
`;