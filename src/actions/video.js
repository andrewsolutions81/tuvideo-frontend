/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import AuthService from '../services/auth.service';

export function register(username, email, password) {
  return async (dispatch) => {
    try {
      await AuthService.register(username, email, password);
      dispatch({
        type: REGISTER_SUCCESS,
      });
      dispatch({
        type: SET_MESSAGE,
        // eslint-disable-next-line no-undef
        payload: response.data.message,
      });
    } catch (error) {
      const message = (error.response
        && error.response.data
        && error.response.data.message)
        || error.message
        || error.toString();
      dispatch({
        type: REGISTER_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
    }
  };
}
