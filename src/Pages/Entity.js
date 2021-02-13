import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Skeleton } from "@material-ui/lab";
import { Button, ButtonGroup, Chip } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import AddIcon from "@material-ui/icons/Add";
import { Helmet } from "react-helmet";
import cookie from "js-cookie";
import { useDispatch } from "react-redux";
import axios from "../axios";
import { CreditSlider } from "../Components";
import RecommendationSlider from "../Components/RecommendationSlider";
import netflix from "../Assets/Img/netflix.png";
import hooq from "../Assets/Img/hooq.png";
import primevideo from "../Assets/Img/prime-video.png";
import hotstar from "../Assets/Img/hotstar.jpg";
import voot from "../Assets/Img/voot.png";
import viu from "../Assets/Img/viu.jpg";
import jiocinema from "../Assets/Img/jio-cinema.png";
import zee5 from "../Assets/Img/zee5.png";
import erosnow from "../Assets/Img/eros-now.jpg";
import apple from "../Assets/Img/apple.png";
import playmovies from "../Assets/Img/play-movies.png";
import mubi from "../Assets/Img/mubi.png";
import sonyliv from "../Assets/Img/sony-liv.png";
import youtube from "../Assets/Img/youtube.png";
import tubi from "../Assets/Img/tubi.png";
import bookmyshow from "../Assets/Img/bookmyshow.jpg";
import cruncyroll from "../Assets/Img/crunchyroll.png";

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 3em 1em 1em 1em;
  display: flex;
  margin-top: 73.72px;
  justify-content: center;
  text-shadow: 0px 1px #212121;
  flex-direction: column;
  @media (max-width: 600px) {
    width: 100%;
  }
`;
const PosterSection = styled.div`
  padding: 0 1em 0 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  @media (max-width: 600px) {
    width: 90%;
    margin: 0 auto;
  }
`;
const InfoSection = styled.div`
  padding: 0 1em 0 1em;
  width: 70%;
  @media (max-width: 600px) {
    width: 90%;
    margin: 0 auto;
  }
`;

const OfferingContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  overflow-x: scroll;
`;
const Bg = styled.div`
  background: rgb(33, 33, 33);
  height: 100vh;
  width: 100%;
  background-image: linear-gradient(
      0deg,
      rgba(33, 33, 33, 1) 0%,
      rgba(33, 33, 33, 0.6951155462184874) 50%,
      rgba(33, 33, 33, 0.639093137254902) 75%
    ),
    url(${(props) => props.poster});
  background-size: cover;
  position: absolute;
  z-index: -9999;
  filter: blur(8px);
  left: 0;
  top: -3em;
`;
const InnerContainer = styled.div`
  display: flex;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
const GenreContainer = styled.div`
  display: flex;
  width: 60%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;
