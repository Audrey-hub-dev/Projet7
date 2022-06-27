import { USER_LOGOUT } from "../constants/userConstants";

export const logout = () => async (dispatch) => {
  sessionStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

