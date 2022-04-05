import isExpired from './isExpired';

const Auth = () => {
  const accessToken = localStorage.getItem('accessToken');
  console.log('at:', isExpired(accessToken));
  // isExpired
};

export default Auth;
