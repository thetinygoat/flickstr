import React from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
const StyledImage = styled.img`
  width: 90%;
  max-width: 140px;
`;

export default ({ src }) => {
  return (
    <LazyLoad once>
      <StyledImage src={src} />
    </LazyLoad>
  );
};
