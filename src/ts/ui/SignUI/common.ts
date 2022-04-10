import { basePath } from '../App';
import { viewPainter } from '../ViewPainter';

type BeforeType = 'signIn' | 'signUp' | 'editUserInfo';

const goToNextPage = (
  beforeType: BeforeType,
  userName?: string,
  isSignIn?: boolean,
) => {
  switch (beforeType) {
    case 'signIn':
      viewPainter.renderUserUI(userName);
      viewPainter.renderMainUI(isSignIn);
      history.replaceState({}, '', `${basePath}/`);
      break;
    case 'signUp':
      viewPainter.renderSignInUI();
      history.pushState({}, '', `${basePath}/signin`);
      break;
    case 'editUserInfo':
      viewPainter.renderUserName(userName);
      viewPainter.renderMainUI(isSignIn);
      history.replaceState({}, '', `${basePath}/`);
  }
};

export { goToNextPage };
