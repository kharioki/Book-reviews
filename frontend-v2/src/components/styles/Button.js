import styled from 'styled-components';

const Button = styled.button`
  background: white;
  border: 1px solid var(--light-gray);
  color: var(--dark-gray);
  font-size: 12px;
  cursor: pointer;
  height: 40px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  width: 35%;
  ${props => props.submit && `
    margin-top: 10px;
  `}

  @media screen and (max-width: 600px) {
    ${props => props.submit && `
      width: 50%;
    `} 
  }
`;

export default Button;