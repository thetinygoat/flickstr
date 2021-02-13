import { UPDATE_USER } from '../actions/actions';

const initialState = {
  wishList: [],
  watchList: [],
  stars: 0,
  title: '',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
    {
      const { wishList, watchList } = action;
      let title = '';
      let stars = 0;
      if (watchList.length >= 200) {
        title = 'Legendary';
        stars = 5;
      } else if (watchList.length > 100 && watchList.length < 200) {
        title = 'Master';
        stars = 4;
      } else if (watchList.length < 100 && watchList.length > 50) {
        title = 'Expert';
        stars = 3;
      } else if (watchList.length < 50 && watchList.length > 25) {
        title = 'Novice';
        stars = 2;
      } else if (watchList.length < 25) {
        title = 'Rookie';
        stars = 1;
      }
      return {
        ...state, wishList, watchList, title, stars,
      };
    }
    default:
      return state;
  }
};
