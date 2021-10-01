import styled from "styled-components";

export const ProductStyles = styled.div`
  width: 400px;
  height: 500px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin: 20px 20px;
  padding: 20px;

  .content {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    height: 100%;

    @media screen and (max-width: 600px) {
      width: 90%;
    }
  }

  .reviews {
    display: block;
    height: 60%;
  }

  @media (max-width: 600px) {
    padding: 10px;
    margin: 20px 10px;
  }
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

export const Summary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;

  .average-rating {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const AverageRatingStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .average {
    font-size: 24px;
    font-weight: semi-bold;
    margin-right: 10px;
  }

  .stars {
    width: 24px;
    height: 24px;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--light-gray);
  /* margin: 20px 0; */
`;

export const List = styled.div`
  overflow: scroll;
  height: 90%;
  width: 300px;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  font-weight: semi-bold;
  margin-left: 10px;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  width: max-content;
  
  .stars {
    height: 24px;

    @media screen and (max-width: 600px) {
      height: 20px;
    }
  }

  .num {
    font-size: 14px;
    font-weight: bold;
    color: #000;
    margin-left: 10px;
  }

  .text {
    font-size: 12px;
    color: gray;
    font-weight: lighter;
  }
`;