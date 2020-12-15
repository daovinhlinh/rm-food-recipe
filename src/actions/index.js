export const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE';
export const GET_ALL_FAVORITE = 'GET_ALL_FAVORITE';

export const AddToFavorite = (payload) => {
  return {
    type: 'ADD_TO_FAVORITE',
    payload,
  };
};

export const GetAllFavorite = (payload) => {
  return {
    type: 'GET_ALL_FAVORITE',
    payload,
  };
};
