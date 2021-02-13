import React from 'react';
import styled from 'styled-components';
import fourohfour from '../Assets/Img/404.png';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10em;
  flex-direction: column;
`;

const Img = styled.img`
  width: 20%;
  @media (max-width: 600px) {
    width: 50%;
  }
`;

const fof = () => {
  console.log('404 page');

  return (
    <Container>
      <Img src={fourohfour} alt="404" />
      <h1>404</h1>
      <h2>Oops, seems like you are lost</h2>
    </Container>
  );
};

export default fof;