const Title = styled.p`
  font-size: 2em;
  font-weight: bold;
  @media (max-width: 600px) {
    text-align: center;
  }
`;
const Offer = styled.img`
  width: 4em;
  // border-radius:50%
`;
export default ({ match }) => {
  const providerMapping = {
    8: {
      name: "Netflix",
      src: netflix,
    },
    125: {
      name: "Hooq",
      src: hooq,
    },
    119: {
      name: "Amazon Prime Video",
      src: primevideo,
    },
    122: {
      name: "Hotstar",
      src: hotstar,
    },
    377: {
      name: "Hotstar Disney+",
      src: hotstar,
    },
    121: {
      name: "Voot",
      src: voot,
    },
    158: {
      name: "Viu",
      src: viu,
    },
    220: {
      name: "Jio Cinema",
      src: jiocinema,
    },
    232: {
      name: "Zee5",
      src: zee5,
    },
    218: {
      name: "Eros Now",
      src: erosnow,
    },
    2: {
      name: "Apple iTunes",
      src: apple,
    },
    3: {
      name: "Google Play Movies",
      src: playmovies,
    },
    11: {
      name: "Mubi",
      src: mubi,
    },
    237: {
      name: "Sony Liv",
      src: sonyliv,
    },
    192: {
      name: "YouTube",
      src: youtube,
    },
    100: {
      name: "GuideDoc",
      src: "na",
    },
    175: {
      name: "Netflix Kids",
      src: netflix,
    },
    73: {
      name: "Tubi TV",
      src: tubi,
    },
    124: {
      name: "Bookmyshow",
      src: bookmyshow,
    },
    255: {
      name: "Yupp TV",
      src: "na",
    },
    309: {
      name: "Sun Nxt",
      src: "na",
    },
    283: {
      name: "Crunchyroll",
      src: cruncyroll,
    },
    315: {
      name: "Hoichoi",
      src: "na",
    },
    319: {
      name: "Alt Balaji",
      src: "na",
    },
    350: {
      name: "Apple TV Plus",
      src: apple,
    },
  };
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const renderSkeleton = (component, times) => {
    const arr = [];
    for (let i = 0; i < times; i++) {
      arr.push(component);
    }
    return arr;
  };
  console.log(data);

  const addToWishList = async () => {
    try {
      await axios.post(
        "/user/update?type=wishlist",
        {
          data: {
            title: data.title,
            poster: data.poster,
            id: data.bingy_id,
          },
        },
        {
          headers: {
            Authorization: cookie.get("accessToken"),
          },
        }
      );
      dispatch({
        type: "OPEN_NOTIFICATION",
        message: "Added to Wish List",
        notifType: "success",
      });
    } catch (e) {
      dispatch({
        type: "OPEN_NOTIFICATION",
        message: "Error, Please Try Again",
        notifType: "error",
      });
    }
  };
  const addToWatchList = async () => {
    try {
      await axios.post(
        "/user/update?type=watchlist",
        {
          data: {
            title: data.title,
            poster: data.poster,
            id: data.bingy_id,
          },
        },
        {
          headers: {
            Authorization: cookie.get("accessToken"),
          },
        }
      );
      dispatch({
        type: "OPEN_NOTIFICATION",
        message: "Added to Watch List",
        notifType: "success",
      });
    } catch (e) {
      dispatch({
        type: "OPEN_NOTIFICATION",
        message: "Error, Please Try Again",
        notifType: "error",
      });
    }
  };
  useEffect(() => {
    const fetchContent = async () => {
      axios.get(`/movie/${match.params.id}`).then((response) => {
        setData(response.data.data.entity);
        axios
          .get(
            `/recommendations/${response.data.data.entity.recommendation_bingy_id}`
          )
          .then((res) => {
            setRecommendations(res.data.data.movies);
          });
      });
    };
    fetchContent();

    return () => {
      setData(null);
      setRecommendations(null);
    };
  }, [match]);

  return (
    <Container>
      <Bg poster={data && data.poster} />
      <InnerContainer>
        <PosterSection>
          {!data ? (
            <div style={{}}>
              <Skeleton variant="rect" width={166} height={236} />
            </div>
          ) : (
            <div>
              <img
                src={data.poster}
                width={166}
                height={236}
                alt={data.title}
              />
            </div>
          )}
        </PosterSection>
        <InfoSection>
          {!data ? (
            <div style={{}}>
              <Skeleton height={30} />
              {renderSkeleton(<Skeleton />, 5)}
              <Skeleton height={30} />
              <br />
              <OfferingContainer>
                {renderSkeleton(
                  <Skeleton variant="circle" width={60} height={60} />,
                  4
                )}
              </OfferingContainer>
            </div>
          ) : (
            <div>
              <Helmet>
                <meta charSet="utf-8" />
                <title>{`Discover ${data.title} on Flickstr`}</title>
                <link rel="canonical" href="http://mysite.com/example" />
                <meta
                  name="description"
                  content={`${data.short_description}`}
                />
              </Helmet>
              <Title>{data.title}</Title>
              <GenreContainer>
                {data.genre_mapping.map((genre) => (
                  <Chip label={genre} style={{ marginRight: "5px" }} />
                ))}
              </GenreContainer>
              <br />
              <ButtonGroup>
                <Button startIcon={<AddIcon />} onClick={addToWishList}>
                  Want to Watch
                </Button>
                <Button startIcon={<CheckIcon />} onClick={addToWatchList}>
                  Already Watched
                </Button>
              </ButtonGroup>
              <h2>Description</h2>
              <p>{data.short_description}</p>
              {data.offers.length > 0 && <h2>Where to Watch {data.title}</h2>}
              <OfferingContainer>
                {data.offers.map((offer) => (
                  <a
                    href={offer.urls.standard_web}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Offer src={providerMapping[offer.provider_id].src} />
                  </a>
                ))}
              </OfferingContainer>
            </div>
          )}
        </InfoSection>
      </InnerContainer>
      <br />
      <div>
        {!data ? null : (
          <div>
            <CreditSlider items={data.credits} category="Cast & Crew" />
          </div>
        )}
      </div>
      <div>
        {!recommendations ? (
          <h2>Loading...</h2>
        ) : (
          <RecommendationSlider
            items={recommendations}
            category="Watch Similar"
          />
        )}
      </div>
    </Container>
  );
};
