import axios from '../axios';

const getHomeMovies = async () => {
  const response = await axios.get('/home/content?type=movie');
  return { data: response.data };
};
const getHomeShows = async () => {
  const response = await axios.get('/home/content?type=show');
  return { data: response.data };
};

export default { getHomeMovies, getHomeShows };
