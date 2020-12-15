import {combineReducers} from 'redux';
import {ADD_TO_FAVORITE, GET_ALL_FAVORITE} from '../actions';

const initProduct = {
  numberFavorite: 0,
  Carts: [],
  _products: [],
};

const favoriteFoodReducer = (state = initProduct, action) => {
  switch (action.type) {
    case GET_ALL_FAVORITE:
      return {
        ...state,
        _products: action.payload,
      };
    case ADD_TO_FAVORITE:
      let check = false;
      state.Carts.map((item, key) => {
        if (item.id == action.payload.meals[0].idMeal) {
          check = true;
        }
      });
      if (!check) {
        let favorite = {
          id: action.payload.meals[0].idMeal,
          name: action.payload.meals[0].strMeal,
          image: action.payload.meals[0].strMealThumb,
        };
        state.Carts.push(favorite);
      }
      return {
        ...state,
        numberFavorite: state.numberFavorite + 1,
      };
    default:
      return state;
  }
};

export default combineReducers({
  favoriteFood: favoriteFoodReducer,
});
