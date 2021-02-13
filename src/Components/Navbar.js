import React, { useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import AuthDialog from "./AuthDialog";
import { PRIMARY_BG, WHITE } from "../constants";
import Logo from "../Assets/Img/logo.svg";
import constructSEOTitle from "../Helpers/seo";

const Navbar = styled.div`
  display: flex;
  padding: 1em;
  background-color: ${PRIMARY_BG};
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 9999;
  justify-content: space-around;
  @media (max-width: 599px) {
    justify-content: flex-start;
  }
`;

const LogoImg = styled.img`
  width: 135px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 15%;
  justify-content: space-between;
  @media (max-width: 599px) {
    display: none;
  }
`;

const Results = styled.div`
  background-color: ${WHITE};
  width: ${(props) => `${props.width}px`};
  position: fixed;
  top: 73.72px;
  color: ${PRIMARY_BG};
  box-sizing: border-box;
  overflow-y: scroll;
  left: ${(props) => `${props.left}px`};
  z-index: 9999;
  @media (max-width: 599px) {
    display: none;
  }
`;
const Result = styled.div`
  padding: 10px;
  text-decoration: none;
  display: flex;
  align-items: Center;
`;
const SpinnerContainier = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 1em;
`;
const ResultPoster = styled.img`
  width: 20px;
  margin-right: 1em;
`;
export default function NavigationBar() {
  const [resultWidth, setResultWidth] = useState(600);
  const [resultPos, setPos] = useState(0);
  const [authDialog, setAuthDialog] = useState(false);
  const [authAction, setAuthAction] = useState("");
  const handleClose = () => {
    setAuthDialog(!authDialog);
  };
  const results = useRef(null);
  const { movies, shows, resultOpen } = useSelector((state) => state.search);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const e = document.getElementById("searchbar");
    window.onload = () => {
      setResultWidth(e.offsetWidth);
      setPos(e.offsetLeft);
    };
    window.addEventListener("resize", () => {
      setResultWidth(e.offsetWidth);
      setPos(e.offsetLeft);
    });
  }, []);

  return (
    <div>
      <Navbar>
        <Link to="/">
          <LogoImg src={Logo} alt="Flickstr" height="45.72px" />
        </Link>
        <Searchbar />
        <ButtonContainer>
          {!auth.isLoggedIn ? (
            <span>
              <Button
                onClick={() => {
                  setAuthAction("login");
                  setAuthDialog(true);
                }}
              >
                Login
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  setAuthAction("signup");
                  setAuthDialog(true);
                }}
              >
                Signup
              </Button>
            </span>
          ) : (
            <Link to="/me">
              <Avatar src={auth.user.photoURL} />
            </Link>
          )}
        </ButtonContainer>
      </Navbar>
      {resultOpen && (
        <Results ref={results} width={resultWidth} left={resultPos}>
          {movies.length === 0 && shows.length === 0 ? (
            <SpinnerContainier>Nothing Found</SpinnerContainier>
          ) : (
            (movies.length > 0 || shows.length > 0) &&
            movies.map((movie) => (
              <Link
                to={`/entity/${movie.bingy_id}/${constructSEOTitle(
                  movie.title
                )}`}
                key={movie.bingy_id}
              >
                <Result>
                  <ResultPoster
                    src={movie.poster}
                    width="20px"
                    height="28.42px"
                  />
                  {movie.title}
                </Result>
              </Link>
            ))
          )}
          {(movies.length > 0 || shows.length > 0) &&
            shows.map((show) => (
              <Link
                to={`/entity/${show.bingy_id}/${constructSEOTitle(show.title)}`}
                key={show.bingy_id}
              >
                <Result>
                  <ResultPoster
                    src={show.poster}
                    width="20px"
                    height="28.42px"
                  />
                  {show.title}
                </Result>
              </Link>
            ))}
        </Results>
      )}
      <AuthDialog open={authDialog} close={handleClose} type={authAction} />
    </div>
  );
}
