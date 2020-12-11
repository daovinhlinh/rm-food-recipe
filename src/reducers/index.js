import {combineReducers} from 'redux';

const foodListReducer = () => {
  return [{}];
};

const likedFoodReducer = (likedFood = [], action) => {
  if (action.type === 'ADD_LIKE') {
    likedFood.push(action.payload);
    return action.payload;
  }
  return likedFood;
};

export default combineReducers({
  likedFood: likedFoodReducer,
});
