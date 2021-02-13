import React, { useRef } from 'react';
import Slider from 'react-slick';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Image from './Image';
import createSEOTitle from '../Helpers/seo';

const CategoryName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default ({ children, category, items }) => {
  const slider = useRef(null);
  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    lazyLoad: true,

    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: false,
          dots: false,
          lazyLoad: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          lazyLoad: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          lazyLoad: true,
        },
      },
    ],
  };
  return (
    <>
      <CategoryName>
        <Typography variant="h5" style={{ margin: '1em 0 1em 0' }}>
          {category}
          {' '}
          {'   '}
        </Typography>
        <div>
          <Button onClick={() => slider.current.slickPrev()}>
            <ArrowBackIosIcon />
          </Button>
          <Button onClick={() => slider.current.slickNext()}>
            <ArrowForwardIosIcon />
          </Button>
        </div>
      </CategoryName>
      <Slider {...settings} ref={slider}>
        {items.map((item) => <Link to={`/entity/${item.bingy_id}/${createSEOTitle(item.title)}`} key={item.poster}><Image src={item.poster} /></Link>)}
      </Slider>
    </>
  );
};
