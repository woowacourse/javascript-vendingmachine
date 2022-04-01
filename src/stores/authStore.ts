import { AuthActionType, AuthStoreInterface } from './types';
import { accessTokenStorage, userIdStorage } from './localStorage';

class AuthStore implements AuthStoreInterface {
  mutateState({ actionType, payload }: { actionType: AuthActionType; payload: unknown }) {
    if (actionType === 'signIn') {
      this.signInUserInfo(payload);
    }
  }

  async signInUserInfo(payload) {
    const { email, name, password } = payload;

    const userData = JSON.stringify({ email, name, password });

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: userData,
      }).then(res => res.json());
      const {
        accessToken,
        user: { id },
      } = response;

      accessTokenStorage.setAccessToken(accessToken);
      userIdStorage.setUserId(id);
      window.location.href = 'http://localhost:9000/#';
    } catch ({ message }) {
      alert(message);
    }
  }
}

export default new AuthStore();
