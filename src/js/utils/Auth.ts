import isExpired from './isExpired';

const Auth = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken === null || isExpired(accessToken)) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    return false;
  }

  return true;
};

export default Auth;
