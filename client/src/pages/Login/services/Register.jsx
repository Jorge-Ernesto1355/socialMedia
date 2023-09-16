import {
  loginFailure,
  loginStart,
  loginSucces
} from '../../../redux/UserRedux';
import { publicRequest } from '../../../utilities/requestMethod';

const Register = async (dispatch, user) => {
  dispatch(loginStart());

  try {
    const { data } = await publicRequest.post('/auth/register', user);
    dispatch(loginSucces(data));
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
    setTimeout(() => {
      dispatch(loginFailure(''));
    }, 2000);
  }
};

export default Register;
