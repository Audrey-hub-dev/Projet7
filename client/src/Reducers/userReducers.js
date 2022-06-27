

import { USER_LOGOUT } from "../constants/userConstants";


export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
